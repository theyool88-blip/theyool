-- ================================================
-- 법무법인 더율 - 완전한 데이터베이스 설정
-- ================================================
--
-- 이 파일은 모든 테이블, 인덱스, RLS 정책, 트리거, 함수를 포함합니다.
-- Supabase Dashboard > SQL Editor에서 이 스크립트를 실행하세요.
--
-- 실행 방법:
-- 1. Supabase Dashboard 로그인
-- 2. SQL Editor 메뉴로 이동
-- 3. 이 파일 내용 전체를 복사하여 붙여넣기
-- 4. "Run" 버튼 클릭
--
-- 참고:
-- - IF NOT EXISTS를 사용하여 안전하게 재실행 가능
-- - 기존 데이터는 보존됨
-- - 총 8개 테이블 생성: consultations, cases, blog_posts, faqs,
--   instagram_posts, testimonial_cases, testimonial_evidence_photos,
--   bookings, blocked_times
--
-- 마지막 업데이트: 2025-11-19
-- ================================================

-- ================================================
-- STEP 1: 공통 함수 및 트리거 생성
-- ================================================

-- updated_at 자동 업데이트 함수 (여러 테이블에서 재사용)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- STEP 2: 핵심 콘텐츠 테이블 생성
-- ================================================

-- -------------------------------------------
-- 2.1 Cases (성공사례) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  badge TEXT,
  background TEXT,
  strategy TEXT,
  result TEXT,
  icon TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cases 인덱스
CREATE INDEX IF NOT EXISTS idx_cases_category ON cases(category);
CREATE INDEX IF NOT EXISTS idx_cases_published ON cases(published);
CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);
CREATE INDEX IF NOT EXISTS idx_cases_sort_order ON cases(sort_order);
CREATE INDEX IF NOT EXISTS idx_cases_views ON cases(views DESC);

-- Cases 전문 검색 (Full Text Search)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'cases' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE cases ADD COLUMN search_vector tsvector;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cases_search ON cases USING GIN(search_vector);

CREATE OR REPLACE FUNCTION cases_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.background, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.strategy, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.result, '')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS cases_search_update ON cases;
CREATE TRIGGER cases_search_update
  BEFORE INSERT OR UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION cases_search_trigger();

-- Cases updated_at 트리거
DROP TRIGGER IF EXISTS update_cases_updated_at ON cases;
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Cases RLS 설정
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published cases" ON cases;
CREATE POLICY "Anyone can view published cases"
  ON cases FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;
CREATE POLICY "Authenticated users can manage cases"
  ON cases FOR ALL
  USING (auth.role() = 'authenticated');

