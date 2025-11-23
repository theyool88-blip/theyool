/**
 * FAQ 답변 포맷팅 정리 스크립트
 *
 * 1. ** 마크다운 굵기 표시 제거
 * 2. 모바일 가독성을 위한 줄바꿈 추가
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * 답변 텍스트 포맷팅
 * @param {string} answer - 원본 답변
 * @returns {string} 정리된 답변
 */
function cleanAnswer(answer) {
  let cleaned = answer;

  // 1. ** 제거 (굵기 표시)
  cleaned = cleaned.replace(/\*\*/g, '');

  // 2. 문장 끝 기준으로 적절히 줄바꿈 추가
  // - 마침표(.), 물음표(?), 느낌표(!) 뒤에 공백이 있으면 줄바꿈
  // - 단, 숫자 뒤의 마침표는 제외 (예: 1. 항목)
  cleaned = cleaned.replace(/([^0-9])([.?!])\s+([^0-9])/g, '$1$2\n\n$3');

  // 3. 연속된 줄바꿈 정리 (3개 이상 → 2개로)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 4. 앞뒤 공백 제거
  cleaned = cleaned.trim();

  return cleaned;
}

/**
 * FAQ 데이터 정리 및 업데이트
 */
async function cleanFAQFormatting() {
  console.log('🧹 FAQ 답변 포맷팅 정리 시작\n');

  try {
    // 1. 모든 FAQ 가져오기
    console.log('📥 FAQ 데이터 가져오는 중...');
    const { data: allFaqs, error: fetchError } = await supabase
      .from('faqs')
      .select('id, question, answer, category')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true });

    if (fetchError) throw fetchError;

    console.log(`✅ ${allFaqs.length}개 FAQ 가져오기 완료\n`);

    // 2. 각 FAQ 정리
    console.log('🔧 답변 포맷팅 정리 중...\n');
    let updateCount = 0;
    let unchangedCount = 0;

    for (const faq of allFaqs) {
      const originalAnswer = faq.answer;
      const cleanedAnswer = cleanAnswer(originalAnswer);

      // 변경사항이 있는 경우만 업데이트
      if (originalAnswer !== cleanedAnswer) {
        console.log(`📝 업데이트: [${faq.category}] ${faq.question.substring(0, 40)}...`);
        console.log(`   원본 길이: ${originalAnswer.length}자`);
        console.log(`   정리 후: ${cleanedAnswer.length}자`);
        console.log(`   ** 제거: ${(originalAnswer.match(/\*\*/g) || []).length / 2}개\n`);

        const { error: updateError } = await supabase
          .from('faqs')
          .update({ answer: cleanedAnswer })
          .eq('id', faq.id);

        if (updateError) {
          console.error(`❌ 업데이트 실패 (${faq.id}):`, updateError.message);
        } else {
          updateCount++;
        }
      } else {
        unchangedCount++;
      }
    }

    // 3. 결과 요약
    console.log('\n' + '='.repeat(60));
    console.log('📊 포맷팅 정리 완료');
    console.log('='.repeat(60));
    console.log(`총 FAQ 수: ${allFaqs.length}개`);
    console.log(`업데이트됨: ${updateCount}개`);
    console.log(`변경 없음: ${unchangedCount}개`);
    console.log('='.repeat(60) + '\n');

    // 4. 샘플 확인
    if (updateCount > 0) {
      console.log('📋 업데이트된 FAQ 샘플 (처음 3개):\n');

      const { data: samples, error: sampleError } = await supabase
        .from('faqs')
        .select('question, answer, category')
        .limit(3);

      if (!sampleError && samples) {
        samples.forEach((sample, index) => {
          console.log(`${index + 1}. [${sample.category}] ${sample.question}`);
          console.log(`   답변: ${sample.answer.substring(0, 100)}...`);
          console.log('');
        });
      }
    }

    console.log('✅ 모든 작업이 완료되었습니다!\n');

  } catch (error) {
    console.error('❌ 작업 실패:', error);
    process.exit(1);
  }
}

// 실행
cleanFAQFormatting();
