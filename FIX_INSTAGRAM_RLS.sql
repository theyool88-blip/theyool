-- Instagram Posts 테이블 RLS 정책 확인 및 수정
-- 배포 환경에서 Instagram 데이터가 표시되지 않는 문제 해결

-- 1. 현재 RLS 상태 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'instagram_posts';

-- 2. 기존 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'instagram_posts';

-- 3. RLS가 활성화되어 있다면, public 읽기 정책 추가
-- (Service Role Key를 사용하므로 RLS를 우회하지만, 만약을 위해 추가)

-- published=true인 게시물에 대한 public 읽기 허용
DROP POLICY IF EXISTS "Allow public read access to published instagram posts" ON instagram_posts;

CREATE POLICY "Allow public read access to published instagram posts"
ON instagram_posts
FOR SELECT
USING (published = true);

-- 4. 모든 게시물이 published=true인지 확인
SELECT id, title, post_type, published, created_at
FROM instagram_posts
ORDER BY created_at DESC;

-- 5. published=false인 게시물이 있다면 true로 업데이트 (선택사항)
-- UPDATE instagram_posts SET published = true WHERE published = false;

-- 6. 정책 적용 후 테스트 쿼리
SELECT COUNT(*) as total_posts,
       COUNT(*) FILTER (WHERE published = true) as published_posts
FROM instagram_posts;
