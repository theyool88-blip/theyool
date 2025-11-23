// @ts-nocheck - Testimonial evidence types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';

/**
 * DELETE /api/admin/testimonials/evidence-photo/[id]
 * Delete an evidence photo
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
    const supabase = await createClient();

    // Get photo info before deleting
    const { data: photo, error: fetchError } = await supabase
      .from('testimonial_evidence_photos')
      .select('photo_url')
      .eq('id', id)
      .single();

    if (fetchError || !photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete from database first
    const { error: dbError } = await supabase
      .from('testimonial_evidence_photos')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('Database delete error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // Try to delete from storage (only if it's a Supabase storage URL)
    if (photo.photo_url.includes('supabase.co/storage')) {
      try {
        const url = new URL(photo.photo_url);
        const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/testimonial-photos\/(.+)/);

        if (pathMatch) {
          const storagePath = pathMatch[1];
          const { error: storageError } = await supabase.storage
            .from('testimonial-photos')
            .remove([storagePath]);

          if (storageError) {
            console.error('Storage delete error:', storageError);
            // Don't fail the request
          }
        }
      } catch (urlError) {
        console.error('URL parsing error:', urlError);
        // Don't fail the request
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
