import { NextRequest, NextResponse } from 'next/server';
import { createBooking, CreateBookingInput } from '@/lib/supabase/bookings';
import { z } from 'zod';

/**
 * Validation schema for booking creation
 */
const createBookingSchema = z.object({
  type: z.enum(['visit', 'video'], {
    errorMap: () => ({ message: '상담 유형을 선택해주세요 (방문 또는 화상)' }),
  }),
  name: z.string().min(2, '이름을 입력해주세요 (최소 2자)'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력해주세요'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요').optional(),
  category: z.string().optional(),
  message: z.string().optional(),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '올바른 날짜 형식을 입력해주세요 (YYYY-MM-DD)'),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, '올바른 시간 형식을 입력해주세요 (HH:MM)'),
  office_location: z.enum(['천안', '평택']).optional(),
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});

/**
 * POST /api/bookings
 * Create a new consultation booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = createBookingSchema.parse(body);

    // Additional validation: office_location required for visit type
    if (validatedData.type === 'visit' && !validatedData.office_location) {
      return NextResponse.json(
        { error: '방문 상담의 경우 사무소 위치를 선택해주세요' },
        { status: 400 }
      );
    }

    // Validate that the date is not in the past
    const preferredDate = new Date(validatedData.preferred_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (preferredDate < today) {
      return NextResponse.json(
        { error: '과거 날짜는 예약할 수 없습니다' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await createBooking(validatedData as CreateBookingInput);

    // TODO: Send email notifications
    // 1. Send confirmation email to customer
    // 2. Send new booking alert to admin
    try {
      await sendBookingNotifications(booking);
    } catch (emailError) {
      console.error('Failed to send email notifications:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        booking,
        message: '상담 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: '입력 정보를 확인해주세요',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '예약 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

/**
 * Send email notifications for new booking
 */
