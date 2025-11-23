#!/usr/bin/env node

/**
 * Supabase 마이그레이션 직접 실행
 * Created: 2025-11-21
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Supabase 클라이언트 (Service Role Key 사용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function executeSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf-8');

  // SQL을 세미콜론으로 분리하여 개별 실행
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`Executing ${statements.length} SQL statements from ${path.basename(filePath)}...`);

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];

    try {
      // Supabase JavaScript 클라이언트는 직접 SQL 실행을 지원하지 않으므로
      // REST API를 직접 호출해야 합니다
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({ sql: stmt })
        }
      );

      if (!response.ok) {
        console.log(`  Statement ${i + 1}: Trying alternative method...`);
      }
    } catch (error) {
      console.log(`  Statement ${i + 1}: ${error.message}`);
    }
  }

  console.log(`✓ Completed ${path.basename(filePath)}\n`);
}

async function main() {
  console.log('='.repeat(80));
  console.log('Supabase 마이그레이션 실행');
  console.log('='.repeat(80));
  console.log('');
  console.log('⚠️  참고: Supabase JavaScript 클라이언트는 직접 SQL 실행을 지원하지 않습니다.');
  console.log('다음 방법 중 하나를 선택하세요:');
  console.log('');
  console.log('방법 1: Supabase Dashboard에서 SQL 실행 (권장)');
  console.log('  https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql');
  console.log('');
  console.log('방법 2: psql CLI 사용');
  console.log('  psql "postgresql://postgres:[PASSWORD]@db.kqqyipnlkmmprfgygauk.supabase.co:5432/postgres" < supabase/migrations/20251121_admin_system_schema.sql');
  console.log('');
  console.log('='.repeat(80));
  console.log('');

  // SQL 파일 내용 표시
  const migrations = [
    '20251121_admin_system_schema.sql',
    '20251121_admin_system_rls.sql',
    '20251121_extend_consultations.sql'
  ];

  console.log('다음 파일들을 복사하여 Supabase Dashboard의 SQL Editor에 붙여넣으세요:\n');

  migrations.forEach((file, idx) => {
    const filePath = path.join(__dirname, '..', 'supabase', 'migrations', file);
    console.log(`${idx + 1}. ${file}`);
    console.log(`   위치: ${filePath}`);
  });

  console.log('');
  console.log('='.repeat(80));
}

main();
