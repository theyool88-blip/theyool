const { SolapiMessageService } = require('solapi');

async function testSMS() {
  console.log('🧪 SMS 발송 테스트 시작...\n');

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

    console.log('📤 SMS 발송 중...');

    const response = await messageService.sendOne({
      to: toNumber.replace(/-/g, ''),
      from: fromNumber.replace(/-/g, ''),
      text: '[테스트] 법무법인 더율 SMS 알림 시스템 테스트 메시지입니다.',
    });

    console.log('\n✅ SMS 발송 성공!');
    console.log('📊 발송 결과:');
    console.log(`   Message ID: ${response.messageId}`);
    console.log(`   Status Code: ${response.statusCode}`);
    console.log(`   Status Message: ${response.statusMessage || '정상 발송'}`);
    console.log('\n📱 수신번호(010-2592-1834)에서 메시지를 확인해주세요.');

  } catch (error) {
    console.error('\n❌ SMS 발송 실패:');
    console.error('   에러:', error.message);

    if (error.response) {
      console.error('   응답 코드:', error.response.status);
      console.error('   응답 데이터:', JSON.stringify(error.response.data, null, 2));
    }

    console.log('\n⚠️  확인사항:');
    console.log('   1. 솔라피 콘솔에서 발신번호(031-647-3777)가 인증되었는지 확인');
    console.log('   2. 솔라피 계정에 충분한 크레딧이 있는지 확인');
    console.log('   3. API Key와 Secret이 올바른지 확인');
  }
}

testSMS();
