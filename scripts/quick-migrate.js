#!/usr/bin/env node

/**
 * 빠른 마이그레이션 실행 스크립트
 * Created: 2025-11-21
 *
 * 이 스크립트는 다음을 수행합니다:
 * 1. Supabase에 테이블이 이미 존재하는지 확인
 * 2. CSV 데이터 마이그레이션 실행
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTables() {
  console.log('테이블 존재 여부 확인 중...\n');

  const tables = ['users_profiles', 'clients', 'legal_cases', 'case_schedules', 'payments'];

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('id')
      .limit(1);

    if (error) {
      console.log(`❌ ${table}: 테이블이 존재하지 않습니다.`);
      console.log(`   에러: ${error.message}`);
    } else {
      console.log(`✓ ${table}: 테이블 존재함`);
    }
  }

  console.log('');
}

async function main() {
  console.log('='.repeat(80));
  console.log('빠른 마이그레이션 체크');
  console.log('='.repeat(80));
  console.log('');

  await checkTables();

  console.log('='.repeat(80));
  console.log('');
  console.log('다음 단계:');
  console.log('');
  console.log('1. 테이블이 존재하지 않는 경우:');
  console.log('   Supabase Dashboard에서 SQL 실행');
  console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql');
  console.log('');
  console.log('   파일: supabase/migrations/20251121_COMPLETE_ADMIN_SETUP.sql');
  console.log('');
  console.log('2. 테이블이 존재하는 경우:');
  console.log('   CSV 마이그레이션 실행');
  console.log('   node scripts/migrate-cases-csv.js');
  console.log('');
  console.log('='.repeat(80));
}

main();
