/**
 * 추가 샘플 의뢰인 후기 케이스 4개 추가
 */

const { createClient } = require('@supabase/supabase-js');

async function addMoreTestimonials() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ 환경 변수 누락');
    console.error('NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 필요');
    process.exit(1);
  }

  console.log('🚀 추가 의뢰인 후기 케이스 4개 추가 시작...\n');

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // 4개의 다양한 케이스
  const newCases = [
    {
      category: 'custody',
      highlight_text: '양육권 전부 승소, 양육비 월 300만원',
      case_result_amount: null,
      client_initial: '이',
      client_role: '30대 여성',
      client_age_group: '30대',
      full_story: `남편의 폭력과 외도로 이혼을 결심했지만, 가장 걱정되는 것은 아이들이었습니다. 경제적으로 남편보다 불리한 상황이었고, 혼자 두 아이를 키울 수 있을지 확신이 없었습니다.

하지만 임은지 변호사님께서 체계적으로 증거를 준비하고, 저의 양육 의지와 능력을 법정에서 입증해주셨습니다.

결과적으로 두 아이의 양육권을 모두 얻었고, 양육비로 월 300만원을 받게 되었습니다. 이제 아이들과 함께 안정적인 생활을 시작할 수 있게 되었습니다.`,
      story_before: '남편의 폭력과 외도 상황에서 경제력이 부족해 양육권을 잃을까 두려웠습니다.',
      story_journey: '4개월 동안 양육 일지 작성, 폭력 증거 수집, 전문가 소견서 준비 등 체계적으로 준비했습니다.',
      story_after: '두 아이의 양육권과 월 300만원의 양육비를 확보하여 안정적인 생활 기반을 마련했습니다.',
      case_date: '2024년 9월',
      case_duration: '4개월',
      attorney_name: '임은지',
      verified: true,
      consent_given: true,
      consent_date: new Date().toISOString(),
      featured: true,
      published: true,
      display_order: 1,
    },
    {
      category: 'property',
      highlight_text: '재산분할 15억 + 위자료 5천만원',
      case_result_amount: 1550000000,
      client_initial: '박',
      client_role: '40대 여성',
      client_age_group: '40대',
      full_story: `20년 결혼생활 동안 남편 사업을 도우며 살림을 꾸려왔지만, 남편은 제 기여를 인정하지 않았습니다. 재산은 모두 남편 명의였고, 저는 법적으로 아무것도 받지 못할까 걱정했습니다.

법무법인 더율 임은지 변호사님은 제가 남편 사업에 기여한 부분들을 꼼꼼히 정리하고, 숨겨진 재산까지 찾아내주셨습니다.

최종적으로 재산분할 15억과 위자료 5천만원을 받았습니다. 이제 경제적으로 독립하여 새로운 삶을 시작할 수 있게 되었습니다.`,
      story_before: '20년 결혼생활의 기여도를 인정받지 못하고, 재산도 모두 남편 명의라 막막했습니다.',
      story_journey: '5개월 동안 재산 목록 조사, 기여도 입증 자료 수집, 숨겨진 재산 추적 등을 진행했습니다.',
      story_after: '재산분할 15억과 위자료 5천만원으로 경제적 독립을 이루고 새 삶을 시작했습니다.',
      case_date: '2024년 8월',
      case_duration: '5개월',
      attorney_name: '임은지',
      verified: true,
      consent_given: true,
      consent_date: new Date().toISOString(),
      featured: true,
      published: true,
      display_order: 2,
    },
    {
      category: 'adultery',
      highlight_text: '상간소송 위자료 3천만원 승소',
      case_result_amount: 30000000,
      client_initial: '최',
      client_role: '30대 남성',
      client_age_group: '30대',
      full_story: `아내의 외도 사실을 알게 되었을 때 너무 충격적이었습니다. 상간자를 상대로 소송을 하고 싶었지만, 증거가 부족해 어려울 것 같았습니다.

임은지 변호사님께서 외도 증거 수집 방법을 조언해주셨고, 합법적인 방법으로 충분한 증거를 확보할 수 있었습니다.

상간자를 상대로 한 소송에서 위자료 3천만원을 받았고, 아내와의 이혼에서도 유리한 조건을 이끌어냈습니다.`,
      story_before: '아내의 외도를 알았지만 증거가 부족하고, 어떻게 대응해야 할지 몰랐습니다.',
      story_journey: '2개월 동안 합법적 방법으로 외도 증거를 수집하고, 상간소송을 준비했습니다.',
      story_after: '상간자에게 위자료 3천만원을 받았고, 이혼 소송에서도 유리한 결과를 얻었습니다.',
      case_date: '2024년 11월',
      case_duration: '2개월',
      attorney_name: '임은지',
      verified: true,
      consent_given: true,
      consent_date: new Date().toISOString(),
      featured: true,
      published: true,
      display_order: 3,
    },
    {
      category: 'alimony',
      highlight_text: '위자료 1억 5천 + 양육비 월 200만원',
      case_result_amount: 150000000,
      client_initial: '정',
      client_role: '40대 여성',
      client_age_group: '40대',
      full_story: `남편의 지속적인 가정폭력과 경제적 학대로 이혼을 결심했습니다. 하지만 남편은 자신의 잘못을 인정하지 않았고, 제대로 된 위자료도 주지 않으려 했습니다.

법무법인 더율에서 폭력 증거, 경제적 학대 증거를 체계적으로 정리해주셨고, 법정에서 강력하게 대응해주셨습니다.

위자료 1억 5천만원과 자녀 양육비 월 200만원을 받았습니다. 이제 아이와 함께 안전하고 안정적인 생활을 할 수 있게 되었습니다.`,
      story_before: '남편의 폭력과 경제적 학대로 힘들었지만, 혼자서는 대응하기 어려웠습니다.',
      story_journey: '3개월 동안 폭력 증거, 진단서, 녹음 등을 수집하고 법적 대응을 준비했습니다.',
      story_after: '위자료 1억 5천과 양육비 월 200만원으로 아이와 안전한 새 삶을 시작했습니다.',
      case_date: '2024년 10월',
      case_duration: '3개월',
      attorney_name: '임은지',
      verified: true,
      consent_given: true,
      consent_date: new Date().toISOString(),
      featured: true,
      published: true,
      display_order: 4,
    },
  ];

  console.log('📝 4개 케이스 추가 중...\n');

  for (let i = 0; i < newCases.length; i++) {
    const caseData = newCases[i];
    console.log(`\n[${i + 1}/4] ${caseData.highlight_text} 추가 중...`);

    // 케이스 추가
    const { data: insertedCase, error: caseError } = await supabase
      .from('testimonial_cases')
      .insert(caseData)
      .select()
      .single();

    if (caseError) {
      console.error(`❌ 케이스 추가 실패:`, caseError.message);
      continue;
    }

    console.log(`✅ 케이스 추가 성공! ID: ${insertedCase.id}`);

    // 각 케이스별 증빙 사진 3개씩 추가
    const evidenceTypes = ['kakao', 'naver', 'sms'];
    const photos = evidenceTypes.map((type, idx) => ({
      case_id: insertedCase.id,
      evidence_type: type,
      photo_url: `https://via.placeholder.com/800x600/${
        type === 'kakao' ? 'FEF3C7/92400E' : type === 'naver' ? 'D1FAE5/065F46' : 'DBEAFE/1E3A8A'
      }?text=${encodeURIComponent(type.toUpperCase() + ' 증빙 ' + (idx + 1))}`,
      display_order: idx,
      caption: `${type === 'kakao' ? '카카오톡' : type === 'naver' ? '네이버' : 'SMS'} 증빙 ${idx + 1}/3`,
      blur_applied: true,
      alt_text: `${insertedCase.client_initial}씨 ${caseData.category} 케이스 ${type} 증빙 ${idx + 1}`,
    }));

    const { data: photosData, error: photosError } = await supabase
      .from('testimonial_evidence_photos')
      .insert(photos)
      .select();

    if (photosError) {
      console.error(`❌ 증빙 사진 추가 실패:`, photosError.message);
      continue;
    }

    console.log(`✅ 증빙 사진 ${photosData.length}개 추가 성공!`);
  }

  console.log('\n━'.repeat(60));
  console.log('🎉 4개 케이스 추가 완료!\n');

  // 전체 케이스 확인
  const { data: allCases, error: queryError } = await supabase
    .from('testimonial_cases')
    .select('id, category, highlight_text, client_initial, published, featured')
    .order('display_order', { ascending: true });

  if (queryError) {
    console.error('❌ 케이스 조회 실패:', queryError.message);
  } else {
    console.log('📊 전체 케이스 목록:');
    console.log('━'.repeat(60));
    allCases.forEach((c, idx) => {
      console.log(
        `${idx + 1}. [${c.category}] ${c.highlight_text} (${c.client_initial}씨) ${
          c.featured ? '⭐' : ''
        }`
      );
    });
    console.log('━'.repeat(60));
    console.log(`\n총 ${allCases.length}개 케이스`);
  }

  console.log('\n📍 확인 방법:');
  console.log('1. 홈페이지: http://localhost:3000');
  console.log('   → "의뢰인의 목소리" 섹션에서 확인');
  console.log('2. 관리자: http://localhost:3000/admin/testimonial-cases');
  console.log('3. API: http://localhost:3000/api/testimonials/cases?featured=true\n');

  process.exit(0);
}

addMoreTestimonials().catch((err) => {
  console.error('\n❌ 치명적 에러:', err);
  process.exit(1);
});
