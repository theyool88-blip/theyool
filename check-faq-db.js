const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const FAQ_DB_ID = process.env.NOTION_FAQ_DB;

async function checkFAQDatabase() {
  try {
    console.log('\n=== FAQ 데이터베이스 확인 ===\n');
    console.log('Database ID:', FAQ_DB_ID);

    // 데이터베이스 정보 가져오기
    const database = await notion.databases.retrieve({
      database_id: FAQ_DB_ID,
    });

    console.log('✅ 데이터베이스 연결 성공!');
    console.log('제목:', database.title[0]?.plain_text || 'Untitled');
    console.log('\n속성 목록:');
    Object.keys(database.properties).forEach(prop => {
      const type = database.properties[prop].type;
      console.log(`  - ${prop} (${type})`);
    });

    // FAQ 목록 가져오기
    const response = await notion.databases.query({
      database_id: FAQ_DB_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '순서',
          direction: 'ascending',
        },
      ],
    });

    console.log(`\n✅ 공개된 FAQ: ${response.results.length}개`);

    response.results.forEach((page, index) => {
      const props = page.properties;
      console.log(`\n${index + 1}. ${props.질문?.title?.[0]?.plain_text || 'No question'}`);
      console.log(`   카테고리: ${props.카테고리?.multi_select?.map(c => c.name).join(', ') || 'None'}`);
      console.log(`   순서: ${props.순서?.number || '-'}`);
      console.log(`   추천: ${props.추천?.checkbox ? 'Yes' : 'No'}`);
    });

  } catch (error) {
    console.error('❌ 에러:', error.message);
    if (error.code === 'object_not_found') {
      console.log('\n💡 데이터베이스 ID가 올바른지 확인하고, Notion Integration에 공유되었는지 확인하세요.');
    }
  }
}

checkFAQDatabase();
