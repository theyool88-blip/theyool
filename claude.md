# 법무법인 더율 웹사이트 개발 계획

## 프로젝트 개요
- **프로젝트명**: 법무법인 더율 공식 웹사이트
- **목적**: 이혼 전문 법률 서비스 제공 및 의뢰인 상담 유도
- **기술 스택**: Next.js 16.0.1, React 19, TypeScript, Tailwind CSS
- **디자인 참고**: Toss (https://toss.im), Da-si (https://da-si.com)

---

## 현재 완료 상황

### ✅ 홈페이지 (/)
- [x] 히어로 섹션 ("이겨놓고 설계하다" - 더 플랜 소개)
- [x] 전문성 강조 섹션 ("정말 이혼에 집중하나요?")
- [x] 서비스 섹션 (위자료, 재산분할, 양육권, 상간사건)
- [x] 이혼후 조력 섹션
- [x] 투명한 소통 섹션
- [x] 수임료 공개 섹션
- [x] 의뢰인 후기 섹션
- [x] CTA 섹션
- [x] Footer
- [x] 헤더 (로고, 네비게이션)
- [x] 스크롤 애니메이션
- [x] 모바일 최적화

**Note**: 홈페이지는 지속적으로 수정 예정

---

## 추가 개발 필요 페이지

### 1. The Plan 페이지 (/the-plan)
**목적**: 법무법인 더율의 핵심 승소전략 'The Plan' 상세 소개

**필요 섹션**:
- The Plan 소개 (철학, 차별점)
- 단계별 전략 프로세스
- 성공 사례 하이라이트
- CTA

**우선순위**: ⭐⭐⭐ HIGH

---

### 2. 성공사례 페이지 (/cases) - 게시판 형태
**목적**: 실제 승소 사례를 통한 전문성 입증

**필요 섹션**:
- 사례 카테고리 필터 (위자료, 재산분할, 양육권, 상간사건)
- 검색 기능 (제목, 내용 검색)
- 정렬 옵션 (최신순, 조회수순)
- 사례 카드 그리드 레이아웃
- 각 사례 상세 페이지 (배경, 전략, 결과)
- 페이지네이션 (1페이지당 9~12개)
- 조회수 표시
- 관련 사례 추천

**게시판 기능**:
- 목록 조회 (필터링, 검색, 정렬)
- 상세 조회 (조회수 증가)
- 이전글/다음글 네비게이션
- 목록으로 돌아가기

**우선순위**: ⭐⭐⭐ HIGH

---

### 3. 구성원소개 페이지 (/team)
**목적**: 변호사 및 법무팀 소개를 통한 신뢰도 구축

**필요 섹션**:
- 대표 변호사 프로필 (사진, 학력, 경력, 전문 분야)
- 소속 변호사 프로필
- 팀 철학 및 비전
- CTA

**우선순위**: ⭐⭐ MEDIUM

---

### 4. 변호사칼럼 페이지 (/blog) - 게시판 형태
**목적**: 법률 정보 제공 및 SEO 최적화

**필요 섹션**:
- 칼럼 목록 (카드 레이아웃 또는 리스트)
- 카테고리 필터 (이혼절차, 재산분할, 양육권, 위자료 등)
- 태그 필터
- 검색 기능 (제목, 내용, 태그)
- 정렬 옵션 (최신순, 조회수순, 인기순)
- 칼럼 상세 페이지 (/blog/[slug])
- 페이지네이션 또는 무한 스크롤
- 조회수 표시
- 관련 칼럼 추천
- 공유 기능 (카카오톡, 페이스북, 링크 복사)

**게시판 기능**:
- 목록 조회 (필터링, 검색, 정렬)
- 상세 조회 (조회수 증가, 조회 기록)
- 이전글/다음글 네비게이션
- 추천 칼럼 (같은 카테고리/태그)
- 목록으로 돌아가기

**기술 요구사항**:
- Rich Text Editor (TipTap/Quill)
- 태그/카테고리 시스템
- 공유 기능
- 조회수 카운팅 (중복 방지)

**우선순위**: ⭐⭐ MEDIUM

---

### 5. 오시는길 페이지 (/contact)
**목적**: 오프라인 방문 및 연락 정보 제공

**필요 섹션**:
- 지도 (Google Maps 또는 Kakao Map API)
- 주소 및 상세 위치 안내
- 대중교통 이용 안내
- 주차 안내
- 연락처 정보 (전화, 이메일, 팩스)
- 운영 시간
- 상담 신청 폼

**기술 요구사항**:
- 지도 API 연동
- 폼 제출 처리 (이메일 발송 또는 DB 저장)

**우선순위**: ⭐⭐⭐ HIGH

---

## 관리자 시스템 (/admin)

### 필요성
관리자가 직접 로그인하여 **성공사례**와 **변호사칼럼**을 작성/수정/삭제할 수 있는 CMS 기능 필요

### 관리자 페이지 구조

#### 1. 로그인 페이지 (/admin/login)
- 이메일/비밀번호 인증
- 세션 관리
- 보안 (CSRF, rate limiting)

#### 2. 대시보드 (/admin)
- 최근 작성된 게시물 요약
- 통계 (총 사례 수, 칼럼 수, 상담 신청 수)
- 빠른 작업 링크

#### 3. 성공사례 관리 (/admin/cases)
- **목록 페이지**: 모든 사례 조회, 검색, 필터링
- **작성 페이지**: 새 사례 작성
  - 제목, 카테고리, 배경, 전략, 결과
  - 아이콘/이미지 업로드
  - 미리보기 기능
- **수정 페이지**: 기존 사례 수정
- **삭제 기능**: 확인 후 삭제

#### 4. 칼럼 관리 (/admin/blog)
- **목록 페이지**: 모든 칼럼 조회, 검색, 필터링
- **작성 페이지**: 새 칼럼 작성
  - 제목, 카테고리, 태그
  - Rich Text Editor (Markdown 또는 WYSIWYG)
  - 썸네일 이미지 업로드
  - 임시저장 기능
  - 발행/비공개 상태 관리
- **수정 페이지**: 기존 칼럼 수정
- **삭제 기능**: 확인 후 삭제

#### 5. (선택) 상담 신청 관리 (/admin/consultations)
- 접수된 상담 신청 조회
- 처리 상태 관리 (대기/진행중/완료)
- 메모 기능

### 기술 스택 옵션

#### Option A: Firebase (추천 - 빠른 구현)
```
인증: Firebase Authentication
데이터베이스: Firestore
파일 저장소: Firebase Storage
장점: 간단한 설정, 무료 티어, 실시간 동기화
단점: Vendor lock-in, 복잡한 쿼리 제한
```

#### Option B: Supabase (추천 - 오픈소스)
```
인증: Supabase Auth
데이터베이스: PostgreSQL (Supabase)
파일 저장소: Supabase Storage
장점: PostgreSQL, REST/GraphQL API, 오픈소스
단점: 상대적으로 새로운 플랫폼
```

#### Option C: NextAuth + Prisma (완전 제어)
```
인증: NextAuth.js
데이터베이스: PostgreSQL + Prisma ORM
파일 저장소: AWS S3 또는 Cloudinary
장점: 완전한 제어, 확장성
단점: 설정 복잡도, 운영 부담
```

#### Option D: 간단한 JWT (초기 개발용)
```
인증: 간단한 JWT + bcrypt
데이터베이스: JSON 파일 또는 SQLite
파일 저장소: public 폴더
장점: 빠른 프로토타입
단점: 프로덕션 부적합, 확장성 제한
```

**추천 선택**: Option A (Firebase) 또는 Option B (Supabase)

### 데이터 모델

#### Cases (성공사례)
```typescript
interface Case {
  id: string;
  title: string;
  category: 'alimony' | 'property' | 'custody' | 'adultery';
  badge: string; // "Case 01", "Case 02"
  background: string; // 사건 배경
  strategy: string; // 전략
  result: string; // 결과
  icon: string; // emoji or image URL
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### BlogPost (칼럼)
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown
  category: string;
  tags: string[];
  thumbnailUrl?: string;
  author: string;
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Admin User
```typescript
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: Date;
}
```

### 보안 고려사항
- [ ] 관리자 페이지 접근 제한 (미들웨어)
- [ ] CSRF 토큰
- [ ] Rate limiting (로그인 시도)
- [ ] XSS 방지 (입력 sanitization)
- [ ] SQL Injection 방지 (ORM 사용)
- [ ] 파일 업로드 검증 (타입, 크기 제한)
- [ ] HTTPS 필수

### 추가 기능
- [ ] 이미지 업로드 및 관리
- [ ] Rich Text Editor (TipTap, Quill, 또는 Markdown)
- [ ] 임시저장 기능
- [ ] 발행 예약 기능
- [ ] 작성자별 권한 관리
- [ ] 활동 로그

---

## 공통 개발 요소

### 네비게이션 구조
```
홈 (/)
The Plan (/the-plan)
서비스 (드롭다운)
  ├─ 위자료 (/services/alimony)
  ├─ 재산분할 (/services/property)
  ├─ 양육권 (/services/custody)
  └─ 상간사건 (/services/adultery)
