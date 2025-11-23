// @ts-nocheck - Bookings table types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendReminderNotification } from '@/lib/email/notifications';

/**
 * Send reminder notifications for bookings happening tomorrow
 *
 * Cron job endpoint to automatically send reminders for:
 * 1. Confirmed bookings
 * 2. Scheduled for tomorrow
 *
 * This endpoint should be called by a cron service daily
 *
 * Authorization: Requires CRON_SECRET environment variable
 */
export async function GET(request: NextRequest) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const supabase = await createClient();

    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const tomorrowStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Get all confirmed bookings for tomorrow
    const { data: bookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'confirmed')
      .eq('preferred_date', tomorrowStr);

    if (fetchError) {
      throw new Error(`Failed to fetch bookings: ${fetchError.message}`);
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({
        message: 'No bookings scheduled for tomorrow',
        sent: 0,
        failed: 0,
      });
    }

    const results = {
      sent: 0,
      failed: 0,
      details: [] as any[],
    };

    // Send reminder to each booking
    for (const booking of bookings) {
      try {
        const result = await sendReminderNotification(booking);

        if (result.success) {
          results.sent++;
          results.details.push({
            id: booking.id,
            name: booking.name,
            date: booking.preferred_date,
            time: booking.preferred_time,
            emailSent: result.emailSent,
            smsSent: result.smsSent,
            status: 'sent',
          });
        } else {
          results.failed++;
          results.details.push({
            id: booking.id,
            name: booking.name,
            status: 'failed',
            error: result.error || 'Unknown error',
          });
        }
      } catch (err) {
        results.failed++;
        results.details.push({
          id: booking.id,
          name: booking.name,
          status: 'failed',
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      message: 'Reminder notifications completed',
      total_bookings: bookings.length,
      sent: results.sent,
      failed: results.failed,
      details: results.details,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Reminder notification error:', error);
    return NextResponse.json(
      {
        error: 'Reminder notification failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint (for testing)
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
