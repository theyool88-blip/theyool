#!/usr/bin/env node

/**
 * Crawl theyool-divorce.com/case posts and upsert them into Supabase cases table.
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/import-wp-cases.js
 */

const { createClient } = require('@supabase/supabase-js');
const TurndownService = require('turndown');
const { parse } = require('node-html-parser');
const path = require('path');
const crypto = require('crypto');

const WP_BASE = 'https://theyool-divorce.com';
const CATEGORY_ID = 57; // CASE archive category

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE env vars are missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const STORAGE_BUCKET = 'public-content';
const CASE_THUMBNAIL_DIR = 'cases/thumbnails';
const CASE_BODY_DIR = 'cases/body';
let supportsImageColumn = true;
const WP_TOC_REGEX = /^Contents[\s\S]*?(?=^##|^###|^\S)/m;

const KEYWORD_PATTERNS = [
  { label: '상간', regex: /(상간|불륜|간통)/ },
  { label: '위자료', regex: /(위자료|합의금|배상)/ },
  { label: '재산분할', regex: /(재산|분할|특유재산)/ },
  { label: '양육권', regex: /(양육|친권|자녀|면접교섭)/ },
];

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

turndown.remove('script');
turndown.remove('style');

async function ensureBucketExists() {
  const { error } = await supabase.storage.getBucket(STORAGE_BUCKET);
  if (!error) return;

  if (error?.message?.toLowerCase().includes('not found')) {
    const { error: createError } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: true,
    });

    if (createError && !createError.message.toLowerCase().includes('already exists')) {
      throw createError;
    }
  } else {
    throw error;
  }
}

async function checkImageColumnAvailability() {
  const { error } = await supabase
    .from('cases')
    .select('image_url')
    .limit(1);

  if (error && error.code === '42703') {
    console.warn('⚠️  cases.image_url 컬럼이 없어 대표 이미지를 별도 필드에 저장하지 않습니다.');
    return false;
  }

  if (error) {
    console.error('cases 컬럼 확인 실패:', error.message);
    throw error;
  }

  return true;
}