성공사례 (/cases)
변호사칼럼 (/blog)
구성원소개 (/team)
오시는길 (/contact)
상담문의 (모든 페이지 공통 버튼)
```

### Footer 링크
```
회사소개
개인정보처리방침 (/privacy)
이용약관 (/terms)
FAQ (/faq)
상담 프로세스 (/process)
이혼 절차 가이드 (/guide)
수임료 안내 (/fees)
```

### 모바일 네비게이션
- [ ] 햄버거 메뉴 구현
- [ ] 모바일 메뉴 애니메이션
- [ ] 터치 제스처 최적화

### SEO 최적화
- [ ] 각 페이지별 메타 태그
- [ ] Open Graph 태그
- [ ] Structured Data (JSON-LD)
- [ ] sitemap.xml
- [ ] robots.txt

### 성능 최적화
- [ ] 이미지 최적화 (Next.js Image)
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Font optimization

### 추가 기능
- [ ] **상담문의 폼** (모든 페이지 공통, 고정 버튼)
- [ ] 공유하기 기능 (칼럼)
- [ ] 스크롤 상단 이동 버튼
- [ ] 모바일 네비게이션 (햄버거 메뉴)

---

## 개발 우선순위

### Phase 1 (즉시 - 1주)
1. **상담문의 폼** (단일 루트, 모든 페이지 공통)
2. **FAQ 페이지** (/faq)
3. **개인정보처리방침** (/privacy)
4. **이용약관** (/terms)
5. 오시는길 페이지 (/contact)
6. 모바일 네비게이션
7. Supabase 설정 (DB + 상담 신청 저장)

### Phase 2 (중요 - 2주)
1. The Plan 페이지 (/the-plan)
2. **서비스 상세 페이지 4개**
   - /services/alimony (위자료)
   - /services/property (재산분할)
   - /services/custody (양육권)
   - /services/adultery (상간사건)
3. **상담 프로세스 안내** (/process)
4. **이혼 절차 가이드** (/guide)
5. **수임료 안내** (/fees)
6. 성공사례 페이지 (공개) (/cases)
7. 구성원소개 (/team)

### Phase 3 (관리자 시스템 - 3주)
1. **관리자 로그인**
2. **관리자 대시보드**
3. **상담 신청 관리**
4. **성공사례 CRUD**
5. **칼럼 CRUD**
6. 이미지 업로드
7. Rich Text Editor

### Phase 4 (완성 - 4주+)
1. 상담 신청 내역 관리
2. 분석 도구 연동 (Google Analytics)
3. 성능 최적화
4. 최종 QA 및 배포

---

## 필요한 외부 리소스

### 콘텐츠
- [ ] The Plan 상세 설명 텍스트
- [ ] 구성원 프로필 (사진, 학력, 경력)
- [ ] 추가 성공사례 데이터
- [ ] 칼럼 콘텐츠
- [ ] 오시는길 정보 (주소, 교통편)

### 디자인 에셋
- [ ] 로고 최종본 ✅ (완료)
- [ ] 변호사 프로필 사진
- [ ] 사무실 사진
- [ ] 아이콘 세트

### API & 서비스
- [ ] 지도 API 키 (Kakao Maps 또는 Google Maps)
- [ ] 이메일 발송 서비스 (폼 제출용)
- [ ] 호스팅 환경 결정
- [ ] 도메인 설정
- [ ] **데이터베이스 선택 (Firebase/Supabase/PostgreSQL)**
- [ ] **인증 시스템 설정**
- [ ] **파일 저장소 (이미지 업로드용)**

---

## 서브에이전트 계획

### 1. Page Builder Agent (`/build-page`)
- **역할**: 새 페이지 생성 및 기본 레이아웃 구축
- **담당**: The Plan, 성공사례, 구성원소개, 칼럼, 오시는길 페이지

### 2. Component Builder Agent (`/build-component`)
- **역할**: 재사용 가능한 컴포넌트 생성
- **담당**: 폼, 카드, 모바일 메뉴, CTA 버튼 등

### 3. SEO Optimizer Agent (`/optimize-seo`)
- **역할**: SEO 설정 및 최적화
- **담당**: 메타 태그, 구조화 데이터, sitemap 생성

### 4. Content Integration Agent (`/manage-content`)
- **역할**: 콘텐츠 데이터 구조화 및 연동
- **담당**: 칼럼 시스템, 사례 데이터 관리

### 5. Admin Builder Agent (`/build-admin`)
- **역할**: 관리자 페이지 및 CMS 기능 구축
- **담당**: 로그인, 대시보드, CRUD 인터페이스, 인증 미들웨어

---

## 다음 단계

1. ✅ claude.md 문서 생성
2. ✅ 서브에이전트 생성
3. **데이터베이스/인증 시스템 선택 결정** ⬅️ 진행 필요
4. Phase 1 페이지 개발 시작
5. 관리자 시스템 구축
6. 필요한 콘텐츠 및 리소스 요청

---

## 핵심 기술 결정사항

### ✅ 확정된 선택
1. **데이터베이스**: ✅ Supabase (PostgreSQL + Auth + Storage)
2. **파일 저장소**: ✅ Supabase Storage
3. **인증**: ✅ Supabase Auth

### 🟡 추후 결정
4. Rich Text Editor: TipTap / Quill / Markdown?
5. 지도 API: Kakao Maps / Google Maps?
6. 관리자 초기 계정 정보

---

## 프로젝트 전체 구조

### 폴더 구조
```
theyool/
├── app/
│   ├── (public)/              # 공개 페이지 그룹
│   │   ├── page.tsx           # 홈페이지
│   │   ├── the-plan/
│   │   │   └── page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx       # 성공사례 목록
│   │   │   └── [id]/
│   │   │       └── page.tsx   # 사례 상세
│   │   ├── team/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx       # 칼럼 목록
│   │   │   └── [slug]/
│   │   │       └── page.tsx   # 칼럼 상세
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── admin/                 # 관리자 페이지
│   │   ├── layout.tsx         # 관리자 레이아웃
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx           # 대시보드
│   │   ├── cases/
│   │   │   ├── page.tsx       # 사례 관리 목록
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── blog/
│   │       ├── page.tsx       # 칼럼 관리 목록
│   │       ├── new/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   │
│   ├── api/                   # API Routes
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── logout/route.ts
│   │   ├── cases/
│   │   │   ├── route.ts       # GET (list), POST (create)
│   │   │   └── [id]/
│   │   │       └── route.ts   # GET, PUT, DELETE
│   │   ├── blog/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── upload/
│   │       └── route.ts       # 파일 업로드
│   │
│   ├── layout.tsx             # 루트 레이아웃
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # 공개 사이트 헤더
│   │   ├── Footer.tsx
│   │   ├── AdminHeader.tsx    # 관리자 헤더
│   │   └── AdminSidebar.tsx
│   │
│   ├── ui/                    # 재사용 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   │
│   ├── features/              # 기능별 컴포넌트
│   │   ├── CaseCard.tsx
│   │   ├── CaseFilter.tsx
│   │   ├── BlogCard.tsx
│   │   ├── BlogFilter.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ConsultationForm.tsx
│   │   └── RichTextEditor.tsx
│   │
│   └── ScrollReveal.tsx
│
├── lib/                       # 유틸리티 & 설정
│   ├── supabase/
│   │   ├── client.ts          # 클라이언트용 Supabase
│   │   ├── server.ts          # 서버용 Supabase
│   │   └── middleware.ts      # 인증 미들웨어
│   │
│   ├── auth/
│   │   ├── session.ts         # 세션 관리
│   │   └── protect.ts         # 라우트 보호
│   │
│   ├── utils/
│   │   ├── slugify.ts
│   │   ├── validation.ts
│   │   └── formatDate.ts
│   │
│   └── constants.ts
│
├── types/                     # TypeScript 타입 정의
│   ├── case.ts
│   ├── blog.ts
│   ├── user.ts
│   └── database.ts
│
├── data/                      # 정적 데이터 (필요시)
│   └── team.ts
│
├── public/
│   └── images/
│       ├── logo-horizontal.png
│       └── ...
│
├── middleware.ts              # Next.js 미들웨어
├── .env.local                 # 환경 변수
└── supabase/
    ├── migrations/            # DB 마이그레이션
    └── seed.sql               # 초기 데이터
