# 법무법인 더율 - 구현 가이드

이 문서는 claude.md의 전체 구조를 기반으로 실제 구현 시 참고할 단계별 가이드입니다.

---

## 🚀 시작하기

### 1단계: Supabase 프로젝트 설정

1. **Supabase 프로젝트 생성**
   - https://supabase.com 접속
   - New Project 생성
   - 프로젝트 이름: `theyool` or `lawfirm-theyool`
   - Region: Northeast Asia (Seoul) 또는 Singapore
   - Database Password 설정 (안전하게 보관)

2. **환경 변수 저장**
   - Project Settings → API
   - Project URL 복사
   - Project API keys 복사 (anon, service_role)
   - `.env.local` 파일에 저장

3. **데이터베이스 테이블 생성**
   - SQL Editor 열기
   - `claude.md`의 스키마 SQL 복사
   - 순서대로 실행:
     1. cases 테이블
     2. blog_posts 테이블
     3. consultations 테이블
     4. admin_profiles 테이블 (선택)
     5. RLS 정책

4. **Storage 버킷 생성**
   - Storage → New Bucket
   - 버킷 생성:
     - `case-images` (Public)
     - `blog-images` (Public)
     - `team-photos` (Public)
   - Storage Policies 설정

5. **초기 관리자 계정 생성**
   - Authentication → Add user
   - Email/Password 입력
   - User created! 확인

---

## 2단계: Supabase 클라이언트 설정

### 패키지 설치
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 파일 생성 순서

#### 1. `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 2. `lib/supabase/client.ts`
클라이언트 컴포넌트용 Supabase 클라이언트

#### 3. `lib/supabase/server.ts`
서버 컴포넌트 & API Routes용 Supabase 클라이언트

#### 4. `lib/supabase/middleware.ts`
인증 미들웨어

#### 5. `middleware.ts` (루트)
Next.js 미들웨어로 관리자 페이지 보호

---

## 3단계: TypeScript 타입 정의

### 생성할 파일:
- `types/database.ts` - Supabase DB 타입
- `types/case.ts` - Case 인터페이스
- `types/blog.ts` - BlogPost 인터페이스
- `types/user.ts` - User 관련 타입

### 자동 타입 생성 (권장)
```bash
npx supabase gen types typescript --project-id your-project-id > types/database.ts
```

---

## 4단계: 기본 UI 컴포넌트 생성

재사용 가능한 UI 컴포넌트를 먼저 만들면 나중에 빠르게 개발 가능

### 우선순위:
1. `components/ui/Button.tsx`
2. `components/ui/Input.tsx`
3. `components/ui/Textarea.tsx`
4. `components/ui/Select.tsx`
5. `components/ui/Card.tsx`
6. `components/ui/Modal.tsx`
7. `components/ui/Loading.tsx`

---

## 5단계: 관리자 로그인 구현

### 구현 순서:
1. `app/admin/login/page.tsx` - 로그인 페이지
2. `app/api/auth/login/route.ts` - 로그인 API
3. `app/api/auth/logout/route.ts` - 로그아웃 API
4. `lib/auth/session.ts` - 세션 관리 유틸리티
5. 테스트: 로그인 → 대시보드 리다이렉트

---

## 6단계: 관리자 레이아웃 & 대시보드

### 구현 순서:
1. `components/layout/AdminHeader.tsx`
2. `components/layout/AdminSidebar.tsx`
3. `app/admin/layout.tsx` - 인증 체크 + 레이아웃
4. `app/admin/page.tsx` - 대시보드 (통계)

### 대시보드 통계:
- 총 성공사례 수
- 총 칼럼 수
- 총 상담 신청 수
- 최근 작성된 항목 5개

---

## 7단계: 성공사례 CRUD

### 구현 순서:

#### 1. API Routes
- `app/api/cases/route.ts` (GET list, POST create)
- `app/api/cases/[id]/route.ts` (GET, PUT, DELETE)

#### 2. 관리자 페이지
- `app/admin/cases/page.tsx` - 목록
- `app/admin/cases/new/page.tsx` - 생성
- `app/admin/cases/[id]/page.tsx` - 수정

