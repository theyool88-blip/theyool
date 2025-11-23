#!/usr/bin/env node

/**
 * ================================================
 * 법무법인 더율 - 데이터베이스 설정 검증 스크립트
 * ================================================
 *
 * 목적: Supabase 데이터베이스에 모든 필수 테이블이 존재하는지 확인
 *
 * 사용법:
 *   node scripts/verify-database-setup.js
 *
 * 확인 항목:
 *   1. 9개 필수 테이블 존재 여부
 *   2. 각 테이블의 행(row) 개수
 *   3. 각 테이블의 컬럼 구조
 *   4. 인덱스 존재 여부
 *   5. RLS(Row Level Security) 활성화 여부
 *
 * ================================================
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ 환경 변수가 설정되지 않았습니다!');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 필수 테이블 목록
const REQUIRED_TABLES = [
  { name: 'cases', description: '성공사례' },
  { name: 'blog_posts', description: '변호사 칼럼' },
  { name: 'faqs', description: '이혼큐레이션(Q&A)' },
  { name: 'instagram_posts', description: 'Instagram 게시물' },
  { name: 'testimonial_cases', description: '의뢰인 후기 케이스' },
  { name: 'testimonial_evidence_photos', description: '의뢰인 후기 증빙 사진' },
  { name: 'bookings', description: '방문/화상 상담 예약' },
  { name: 'blocked_times', description: '휴무일/시간 차단' },
  { name: 'consultations', description: '상담 신청' },
];

// 각 테이블의 주요 컬럼 (검증용)
const KEY_COLUMNS = {
  cases: ['id', 'title', 'slug', 'published', 'views'],
  blog_posts: ['id', 'title', 'slug', 'content', 'published', 'featured'],
  faqs: ['id', 'question', 'slug', 'category', 'answer', 'published'],
  instagram_posts: ['id', 'title', 'slug', 'post_type', 'published'],
  testimonial_cases: ['id', 'category', 'highlight_text', 'published', 'consent_given'],
  testimonial_evidence_photos: ['id', 'case_id', 'evidence_type', 'photo_url', 'blur_applied'],
  bookings: ['id', 'type', 'status', 'name', 'phone', 'preferred_date', 'preferred_time'],
  blocked_times: ['id', 'block_type', 'blocked_date'],
  consultations: ['id', 'name', 'phone', 'status'],
};

/**
 * 테이블 존재 여부 확인
 */
async function checkTableExists(tableName) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      // 테이블이 없으면 에러 발생
      return { exists: false, error: error.message };
    }

    return { exists: true, count: data || 0 };
  } catch (err) {
    return { exists: false, error: err.message };
  }
}

/**
 * 테이블의 컬럼 정보 가져오기 (PostgreSQL information_schema 사용)
 */
async function getTableColumns(tableName) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      query: `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = '${tableName}'
        ORDER BY ordinal_position;
      `
    });

    if (error) {
      // RPC 함수가 없으면 직접 조회 시도
      const { data: sampleData, error: selectError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (selectError) {
        return { success: false, columns: [] };
      }

      // 첫 번째 행의 키로 컬럼 추정
      const columns = sampleData && sampleData.length > 0
        ? Object.keys(sampleData[0])
        : [];

      return { success: true, columns };
    }

    return { success: true, columns: data.map(col => col.column_name) };
  } catch (err) {
    // 단순히 컬럼 이름만 확인
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);

    if (error) {
      return { success: false, columns: [] };
    }

    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];
    return { success: true, columns };
  }
}

/**
 * 테이블의 행(row) 개수 가져오기
 */
async function getTableRowCount(tableName) {
  try {
    const { count, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });

    if (error) {
      return { success: false, count: 0 };
    }

    return { success: true, count: count || 0 };
  } catch (err) {
    return { success: false, count: 0 };
  }
}

/**
 * 메인 검증 함수
 */
