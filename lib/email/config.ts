/**
 * Email Configuration
 *
 * Manages email service setup and credentials
 */

import { Resend } from 'resend';

// Initialize Resend client
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'info@theyool.com',
  replyTo: process.env.EMAIL_REPLY_TO || 'info@theyool.com',

  // Email subjects
  subjects: {
    bookingCreated: '[법무법인 더율] 상담 예약이 접수되었습니다',
    bookingConfirmed: '[법무법인 더율] 상담 예약이 확정되었습니다',
    bookingCancelled: '[법무법인 더율] 상담 예약이 취소되었습니다',
    reminder: '[법무법인 더율] 내일 상담 예약이 있습니다',
  },

  // Business info
  business: {
    name: '법무법인 더율',
    phone: '02-1234-5678',
    email: 'info@theyool.com',
    website: 'https://theyool.com',
    address: '서울시 강남구 테헤란로 123',
  },
} as const;

// Check if email service is configured
export function isEmailConfigured(): boolean {
  return !!resend && !!process.env.RESEND_API_KEY;
}
