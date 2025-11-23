import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

interface ConsultationEmailData {
  name: string;
  phone: string;
  email?: string | null;
  category?: string | null;
  message?: string | null;
  leadScore?: number;
  consultationId: string;
}

/**
 * Send email notification to admin when a new consultation is submitted
 */
export async function sendAdminConsultationNotification(data: ConsultationEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Resend API key not configured. Skipping email notification.');
    return { success: false, error: 'API key not configured' };
  }

  const urgencyEmoji = (data.leadScore ?? 0) >= 5 ? '🔥🔥🔥' : (data.leadScore ?? 0) >= 3 ? '🔥🔥' : '🔥';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@theyool.com';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theyool.com';

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: '법무법인 더율 <noreply@theyool.com>',
      to: [adminEmail],
      subject: `[${urgencyEmoji} 새 상담 신청] ${data.name} - ${data.category || '일반 상담'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
              .info-row { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #ec4899; }
              .label { font-weight: 600; color: #6b7280; font-size: 14px; margin-bottom: 5px; }
              .value { color: #111827; font-size: 16px; }
              .message-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #e5e7eb; }
              .button { display: inline-block; background: #ec4899; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
              .urgent-badge { background: #fef2f2; color: #dc2626; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">새로운 상담 신청</h1>
                ${(data.leadScore ?? 0) >= 5 ? '<div class="urgent-badge">🔥 긴급 상담</div>' : ''}
              </div>

              <div class="content">
                <div class="info-row">
                  <div class="label">이름</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="info-row">
                  <div class="label">전화번호</div>
                  <div class="value"><a href="tel:${data.phone}" style="color: #ec4899; text-decoration: none;">${data.phone}</a></div>
                </div>

                ${data.email ? `
                  <div class="info-row">
                    <div class="label">이메일</div>
                    <div class="value"><a href="mailto:${data.email}" style="color: #ec4899; text-decoration: none;">${data.email}</a></div>
                  </div>
                ` : ''}

                <div class="info-row">
                  <div class="label">카테고리</div>
                  <div class="value">${data.category || '미분류'}</div>
                </div>

                <div class="info-row">
                  <div class="label">리드 스코어</div>
                  <div class="value">${urgencyEmoji} ${data.leadScore || 0}점</div>
                </div>

                ${data.message ? `
                  <div class="message-box">
                    <div class="label">상담 내용</div>
                    <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${data.message}</div>
                  </div>
                ` : ''}

                <div style="text-align: center;">
                  <a href="${siteUrl}/admin/consultations" class="button">
                    상담 관리 페이지에서 확인하기
                  </a>
                </div>
              </div>

              <div class="footer">
                <p>법무법인 더율 상담 관리 시스템</p>
                <p style="font-size: 12px; color: #9ca3af;">이 이메일은 자동으로 발송되었습니다.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send admin notification email:', error);
      return { success: false, error };
    }

    console.log('Admin notification email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Unexpected error sending admin notification:', error);
    return { success: false, error };
  }
}

/**
 * Send confirmation email to the user who submitted the consultation
 */
export async function sendUserConsultationConfirmation(data: ConsultationEmailData) {
  if (!process.env.RESEND_API_KEY || !data.email) {
    return { success: false, error: 'API key not configured or no email provided' };
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: '법무법인 더율 <noreply@theyool.com>',
      to: [data.email],
      subject: '상담 신청이 접수되었습니다 - 법무법인 더율',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%); color: white; padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
              .content { background: #f9fafb; padding: 40px; border-radius: 0 0 12px 12px; }
              .check-icon { width: 60px; height: 60px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 30px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .next-steps { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; }
              .step { display: flex; gap: 15px; margin: 15px 0; }
              .step-number { background: #ec4899; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0; }
              .footer { text-align: center; padding: 30px; color: #6b7280; font-size: 14px; }
              .contact-info { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="check-icon">✓</div>
                <h1 style="margin: 0; font-size: 28px;">상담 신청 완료</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">감사합니다, ${data.name}님</p>
              </div>

              <div class="content">
                <p style="font-size: 16px; text-align: center; margin-bottom: 30px;">
                  상담 신청이 정상적으로 접수되었습니다.<br>
                  <strong>30분 내</strong>에 연락드리겠습니다.
                </p>

                <div class="info-box">
                  <h3 style="margin: 0 0 15px 0; color: #111827;">접수 정보</h3>
                  <p style="margin: 8px 0;"><strong>카테고리:</strong> ${data.category || '일반 상담'}</p>
                  <p style="margin: 8px 0;"><strong>연락처:</strong> ${data.phone}</p>
                </div>

                <div class="next-steps">
                  <h3 style="margin: 0 0 20px 0; color: #111827;">다음 단계</h3>

                  <div class="step">
                    <div class="step-number">1</div>
                    <div>
                      <strong>전화 연락</strong><br>
                      <span style="color: #6b7280;">담당 변호사가 곧 전화드릴 예정입니다.</span>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">2</div>
                    <div>
                      <strong>무료 상담 (10분)</strong><br>
                      <span style="color: #6b7280;">간단한 상황 파악 및 초기 조언을 드립니다.</span>
                    </div>
                  </div>

                  <div class="step">
                    <div class="step-number">3</div>
                    <div>
                      <strong>상세 상담 예약</strong><br>
                      <span style="color: #6b7280;">필요시 대면 또는 화상 상담을 진행합니다.</span>
                    </div>
                  </div>
                </div>

                <div class="contact-info">
                  <h3 style="margin: 0 0 15px 0; color: #92400e;">긴급 연락처</h3>
                  <p style="margin: 5px 0; color: #78350f;">
                    전화: <a href="tel:1661-7633" style="color: #92400e; font-weight: 600; text-decoration: none;">1661-7633</a>
                  </p>
                  <p style="margin: 5px 0; color: #78350f;">
                    카카오톡: <a href="http://pf.kakao.com/_xdKxhcG/chat" style="color: #92400e; font-weight: 600; text-decoration: none;">@법무법인더율</a>
                  </p>
                  <p style="margin: 15px 0 0 0; font-size: 12px; color: #92400e;">
                    평일 09:00-18:00 | 주말/공휴일 예약 상담
                  </p>
                </div>

                <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px;">
                  💚 법무법인 더율이 함께합니다<br>
                  어려운 시기를 잘 헤쳐나가실 수 있도록 최선을 다하겠습니다.
                </p>
              </div>

              <div class="footer">
                <p><strong>법무법인 더율</strong></p>
                <p>이혼전문변호사 | 광고 책임 변호사: 임은지</p>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">
                  이 이메일은 자동으로 발송되었습니다.<br>
                  회신하지 마시고 상담은 전화 또는 카카오톡을 이용해주세요.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send user confirmation email:', error);
      return { success: false, error };
    }

    console.log('User confirmation email sent successfully:', emailData);
    return { success: true, data: emailData };
  } catch (error) {
    console.error('Unexpected error sending user confirmation:', error);
    return { success: false, error };
  }
}

/**
 * Calculate lead score based on consultation data
 */
export function calculateLeadScore(consultation: Omit<ConsultationEmailData, 'consultationId' | 'leadScore'>): number {
  let score = 0;

  // Message length (more details = higher score)
  if (consultation.message && consultation.message.length > 100) score += 2;
  else if (consultation.message && consultation.message.length > 50) score += 1;

  // Has email (more committed)
  if (consultation.email) score += 1;

  // Has category (knows what they want)
  if (consultation.category) score += 1;

  // Urgent keywords
  const urgentKeywords = ['긴급', '급함', '빨리', '즉시', '오늘', '내일', '시급'];
  if (consultation.message && urgentKeywords.some(k => consultation.message!.includes(k))) {
    score += 3;
  }

  return score;
}
