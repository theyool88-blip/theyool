const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// 각 케이스별 요약문
const summaries = {
  '특유재산 9억 분할': '배우자 명의 특유재산을 입증하여 9억 원 재산분할 승소',
  '전업주부, 위자료 5억 원 승소': '30년 헌신한 전업주부, 배우자 귀책으로 위자료 5억 원 확보',
  '폭력 남편, 단독 양육권 및 양육비 100% 확보': '가정폭력 입증으로 단독 양육권과 양육비 월 300만원 승소',
  '은닉 재산 발견, 재산분할 30% → 50%로 수정': '숨겨진 부동산과 주식 추적으로 재산분할 비율 20% 상향',
};

async function addSummaries() {
  try {
    // 모든 케이스 가져오기
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
    });

    console.log('\n=== 요약 추가 시작 ===\n');

    for (const page of response.results) {
      const title = page.properties.제목?.title?.[0]?.plain_text || '';
      const summary = summaries[title];

      if (summary) {
        // 요약 추가
        await notion.pages.update({
          page_id: page.id,
          properties: {
            요약: {
              rich_text: [
                {
                  text: {
                    content: summary,
                  },
                },
              ],
            },
          },
        });
        console.log(`✅ "${title}" - 요약 추가 완료`);
      } else {
        console.log(`⏭️  "${title}" - 요약 없음 (건너뜀)`);
      }
    }

    console.log('\n=== 완료 ===\n');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

addSummaries();