-- Cases 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_case_views(case_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE cases SET views = views + 1 WHERE slug = case_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------
-- 2.2 Blog Posts (변호사 칼럼) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  thumbnail_url TEXT,
  author TEXT DEFAULT '법무법인 더율',
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Blog Posts 인덱스
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_views ON blog_posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_blog_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(featured) WHERE featured = true;

-- Blog Posts 전문 검색
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN search_vector tsvector;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_blog_search ON blog_posts USING GIN(search_vector);

CREATE OR REPLACE FUNCTION blog_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'C') ||
    setweight(to_tsvector('simple', array_to_string(NEW.tags, ' ')), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_search_update ON blog_posts;
CREATE TRIGGER blog_search_update
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION blog_search_trigger();

-- Blog Posts updated_at 트리거
DROP TRIGGER IF EXISTS update_blog_updated_at ON blog_posts;
CREATE TRIGGER update_blog_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Blog Posts RLS 설정
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage posts" ON blog_posts;
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Blog Posts 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_blog_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------
-- 2.3 FAQs (이혼큐레이션) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  answer TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  sort_order INTEGER,
  related_blog_posts TEXT[],
  related_cases TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs 인덱스
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(published);
CREATE INDEX IF NOT EXISTS idx_faqs_featured ON faqs(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_faqs_slug ON faqs(slug);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON faqs(sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_related_blog_posts ON faqs USING GIN(related_blog_posts);
CREATE INDEX IF NOT EXISTS idx_faqs_related_cases ON faqs USING GIN(related_cases);

-- FAQs 카테고리 CHECK 제약조건 (15개 카테고리)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'faqs_category_check'
        AND conrelid = 'public.faqs'::regclass
    ) THEN
        ALTER TABLE public.faqs DROP CONSTRAINT faqs_category_check;
    END IF;
END $$;

ALTER TABLE public.faqs ADD CONSTRAINT faqs_category_check CHECK (
  category IN (
    'emergency', 'domestic-violence', 'divorce-process', 'separation-expense',
    'evidence-collection', 'adultery', 'alimony', 'custody', 'child-support',
    'visitation', 'property-division', 'paternity', 'post-divorce',
    'international-divorce', 'legal-support'
  )
);

-- FAQs 전문 검색
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'faqs' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE faqs ADD COLUMN search_vector tsvector;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_faqs_search ON faqs USING GIN(search_vector);

CREATE OR REPLACE FUNCTION faqs_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.question, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.summary, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.answer, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS faqs_search_update ON faqs;
CREATE TRIGGER faqs_search_update
  BEFORE INSERT OR UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION faqs_search_trigger();

-- FAQs updated_at 트리거
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- FAQs RLS 설정
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published FAQs" ON faqs;
CREATE POLICY "Anyone can view published FAQs"
  ON faqs FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage FAQs" ON faqs;
CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated');

-- FAQs 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_faq_views(faq_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE faqs SET views = views + 1 WHERE slug = faq_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -------------------------------------------
-- 2.4 Instagram Posts 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  post_type TEXT CHECK (post_type IN ('릴스', '일상', '성공사례', '칼럼', '일반', '홍보')),
  caption TEXT,
  thumbnail_url TEXT,
  images TEXT[],
  author TEXT NOT NULL DEFAULT 'theyool_official',
  author_profile_url TEXT,
  linked_case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  linked_blog_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Instagram Posts 인덱스
CREATE INDEX IF NOT EXISTS idx_instagram_slug ON instagram_posts(slug);
CREATE INDEX IF NOT EXISTS idx_instagram_published ON instagram_posts(published);
CREATE INDEX IF NOT EXISTS idx_instagram_post_type ON instagram_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_instagram_published_at ON instagram_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_views ON instagram_posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_likes ON instagram_posts(likes DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_linked_case ON instagram_posts(linked_case_id);
CREATE INDEX IF NOT EXISTS idx_instagram_linked_blog ON instagram_posts(linked_blog_id);

-- Instagram Posts updated_at 트리거
DROP TRIGGER IF EXISTS update_instagram_updated_at ON instagram_posts;
CREATE TRIGGER update_instagram_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Instagram Posts RLS 설정
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view published instagram posts" ON instagram_posts;
CREATE POLICY "Anyone can view published instagram posts"
  ON instagram_posts FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Authenticated users can manage instagram posts" ON instagram_posts;
CREATE POLICY "Authenticated users can manage instagram posts"
  ON instagram_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- Instagram Posts 조회수/좋아요 증가 함수
CREATE OR REPLACE FUNCTION increment_instagram_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_instagram_likes(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts SET likes = likes + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- STEP 3: 의뢰인 후기 시스템 (Testimonials)
-- ================================================

-- -------------------------------------------
-- 3.1 Testimonial Cases (후기 케이스) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS testimonial_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  highlight_text TEXT NOT NULL,
  case_result_amount BIGINT,
  client_initial TEXT NOT NULL,
  client_role TEXT,
  client_age_group TEXT,
  full_story TEXT,
  story_before TEXT,
  story_journey TEXT,
  story_after TEXT,
  case_date TEXT NOT NULL,
  case_duration TEXT,
  attorney_name TEXT,
  attorney_id UUID,
  verified BOOLEAN DEFAULT false,
  consent_given BOOLEAN DEFAULT false,
  consent_date TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Testimonial Cases 인덱스
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_category ON testimonial_cases(category);
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_published ON testimonial_cases(published);
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_featured ON testimonial_cases(featured);
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_display_order ON testimonial_cases(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_created_at ON testimonial_cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonial_cases_published_order ON testimonial_cases(published, display_order ASC)
  WHERE published = true AND consent_given = true;

-- Testimonial Cases 전문 검색
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonial_cases' AND column_name = 'search_vector'
  ) THEN
    ALTER TABLE testimonial_cases ADD COLUMN search_vector tsvector;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_testimonial_cases_search ON testimonial_cases USING GIN(search_vector);

CREATE OR REPLACE FUNCTION testimonial_cases_search_trigger() RETURNS trigger AS $$
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

DROP TRIGGER IF EXISTS testimonial_cases_search_update ON testimonial_cases;
CREATE TRIGGER testimonial_cases_search_update
  BEFORE INSERT OR UPDATE ON testimonial_cases
  FOR EACH ROW EXECUTE FUNCTION testimonial_cases_search_trigger();

-- Testimonial Cases updated_at 트리거
DROP TRIGGER IF EXISTS update_testimonial_cases_updated_at ON testimonial_cases;
CREATE TRIGGER update_testimonial_cases_updated_at
  BEFORE UPDATE ON testimonial_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Testimonial Cases RLS 설정
ALTER TABLE testimonial_cases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published cases" ON testimonial_cases;
CREATE POLICY "Public can view published cases"
  ON testimonial_cases FOR SELECT
  USING (published = true AND consent_given = true);

DROP POLICY IF EXISTS "Admins can manage cases" ON testimonial_cases;
CREATE POLICY "Admins can manage cases"
  ON testimonial_cases FOR ALL
  USING (auth.role() = 'authenticated');

-- -------------------------------------------
-- 3.2 Testimonial Evidence Photos (증빙 사진) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS testimonial_evidence_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID NOT NULL REFERENCES testimonial_cases(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL CHECK (evidence_type IN ('kakao', 'sms', 'naver', 'letter', 'other')),
  photo_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  caption TEXT,
  original_date TIMESTAMP WITH TIME ZONE,
  file_size INTEGER,
  file_type TEXT,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  blur_applied BOOLEAN DEFAULT true,
  verified_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- Evidence Photos 인덱스
CREATE INDEX IF NOT EXISTS idx_evidence_photos_case ON testimonial_evidence_photos(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_photos_type ON testimonial_evidence_photos(evidence_type);
CREATE INDEX IF NOT EXISTS idx_evidence_photos_order ON testimonial_evidence_photos(case_id, display_order ASC);

-- Evidence Photos updated_at 트리거
DROP TRIGGER IF EXISTS update_evidence_photos_updated_at ON testimonial_evidence_photos;
CREATE TRIGGER update_evidence_photos_updated_at
  BEFORE UPDATE ON testimonial_evidence_photos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Evidence Photos RLS 설정
ALTER TABLE testimonial_evidence_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view evidence for published cases" ON testimonial_evidence_photos;
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

DROP POLICY IF EXISTS "Admins can manage evidence" ON testimonial_evidence_photos;
CREATE POLICY "Admins can manage evidence"
  ON testimonial_evidence_photos FOR ALL
  USING (auth.role() = 'authenticated');

-- Testimonial 유틸리티 함수들
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
-- STEP 4: 상담 예약 시스템 (Bookings & Blocked Times)
-- ================================================

-- -------------------------------------------
-- 4.1 Bookings (상담 예약) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('visit', 'video')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  office_location TEXT CHECK (office_location IN ('천안', '평택')),
  video_link TEXT,
  admin_notes TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Bookings 인덱스
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(type);
CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON bookings(preferred_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status_date ON bookings(status, preferred_date);

-- Bookings updated_at 함수 (커스텀)
CREATE OR REPLACE FUNCTION handle_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Bookings updated_at 트리거
DROP TRIGGER IF EXISTS set_bookings_updated_at ON bookings;
CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION handle_bookings_updated_at();

-- Bookings RLS 설정
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public to create bookings" ON bookings;
CREATE POLICY "Allow public to create bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin to read all bookings" ON bookings;
CREATE POLICY "Allow admin to read all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow admin to update bookings" ON bookings;
CREATE POLICY "Allow admin to update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin to delete bookings" ON bookings;
CREATE POLICY "Allow admin to delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- -------------------------------------------
-- 4.2 Blocked Times (휴무일/시간 차단) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS blocked_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_type TEXT NOT NULL CHECK (block_type IN ('date', 'time_slot')),
  blocked_date DATE,
  blocked_time_start TEXT,
  blocked_time_end TEXT,
  office_location TEXT CHECK (office_location IN ('천안', '평택') OR office_location IS NULL),
  reason TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_date_block CHECK (
    (block_type = 'date' AND blocked_date IS NOT NULL) OR
    (block_type = 'time_slot' AND blocked_date IS NOT NULL AND blocked_time_start IS NOT NULL AND blocked_time_end IS NOT NULL)
  )
);

-- Blocked Times 인덱스
CREATE INDEX IF NOT EXISTS idx_blocked_times_date ON blocked_times(blocked_date);
CREATE INDEX IF NOT EXISTS idx_blocked_times_type ON blocked_times(block_type);
CREATE INDEX IF NOT EXISTS idx_blocked_times_office ON blocked_times(office_location);

-- Blocked Times updated_at 트리거
DROP TRIGGER IF EXISTS blocked_times_updated_at ON blocked_times;
CREATE TRIGGER blocked_times_updated_at
  BEFORE UPDATE ON blocked_times
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Blocked Times RLS 설정
ALTER TABLE blocked_times ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view blocked times" ON blocked_times;
CREATE POLICY "Public can view blocked times"
  ON blocked_times FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can view blocked times" ON blocked_times;
CREATE POLICY "Authenticated users can view blocked times"
  ON blocked_times FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create blocked times" ON blocked_times;
CREATE POLICY "Authenticated users can create blocked times"
  ON blocked_times FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update blocked times" ON blocked_times;
CREATE POLICY "Authenticated users can update blocked times"
  ON blocked_times FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete blocked times" ON blocked_times;
CREATE POLICY "Authenticated users can delete blocked times"
  ON blocked_times FOR DELETE
  TO authenticated
  USING (true);

-- ================================================
-- STEP 5: 상담 신청 시스템 (Consultations)
-- ================================================

-- -------------------------------------------
-- 5.1 Consultations (상담 신청) 테이블
-- -------------------------------------------
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultations 인덱스
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_category ON consultations(category);

-- Consultations updated_at 트리거
DROP TRIGGER IF EXISTS consultations_updated_at ON consultations;
CREATE TRIGGER consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Consultations RLS 설정
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create consultations" ON consultations;
CREATE POLICY "Anyone can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authenticated users can view consultations" ON consultations;
CREATE POLICY "Only authenticated users can view consultations"
  ON consultations FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Only authenticated users can update consultations" ON consultations;
CREATE POLICY "Only authenticated users can update consultations"
  ON consultations FOR UPDATE
  USING (auth.role() = 'authenticated');

-- ================================================
-- STEP 6: 주석 및 문서화
-- ================================================

COMMENT ON TABLE cases IS '성공사례 테이블';
COMMENT ON TABLE blog_posts IS '변호사 칼럼 테이블';
COMMENT ON TABLE faqs IS '이혼큐레이션(Q&A) 테이블';
COMMENT ON TABLE instagram_posts IS 'Instagram 게시물 테이블';
COMMENT ON TABLE testimonial_cases IS '의뢰인 후기 케이스 - 증빙 중심 신뢰 구축 시스템';
COMMENT ON TABLE testimonial_evidence_photos IS '후기 증빙 사진 - 카톡, 문자, 네이버 리뷰, 편지 등';
COMMENT ON TABLE bookings IS '방문/화상 상담 예약 테이블';
COMMENT ON TABLE blocked_times IS '휴무일/시간 차단 테이블';
COMMENT ON TABLE consultations IS '상담 신청 테이블';

COMMENT ON COLUMN testimonial_cases.highlight_text IS '카드에 표시될 짧은 텍스트 (예: 위자료 2억 승소)';
COMMENT ON COLUMN testimonial_cases.consent_given IS '[CRITICAL] 게시 동의 필수';
COMMENT ON COLUMN testimonial_evidence_photos.evidence_type IS 'kakao, sms, naver, letter, other';
COMMENT ON COLUMN testimonial_evidence_photos.blur_applied IS '[CRITICAL] 개인정보 블러 처리 확인';
COMMENT ON COLUMN bookings.type IS 'Type of consultation: visit or video';
COMMENT ON COLUMN bookings.office_location IS 'Office location for visit consultations (천안 or 평택)';

-- ================================================
-- 완료 메시지
-- ================================================

DO $$
BEGIN
  RAISE NOTICE '✅ 법무법인 더율 데이터베이스 설정 완료!';
  RAISE NOTICE '   - 총 9개 테이블 생성';
  RAISE NOTICE '   - 모든 인덱스, 트리거, RLS 정책 설정 완료';
  RAISE NOTICE '   - 전문 검색(Full Text Search) 활성화';
  RAISE NOTICE '';
  RAISE NOTICE '📋 생성된 테이블 목록:';
  RAISE NOTICE '   1. cases (성공사례)';
  RAISE NOTICE '   2. blog_posts (변호사 칼럼)';
  RAISE NOTICE '   3. faqs (이혼큐레이션)';
  RAISE NOTICE '   4. instagram_posts (Instagram)';
  RAISE NOTICE '   5. testimonial_cases (의뢰인 후기)';
  RAISE NOTICE '   6. testimonial_evidence_photos (증빙 사진)';
  RAISE NOTICE '   7. bookings (상담 예약)';
  RAISE NOTICE '   8. blocked_times (휴무일/시간)';
  RAISE NOTICE '   9. consultations (상담 신청)';
  RAISE NOTICE '';
  RAISE NOTICE '🔍 다음 명령으로 테이블 확인:';
  RAISE NOTICE '   SELECT table_name FROM information_schema.tables WHERE table_schema = ''public'';';
END $$;
