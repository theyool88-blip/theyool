# Testimonials Database Schema - Complete Summary

## Executive Summary

완전한 의뢰인 후기(Testimonials) 데이터베이스 스키마를 설계하고 구현했습니다. 이 시스템은 프라이버시 보호, 사진 관리, 검색 기능, 그리고 향후 확장성을 모두 고려한 엔터프라이즈급 솔루션입니다.

---

## 주요 설계 결정 사항

### 1. Privacy-First Design (프라이버시 우선)

**결정**: 모든 공개 후기는 `consent_given = true`여야만 노출됩니다.

**이유**:
- GDPR 및 개인정보보호법 준수
- 의뢰인 보호 (법률 서비스 특성상 민감한 정보)
- 법적 리스크 최소화

**구현**:
```sql
-- RLS 정책으로 강제
CREATE POLICY "Anyone can view published testimonials"
  ON testimonials FOR SELECT
  USING (published = true AND consent_given = true);
```

### 2. Flexible Photo Management (유연한 사진 관리)

**결정**: 사진을 선택적으로 사용할 수 있도록 `use_photo` 플래그 추가

**이유**:
- 일부 의뢰인은 사진 공개 꺼림
- 이니셜 아바타로 대체 가능
- 브랜딩 일관성 유지

**구현**:
```typescript
{
  use_photo: boolean,           // true: 사진, false: 이니셜
  photo_url: string | null,     // Supabase Storage URL
  avatar_bg_color: string,      // Tailwind gradient
  avatar_text_color: string     // Tailwind text color
}
```

### 3. Storytelling Fields (스토리텔링)

**결정**: Before/Journey/After 필드를 선택적으로 추가

**이유**:
- 감성적 연결 강화 (이혼은 emotional journey)
- 긴 형식의 후기 지원
- 향후 "상세 후기 페이지" 확장 가능

**구현**:
```sql
story_before TEXT,   -- 상담 전 상황
story_journey TEXT,  -- 진행 과정
story_after TEXT     -- 결과 후 변화
```

### 4. Metadata Field (확장성)

**결정**: JSONB 타입의 `metadata` 필드 추가

**이유**:
- 향후 기능 추가 시 스키마 변경 없이 확장
- 비디오 URL, 태그, 외부 링크 등 저장 가능
- 실험적 기능 테스트 용이

**예시**:
```json
{
  "video_url": "https://youtube.com/...",
  "tags": ["재산분할", "은닉재산", "승소"],
  "external_review_url": "https://naver.com/..."
}
```

### 5. Display Order (노출 순서)

**결정**: `display_order` 필드로 수동 정렬 가능

**이유**:
- 마케팅 전략에 따라 특정 후기 우선 노출
- 드래그앤드롭 UI로 직관적 관리
- 자동 정렬(최신순)과 수동 큐레이션 병행

**구현**:
```sql
display_order INTEGER DEFAULT 0,

-- 쿼리 시
ORDER BY display_order ASC, created_at DESC
```

---

## Database Schema

### Core Table: `testimonials`

