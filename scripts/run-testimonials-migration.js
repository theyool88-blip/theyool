/**
 * Testimonials 테이블 마이그레이션 실행 스크립트
 *
 * 사용법:
 * NEXT_PUBLIC_SUPABASE_URL="..." SUPABASE_SERVICE_ROLE_KEY="..." node scripts/run-testimonials-migration.js
 */

const fs = require('fs');
const path = require('path');

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ 환경 변수가 설정되지 않았습니다.');
    console.error('NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY를 설정하세요.');
    process.exit(1);
  }

  console.log('🚀 Testimonials 테이블 마이그레이션 시작...\n');

  // SQL 파일 읽기
  const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251118_create_testimonials_table.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('📄 SQL 파일 읽기 완료');
  console.log(`   경로: ${sqlPath}`);
  console.log(`   크기: ${(sql.length / 1024).toFixed(2)} KB\n`);

  try {
    // Supabase REST API를 사용하여 SQL 실행
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    console.log('✅ 마이그레이션 성공!\n');
    console.log('다음 작업:');
    console.log('1. Supabase Dashboard에서 testimonials 테이블 확인');
    console.log('2. 9개의 초기 데이터가 삽입되었는지 확인');
    console.log('3. 다음 명령어로 데이터 확인:');
    console.log('   SELECT COUNT(*) FROM testimonials;');

  } catch (error) {
    console.error('\n❌ 마이그레이션 실패:', error.message);
    console.error('\n대안: Supabase Dashboard에서 직접 실행하세요:');
    console.error('1. https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk 접속');
    console.error('2. SQL Editor 메뉴로 이동');
    console.error('3. New query 클릭');
    console.error(`4. ${sqlPath} 파일 내용 붙여넣기`);
    console.error('5. Run 버튼 클릭');
    process.exit(1);
  }
}

runMigration();
