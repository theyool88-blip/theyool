-- Instagram 게시물 테이블 생성
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE, -- Notion 페이지 ID (중복 방지용)
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('성공사례', '칼럼', '일반', '홍보')),
  linked_case_id TEXT, -- 연결된 성공사례 Notion ID
  linked_blog_id TEXT, -- 연결된 칼럼 Notion ID
  thumbnail TEXT, -- 첫 번째 이미지 (호환성)
  images TEXT[], -- 모든 이미지 배열
  caption TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  post_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_instagram_published ON instagram_posts(published);
CREATE INDEX IF NOT EXISTS idx_instagram_type ON instagram_posts(type);
CREATE INDEX IF NOT EXISTS idx_instagram_post_date ON instagram_posts(post_date DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_views ON instagram_posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_likes ON instagram_posts(likes DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_notion_id ON instagram_posts(notion_id);

-- RLS (Row Level Security) 정책
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- 누구나 공개된 게시물 조회 가능
CREATE POLICY "Anyone can view published instagram posts"
  ON instagram_posts FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 작업 가능
CREATE POLICY "Authenticated users can manage instagram posts"
  ON instagram_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- 조회수 증가 함수
CREATE OR REPLACE FUNCTION increment_instagram_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 좋아요 증가 함수
CREATE OR REPLACE FUNCTION increment_instagram_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts
  SET likes = likes + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_instagram_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER instagram_updated_at
  BEFORE UPDATE ON instagram_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_instagram_updated_at();
