import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import {
  getBlockedTimes,
  createBlockedTime,
} from '@/lib/supabase/blocked-times';
import type { CreateBlockedTimeInput } from '@/types/blocked-time';

/**
 * GET /api/admin/blocked-times
 * Get all blocked times
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const blockedTimes = await getBlockedTimes();

    return NextResponse.json({
      success: true,
      blockedTimes,
    });
  } catch (error: any) {
    console.error('Error fetching blocked times:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blocked times' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blocked-times
 * Create a new blocked time
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields based on block_type
    if (!body.block_type || !['date', 'time_slot'].includes(body.block_type)) {
      return NextResponse.json(
        { error: 'Invalid block_type. Must be "date" or "time_slot"' },
        { status: 400 }
      );
    }

    if (!body.blocked_date) {
      return NextResponse.json(
        { error: 'blocked_date is required' },
        { status: 400 }
      );
    }

    if (body.block_type === 'time_slot') {
      if (!body.blocked_time_start || !body.blocked_time_end) {
        return NextResponse.json(
          { error: 'blocked_time_start and blocked_time_end are required for time_slot blocks' },
          { status: 400 }
        );
      }
    }

    const input: CreateBlockedTimeInput = {
      block_type: body.block_type,
      blocked_date: body.blocked_date,
      blocked_time_start: body.blocked_time_start,
      blocked_time_end: body.blocked_time_end,
      office_location: body.office_location || null,
      reason: body.reason || null,
      created_by: session.email,
    };

    const blockedTime = await createBlockedTime(input);

    return NextResponse.json({
      success: true,
      blockedTime,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blocked time:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blocked time' },
      { status: 500 }
    );
  }
}
