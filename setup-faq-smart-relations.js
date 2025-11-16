const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const FAQ_DB_ID = process.env.NOTION_FAQ_DB;
const BLOG_DB_ID = process.env.NOTION_BLOG_DB;
const CASES_DB_ID = process.env.NOTION_CASES_DB;

// FAQ 질문과 칼럼/사례를 키워드로 매칭
const relationMap = {
  '재산분할': {
    칼럼_키워드: ['재산분할', '재산'],
    사례_카테고리: ['재산분할'],
  },
  '위자료': {
    칼럼_키워드: ['위자료'],
    사례_카테고리: ['위자료'],
  },
  '양육권': {
    칼럼_키워드: ['양육권', '양육'],
    사례_카테고리: ['양육권'],
  },
  '양육비': {
    칼럼_키워드: ['양육비', '양육'],
    사례_카테고리: ['양육권'],
  },
  '이혼절차': {
    칼럼_키워드: ['이혼', '절차'],
    사례_카테고리: ['이혼절차'],
  },
};

async function getAllBlogs() {
  const blogs = [];
  let cursor = undefined;

  do {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
      start_cursor: cursor,
      filter: {
        property: '공개',
        checkbox: { equals: true },
      },
    });

    blogs.push(...response.results);
    cursor = response.next_cursor;
  } while (cursor);

  return blogs;
}

async function getAllCases() {
  const cases = [];
  let cursor = undefined;

  do {
    const response = await notion.databases.query({
      database_id: CASES_DB_ID,
      start_cursor: cursor,
      filter: {
        property: '공개',
        checkbox: { equals: true },
      },
    });

    cases.push(...response.results);
    cursor = response.next_cursor;
  } while (cursor);

  return cases;
}

async function setupSmartRelations() {
  try {
    console.log('\n=== FAQ 자동 연결 시작 ===\n');

    // 1. FAQ 데이터베이스 속성 확인
    const database = await notion.databases.retrieve({
      database_id: FAQ_DB_ID,
    });

    const has관련칼럼 = database.properties['관련칼럼'];
    const has관련사례 = database.properties['관련사례'];

    if (!has관련칼럼 || !has관련사례) {
      console.log('❌ 먼저 Notion에서 속성을 추가해주세요:\n');
      console.log('방법:');
      console.log('1. Notion에서 FAQ 데이터베이스 열기');
      console.log('2. 우측 상단 "..." 클릭 → Properties');
      console.log('3. "+ Add a property" 클릭');
      console.log('4. 이름: "관련칼럼", 타입: "Relation", 연결: "변호사칼럼 DB"');
      console.log('5. 이름: "관련사례", 타입: "Relation", 연결: "성공사례 DB"');
      console.log('6. 둘 다 "Show on..." 체크, "Allow multiple relations" 체크\n');
      return;
    }

    console.log('✅ 관련칼럼, 관련사례 속성 확인됨\n');

    // 2. 모든 칼럼과 사례 가져오기
    console.log('📚 칼럼과 사례 데이터 로딩 중...');
    const [allBlogs, allCases] = await Promise.all([
      getAllBlogs(),
      getAllCases(),
    ]);

    console.log(`✅ 칼럼 ${allBlogs.length}개, 사례 ${allCases.length}개 로딩됨\n`);

    // 3. FAQ 목록 가져오기
    const faqResponse = await notion.databases.query({
      database_id: FAQ_DB_ID,
    });

    console.log(`📋 FAQ ${faqResponse.results.length}개 처리 시작...\n`);

    // 4. 각 FAQ별로 관련 콘텐츠 찾아서 연결
    let updatedCount = 0;

    for (const faq of faqResponse.results) {
      const props = faq.properties;
      const 질문 = props.질문?.title?.[0]?.plain_text || '';
      const 카테고리들 = props.카테고리?.multi_select?.map(c => c.name) || [];

      if (!질문) continue;

      console.log(`\n처리 중: ${질문}`);
      console.log(`카테고리: ${카테고리들.join(', ')}`);

      // 매칭할 칼럼 찾기
      const matchedBlogs = [];
      const matchedCases = [];

      for (const 카테고리 of 카테고리들) {
        const mapping = relationMap[카테고리];
        if (!mapping) continue;

        // 칼럼 매칭
        for (const blog of allBlogs) {
          const blogTitle = blog.properties.제목?.title?.[0]?.plain_text || '';
          const hasKeyword = mapping.칼럼_키워드.some(keyword =>
            blogTitle.includes(keyword)
          );

          if (hasKeyword && matchedBlogs.length < 3) {
            matchedBlogs.push(blog.id);
          }
        }

        // 사례 매칭
        for (const caseItem of allCases) {
          const caseCategories = caseItem.properties.카테고리?.multi_select?.map(c => c.name) || [];
          const hasCategory = mapping.사례_카테고리.some(cat =>
            caseCategories.includes(cat)
          );

          if (hasCategory && matchedCases.length < 2) {
            matchedCases.push(caseItem.id);
          }
        }
      }

      // 연결 업데이트
      if (matchedBlogs.length > 0 || matchedCases.length > 0) {
        const updateData = { properties: {} };

        if (matchedBlogs.length > 0) {
          updateData.properties['관련칼럼'] = {
            relation: matchedBlogs.map(id => ({ id })),
          };
        }

        if (matchedCases.length > 0) {
          updateData.properties['관련사례'] = {
            relation: matchedCases.map(id => ({ id })),
          };
        }

        await notion.pages.update({
          page_id: faq.id,
          ...updateData,
        });

        console.log(`  ✅ 연결됨: 칼럼 ${matchedBlogs.length}개, 사례 ${matchedCases.length}개`);
        updatedCount++;
      } else {
        console.log('  ⏭️  매칭 안됨');
      }
    }

    console.log(`\n\n=== 완료 ===`);
    console.log(`총 ${updatedCount}개 FAQ에 관련 콘텐츠 연결됨\n`);

  } catch (error) {
    console.error('❌ 에러:', error.message);
    if (error.code === 'validation_error') {
      console.log('\n💡 속성이 아직 추가되지 않았습니다.');
      console.log('위의 방법대로 Notion에서 "관련칼럼", "관련사례" 속성을 추가해주세요.\n');
    }
  }
}

setupSmartRelations();
