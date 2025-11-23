/**
 * Email Templates
 *
 * HTML email templates for booking notifications
 */

import { Booking, OfficeLocation } from '@/types/booking';
import { EMAIL_CONFIG } from './config';

// Helper function to format Korean date
function formatKoreanDate(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[date.getDay()];

  return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
}

// Helper function to format office location
function formatOfficeLocation(location?: OfficeLocation): string {
  const locations = {
    pyeongtaek: '평택 사무소',
    cheonan: '천안 사무소',
  };

  return location ? locations[location] : '화상 상담';
}

// Base HTML template structure
function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>법무법인 더율</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">법무법인 더율</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">이혼전문변호사</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; border-top: 1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 12px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; font-weight: 600;">${EMAIL_CONFIG.business.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 6px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 13px;">📞 ${EMAIL_CONFIG.business.phone}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 6px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 13px;">📧 ${EMAIL_CONFIG.business.email}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 6px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 13px;">🌐 ${EMAIL_CONFIG.business.website}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #e5e7eb; margin-top: 16px;">
                    <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.6;">
                      본 메일은 발신 전용입니다. 문의사항은 위 연락처로 연락해 주세요.<br/>
                      © 2025 법무법인 더율. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Booking Created Email
export function bookingCreatedEmail(booking: Booking): string {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
      상담 예약이 접수되었습니다
    </h2>

    <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
      안녕하세요, <strong>${booking.name}</strong>님.<br/>
      법무법인 더율에 상담 예약을 신청해 주셔서 감사합니다.
    </p>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #92400e; font-size: 14px; font-weight: 600;">
        ⏳ 예약 대기 중
      </p>
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
        담당자 확인 후 24시간 이내에 예약 확정 안내를 드리겠습니다.
      </p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <tr>
        <td style="padding-bottom: 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600;">예약 정보</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">예약번호</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">#${booking.id.slice(0, 8).toUpperCase()}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">희망 날짜</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatKoreanDate(booking.preferred_date)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">희망 시간</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.preferred_time}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 방식</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatOfficeLocation(booking.office_location)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 분야</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.category}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
      궁금하신 사항이 있으시면 언제든지 연락 주세요.<br/>
      감사합니다.
    </p>
  `;

  return baseTemplate(content);
}

// Booking Confirmed Email
export function bookingConfirmedEmail(booking: Booking): string {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
      상담 예약이 확정되었습니다
    </h2>

    <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
      안녕하세요, <strong>${booking.name}</strong>님.<br/>
      상담 예약이 확정되었습니다. 아래 일정을 확인해 주세요.
    </p>

    <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #065f46; font-size: 14px; font-weight: 600;">
        ✅ 예약 확정
      </p>
      <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.6;">
        예약하신 날짜와 시간에 맞춰 준비하여 뵙겠습니다.
      </p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <tr>
        <td style="padding-bottom: 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600;">확정된 예약 정보</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">예약번호</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">#${booking.id.slice(0, 8).toUpperCase()}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 날짜</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatKoreanDate(booking.preferred_date)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 시간</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.preferred_time}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 방식</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatOfficeLocation(booking.office_location)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 분야</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.category}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${
      !booking.office_location
        ? `
    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
        💻 화상 상담 안내
      </p>
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        화상 상담 링크는 상담 예정 시간 30분 전에 문자 메시지로 발송됩니다.
      </p>
    </div>
    `
        : `
    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
        📍 방문 상담 안내
      </p>
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        ${
          booking.office_location === 'pyeongtaek'
            ? '평택 사무소로 방문해 주세요.<br/>주소: 경기도 평택시 ...'
            : '천안 사무소로 방문해 주세요.<br/>주소: 충청남도 천안시 ...'
        }
      </p>
    </div>
    `
    }

    <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
      상담 준비를 위해 관련 서류가 있으시면 미리 준비해 주시면 도움이 됩니다.<br/>
      감사합니다.
    </p>
  `;

  return baseTemplate(content);
}

// Booking Cancelled Email
export function bookingCancelledEmail(booking: Booking): string {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
      상담 예약이 취소되었습니다
    </h2>

    <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
      안녕하세요, <strong>${booking.name}</strong>님.<br/>
      아래 예약이 취소되었습니다.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <tr>
        <td style="padding-bottom: 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600;">취소된 예약 정보</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">예약번호</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">#${booking.id.slice(0, 8).toUpperCase()}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">날짜</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatKoreanDate(booking.preferred_date)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">시간</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.preferred_time}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin: 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
      다시 상담을 원하시면 언제든지 예약해 주세요.<br/>
      법무법인 더율은 항상 열려있습니다.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding-top: 8px;">
          <a href="${EMAIL_CONFIG.business.website}/booking" style="display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px;">
            다시 예약하기
          </a>
        </td>
      </tr>
    </table>
  `;

  return baseTemplate(content);
}

// Reminder Email (sent day before)
export function reminderEmail(booking: Booking): string {
  const content = `
    <h2 style="margin: 0 0 24px 0; color: #111827; font-size: 22px; font-weight: 600;">
      내일 상담 예약이 있습니다
    </h2>

    <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 15px; line-height: 1.6;">
      안녕하세요, <strong>${booking.name}</strong>님.<br/>
      내일 예정된 상담 일정을 안내드립니다.
    </p>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #92400e; font-size: 14px; font-weight: 600;">
        ⏰ 상담 일정 안내
      </p>
      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
        내일 ${booking.preferred_time}에 상담이 예정되어 있습니다.
      </p>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 24px 0;">
      <tr>
        <td style="padding-bottom: 12px;">
          <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 600;">예약 정보</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 날짜</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatKoreanDate(booking.preferred_date)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 시간</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${booking.preferred_time}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-top: 1px solid #e5e7eb;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="100" style="color: #9ca3af; font-size: 14px;">상담 방식</td>
              <td style="color: #111827; font-size: 14px; font-weight: 500;">${formatOfficeLocation(booking.office_location)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${
      !booking.office_location
        ? `
    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
        💻 화상 상담 준비
      </p>
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        화상 상담 링크는 상담 30분 전에 문자 메시지로 발송됩니다.<br/>
        인터넷 연결과 카메라/마이크를 미리 확인해 주세요.
      </p>
    </div>
    `
        : `
    <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
        📍 방문 상담 준비
      </p>
      <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
        ${
          booking.office_location === 'pyeongtaek'
            ? '평택 사무소로 방문해 주세요.<br/>주소: 경기도 평택시 ...'
            : '천안 사무소로 방문해 주세요.<br/>주소: 충청남도 천안시 ...'
        }<br/>
        관련 서류를 미리 준비해 주시면 더욱 원활한 상담이 가능합니다.
      </p>
    </div>
    `
    }

    <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
      일정 변경이 필요하시면 ${EMAIL_CONFIG.business.phone}로 연락 주세요.<br/>
      감사합니다.
    </p>
  `;

  return baseTemplate(content);
}
