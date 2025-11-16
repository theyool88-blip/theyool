const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const FAQ_DB_ID = process.env.NOTION_FAQ_DB;
const BLOG_DB_ID = process.env.NOTION_BLOG_DB;
const CASES_DB_ID = process.env.NOTION_CASES_DB;

async function setupFAQRelations() {
  try {
    console.log('\n=== FAQ 데이터베이스에 Relation 속성 추가 ===\n');

    // Notion API로 데이터베이스 속성을 직접 추가할 수 없으므로
    // 사용자가 수동으로 추가해야 합니다.

    console.log('📋 Notion에서 다음 속성을 수동으로 추가해주세요:\n');

    console.log('1. 속성명: 관련칼럼');
    console.log('   타입: Relation');
    console.log('   연결 대상: 변호사칼럼 DB');
    console.log('   설정: Allow multiple relations ✓\n');

    console.log('2. 속성명: 관련사례');
    console.log('   타입: Relation');
    console.log('   연결 대상: 성공사례 DB');
    console.log('   설정: Allow multiple relations ✓\n');

    console.log('3. 속성명: 요약');
    console.log('   타입: Rich text');
    console.log('   설명: 카드 미리보기용 한 줄 요약 (50자 이내)\n');

    console.log('✅ 추가 후 이 스크립트를 다시 실행하면 테스트합니다.\n');

    // 현재 속성 확인
    const database = await notion.databases.retrieve({
      database_id: FAQ_DB_ID,
    });

    console.log('현재 FAQ DB 속성:');
    Object.keys(database.properties).forEach((prop) => {
      const type = database.properties[prop].type;
      console.log(`  - ${prop}: ${type}`);
    });

    // Relation 속성이 있는지 확인
    const hasRelatedPosts = database.properties['관련칼럼'];
    const hasRelatedCases = database.properties['관련사례'];
    const hasSummary = database.properties['요약'];

    if (hasRelatedPosts && hasRelatedCases && hasSummary) {
      console.log('\n✅ 모든 필수 속성이 추가되었습니다!');
      console.log('\n다음 단계: 일부 FAQ에 관련 칼럼/사례를 연결해보세요.');
    } else {
      console.log('\n⚠️  아직 추가되지 않은 속성:');
      if (!hasRelatedPosts) console.log('  - 관련칼럼');
      if (!hasRelatedCases) console.log('  - 관련사례');
      if (!hasSummary) console.log('  - 요약');
    }

  } catch (error) {
    console.error('❌ 에러:', error.message);
  }
}

setupFAQRelations();