```

---

## Supabase 데이터베이스 스키마

### 1. cases (성공사례)
```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('alimony', 'property', 'custody', 'adultery')),
  badge TEXT, -- "Case 01", "Case 02"
  background TEXT NOT NULL,
  strategy TEXT NOT NULL,
  result TEXT NOT NULL,
  icon TEXT, -- emoji or URL
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0, -- 조회수
  sort_order INTEGER, -- 순서 (관리자가 직접 설정)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_cases_category ON cases(category);
CREATE INDEX idx_cases_published ON cases(published);
CREATE INDEX idx_cases_sort_order ON cases(sort_order);
CREATE INDEX idx_cases_views ON cases(views DESC); -- 조회수 정렬용
CREATE INDEX idx_cases_created_at ON cases(created_at DESC); -- 최신순 정렬용

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
```

### 2. blog_posts (칼럼)
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[], -- PostgreSQL array
  thumbnail_url TEXT,
  author TEXT DEFAULT '법무법인 더율',
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false, -- 추천글
  views INTEGER DEFAULT 0, -- 조회수
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- 인덱스
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_views ON blog_posts(views DESC); -- 조회수 정렬용
CREATE INDEX idx_blog_created_at ON blog_posts(created_at DESC); -- 최신순
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC); -- 발행일순
CREATE INDEX idx_blog_featured ON blog_posts(featured) WHERE featured = true;

-- 전문 검색 (Full Text Search)
ALTER TABLE blog_posts ADD COLUMN search_vector tsvector;

CREATE INDEX idx_blog_search ON blog_posts USING GIN(search_vector);

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

CREATE TRIGGER blog_search_update
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION blog_search_trigger();
```

