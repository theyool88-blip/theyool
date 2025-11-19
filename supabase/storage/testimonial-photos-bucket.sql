-- ================================================
-- Supabase Storage Bucket: testimonial-photos
-- ================================================
--
-- 목적: 의뢰인 후기 사진 저장
-- 구조: testimonial-photos/{testimonial_id}/{timestamp}_{filename}
-- 보안: 공개 읽기, 관리자만 쓰기
--
-- ================================================

-- Storage Bucket 생성 (Supabase Dashboard에서 실행 또는 SQL)
-- 이 명령은 Supabase CLI 또는 Dashboard에서 수동으로 실행 필요

/*
버킷명: testimonial-photos
공개 여부: Public (웹에서 직접 접근 가능)
파일 크기 제한: 5MB
허용 MIME 타입: image/jpeg, image/png, image/webp
*/

-- Storage Policy 설정
-- 1. 공개 읽기 허용
CREATE POLICY "Public read access for testimonial photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'testimonial-photos');

-- 2. 인증된 사용자만 업로드 가능
CREATE POLICY "Authenticated users can upload testimonial photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);

-- 3. 인증된 사용자만 업데이트 가능
CREATE POLICY "Authenticated users can update testimonial photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);

-- 4. 인증된 사용자만 삭제 가능
CREATE POLICY "Authenticated users can delete testimonial photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'testimonial-photos'
  AND auth.role() = 'authenticated'
);

-- ================================================
-- 파일명 규칙
-- ================================================
--
-- 형식: testimonial-photos/{testimonial_id}/{timestamp}_{original_filename}
-- 예시: testimonial-photos/123e4567-e89b-12d3-a456-426614174000/1700000000_client_photo.jpg
--
-- 장점:
-- 1. testimonial_id로 폴더 분리 → 관리 용이
-- 2. timestamp 포함 → 중복 방지
-- 3. original_filename 유지 → 디버깅 편의
--
-- ================================================

-- ================================================
-- 기본 아바타 이미지 (선택사항)
-- ================================================
--
-- 사진이 없는 경우 Tailwind gradient 배경 + 이니셜 사용
-- 또는 기본 아바타 이미지 저장 가능
--
-- 저장 경로: testimonial-photos/defaults/avatar-{color}.svg
-- 예시: testimonial-photos/defaults/avatar-amber.svg
--
-- ================================================

-- ================================================
-- 이미지 최적화 권장사항
-- ================================================
--
-- 1. 업로드 시 클라이언트에서 리사이징 (권장 크기: 400x400px)
-- 2. WebP 포맷 변환 (용량 감소)
-- 3. 메타데이터 제거 (프라이버시)
-- 4. CDN 캐싱 활용 (Supabase 자동 지원)
--
-- ================================================

-- ================================================
-- 사용 예시 (TypeScript)
-- ================================================

/*
// 파일 업로드 예시
const uploadTestimonialPhoto = async (
  testimonialId: string,
  file: File
): Promise<string> => {
  const timestamp = Date.now();
  const filename = `${timestamp}_${file.name}`;
  const filePath = `${testimonialId}/${filename}`;

  const { data, error } = await supabase.storage
    .from('testimonial-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('testimonial-photos')
    .getPublicUrl(filePath);

  return publicUrl;
};

// 파일 삭제 예시
const deleteTestimonialPhoto = async (photoUrl: string) => {
  const filePath = photoUrl.split('testimonial-photos/')[1];

  const { error } = await supabase.storage
    .from('testimonial-photos')
    .remove([filePath]);

  if (error) throw error;
};
*/
