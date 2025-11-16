-- Instagram posts에 slug 컬럼 추가 및 스키마 정리
-- 1. slug 컬럼 추가
ALTER TABLE instagram_posts ADD COLUMN IF NOT EXISTS slug TEXT;

-- 2. post_type 컬럼명 표준화 (type -> post_type)
ALTER TABLE instagram_posts RENAME COLUMN type TO post_type;

-- 3. thumbnail_url 컬럼명 표준화 (thumbnail -> thumbnail_url)
ALTER TABLE instagram_posts RENAME COLUMN thumbnail TO thumbnail_url;

-- 4. published_at 컬럼 추가
ALTER TABLE instagram_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- 5. linked_case_id와 linked_blog_id를 UUID로 변경하고 Foreign Key 추가
-- 먼저 기존 컬럼 삭제 (TEXT 타입이었음)
ALTER TABLE instagram_posts DROP COLUMN IF EXISTS linked_case_id;
ALTER TABLE instagram_posts DROP COLUMN IF EXISTS linked_blog_id;

-- UUID 타입으로 재생성
ALTER TABLE instagram_posts ADD COLUMN linked_case_id UUID REFERENCES cases(id) ON DELETE SET NULL;
ALTER TABLE instagram_posts ADD COLUMN linked_blog_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL;

-- 6. slug에 UNIQUE 제약조건 추가 (나중에 데이터 채운 후)
-- ALTER TABLE instagram_posts ADD CONSTRAINT instagram_posts_slug_unique UNIQUE (slug);

-- 7. 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_instagram_slug ON instagram_posts(slug);
CREATE INDEX IF NOT EXISTS idx_instagram_published_at ON instagram_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_instagram_linked_case ON instagram_posts(linked_case_id);
CREATE INDEX IF NOT EXISTS idx_instagram_linked_blog ON instagram_posts(linked_blog_id);

-- 8. post_type CHECK 제약조건 업데이트
ALTER TABLE instagram_posts DROP CONSTRAINT IF EXISTS instagram_posts_type_check;
ALTER TABLE instagram_posts DROP CONSTRAINT IF EXISTS instagram_posts_post_type_check;
ALTER TABLE instagram_posts ADD CONSTRAINT instagram_posts_post_type_check
  CHECK (post_type IN ('릴스', '일상', '성공사례', '칼럼', '일반', '홍보'));

-- 9. RPC 함수 업데이트 (slug 기반으로)
DROP FUNCTION IF EXISTS increment_instagram_views(UUID);
DROP FUNCTION IF EXISTS increment_instagram_likes(UUID);

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
