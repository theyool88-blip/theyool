#!/usr/bin/env node
/**
 * 스크립트: https://theyool-divorce.com/column 의 칼럼을 수집해 Supabase blog_posts 테이블에 업서트합니다.
 */
const { createClient } = require('@supabase/supabase-js');
const { parse } = require('node-html-parser');
const TurndownService = require('turndown');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Supabase 환경변수가 설정되어 있지 않습니다.');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BASE_URL = 'https://theyool-divorce.com';
const COLUMN_PATH = '/column/';

const turndown = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  codeBlockStyle: 'fenced',
});

turndown.addRule('softBreak', {
  filter: ['br'],
  replacement: () => '  \n',
});

turndown.keep(['iframe']);

const allowedTags = ['이혼', '재산', '자녀', '소송', '상담', '위자료', '이혼소송', '재산분할', '단기혼', '양육권', '친권', '면접교섭권'];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function sanitizeMarkdown(markdown) {
  if (!markdown) return '';
  return markdown
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\s*Contents[^\n]*$/gim, '')
    .replace(/^\s*Toggle[^\n]*$/gim, '')
    .trim();
}

function inferCategory(text) {
  if (!text) return '법률상식';
  if (/상간|불륜|간통/.test(text)) return '상간';
  if (/위자료/.test(text)) return '위자료';
  if (/재산분할|재산|재산분/.test(text)) return '재산분할';
  if (/양육|친권|면접교섭/.test(text)) return '양육권';
  if (/절차|소송|재판|협의이혼/.test(text)) return '이혼절차';
  return '법률상식';
}

function inferTags(text) {
  const tags = new Set(['이혼']);
  if (/상담/.test(text)) tags.add('상담');
  if (/소송|재판|판결/.test(text)) tags.add('소송');
  if (/위자료/.test(text)) {
    tags.add('위자료');
    tags.add('이혼소송');
  }
  if (/재산분할|재산/.test(text)) {
    tags.add('재산');
    tags.add('재산분할');
  }
  if (/양육|친권|면접교섭/.test(text)) {
    tags.add('자녀');
    tags.add('양육권');
    tags.add('친권');
    tags.add('면접교섭권');
  }
  if (/단기혼|단기간/.test(text)) tags.add('단기혼');
  return Array.from(tags).filter(tag => allowedTags.includes(tag));
}

async function fetchHTML(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'theyool-scraper/1.0',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url} (${res.status})`);
  }
  return await res.text();
}

function parseListPage(html) {
  const root = parse(html);
  const articles = root.querySelectorAll('article.elementor-post');
  const links = articles
    .map(article => article.querySelector('a.elementor-post__thumbnail__link') || article.querySelector('h3 a'))
    .filter(Boolean)
    .map(a => a.getAttribute('href'))
    .filter(Boolean);
  const anchor = root.querySelector('.e-load-more-anchor');
  const maxPage = anchor ? Number(anchor.getAttribute('data-max-page')) || 1 : 1;
  return { links, maxPage };
}

function cleanEntryContent(entry) {
  if (!entry) return '';
  entry.querySelectorAll('script,style').forEach(node => node.remove());
  entry.querySelectorAll('#ez-toc-container,.ez-toc-v2_0_72').forEach(node => node.remove());
  entry.querySelectorAll('.wp-block-buttons').forEach(node => node.remove());
  entry.querySelectorAll('.wp-block-group').forEach(node => node.remove());
  entry.querySelectorAll('noscript').forEach(node => node.remove());
  return entry.innerHTML;
}

async function collectArticleLinks() {
  const links = new Set();
  const firstPageHtml = await fetchHTML(`${BASE_URL}${COLUMN_PATH}`);
  const { links: firstLinks, maxPage } = parseListPage(firstPageHtml);
  firstLinks.forEach(link => links.add(link));

  for (let page = 2; page <= maxPage; page++) {
    const pageHtml = await fetchHTML(`${BASE_URL}${COLUMN_PATH}${page}/`);
    const { links: pageLinks } = parseListPage(pageHtml);
    pageLinks.forEach(link => links.add(link));
  }

  return Array.from(links);
}

async function parseArticle(url) {
  const html = await fetchHTML(url);
  const root = parse(html);

  const title = root.querySelector('h1.entry-title')?.text.trim();
  if (!title) {
    throw new Error(`제목을 찾을 수 없습니다: ${url}`);
  }

  const metaDescription = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const publishedAt = root.querySelector('meta[property="article:published_time"]')?.getAttribute('content') || new Date().toISOString();
  const heroImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

  const entry = root.querySelector('.entry-content');
  if (!entry) {
    throw new Error(`본문을 찾을 수 없습니다: ${url}`);
  }

  const entryHTML = cleanEntryContent(entry);
  let markdown = turndown.turndown(entryHTML);
  markdown = sanitizeMarkdown(markdown);
  if (heroImage) {
    markdown = `<!--bg:${heroImage}-->\n\n${markdown}`;
  }

  const context = `${title}\n${markdown}`;
  const category = inferCategory(context);
  const tags = inferTags(context);
  const excerpt = metaDescription ? metaDescription.slice(0, 200) : markdown.split('\n').find(line => line.trim())?.slice(0, 200) || '';

  return {
    title,
    slug: slugify(title),
    categories: category ? [category] : [],
    tags,
    excerpt,
    content: markdown,
    published: true,
    featured: false,
    author: '법무법인 더율',
    published_at: publishedAt,
    originalUrl: url,
  };
}

async function main() {
  console.log('🔎 theyool-divorce.com 칼럼 수집을 시작합니다...\n');
  const articleLinks = await collectArticleLinks();
  if (articleLinks.length === 0) {
    console.log('가져올 칼럼이 없습니다.');
    return;
  }
  console.log(`총 ${articleLinks.length}개의 글 URL을 확인했습니다.\n`);

  const posts = [];
  const slugCounts = new Map();

  for (const link of articleLinks) {
    try {
      console.log(`→ ${link}`);
      const post = await parseArticle(link);
      let finalSlug = post.slug || slugify(post.title);
      const baseSlug = finalSlug;
      let counter = 2;
      while (slugCounts.has(finalSlug)) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      slugCounts.set(finalSlug, true);
      posts.push({ ...post, slug: finalSlug });
      console.log(`   ✓ ${post.title}`);
    } catch (error) {
      console.error(`   ✗ ${link} 처리 실패: ${error.message}`);
    }
  }

  if (posts.length === 0) {
    console.log('\n저장할 게시물이 없습니다.');
    return;
  }

  console.log(`\n📝 Supabase에 ${posts.length}개의 칼럼을 업서트합니다...\n`);
  const { error } = await supabase
    .from('blog_posts')
    .upsert(posts.map(({ originalUrl, ...rest }) => rest), { onConflict: 'slug' });

  if (error) {
    console.error('❌ Supabase 업서트 실패:', error.message);
    process.exit(1);
  }

  console.log('✅ 업서트가 완료되었습니다.');
}

main().catch((error) => {
  console.error('스크립트 오류:', error);
  process.exit(1);
});
