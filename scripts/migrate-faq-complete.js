/**
 * FAQ 완전 교체 마이그레이션 스크립트
 *
 * 기존 76개 FAQ를 삭제하고 새로운 163개 FAQ로 교체
 * - 15개 카테고리 지원
 * - ⭐ 표시된 질문을 featured=true로 자동 매핑
 * - 질문 내용 기반 slug 자동 생성
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 15개 카테고리 매핑 (파일 순서 → DB 카테고리)
const CATEGORY_MAPPING = {
  '긴급상황/즉시도움': 'emergency',
  '가정폭력/위협': 'domestic-violence',
  '이혼절차/기본정보': 'divorce-process',
  '별거/생활비': 'separation-expense',
  '증거수집/준비': 'evidence-collection',
  '불륜/외도': 'adultery',
  '위자료': 'alimony',
  '양육권': 'custody',
  '양육비': 'child-support',
  '면접교섭': 'visitation',
  '재산분할': 'property-division',
  '친자확인': 'paternity',
  '이혼 후 문제': 'post-divorce',
  '국제이혼/특수상황': 'international-divorce',
  '변호사/법적지원': 'legal-support'
};

/**
 * 한글 텍스트를 URL-safe slug로 변환
 * @param {string} text - 변환할 텍스트
 * @param {string} category - 카테고리 (접두사로 사용)
 * @param {number} index - 카테고리 내 순번
 * @returns {string} slug
 */
function generateSlug(text, category, index) {
  // 간단한 영문 숫자 slug 생성 (카테고리-번호)
  return `${category}-${index}`;
}

/**
 * Markdown 파일 파싱
 * @param {string} filePath - 파일 경로
 * @returns {Array} FAQ 객체 배열
 */
function parseFAQMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const faqs = [];
  let currentCategory = null;
  let categoryIndex = 0;
  const categoryCounters = {}; // 카테고리별 카운터

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 카테고리 헤더 감지 (## 1. 카테고리명 (개수))
    if (line.match(/^## \d+\. .+\(\d+개\)/)) {
      const match = line.match(/^## \d+\. (.+) \(\d+개\)/);
      if (match) {
        currentCategory = match[1].trim();
        categoryCounters[currentCategory] = 0;
        categoryIndex++;
        console.log(`📁 카테고리 발견: ${currentCategory}`);
      }
      continue;
    }

    // 질문 감지 (**Q숫자. 질문내용 ⭐?**)
    if (line.match(/^\*\*Q\d+\./)) {
      if (!currentCategory) continue;

      const isFeatured = line.includes('⭐');
      const questionMatch = line.match(/^\*\*Q\d+\.\s*(.+?)\s*⭐?\*\*$/);
      if (!questionMatch) continue;

      const question = questionMatch[1].trim();

      // 다음 줄에서 답변 찾기 (**A:** 내용)
      let answer = '';
      let answerLine = i + 1;

      while (answerLine < lines.length) {
        const nextLine = lines[answerLine].trim();

        // 답변 시작
        if (nextLine.startsWith('**A:**')) {
          answer = nextLine.replace(/^\*\*A:\*\*\s*/, '').trim();
          break;
        }

        answerLine++;
      }

      if (!answer) {
        console.warn(`⚠️  질문에 대한 답변을 찾을 수 없음: ${question}`);
        continue;
      }

      // 카테고리 매핑
      const categorySlug = CATEGORY_MAPPING[currentCategory];
      if (!categorySlug) {
        console.warn(`⚠️  카테고리 매핑 실패: ${currentCategory}`);
        continue;
      }

      // 카운터 증가
      categoryCounters[currentCategory]++;
      const categoryCount = categoryCounters[currentCategory];

      // Slug 생성
      const slug = generateSlug(question, categorySlug, categoryCount);

      faqs.push({
        question,
        answer,
        category: categorySlug,
        featured: isFeatured,
        slug,
        sort_order: categoryCount,
        published: true,
        summary: answer.length > 100 ? answer.substring(0, 97) + '...' : answer
      });

      console.log(`  ✅ Q${categoryCount}: ${question.substring(0, 40)}... ${isFeatured ? '⭐' : ''}`);
    }
  }

  return faqs;
}

/**
 * Slug 중복 체크 및 수정
 * @param {Array} faqs - FAQ 배열
 * @returns {Array} 중복 제거된 FAQ 배열
 */
function ensureUniqueSlugs(faqs) {
  const slugCounts = {};

  return faqs.map(faq => {
    let slug = faq.slug;

    if (slugCounts[slug]) {
      // 중복 발견 - 숫자 접미사 추가
      slugCounts[slug]++;
      slug = `${slug}-${slugCounts[slug]}`;
    } else {
      slugCounts[slug] = 1;
    }

    return { ...faq, slug };
  });
}

/**
 * 통계 출력
 * @param {Array} faqs - FAQ 배열
 */
function printStatistics(faqs) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 FAQ 데이터 통계');
  console.log('='.repeat(60));
  console.log(`총 질문 수: ${faqs.length}개`);
  console.log(`에센셜 질문 (⭐): ${faqs.filter(f => f.featured).length}개`);
  console.log('');

  // 카테고리별 통계
  const categoryStats = {};
  faqs.forEach(faq => {
    if (!categoryStats[faq.category]) {
      categoryStats[faq.category] = { total: 0, featured: 0 };
    }
    categoryStats[faq.category].total++;
    if (faq.featured) categoryStats[faq.category].featured++;
  });

  console.log('카테고리별 분포:');
  Object.entries(categoryStats).forEach(([category, stats]) => {
    const categoryName = Object.keys(CATEGORY_MAPPING).find(
      key => CATEGORY_MAPPING[key] === category
    );
    console.log(`  ${categoryName}: ${stats.total}개 (⭐ ${stats.featured}개)`);
  });
  console.log('='.repeat(60) + '\n');
}

