-- FAQ 테이블 생성
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_published ON faqs(published);
CREATE INDEX idx_faqs_featured ON faqs(featured) WHERE featured = true;
CREATE INDEX idx_faqs_slug ON faqs(slug);
CREATE INDEX idx_faqs_sort_order ON faqs(sort_order);

-- 전문 검색 (Full Text Search)
ALTER TABLE faqs ADD COLUMN search_vector tsvector;

CREATE INDEX idx_faqs_search ON faqs USING GIN(search_vector);

CREATE OR REPLACE FUNCTION faqs_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', COALESCE(NEW.question, '')), 'A') ||
    setweight(to_tsvector('simple', COALESCE(NEW.summary, '')), 'B') ||
    setweight(to_tsvector('simple', COALESCE(NEW.answer, '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER faqs_search_update
  BEFORE INSERT OR UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION faqs_search_trigger();

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 설정
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- 누구나 공개된 FAQ 조회 가능
CREATE POLICY "Anyone can view published FAQs"
  ON faqs FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 FAQ 관리 가능
CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated');

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_faq_views(faq_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE faqs SET views = views + 1 WHERE slug = faq_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
