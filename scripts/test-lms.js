const { SolapiMessageService } = require('solapi');

async function testLMS() {
  console.log('🧪 LMS(장문) 발송 테스트 시작...\n');

  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;
  const fromNumber = process.env.SOLAPI_FROM_NUMBER || '0316473777';
  const toNumber = '01025921834';

  if (!apiKey || !apiSecret) {
    console.error('❌ SOLAPI_API_KEY 또는 SOLAPI_API_SECRET이 설정되지 않았습니다.');
    return;
  }

  console.log('📋 설정 확인:');
  console.log(`   API Key: ${apiKey.substring(0, 10)}...`);
  console.log(`   발신번호: ${fromNumber}`);
  console.log(`   수신번호: ${toNumber}\n`);

  try {
    const messageService = new SolapiMessageService(apiKey, apiSecret);

    const longMessage = `[법무법인 더율] 예약 확정 안내

안녕하세요, 법무법인 더율입니다.

고객님의 상담 예약이 정상적으로 확정되었습니다.

━━━━━━━━━━━━━━━━━━━━
📅 예약 정보
━━━━━━━━━━━━━━━━━━━━

• 상담 날짜: 2025년 11월 25일 (월)
• 상담 시간: 오후 2시 00분
• 상담 방식: 화상 상담
• 상담 시간: 약 1시간 소요 예정

━━━━━━━━━━━━━━━━━━━━
📝 준비 사항
━━━━━━━━━━━━━━━━━━━━

1. 신분증 (주민등록증 또는 운전면허증)
2. 혼인관계증명서 (가능한 경우)
3. 재산 관련 서류 (부동산, 예금 등)
4. 자녀 관련 서류 (양육권 관련 시)

━━━━━━━━━━━━━━━━━━━━
🎥 화상 상담 링크
━━━━━━━━━━━━━━━━━━━━

상담 30분 전에 별도로 화상 링크를 발송해 드립니다.

━━━━━━━━━━━━━━━━━━━━
💡 유의 사항
━━━━━━━━━━━━━━━━━━━━

• 상담 시간 5분 전까지 접속 부탁드립니다
• 조용한 환경에서 상담받으실 것을 권장합니다
• 일정 변경 시 최소 1일 전 연락 부탁드립니다

━━━━━━━━━━━━━━━━━━━━
📞 문의
━━━━━━━━━━━━━━━━━━━━

전화: 031-647-3777
이메일: info@theyool.com
운영시간: 평일 09:00-18:00

상담에 대해 궁금하신 점이 있으시면 언제든 연락 주세요.

감사합니다.

법무법인 더율 드림`;

    console.log('📤 LMS 발송 중...');
    console.log(`📏 메시지 길이: ${longMessage.length}자\n`);

    const response = await messageService.sendOne({
      to: toNumber.replace(/-/g, ''),
      from: fromNumber.replace(/-/g, ''),
      text: longMessage,
      type: 'LMS',  // LMS 타입 명시
      subject: '[법무법인 더율] 예약 확정 안내',  // LMS 제목
    });

    console.log('✅ LMS 발송 성공!');
    console.log('📊 발송 결과:');
    console.log(`   Message ID: ${response.messageId}`);
    console.log(`   Status Code: ${response.statusCode}`);
    console.log(`   Status Message: ${response.statusMessage || '정상 발송'}`);
    console.log(`   Message Type: LMS (장문 메시지)`);
    console.log('\n📱 수신번호(010-2592-1834)에서 메시지를 확인해주세요.');
    console.log('💰 LMS는 SMS보다 비용이 높습니다 (건당 약 25원)');

  } catch (error) {
    console.error('\n❌ LMS 발송 실패:');
    console.error('   에러:', error.message);

    if (error.response) {
      console.error('   응답 코드:', error.response.status);
      console.error('   응답 데이터:', JSON.stringify(error.response.data, null, 2));
    }

    console.log('\n⚠️  확인사항:');
    console.log('   1. 솔라피 콘솔에서 발신번호(031-647-3777)가 인증되었는지 확인');
    console.log('   2. 솔라피 계정에 충분한 크레딧이 있는지 확인');
    console.log('   3. LMS 발송 권한이 있는지 확인');
  }
}

testLMS();
