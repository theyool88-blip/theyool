/**
 * Testimonials 테이블 검증 스크립트
 */

const { createClient } = require('@supabase/supabase-js');

async function verifyTestimonials() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log('🔍 Testimonials 테이블 검증 중...\n');

  // 1. 전체 개수 확인
  const { data: allData, error: countError, count } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact' });

  if (countError) {
    console.error('❌ 에러:', countError.message);
    process.exit(1);
  }

  console.log(`✅ 총 ${count}개의 후기가 저장되어 있습니다.\n`);

  // 2. 게시된 후기 확인
  const { data: published } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .eq('consent_given', true)
    .order('display_order', { ascending: true });

  console.log(`📢 게시된 후기: ${published.length}개`);
  published.forEach((t, i) => {
    console.log(`   ${i + 1}. ${t.client_name} (${t.case_category}) - "${t.case_result}"`);
  });

  // 3. 카테고리별 분포
  console.log('\n📊 카테고리별 분포:');
  const categories = {};
  allData.forEach(t => {
    categories[t.case_category] = (categories[t.case_category] || 0) + 1;
  });
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count}개`);
  });

  // 4. 검증 상태
  const verified = allData.filter(t => t.verified).length;
  const withConsent = allData.filter(t => t.consent_given).length;
  console.log('\n✅ 검증 상태:');
  console.log(`   - 검증된 후기: ${verified}개`);
  console.log(`   - 동의 완료: ${withConsent}개`);

  console.log('\n✨ 검증 완료!');
}

verifyTestimonials();
