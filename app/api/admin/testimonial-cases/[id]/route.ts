import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getCaseById, updateCase, deleteCase } from '@/lib/supabase/testimonial-cases';
import type { CaseUpdateRequest } from '@/types/testimonial';

/**
 * GET /api/admin/testimonial-cases/[id]
 * Get a single testimonial case by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await getCaseById(params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/testimonial-cases/[id]
 * Update a testimonial case
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

    const body = await request.json();
    const updates: Partial<CaseUpdateRequest> = body;

    const { data, error } = await updateCase(params.id, updates, session.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/testimonial-cases/[id]
 * Delete a testimonial case (and all its evidence photos via CASCADE)
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

    const { success, error } = await deleteCase(params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete case' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