### 3. consultations (상담 신청)
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT, -- 상담 종류
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
```

### 4. admin_users (관리자)
```sql
-- Supabase Auth를 사용하므로 별도 테이블 불필요
-- auth.users 테이블에서 관리
-- 추가 프로필 정보가 필요하면:

CREATE TABLE admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS) 정책
```sql
-- cases: 공개된 것만 일반 사용자가 조회
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published cases"
  ON cases FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage cases"
  ON cases FOR ALL
  USING (auth.role() = 'authenticated');

-- blog_posts: 공개된 것만 일반 사용자가 조회
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

-- consultations: 인증된 사용자만 접근
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can view consultations"
  ON consultations FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);
```

---

## Supabase Storage 구조

```
Buckets:
├── case-images/           # 성공사례 이미지
│   └── [case-id]/
│       └── image.jpg
│
├── blog-images/           # 칼럼 썸네일 & 본문 이미지
│   └── [post-slug]/
│       ├── thumbnail.jpg
│       └── content-*.jpg
│
└── team-photos/           # 구성원 사진
    └── [member-id].jpg
```

**Storage 정책**:
```sql
-- 누구나 읽기 가능, 인증된 사용자만 업로드
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('case-images', 'blog-images', 'team-photos'));

CREATE POLICY "Authenticated users can upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('case-images', 'blog-images', 'team-photos')
    AND auth.role() = 'authenticated');
```

