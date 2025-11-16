const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const BLOG_DB_ID = process.env.NOTION_BLOG_DB;

// 제목별 요약문
const summaries = {
  '이혼 위자료, 얼마나 받을 수 있을까?': '배우자의 귀책사유, 혼인 기간, 재산 상태 등을 고려하여 위자료 금액이 결정됩니다. 실제 사례와 함께 위자료 산정 기준을 알아봅니다.',
  '양육권 다툼, 어떻게 준비해야 할까?': '자녀의 의사, 양육 환경, 경제적 능력 등이 양육권 판단의 핵심입니다. 법원이 중요하게 보는 요소와 준비 방법을 소개합니다.',
  '협의이혼 vs 재판이혼, 어떤 것이 유리할까?': '이혼 방식에 따라 절차와 비용, 소요 기간이 달라집니다. 상황별로 유리한 이혼 방법과 주의사항을 정리했습니다.',
  '이혼 시 재산분할, 꼭 알아야 할 5가지': '재산분할 대상, 기여도 산정, 은닉재산 추적 등 재산분할의 핵심 5가지를 사례와 함께 설명합니다.',
  '재산분할, 혼인 기간이 짧아도 받을 수 있나요?': '단기 혼인이라도 재산 형성에 기여했다면 재산분할을 받을 수 있습니다. 단기혼 재산분할의 판단 기준과 전략을 알아봅니다.',
  '양육권 분쟁, 법원은 무엇을 중요하게 볼까?': '법원은 자녀의 복리를 최우선으로 판단합니다. 양육 의지, 환경, 자녀와의 유대감 등 법원의 판단 기준을 상세히 안내합니다.',
};

async function addBlogSummaries() {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
    });

    console.log('\n=== 칼럼 요약 추가 시작 ===\n');

    for (const page of response.results) {
      const title = page.properties.제목?.title?.[0]?.plain_text || '';
      const summary = summaries[title];

      if (summary) {
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

addBlogSummaries();
