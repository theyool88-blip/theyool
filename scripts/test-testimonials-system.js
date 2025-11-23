/**
 * Testimonials 시스템 종합 테스트 스크립트
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runTests() {
  console.log('🧪 Testimonials 시스템 종합 테스트 시작\n');
  console.log('='.repeat(60));

  let passedTests = 0;
  let failedTests = 0;

  // 테스트 1: 데이터베이스 연결
  console.log('\n[테스트 1] 데이터베이스 연결 확인');
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('count')
      .limit(1);

    if (error) throw error;
    console.log('✅ PASS: 데이터베이스 연결 성공');
    passedTests++;
  } catch (error) {
    console.log('❌ FAIL: 데이터베이스 연결 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 2: 데이터 개수 확인
  console.log('\n[테스트 2] 초기 데이터 마이그레이션 확인');
  try {
    const { count, error } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    if (count === 9) {
      console.log(`✅ PASS: 9개의 후기 데이터 확인 (실제: ${count}개)`);
      passedTests++;
    } else {
      console.log(`❌ FAIL: 예상 9개, 실제 ${count}개`);
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: 데이터 개수 확인 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 3: Published 후기만 조회 (Public API 시뮬레이션)
  console.log('\n[테스트 3] 게시된 후기만 조회 (RLS 정책 테스트)');
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .eq('consent_given', true);

    if (error) throw error;
    console.log(`✅ PASS: ${data.length}개의 게시된 후기 조회 성공`);
    passedTests++;
  } catch (error) {
    console.log('❌ FAIL: 게시된 후기 조회 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 4: 카테고리별 필터링
  console.log('\n[테스트 4] 카테고리별 필터링 테스트');
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('case_category', '재산분할');

    if (error) throw error;
    if (data.length === 2) {
      console.log(`✅ PASS: 재산분할 카테고리 ${data.length}개 조회`);
      passedTests++;
    } else {
      console.log(`❌ FAIL: 예상 2개, 실제 ${data.length}개`);
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: 카테고리 필터링 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 5: 정렬 테스트 (display_order)
  console.log('\n[테스트 5] display_order 정렬 테스트');
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true })
      .limit(3);

    if (error) throw error;
    if (data[0].display_order === 1 && data[1].display_order === 2) {
      console.log(`✅ PASS: 정렬 올바름 (${data[0].display_order}, ${data[1].display_order}, ${data[2].display_order})`);
      passedTests++;
    } else {
      console.log(`❌ FAIL: 정렬 순서 문제`);
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: 정렬 테스트 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 6: Storage Bucket 존재 확인
  console.log('\n[테스트 6] Storage Bucket 존재 확인');
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucket = buckets?.find(b => b.name === 'testimonial-photos');

    if (bucket) {
      console.log('✅ PASS: testimonial-photos bucket 존재');
      console.log(`   - Public: ${bucket.public}`);
      passedTests++;
    } else {
      console.log('❌ FAIL: testimonial-photos bucket 없음');
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: Storage bucket 확인 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 7: 필수 필드 검증
  console.log('\n[테스트 7] 필수 필드 존재 확인');
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;

    const requiredFields = [
      'client_name',
      'client_initial',
      'client_role',
      'case_category',
      'case_result',
      'case_date',
      'content',
      'rating',
      'verified',
      'consent_given',
      'published',
      'avatar_bg_color',
      'avatar_text_color'
    ];

    const missingFields = requiredFields.filter(field => !(field in data));

    if (missingFields.length === 0) {
      console.log('✅ PASS: 모든 필수 필드 존재');
      passedTests++;
    } else {
      console.log(`❌ FAIL: 누락된 필드: ${missingFields.join(', ')}`);
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: 필드 검증 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 테스트 8: Public API 엔드포인트 테스트
  console.log('\n[테스트 8] Public API 엔드포인트 테스트');
  try {
    const response = await fetch('http://localhost:3000/api/testimonials');
    const result = await response.json();

    if (response.ok && result.data && result.data.length > 0) {
      console.log(`✅ PASS: API 엔드포인트 정상 작동 (${result.data.length}개 반환)`);
      passedTests++;
    } else {
      console.log('❌ FAIL: API 응답 문제');
      failedTests++;
    }
  } catch (error) {
    console.log('❌ FAIL: API 테스트 실패');
    console.log(`   에러: ${error.message}`);
    failedTests++;
  }

  // 결과 요약
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 테스트 결과 요약\n');
  console.log(`✅ 성공: ${passedTests}개`);
  console.log(`❌ 실패: ${failedTests}개`);
  console.log(`📈 성공률: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);

  if (failedTests === 0) {
    console.log('\n🎉 모든 테스트 통과! 시스템이 정상적으로 작동합니다.\n');
  } else {
    console.log('\n⚠️  일부 테스트 실패. 위의 에러 메시지를 확인하세요.\n');
  }

  process.exit(failedTests === 0 ? 0 : 1);
}

runTests().catch(err => {
  console.error('\n💥 치명적 에러:', err);
  process.exit(1);
});
