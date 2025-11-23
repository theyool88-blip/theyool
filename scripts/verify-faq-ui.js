/**
 * FAQ UI 검증 스크립트
 *
 * - 15개 카테고리가 모두 표시되는지 확인
 * - 157개 FAQ가 정상 로드되는지 확인
 * - Featured FAQ 25개가 정확히 표시되는지 확인
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const EXPECTED_CATEGORIES = [
  { name: '긴급상황/즉시도움', slug: 'emergency' },
  { name: '가정폭력/위협', slug: 'domestic-violence' },
  { name: '이혼절차/기본정보', slug: 'divorce-process' },
  { name: '별거/생활비', slug: 'separation-expense' },
  { name: '증거수집/준비', slug: 'evidence-collection' },
  { name: '불륜/외도', slug: 'adultery' },
  { name: '위자료', slug: 'alimony' },
  { name: '양육권', slug: 'custody' },
  { name: '양육비', slug: 'child-support' },
  { name: '면접교섭', slug: 'visitation' },
  { name: '재산분할', slug: 'property-division' },
  { name: '친자확인', slug: 'paternity' },
  { name: '이혼 후 문제', slug: 'post-divorce' },
  { name: '국제이혼/특수상황', slug: 'international-divorce' },
  { name: '변호사/법적지원', slug: 'legal-support' },
];

async function verifyFAQ() {
  console.log('🔍 FAQ 데이터 검증 시작\n');

  try {
    // 1. 전체 FAQ 수 확인
    const { data: allFaqs, error: allError } = await supabase
      .from('faqs')
      .select('id, question, category, featured, published, slug')
      .eq('published', true);

    if (allError) throw allError;

    console.log('✅ 총 FAQ 수:', allFaqs.length, '개');
    console.log('✅ Featured FAQ:', allFaqs.filter(f => f.featured).length, '개\n');

    // 2. 카테고리별 통계
    console.log('📊 카테고리별 분포:\n');

    const categoryStats = {};
    allFaqs.forEach(faq => {
      if (!categoryStats[faq.category]) {
        categoryStats[faq.category] = { total: 0, featured: 0 };
      }
      categoryStats[faq.category].total++;
      if (faq.featured) categoryStats[faq.category].featured++;
    });

    let hasAllCategories = true;
    EXPECTED_CATEGORIES.forEach(cat => {
      const stats = categoryStats[cat.slug];
      if (stats) {
        console.log(`  ✅ ${cat.name} (${cat.slug}): ${stats.total}개 (⭐ ${stats.featured}개)`);
      } else {
        console.log(`  ❌ ${cat.name} (${cat.slug}): 없음`);
        hasAllCategories = false;
      }
    });

    // 3. 예상치 못한 카테고리 확인
    const unexpectedCategories = Object.keys(categoryStats).filter(
      slug => !EXPECTED_CATEGORIES.find(cat => cat.slug === slug)
    );

    if (unexpectedCategories.length > 0) {
      console.log('\n⚠️  예상치 못한 카테고리:');
      unexpectedCategories.forEach(slug => {
        console.log(`  - ${slug}: ${categoryStats[slug].total}개`);
      });
    }

    // 4. Slug 중복 확인
    console.log('\n🔍 Slug 중복 검사...');
    const slugs = allFaqs.map(f => f.slug);
    const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

    if (duplicateSlugs.length > 0) {
      console.log('❌ 중복된 Slug 발견:');
      [...new Set(duplicateSlugs)].forEach(slug => {
        console.log(`  - ${slug}`);
      });
    } else {
      console.log('✅ Slug 중복 없음');
    }

    // 5. Featured FAQ 샘플 출력
    console.log('\n⭐ Featured FAQ 샘플 (처음 10개):');
    const featuredFaqs = allFaqs.filter(f => f.featured).slice(0, 10);
    featuredFaqs.forEach((faq, index) => {
      console.log(`  ${index + 1}. [${faq.category}] ${faq.question.substring(0, 50)}...`);
    });

    // 6. 각 카테고리별 첫 FAQ 샘플
    console.log('\n📋 각 카테고리별 첫 번째 FAQ:');
    EXPECTED_CATEGORIES.forEach(cat => {
      const categoryFaq = allFaqs.find(f => f.category === cat.slug);
      if (categoryFaq) {
        console.log(`  ${cat.name}:`);
        console.log(`    Q: ${categoryFaq.question.substring(0, 60)}...`);
        console.log(`    Slug: ${categoryFaq.slug}`);
      }
    });

    // 7. 최종 검증 결과
    console.log('\n' + '='.repeat(60));
    console.log('📊 검증 결과 요약');
    console.log('='.repeat(60));
    console.log(`총 FAQ: ${allFaqs.length}개 (예상: 157개)`);
    console.log(`Featured: ${allFaqs.filter(f => f.featured).length}개 (예상: 25개)`);
    console.log(`카테고리: ${Object.keys(categoryStats).length}개 (예상: 15개)`);
    console.log(`전체 카테고리 존재: ${hasAllCategories ? '✅ 통과' : '❌ 실패'}`);
    console.log(`Slug 중복: ${duplicateSlugs.length === 0 ? '✅ 없음' : '❌ 발견됨'}`);
    console.log('='.repeat(60) + '\n');

    if (allFaqs.length === 157 &&
        allFaqs.filter(f => f.featured).length === 25 &&
        hasAllCategories &&
        duplicateSlugs.length === 0) {
      console.log('✅ 모든 검증 통과! FAQ 시스템이 정상적으로 작동합니다.\n');
    } else {
      console.log('⚠️  일부 검증 실패. 위 내용을 확인하세요.\n');
    }

  } catch (error) {
    console.error('❌ 검증 실패:', error);
    process.exit(1);
  }
}

verifyFAQ();
