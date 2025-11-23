/**
 * Unified Consultations API - Detail Routes
 * GET /api/consultations/[id] - Get consultation by ID
 * PATCH /api/consultations/[id] - Update consultation
 * DELETE /api/consultations/[id] - Delete consultation
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} from '@/lib/supabase/consultations';
import type { UpdateConsultationInput } from '@/types/consultation';

// ============================================================================
// ZOD VALIDATION SCHEMA FOR UPDATE
// ============================================================================

const updateConsultationSchema = z.object({
  status: z.enum([
    'pending',
    'contacted',
    'confirmed',
    'payment_pending',
    'payment_completed',
    'in_progress',
    'completed',
    'cancelled',
    'no_show',
  ]).optional(),
  assigned_lawyer: z.enum(['육심원', '임은지']).optional(),
  confirmed_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  confirmed_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  video_link: z.string().url('올바른 URL을 입력하세요').optional(),
  admin_notes: z.string().optional(),
  cancellation_reason: z.string().optional(),
  office_location: z.enum(['천안', '평택']).optional(),
  consultation_fee: z.number().int().min(0).optional(),
  payment_method: z.enum(['card', 'transfer', 'cash', 'free']).optional(),
  payment_status: z.enum(['pending', 'completed', 'refunded', 'free']).optional(),
  payment_transaction_id: z.string().optional(),
});

// ============================================================================
// GET /api/consultations/[id]
// Get a single consultation by ID
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Consultation ID is required' },
        { status: 400 }
      );
    }

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
  } catch (error) {
    console.error(`GET /api/consultations/${params.id} error:`, error);

    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH /api/consultations/[id]
// Update a consultation (ADMIN ONLY)
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Consultation ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = updateConsultationSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return NextResponse.json(
        {
          error: '입력값이 올바르지 않습니다',
          details: errors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Update consultation
    const updated = await updateConsultation(id, data as UpdateConsultationInput);

    // TODO: Send notifications based on status change
    // - If status changed to 'contacted', send SMS
    // - If status changed to 'confirmed', send confirmation SMS/email
    // - etc.

    return NextResponse.json({
      success: true,
      data: updated,
      message: '상담 정보가 수정되었습니다',
    });
  } catch (error) {
    console.error(`PATCH /api/consultations/${params.id} error:`, error);

    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/consultations/[id]
// Delete a consultation (ADMIN ONLY)
// ============================================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Consultation ID is required' },
        { status: 400 }
      );
    }

    // Check if consultation exists
    const existing = await getConsultationById(id);

    if (!existing) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    // Delete consultation
    await deleteConsultation(id);

    return NextResponse.json({
      success: true,
      message: '상담 정보가 삭제되었습니다',
    });
  } catch (error) {
    console.error(`DELETE /api/consultations/${params.id} error:`, error);

    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
