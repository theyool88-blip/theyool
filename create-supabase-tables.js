const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function executeSQLFile(filePath, name) {
  console.log(`\n📄 ${name} 실행 중...`);

  const sql = fs.readFileSync(filePath, 'utf8');

  // SQL을 세미콜론으로 분리하여 각각 실행
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];

    try {
      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement + ';'
      });

      if (error) {
        // 이미 존재하는 경우 무시
        if (error.message.includes('already exists')) {
          console.log(`  ⚠️  ${i + 1}번째 구문 건너뜀 (이미 존재)`);
        } else {
          console.error(`  ❌ ${i + 1}번째 구문 실패:`, error.message);
        }
      } else {
        console.log(`  ✅ ${i + 1}번째 구문 성공`);
      }
    } catch (err) {
      console.error(`  ❌ ${i + 1}번째 구문 오류:`, err.message);
    }
  }

  console.log(`✅ ${name} 완료\n`);
}

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║  Supabase 테이블 생성                 ║');
  console.log('╚════════════════════════════════════════╝\n');

  try {
    await executeSQLFile(
      './supabase/migrations/20251114_create_cases_table.sql',
      'Cases 테이블'
    );

    await executeSQLFile(
      './supabase/migrations/20251114_create_blog_table.sql',
      'Blog 테이블'
    );

    await executeSQLFile(
      './supabase/migrations/20251114_create_instagram_table.sql',
      'Instagram 테이블'
    );

    console.log('\n╔════════════════════════════════════════╗');
    console.log('║     모든 테이블 생성 완료!            ║');
    console.log('╚════════════════════════════════════════╝');
  } catch (error) {
    console.error('\n❌ 테이블 생성 실패:', error.message);
    process.exit(1);
  }
}

main();
