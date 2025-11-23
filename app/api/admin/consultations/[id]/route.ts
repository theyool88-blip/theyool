/**
 * Admin Consultations API - Detail Routes
 * ADMIN ONLY - Requires authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth/auth';
import {
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} from '@/lib/supabase/consultations';
import type { UpdateConsultationInput } from '@/types/consultation';

/**
 * GET /api/admin/consultations/[id]
 * Get a single consultation by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const consultation = await getConsultationById(id);

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: consultation,
    });
  } catch (error: any) {
    console.error('Error fetching consultation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch consultation' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/consultations/[id]
 * Update a consultation (ADMIN ONLY)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    console.log(`[ADMIN CONSULTATION UPDATE] ID: ${id}`);
    console.log('[ADMIN CONSULTATION UPDATE] Request body:', body);

    // No strict Zod validation in admin route - trust admin input
    // But still filter to only allowed fields
    const input: UpdateConsultationInput = {};

    if (body.status !== undefined) input.status = body.status;
    if (body.assigned_lawyer !== undefined) input.assigned_lawyer = body.assigned_lawyer;
    if (body.confirmed_date !== undefined) input.confirmed_date = body.confirmed_date;
    if (body.confirmed_time !== undefined) input.confirmed_time = body.confirmed_time;
    if (body.video_link !== undefined) input.video_link = body.video_link;
    if (body.admin_notes !== undefined) input.admin_notes = body.admin_notes;
    if (body.cancellation_reason !== undefined) input.cancellation_reason = body.cancellation_reason;
    if (body.office_location !== undefined) input.office_location = body.office_location;
    if (body.consultation_fee !== undefined) input.consultation_fee = body.consultation_fee;
    if (body.payment_method !== undefined) input.payment_method = body.payment_method;
    if (body.payment_status !== undefined) input.payment_status = body.payment_status;
    if (body.payment_transaction_id !== undefined) input.payment_transaction_id = body.payment_transaction_id;

    console.log('[ADMIN CONSULTATION UPDATE] Input to update:', input);

    const consultation = await updateConsultation(id, input);

    console.log('[ADMIN CONSULTATION UPDATE] Updated consultation:', {
      id: consultation.id,
      status: consultation.status,
      updated_at: consultation.updated_at,
    });

    // TODO: Send notifications based on status change
    // - If status changed to 'contacted', send SMS
    // - If status changed to 'confirmed', send confirmation SMS/email
    // - etc.

    return NextResponse.json({
      success: true,
      data: consultation,
      message: '상담 정보가 수정되었습니다',
    });
  } catch (error: any) {
    console.error('[ADMIN CONSULTATION UPDATE ERROR]:', error);
    return NextResponse.json(
      { error: error.message || '상담 정보 수정에 실패했습니다' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/consultations/[id]
 * Delete a consultation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await deleteConsultation(id);

    return NextResponse.json({
      success: true,
      message: 'Consultation deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting consultation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete consultation' },
      { status: 500 }
    );
  }
}
