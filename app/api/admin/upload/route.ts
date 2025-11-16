import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 허용된 이미지 MIME 타입
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
// 허용된 비디오 MIME 타입
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
// 최대 파일 크기 (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    // 인증 확인
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string; // 'blog-images', 'case-images', 'instagram-media'

    if (!file) {
      return NextResponse.json({ success: false, message: '파일이 없습니다.' }, { status: 400 });
    }

    if (!bucket) {
      return NextResponse.json({ success: false, message: 'bucket이 지정되지 않았습니다.' }, { status: 400 });
    }

    // 파일 타입 검증
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json({
        success: false,
        message: '지원하지 않는 파일 형식입니다. (JPEG, PNG, GIF, WebP, MP4, WebM만 가능)'
      }, { status: 400 });
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({
        success: false,
        message: '파일 크기가 너무 큽니다. (최대 10MB)'
      }, { status: 400 });
    }

    // 고유한 파일명 생성
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;

    // 파일을 ArrayBuffer로 변환
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Supabase Storage에 업로드
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json({
        success: false,
        message: '파일 업로드 중 오류가 발생했습니다.'
      }, { status: 500 });
    }

    // Public URL 생성
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      data: {
        fileName: fileName,
        url: urlData.publicUrl,
        type: isImage ? 'image' : 'video',
        size: file.size
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      message: '파일 업로드 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}

// DELETE: 파일 삭제
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { bucket, fileName } = await request.json();

    if (!bucket || !fileName) {
      return NextResponse.json({
        success: false,
        message: 'bucket과 fileName이 필요합니다.'
      }, { status: 400 });
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json({
        success: false,
        message: '파일 삭제 중 오류가 발생했습니다.'
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '파일이 삭제되었습니다.' });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      success: false,
      message: '파일 삭제 중 오류가 발생했습니다.'
    }, { status: 500 });
  }
}