| 필드명 | 타입 | 제약 | 설명 |
|--------|------|------|------|
| `id` | UUID | PRIMARY KEY | 고유 식별자 |
| `client_name` | TEXT | NOT NULL | 익명화된 이름 (김○○) |
| `client_initial` | TEXT | NOT NULL | 이니셜 (김) |
| `client_role` | TEXT | NOT NULL | 역할 (재산분할 의뢰인) |
| `case_category` | TEXT | NOT NULL | 카테고리 (재산분할, 양육권 등) |
| `case_result` | TEXT | NOT NULL | 결과 (은닉 재산 발견) |
| `case_duration` | TEXT | NULL | 소요 기간 (3개월) |
| `case_date` | TEXT | NOT NULL | 사례 날짜 (2024년 8월) |
| `content` | TEXT | NOT NULL | 후기 본문 |
| `rating` | INTEGER | 1-5, DEFAULT 5 | 평점 |
| `story_before` | TEXT | NULL | 상담 전 상황 |
| `story_journey` | TEXT | NULL | 진행 과정 |
| `story_after` | TEXT | NULL | 결과 후 변화 |
| `photo_url` | TEXT | NULL | 사진 URL |
| `use_photo` | BOOLEAN | DEFAULT false | 사진 사용 여부 |
| `avatar_bg_color` | TEXT | DEFAULT 'from-amber-100 to-amber-200' | 아바타 배경색 |
| `avatar_text_color` | TEXT | DEFAULT 'text-amber-700' | 아바타 텍스트색 |
| `attorney_name` | TEXT | NULL | 담당 변호사 |
| `attorney_id` | UUID | NULL | 변호사 ID (FK) |
| `verified` | BOOLEAN | DEFAULT false | 검증 완료 |
| `consent_given` | BOOLEAN | DEFAULT false | 게시 동의 (CRITICAL) |
| `consent_date` | TIMESTAMP | NULL | 동의 날짜 |
| `featured` | BOOLEAN | DEFAULT false | 추천 후기 |
| `published` | BOOLEAN | DEFAULT false | 게시 여부 |
| `display_order` | INTEGER | DEFAULT 0 | 노출 순서 |
| `views` | INTEGER | DEFAULT 0 | 조회수 |
| `helpful_count` | INTEGER | DEFAULT 0 | 도움됨 카운트 |
| `metadata` | JSONB | DEFAULT '{}' | 확장 필드 |
| `created_at` | TIMESTAMP | DEFAULT NOW() | 생성 시각 |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | 수정 시각 |
| `created_by` | UUID | NULL | 작성자 (admin) |
| `updated_by` | UUID | NULL | 수정자 (admin) |

### Indexes

**성능 최적화를 위한 11개 인덱스:**

1. `idx_testimonials_category` - 카테고리 필터
2. `idx_testimonials_published` - 게시 상태
3. `idx_testimonials_featured` - 추천 후기
4. `idx_testimonials_verified` - 검증 상태
5. `idx_testimonials_display_order` - 정렬
6. `idx_testimonials_created_at` - 최신순
7. `idx_testimonials_rating` - 평점순
8. `idx_testimonials_views` - 인기순
9. `idx_testimonials_published_order` - 복합 인덱스 (게시+정렬)
10. `idx_testimonials_search` - Full-text search (GIN)

### Functions

**4개의 유틸리티 함수:**

1. `testimonials_search_trigger()` - Full-text search 벡터 업데이트
2. `increment_testimonial_views(id)` - 조회수 증가
3. `increment_testimonial_helpful(id)` - 도움됨 카운트 증가
4. `get_testimonial_stats_by_category()` - 카테고리별 통계

### Row Level Security (RLS)

**2개의 보안 정책:**

1. **공개 조회**: `published = true AND consent_given = true`만 노출
2. **관리자 전체 권한**: `auth.role() = 'authenticated'`

---

## Storage Architecture

### Bucket: `testimonial-photos`

**구조**:
```
testimonial-photos/
├── {testimonial_id}/
│   ├── 1700000000_photo1.jpg
│   ├── 1700000001_photo2.png
│   └── 1700000002_photo3.webp
└── defaults/
    └── avatar-amber.svg (optional)
```

**정책**:
- 공개 읽기: 누구나
- 업로드/수정/삭제: 인증된 사용자만

**제약**:
- 최대 크기: 5MB
- 허용 타입: JPEG, PNG, WebP
- 권장 해상도: 400x400px

**파일명 규칙**:
```
{timestamp}_{original_filename}
예: 1700000000_client_photo.jpg
```

---

## API Specification

### Public API

#### GET `/api/testimonials`
게시된 후기 조회 (공개)

**Query Parameters**:
- `category`: string (optional)
- `featured`: boolean (optional)
- `limit`: number (default: 9)
- `offset`: number (default: 0)

**Response**:
```json
{
  "data": [...],
  "count": 42,
  "limit": 9,
  "offset": 0
}
```

#### POST `/api/testimonials?id={id}`
"도움이 됐어요" 증가

**Response**:
```json
{ "success": true }
```

### Admin API (인증 필요)

#### GET `/api/admin/testimonials`
전체 후기 조회 (관리자)

**Query Parameters**:
- `category`: string
- `published`: boolean
- `verified`: boolean
- `search`: string (full-text search)
- `limit`: number (default: 50)
- `offset`: number (default: 0)

#### POST `/api/admin/testimonials`
새 후기 생성

