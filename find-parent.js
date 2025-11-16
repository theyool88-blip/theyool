const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function findParent() {
  try {
    // 성공사례 데이터베이스 정보 가져오기
    const casesDB = await notion.databases.retrieve({
      database_id: '2a7aa4dc-b89b-80d4-8950-e308449f6941',
    });

    console.log('\n=== 성공사례 DB의 Parent 정보 ===');
    console.log('Parent Type:', casesDB.parent.type);
    console.log('Parent ID:', casesDB.parent.page_id || casesDB.parent.workspace);

    // 블로그 DB도 확인
    const blogDB = await notion.databases.retrieve({
      database_id: '2a7aa4dc-b89b-80b6-b055-c9c813f0a1be',
    });

    console.log('\n=== 블로그 DB의 Parent 정보 ===');
    console.log('Parent Type:', blogDB.parent.type);
    console.log('Parent ID:', blogDB.parent.page_id || blogDB.parent.workspace);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

findParent();
