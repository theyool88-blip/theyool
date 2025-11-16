const { Client: NotionClient } = require('@notionhq/client');
const { createClient } = require('@supabase/supabase-js');
const { NotionToMarkdown } = require('notion-to-md');

// Notion 설정
const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const CASES_DB_ID = process.env.NOTION_CASES_DB || '2a7aa4dc-b89b-80d4-8950-e308449f6941';
const BLOG_DB_ID = process.env.NOTION_BLOG_DB || '2a7aa4dc-b89b-80b6-b055-c9c813f0a1be';
const INSTAGRAM_DB_ID = process.env.NOTION_INSTAGRAM_DB || '2a7aa4dc-b89b-80de-aa06-c520dd93e19d';

// Supabase 설정
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Slug 생성 함수 (중복 방지를 위해 랜덤 ID 추가)
function generateSlug(text, notionId) {
  const baseSlug = text
    .toLowerCase()
    .replace(/[^가-힣a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80);

  // Notion ID의 마지막 8자 추가 (고유성 보장)
  const uniqueId = notionId.replace(/-/g, '').substring(0, 8);
  return `${baseSlug}-${uniqueId}`;
}

// ========================================
// 1. Cases (성공사례) 마이그레이션
// ========================================
async function migrateCases() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Cases (성공사례) → Supabase 이전     ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Notion에서 가져오기
  const response = await notion.databases.query({
    database_id: CASES_DB_ID,
    page_size: 100,
    filter: {
      property: '공개',
      checkbox: { equals: true }
    }
  });

  console.log(`📥 Notion에서 ${response.results.length}개 사례 발견\n`);

  const cases = [];

  for (const page of response.results) {
    const props = page.properties;

    const title = props['제목']?.title?.[0]?.plain_text || '';
    const category = props['카테고리']?.select?.name || '';
    const badge = props['Badge']?.rich_text?.[0]?.plain_text || '';
    const imageUrl = props['이미지']?.files?.[0]?.file?.url || props['이미지']?.files?.[0]?.external?.url || null;
    const icon = props['아이콘']?.rich_text?.[0]?.plain_text || '';
    const createdAt = props['작성일']?.date?.start || page.created_time;

    console.log(`  - ${title}`);

    // 본문 가져오기 (배경, 전략, 결과)
    const blocks = await notion.blocks.children.list({ block_id: page.id });

    let background = '';
    let strategy = '';
    let result = '';
    let currentSection = '';

    for (const block of blocks.results) {
      if (block.type === 'heading_2') {
        const text = block.heading_2.rich_text?.[0]?.plain_text || '';
        if (text.includes('배경')) currentSection = 'background';
        else if (text.includes('전략')) currentSection = 'strategy';
        else if (text.includes('결과')) currentSection = 'result';
      } else if (block.type === 'paragraph' && currentSection) {
        const text = block.paragraph.rich_text?.map(t => t.plain_text).join('') || '';
        if (currentSection === 'background') background += text + '\n\n';
        else if (currentSection === 'strategy') strategy += text + '\n\n';
        else if (currentSection === 'result') result += text + '\n\n';
      }
    }

    cases.push({
      notion_id: page.id,
      title,
      slug: generateSlug(title, page.id),
      category,
      badge,
      background: background.trim(),
      strategy: strategy.trim(),
      result: result.trim(),
      icon,
      image_url: imageUrl,
      published: true,
      views: 0,
      sort_order: cases.length + 1,
      created_at: createdAt
    });
  }

  console.log(`\n✅ ${cases.length}개 사례 추출 완료\n`);

  // 중복 제거 (notion_id 기준)
  const uniqueCases = Array.from(
    new Map(cases.map(c => [c.notion_id, c])).values()
  );

  console.log(`📌 중복 제거 후: ${uniqueCases.length}개\n`);

  // Supabase에 저장
  console.log('🚀 Supabase에 저장 중...\n');

  // 기존 데이터 삭제
  console.log('  🗑️  기존 Cases 데이터 삭제 중...');
  await supabase.from('cases').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  ✅ 기존 데이터 삭제 완료\n');

  const { data, error } = await supabase
    .from('cases')
    .insert(uniqueCases);

  if (error) {
    console.error('❌ Cases 저장 실패:', error.message);
    throw error;
  }

  console.log(`✅ ${uniqueCases.length}개 사례 저장 완료!\n`);
  return uniqueCases.length;
}

