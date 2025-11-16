const { Client } = require('@notionhq/client');
const { createClient } = require('@supabase/supabase-js');
const { NotionToMarkdown } = require('notion-to-md');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const CASES_DB_ID = process.env.NOTION_CASES_DB;
const BLOG_DB_ID = process.env.NOTION_BLOG_DB;

// Cases 데이터 파싱
function parseCase(page) {
  const props = page.properties;

  return {
    notion_id: page.id,
    title: props.제목?.title?.[0]?.plain_text || '',
    badge: props.Badge?.rich_text?.[0]?.plain_text || null,
    categories: props.카테고리?.multi_select?.map(s => s.name) || [],
    background: props.배경?.rich_text?.[0]?.plain_text || null,
    strategy: props.전략?.rich_text?.[0]?.plain_text || null,
    result: props.결과?.rich_text?.[0]?.plain_text || null,
    icon: props.Icon?.rich_text?.[0]?.plain_text || null,
    published: props.공개?.checkbox || false,
    views: props.조회수?.number || 0,
    sort_order: props.순서?.number || null,
  };
}

// Blog 데이터 파싱
async function parseBlog(page) {
  const props = page.properties;

  // Notion 본문을 Markdown으로 변환
  let content = '';
  try {
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    content = n2m.toMarkdownString(mdBlocks).parent || '';
  } catch (error) {
    console.error(`본문 변환 실패 (${page.id}):`, error.message);
  }

  const title = props.제목?.title?.[0]?.plain_text || '';
  let slug = props.Slug?.rich_text?.[0]?.plain_text || '';

  // slug가 비어있으면 제목으로 생성
  if (!slug && title) {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // 여전히 비어있으면 notion_id 사용
  if (!slug) {
    slug = page.id;
  }

  return {
    notion_id: page.id,
    title,
    slug,
    categories: props.카테고리?.multi_select?.map(s => s.name) || [],
    tags: props.태그?.multi_select?.map(s => s.name) || [],
    excerpt: props.요약?.rich_text?.[0]?.plain_text || null,
    content,
    published: props.공개?.checkbox || false,
    featured: props.추천?.checkbox || false,
    views: props.조회수?.number || 0,
    author: props.작성자?.rich_text?.[0]?.plain_text || '법무법인 더율',
    published_at: props.작성일?.date?.start || null,
  };
}

async function migrateCases() {
  console.log('\n📦 Cases 마이그레이션 시작...\n');

  try {
    const response = await notion.databases.query({
      database_id: CASES_DB_ID,
    });

    const cases = response.results.map(parseCase);
    console.log(`✅ ${cases.length}개의 Cases를 가져왔습니다.`);

    if (cases.length === 0) return;

    const { data, error } = await supabase
      .from('cases')
      .upsert(cases, { onConflict: 'notion_id' })
      .select();

    if (error) throw error;

    console.log(`✅ ${data.length}개의 Cases가 저장되었습니다.`);
    console.log(`   공개: ${cases.filter(c => c.published).length}개`);
    console.log(`   비공개: ${cases.filter(c => !c.published).length}개`);

  } catch (error) {
    console.error('❌ Cases 마이그레이션 실패:', error);
    throw error;
  }
}

async function migrateBlog() {
  console.log('\n📝 Blog 마이그레이션 시작...\n');

  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
    });

    console.log(`📥 ${response.results.length}개의 Blog를 가져오는 중...`);

    const blogs = [];
    const slugs = new Set();

    for (const page of response.results) {
      const blog = await parseBlog(page);

      // slug 중복 체크 및 고유하게 만들기
      let finalSlug = blog.slug;
      let counter = 1;
      while (slugs.has(finalSlug)) {
        finalSlug = `${blog.slug}-${counter}`;
        counter++;
      }
      slugs.add(finalSlug);
      blog.slug = finalSlug;

      blogs.push(blog);
      console.log(`  ✓ ${blog.title} (${blog.slug})`);
    }

    console.log(`\n✅ ${blogs.length}개의 Blog 데이터를 파싱했습니다.`);

    if (blogs.length === 0) return;

    const { data, error} = await supabase
      .from('blog_posts')
      .upsert(blogs, { onConflict: 'notion_id' })
      .select();

    if (error) throw error;

    console.log(`✅ ${data.length}개의 Blog가 저장되었습니다.`);
    console.log(`   공개: ${blogs.filter(b => b.published).length}개`);
    console.log(`   추천: ${blogs.filter(b => b.featured).length}개`);

  } catch (error) {
    console.error('❌ Blog 마이그레이션 실패:', error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Cases & Blog 마이그레이션 시작\n');

  try {
    await migrateCases();
    await migrateBlog();

    console.log('\n✅ 모든 마이그레이션 완료!');
  } catch (error) {
    console.error('\n❌ 마이그레이션 실패:', error);
    process.exit(1);
  }
}

main();
