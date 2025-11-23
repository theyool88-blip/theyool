// @ts-nocheck - Bookings table types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Auto-confirm pending bookings
 *
 * Cron job endpoint to automatically confirm bookings that:
 * 1. Are in 'pending' status
 * 2. Were created more than 24 hours ago
 * 3. Have no conflicts with other bookings
 *
 * This endpoint should be called by a cron service (Vercel Cron, GitHub Actions, etc.)
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

    // Calculate cutoff time (24 hours ago)
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - 24);
    const cutoffTimeStr = cutoffTime.toISOString();

    // Get all pending bookings older than 24 hours
    const { data: pendingBookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .lt('created_at', cutoffTimeStr)
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch pending bookings: ${fetchError.message}`);
    }

    if (!pendingBookings || pendingBookings.length === 0) {
      return NextResponse.json({
        message: 'No pending bookings to process',
        confirmed: 0,
        skipped: 0,
        failed: 0,
      });
    }

    const results = {
      confirmed: 0,
      skipped: 0,
      failed: 0,
      details: [] as any[],
    };

    // Process each booking
    for (const booking of pendingBookings) {
      try {
        // Check for conflicts with other confirmed bookings
        let conflictQuery = supabase
          .from('bookings')
          .select('id')
          .eq('preferred_date', booking.preferred_date)
          .eq('preferred_time', booking.preferred_time)
          .in('status', ['confirmed'])
          .neq('id', booking.id);

        // Filter by location
        if (booking.office_location) {
          conflictQuery = conflictQuery.eq('office_location', booking.office_location);
        } else {
          conflictQuery = conflictQuery.is('office_location', null);
        }

        const { data: conflicts } = await conflictQuery;

        // Skip if conflict exists
        if (conflicts && conflicts.length > 0) {
          results.skipped++;
          results.details.push({
            id: booking.id,
            name: booking.name,
            date: booking.preferred_date,
            time: booking.preferred_time,
            status: 'skipped',
            reason: 'conflict',
          });
          continue;
        }

        // Auto-confirm the booking
        const { error: updateError } = await supabase
          .from('bookings')
          .update({
            status: 'confirmed',
            confirmed_at: new Date().toISOString(),
            admin_notes: booking.admin_notes
              ? `${booking.admin_notes}\n\n[자동 확정: ${new Date().toISOString()}]`
              : `[자동 확정: ${new Date().toISOString()}]`,
          })
          .eq('id', booking.id);

        if (updateError) {
          results.failed++;
          results.details.push({
            id: booking.id,
            name: booking.name,
            status: 'failed',
            error: updateError.message,
          });
        } else {
          results.confirmed++;
          results.details.push({
            id: booking.id,
            name: booking.name,
            date: booking.preferred_date,
            time: booking.preferred_time,
            status: 'confirmed',
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
      message: 'Auto-confirmation completed',
      total_processed: pendingBookings.length,
      confirmed: results.confirmed,
      skipped: results.skipped,
      failed: results.failed,
      details: results.details,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Auto-confirmation error:', error);
    return NextResponse.json(
      {
        error: 'Auto-confirmation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Manual trigger endpoint (for testing)
 * Can be called from admin panel
 */
export async function POST(request: NextRequest) {
  // This allows manual triggering from admin panel
  // You can add admin authentication here

  return GET(request);
}
