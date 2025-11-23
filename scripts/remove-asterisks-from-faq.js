/**
 * FAQ 답변에서 * 문자 제거 스크립트
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function removeAsterisks() {
  console.log('🧹 FAQ 답변에서 * 제거 시작\n');

  try {
    // 1. 모든 FAQ 가져오기
    console.log('📥 FAQ 데이터 가져오는 중...');
    const { data: allFaqs, error: fetchError } = await supabase
      .from('faqs')
      .select('id, question, answer')
      .order('category', { ascending: true });

    if (fetchError) throw fetchError;

    console.log(`✅ ${allFaqs.length}개 FAQ 가져오기 완료\n`);

    // 2. 각 FAQ에서 * 제거
    console.log('🔧 * 제거 중...\n');
    let updateCount = 0;
    let unchangedCount = 0;

    for (const faq of allFaqs) {
      const originalAnswer = faq.answer;

      // * 문자 제거
      const cleanedAnswer = originalAnswer.replace(/\*/g, '');

      // 변경사항이 있는 경우만 업데이트
      if (originalAnswer !== cleanedAnswer) {
        const asteriskCount = (originalAnswer.match(/\*/g) || []).length;

        console.log(`📝 업데이트: ${faq.question.substring(0, 50)}...`);
        console.log(`   * 제거: ${asteriskCount}개\n`);

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
    console.log('📊 * 제거 완료');
    console.log('='.repeat(60));
    console.log(`총 FAQ 수: ${allFaqs.length}개`);
    console.log(`업데이트됨: ${updateCount}개`);
    console.log(`변경 없음: ${unchangedCount}개`);
    console.log('='.repeat(60) + '\n');

    console.log('✅ 모든 작업이 완료되었습니다!\n');

  } catch (error) {
    console.error('❌ 작업 실패:', error);
    process.exit(1);
  }
}

// 실행
removeAsterisks();
