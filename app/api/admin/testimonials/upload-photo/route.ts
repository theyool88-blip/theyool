// @ts-nocheck - Testimonial types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';

/**
 * POST /api/admin/testimonials/upload-photo
 * 후기 사진 업로드
 *
 * 요청: FormData with 'file' and 'testimonialId'
 * 응답: { url: string }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const testimonialId = formData.get('testimonialId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 파일명 생성: {timestamp}_{original_filename}
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    // testimonialId가 없으면 temp 폴더에 업로드
    const folder = testimonialId || 'temp';
    const filePath = `${folder}/${filename}`;

    // Supabase Storage에 업로드
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

    // Public URL 생성
    const {
      data: { publicUrl },
    } = supabase.storage.from('testimonial-photos').getPublicUrl(filePath);

    // testimonialId가 있으면 데이터베이스에 photo_url 업데이트
    if (testimonialId) {
      const { error: updateError } = await supabase
        .from('testimonials')
        .update({
          photo_url: publicUrl,
          use_photo: true,
          updated_by: session.id,
        })
        .eq('id', testimonialId);

      if (updateError) {
        // 업데이트 실패 시 업로드된 파일 삭제
        await supabase.storage.from('testimonial-photos').remove([filePath]);
        console.error('Database update error:', updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/testimonials/upload-photo
 * 후기 사진 삭제
 *
 * 요청: { testimonialId: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { testimonialId } = await request.json();

    if (!testimonialId) {
      return NextResponse.json({ error: 'No testimonialId provided' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. 기존 photo_url 조회
    const { data: testimonial, error: fetchError } = await supabase
      .from('testimonials')
      .select('photo_url')
      .eq('id', testimonialId)
      .single();

    if (fetchError) {
      console.error('Database fetch error:', fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!testimonial?.photo_url) {
      return NextResponse.json({ error: 'No photo to delete' }, { status: 404 });
    }

    // 2. Storage에서 파일 삭제
    const filePath = testimonial.photo_url.split('testimonial-photos/')[1];
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from('testimonial-photos')
        .remove([filePath]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
        // 스토리지 삭제 실패해도 계속 진행
      }
    }

    // 3. 데이터베이스에서 photo_url 제거
    const { error: updateError } = await supabase
      .from('testimonials')
      .update({
        photo_url: null,
        use_photo: false,
        updated_by: session.id,
      })
      .eq('id', testimonialId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
