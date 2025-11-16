-- Instagram 게시물 테이블 생성
CREATE TABLE IF NOT EXISTS instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  post_type TEXT CHECK (post_type IN ('성공사례', '칼럼', '일반', '홍보')),
  caption TEXT,
  thumbnail_url TEXT,
  images TEXT[],

  -- 연결된 원본 (Cases 또는 Blog)
  linked_case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  linked_blog_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,

  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- 인덱스 생성
CREATE INDEX idx_instagram_slug ON instagram_posts(slug);
CREATE INDEX idx_instagram_published ON instagram_posts(published);
CREATE INDEX idx_instagram_post_type ON instagram_posts(post_type);
CREATE INDEX idx_instagram_published_at ON instagram_posts(published_at DESC);
CREATE INDEX idx_instagram_views ON instagram_posts(views DESC);
CREATE INDEX idx_instagram_likes ON instagram_posts(likes DESC);
CREATE INDEX idx_instagram_linked_case ON instagram_posts(linked_case_id);
CREATE INDEX idx_instagram_linked_blog ON instagram_posts(linked_blog_id);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_instagram_updated_at BEFORE UPDATE ON instagram_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 설정
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- 누구나 공개된 게시물 조회 가능
CREATE POLICY "Anyone can view published instagram posts"
  ON instagram_posts FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 게시물 관리 가능
CREATE POLICY "Authenticated users can manage instagram posts"
  ON instagram_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- 조회수/좋아요 증가 함수
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