function decodeHtml(value = '') {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function htmlToParagraphs(html = '') {
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  const normalized = withoutScripts
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ');

  const text = decodeHtml(normalized);

  return text
    .split(/\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function truncate(text = '', max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function detectCategories(baseText, tagNames) {
  const categories = new Set();
  const haystack = `${baseText} ${tagNames.join(' ')}`.toLowerCase();

  for (const { label, regex } of KEYWORD_PATTERNS) {
    if (regex.test(haystack)) {
      categories.add(label);
    }
  }

  categories.add('이혼'); // 기본값
  return Array.from(categories);
}

function getCaseSlug(post) {
  return `wp-case-${post.id}`;
}

function getExtensionFromUrl(url, contentType) {
  try {
    const parsed = new URL(url);
    const ext = path.extname(parsed.pathname).replace('.', '');
    if (ext) return ext.split('?')[0].toLowerCase();
  } catch (error) {
    // ignore
  }

  if (contentType) {
    if (contentType.includes('png')) return 'png';
    if (contentType.includes('gif')) return 'gif';
    if (contentType.includes('webp')) return 'webp';
    if (contentType.includes('svg')) return 'svg';
  }

  return 'jpg';
}

async function uploadRemoteImage(url, section, slug, label) {
  if (!url) return null;

  const attempts = [];
  try {
    const normalizedUrl = new URL(url, WP_BASE).toString();
    attempts.push(normalizedUrl);
    if (normalizedUrl.includes('xn--')) {
      const fallback = normalizedUrl.replace(/https?:\/\/[^/]+/, WP_BASE);
      attempts.push(fallback);
    }
  } catch (error) {
    attempts.push(url);
  }

  for (const attemptUrl of attempts) {
    try {
      const response = await fetch(attemptUrl);
      if (!response.ok) {
        throw new Error(`Failed to download ${attemptUrl} (${response.status})`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const extension = getExtensionFromUrl(attemptUrl, contentType);
      const filename = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${label}.${extension}`;
      const storagePath = `${section}/${slug}/${filename}`;

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, buffer, { contentType, upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
      return data?.publicUrl || null;
    } catch (error) {
      console.error(`⚠️  이미지 업로드 실패 (${attemptUrl}):`, error.message);
    }
  }

  return null;
}

async function replaceBodyImages(html, slug) {
  if (!html) return '';

  try {
    const root = parse(html);
    const imageNodes = root.querySelectorAll('img');
    const cache = new Map();
    let index = 0;

    for (const node of imageNodes) {
      const src = node.getAttribute('src');
      if (!src || src.startsWith('data:')) continue;

      if (!cache.has(src)) {
        const uploaded = await uploadRemoteImage(src, CASE_BODY_DIR, slug, `body-${index}`);
        if (uploaded) {
          cache.set(src, uploaded);
        }
        index += 1;
      }

      const mapped = cache.get(src);
      if (mapped) {
        node.setAttribute('src', mapped);
        node.removeAttribute('srcset');
        node.removeAttribute('sizes');
      }
    }

    return root.toString();
  } catch (error) {
    console.error('⚠️  본문 이미지 처리 실패:', error.message);
    return html;
  }
}

async function fetchFeaturedImage(mediaId) {
  if (!mediaId) return null;
  try {
    const media = await fetchJson(`${WP_BASE}/wp-json/wp/v2/media/${mediaId}`);
    return media?.source_url || null;
  } catch (error) {
    console.error('⚠️  대표 이미지 조회 실패:', error.message);
    return null;
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to fetch ${url} (${res.status}): ${body}`);
  }
  return res.json();
}

async function main() {
  console.log('📥 Fetching CASE posts from WordPress…');
  await ensureBucketExists();
  supportsImageColumn = await checkImageColumnAvailability();
  const posts = await fetchJson(
    `${WP_BASE}/wp-json/wp/v2/posts?categories=${CATEGORY_ID}&per_page=100`
  );

  if (!Array.isArray(posts) || posts.length === 0) {
    console.log('⚠️  No posts found for the CASE archive.');
    return;
  }

  const tagIds = Array.from(new Set(posts.flatMap((post) => post.tags || []))).filter(
    Boolean
  );
  let tagNameMap = {};

  if (tagIds.length) {
    const tagUrl = `${WP_BASE}/wp-json/wp/v2/tags?per_page=${tagIds.length}&include=${tagIds.join(',')}`;
    const tagData = await fetchJson(tagUrl);
    tagNameMap = Object.fromEntries(
      tagData.map((tag) => [tag.id, decodeHtml(tag.name)])
    );
  }

  console.log(`🧾 Found ${posts.length} posts, importing into Supabase…`);

  let successCount = 0;
  const failures = [];

  for (const [index, post] of posts.entries()) {
    const slug = getCaseSlug(post);
    const notionId = slug;
    const title = decodeHtml(post.title?.rendered || '').trim();
    const excerptText = htmlToParagraphs(post.excerpt?.rendered || '').join(' ');
    let processedHtml = await replaceBodyImages(post.content?.rendered || '', slug);
    const paragraphs = htmlToParagraphs(processedHtml);
    const tagNames = (post.tags || []).map((tagId) => tagNameMap[tagId] || '');
    const categories = detectCategories(
      `${title} ${excerptText} ${paragraphs.slice(0, 5).join(' ')}`,
      tagNames
    );
    const highlightedParagraph =
      paragraphs.find((p) => /(승소|성공|기각|위자료|합의|재산|양육)/.test(p)) ||
      paragraphs[0] ||
      excerptText ||
      title;
    const featuredImage = await fetchFeaturedImage(post.featured_media);
    const coverImageUrl = await uploadRemoteImage(featuredImage, CASE_THUMBNAIL_DIR, slug, 'cover');
    const markdownBody = sanitizeMarkdownBody(turndown.turndown(processedHtml).trim());
    const markdownContent = coverImageUrl
      ? `<!--bg:${coverImageUrl}-->\n\n${markdownBody}`
      : markdownBody;

    const record = {
      notion_id: notionId,
      slug,
      title: title || `CASE ${post.id}`,
      badge: `CASE ${String(index + 1).padStart(2, '0')}`,
      categories,
      background: markdownContent || paragraphs.join('\n\n'),
      strategy: excerptText || paragraphs.slice(0, 3).join('\n\n'),
      result: truncate(highlightedParagraph) || title,
      icon: null,
      published: true,
      sort_order: posts.length - index,
    };

    if (supportsImageColumn) {
      record.image_url = coverImageUrl;
    }

    const { error } = await supabase
      .from('cases')
      .upsert(record, { onConflict: 'notion_id' });

    if (error) {
      console.error(`❌ Failed to upsert "${title}":`, error.message);
      failures.push({ title, error: error.message });
    } else {
      successCount += 1;
      console.log(`✅ Imported: ${title}`);
    }
  }

  console.log(`\n🎉 Import finished. Success: ${successCount}, Failed: ${failures.length}`);
  if (failures.length) {
    failures.forEach((fail) => console.log(`- ${fail.title}: ${fail.error}`));
  }
}

main().catch((error) => {
  console.error('Unexpected error while importing cases:', error);
  process.exit(1);
});
function sanitizeMarkdownBody(markdown) {
  if (!markdown) return '';
  return markdown.replace(WP_TOC_REGEX, segment => (segment.includes('[Toggle') ? '' : segment)).trim();
}
