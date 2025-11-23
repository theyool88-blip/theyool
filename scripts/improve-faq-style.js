/**
 * FAQ 답변을 토스 스타일로 개선
 * - 짧고 명확한 문장
 * - 친근하고 공감하는 톤
 * - 단계별 설명
 * - 구체적인 액션 아이템
 */

const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const STYLE_PROMPT = `당신은 이혼 전문 법률 서비스 회사의 친절한 상담사입니다.
주어진 FAQ 답변을 토스(Toss) 스타일로 다시 작성해주세요.

토스 스타일 가이드라인:
1. 짧고 명확한 문장 사용
2. 친근하고 공감하는 톤 (딱딱한 법률 용어 최소화)
3. 핵심부터 먼저 답변
4. 필요시 단계별로 쉽게 설명
5. 구체적인 액션 아이템 제시
6. 이모지 사용 자제 (전문성 유지)
7. 존댓말 사용 (~~하세요)
8. 불필요한 장식어 제거

원본 답변: {original}

위 답변을 토스 스타일로 다시 작성해주세요. 같은 내용이지만 더 친절하고 이해하기 쉽게 풀어써주세요.
답변만 제공하고, 다른 설명은 하지 마세요.`;

async function improveAnswerStyle(question, originalAnswer) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: STYLE_PROMPT.replace('{original}', originalAnswer)
      }]
    });

    return message.content[0].text.trim();
  } catch (error) {
    console.error('AI 변환 오류:', error.message);
    return null;
  }
}

async function improveFAQStyle() {
  console.log('🎨 FAQ 답변 스타일 개선 시작\n');
  console.log('⏳ 157개 FAQ 처리 예상 시간: 약 10-15분\n');

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

    // 2. 각 FAQ 답변 개선
    let updateCount = 0;
    let errorCount = 0;

    for (let i = 0; i < allFaqs.length; i++) {
      const faq = allFaqs[i];
      const progress = `[${i + 1}/${allFaqs.length}]`;

      console.log(`${progress} 처리 중: ${faq.question.substring(0, 50)}...`);

      // AI로 답변 개선
      const improvedAnswer = await improveAnswerStyle(faq.question, faq.answer);

      if (!improvedAnswer) {
        console.log(`  ⚠️  AI 변환 실패 - 원본 유지\n`);
        errorCount++;
        continue;
      }

      // 데이터베이스 업데이트
      const { error: updateError } = await supabase
        .from('faqs')
        .update({ answer: improvedAnswer })
        .eq('id', faq.id);

      if (updateError) {
        console.error(`  ❌ DB 업데이트 실패:`, updateError.message);
        errorCount++;
      } else {
        console.log(`  ✅ 완료\n`);
        updateCount++;
      }

      // API Rate Limit 방지를 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 3. 결과 요약
    console.log('\n' + '='.repeat(60));
    console.log('📊 스타일 개선 완료');
    console.log('='.repeat(60));
    console.log(`총 FAQ 수: ${allFaqs.length}개`);
    console.log(`성공: ${updateCount}개`);
    console.log(`실패: ${errorCount}개`);
    console.log('='.repeat(60) + '\n');

    console.log('✅ 모든 작업이 완료되었습니다!\n');

  } catch (error) {
    console.error('❌ 작업 실패:', error);
    process.exit(1);
  }
}

// 실행
improveFAQStyle();