/**
 * 메인 실행
 */
async function main() {
  try {
    console.log('🚀 FAQ 마이그레이션 시작\n');

    // 1. Markdown 파일 파싱
    const faqFilePath = '/Users/hskim/Desktop/theyool_divorce_FAQ_final.md';
    console.log(`📖 파일 읽기: ${faqFilePath}\n`);

    let faqs = parseFAQMarkdown(faqFilePath);
    console.log(`\n✅ ${faqs.length}개 질문 파싱 완료\n`);

    // 2. Slug 중복 제거
    faqs = ensureUniqueSlugs(faqs);
    console.log('✅ Slug 중복 체크 완료\n');

    // 3. 통계 출력
    printStatistics(faqs);

    // 4. 사용자 확인
    console.log('⚠️  기존 FAQ 데이터를 모두 삭제하고 새 데이터로 교체합니다.');
    console.log('⚠️  이 작업은 되돌릴 수 없습니다.\n');

    // 5초 대기
    await new Promise(resolve => setTimeout(resolve, 5000));

    // 5. 기존 데이터 삭제
    console.log('🗑️  기존 FAQ 데이터 삭제 중...');
    const { error: deleteError } = await supabase
      .from('faqs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 모든 레코드 삭제

    if (deleteError) {
      throw new Error(`삭제 실패: ${deleteError.message}`);
    }
    console.log('✅ 기존 데이터 삭제 완료\n');

    // 6. 새 데이터 삽입 (배치 단위: 50개씩)
    console.log('📥 새 FAQ 데이터 삽입 중...');
    const batchSize = 50;
    let inserted = 0;

    for (let i = 0; i < faqs.length; i += batchSize) {
      const batch = faqs.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('faqs')
        .insert(batch)
        .select('id, question, slug, category, featured');

      if (error) {
        console.error(`\n❌ 배치 삽입 실패 (${i}-${i + batch.length}):`, error);
        throw error;
      }

      inserted += batch.length;
      console.log(`  ✅ ${inserted}/${faqs.length} 삽입 완료`);
    }

    console.log('\n✅ 모든 데이터 삽입 완료\n');

    // 7. 검증
    console.log('🔍 데이터 검증 중...');
    const { data: insertedFaqs, error: countError } = await supabase
      .from('faqs')
      .select('id, category, featured')
      .eq('published', true);

    if (countError) {
      throw new Error(`검증 실패: ${countError.message}`);
    }

    console.log(`\n📊 검증 결과:`);
    console.log(`  - 총 FAQ 수: ${insertedFaqs.length}개`);
    console.log(`  - Featured FAQ: ${insertedFaqs.filter(f => f.featured).length}개`);

    // 카테고리별 검증
    const dbCategoryStats = {};
    insertedFaqs.forEach(faq => {
      dbCategoryStats[faq.category] = (dbCategoryStats[faq.category] || 0) + 1;
    });

    console.log(`\n  카테고리별 분포:`);
    Object.entries(dbCategoryStats).forEach(([category, count]) => {
      console.log(`    - ${category}: ${count}개`);
    });

    console.log('\n✅ 마이그레이션 완료!\n');

  } catch (error) {
    console.error('\n❌ 마이그레이션 실패:', error);
    process.exit(1);
  }
}

// 실행
main();
