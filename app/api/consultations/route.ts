/**
 * Unified Consultations API
 * Handles all 4 consultation types: callback, visit, video, info
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createConsultation, getConsultations } from '@/lib/supabase/consultations';
import type { ConsultationFilters } from '@/types/consultation';

// ============================================================================
// ZOD VALIDATION SCHEMAS
// ============================================================================

// Base schema (common fields)
const baseSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다').max(50, '이름은 50자 이하여야 합니다'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력하세요'),
  email: z.string().email('올바른 이메일 주소를 입력하세요').optional().or(z.literal('')),
  category: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

// Callback consultation schema
const callbackSchema = baseSchema.extend({
  request_type: z.literal('callback'),
});

// Visit consultation schema
const visitSchema = baseSchema.extend({
  request_type: z.literal('visit'),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)'),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, '시간 형식이 올바르지 않습니다 (HH:MM)'),
  office_location: z.enum(['천안', '평택'], { errorMap: () => ({ message: '사무소를 선택해주세요' }) }),
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});

// Video consultation schema
const videoSchema = baseSchema.extend({
  request_type: z.literal('video'),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식이 올바르지 않습니다 (YYYY-MM-DD)'),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, '시간 형식이 올바르지 않습니다 (HH:MM)'),
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});

// Info consultation schema
const infoSchema = baseSchema.extend({
  request_type: z.literal('info'),
});

// Discriminated union schema
const createConsultationSchema = z.discriminatedUnion('request_type', [
  callbackSchema,
  visitSchema,
  videoSchema,
  infoSchema,
]);

// ============================================================================
// POST /api/consultations
// Create a new consultation request
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validation = createConsultationSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((err) => ({
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

    // Create consultation
    const consultation = await createConsultation(data);

    // TODO: Send notifications (SMS/Email) - Phase 2
    // - Admin SMS alert
    // - User confirmation email (if email provided)
    // - Calculate lead score

    return NextResponse.json(
      {
        success: true,
        data: consultation,
        message: '상담 신청이 완료되었습니다',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/consultations error:', error);

    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/consultations
// Get consultations with filters (ADMIN ONLY)
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract filters from query params
    const filters: ConsultationFilters = {
      request_type: searchParams.get('request_type') as any,
      status: searchParams.get('status') as any,
      assigned_lawyer: searchParams.get('assigned_lawyer') as any,
      date_from: searchParams.get('date_from') || undefined,
      date_to: searchParams.get('date_to') || undefined,
      office_location: searchParams.get('office_location') as any,
      payment_status: searchParams.get('payment_status') as any,
      search: searchParams.get('search') || undefined,
    };

    // Remove undefined values
    Object.keys(filters).forEach((key) => {
      if (filters[key as keyof ConsultationFilters] === null || filters[key as keyof ConsultationFilters] === undefined) {
        delete filters[key as keyof ConsultationFilters];
      }
    });

    // Get consultations
    const consultations = await getConsultations(filters);

    return NextResponse.json({
      success: true,
      data: consultations,
      count: consultations.length,
    });
  } catch (error) {
    console.error('GET /api/consultations error:', error);

    const errorMessage = error instanceof Error ? error.message : '서버 오류가 발생했습니다';

    return NextResponse.json(
      {
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
