import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import {
  deleteBlockedTime,
  updateBlockedTime,
} from '@/lib/supabase/blocked-times';

/**
 * PATCH /api/admin/blocked-times/[id]
 * Update a blocked time (only reason can be updated)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    if (!body.reason) {
      return NextResponse.json(
        { error: 'reason is required' },
        { status: 400 }
      );
    }

    const blockedTime = await updateBlockedTime(id, body.reason);

    return NextResponse.json({
      success: true,
      blockedTime,
    });
  } catch (error: any) {
    console.error('Error updating blocked time:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blocked time' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blocked-times/[id]
 * Delete a blocked time
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await deleteBlockedTime(id);

    return NextResponse.json({
      success: true,
      message: 'Blocked time deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting blocked time:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blocked time' },
      { status: 500 }
    );
  }
}