// ========================================
// 2. Blog (변호사칼럼) 마이그레이션
// ========================================
async function migrateBlog() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Blog (변호사칼럼) → Supabase 이전    ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Notion에서 가져오기
  const response = await notion.databases.query({
    database_id: BLOG_DB_ID,
    page_size: 100,
    filter: {
      property: '공개',
      checkbox: { equals: true }
    }
  });

  console.log(`📥 Notion에서 ${response.results.length}개 칼럼 발견\n`);

  const posts = [];

  for (const page of response.results) {
    const props = page.properties;

    const title = props['제목']?.title?.[0]?.plain_text || '';
    const slug = props['slug']?.rich_text?.[0]?.plain_text || generateSlug(title);
    const category = props['카테고리']?.select?.name || '';
    const tags = props['태그']?.multi_select?.map(t => t.name) || [];
    const featured = props['추천']?.checkbox || false;
    const createdAt = props['작성일']?.date?.start || page.created_time;
    const thumbnailUrl = props['썸네일']?.files?.[0]?.file?.url || props['썸네일']?.files?.[0]?.external?.url || null;

    console.log(`  - ${title}`);

    // 본문 Markdown 변환
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const content = n2m.toMarkdownString(mdblocks).parent || '';

    // 요약 추출 (첫 200자)
    const excerpt = content.replace(/[#*_\[\]]/g, '').substring(0, 200) + '...';

    posts.push({
      notion_id: page.id,
      title,
      slug: slug || generateSlug(title, page.id),
      excerpt,
      content,
      category,
      tags,
      thumbnail_url: thumbnailUrl,
      author: '법무법인 더율',
      published: true,
      featured,
      views: 0,
      created_at: createdAt,
      published_at: createdAt
    });
  }

  console.log(`\n✅ ${posts.length}개 칼럼 추출 완료\n`);

  // 중복 제거 (notion_id 기준)
  const uniquePosts = Array.from(
    new Map(posts.map(p => [p.notion_id, p])).values()
  );

  console.log(`📌 중복 제거 후: ${uniquePosts.length}개\n`);

  // Supabase에 저장
  console.log('🚀 Supabase에 저장 중...\n');

  // 기존 데이터 삭제
  console.log('  🗑️  기존 Blog 데이터 삭제 중...');
  await supabase.from('blog_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  ✅ 기존 데이터 삭제 완료\n');

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(uniquePosts);

  if (error) {
    console.error('❌ Blog 저장 실패:', error.message);
    throw error;
  }

  console.log(`✅ ${uniquePosts.length}개 칼럼 저장 완료!\n`);
  return uniquePosts.length;
}

// ========================================
// 3. Instagram 마이그레이션
// ========================================
async function migrateInstagram() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Instagram → Supabase 이전             ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Notion에서 가져오기
  const response = await notion.databases.query({
    database_id: INSTAGRAM_DB_ID,
    page_size: 100,
    filter: {
      property: '공개',
      checkbox: { equals: true }
    }
  });

  console.log(`📥 Notion에서 ${response.results.length}개 게시물 발견\n`);

  const posts = [];

  for (const page of response.results) {
    const props = page.properties;

    const title = props['제목']?.title?.[0]?.plain_text || '';
    const postType = props['타입']?.select?.name || '일반';
    const caption = props['캡션']?.rich_text?.[0]?.plain_text || '';
    const thumbnailUrl = props['썸네일']?.files?.[0]?.file?.url || props['썸네일']?.files?.[0]?.external?.url || null;
    const createdAt = props['게시일']?.date?.start || page.created_time;
    const views = props['조회수']?.number || 0;
    const likes = props['좋아요수']?.number || 0;

    console.log(`  - ${title} (${postType})`);

    posts.push({
      notion_id: page.id,
      title,
      slug: generateSlug(title, page.id),
      post_type: postType,
      caption,
      thumbnail_url: thumbnailUrl,
      images: thumbnailUrl ? [thumbnailUrl] : [],
      published: true,
      views,
      likes,
      created_at: createdAt,
      published_at: createdAt
    });
  }

  console.log(`\n✅ ${posts.length}개 게시물 추출 완료\n`);

  // 중복 제거 (notion_id 기준)
  const uniquePosts = Array.from(
    new Map(posts.map(p => [p.notion_id, p])).values()
  );

  console.log(`📌 중복 제거 후: ${uniquePosts.length}개\n`);

  // Supabase에 저장
  console.log('🚀 Supabase에 저장 중...\n');

  // 기존 데이터 삭제
  console.log('  🗑️  기존 Instagram 데이터 삭제 중...');
  await supabase.from('instagram_posts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('  ✅ 기존 데이터 삭제 완료\n');

  const { data, error } = await supabase
    .from('instagram_posts')
    .insert(uniquePosts);

  if (error) {
    console.error('❌ Instagram 저장 실패:', error.message);
    throw error;
  }

  console.log(`✅ ${uniquePosts.length}개 게시물 저장 완료!\n`);
  return uniquePosts.length;
}

// ========================================
// 메인 실행
// ========================================
async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║  Notion → Supabase 전체 마이그레이션  ║');
  console.log('╚════════════════════════════════════════╝');

  try {
    const casesCount = await migrateCases();
    const blogCount = await migrateBlog();
    const instagramCount = await migrateInstagram();

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║         마이그레이션 완료!             ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`\n📊 요약:`);
    console.log(`  - Cases: ${casesCount}개`);
    console.log(`  - Blog: ${blogCount}개`);
    console.log(`  - Instagram: ${instagramCount}개`);
    console.log(`  - 총: ${casesCount + blogCount + instagramCount}개\n`);
  } catch (error) {
    console.error('\n❌ 마이그레이션 실패:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
