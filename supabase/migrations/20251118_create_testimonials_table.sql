-- ================================================
-- Testimonials (의뢰인 후기) 테이블 생성
-- ================================================
--
-- 목적: 의뢰인 후기를 데이터베이스에 저장하여 관리
-- 기능: 사진 업로드, 카테고리 분류, 검증 상태, 노출 관리
--
-- ================================================

CREATE TABLE IF NOT EXISTS testimonials (
  -- 기본 식별자
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- 의뢰인 정보 (익명화/프라이버시)
  client_name TEXT NOT NULL, -- 예: '김○○'
  client_initial TEXT NOT NULL, -- 예: '김' (아바타용)
  client_role TEXT NOT NULL, -- 예: '재산분할 의뢰인'

  -- 사례 정보
  case_category TEXT NOT NULL, -- '재산분할', '양육권', '위자료', '협의이혼', '상간손해배상', '재판이혼', '양육비청구'
  case_result TEXT NOT NULL, -- 예: '은닉 재산 발견 + 공정한 분할'
  case_duration TEXT, -- 예: '3개월', '6개월' (소요 기간)
  case_date TEXT NOT NULL, -- 예: '2024년 8월'

  -- 후기 콘텐츠
  content TEXT NOT NULL, -- 후기 본문
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5), -- 1~5점

  -- 스토리텔링 필드 (선택적)
  story_before TEXT, -- 상담 전 상황
  story_journey TEXT, -- 진행 과정
  story_after TEXT, -- 결과 후 변화

  -- 이미지 관리
  photo_url TEXT, -- Supabase Storage 경로
  use_photo BOOLEAN DEFAULT false, -- true: 사진 사용, false: 이니셜 아바타
  avatar_bg_color TEXT DEFAULT 'from-amber-100 to-amber-200', -- Tailwind gradient
  avatar_text_color TEXT DEFAULT 'text-amber-700',

  -- 담당 변호사 정보
  attorney_name TEXT, -- 예: '임은지', '육심원'
  attorney_id UUID, -- 향후 attorneys 테이블과 연결 가능

  -- 메타데이터
  verified BOOLEAN DEFAULT false, -- 검증 완료 여부
  consent_given BOOLEAN DEFAULT false, -- 게시 동의 여부 (CRITICAL)
  consent_date TIMESTAMP WITH TIME ZONE, -- 동의 날짜

  -- 노출 관리
  featured BOOLEAN DEFAULT false, -- 추천 후기 여부
  published BOOLEAN DEFAULT false, -- 게시 여부
  display_order INTEGER DEFAULT 0, -- 노출 순서 (낮을수록 우선)

  -- 통계
  views INTEGER DEFAULT 0, -- 조회수
  helpful_count INTEGER DEFAULT 0, -- '도움이 됐어요' 카운트

  -- 추가 메타데이터 (JSON)
  metadata JSONB DEFAULT '{}', -- 확장 가능 필드 (향후 video_url, tags 등)

  -- 감사 추적
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID, -- 작성자 (admin)
  updated_by UUID -- 수정자 (admin)
);

-- ================================================
-- 인덱스 생성 (성능 최적화)
-- ================================================

CREATE INDEX idx_testimonials_category ON testimonials(case_category);
CREATE INDEX idx_testimonials_published ON testimonials(published);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_verified ON testimonials(verified);
CREATE INDEX idx_testimonials_display_order ON testimonials(display_order ASC);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX idx_testimonials_rating ON testimonials(rating DESC);
CREATE INDEX idx_testimonials_views ON testimonials(views DESC);

-- 복합 인덱스: 게시되고 정렬된 후기 조회용
CREATE INDEX idx_testimonials_published_order ON testimonials(published, display_order ASC)
  WHERE published = true;

-- ================================================
-- 전문 검색 (Full Text Search)
-- ================================================

ALTER TABLE testimonials ADD COLUMN search_vector tsvector;

CREATE INDEX idx_testimonials_search ON testimonials USING GIN(search_vector);

