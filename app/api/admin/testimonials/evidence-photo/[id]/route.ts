import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { deleteEvidencePhoto } from '@/lib/supabase/evidence-photos';

/**
 * DELETE /api/admin/testimonials/evidence-photo/[id]
 * Delete an evidence photo
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

    const { success, error } = await deleteEvidencePhoto(params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
