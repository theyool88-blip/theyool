/**
 * SMS 발송 핵심 로직
 */

import { sendSMS, sendLMS } from './solapi';
import { generateMessage, createVariablesFromBooking } from './templates';
import { createClient } from '@/lib/supabase/server';

export interface SendSMSOptions {
  to: string;
  templateType?: string;
  office?: '천안' | '평택';
  variables?: Record<string, any>;
  bookingId?: string;
  immediate?: boolean;
}

/**
 * 통합 SMS 발송 함수
 */
export async function sendNotificationSMS(options: SendSMSOptions) {
  const supabase = await createClient();

  try {
    // 1. 템플릿 기반 메시지 생성
    let content: string;
    let messageType: 'SMS' | 'LMS';
    let templateId: string | undefined;

    if (options.templateType && options.office) {
      const message = await generateMessage(
        options.office,
        options.templateType,
        options.variables || {}
      );

      if (!message) {
        throw new Error(`Template not found: ${options.office}/${options.templateType}`);
      }

      content = message.content;
      messageType = message.messageType;
      templateId = message.templateId;
    } else {
      throw new Error('Template type and office are required');
    }

    // 2. SMS 로그 생성 (발송 전)
    const { data: log, error: logError } = await supabase
      .from('sms_logs')
      .insert({
        booking_id: options.bookingId,
        template_id: templateId,
        recipient_phone: options.to,
        recipient_name: options.variables?.customerName,
        message_type: messageType,
        content,
        status: 'pending',
        provider: 'solapi',
        cost: messageType === 'SMS' ? 20 : 60,
        metadata: {
          office: options.office,
          template_type: options.templateType
        }
      })
      .select()
      .single();

    if (logError) {
      console.error('Failed to create SMS log:', logError);
      throw logError;
    }

    // 3. 실제 발송
    let result;
    if (messageType === 'SMS') {
      result = await sendSMS(options.to, content);
    } else {
      result = await sendLMS(options.to, content, '[법무법인 더율]');
    }

    // 4. 발송 결과 업데이트
    await supabase
      .from('sms_logs')
      .update({
        status: result.success ? 'sent' : 'failed',
        provider_message_id: result.messageId,
        error_message: result.error,
        sent_at: new Date().toISOString()
      })
      .eq('id', log.id);

    return {
      success: result.success,
      messageId: result.messageId,
      logId: log.id,
      cost: log.cost
    };

  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
}

/**
 * 예약 상태 변경 시 자동 SMS 발송
 */
export async function sendBookingStatusSMS(
  bookingId: string,
  newStatus: string
) {
  const supabase = await createClient();

  // 예약 정보 가져오기
  const { data: booking, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (error || !booking) {
    console.error('Booking not found:', bookingId);
    return null;
  }

  // 상태별 템플릿 타입 매핑
  const templateTypeMap: Record<string, string> = {
    'payment_pending': 'payment_pending',
    'confirmed': 'confirmed',
    'cancelled': 'cancelled',
    'completed': 'thank_you'
  };

  const templateType = templateTypeMap[newStatus];
  if (!templateType) {
    console.log(`No template for status: ${newStatus}`);
    return null;
  }

  // 변수 생성
  const variables = createVariablesFromBooking(booking);

  // SMS 발송
  return await sendNotificationSMS({
    to: booking.client_phone,
    templateType,
    office: booking.office_location || '천안',
    variables,
    bookingId,
    immediate: true
  });
}

/**
 * 대량 SMS 발송 (배치)
 */
export async function sendBulkSMS(
  recipients: Array<{
    phone: string;
    name: string;
    variables?: Record<string, any>;
  }>,
  templateType: string,
  office: '천안' | '평택'
) {
  const results = [];

  // 동시 발송 제한 (5건씩)
  const batchSize = 5;
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);

    const batchResults = await Promise.allSettled(
      batch.map(recipient =>
        sendNotificationSMS({
          to: recipient.phone,
          templateType,
          office,
          variables: {
            customerName: recipient.name,
            ...recipient.variables
          }
        })
      )
    );

    results.push(...batchResults);

    // Rate limiting (1초 대기)
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // 결과 집계
  const summary = {
    total: results.length,
    success: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length,
    details: results
  };

  return summary;
}

/**
 * SMS 재발송
 */
export async function retrySMS(logId: string) {
  const supabase = await createClient();

  // 기존 로그 조회
  const { data: log } = await supabase
    .from('sms_logs')
    .select('*')
    .eq('id', logId)
    .single();

  if (!log) {
    throw new Error('SMS log not found');
  }

  // 재발송
  const result = log.message_type === 'SMS'
    ? await sendSMS(log.recipient_phone, log.content)
    : await sendLMS(log.recipient_phone, log.content, '[법무법인 더율]');

  // 결과 업데이트
  await supabase
    .from('sms_logs')
    .update({
      status: result.success ? 'sent' : 'failed',
      error_message: result.error,
      sent_at: new Date().toISOString()
    })
    .eq('id', logId);

  return result;
}

/**
 * 예약 리마인더 스케줄링
 */
export async function scheduleReminders(bookingId: string) {
  const supabase = await createClient();

  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();

  if (!booking) return;

  const bookingDate = new Date(booking.date);
  const now = new Date();

  // 입금 리마인더 (입금 기한 하루 전)
  if (booking.status === 'payment_pending' && booking.payment_due_date) {
    const reminderDate = new Date(booking.payment_due_date);
    reminderDate.setDate(reminderDate.getDate() - 1);

    if (reminderDate > now) {
      // TODO: Supabase Edge Function 또는 Cron Job으로 예약
      console.log('Payment reminder scheduled for:', reminderDate);
    }
  }

  // 상담 리마인더 (상담 하루 전)
  if (booking.status === 'confirmed') {
    const reminderDate = new Date(bookingDate);
    reminderDate.setDate(reminderDate.getDate() - 1);

    if (reminderDate > now) {
      // TODO: Supabase Edge Function 또는 Cron Job으로 예약
      console.log('Consultation reminder scheduled for:', reminderDate);
    }
  }
}