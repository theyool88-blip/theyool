/**
 * SMS 시스템 초기 설정 스크립트
 * 실행: node scripts/setup-sms-system.js
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 환경 변수 로드
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupSMSSystem() {
  console.log('🚀 SMS 시스템 설정 시작...\n');

  try {
    // 1. SQL 마이그레이션 실행
    console.log('1. 데이터베이스 마이그레이션 실행 중...');
    const migrationSQL = readFileSync(
      join(__dirname, '..', 'supabase', 'migrations', '20251121_sms_system.sql'),
      'utf-8'
    );

    // SQL 문을 세미콜론으로 분리하여 개별 실행
    const statements = migrationSQL
      .split(';')
      .filter(stmt => stmt.trim().length > 0)
      .map(stmt => stmt.trim() + ';');

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];

      // 주석이나 빈 문장 건너뛰기
      if (stmt.startsWith('--') || stmt.length < 10) continue;

      try {
        const { error } = await supabase.rpc('exec_sql', {
          query: stmt
        });

        if (error) {
          console.error(`  ❌ Statement ${i + 1} 실패:`, error.message);
        } else {
          process.stdout.write('.');
        }
      } catch (err) {
        console.error(`  ❌ Statement ${i + 1} 에러:`, err.message);
      }
    }

    console.log('\n  ✅ 데이터베이스 마이그레이션 완료\n');

    // 2. 테이블 확인
    console.log('2. 생성된 테이블 확인 중...');

    const { data: templates, error: templatesError } = await supabase
      .from('sms_templates')
      .select('count')
      .single();

    if (templatesError) {
      console.error('  ❌ sms_templates 테이블 확인 실패:', templatesError);
    } else {
      console.log('  ✅ sms_templates 테이블 생성 확인');
    }

    const { data: logs, error: logsError } = await supabase
      .from('sms_logs')
      .select('count')
      .single();

    if (logsError) {
      console.error('  ❌ sms_logs 테이블 확인 실패:', logsError);
    } else {
      console.log('  ✅ sms_logs 테이블 생성 확인');
    }

    // 3. 기본 템플릿 확인
    console.log('\n3. 기본 템플릿 확인 중...');
    const { data: templateList, error: listError } = await supabase
      .from('sms_templates')
      .select('name, office, type')
      .order('office', { ascending: true });

    if (listError) {
      console.error('  ❌ 템플릿 목록 조회 실패:', listError);
    } else {
      console.log(`  ✅ ${templateList.length}개의 템플릿 등록됨:`);
      templateList.forEach(t => {
        console.log(`     - [${t.office}] ${t.name} (${t.type})`);
      });
    }

    // 4. 환경 변수 확인
    console.log('\n4. SMS API 설정 확인 중...');

    if (process.env.SOLAPI_API_KEY) {
      console.log('  ✅ SOLAPI_API_KEY 설정됨');
    } else {
      console.log('  ⚠️  SOLAPI_API_KEY가 설정되지 않음 (.env.local에 추가 필요)');
    }

    if (process.env.SOLAPI_API_SECRET) {
      console.log('  ✅ SOLAPI_API_SECRET 설정됨');
    } else {
      console.log('  ⚠️  SOLAPI_API_SECRET이 설정되지 않음 (.env.local에 추가 필요)');
    }

    if (process.env.SOLAPI_SENDER) {
      console.log('  ✅ SOLAPI_SENDER 설정됨:', process.env.SOLAPI_SENDER);
    } else {
      console.log('  ⚠️  SOLAPI_SENDER가 설정되지 않음 (.env.local에 추가 필요)');
    }

    console.log('\n✨ SMS 시스템 설정 완료!\n');
    console.log('다음 단계:');
    console.log('1. 관리자 페이지에서 SMS 템플릿 확인: /admin/sms-templates');
    console.log('2. 예약 관리에서 입금대기 상태 테스트: /admin/bookings');
    console.log('3. .env.local에 Solapi API 키 설정 확인');

  } catch (error) {
    console.error('\n❌ 설정 중 오류 발생:', error);
    process.exit(1);
  }
}

// 직접 SQL 실행을 위한 헬퍼 (Supabase가 exec_sql을 지원하지 않는 경우)
async function executeSQL(sql) {
  try {
    // Supabase의 REST API를 직접 호출
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
      {
        method: 'POST',
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return { success: true };
  } catch (error) {
    console.error('SQL 실행 실패:', error);
    return { success: false, error };
  }
}

// 스크립트 실행
setupSMSSystem();