-- ================================================
-- 의뢰인 후기 시스템 완전 재설계
-- ================================================
--
-- 전략: "증빙이 곧 콘텐츠다"
-- 목적: 실제 증빙 사진 중심의 신뢰 구축 시스템
--
-- ================================================

-- 기존 테이블 및 관련 객체 삭제 (클린 스타트)
DROP TABLE IF EXISTS testimonial_evidence_photos CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS testimonial_cases CASCADE;

-- 기존 함수들 삭제
DROP FUNCTION IF EXISTS count_case_evidence(UUID) CASCADE;
DROP FUNCTION IF EXISTS get_case_with_evidence(UUID) CASCADE;
DROP FUNCTION IF EXISTS get_testimonial_stats_by_category() CASCADE;
DROP FUNCTION IF EXISTS cases_search_trigger() CASCADE;

-- ================================================
-- 1. 후기 케이스 테이블 (메인)
-- ================================================

CREATE TABLE testimonial_cases (
  -- 기본 식별자
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 카테고리 (필수)
  category TEXT NOT NULL, -- 'alimony', 'custody', 'property', 'adultery' 등

  -- 카드 표시용 정보
  highlight_text TEXT NOT NULL, -- 예: "위자료 2억 승소", "양육권 단독 확보"
  case_result_amount BIGINT, -- 금액 (원 단위, nullable)

  -- 의뢰인 정보 (익명화)
  client_initial TEXT NOT NULL, -- 예: "김", "이"
  client_role TEXT, -- 예: "40대 여성", "30대 남성"
  client_age_group TEXT, -- 예: "30대", "40대", "50대"

  -- 상세 스토리
  full_story TEXT, -- 전체 후기 내용 (라이트박스에 표시)
  story_before TEXT, -- 상담 전 상황
  story_journey TEXT, -- 진행 과정
  story_after TEXT, -- 결과 후 변화

  -- 사건 정보
  case_date TEXT NOT NULL, -- 예: "2024년 10월"
  case_duration TEXT, -- 예: "3개월"

  -- 담당 변호사
  attorney_name TEXT, -- 예: "임은지"
  attorney_id UUID,

  -- 메타데이터
  verified BOOLEAN DEFAULT false, -- 검증 완료
  consent_given BOOLEAN DEFAULT false, -- 게시 동의 (CRITICAL)
  consent_date TIMESTAMP WITH TIME ZONE,

  -- 노출 설정
  featured BOOLEAN DEFAULT false, -- 추천 후기
  published BOOLEAN DEFAULT false, -- 게시 여부
  display_order INTEGER DEFAULT 0, -- 노출 순서

  -- 통계
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,

  -- 추가 메타데이터
  metadata JSONB DEFAULT '{}',

  -- 감사 추적
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- ================================================
-- 2. 증빙 사진 테이블
-- ================================================

CREATE TABLE testimonial_evidence_photos (
  -- 기본 식별자
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 외래키 (케이스와 연결)
  case_id UUID NOT NULL REFERENCES testimonial_cases(id) ON DELETE CASCADE,

  -- 증빙 정보
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('kakao', 'sms', 'naver', 'letter', 'other')),
  photo_url TEXT NOT NULL,

  -- 표시 설정
  display_order INTEGER DEFAULT 0,
  caption TEXT, -- 예: "카카오톡 대화 1/3"

  -- 메타데이터
  original_date TIMESTAMP WITH TIME ZONE, -- 원본 메시지/리뷰 날짜
  file_size INTEGER,
  file_type TEXT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,

  -- 개인정보 보호
  blur_applied BOOLEAN DEFAULT true,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,

  -- 감사 추적
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- ================================================
-- 인덱스 생성
-- ================================================

-- testimonial_cases 인덱스
CREATE INDEX IF NOT EXISTS idx_cases_category ON testimonial_cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_published ON testimonial_cases(published);
CREATE INDEX IF NOT EXISTS idx_cases_featured ON testimonial_cases(featured);
CREATE INDEX IF NOT EXISTS idx_cases_display_order ON testimonial_cases(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON testimonial_cases(created_at DESC);

-- 게시된 케이스 효율적 조회
CREATE INDEX IF NOT EXISTS idx_cases_published_order ON testimonial_cases(published, display_order ASC)
  WHERE published = true AND consent_given = true;

-- evidence_photos 인덱스
CREATE INDEX IF NOT EXISTS idx_evidence_case ON testimonial_evidence_photos(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_type ON testimonial_evidence_photos(evidence_type);
CREATE INDEX IF NOT EXISTS idx_evidence_order ON testimonial_evidence_photos(case_id, display_order ASC);

-- ================================================
-- 트리거
-- ================================================

CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON testimonial_cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_updated_at
  BEFORE UPDATE ON testimonial_evidence_photos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Full Text Search (검색 기능)
-- ================================================

-- 컬럼이 없으면 추가
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonial_cases' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE testimonial_cases ADD COLUMN search_vector tsvector;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cases_search ON testimonial_cases USING GIN(search_vector);

CREATE OR REPLACE FUNCTION cases_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.highlight_text, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.full_story, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_before, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_journey, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_after, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cases_search_update
  BEFORE INSERT OR UPDATE ON testimonial_cases
  FOR EACH ROW EXECUTE FUNCTION cases_search_trigger();

-- ================================================
-- Row Level Security (RLS)
-- ================================================

ALTER TABLE testimonial_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonial_evidence_photos ENABLE ROW LEVEL SECURITY;

-- 기존 정책 삭제 (재생성 위해)
DROP POLICY IF EXISTS "Public can view published cases" ON testimonial_cases;
DROP POLICY IF EXISTS "Admins can manage cases" ON testimonial_cases;
DROP POLICY IF EXISTS "Public can view evidence for published cases" ON testimonial_evidence_photos;
DROP POLICY IF EXISTS "Admins can manage evidence" ON testimonial_evidence_photos;

-- 정책: 게시되고 동의된 케이스만 공개
CREATE POLICY "Public can view published cases"
  ON testimonial_cases FOR SELECT
  USING (published = true AND consent_given = true);

-- 정책: 관리자는 모든 케이스 관리 가능
CREATE POLICY "Admins can manage cases"
  ON testimonial_cases FOR ALL
  USING (auth.role() = 'authenticated');

-- 정책: 게시된 케이스의 블러 처리된 증빙만 공개
CREATE POLICY "Public can view evidence for published cases"
  ON testimonial_evidence_photos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM testimonial_cases
      WHERE testimonial_cases.id = testimonial_evidence_photos.case_id
        AND testimonial_cases.published = true
        AND testimonial_cases.consent_given = true
    )
    AND blur_applied = true
  );

-- 정책: 관리자는 모든 증빙 관리 가능
CREATE POLICY "Admins can manage evidence"
  ON testimonial_evidence_photos FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================
-- 유틸리티 함수
-- ================================================

-- 케이스의 증빙 사진 개수 카운트
CREATE OR REPLACE FUNCTION count_case_evidence(case_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  photo_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO photo_count
  FROM testimonial_evidence_photos
  WHERE case_id = case_uuid
    AND blur_applied = true;
  RETURN photo_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 케이스와 증빙 함께 조회
CREATE OR REPLACE FUNCTION get_case_with_evidence(case_uuid UUID)
RETURNS TABLE(
  case_data JSON,
  evidence_photos JSON
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    row_to_json(c.*) as case_data,
    COALESCE(
      json_agg(
        row_to_json(e.*)
        ORDER BY e.display_order ASC
      ) FILTER (WHERE e.id IS NOT NULL),
      '[]'::json
    ) as evidence_photos
  FROM testimonial_cases c
  LEFT JOIN testimonial_evidence_photos e ON e.case_id = c.id AND e.blur_applied = true
  WHERE c.id = case_uuid
    AND c.published = true
    AND c.consent_given = true
  GROUP BY c.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 카테고리별 통계
CREATE OR REPLACE FUNCTION get_testimonial_stats_by_category()
RETURNS TABLE(
  category TEXT,
  total_count BIGINT,
  total_amount BIGINT,
  evidence_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.category,
    COUNT(*) as total_count,
    SUM(COALESCE(c.case_result_amount, 0)) as total_amount,
    COUNT(e.id) as evidence_count
  FROM testimonial_cases c
  LEFT JOIN testimonial_evidence_photos e ON e.case_id = c.id AND e.blur_applied = true
  WHERE c.published = true AND c.consent_given = true
  GROUP BY c.category
  ORDER BY total_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- 주석 (문서화)
-- ================================================

COMMENT ON TABLE testimonial_cases IS '의뢰인 후기 케이스 - 증빙 중심 신뢰 구축 시스템';
COMMENT ON TABLE testimonial_evidence_photos IS '후기 증빙 사진 - 카톡, 문자, 네이버 리뷰, 편지 등';

COMMENT ON COLUMN testimonial_cases.highlight_text IS '카드에 표시될 짧은 텍스트 (예: 위자료 2억 승소)';
COMMENT ON COLUMN testimonial_cases.case_result_amount IS '사건 결과 금액 (원 단위)';
COMMENT ON COLUMN testimonial_cases.full_story IS '라이트박스에 표시될 전체 스토리';
COMMENT ON COLUMN testimonial_cases.consent_given IS '[CRITICAL] 게시 동의 필수';

COMMENT ON COLUMN testimonial_evidence_photos.evidence_type IS 'kakao, sms, naver, letter, other';
COMMENT ON COLUMN testimonial_evidence_photos.blur_applied IS '[CRITICAL] 개인정보 블러 처리 확인';
