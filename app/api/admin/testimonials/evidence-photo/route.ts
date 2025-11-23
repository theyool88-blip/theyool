// @ts-nocheck - Testimonial evidence types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';
import type { PhotoType } from '@/types/testimonial';

/**
 * GET /api/admin/testimonials/evidence-photo?caseId={caseId}
 * Get all evidence photos for a testimonial case
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const caseId = searchParams.get('caseId');

    if (!caseId) {
      return NextResponse.json({ error: 'caseId is required' }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonial_evidence_photos')
      .select('*')
      .eq('case_id', caseId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/testimonials/evidence-photo
 * Upload an evidence photo for a testimonial case
 *
 * Request: FormData with 'file', 'caseId', 'evidenceType', 'caption', 'originalDate', 'displayOrder'
 * Response: { id, photo_url, evidence_type, display_order }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const caseId = formData.get('caseId') as string;
    const evidenceType = formData.get('evidenceType') as PhotoType;
    const caption = formData.get('caption') as string | null;
    const originalDate = formData.get('originalDate') as string | null;
    const displayOrder = formData.get('displayOrder') as string | null;

    // Validation
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!caseId) {
      return NextResponse.json({ error: 'No caseId provided' }, { status: 400 });
    }

    if (!evidenceType || !['kakao', 'sms', 'naver', 'letter', 'other'].includes(evidenceType)) {
      return NextResponse.json({ error: 'Invalid evidenceType' }, { status: 400 });
    }

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, HEIC' },
        { status: 400 }
      );
    }

    // File size validation (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 10MB' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if case exists
    const { data: testimonialCase, error: caseError } = await supabase
      .from('testimonial_cases')
      .select('id')
      .eq('id', caseId)
      .single();

    if (caseError || !testimonialCase) {
      return NextResponse.json({ error: 'Testimonial case not found' }, { status: 404 });
    }

    // Generate storage path: {caseId}/evidence/{evidenceType}/{timestamp}_{filename}
    const timestamp = Date.now();
    const safeFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeFilename}`;
    const filePath = `${caseId}/evidence/${evidenceType}/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('testimonial-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('testimonial-photos').getPublicUrl(filePath);

    // Insert record to database
    const { data: evidencePhoto, error: dbError } = await supabase
      .from('testimonial_evidence_photos')
      .insert({
        case_id: caseId,
        photo_url: publicUrl,
        evidence_type: evidenceType,
        caption: caption || null,
        original_date: originalDate || null,
        display_order: displayOrder ? parseInt(displayOrder) : 0,
        file_size: file.size,
        file_type: file.type,
        blur_applied: true, // Assuming uploaded images are already blurred
        created_by: session.id,
      })
      .select()
      .single();

    if (dbError) {
      // Rollback: Delete uploaded file
      await supabase.storage.from('testimonial-photos').remove([filePath]);
      console.error('Database error:', dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({
      id: evidencePhoto.id,
      photo_url: evidencePhoto.photo_url,
      evidence_type: evidencePhoto.evidence_type,
      display_order: evidencePhoto.display_order,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
