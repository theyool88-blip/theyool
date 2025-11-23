#!/usr/bin/env node

/**
 * Supabase 마이그레이션 실행 스크립트
 * Created: 2025-11-21
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('법무법인 더율 사내 관리 시스템 - 마이그레이션 가이드');
console.log('='.repeat(80));
console.log('');

console.log('다음 SQL 파일들을 Supabase Dashboard에서 순서대로 실행해주세요:');
console.log('');
console.log('📍 Supabase Dashboard URL:');
console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql');
console.log('');

const migrations = [
  '20251121_admin_system_schema.sql',
  '20251121_admin_system_rls.sql',
  '20251121_extend_consultations.sql'
];

migrations.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
  console.log(`   위치: supabase/migrations/${file}`);
  console.log('');
});

console.log('='.repeat(80));
console.log('마이그레이션 SQL 파일 내용 확인:');
console.log('='.repeat(80));
console.log('');

migrations.forEach((file, index) => {
  const filePath = path.join(__dirname, '..', 'supabase', 'migrations', file);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').length;

    console.log(`${index + 1}. ${file} (${lines} lines)`);
    console.log('─'.repeat(80));
    console.log(content);
    console.log('');
  } else {
    console.log(`${index + 1}. ${file} - 파일을 찾을 수 없습니다.`);
  }
});

console.log('='.repeat(80));
console.log('');
console.log('⚠️  중요: SQL 실행 후 다음 명령으로 CSV 데이터를 마이그레이션하세요:');
console.log('');
console.log('   node scripts/migrate-cases-csv.js');
console.log('');
console.log('='.repeat(80));
