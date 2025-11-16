-- Cases (성공사례) 테이블 생성
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

-- 인덱스 생성
CREATE INDEX idx_cases_category ON cases(category);
CREATE INDEX idx_cases_published ON cases(published);
CREATE INDEX idx_cases_slug ON cases(slug);
CREATE INDEX idx_cases_sort_order ON cases(sort_order);
CREATE INDEX idx_cases_views ON cases(views DESC);

-- 전문 검색 (Full Text Search)
ALTER TABLE cases ADD COLUMN search_vector tsvector;

CREATE INDEX idx_cases_search ON cases USING GIN(search_vector);

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

CREATE TRIGGER cases_search_update
  BEFORE INSERT OR UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION cases_search_trigger();

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 설정
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- 누구나 공개된 사례 조회 가능
CREATE POLICY "Anyone can view published cases"
  ON cases FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 사례 관리 가능
CREATE POLICY "Authenticated users can manage cases"
  ON cases FOR ALL
  USING (auth.role() = 'authenticated');

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_case_views(case_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE cases SET views = views + 1 WHERE slug = case_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
