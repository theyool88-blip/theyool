/**
 * 샘플 의뢰인 후기 케이스 추가 스크립트
 * 테스트용 케이스와 증빙 사진 URL 추가
 */

const { createClient } = require('@supabase/supabase-js');

async function addSampleCase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ 환경 변수 누락');
    console.error('NEXT_PUBLIC_SUPABASE_URL과 SUPABASE_SERVICE_ROLE_KEY 필요');
    process.exit(1);
  }

  console.log('🚀 샘플 의뢰인 후기 케이스 추가 시작...\n');

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // 샘플 케이스 데이터
  const sampleCase = {
    category: 'alimony',
    highlight_text: '위자료 2억 원 승소',
    case_result_amount: 200000000, // 2억 원
    client_initial: '김',
    client_role: '40대 여성',
    client_age_group: '40대',
    full_story: `처음 상담받을 때는 막막했습니다. 남편의 외도 사실을 알았지만 어떻게 대응해야 할지 몰랐고, 혼자 아이들을 키우며 살아갈 자신도 없었습니다.

하지만 법무법인 더율 임은지 변호사님을 만나 모든 것이 달라졌습니다. 꼼꼼하게 증거를 수집하고, 법정에서 제 입장을 강력하게 대변해주셨습니다.

결과적으로 위자료 2억 원을 받았고, 양육권도 확보했습니다. 지금은 아이들과 함께 새로운 삶을 시작하고 있습니다.`,
    story_before: '남편의 외도 사실을 알았지만 증거도 없고, 이혼 후 경제적으로 어떻게 살아갈지 막막했습니다.',
    story_journey: '3개월 동안 체계적으로 증거를 수집했고, 변호사님의 전략적인 대응으로 유리한 조건을 이끌어냈습니다.',
    story_after: '위자료 2억과 양육권을 확보하여 아이들과 안정적인 생활을 시작할 수 있게 되었습니다.',
    case_date: '2024년 10월',
    case_duration: '3개월',
    attorney_name: '임은지',
    verified: true,
    consent_given: true,
    consent_date: new Date().toISOString(),
    featured: true,
    published: true,
    display_order: 0,
  };

  console.log('📝 케이스 추가 중...');

  const { data: caseData, error: caseError } = await supabase
    .from('testimonial_cases')
    .insert(sampleCase)
    .select()
    .single();

  if (caseError) {
    console.error('❌ 케이스 추가 실패:', caseError.message);
    process.exit(1);
  }

  console.log('✅ 케이스 추가 성공!');
  console.log(`   ID: ${caseData.id}`);
  console.log(`   제목: ${caseData.highlight_text}`);
  console.log(`   의뢰인: ${caseData.client_initial} ${caseData.client_role}\n`);

  // 샘플 증빙 사진 데이터 (실제 이미지 URL은 나중에 업로드)
  const samplePhotos = [
    {
      case_id: caseData.id,
      evidence_type: 'kakao',
      photo_url: 'https://via.placeholder.com/800x600/FEF3C7/92400E?text=카카오톡+증빙+1',
      display_order: 0,
      caption: '카카오톡 대화 내용 1/3',
      blur_applied: true,
      alt_text: '김씨 위자료 케이스 카카오톡 증빙 1',
    },
    {
      case_id: caseData.id,
      evidence_type: 'kakao',
      photo_url: 'https://via.placeholder.com/800x600/FEF3C7/92400E?text=카카오톡+증빙+2',
      display_order: 1,
      caption: '카카오톡 대화 내용 2/3',
      blur_applied: true,
      alt_text: '김씨 위자료 케이스 카카오톡 증빙 2',
    },
    {
      case_id: caseData.id,
      evidence_type: 'naver',
      photo_url: 'https://via.placeholder.com/800x600/D1FAE5/065F46?text=네이버+리뷰',
      display_order: 2,
      caption: '네이버 지도 후기',
      blur_applied: true,
      alt_text: '김씨 위자료 케이스 네이버 리뷰',
    },
  ];

  console.log('📸 증빙 사진 추가 중...');

  const { data: photosData, error: photosError } = await supabase
    .from('testimonial_evidence_photos')
    .insert(samplePhotos)
    .select();

  if (photosError) {
    console.error('❌ 증빙 사진 추가 실패:', photosError.message);
    process.exit(1);
  }

  console.log(`✅ 증빙 사진 ${photosData.length}개 추가 성공!\n`);

  // 결과 확인
  console.log('📊 추가된 데이터 확인...');
  const { data: verifyCase } = await supabase
    .from('testimonial_cases')
    .select('*, evidence_photos:testimonial_evidence_photos(*)')
    .eq('id', caseData.id)
    .single();

  console.log('\n🎉 샘플 케이스 추가 완료!\n');
  console.log('━'.repeat(60));
  console.log(`케이스 ID: ${verifyCase.id}`);
  console.log(`카테고리: ${verifyCase.category}`);
  console.log(`하이라이트: ${verifyCase.highlight_text}`);
  console.log(`의뢰인: ${verifyCase.client_initial} ${verifyCase.client_role}`);
  console.log(`금액: ${(verifyCase.case_result_amount / 100000000).toFixed(1)}억 원`);
  console.log(`증빙 사진: ${verifyCase.evidence_photos.length}개`);
  console.log(`게시 상태: ${verifyCase.published ? '✓ 게시됨' : '비공개'}`);
  console.log(`동의 상태: ${verifyCase.consent_given ? '✓ 동의함' : '미동의'}`);
  console.log(`추천 케이스: ${verifyCase.featured ? '✓ 추천' : '일반'}`);
  console.log('━'.repeat(60));

  console.log('\n📍 확인 방법:');
  console.log('1. 홈페이지: http://localhost:3000');
  console.log('   → "의뢰인의 목소리" 섹션에 표시됩니다');
  console.log('2. 관리자: http://localhost:3000/admin/testimonial-cases');
  console.log(`   → 케이스 상세: http://localhost:3000/admin/testimonial-cases/${caseData.id}`);
  console.log('3. API: http://localhost:3000/api/testimonials/cases?featured=true\n');

  process.exit(0);
}

addSampleCase().catch((err) => {
  console.error('\n❌ 치명적 에러:', err);
  process.exit(1);
});