CREATE OR REPLACE FUNCTION testimonials_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.client_name, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.case_result, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_before, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_journey, '')), 'C') ||
    setweight(to_tsvector('simple', COALESCE(NEW.story_after, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER testimonials_search_update
  BEFORE INSERT OR UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION testimonials_search_trigger();

-- ================================================
-- updated_at 자동 업데이트 트리거
-- ================================================

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Row Level Security (RLS) 설정
-- ================================================

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- 정책 1: 누구나 게시되고 동의된 후기 조회 가능
CREATE POLICY "Anyone can view published testimonials"
  ON testimonials FOR SELECT
  USING (published = true AND consent_given = true);

-- 정책 2: 인증된 사용자(관리자)는 모든 후기 관리 가능
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================
-- 유틸리티 함수들
-- ================================================

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_testimonial_views(testimonial_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE testimonials
  SET views = views + 1
  WHERE id = testimonial_id AND published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 도움 카운트 증가 함수
CREATE OR REPLACE FUNCTION increment_testimonial_helpful(testimonial_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE testimonials
  SET helpful_count = helpful_count + 1
  WHERE id = testimonial_id AND published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 카테고리별 통계 함수
CREATE OR REPLACE FUNCTION get_testimonial_stats_by_category()
RETURNS TABLE(
  category TEXT,
  total_count BIGINT,
  avg_rating NUMERIC,
  verified_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    case_category,
    COUNT(*) as total_count,
    ROUND(AVG(rating), 2) as avg_rating,
    COUNT(*) FILTER (WHERE verified = true) as verified_count
  FROM testimonials
  WHERE published = true AND consent_given = true
  GROUP BY case_category
  ORDER BY total_count DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- 초기 데이터 마이그레이션 (기존 하드코딩 데이터)
-- ================================================

INSERT INTO testimonials (
  client_name, client_initial, client_role,
  case_category, case_result, case_date,
  content, rating, verified, published, consent_given,
  avatar_bg_color, avatar_text_color, display_order
) VALUES
  ('김○○', '김', '재산분할 의뢰인',
   '재산분할', '은닉 재산 발견 + 공정한 분할', '2024년 8월',
   '처음에는 막막했지만, 더율의 전략적인 접근으로 예상보다 훨씬 좋은 결과를 얻었습니다. 특히 재산분할에서 숨겨진 재산을 찾아내 주셔서 정말 감사합니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 1),

  ('이○○', '이', '양육권 의뢰인',
   '양육권', '단독 양육권 확보', '2024년 9월',
   '양육권 다툼으로 힘든 시기를 보냈는데, 변호사님의 따뜻한 위로와 체계적인 준비 덕분에 단독 양육권을 확보할 수 있었습니다. 진심으로 감사드립니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 2),

  ('박○○', '박', '위자료 의뢰인',
   '위자료', '위자료 5억원 확보', '2024년 6월',
   '위자료 청구에서 증거가 부족하다고 생각했지만, 더율은 제가 놓친 부분까지 세심하게 챙겨주셨습니다. 5억 원이라는 결과는 상상도 못했습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 3),

  ('최○○', '최', '협의이혼 의뢰인',
   '협의이혼', '3개월 만에 원만한 합의', '2024년 10월',
   '배우자와 원만하게 합의하고 싶었는데, 변호사님 덕분에 양쪽 모두 만족할 수 있는 조건으로 이혼할 수 있었습니다. 협상력이 정말 대단하십니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 4),

  ('정○○', '정', '상간 손해배상 의뢰인',
   '상간손해배상', '상간자 손해배상 2억원', '2024년 7월',
   '상간자를 상대로 한 소송이 처음이라 두려웠지만, 전문적인 조언과 철저한 증거 준비로 승소할 수 있었습니다. 배신에 대한 정당한 대가를 받았습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 5),

  ('강○○', '강', '재판이혼 의뢰인',
   '재판이혼', '위자료 + 재산분할 + 양육권 모두 승소', '2024년 5월',
   '배우자가 협의를 거부해서 재판까지 가게 됐는데, 변호사님의 치밀한 준비와 강력한 변론으로 제가 원하는 모든 조건을 얻어낼 수 있었습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 6),

  ('윤○○', '윤', '양육비 청구 의뢰인',
   '양육비청구', '미지급 양육비 전액 + 이행명령', '2024년 4월',
   '양육비를 제대로 받지 못해 고통받고 있었는데, 법적 절차를 통해 밀린 양육비와 함께 앞으로의 양육비도 확실하게 받을 수 있게 되었습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 7),

  ('한○○', '한', '재산분할 의뢰인',
   '재산분할', '은닉 부동산 3건 발견', '2024년 3월',
   '상대방이 재산을 숨기고 있다는 것을 알고 있었지만 증명할 방법이 없었습니다. 더율의 체계적인 재산 조사로 숨겨진 부동산까지 모두 찾아냈습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 8),

  ('서○○', '서', '위자료 의뢰인',
   '위자료', '위자료 3억원 확보', '2024년 2월',
   '경제적으로 어려운 상황이었지만, 분납 제도를 활용해 법률 서비스를 받을 수 있었고, 위자료로 새로운 삶을 시작할 수 있는 기반을 마련했습니다.',
   5, true, true, true,
   'from-amber-100 to-amber-200', 'text-amber-700', 9);

-- ================================================
-- 주석 추가 (데이터베이스 문서화)
-- ================================================

COMMENT ON TABLE testimonials IS '의뢰인 후기 테이블 - 프라이버시 보호를 위해 익명화된 정보만 저장';
COMMENT ON COLUMN testimonials.client_name IS '익명화된 의뢰인 이름 (예: 김○○)';
COMMENT ON COLUMN testimonials.consent_given IS '[CRITICAL] 게시 동의 여부 - 반드시 true여야 공개 가능';
COMMENT ON COLUMN testimonials.photo_url IS 'Supabase Storage 경로 (testimonial-photos/{id}/{filename})';
COMMENT ON COLUMN testimonials.metadata IS '확장 필드 - video_url, tags, external_review_url 등 저장 가능';
