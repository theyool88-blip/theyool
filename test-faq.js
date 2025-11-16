const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const FAQ_DB_ID = process.env.NOTION_FAQ_DB;

async function testFAQ() {
  try {
    console.log('\n=== FAQ 데이터베이스 테스트 ===\n');

    // 1. 데이터베이스 정보
    const database = await notion.databases.retrieve({
      database_id: FAQ_DB_ID,
    });

    console.log('📋 데이터베이스:', database.title[0]?.plain_text);
    console.log('\n속성 목록:');
    Object.keys(database.properties).forEach((prop) => {
      const type = database.properties[prop].type;
      console.log(`  - ${prop}: ${type}`);
    });

    // 2. FAQ 목록 조회
    const response = await notion.databases.query({
      database_id: FAQ_DB_ID,
      sorts: [
        {
          property: '순서',
          direction: 'ascending',
        },
      ],
      page_size: 5,
    });

    console.log(`\n✅ 총 ${response.results.length}개 FAQ 조회 (처음 5개):\n`);

    response.results.forEach((page) => {
      const props = page.properties;
      const 질문 = props.질문?.title?.[0]?.plain_text || '';
      const 카테고리 = props.카테고리?.multi_select?.map((c) => c.name).join(', ') || '';
      const 순서 = props.순서?.number || 0;
      const 공개 = props.공개?.checkbox ? '✓' : '✗';
      const 추천 = props.추천?.checkbox ? '⭐' : '';

      console.log(`${순서}. ${질문}`);
      console.log(`   카테고리: ${카테고리}`);
      console.log(`   공개: ${공개} ${추천}`);
      console.log('');
    });

    // 3. 추천 FAQ 조회
    const featuredResponse = await notion.databases.query({
      database_id: FAQ_DB_ID,
      filter: {
        property: '추천',
        checkbox: {
          equals: true,
        },
      },
    });

    console.log(`\n⭐ 추천 FAQ: ${featuredResponse.results.length}개`);

  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

testFAQ();
