const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function setupFAQDatabase() {
  try {
    console.log('\n=== FAQ 데이터베이스 생성 시작 ===\n');

    // 데이터베이스 생성
    const response = await notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: '2a7aa4dcb89b80ac81d5c896b88e5c85', // 더율 워크스페이스 페이지 ID
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'FAQ (자주 묻는 질문)',
          },
        },
      ],
      properties: {
        질문: {
          title: {},
        },
        답변: {
          rich_text: {},
        },
        카테고리: {
          multi_select: {
            options: [
              { name: '상담/비용', color: 'blue' },
              { name: '이혼절차', color: 'green' },
              { name: '위자료', color: 'purple' },
              { name: '재산분할', color: 'orange' },
              { name: '양육권/양육비', color: 'pink' },
              { name: '상간/불륜', color: 'red' },
            ],
          },
        },
        순서: {
          number: {
            format: 'number',
          },
        },
        공개: {
          checkbox: {},
        },
        추천: {
          checkbox: {},
        },
        작성일: {
          date: {},
        },
      },
    });

    console.log('✅ FAQ 데이터베이스 생성 완료!');
    console.log('📋 Database ID:', response.id);
    console.log('🔗 URL:', response.url);
    console.log('\n.env.local에 다음 내용을 추가하세요:');
    console.log(`NOTION_FAQ_DB=${response.id}`);

  } catch (error) {
    console.error('❌ 에러 발생:', error.message);
    if (error.code === 'validation_error') {
      console.log('\n💡 페이지 ID가 올바른지 확인해주세요.');
      console.log('노션에서 더율 워크스페이스의 페이지 ID를 확인해야 합니다.');
    }
  }
}

setupFAQDatabase();
