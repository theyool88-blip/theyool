# Instagram 페이지 배포 문제 조사 및 해결 방안

## 문제 증상
배포 환경에서 `/insta-theyool` 페이지 접속 시 Instagram 데이터가 표시되지 않고 fallback 콘텐츠가 표시됨.

## 조사 결과

### 1. 페이지 구조 분석
```
/insta-theyool/page.tsx (Client Component)
  └─> <iframe src="/insta-story.html" />
      └─> JavaScript: loadNotionInstagramFeed()
          └─> fetch('/api/instagram', { cache: 'no-store' })
              └─> Supabase: SELECT * FROM instagram_posts WHERE published=true
```

### 2. 개발 환경 테스트
- ✅ `/api/instagram` 정상 작동 (12개 게시물 반환)
- ✅ `/api/instagram/debug` 정상 작동
- ✅ Supabase 연결 정상
- ✅ 모든 게시물 `published=true` 상태

### 3. 배포 환경에서 발생 가능한 문제

#### 문제 A: 환경 변수 누락 (가장 가능성 높음)
**원인:**
- `/app/api/instagram/route.ts`는 `SUPABASE_SERVICE_ROLE_KEY` 필요
- 환경 변수 없으면 `hasValidEnvironment()` 함수가 false 반환
- API가 빈 배열 `{ posts: [] }` 반환

**증상:**
```javascript
// insta-story.html의 loadNotionInstagramFeed() 함수
const posts = Array.isArray(data.posts) ? data.posts : [];
if (!posts.length) {
    generateRandomFeed(); // ← 랜덤 게시물 15개 생성
}
```

**해결:**
배포 플랫폼에 다음 환경 변수 설정 필요:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # ⚠️ 필수!
```

#### 문제 B: RLS (Row Level Security) 정책
**원인:**
- `SUPABASE_SERVICE_ROLE_KEY` 누락 시 ANON KEY로 fallback
- RLS 정책이 public 읽기를 차단할 수 있음

**해결:**
Supabase에서 다음 SQL 실행:
```sql
CREATE POLICY "Allow public read access to published instagram posts"
ON instagram_posts
FOR SELECT
USING (published = true);
```

#### 문제 C: published 필드
**원인:**
- 일부 게시물의 `published` 필드가 `false`일 수 있음
- API는 `published=true`만 반환

**확인:**
```sql
SELECT COUNT(*) FILTER (WHERE published = true) as published_count
FROM instagram_posts;
```

## 적용한 개선 사항

### 1. API 로깅 강화 (`/app/api/instagram/route.ts`)
```typescript
// Before
if (!hasValidEnvironment()) {
  return NextResponse.json({ posts: [] });
}

// After
if (!hasValidEnvironment()) {
  console.warn('[Instagram API] Missing environment variables...');
  return NextResponse.json({
    posts: [],
    error: 'Missing environment variables'
  });
}
```

추가된 로깅:
- 환경 변수 누락 경고
- 데이터베이스 에러 상세 메시지
- 게시물 수 로깅 (`Successfully fetched X posts`)
- 에러 응답에 `error` 필드 포함

### 2. 생성한 문서 및 스크립트

#### `/INSTAGRAM_DEPLOYMENT_FIX.md`
배포 환경 문제 해결을 위한 상세 가이드:
- 환경 변수 설정 방법 (Vercel, Netlify)
- Supabase 데이터 확인 방법
- RLS 정책 설정
- 로그 확인 방법
- API 직접 테스트 방법
- 디버깅 체크리스트

#### `/FIX_INSTAGRAM_RLS.sql`
Supabase에서 실행할 SQL 스크립트:
- RLS 상태 확인
- Public 읽기 정책 추가
- 게시물 published 상태 확인

#### `/scripts/check-instagram-deployment.js`
자동 진단 스크립트:
```bash
node scripts/check-instagram-deployment.js https://your-domain.com
```

검사 항목:
- 로컬 환경 변수 확인
- API 엔드포인트 응답 확인
- 게시물 데이터 확인
- Debug API 테스트

## 즉시 실행 가능한 해결 단계

### Step 1: 환경 변수 확인 (5분)
배포 플랫폼(Vercel 등)에서 환경 변수 확인 및 설정:
1. `NEXT_PUBLIC_SUPABASE_URL` ✓
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✓
3. `SUPABASE_SERVICE_ROLE_KEY` ← 이것이 누락되었을 가능성 높음

### Step 2: 재배포 (2분)
환경 변수 추가 후 반드시 재배포 필요

### Step 3: 로그 확인 (3분)
배포 후 실시간 로그에서 다음 확인:
- ✅ `[Instagram API] Successfully fetched 12 posts`
- ❌ `[Instagram API] Missing environment variables`

### Step 4: API 직접 테스트 (1분)
```bash
curl https://your-domain.com/api/instagram | jq '.posts | length'
```
- 예상 결과: `12`
- 문제 있는 결과: `0` 또는 error 메시지

### Step 5: 페이지 확인
`https://your-domain.com/insta-theyool` 접속하여 실제 게시물 확인