#### 3. 공개 페이지
- `app/cases/page.tsx` - 목록 (필터링)
- `app/cases/[id]/page.tsx` - 상세

#### 4. 컴포넌트
- `components/features/CaseCard.tsx`
- `components/features/CaseFilter.tsx`
- `components/features/CaseForm.tsx` (관리자용)

---

## 8단계: 이미지 업로드

### 구현:
1. `app/api/upload/route.ts` - 업로드 API
2. `components/ui/ImageUploader.tsx` - 업로드 UI
3. CaseForm에 이미지 업로더 통합

### 로직:
1. 파일 선택
2. 미리보기 표시
3. Supabase Storage에 업로드
4. Public URL 받아서 DB에 저장

---

## 9단계: 칼럼 CRUD (성공사례와 유사)

### 구현 순서:

#### 1. Rich Text Editor 선택 & 통합
- TipTap (추천) or Quill or Markdown
- `components/features/RichTextEditor.tsx`

#### 2. API Routes
- `app/api/blog/route.ts`
- `app/api/blog/[id]/route.ts`

#### 3. 관리자 페이지
- `app/admin/blog/page.tsx` - 목록
- `app/admin/blog/new/page.tsx` - 생성 (에디터 포함)
- `app/admin/blog/[id]/page.tsx` - 수정

#### 4. 공개 페이지
- `app/blog/page.tsx` - 목록
- `app/blog/[slug]/page.tsx` - 상세

---

## 10단계: 추가 공개 페이지

### The Plan 페이지
- `app/the-plan/page.tsx`
- 정적 콘텐츠 (CMS 불필요)

### 구성원 소개
- `app/team/page.tsx`
- 데이터: `data/team.ts` (정적) or Supabase 테이블

### 오시는길
- `app/contact/page.tsx`
- Kakao Map or Google Maps API
- 상담 신청 폼 포함

---

## 11단계: 상담 신청 기능

### 구현:
1. `components/features/ConsultationForm.tsx`
2. `app/api/consultations/route.ts` (POST)
3. `app/admin/consultations/page.tsx` (목록 조회)
4. 이메일 발송 (선택, Resend or SendGrid)

---

## 12단계: 최적화 & 배포 준비

### SEO
- 각 페이지 metadata 설정
- sitemap.xml 생성
- robots.txt 설정

### 성능
- 이미지 최적화 (Next.js Image)
- Lazy loading
- Code splitting

### 보안
- CSRF 보호
- Rate limiting
- Input sanitization
- HTTPS 필수

### 배포
- Vercel (추천) or Netlify
- 환경 변수 설정
- 도메인 연결

---

## 📋 체크리스트

### Phase 1
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 생성
- [ ] Storage 버킷 생성
- [ ] 초기 관리자 계정 생성
- [ ] Supabase 클라이언트 설정
- [ ] 타입 정의
- [ ] 미들웨어 설정

### Phase 2
- [ ] 로그인 페이지
- [ ] 관리자 레이아웃
- [ ] 대시보드
- [ ] 성공사례 CRUD (관리자)
- [ ] 성공사례 페이지 (공개)

### Phase 3
- [ ] 이미지 업로드
- [ ] Rich Text Editor 통합
- [ ] 칼럼 CRUD (관리자)
- [ ] 칼럼 페이지 (공개)

### Phase 4
- [ ] The Plan 페이지
- [ ] 구성원 소개 페이지
- [ ] 오시는길 페이지
- [ ] 상담 신청 폼
- [ ] 상담 내역 관리

### Phase 5
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] 보안 강화
- [ ] 최종 QA
- [ ] 배포

---

## 🆘 트러블슈팅

### Supabase 연결 안될 때
- 환경 변수 확인
- Project URL 올바른지 확인
- Anon key vs Service role key 구분

### RLS 정책 문제
- `authenticated` role 확인
- Policy 조건 재확인
- Supabase Dashboard에서 직접 쿼리 테스트

### 이미지 업로드 실패
- Storage Bucket이 Public인지 확인
- Storage Policy 설정 확인
- 파일 크기 제한 확인

---

## 📚 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase + Next.js 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

**작성일**: 2025-11-05
