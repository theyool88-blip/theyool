import { SolapiMessageService } from 'solapi';

/**
 * Solapi SMS 클라이언트 초기화
 */
function getSolapiClient() {
  const apiKey = process.env.SOLAPI_API_KEY;
  const apiSecret = process.env.SOLAPI_API_SECRET;

  if (!apiKey || !apiSecret) {
    console.warn('⚠️  SOLAPI_API_KEY or SOLAPI_API_SECRET is not configured');
    return null;
  }

  return new SolapiMessageService(apiKey, apiSecret);
}

/**
 * SMS 발송 인터페이스
 */
interface SendSMSParams {
  to: string;        // 수신자 전화번호 (01012345678 형식)
  message: string;   // 문자 내용
  from?: string;     // 발신자 번호 (환경변수에서 기본값 사용)
}

/**
 * SMS 발송 함수
 */
export async function sendSMS({ to, message, from }: SendSMSParams): Promise<boolean> {
  const client = getSolapiClient();

  if (!client) {
    console.log('📱 [SMS 미발송 - API 키 미설정]');
    console.log(`   수신: ${to}`);
    console.log(`   내용: ${message}`);
    return false;
  }

  const fromNumber = from || process.env.SOLAPI_FROM_NUMBER || '0212345678';

  try {
    const response = await client.sendOne({
      to: to.replace(/-/g, ''), // 하이픈 제거
      from: fromNumber.replace(/-/g, ''),
      text: message,
    });

    console.log('✅ SMS 발송 성공:', {
      to,
      messageId: response.messageId,
      statusCode: response.statusCode,
    });

    return true;
  } catch (error) {
    console.error('❌ SMS 발송 실패:', error);
    return false;
  }
}

/**
 * 예약 확정 SMS (고객용)
 */
export async function sendBookingConfirmedSMS(params: {
  phone: string;
  name: string;
  date: string;
  time: string;
  videoLink?: string;
}) {
  const { phone, name, date, time, videoLink } = params;

  const message = `[법무법인 더율] ${name}님의 상담 예약이 확정되었습니다.

📅 일시: ${date} ${time}
${videoLink ? `🎥 화상 링크: ${videoLink}` : '📞 방문 상담'}

준비물: 신분증, 관련 서류
문의: 02-1234-5678`;

  return sendSMS({
    to: phone,
    message,
  });
}

/**
 * 예약 리마인더 SMS (고객용)
 */
export async function sendBookingReminderSMS(params: {
  phone: string;
  name: string;
  date: string;
  time: string;
  videoLink?: string;
}) {
  const { phone, name, date, time, videoLink } = params;

  const message = `[법무법인 더율] ${name}님, 내일 상담 일정을 알려드립니다.

📅 일시: ${date} ${time}
${videoLink ? `🎥 화상 링크: ${videoLink}` : '📞 방문 상담'}

잊지 말고 참석해 주세요!
문의: 02-1234-5678`;

  return sendSMS({
    to: phone,
    message,
  });
}

/**
 * 예약 취소 SMS (고객용)
 */
export async function sendBookingCancelledSMS(params: {
  phone: string;
  name: string;
  date: string;
  time: string;
}) {
  const { phone, name, date, time } = params;

  const message = `[법무법인 더율] ${name}님의 상담 예약이 취소되었습니다.

📅 취소된 일시: ${date} ${time}

문의사항이 있으시면 연락 주세요.
문의: 02-1234-5678`;

  return sendSMS({
    to: phone,
    message,
  });
}

/**
 * 새 상담 신청 알림 SMS (관리자용)
 */
export async function sendNewConsultationAlertSMS(params: {
  name: string;
  phone: string;
  category?: string;
  message?: string;
}) {
  const adminPhones = (process.env.ADMIN_PHONE_NUMBERS || '').split(',').filter(Boolean);

  if (adminPhones.length === 0) {
    console.warn('⚠️  ADMIN_PHONE_NUMBERS not configured');
    console.log('📱 [관리자 알림 - 수신번호 미설정]');
    console.log(`   신청인: ${params.name}`);
    console.log(`   연락처: ${params.phone}`);
    console.log(`   분류: ${params.category || '미분류'}`);
    return false;
  }

  const { name, phone, category, message } = params;

  const smsMessage = `[더율] 새 상담 신청

👤 ${name}
📞 ${phone}
📋 ${category || '미분류'}
${message ? `💬 ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}` : ''}

관리자 페이지에서 확인하세요.`;

  // 모든 관리자에게 발송
  const results = await Promise.all(
    adminPhones.map((adminPhone) =>
      sendSMS({
        to: adminPhone.trim(),
        message: smsMessage,
      })
    )
  );

  return results.some((result) => result);
}

/**
 * 새 예약 신청 알림 SMS (관리자용)
 */
export async function sendNewBookingAlertSMS(params: {
  name: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
}) {
  const adminPhones = (process.env.ADMIN_PHONE_NUMBERS || '').split(',').filter(Boolean);

  if (adminPhones.length === 0) {
    console.warn('⚠️  ADMIN_PHONE_NUMBERS not configured');
    console.log('📱 [관리자 알림 - 수신번호 미설정]');
    console.log(`   신청인: ${params.name}`);
    console.log(`   희망일시: ${params.date} ${params.time}`);
    return false;
  }

  const { name, phone, date, time, message } = params;

  const smsMessage = `[더율] 새 예약 신청

👤 ${name}
📞 ${phone}
📅 희망: ${date} ${time}
${message ? `💬 ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}` : ''}

관리자 페이지에서 확인하세요.`;

  // 모든 관리자에게 발송
  const results = await Promise.all(
    adminPhones.map((adminPhone) =>
      sendSMS({
        to: adminPhone.trim(),
        message: smsMessage,
      })
    )
  );

  return results.some((result) => result);
}
