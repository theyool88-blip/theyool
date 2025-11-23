const { sendSMS } = require('../lib/sms/solapi');

async function testSMS() {
  console.log('🧪 SMS 발송 테스트 시작...\n');

  try {
    const result = await sendSMS({
      to: '01025921834',
      message: '[테스트] 법무법인 더율 SMS 알림 시스템 테스트 메시지입니다.'
    });

    if (result) {
      console.log('✅ SMS 발송 성공!');
      console.log('📱 수신번호에서 메시지를 확인해주세요.');
    } else {
      console.log('⚠️  SMS 발송 실패 (API 키 확인 필요)');
    }
  } catch (error) {
    console.error('❌ 에러 발생:', error.message);
  }
}

testSMS();
