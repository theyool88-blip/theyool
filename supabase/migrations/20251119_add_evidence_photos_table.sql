-- ================================================
-- Testimonial Evidence Photos (증빙 사진) 테이블 생성
-- ================================================
--
-- 목적: 의뢰인 후기의 증빙 자료 사진 관리
--       (카카오톡, 문자, 네이버 지도 리뷰, 편지 등)
--
-- ================================================

CREATE TABLE IF NOT EXISTS testimonial_evidence_photos (
  -- 기본 식별자
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 외래키 (후기 테이블과 연결)
  testimonial_id UUID NOT NULL REFERENCES testimonials(id) ON DELETE CASCADE,

  -- 사진 정보
  photo_url TEXT NOT NULL, -- Supabase Storage URL
  photo_type TEXT NOT NULL CHECK (photo_type IN ('kakao', 'sms', 'naver', 'letter', 'other')),

  -- 표시 설정
  display_order INTEGER DEFAULT 0, -- 낮은 숫자가 먼저 표시
  caption TEXT, -- 선택적 설명 (예: "카카오톡 대화 1/3")

  -- 메타데이터
  original_date TIMESTAMP WITH TIME ZONE, -- 원본 후기/메시지 작성 날짜 (있는 경우)
  file_size INTEGER, -- 파일 크기 (bytes)
  file_type TEXT, -- MIME type (image/jpeg, image/png, etc.)
  width INTEGER, -- 이미지 가로 크기 (px)
  height INTEGER, -- 이미지 세로 크기 (px)
  alt_text TEXT, -- 접근성 & SEO용 이미지 설명

  -- 개인정보 보호 & 컴플라이언스
  blur_applied BOOLEAN DEFAULT true, -- 개인정보 블러 처리 확인
  verified_by UUID, -- 블러 확인한 관리자
  verified_at TIMESTAMP WITH TIME ZONE,

  -- 감사 추적
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID, -- 업로드한 관리자
  updated_by UUID
);

-- ================================================
-- 인덱스 생성 (성능 최적화)
-- ================================================

CREATE INDEX idx_evidence_photos_testimonial ON testimonial_evidence_photos(testimonial_id);
CREATE INDEX idx_evidence_photos_type ON testimonial_evidence_photos(photo_type);
CREATE INDEX idx_evidence_photos_order ON testimonial_evidence_photos(testimonial_id, display_order ASC);

-- 게시된 증빙 사진 효율적 로딩을 위한 복합 인덱스
CREATE INDEX idx_evidence_photos_published ON testimonial_evidence_photos(testimonial_id, display_order)
  WHERE blur_applied = true;

-- ================================================
-- updated_at 자동 업데이트 트리거
-- ================================================

CREATE TRIGGER update_evidence_photos_updated_at
  BEFORE UPDATE ON testimonial_evidence_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Row Level Security (RLS) 설정
-- ================================================

ALTER TABLE testimonial_evidence_photos ENABLE ROW LEVEL SECURITY;

-- 정책 1: 게시되고 동의된 후기의 블러 처리된 증빙 사진만 공개
CREATE POLICY "View evidence for published testimonials"
  ON testimonial_evidence_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM testimonials
      WHERE testimonials.id = testimonial_evidence_photos.testimonial_id
        AND testimonials.published = true
        AND testimonials.consent_given = true
    )
    AND blur_applied = true
  );

-- 정책 2: 인증된 사용자(관리자)는 모든 증빙 사진 관리 가능
CREATE POLICY "Admins can manage evidence photos"
  ON testimonial_evidence_photos FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================
-- 유틸리티 함수들
-- ================================================

-- 특정 후기의 증빙 사진 조회 (공개용)
CREATE OR REPLACE FUNCTION get_testimonial_evidence(testimonial_uuid UUID)
RETURNS TABLE(
  id UUID,
  photo_url TEXT,
  photo_type TEXT,
  caption TEXT,
  display_order INTEGER,
  alt_text TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.photo_url,
    e.photo_type,
    e.caption,
    e.display_order,
    e.alt_text
  FROM testimonial_evidence_photos e
  INNER JOIN testimonials t ON t.id = e.testimonial_id
  WHERE e.testimonial_id = testimonial_uuid
    AND t.published = true
    AND t.consent_given = true
    AND e.blur_applied = true
  ORDER BY e.display_order ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 후기별 증빙 사진 개수 카운트
CREATE OR REPLACE FUNCTION count_evidence_photos(testimonial_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  photo_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO photo_count
  FROM testimonial_evidence_photos
  WHERE testimonial_id = testimonial_uuid
    AND blur_applied = true;
  RETURN photo_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 증빙 사진 유형별 통계
CREATE OR REPLACE FUNCTION get_evidence_stats_by_type()
RETURNS TABLE(
  photo_type TEXT,
  total_count BIGINT,
  verified_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.photo_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE e.blur_applied = true) as verified_count
  FROM testimonial_evidence_photos e
  GROUP BY e.photo_type
  ORDER BY total_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- 주석 추가 (데이터베이스 문서화)
-- ================================================

COMMENT ON TABLE testimonial_evidence_photos IS '후기 증빙 사진 테이블 - 네이버 리뷰, 카톡, 문자, 편지 등';
COMMENT ON COLUMN testimonial_evidence_photos.photo_type IS '사진 유형: kakao(카카오톡), sms(문자), naver(네이버 지도), letter(편지), other(기타)';
COMMENT ON COLUMN testimonial_evidence_photos.blur_applied IS '[CRITICAL] 개인정보 블러 처리 확인 필수 - false면 공개 불가';
COMMENT ON COLUMN testimonial_evidence_photos.alt_text IS 'SEO & 접근성용 이미지 설명';
COMMENT ON COLUMN testimonial_evidence_photos.caption IS '사진 설명 (예: "카카오톡 대화 1/3")';
