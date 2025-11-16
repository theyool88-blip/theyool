const { Client: NotionClient } = require('@notionhq/client');
const { createClient } = require('@supabase/supabase-js');
const { NotionToMarkdown } = require('notion-to-md');

// Notion 설정
const notion = new NotionClient({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });
const FAQ_DB_ID = process.env.NOTION_FAQ_DB || '2aaaa4dcb89b809da2f3eda44e20bcd8';

// Supabase 설정
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Slug 생성 함수
function generateSlug(question) {
  return question
    .toLowerCase()
    .replace(/[^가-힣a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

async function getAllFAQsFromNotion() {
  console.log('📥 Notion에서 모든 FAQ 가져오는 중...\n');

  const response = await notion.databases.query({
    database_id: FAQ_DB_ID,
    page_size: 100,
    filter: {
      property: '공개',
      checkbox: {
        equals: true
      }
    }
  });

  const faqs = [];

  for (const page of response.results) {
    const props = page.properties;

    const question = props['질문']?.title?.[0]?.plain_text || '';
    const category = props['카테고리']?.multi_select?.[0]?.name || '기타';
    const summary = props['요약']?.rich_text?.[0]?.plain_text || '';
    const featured = props['추천']?.checkbox || false;
    const createdAt = props['작성일']?.date?.start || page.created_time;

    console.log(`  - ${question.substring(0, 50)}...`);

    // 본문 가져오기
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const answer = n2m.toMarkdownString(mdblocks).parent || '';

    faqs.push({
      question,
      slug: generateSlug(question),
      category,
      summary,
      answer,
      featured,
      published: true,
      views: 0,
      sort_order: faqs.length + 1,
      created_at: createdAt
    });
  }

  console.log(`\n✅ 총 ${faqs.length}개 FAQ 추출 완료\n`);
  return faqs;
}

async function createFaqTable() {
  console.log('🔨 Supabase FAQ 테이블 생성 중...\n');

  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS faqs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        question TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        summary TEXT,
        answer TEXT NOT NULL,
        featured BOOLEAN DEFAULT false,
        published BOOLEAN DEFAULT true,
        views INTEGER DEFAULT 0,
        sort_order INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
      CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(published);
      CREATE INDEX IF NOT EXISTS idx_faqs_slug ON faqs(slug);
    `
  });

  if (error && !error.message.includes('already exists')) {
    console.error('❌ 테이블 생성 실패:', error.message);
  } else {
    console.log('✅ 테이블 생성 완료\n');
  }
}

async function migrateFAQs(faqs) {
  console.log(`🚀 ${faqs.length}개 FAQ를 Supabase로 이전 중...\n`);

  // 중복 제거 (notion_id 기준)
  const uniqueFaqs = Array.from(
    new Map(faqs.map(f => [f.slug, f])).values()
  );

  console.log(`📌 중복 제거 후: ${uniqueFaqs.length}개\n`);

  // 기존 데이터 삭제
  console.log('🗑️  기존 FAQ 데이터 삭제 중...');
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  console.log('✅ 기존 데이터 삭제 완료\n');

  // 배치로 삽입 (10개씩)
  const batchSize = 10;
  for (let i = 0; i < uniqueFaqs.length; i += batchSize) {
    const batch = uniqueFaqs.slice(i, i + batchSize);

    const { error } = await supabase.from('faqs').insert(batch);

    if (error) {
      console.error(`❌ 배치 ${Math.floor(i/batchSize) + 1} 실패:`, error.message);
    } else {
      console.log(`✅ [${i + 1}-${Math.min(i + batchSize, uniqueFaqs.length)}/${uniqueFaqs.length}] 완료`);
    }
  }

  console.log('\n🎉 모든 FAQ 이전 완료!\n');
}

async function verifyMigration() {
  console.log('🔍 이전 결과 확인 중...\n');

  const { data, error, count } = await supabase
    .from('faqs')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('❌ 조회 실패:', error.message);
    return;
  }

  console.log(`✅ 총 ${count}개 FAQ가 Supabase에 저장됨\n`);

  // 카테고리별 분포
  const categories = {};
  data.forEach(faq => {
    categories[faq.category] = (categories[faq.category] || 0) + 1;
  });

  console.log('📊 카테고리별 분포:');
  Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  - ${cat}: ${count}개`);
  });
}

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Notion → Supabase FAQ 마이그레이션   ║');
  console.log('╚════════════════════════════════════════╝\n');

  try {
    // 테이블 생성은 건너뛰기 (이미 생성됨)
    console.log('⏭️  테이블은 이미 생성되어 있음 (건너뛰기)\n');

    const faqs = await getAllFAQsFromNotion();
    await migrateFAQs(faqs);
    await verifyMigration();

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║      마이그레이션 성공적으로 완료!    ║');
    console.log('╚════════════════════════════════════════╝');
  } catch (error) {
    console.error('\n❌ 마이그레이션 실패:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