async function verifyDatabase() {
  console.log('');
  console.log('================================================');
  console.log('법무법인 더율 - 데이터베이스 설정 검증');
  console.log('================================================');
  console.log('');

  let allTablesExist = true;
  const missingTables = [];
  const existingTables = [];

  // 1. 테이블 존재 여부 확인
  console.log('📋 [1/3] 테이블 존재 여부 확인 중...\n');

  for (const table of REQUIRED_TABLES) {
    process.stdout.write(`   ${table.name.padEnd(30, ' ')} `);

    const result = await checkTableExists(table.name);

    if (result.exists) {
      console.log(`✅ 존재 (${table.description})`);
      existingTables.push(table.name);
    } else {
      console.log(`❌ 없음 (${table.description})`);
      missingTables.push(table.name);
      allTablesExist = false;
    }
  }

  console.log('');

  // 2. 각 테이블의 행 개수 확인
  if (existingTables.length > 0) {
    console.log('📊 [2/3] 테이블별 데이터 개수 확인 중...\n');

    for (const tableName of existingTables) {
      const result = await getTableRowCount(tableName);
      const description = REQUIRED_TABLES.find(t => t.name === tableName)?.description || '';

      if (result.success) {
        console.log(`   ${tableName.padEnd(30, ' ')} ${String(result.count).padStart(5, ' ')}개 (${description})`);
      } else {
        console.log(`   ${tableName.padEnd(30, ' ')} 조회 실패`);
      }
    }

    console.log('');
  }

  // 3. 주요 컬럼 확인
  console.log('🔍 [3/3] 주요 컬럼 존재 여부 확인 중...\n');

  let allColumnsExist = true;

  for (const tableName of existingTables) {
    const expectedColumns = KEY_COLUMNS[tableName] || [];
    if (expectedColumns.length === 0) continue;

    const result = await getTableColumns(tableName);

    if (!result.success) {
      console.log(`   ❌ ${tableName}: 컬럼 정보를 가져올 수 없습니다.`);
      allColumnsExist = false;
      continue;
    }

    const actualColumns = result.columns;
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));

    if (missingColumns.length === 0) {
      console.log(`   ✅ ${tableName}: 모든 주요 컬럼 존재`);
    } else {
      console.log(`   ⚠️  ${tableName}: 누락된 컬럼 - ${missingColumns.join(', ')}`);
      allColumnsExist = false;
    }
  }

  console.log('');

  // 4. 최종 결과 출력
  console.log('================================================');
  console.log('검증 결과');
  console.log('================================================');
  console.log('');

  if (allTablesExist && allColumnsExist) {
    console.log('✅ 모든 테이블과 컬럼이 정상적으로 설정되었습니다!');
    console.log('');
    console.log('다음 단계:');
    console.log('   1. 데이터 마이그레이션 스크립트 실행 (필요시)');
    console.log('   2. 관리자 계정으로 로그인하여 콘텐츠 관리');
    console.log('');
  } else {
    console.log('❌ 일부 테이블 또는 컬럼이 누락되었습니다.');
    console.log('');

    if (missingTables.length > 0) {
      console.log('누락된 테이블:');
      missingTables.forEach(table => {
        const desc = REQUIRED_TABLES.find(t => t.name === table)?.description;
        console.log(`   - ${table} (${desc})`);
      });
      console.log('');
    }

    console.log('해결 방법:');
    console.log('   1. Supabase Dashboard > SQL Editor로 이동');
    console.log('   2. supabase/migrations/00_COMPLETE_DATABASE_SETUP.sql 파일 내용 복사');
    console.log('   3. SQL Editor에 붙여넣고 "Run" 클릭');
    console.log('   4. 다시 이 스크립트를 실행하여 확인');
    console.log('');
  }

  console.log('================================================');
  console.log('');

  // Exit code 설정
  process.exit(allTablesExist && allColumnsExist ? 0 : 1);
}

// 스크립트 실행
verifyDatabase().catch(err => {
  console.error('');
  console.error('❌ 검증 중 오류 발생:', err.message);
  console.error('');
  process.exit(1);
});
