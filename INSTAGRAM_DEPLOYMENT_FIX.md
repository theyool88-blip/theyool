# Instagram 페이지 배포 환경 문제 해결 가이드

## 문제 증상
배포 환경에서 `/insta-theyool` 페이지에 접속하면 Instagram 데이터가 표시되지 않고, fallback 콘텐츠(랜덤 게시물)가 표시됨.

## 원인 분석

### 1. 데이터 흐름
```
/insta-theyool (page.tsx)
  └─> /insta-story.html (iframe)
      └─> fetch('/api/instagram')
          └─> Supabase query (published=true)
```

### 2. 가능한 원인들

#### A. 환경 변수 누락 (가장 가능성 높음) ⚠️
`/app/api/instagram/route.ts`는 다음 환경 변수를 필요로 합니다:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (중요!)

만약 이 환경 변수들이 배포 환경에 설정되지 않았다면, API는 빈 배열 `{ posts: [] }`를 반환합니다.

#### B. published 필드
API는 `published = true`인 게시물만 반환합니다. 데이터베이스에서 일부 게시물의 `published` 필드가 `false`일 수 있습니다.

#### C. RLS (Row Level Security)
`SUPABASE_SERVICE_ROLE_KEY`가 누락되면 ANON KEY로 fallback되어, RLS 정책에 의해 데이터 접근이 차단될 수 있습니다.

## 해결 방법

### Step 1: 배포 환경 변수 확인 (필수)

배포 플랫폼(Vercel, Netlify, 또는 기타)의 환경 변수 설정에서 다음을 확인하세요:

#### Vercel
```bash
# Project Settings > Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # ⚠️ 중요!
```

**주의사항:**
- 환경 변수 추가 후 **반드시 재배포** 필요
- `SUPABASE_SERVICE_ROLE_KEY`는 절대 클라이언트 코드에 노출되면 안 됨 (서버 전용)
- 모든 환경(Production, Preview, Development)에 동일하게 설정

### Step 2: Supabase에서 데이터 확인

Supabase Dashboard > SQL Editor에서 다음 쿼리를 실행하세요:

```sql
-- 전체 게시물 수와 published 상태 확인
SELECT
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE published = false) as unpublished_posts
FROM instagram_posts;

-- 개별 게시물 상태 확인
SELECT id, title, post_type, published, created_at
FROM instagram_posts
ORDER BY created_at DESC;
```

만약 `published = false`인 게시물이 있다면:
```sql
-- 모든 게시물을 published로 변경
UPDATE instagram_posts SET published = true;
```

### Step 3: RLS 정책 확인 및 수정

Supabase Dashboard > Authentication > Policies에서 `instagram_posts` 테이블 확인:

```sql
-- RLS 상태 확인
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'instagram_posts';

-- Public 읽기 정책 추가 (없는 경우)
DROP POLICY IF EXISTS "Allow public read access to published instagram posts" ON instagram_posts;

CREATE POLICY "Allow public read access to published instagram posts"
ON instagram_posts
FOR SELECT
USING (published = true);
```

### Step 4: 배포 환경 로그 확인

배포 후 실시간 로그를 확인하세요:

#### Vercel
```bash
vercel logs [deployment-url]
```

다음과 같은 로그를 찾으세요:
- ✅ `[Instagram API] Successfully fetched 12 posts` - 정상 작동
- ⚠️ `[Instagram API] Missing environment variables` - 환경 변수 누락
- ⚠️ `[Instagram API] Database error` - 데이터베이스 연결 문제
- ⚠️ `[Instagram API] No published posts found` - published=true인 게시물 없음

### Step 5: API 응답 직접 테스트

배포 URL에서 API를 직접 호출해보세요:

```bash
# Production
curl https://your-domain.com/api/instagram | jq '.'

# Debug 엔드포인트
curl https://your-domain.com/api/instagram/debug | jq '.'
```

**예상 응답:**
```json
{
  "posts": [
    {
      "id": "...",
      "title": "법무법인 더율",
      "type": "일상",
      "thumbnail": "https://...",
      "images": [...],
      "caption": "...",
      ...
    }
  ]
}
```

**문제 있는 응답:**
```json
{
  "posts": [],
  "error": "Missing environment variables"
}
```

## 개선 사항 (이미 적용됨)

### API 로깅 강화
`/app/api/instagram/route.ts`에 다음 로깅이 추가되었습니다:
- 환경 변수 누락 경고
- 데이터베이스 에러 상세 로깅
- 게시물 수 로깅
- 에러 응답에 error 필드 포함

### 테스트 체크리스트

배포 후 다음을 확인하세요:

- [ ] 환경 변수가 모든 환경(Production/Preview)에 설정되어 있음
- [ ] `SUPABASE_SERVICE_ROLE_KEY`가 올바르게 설정됨
- [ ] Supabase에서 `published = true`인 게시물이 12개 존재
- [ ] RLS 정책이 public 읽기를 허용함
- [ ] `/api/instagram` 엔드포인트가 데이터를 반환함
- [ ] `/insta-theyool` 페이지에서 실제 게시물이 표시됨
- [ ] 배포 로그에 에러가 없음

## 추가 디버깅

만약 위 단계를 모두 수행했는데도 문제가 지속된다면:

### 1. 브라우저 콘솔 확인
Chrome DevTools > Console에서 다음을 확인:
```javascript
// Network 탭에서 /api/instagram 요청 확인
// Response가 빈 배열인지, 실제 데이터인지 확인
```

### 2. Supabase 직접 연결 테스트
```javascript
// 브라우저 콘솔에서 실행
const response = await fetch('https://kqqyipnlkmmprfgygauk.supabase.co/rest/v1/instagram_posts?published=eq.true&select=*', {
  headers: {
    'apikey': 'YOUR_ANON_KEY',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  }
});
const data = await response.json();
console.log(data);
```

### 3. 캐시 문제
Next.js는 API 응답을 캐시할 수 있습니다. 다음을 시도하세요:
- 브라우저 캐시 클리어 (Hard Refresh: Ctrl+Shift+R)
- Vercel에서 "Redeploy" 실행
- `cache: 'no-store'` 옵션 확인 (이미 insta-story.html에 적용됨)

## 연락처
문제가 지속되면 다음 정보와 함께 개발팀에 문의하세요:
1. 배포 플랫폼 이름 (Vercel/Netlify/etc)
2. 배포 URL
3. `/api/instagram` 응답 내용
4. 배포 로그 스크린샷
5. 브라우저 콘솔 에러 메시지