## 진단 도구 사용법

### 로컬에서 진단
```bash
# 개발 서버 실행
npm run dev

# 진단 스크립트 실행
node scripts/check-instagram-deployment.js http://localhost:3000
```

### 배포 환경 진단
```bash
node scripts/check-instagram-deployment.js https://your-domain.com
```

## 예상 결과

### 문제 해결 전
```
❌ SUPABASE_SERVICE_ROLE_KEY 누락
❌ API 에러: Missing environment variables
⚠️  게시물이 0개입니다
```

### 문제 해결 후
```
✅ NEXT_PUBLIC_SUPABASE_URL 설정됨
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY 설정됨
✅ SUPABASE_SERVICE_ROLE_KEY 설정됨
✅ API 응답 성공 (200 OK)
✅ 12개의 게시물 로드 성공
🎉 모든 검사 통과! Instagram 페이지가 정상 작동합니다.
```

## 관련 파일

### 수정된 파일
- `/app/api/instagram/route.ts` - 로깅 강화

### 새로 생성된 파일
- `/INSTAGRAM_DEPLOYMENT_FIX.md` - 상세 해결 가이드
- `/FIX_INSTAGRAM_RLS.sql` - RLS 정책 SQL
- `/scripts/check-instagram-deployment.js` - 자동 진단 스크립트
- `/INSTAGRAM_ISSUE_SUMMARY.md` - 본 문서

### 확인이 필요한 파일
- `/public/insta-story.html` - API 호출 및 fallback 로직
- `/app/insta-theyool/page.tsx` - 페이지 컴포넌트

## 추가 참고 사항

### 데이터 확인
개발 환경에서 확인된 Instagram 게시물:
- 총 12개
- 일상: 7개
- 성공사례: 2개
- 릴스: 3개
- 모두 `published=true` 상태

### 환경 변수 보안
- `SUPABASE_SERVICE_ROLE_KEY`는 절대 클라이언트에 노출하면 안 됨
- 서버 사이드 API 라우트에서만 사용
- `.env.local`에 저장하고 `.gitignore`에 포함

### 캐싱
- API 라우트: `export const revalidate = 0` (캐싱 비활성화)
- fetch 호출: `cache: 'no-store'` (캐싱 비활성화)
- 브라우저: Hard Refresh (Ctrl+Shift+R) 권장

## 결론

배포 환경에서 Instagram 데이터가 표시되지 않는 가장 큰 원인은 **환경 변수 누락**, 특히 `SUPABASE_SERVICE_ROLE_KEY`가 설정되지 않았을 가능성이 높습니다.

환경 변수 설정 후 재배포하면 문제가 해결될 것으로 예상됩니다.

---

**작성일**: 2025-11-17
**작성자**: Claude Code
**관련 이슈**: Instagram 페이지 배포 환경 데이터 로드 실패
