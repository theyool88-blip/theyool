/**
 * Notification Service
 *
 * Handles sending email and SMS notifications for bookings
 */

import { Booking } from '@/types/booking';
import { resend, isEmailConfigured, EMAIL_CONFIG } from './config';
import {
  bookingCreatedEmail,
  bookingConfirmedEmail,
  bookingCancelledEmail,
  reminderEmail,
} from './templates';
import {
  sendBookingConfirmedSMS,
  sendBookingReminderSMS,
  sendBookingCancelledSMS,
  sendNewBookingAlertSMS,
} from '@/lib/sms/solapi';

// Type for notification results
export interface NotificationResult {
  success: boolean;
  emailSent: boolean;
  smsSent: boolean;
  error?: string;
}

/**
 * Send booking created notification
 */
export async function sendBookingCreatedNotification(
  booking: Booking
): Promise<NotificationResult> {
  const result: NotificationResult = {
    success: false,
    emailSent: false,
    smsSent: false,
  };

  // Send email
  if (isEmailConfigured() && booking.email) {
    try {
      await resend!.emails.send({
        from: EMAIL_CONFIG.from,
        to: booking.email,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: EMAIL_CONFIG.subjects.bookingCreated,
        html: bookingCreatedEmail(booking),
      });

      result.emailSent = true;
    } catch (error) {
      console.error('Failed to send booking created email:', error);
      result.error = error instanceof Error ? error.message : 'Unknown email error';
    }
  }

  // Send admin alert SMS
  if (booking.phone) {
    try {
      await sendNewBookingAlertSMS({
        name: booking.name,
        phone: booking.phone,
        date: booking.preferred_date,
        time: booking.preferred_time,
        message: booking.message,
      });

      result.smsSent = true;
    } catch (error) {
      console.error('Failed to send booking admin alert SMS:', error);
    }
  }

  result.success = result.emailSent || result.smsSent;
  return result;
}

/**
 * Send booking confirmed notification
 */
export async function sendBookingConfirmedNotification(
  booking: Booking
): Promise<NotificationResult> {
  const result: NotificationResult = {
    success: false,
    emailSent: false,
    smsSent: false,
  };

  // Send email
  if (isEmailConfigured() && booking.email) {
    try {
      await resend!.emails.send({
        from: EMAIL_CONFIG.from,
        to: booking.email,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: EMAIL_CONFIG.subjects.bookingConfirmed,
        html: bookingConfirmedEmail(booking),
      });

      result.emailSent = true;
    } catch (error) {
      console.error('Failed to send booking confirmed email:', error);
      result.error = error instanceof Error ? error.message : 'Unknown email error';
    }
  }

  // Send SMS to customer
  if (booking.phone) {
    try {
      await sendBookingConfirmedSMS({
        phone: booking.phone,
        name: booking.name,
        date: booking.preferred_date,
        time: booking.preferred_time,
        videoLink: booking.video_link || undefined,
      });

      result.smsSent = true;
    } catch (error) {
      console.error('Failed to send booking confirmed SMS:', error);
    }
  }

  result.success = result.emailSent || result.smsSent;
  return result;
}

/**
 * Send booking cancelled notification
 */
export async function sendBookingCancelledNotification(
  booking: Booking
): Promise<NotificationResult> {
  const result: NotificationResult = {
    success: false,
    emailSent: false,
    smsSent: false,
  };

  // Send email
  if (isEmailConfigured() && booking.email) {
    try {
      await resend!.emails.send({
        from: EMAIL_CONFIG.from,
        to: booking.email,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: EMAIL_CONFIG.subjects.bookingCancelled,
        html: bookingCancelledEmail(booking),
      });

      result.emailSent = true;
    } catch (error) {
      console.error('Failed to send booking cancelled email:', error);
      result.error = error instanceof Error ? error.message : 'Unknown email error';
    }
  }

  // Send SMS to customer
  if (booking.phone) {
    try {
      await sendBookingCancelledSMS({
        phone: booking.phone,
        name: booking.name,
        date: booking.preferred_date,
        time: booking.preferred_time,
      });

      result.smsSent = true;
    } catch (error) {
      console.error('Failed to send booking cancelled SMS:', error);
    }
  }

  result.success = result.emailSent || result.smsSent;
  return result;
}

/**
 * Send reminder notification (day before)
 */
export async function sendReminderNotification(
  booking: Booking
): Promise<NotificationResult> {
  const result: NotificationResult = {
    success: false,
    emailSent: false,
    smsSent: false,
  };

  // Send email
  if (isEmailConfigured() && booking.email) {
    try {
      await resend!.emails.send({
        from: EMAIL_CONFIG.from,
        to: booking.email,
        replyTo: EMAIL_CONFIG.replyTo,
        subject: EMAIL_CONFIG.subjects.reminder,
        html: reminderEmail(booking),
      });

      result.emailSent = true;
    } catch (error) {
      console.error('Failed to send reminder email:', error);
      result.error = error instanceof Error ? error.message : 'Unknown email error';
    }
  }

  // Send SMS to customer
  if (booking.phone) {
    try {
      await sendBookingReminderSMS({
        phone: booking.phone,
        name: booking.name,
        date: booking.preferred_date,
        time: booking.preferred_time,
        videoLink: booking.video_link || undefined,
      });

      result.smsSent = true;
    } catch (error) {
      console.error('Failed to send reminder SMS:', error);
    }
  }

  result.success = result.emailSent || result.smsSent;
  return result;
}