---

## API Routes 설계

### 인증 관련
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/session` - 세션 확인

### 성공사례 관련 (게시판)
- `GET /api/cases` - 목록 조회
  - Query params: `category`, `search`, `sort` (latest/views), `page`, `limit`
- `GET /api/cases/[id]` - 단일 조회 (조회수 증가)
- `POST /api/cases` - 생성 (인증 필요)
- `PUT /api/cases/[id]` - 수정 (인증 필요)
- `DELETE /api/cases/[id]` - 삭제 (인증 필요)
- `GET /api/cases/[id]/related` - 관련 사례 추천 (같은 카테고리)

### 칼럼 관련 (게시판)
- `GET /api/blog` - 목록 조회
  - Query params: `category`, `tags`, `search`, `sort` (latest/views/published), `page`, `limit`, `featured`
- `GET /api/blog/[slug]` - 단일 조회 (조회수 증가)
- `POST /api/blog` - 생성 (인증 필요)
- `PUT /api/blog/[id]` - 수정 (인증 필요)
- `DELETE /api/blog/[id]` - 삭제 (인증 필요)
- `GET /api/blog/[slug]/related` - 관련 칼럼 추천 (같은 카테고리/태그)
- `GET /api/blog/featured` - 추천 칼럼만 조회

### 상담 신청
- `POST /api/consultations` - 상담 신청
- `GET /api/consultations` - 목록 조회 (인증 필요)
- `PUT /api/consultations/[id]` - 상태 업데이트 (인증 필요)

### 파일 업로드
- `POST /api/upload` - 이미지 업로드 (인증 필요)

---

## 환경 변수 (.env.local)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 지도 API (추후)
NEXT_PUBLIC_KAKAO_MAP_KEY=
# or
NEXT_PUBLIC_GOOGLE_MAPS_KEY=

# 이메일 발송 (추후)
SENDGRID_API_KEY=
# or
RESEND_API_KEY=
```

---

## 구현 순서

### Step 1: Supabase 설정 (Phase 1)
1. Supabase 프로젝트 생성
2. 데이터베이스 스키마 생성
3. Storage 버킷 생성
4. RLS 정책 설정
5. 초기 관리자 계정 생성

### Step 2: 기본 구조 (Phase 1)
1. Supabase 클라이언트 설정 (lib/supabase/)
2. 타입 정의 (types/)
3. 인증 유틸리티 (lib/auth/)
4. 미들웨어 설정

### Step 3: 관리자 시스템 (Phase 2)
1. 로그인 페이지
2. 관리자 레이아웃
3. 대시보드
4. 성공사례 CRUD
5. 칼럼 CRUD (Phase 3)

### Step 4: 공개 페이지 (Phase 1-3)
1. The Plan 페이지
2. 오시는길 페이지
3. 성공사례 목록/상세
4. 칼럼 목록/상세
5. 구성원 소개

### Step 5: 추가 기능 (Phase 3-4)
1. 이미지 업로드
2. Rich Text Editor
3. 상담 신청 폼
4. 상담 내역 관리

---

**마지막 업데이트**: 2025-11-05