**Request Body**:
```json
{
  "client_name": "김○○",
  "client_initial": "김",
  "client_role": "재산분할 의뢰인",
  "case_category": "재산분할",
  "case_result": "은닉 재산 발견",
  "case_date": "2024년 8월",
  "content": "후기 내용...",
  "rating": 5,
  "verified": true,
  "consent_given": true,
  "published": true
}
```

#### PATCH `/api/admin/testimonials/{id}`
후기 수정

#### DELETE `/api/admin/testimonials/{id}`
후기 삭제 (사진도 함께 삭제)

#### POST `/api/admin/testimonials/upload-photo`
사진 업로드

**Request**: FormData with `file` and `testimonialId`

**Response**:
```json
{ "url": "https://..." }
```

#### DELETE `/api/admin/testimonials/upload-photo`
사진 삭제

**Request Body**:
```json
{ "testimonialId": "uuid" }
```

---

## Data Categories

### Testimonial Categories (7개)

1. **재산분할** - 색상: Amber
2. **양육권** - 색상: Blue
3. **위자료** - 색상: Pink
4. **협의이혼** - 색상: Green
5. **상간손해배상** - 색상: Purple
6. **재판이혼** - 색상: Orange
7. **양육비청구** - 색상: Teal

### Color Mapping

```typescript
export const CATEGORY_COLORS = {
  재산분할: { bg: 'from-amber-100 to-amber-200', text: 'text-amber-700' },
  양육권: { bg: 'from-blue-100 to-blue-200', text: 'text-blue-700' },
  위자료: { bg: 'from-pink-100 to-pink-200', text: 'text-pink-700' },
  협의이혼: { bg: 'from-green-100 to-green-200', text: 'text-green-700' },
  상간손해배상: { bg: 'from-purple-100 to-purple-200', text: 'text-purple-700' },
  재판이혼: { bg: 'from-orange-100 to-orange-200', text: 'text-orange-700' },
  양육비청구: { bg: 'from-teal-100 to-teal-200', text: 'text-teal-700' },
};
```

---

## Initial Data (9 Testimonials)

마이그레이션 스크립트에 9개의 초기 데이터가 자동 삽입됩니다:

1. 김○○ - 재산분할 (은닉 재산 발견)
2. 이○○ - 양육권 (단독 양육권 확보)
3. 박○○ - 위자료 (5억원 확보)
4. 최○○ - 협의이혼 (3개월 원만 합의)
5. 정○○ - 상간손해배상 (2억원)
6. 강○○ - 재판이혼 (모두 승소)
7. 윤○○ - 양육비청구 (전액 + 이행명령)
8. 한○○ - 재산분할 (은닉 부동산 3건)
9. 서○○ - 위자료 (3억원 확보)

---

## Security Features

### 1. CRITICAL: Consent Protection

**문제**: 동의 없이 후기 노출 시 법적 리스크
**해결**: 데이터베이스 레벨에서 RLS로 강제

```sql
-- consent_given = false면 절대 노출 안됨
USING (published = true AND consent_given = true)
```

### 2. Authentication

**모든 관리자 API는 세션 인증 필수**:
```typescript
const session = await getSession();
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 3. File Upload Validation

```typescript
// 타입 검증
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

// 크기 검증
const maxSize = 5 * 1024 * 1024; // 5MB
```

### 4. SQL Injection Prevention

**Supabase Query Builder 사용** (parameterized queries):
```typescript
// ✅ SAFE
await supabase.from('testimonials').select('*').eq('id', id);

// ❌ DANGEROUS (우리는 사용 안함)
await supabase.raw(`SELECT * FROM testimonials WHERE id = '${id}'`);
```

### 5. XSS Prevention

**React가 자동으로 이스케이프** 하지만, 추가 검증:
```typescript
// 입력 시 HTML 태그 제거 (선택사항)
const sanitized = DOMPurify.sanitize(input);
```

---

## Performance Optimization

### 1. Query Optimization

**복합 인덱스 사용**:
```sql
CREATE INDEX idx_testimonials_published_order
  ON testimonials(published, display_order ASC)
  WHERE published = true;
```

**쿼리 예시** (EXPLAIN ANALYZE):
```sql
EXPLAIN ANALYZE
SELECT * FROM testimonials
WHERE published = true AND consent_given = true
ORDER BY display_order ASC, created_at DESC
LIMIT 9;