async function sendBookingNotifications(booking: any) {
  const { RESEND_API_KEY } = process.env;

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email notifications');
    return;
  }

  const resendApiUrl = 'https://api.resend.com/emails';

  // Format date and time for display
  const formattedDate = new Date(booking.preferred_date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  // 1. Send confirmation email to customer
  if (booking.email) {
    const customerEmail = {
      from: '법무법인 더율 <info@theyool.com>',
      to: booking.email,
      subject: `[법무법인 더율] ${booking.type === 'visit' ? '방문' : '화상'} 상담 예약 접수 확인`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
            .info-box { background: #f9fafb; border-left: 4px solid #ec4899; padding: 15px; margin: 20px 0; }
            .info-row { margin: 10px 0; }
            .label { font-weight: 600; color: #6b7280; }
            .value { color: #111827; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">상담 예약 접수 확인</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">법무법인 더율</p>
            </div>
            <div class="content">
              <p>${booking.name}님, 안녕하세요.</p>
              <p>법무법인 더율에 <strong>${booking.type === 'visit' ? '방문' : '화상'} 상담 예약</strong>을 신청해주셔서 감사합니다.</p>

              <div class="info-box">
                <h3 style="margin-top: 0;">예약 정보</h3>
                <div class="info-row">
                  <span class="label">상담 유형:</span>
                  <span class="value">${booking.type === 'visit' ? '방문 상담' : '화상 상담'}</span>
                </div>
                ${booking.office_location ? `
                <div class="info-row">
                  <span class="label">사무소:</span>
                  <span class="value">${booking.office_location}</span>
                </div>
                ` : ''}
                ${booking.preferred_lawyer ? `
                <div class="info-row">
                  <span class="label">희망 변호사:</span>
                  <span class="value">${booking.preferred_lawyer === '육심원' ? '육심원 (대표변호사)' : '임은지 (이혼전문변호사)'}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="label">희망 날짜:</span>
                  <span class="value">${formattedDate}</span>
                </div>
                <div class="info-row">
                  <span class="label">희망 시간:</span>
                  <span class="value">${booking.preferred_time}</span>
                </div>
                ${booking.category ? `
                <div class="info-row">
                  <span class="label">상담 분야:</span>
                  <span class="value">${booking.category}</span>
                </div>
                ` : ''}
              </div>

              <p>담당자가 예약 내용을 확인한 후 <strong>${booking.phone}</strong>으로 연락드리겠습니다.</p>
              <p>확정된 상담 일정은 별도로 안내해드리겠습니다.</p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

              <h3>문의 사항</h3>
              <p>예약 관련 문의는 아래 연락처로 문의해주세요.</p>
              <ul>
                <li>전화: 02-1234-5678</li>
                <li>이메일: info@theyool.com</li>
              </ul>
            </div>
            <div class="footer">
              <p style="margin: 0;"><strong>법무법인 더율</strong></p>
              <p style="margin: 5px 0;">이혼전문변호사 | 광고 책임 변호사: 임은지</p>
              <p style="margin: 5px 0; font-size: 12px;">법인명: 법무법인 더율 | 사업자번호: 354-85-01451(평택), 514-86-01593(천안)</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await fetch(resendApiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerEmail),
    });
  }

  // 2. Send new booking alert to admin
  const adminEmail = {
    from: '법무법인 더율 <info@theyool.com>',
    to: 'admin@theyool.com',
    subject: `[신규 예약] ${booking.type === 'visit' ? '방문' : '화상'} 상담 - ${booking.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #111827; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
          .info-table { width: 100%; border-collapse: collapse; }
          .info-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .info-table td:first-child { font-weight: 600; color: #6b7280; width: 120px; }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
          .badge-visit { background: #dbeafe; color: #1e40af; }
          .badge-video { background: #fce7f3; color: #be185d; }
          .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">🔔 신규 상담 예약 알림</h2>
          </div>
          <div class="content">
            <p>새로운 상담 예약이 접수되었습니다.</p>

            <table class="info-table">
              <tr>
                <td>예약번호</td>
                <td><code>${booking.id}</code></td>
              </tr>
              <tr>
                <td>상담 유형</td>
                <td>
                  <span class="badge ${booking.type === 'visit' ? 'badge-visit' : 'badge-video'}">
                    ${booking.type === 'visit' ? '방문 상담' : '화상 상담'}
                  </span>
                </td>
              </tr>
              ${booking.office_location ? `
              <tr>
                <td>사무소</td>
                <td>${booking.office_location}</td>
              </tr>
              ` : ''}
              ${booking.preferred_lawyer ? `
              <tr>
                <td>희망 변호사</td>
                <td><strong>${booking.preferred_lawyer === '육심원' ? '육심원 (대표변호사)' : '임은지 (이혼전문변호사)'}</strong></td>
              </tr>
              ` : ''}
              <tr>
                <td>이름</td>
                <td><strong>${booking.name}</strong></td>
              </tr>
              <tr>
                <td>전화번호</td>
                <td>${booking.phone}</td>
              </tr>
              ${booking.email ? `
              <tr>
                <td>이메일</td>
                <td>${booking.email}</td>
              </tr>
              ` : ''}
              <tr>
                <td>희망 날짜</td>
                <td>${formattedDate}</td>
              </tr>
              <tr>
                <td>희망 시간</td>
                <td>${booking.preferred_time}</td>
              </tr>
              ${booking.category ? `
              <tr>
                <td>상담 분야</td>
                <td>${booking.category}</td>
              </tr>
              ` : ''}
              ${booking.message ? `
              <tr>
                <td>메시지</td>
                <td>${booking.message}</td>
              </tr>
              ` : ''}
              <tr>
                <td>접수 시각</td>
                <td>${new Date(booking.created_at).toLocaleString('ko-KR')}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
              <strong>⚠️ 조치 필요</strong><br>
              고객에게 예약 확인 연락을 진행해주세요.
            </div>

            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/bookings" class="button">
              관리자 페이지에서 확인하기
            </a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await fetch(resendApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminEmail),
  });
}
