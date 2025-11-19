/**
 * Testimonials 마이그레이션 실행 스크립트
 *
 * Supabase Client를 사용하여 마이그레이션 SQL을 실행합니다.
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ 환경 변수 누락');
    console.error('NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 필요');
    process.exit(1);
  }

  console.log('🚀 Testimonials 마이그레이션 시작...\n');

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // SQL 파일 읽기 - NEW evidence-first architecture
  const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251120_recreate_testimonials_system.sql');
  const fullSql = fs.readFileSync(sqlPath, 'utf8');

  console.log(`📄 SQL 파일: ${path.basename(sqlPath)} (${(fullSql.length / 1024).toFixed(2)} KB)\n`);

  // SQL을 개별 명령으로 분리 (세미콜론 기준)
  // 단, 함수 정의 내부의 세미콜론은 제외
  const sqlStatements = fullSql
    .split(/;\s*\n/)
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  console.log(`📝 총 ${sqlStatements.length}개의 SQL 명령 발견\n`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < sqlStatements.length; i++) {
    const statement = sqlStatements[i] + ';';
    const preview = statement.substring(0, 60).replace(/\n/g, ' ') + '...';

    process.stdout.write(`[${i + 1}/${sqlStatements.length}] ${preview} `);

    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql: statement }).single();

      if (error) {
        console.log('❌');
        console.error(`   에러: ${error.message}`);
        errorCount++;
      } else {
        console.log('✅');
        successCount++;
      }
    } catch (err) {
      console.log('❌');
      console.error(`   예외: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${errorCount}개`);
  console.log(`${'='.repeat(60)}\n`);

  if (errorCount === 0) {
    console.log('🎉 마이그레이션 완료!\n');

    // 데이터 확인 - NEW table name
    console.log('📊 데이터 확인 중...');
    const { data: cases, error } = await supabase
      .from('testimonial_cases')
      .select('id, client_initial, category, published');

    if (error) {
      console.error('❌ 데이터 조회 실패:', error.message);
    } else {
      console.log(`✅ ${cases.length}개의 케이스가 저장되었습니다:\n`);
      cases.forEach((c, i) => {
        console.log(`   ${i + 1}. ${c.client_initial} - ${c.category} (게시: ${c.published ? 'O' : 'X'})`);
      });
    }
  } else {
    console.log('⚠️  일부 명령이 실패했습니다.');
    console.log('\n대안: Supabase Dashboard에서 수동 실행');
    console.log('1. https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk');
    console.log('2. SQL Editor 메뉴');
    console.log('3. 파일 내용 붙여넣기 후 Run');
  }

  process.exit(errorCount === 0 ? 0 : 1);
}

runMigration().catch(err => {
  console.error('\n❌ 치명적 에러:', err);
  console.error('\nSupabase Dashboard에서 수동으로 실행하세요:');
  console.error('https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk');
  process.exit(1);
});