-- 예상 실행 시간: < 5ms
```

### 2. Pagination

**Offset-based pagination** (간단한 구현):
```typescript
query.range(offset, offset + limit - 1)
```

**향후 개선** (Cursor-based pagination):
```typescript
// Phase 2에서 구현 예정
query.gt('created_at', cursor).limit(10)
```

### 3. CDN Caching

**Supabase Storage는 자동으로 CDN 캐싱**:
- Cache-Control: 3600 (1시간)
- 이미지 최적화 자동 적용

### 4. Full-Text Search

**GIN 인덱스로 빠른 검색**:
```sql
-- 검색 예시
SELECT * FROM testimonials
WHERE search_vector @@ to_tsquery('simple', '재산분할');

-- 인덱스 덕분에 밀리초 단위 응답
```

---

## Future Enhancements (Roadmap)

### Phase 2: Video Testimonials

```typescript
// metadata 활용
{
  "video_url": "https://youtube.com/...",
  "video_thumbnail": "https://...",
  "video_duration": "3:25"
}
```

**UI 변경**:
- 사진 대신 비디오 썸네일
- 클릭 시 모달로 비디오 재생

### Phase 3: Public Submission Form

**의뢰인이 직접 후기 작성**:
1. 공개 폼 (`/submit-testimonial`)
2. 작성 후 `published = false`, `verified = false`
3. 관리자 검토 후 승인
4. 승인 시 이메일 알림

**추가 테이블**:
```sql
CREATE TABLE testimonial_submissions (
  id UUID PRIMARY KEY,
  testimonial_id UUID REFERENCES testimonials(id),
  status TEXT, -- 'pending', 'approved', 'rejected'
  reviewer_id UUID,
  reviewed_at TIMESTAMP
);
```

### Phase 4: A/B Testing

**어떤 후기가 전환율 높은지 분석**:
```sql
ALTER TABLE testimonials ADD COLUMN conversion_rate NUMERIC;

-- 통계 수집
CREATE TABLE testimonial_impressions (
  id UUID PRIMARY KEY,
  testimonial_id UUID,
  session_id TEXT,
  converted BOOLEAN,
  created_at TIMESTAMP
);
```

### Phase 5: Sentiment Analysis

**AI로 감성 분석**:
```typescript
// metadata에 저장
{
  "sentiment": "positive",
  "keywords": ["전문적", "체계적", "만족"],
  "emotion_score": 0.92
}
```

---

## Migration from Hardcoded Data

### Step-by-Step

1. **백업**:
```bash
cp components/features/TestimonialsCarousel.tsx \
   components/features/TestimonialsCarousel.tsx.backup
```

2. **SQL 실행**:
```bash
# Supabase Dashboard > SQL Editor
# 파일 복사: supabase/migrations/20251118_create_testimonials_table.sql
```

3. **Storage 설정**:
- Dashboard > Storage > New Bucket: `testimonial-photos`

4. **컴포넌트 업데이트**:
- `fetchPublicTestimonials()` 사용

5. **테스트**:
```bash
npm run dev
# http://localhost:3000 에서 후기 섹션 확인
```

6. **배포**:
```bash
vercel --prod
```

---

## Monitoring & Maintenance

### Key Metrics

**추적해야 할 지표**:
- 후기 조회수 (`views`)
- 도움됨 클릭 (`helpful_count`)
- 카테고리별 분포
- 평균 평점
- 게시 승인율 (Phase 3)

**Supabase Dashboard**:
- SQL: `SELECT * FROM get_testimonial_stats_by_category();`
- 월간 리포트 생성

### Backup Strategy

**자동 백업** (Supabase 제공):
- 일일 백업 (7일 보관)
- Point-in-time recovery (Pro 플랜)

**수동 백업**:
```bash
# pg_dump로 테이블 백업
pg_dump -h db.xxx.supabase.co -U postgres \
  -t testimonials -F c -f testimonials_backup.dump
```

### Data Retention

**정책**:
- 게시된 후기: 영구 보관
- 비공개 후기: 1년 후 아카이빙
- 동의 철회 시: 즉시 삭제 (GDPR)

**구현**:
```sql
-- 매년 실행
UPDATE testimonials
SET published = false
WHERE consent_given = false
  AND updated_at < NOW() - INTERVAL '1 year';
