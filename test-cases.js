const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

async function testGetCases() {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
    });

    console.log('\n=== 성공사례 데이터 확인 ===\n');
    response.results.forEach((page, index) => {
      const props = page.properties;
      const num = index + 1;
      console.log(num + '. ' + (props.제목?.title?.[0]?.plain_text || 'No title'));
      console.log('   카테고리: ' + (props.카테고리?.multi_select?.map(c => c.name).join(', ') || 'None'));
      console.log('   커버이미지: ' + (props.커버이미지?.select?.name || 'Not set'));
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGetCases();
