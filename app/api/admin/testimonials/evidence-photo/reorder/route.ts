// @ts-nocheck - Testimonial evidence types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';

/**
 * POST /api/admin/testimonials/evidence-photo/reorder
 * Reorder evidence photos for a case
 *
 * Request body: { caseId: string, reorderedIds: string[] }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { caseId, reorderedIds } = body;

    if (!caseId || !Array.isArray(reorderedIds)) {
      return NextResponse.json(
        { error: 'Invalid request: caseId and reorderedIds are required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Update each photo's display_order based on its position in the array
    const updates = reorderedIds.map((id, index) =>
      supabase
        .from('testimonial_evidence_photos')
        .update({ display_order: index })
        .eq('id', id)
        .eq('case_id', caseId)
    );

    const results = await Promise.all(updates);

    // Check for errors
    const errors = results.filter((result) => result.error);
    if (errors.length > 0) {
      console.error('Reorder errors:', errors);
      return NextResponse.json(
        { error: 'Failed to reorder some photos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
