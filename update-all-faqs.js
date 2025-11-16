const { Client } = require('@notionhq/client');
const fs = require('fs');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_FAQ_DB || '2aaaa4dcb89b809da2f3eda44e20bcd8';

// JSON 파일 읽기
const updatedFAQs = JSON.parse(fs.readFileSync('./faq-updates.json', 'utf8')).updated_faqs;
const newFAQs = JSON.parse(fs.readFileSync('./faq-new-questions.json', 'utf8')).new_faqs;

console.log(`기존 FAQ ${updatedFAQs.length}개 업데이트 예정`);
console.log(`신규 FAQ ${newFAQs.length}개 추가 예정`);
console.log(`총 ${updatedFAQs.length + newFAQs.length}개 FAQ 처리\n`);

async function updateExistingFAQs() {
  console.log('=== 기존 FAQ 업데이트 시작 ===\n');

  // 기존 FAQ 목록 가져오기
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    page_size: 100,
  });

  const existingPages = response.results;
  console.log(`DB에서 ${existingPages.length}개 페이지 발견\n`);

  // 질문으로 매칭하여 업데이트
  for (let i = 0; i < updatedFAQs.length; i++) {
    const faq = updatedFAQs[i];

    // 질문 텍스트로 기존 페이지 찾기
    const existingPage = existingPages.find(page => {
      const title = page.properties['질문']?.title?.[0]?.plain_text || '';
      return title === faq.question;
    });

    if (existingPage) {
      console.log(`[${i+1}/${updatedFAQs.length}] 업데이트: ${faq.question}`);

      try {
        // 페이지 속성 업데이트
        await notion.pages.update({
          page_id: existingPage.id,
          properties: {
            '카테고리': {
              multi_select: [{ name: faq.category }]
            },
            '요약': {
              rich_text: [{
                text: { content: faq.summary }
              }]
            },
            '추천': {
              checkbox: faq.featured || false
            },
            '공개': {
              checkbox: true
            }
          }
        });

        // 페이지 본문 업데이트 (블록 교체)
        const blocks = await notion.blocks.children.list({
          block_id: existingPage.id
        });

        // 기존 블록 모두 삭제
        for (const block of blocks.results) {
          await notion.blocks.delete({ block_id: block.id });
        }

        // 새 답변 추가
        const paragraphs = faq.answer.split('\n\n');
        for (const para of paragraphs) {
          if (para.trim()) {
            await notion.blocks.children.append({
              block_id: existingPage.id,
              children: [{
                paragraph: {
                  rich_text: [{
                    text: { content: para.trim() }
                  }]
                }
              }]
            });
          }
        }

        console.log(`  ✅ 완료 (카테고리: ${faq.category})`);
      } catch (error) {
        console.log(`  ❌ 오류: ${error.message}`);
      }
    } else {
      console.log(`[${i+1}/${updatedFAQs.length}] ⚠️  찾을 수 없음: ${faq.question}`);
    }

    // API 속도 제한 대응
    await new Promise(resolve => setTimeout(resolve, 350));
  }

  console.log('\n=== 기존 FAQ 업데이트 완료 ===\n');
}

async function addNewFAQs() {
  console.log('=== 신규 FAQ 추가 시작 ===\n');

  for (let i = 0; i < newFAQs.length; i++) {
    const faq = newFAQs[i];
    console.log(`[${i+1}/${newFAQs.length}] 추가: ${faq.question}`);

    try {
      // 새 페이지 생성
      const page = await notion.pages.create({
        parent: { database_id: DATABASE_ID },
        properties: {
          '질문': {
            title: [{
              text: { content: faq.question }
            }]
          },
          '카테고리': {
            multi_select: [{ name: faq.category }]
          },
          '요약': {
            rich_text: [{
              text: { content: faq.summary }
            }]
          },
          '추천': {
            checkbox: faq.featured || false
          },
          '공개': {
            checkbox: true
          },
          '작성일': {
            date: {
              start: new Date().toISOString().split('T')[0]
            }
          }
        }
      });

      // 답변 블록 추가
      const paragraphs = faq.answer.split('\n\n');
      for (const para of paragraphs) {
        if (para.trim()) {
          await notion.blocks.children.append({
            block_id: page.id,
            children: [{
              paragraph: {
                rich_text: [{
                  text: { content: para.trim() }
                }]
              }
            }]
          });
        }
      }

      console.log(`  ✅ 완료 (카테고리: ${faq.category})`);
    } catch (error) {
      console.log(`  ❌ 오류: ${error.message}`);
    }

    // API 속도 제한 대응
    await new Promise(resolve => setTimeout(resolve, 350));
  }

  console.log('\n=== 신규 FAQ 추가 완료 ===\n');
}

async function main() {
  console.log('╔═══════════════════════════════════════╗');
  console.log('║   FAQ 데이터베이스 대규모 업데이트   ║');
  console.log('╚═══════════════════════════════════════╝\n');

  await updateExistingFAQs();
  await addNewFAQs();

  console.log('╔═══════════════════════════════════════╗');
  console.log('║        모든 작업이 완료되었습니다!    ║');
  console.log('╚═══════════════════════════════════════╝');
}

main().catch(console.error);