```

---

## Questions Answered

### 1. Should testimonials include full photos or just initials/avatars?

**답변**: 둘 다 지원 (`use_photo` 플래그)

**이유**:
- 일부 의뢰인은 사진 공개 꺼림
- 브랜딩 일관성 위해 이니셜 아바타도 필요
- 유연성 제공

### 2. Do we need multi-image support per testimonial?

**답변**: Phase 1에서는 단일 이미지, Phase 2에서 확장 가능

**이유**:
- 복잡도 관리 (MVP 먼저)
- 향후 `metadata.additional_photos = ['url1', 'url2']`로 확장

### 3. Should we track which cases these testimonials are linked to?

**답변**: `case_category`로 분류, 향후 `case_id` FK 추가 가능

**이유**:
- 현재는 cases 테이블이 "성공사례 콘텐츠"용
- 후기는 별도 엔티티
- 필요 시 `metadata.case_id` 추가

### 4. Do we need approval workflow (draft → review → published)?

**답변**: Phase 1은 간단히, Phase 3에서 워크플로우 추가

**현재**:
- `published = false` → 임시 저장
- `published = true` → 즉시 게시

**Phase 3**:
```sql
status ENUM('draft', 'review', 'approved', 'published')
```

### 5. Should we support video testimonials in the future?

**답변**: Yes, metadata로 확장 예정

**Phase 2 구현**:
```typescript
metadata: {
  video_url: 'https://youtube.com/...',
  video_platform: 'youtube', // 또는 'vimeo'
  video_duration: '3:25'
}
```

### 6. Do we need to store consent/permission status for each testimonial?

**답변**: Yes, `consent_given` 필드로 구현 (CRITICAL)

**법적 근거**:
- 개인정보보호법
- GDPR (EU 의뢰인 있을 시)
- 의뢰인 보호 (법률 서비스의 민감성)

---

## File Structure Summary

### Created Files

```
📁 theyool/
├── 📄 supabase/migrations/
│   └── 20251118_create_testimonials_table.sql (완전한 스키마)
├── 📄 supabase/storage/
│   └── testimonial-photos-bucket.sql (Storage 정책)
├── 📄 app/api/testimonials/
│   └── route.ts (공개 API)
├── 📄 app/api/admin/testimonials/
│   ├── route.ts (관리자 CRUD)
│   ├── [id]/route.ts (개별 관리)
│   └── upload-photo/route.ts (사진 업로드)
├── 📄 lib/supabase/
│   ├── testimonials.ts (서버 헬퍼)
│   └── testimonials-client.ts (클라이언트 헬퍼)
├── 📄 TESTIMONIALS_IMPLEMENTATION_GUIDE.md (구현 가이드)
├── 📄 TESTIMONIALS_ADMIN_UI_SPEC.md (관리자 UI 명세)
└── 📄 TESTIMONIALS_SCHEMA_SUMMARY.md (본 문서)
```

### Next Steps

1. **관리자 UI 구현** (우선순위 높음)
   - `/app/admin/testimonials/page.tsx`
   - `/app/admin/testimonials/TestimonialsManagementClient.tsx`
   - `/app/admin/testimonials/TestimonialModal.tsx`
   - `/app/admin/testimonials/TestimonialPhotoUploader.tsx`

2. **컴포넌트 업데이트** (우선순위 높음)
   - `/components/features/TestimonialsCarousel.tsx` (DB 연동)

3. **테스트** (우선순위 높음)
   - API 엔드포인트 테스트
   - 사진 업로드/삭제 테스트
   - RLS 정책 테스트

4. **배포** (우선순위 중)
   - Vercel 프로덕션 배포
   - Supabase 마이그레이션 실행

5. **Phase 2** (향후)
   - 비디오 후기
   - 공개 제출 폼
   - A/B 테스트

---

## Conclusion

이 testimonials 스키마는:

✅ **안전**: RLS, 동의 관리, 인증
✅ **확장 가능**: metadata, 카테고리, 스토리텔링
✅ **성능**: 11개 인덱스, Full-text search
✅ **유연함**: 사진/아바타, 수동 정렬, 다양한 필터
✅ **유지보수 가능**: 문서화, 함수, 트리거

**법무법인 더율의 의뢰인 후기를 체계적으로 관리하고, 마케팅 전략에 맞게 노출할 수 있는 완전한 시스템입니다.**
