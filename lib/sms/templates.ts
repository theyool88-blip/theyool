/**
 * SMS 템플릿 처리 시스템
 */

import { createClient } from '@/lib/supabase/server';

// 템플릿 변수 타입 정의
export interface TemplateVariables {
  // 고객 정보
  customerName: string;
  customerPhone?: string;

  // 예약 정보
  bookingDate?: string;
  bookingTime?: string;
  lawyerName?: string;
  office?: '천안' | '평택';

  // 결제 정보
  paymentAmount?: number;
  paymentDueDate?: string;
  accountNumber?: string;
  accountBank?: string;

  // 커스텀 필드
  [key: string]: any;
}

// SMS 템플릿 타입
export interface SMSTemplate {
  id: string;
  name: string;
  office: '천안' | '평택' | '공통';
  type: string;
  content: string;
  variables: string[];
  message_type: 'SMS' | 'LMS';
  is_active: boolean;
}

/**
 * 템플릿 변수 치환
 */
export function replaceTemplateVariables(
  template: string,
  variables: TemplateVariables
): string {
  let result = template;

  // {{변수명}} 형태의 모든 변수를 치환
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value || ''));
  });

  // 치환되지 않은 변수는 빈 문자열로 처리
  result = result.replace(/{{[^}]+}}/g, '');

  return result.trim();
}

/**
 * 메시지 타입 자동 결정 (SMS vs LMS)
 */
export function getMessageType(content: string): 'SMS' | 'LMS' {
  // 한글 2바이트, 영문 1바이트로 계산
  const byteLength = Buffer.byteLength(content, 'utf-8');

  // SMS는 90바이트(한글 45자) 제한
  return byteLength <= 90 ? 'SMS' : 'LMS';
}

/**
 * 템플릿 가져오기
 */
export async function getTemplate(
  office: '천안' | '평택' | '공통',
  type: string
): Promise<SMSTemplate | null> {
  const supabase = await createClient();

  // 먼저 사무소별 템플릿 찾기
  let { data: template } = await supabase
    .from('sms_templates')
    .select('*')
    .eq('office', office)
    .eq('type', type)
    .eq('is_active', true)
    .single();

  // 사무소별 템플릿이 없으면 공통 템플릿 찾기
  if (!template && office !== '공통') {
    const { data: commonTemplate } = await supabase
      .from('sms_templates')
      .select('*')
      .eq('office', '공통')
      .eq('type', type)
      .eq('is_active', true)
      .single();

    template = commonTemplate;
  }

  return template;
}

/**
 * 템플릿 기반 메시지 생성
 */
export async function generateMessage(
  office: '천안' | '평택',
  type: string,
  variables: TemplateVariables
): Promise<{
  content: string;
  messageType: 'SMS' | 'LMS';
  templateId?: string;
} | null> {
  const template = await getTemplate(office, type);

  if (!template) {
    console.error(`Template not found: ${office}/${type}`);
    return null;
  }

  const content = replaceTemplateVariables(template.content, variables);
  const messageType = template.message_type || getMessageType(content);

  return {
    content,
    messageType,
    templateId: template.id
  };
}

/**
 * 템플릿 유효성 검증
 */
export function validateTemplate(template: string): {
  isValid: boolean;
  variables: string[];
  errors: string[];
} {
  const errors: string[] = [];
  const variableRegex = /{{([^}]+)}}/g;
  const variables: string[] = [];

  let match;
  while ((match = variableRegex.exec(template)) !== null) {
    variables.push(match[1]);
  }

  // 중복 변수 체크
  const uniqueVars = [...new Set(variables)];
  if (uniqueVars.length !== variables.length) {
    errors.push('템플릿에 중복된 변수가 있습니다.');
  }

  // 템플릿 길이 체크 (LMS 최대 2000자)
  if (template.length > 2000) {
    errors.push('템플릿이 너무 깁니다. (최대 2000자)');
  }

  // 필수 문구 체크
  if (!template.includes('[법무법인 더율')) {
    errors.push('발신자 표시 [법무법인 더율]이 누락되었습니다.');
  }

  return {
    isValid: errors.length === 0,
    variables: uniqueVars,
    errors
  };
}

/**
 * 예약 데이터로부터 템플릿 변수 생성
 */
export function createVariablesFromBooking(booking: any): TemplateVariables {
  const bookingDate = new Date(booking.date);
  const formatDate = `${bookingDate.getMonth() + 1}월 ${bookingDate.getDate()}일`;
  const formatTime = booking.time;

  // 입금 기한 (예약일 2일 전)
  const paymentDue = new Date(booking.date);
  paymentDue.setDate(paymentDue.getDate() - 2);
  const formatPaymentDue = `${paymentDue.getMonth() + 1}월 ${paymentDue.getDate()}일`;

  // 사무소별 계좌 정보
  const accountInfo = booking.office_location === '천안'
    ? { bank: '농협', number: '123-456-789012' }
    : { bank: '국민', number: '987-654-321098' };

  return {
    customerName: booking.client_name,
    customerPhone: booking.client_phone,
    bookingDate: formatDate,
    bookingTime: formatTime,
    lawyerName: booking.lawyer_name || '담당 변호사',
    office: booking.office_location,
    paymentAmount: booking.payment_amount || 100000,
    paymentDueDate: formatPaymentDue,
    accountBank: accountInfo.bank,
    accountNumber: accountInfo.number
  };
}