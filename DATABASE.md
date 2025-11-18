# 법무법인 더율 - 데이터베이스 스키마 문서

**작성일**: 2025-11-16
**데이터베이스**: Supabase (PostgreSQL 15.x)
**마지막 업데이트**: 2025-11-16

---

## 📋 목차

1. [개요](#개요)
2. [전체 ERD](#전체-erd)
3. [테이블 상세](#테이블-상세)
4. [Storage Buckets](#storage-buckets)
5. [RPC Functions](#rpc-functions)
6. [보안 정책 (RLS)](#보안-정책-rls)
7. [인덱스 전략](#인덱스-전략)
8. [마이그레이션 히스토리](#마이그레이션-히스토리)
9. [주요 쿼리 패턴](#주요-쿼리-패턴)

---

## 개요

### 기본 정보
- **프로바이더**: Supabase
- **데이터베이스**: PostgreSQL 15.x
- **인증**: Supabase Auth (쿠키 기반 세션)
- **스토리지**: Supabase Storage (public buckets)
- **전문 검색**: PostgreSQL Full Text Search (tsvector)

### 테이블 요약
| 테이블명 | 레코드 수 (2025-11-15) | 용도 | 상태 |
|---------|----------------------|------|------|
| `consultations` | 0 | 상담 신청 관리 | 미사용 |
| `cases` | 21 | 성공사례 | 활성 |
| `blog_posts` | 18 | 변호사 칼럼 | 활성 |
| `faqs` | 76 | 이혼큐레이션(Q&A) | 활성 |
| `instagram_posts` | 12 | Instagram 콘텐츠 | 활성 |

---

## 전체 ERD

```
┌─────────────────┐
│  consultations  │
│─────────────────│
│ id (PK)         │
│ name            │
│ phone           │
│ email           │
│ category        │
│ message         │
│ status          │
│ admin_notes     │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐         ┌──────────────────┐
│      cases      │         │   blog_posts     │
│─────────────────│         │──────────────────│
│ id (PK)         │         │ id (PK)          │
│ notion_id (UQ)  │         │ notion_id (UQ)   │
│ slug (UQ)       │         │ slug (UQ)        │
│ title           │         │ title            │
│ category        │         │ category         │
│ badge           │         │ tags[]           │
│ background      │         │ excerpt          │
│ strategy        │         │ content          │
│ result          │         │ thumbnail_url    │
│ icon            │         │ author           │
│ image_url       │         │ published        │
│ published       │         │ featured         │
│ views           │         │ views            │
│ sort_order      │         │ published_at     │
│ search_vector   │         │ search_vector    │
│ created_at      │         │ created_at       │
│ updated_at      │         │ updated_at       │
└─────────────────┘         └──────────────────┘
        △                            △
        │                            │
        │  FK (ON DELETE SET NULL)   │
        │                            │
        └────────────┬───────────────┘
                     │
           ┌─────────────────────┐
           │  instagram_posts    │
           │─────────────────────│
           │ id (PK)             │
           │ notion_id (UQ)      │
           │ slug (UQ)           │
           │ title               │
           │ post_type           │
           │ caption             │
           │ thumbnail_url       │
           │ images[]            │
           │ linked_case_id (FK) │
           │ linked_blog_id (FK) │
           │ author              │
           │ author_profile_url  │
           │ published           │
           │ views               │
           │ likes               │
           │ published_at        │
           │ created_at          │
           │ updated_at          │
           └─────────────────────┘

┌─────────────────┐
│      faqs       │
│─────────────────│
│ id (PK)         │
│ question        │
│ slug (UQ)       │
│ category        │
│ summary         │
│ answer          │
│ featured        │
│ published       │
│ views           │
│ sort_order      │
│ search_vector   │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

---

## 테이블 상세

### 1. consultations (상담 신청)

**용도**: 웹사이트를 통한 고객 상담 신청 관리

#### 스키마
```sql
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,  -- 'alimony', 'property', 'custody', 'adultery', 'consultation', 'other'
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 컬럼 설명
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 고유 식별자 |
| name | TEXT | NOT NULL | 신청자 이름 |
| phone | TEXT | NOT NULL | 전화번호 |
| email | TEXT | NULLABLE | 이메일 (선택) |
| category | TEXT | NULLABLE | 상담 카테고리 |
| message | TEXT | NULLABLE | 상담 내용 |
| status | TEXT | DEFAULT 'pending', CHECK | 처리 상태 |
| admin_notes | TEXT | NULLABLE | 관리자 메모 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일시 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일시 |

#### 인덱스
```sql
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_consultations_category ON consultations(category);
```

#### 트리거
- `consultations_updated_at`: UPDATE 시 `updated_at` 자동 갱신

---

### 2. cases (성공사례)

**용도**: 법률 성공사례 콘텐츠 관리 (21개)

#### 스키마
```sql
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  categories TEXT[] NOT NULL, -- 배열: ["상간", "재산분할", "이혼"]
  badge TEXT,
  background TEXT,
  strategy TEXT,
  result TEXT,
  icon TEXT,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  sort_order INTEGER,
  search_vector TSVECTOR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 컬럼 설명
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 고유 식별자 |
| notion_id | TEXT | UNIQUE, NULLABLE | Notion 연동 ID |
| title | TEXT | NOT NULL | 사례 제목 |
| slug | TEXT | UNIQUE, NOT NULL | URL 슬러그 (SEO) |
| category | TEXT | NOT NULL | 카테고리 (alimony, property, custody, adultery) |
| badge | TEXT | NULLABLE | 배지 텍스트 (예: "승소", "합의") |
| background | TEXT | NULLABLE | 사건 배경 (Markdown) |
| strategy | TEXT | NULLABLE | 대응 전략 (Markdown) |
| result | TEXT | NULLABLE | 결과 (Markdown) |
| icon | TEXT | NULLABLE | 아이콘 식별자 |
| image_url | TEXT | NULLABLE | 대표 이미지 URL |
| published | BOOLEAN | DEFAULT true | 공개 여부 |
| views | INTEGER | DEFAULT 0 | 조회수 |
| sort_order | INTEGER | NULLABLE | 정렬 순서 (낮을수록 우선) |
| search_vector | TSVECTOR | - | 전문 검색용 벡터 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일시 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일시 |

#### 특수 기능
- **Markdown 메타데이터**: `background` 필드에 `<!--bg:IMAGE_URL-->` 형식으로 배경 이미지 저장
- **카테고리 매핑**:
  ```typescript
  categoryMap = {
    '위자료': 'alimony',
    '재산분할': 'property',
    '양육권': 'custody',
    '상간사건': 'adultery'
  }
  ```

#### 인덱스
```sql
CREATE INDEX idx_cases_category ON cases(category);
CREATE INDEX idx_cases_published ON cases(published);
CREATE INDEX idx_cases_slug ON cases(slug);
CREATE INDEX idx_cases_sort_order ON cases(sort_order);
CREATE INDEX idx_cases_views ON cases(views DESC);
CREATE INDEX idx_cases_search ON cases USING GIN(search_vector);
```

#### 트리거
- `cases_search_update`: INSERT/UPDATE 시 `search_vector` 자동 생성
- `update_cases_updated_at`: UPDATE 시 `updated_at` 자동 갱신

---

### 3. blog_posts (변호사 칼럼)

**용도**: 법률 칼럼 및 블로그 포스트 관리 (18개)

#### 스키마
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  categories TEXT[], -- 배열: ["양육권", "재산분할"]
  tags TEXT[],
  author TEXT DEFAULT '법무법인 더율',
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  search_vector TSVECTOR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 컬럼 설명
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 고유 식별자 |
| notion_id | TEXT | UNIQUE, NULLABLE | Notion 연동 ID |
| title | TEXT | NOT NULL | 칼럼 제목 |
| slug | TEXT | UNIQUE, NOT NULL | URL 슬러그 (SEO) |
| excerpt | TEXT | NULLABLE | 요약 (미리보기용) |
| content | TEXT | NOT NULL | 본문 (Markdown) |
| category | TEXT | NULLABLE | 카테고리 |
| tags | TEXT[] | DEFAULT '{}' | 태그 배열 |
| thumbnail_url | TEXT | NULLABLE | 썸네일 이미지 URL |
| author | TEXT | DEFAULT '법무법인 더율' | 작성자 |
| published | BOOLEAN | DEFAULT true | 공개 여부 |
| featured | BOOLEAN | DEFAULT false | 추천 칼럼 여부 |
| views | INTEGER | DEFAULT 0 | 조회수 |
| published_at | TIMESTAMPTZ | NULLABLE | 발행일시 |
| search_vector | TSVECTOR | - | 전문 검색용 벡터 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일시 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일시 |

#### 인덱스
```sql
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_blog_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_views ON blog_posts(views DESC);
CREATE INDEX idx_blog_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_blog_search ON blog_posts USING GIN(search_vector);
```

#### 트리거
- `blog_search_update`: INSERT/UPDATE 시 `search_vector` 자동 생성 (title, excerpt, content, tags)
- `update_blog_updated_at`: UPDATE 시 `updated_at` 자동 갱신

---

### 4. faqs (이혼큐레이션 Q&A)

**용도**: 자주 묻는 질문 및 법률 가이드 (76개)

#### 스키마
```sql
CREATE TABLE faqs (
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
  related_blog_posts TEXT[],  -- 2025-11-16: 관련 칼럼 참조 (slug 배열)
  related_cases TEXT[],        -- 2025-11-16: 관련 성공사례 참조 (slug 배열)
  search_vector TSVECTOR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 컬럼 설명
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 고유 식별자 |
| question | TEXT | NOT NULL | 질문 |
| slug | TEXT | UNIQUE, NOT NULL | URL 슬러그 (SEO) |
| category | TEXT | NOT NULL | 카테고리 (11개 카테고리) |
| summary | TEXT | NULLABLE | 요약 |
| answer | TEXT | NOT NULL | 답변 (Markdown) |
| featured | BOOLEAN | DEFAULT false | 추천 FAQ 여부 |
| published | BOOLEAN | DEFAULT true | 공개 여부 |
| views | INTEGER | DEFAULT 0 | 조회수 |
| sort_order | INTEGER | NULLABLE | 정렬 순서 |
| related_blog_posts | TEXT[] | NULLABLE | 관련 칼럼 참조 (blog_posts.slug 배열) |
| related_cases | TEXT[] | NULLABLE | 관련 성공사례 참조 (cases.slug 배열) |
| search_vector | TSVECTOR | - | 전문 검색용 벡터 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일시 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일시 |

#### 카테고리 목록 (11개)
1. 이혼절차
2. 위자료
3. 재산분할
4. 양육권
5. 양육비
6. 면접교섭
7. 협의이혼
8. 재판이혼
9. 국제이혼
10. 사실혼
11. 기타

#### 특수 기능 (2025-11-16 추가)
- **수동 큐레이션**: `related_blog_posts`, `related_cases` 배열에 slug 저장
- **Hybrid 매칭**: 수동 참조 우선, 없으면 카테고리 기반 자동 매칭 fallback
- **순서 보존**: 배열 순서 = 표시 순서 (관리자가 우선순위 지정 가능)

#### 인덱스
```sql
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_published ON faqs(published);
CREATE INDEX idx_faqs_featured ON faqs(featured) WHERE featured = true;
CREATE INDEX idx_faqs_slug ON faqs(slug);
CREATE INDEX idx_faqs_sort_order ON faqs(sort_order);
CREATE INDEX idx_faqs_search ON faqs USING GIN(search_vector);
CREATE INDEX idx_faqs_related_blog_posts ON faqs USING GIN(related_blog_posts);  -- 2025-11-16
CREATE INDEX idx_faqs_related_cases ON faqs USING GIN(related_cases);            -- 2025-11-16
```

#### 트리거
- `faqs_search_trigger`: INSERT/UPDATE 시 `search_vector` 자동 생성 (question, summary, answer)
- `update_faqs_updated_at`: UPDATE 시 `updated_at` 자동 갱신

---

### 5. instagram_posts (인스타더율)

**용도**: Instagram 콘텐츠 아카이빙 및 전시 (12개)

#### 스키마
```sql
CREATE TABLE instagram_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notion_id TEXT UNIQUE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  post_type TEXT CHECK (post_type IN ('릴스', '일상', '성공사례', '칼럼', '일반', '홍보')),
  caption TEXT,
  thumbnail_url TEXT,
  images TEXT[],
  linked_case_id UUID REFERENCES cases(id) ON DELETE SET NULL,
  linked_blog_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  author TEXT NOT NULL DEFAULT 'theyool_official',
  author_profile_url TEXT,
  published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 컬럼 설명
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | UUID | PK, DEFAULT uuid_generate_v4() | 고유 식별자 |
| notion_id | TEXT | UNIQUE, NULLABLE | Notion 연동 ID |
| title | TEXT | NOT NULL | 게시물 제목 |
| slug | TEXT | UNIQUE, NOT NULL | URL 슬러그 |
| post_type | TEXT | CHECK 제약조건 | 게시물 유형 |
| caption | TEXT | NULLABLE | 캡션/설명 |
| thumbnail_url | TEXT | NULLABLE | 썸네일 이미지 URL |
| images | TEXT[] | DEFAULT '{}' | 이미지 URL 배열 |
| linked_case_id | UUID | FK, ON DELETE SET NULL | 연결된 성공사례 ID |
| linked_blog_id | UUID | FK, ON DELETE SET NULL | 연결된 칼럼 ID |
| author | TEXT | DEFAULT 'theyool_official' | 작성자 표시명 |
| author_profile_url | TEXT | NULLABLE | 작성자 프로필 이미지 URL |
| published | BOOLEAN | DEFAULT true | 공개 여부 |
| views | INTEGER | DEFAULT 0 | 조회수 |
| likes | INTEGER | DEFAULT 0 | 좋아요 수 |
| published_at | TIMESTAMPTZ | NULLABLE | 발행일시 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일시 |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | 수정일시 |

#### 관계 (Foreign Keys)
```sql
-- 성공사례 연결
linked_case_id UUID REFERENCES cases(id) ON DELETE SET NULL

-- 칼럼 연결
linked_blog_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL
```

#### 인덱스
```sql
CREATE INDEX idx_instagram_slug ON instagram_posts(slug);
CREATE INDEX idx_instagram_published ON instagram_posts(published);
CREATE INDEX idx_instagram_post_type ON instagram_posts(post_type);
CREATE INDEX idx_instagram_published_at ON instagram_posts(published_at DESC);
CREATE INDEX idx_instagram_views ON instagram_posts(views DESC);
CREATE INDEX idx_instagram_likes ON instagram_posts(likes DESC);
CREATE INDEX idx_instagram_linked_case ON instagram_posts(linked_case_id);
CREATE INDEX idx_instagram_linked_blog ON instagram_posts(linked_blog_id);
```

#### 트리거
- `update_instagram_updated_at`: UPDATE 시 `updated_at` 자동 갱신

---

## Storage Buckets

### Supabase Storage 구조

#### 1. blog-images/
**용도**: 변호사 칼럼 이미지 저장
**공개 설정**: Public
**경로 구조**:
```
blog-images/
├── {timestamp}-{random}.{ext}
└── ...
```
**허용 파일 타입**: JPEG, PNG, GIF, WebP
**최대 파일 크기**: 10MB

#### 2. case-images/
**용도**: 성공사례 이미지 저장
**공개 설정**: Public
**경로 구조**:
```
case-images/
├── {timestamp}-{random}.{ext}
└── ...
```
**허용 파일 타입**: JPEG, PNG, GIF, WebP
**최대 파일 크기**: 10MB

#### 3. instagram-media/
**용도**: Instagram 게시물 이미지 및 비디오 저장
**공개 설정**: Public
**경로 구조**:
```
instagram-media/
├── {timestamp}-{random}.{ext}
└── ...
```
**허용 파일 타입**: JPEG, PNG, GIF, WebP, MP4, WebM, QuickTime
**최대 파일 크기**: 10MB

### 파일 업로드 API
**엔드포인트**: `/api/admin/upload`
**메서드**: POST, DELETE
**인증**: 쿠키 기반 세션 필수

**업로드 예시**:
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('bucket', 'blog-images');

const response = await fetch('/api/admin/upload', {
  method: 'POST',
  body: formData,
});

// 응답
{
  success: true,
  data: {
    fileName: "1731782400000-abc123.jpg",
    url: "https://kqqyipnlkmmprfgygauk.supabase.co/storage/v1/object/public/blog-images/1731782400000-abc123.jpg",
    type: "image",
    size: 2048576
  }
}
```

---

## RPC Functions

### 1. increment_case_views(case_slug TEXT)
**용도**: 성공사례 조회수 증가
**파라미터**: `case_slug` (TEXT)
**반환**: void
**보안**: SECURITY DEFINER

```sql
CREATE OR REPLACE FUNCTION increment_case_views(case_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE cases SET views = views + 1 WHERE slug = case_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 2. increment_blog_views(post_slug TEXT)
**용도**: 칼럼 조회수 증가
**파라미터**: `post_slug` (TEXT)
**반환**: void
**보안**: SECURITY DEFINER

```sql
CREATE OR REPLACE FUNCTION increment_blog_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. increment_faq_views(faq_slug TEXT)
**용도**: FAQ 조회수 증가
**파라미터**: `faq_slug` (TEXT)
**반환**: void
**보안**: SECURITY DEFINER

```sql
CREATE OR REPLACE FUNCTION increment_faq_views(faq_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE faqs SET views = views + 1 WHERE slug = faq_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 4. increment_instagram_views(post_slug TEXT)
**용도**: Instagram 게시물 조회수 증가
**파라미터**: `post_slug` (TEXT)
**반환**: void
**보안**: SECURITY DEFINER

```sql
CREATE OR REPLACE FUNCTION increment_instagram_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts SET views = views + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 5. increment_instagram_likes(post_slug TEXT)
**용도**: Instagram 게시물 좋아요 증가
**파라미터**: `post_slug` (TEXT)
**반환**: void
**보안**: SECURITY DEFINER

```sql
CREATE OR REPLACE FUNCTION increment_instagram_likes(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE instagram_posts SET likes = likes + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 보안 정책 (RLS)

### Row Level Security 개요
모든 테이블에 RLS 활성화: `ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;`

### 1. consultations
```sql
-- 누구나 상담 신청 가능 (INSERT)
CREATE POLICY "Anyone can create consultations"
  ON consultations FOR INSERT
  WITH CHECK (true);

-- 인증된 사용자만 조회 가능 (관리자)
CREATE POLICY "Only authenticated users can view consultations"
  ON consultations FOR SELECT
  USING (auth.role() = 'authenticated');

-- 인증된 사용자만 수정 가능 (관리자)
CREATE POLICY "Only authenticated users can update consultations"
  ON consultations FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### 2. cases
```sql
-- 누구나 공개된 사례 조회 가능
CREATE POLICY "Anyone can view published cases"
  ON cases FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 사례 관리 가능
CREATE POLICY "Authenticated users can manage cases"
  ON cases FOR ALL
  USING (auth.role() = 'authenticated');
```

### 3. blog_posts
```sql
-- 누구나 공개된 칼럼 조회 가능
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 칼럼 관리 가능
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');
```

### 4. faqs
```sql
-- 누구나 공개된 FAQ 조회 가능
CREATE POLICY "Anyone can view published FAQs"
  ON faqs FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 FAQ 관리 가능
CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated');
```

### 5. instagram_posts
```sql
-- 누구나 공개된 게시물 조회 가능
CREATE POLICY "Anyone can view published instagram posts"
  ON instagram_posts FOR SELECT
  USING (published = true);

-- 인증된 사용자는 모든 게시물 관리 가능
CREATE POLICY "Authenticated users can manage instagram posts"
  ON instagram_posts FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 인덱스 전략

### 1. Primary Key 인덱스
모든 테이블에 UUID 기반 Primary Key 자동 인덱스

### 2. Unique 인덱스
- `cases.notion_id`, `cases.slug`
- `blog_posts.notion_id`, `blog_posts.slug`
- `faqs.slug`
- `instagram_posts.notion_id`, `instagram_posts.slug`

### 3. 성능 최적화 인덱스

#### 정렬 최적화
```sql
-- 날짜 기반 정렬 (최신순)
CREATE INDEX idx_blog_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX idx_instagram_published_at ON instagram_posts(published_at DESC);

-- 조회수 정렬 (인기순)
CREATE INDEX idx_cases_views ON cases(views DESC);
CREATE INDEX idx_blog_views ON blog_posts(views DESC);
CREATE INDEX idx_instagram_views ON instagram_posts(views DESC);
CREATE INDEX idx_instagram_likes ON instagram_posts(likes DESC);

-- 커스텀 정렬 순서
CREATE INDEX idx_cases_sort_order ON cases(sort_order);
CREATE INDEX idx_faqs_sort_order ON faqs(sort_order);
```

#### 필터링 최적화
```sql
-- 공개 여부 필터
CREATE INDEX idx_cases_published ON cases(published);
CREATE INDEX idx_blog_published ON blog_posts(published);
CREATE INDEX idx_faqs_published ON faqs(published);
CREATE INDEX idx_instagram_published ON instagram_posts(published);

-- 카테고리 필터
CREATE INDEX idx_cases_category ON cases(category);
CREATE INDEX idx_blog_category ON blog_posts(category);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_instagram_post_type ON instagram_posts(post_type);
CREATE INDEX idx_consultations_category ON consultations(category);

-- 상태 필터
CREATE INDEX idx_consultations_status ON consultations(status);

-- Featured 콘텐츠 (Partial Index)
CREATE INDEX idx_blog_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX idx_faqs_featured ON faqs(featured) WHERE featured = true;
```

#### 전문 검색 (Full Text Search)
```sql
-- GIN 인덱스 (Generalized Inverted Index)
CREATE INDEX idx_cases_search ON cases USING GIN(search_vector);
CREATE INDEX idx_blog_search ON blog_posts USING GIN(search_vector);
CREATE INDEX idx_faqs_search ON faqs USING GIN(search_vector);

-- 배열 검색
CREATE INDEX idx_blog_tags ON blog_posts USING GIN(tags);
```

#### 외래키 최적화
```sql
CREATE INDEX idx_instagram_linked_case ON instagram_posts(linked_case_id);
CREATE INDEX idx_instagram_linked_blog ON instagram_posts(linked_blog_id);
```

---

## 마이그레이션 히스토리

### 적용된 마이그레이션

| 파일명 | 날짜 | 설명 |
|--------|------|------|
| `001_initial_schema.sql` | 2025-11-05 | 초기 스키마 (consultations 테이블) |
| `20251113_create_faq_table.sql` | 2025-11-13 | FAQs 테이블 생성 및 전문 검색 설정 |
| `20251114_create_blog_table.sql` | 2025-11-14 | Blog Posts 테이블 생성 |
| `20251114_create_cases_table.sql` | 2025-11-14 | Cases 테이블 생성 |
| `20251114_create_instagram_table.sql` | 2025-11-14 | Instagram Posts 테이블 생성 |
| `20251116_add_instagram_slug.sql` | 2025-11-16 | Instagram slug 추가 및 스키마 정리 |
| `20251116_add_instagram_author.sql` | 2025-11-16 | Instagram author 필드 추가 |
| `20251116_add_faq_references.sql` | 2025-11-16 | FAQs 참조 기능 (related_blog_posts, related_cases) |

### 마이그레이션 실행 방법

#### 1. Supabase Dashboard (권장)
1. Supabase Dashboard → SQL Editor
2. 마이그레이션 파일 내용 복사
3. "Run" 버튼 클릭

#### 2. Supabase CLI
```bash
# Supabase CLI 설치
npm install -g supabase

# 프로젝트 연결
supabase link --project-ref kqqyipnlkmmprfgygauk

# 마이그레이션 적용
supabase db push

# 마이그레이션 리셋 (주의: 모든 데이터 삭제)
supabase db reset
```

### 향후 마이그레이션 계획
- [ ] `cases` 테이블에 `metadata` JSON 컬럼 추가 (배경 이미지 메타데이터)
- [ ] `blog_posts`, `cases`에 `reading_time` INTEGER 컬럼 추가
- [ ] `consultations` 테이블 활성화 및 알림 시스템 연동
- [ ] `users` 테이블 추가 (관리자 권한 관리)

---

## 주요 쿼리 패턴

### 1. 성공사례 목록 조회 (공개, 정렬)
```typescript
const { data } = await supabase
  .from('cases')
  .select('*')
  .eq('published', true)
  .order('sort_order', { ascending: true, nullsLast: true })
  .order('created_at', { ascending: false });
```

### 2. 칼럼 목록 조회 (카테고리 필터, 최신순)
```typescript
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .eq('category', '재산분할')
  .order('published_at', { ascending: false, nullsLast: true })
  .order('created_at', { ascending: false });
```

### 3. FAQ 검색 (전문 검색)
```typescript
const { data } = await supabase
  .from('faqs')
  .select('*')
  .eq('published', true)
  .textSearch('search_vector', '위자료 청구')
  .limit(10);
```

### 4. 추천 칼럼 조회 (Featured)
```typescript
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .eq('featured', true)
  .order('published_at', { ascending: false })
  .limit(3);
```

### 5. Instagram 게시물 + 연결된 사례/칼럼 JOIN
```typescript
const { data } = await supabase
  .from('instagram_posts')
  .select(`
    *,
    linked_case:cases(id, title, slug),
    linked_blog:blog_posts(id, title, slug)
  `)
  .eq('published', true)
  .order('published_at', { ascending: false });
```

### 6. Slug 기반 상세 조회 (UUID 또는 slug)
```typescript
// UUID 또는 slug 모두 지원
const normalizedSlug = decodeURIComponent(slug);

const query = supabase
  .from('cases')
  .select('*')
  .eq('published', true);

if (isUuid(normalizedSlug)) {
  query.eq('id', normalizedSlug);
} else {
  query.or(`slug.eq.${normalizedSlug},notion_id.eq.${normalizedSlug}`);
}

const { data } = await query.maybeSingle();
```

### 7. 조회수 증가 (RPC 함수)
```typescript
// Client-side
await supabase.rpc('increment_case_views', { case_slug: 'divorce-case-1' });
```

### 8. 카테고리별 관련 FAQ (특정 항목 제외)
```typescript
const { data } = await supabase
  .from('faqs')
  .select('*')
  .eq('category', '위자료')
  .eq('published', true)
  .neq('slug', currentSlug)
  .order('featured', { ascending: false })
  .order('sort_order', { ascending: true, nullsFirst: false })
  .limit(5);
```

### 9. 상담 신청 생성 (Public)
```typescript
const { data, error } = await supabase
  .from('consultations')
  .insert({
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    category: 'alimony',
    message: '위자료 청구 관련 상담 요청드립니다.'
  })
  .select()
  .single();
```

### 10. 관리자: 미공개 포함 전체 조회
```typescript
// 인증된 관리자만 가능 (RLS 정책)
const { data } = await supabase
  .from('blog_posts')
  .select('*')
  .order('created_at', { ascending: false });
```

---

## 부록

### A. TypeScript 타입 정의 위치
- `/Users/hskim/theyool/types/database.ts` - Supabase 자동 생성 타입
- `/Users/hskim/theyool/types/case.ts` - Cases 관련 타입
- `/Users/hskim/theyool/types/consultation.ts` - Consultations 관련 타입
- `/Users/hskim/theyool/lib/supabase/*.ts` - 각 테이블별 서비스 로직

### B. API 라우트 위치
- `/Users/hskim/theyool/app/api/admin/cases/` - Cases CRUD API
- `/Users/hskim/theyool/app/api/admin/blog/` - Blog CRUD API
- `/Users/hskim/theyool/app/api/admin/faqs/` - FAQs CRUD API
- `/Users/hskim/theyool/app/api/admin/instagram/` - Instagram CRUD API
- `/Users/hskim/theyool/app/api/admin/upload/` - 파일 업로드 API

### C. 환경 변수
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***
ADMIN_EMAIL=admin@theyool.com
ADMIN_PASSWORD=***
```

### D. 데이터 백업 권장 사항
1. **자동 백업**: Supabase 자동 백업 (일일)
2. **수동 백업**: 주요 변경 전 SQL 덤프
3. **마이그레이션**: 모든 스키마 변경을 마이그레이션 파일로 관리
4. **Storage**: 이미지는 별도 CDN 백업 권장

### E. 성능 모니터링
- **Slow Query 분석**: Supabase Dashboard → Database → Query Performance
- **Index Usage**: `pg_stat_user_indexes` 뷰 확인
- **Table Size**: `pg_total_relation_size()` 함수 활용
- **Connection Pooling**: Supabase 자동 관리 (Supavisor)

---

## 문의 및 지원

**문서 작성자**: Backend & SEO Specialist (Claude Code)
**프로젝트**: 법무법인 더율 공식 웹사이트
**기술 스택**: Next.js 16.0.1, Supabase, TypeScript
**최종 검토**: 2025-11-16

---

*이 문서는 실제 마이그레이션 파일, TypeScript 코드, API 라우트를 기반으로 자동 생성되었습니다.*
