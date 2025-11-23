# Supabase Migrations - 법무법인 더율

이 폴더는 Supabase PostgreSQL 데이터베이스의 스키마 마이그레이션 파일을 포함합니다.

---

## 📁 파일 구조

```
supabase/migrations/
├── README.md (이 파일)
├── 00_COMPLETE_DATABASE_SETUP.sql ⭐ (전체 설정 - 이것만 실행하세요!)
├── 001_initial_schema.sql (초기 스키마 - 개별 실행 불필요)
├── 20251113_create_faq_table.sql
├── 20251114_create_blog_table.sql
├── 20251114_create_cases_table.sql
├── 20251114_create_instagram_table.sql
├── 20251116_add_instagram_slug.sql
├── 20251116_add_instagram_author.sql
├── 20251116_add_faq_references.sql
├── 20251118_create_testimonials_table.sql
├── 20251119_add_evidence_photos_table.sql
├── 20251119_update_faq_categories.sql
├── 20251120_recreate_testimonials_system.sql
├── create_bookings_table.sql
└── create_blocked_times_table.sql
```

---

## 🚀 빠른 시작 (권장 방법)

### ✅ 한 번에 모든 테이블 생성

**파일**: `00_COMPLETE_DATABASE_SETUP.sql`

이 파일은 모든 마이그레이션을 통합한 완전한 데이터베이스 설정 스크립트입니다.

**사용 방법**:

1. Supabase Dashboard > SQL Editor
2. `00_COMPLETE_DATABASE_SETUP.sql` 내용 복사
3. 붙여넣고 "Run" 클릭
4. 완료! 🎉

**특징**:
- ✅ 안전하게 재실행 가능 (`IF NOT EXISTS` 사용)
- ✅ 올바른 순서로 자동 실행 (외래키 의존성 고려)
- ✅ 모든 인덱스, 트리거, RLS 정책 포함
- ✅ 주석 및 문서화 포함

**생성되는 테이블** (9개):
1. `consultations` - 상담 신청
2. `cases` - 성공사례
3. `blog_posts` - 변호사 칼럼
4. `faqs` - 이혼큐레이션(Q&A)
5. `instagram_posts` - Instagram 게시물
6. `testimonial_cases` - 의뢰인 후기 케이스
7. `testimonial_evidence_photos` - 의뢰인 후기 증빙 사진
8. `bookings` - 방문/화상 상담 예약
9. `blocked_times` - 휴무일/시간 차단

---

## 📜 개별 마이그레이션 파일 설명

### 초기 스키마 (001)

**파일**: `001_initial_schema.sql`

**내용**:
- `consultations` 테이블 생성
- 기본 인덱스 및 RLS 정책
- `update_updated_at_column()` 함수 정의

**실행 필요 여부**: ❌ (00_COMPLETE에 포함됨)

---

### FAQ 시스템 (20251113)

**파일**: `20251113_create_faq_table.sql`

**내용**:
- `faqs` 테이블 생성
- Full-text search 설정
- 조회수 증가 함수

**주요 컬럼**:
- `question`, `answer`, `category`
- `slug`, `published`, `featured`
- `related_blog_posts[]`, `related_cases[]`

**실행 필요 여부**: ❌

---

### 블로그 & 사례 시스템 (20251114)

**파일**:
- `20251114_create_blog_table.sql` - 변호사 칼럼
- `20251114_create_cases_table.sql` - 성공사례
- `20251114_create_instagram_table.sql` - Instagram

**내용**:
- 각 테이블 생성 및 인덱스
- Full-text search
- RLS 정책

**실행 필요 여부**: ❌

---

### Instagram 확장 (20251116)

**파일**:
- `20251116_add_instagram_slug.sql` - slug 컬럼 추가
- `20251116_add_instagram_author.sql` - 작성자 정보 추가

**내용**:
- `slug`, `author`, `author_profile_url` 컬럼 추가
- `linked_case_id`, `linked_blog_id` 외래키 설정

**실행 필요 여부**: ❌

---

### FAQ 관련 콘텐츠 연결 (20251116)

**파일**: `20251116_add_faq_references.sql`

**내용**:
- `related_blog_posts TEXT[]` 컬럼 추가
- `related_cases TEXT[]` 컬럼 추가
- GIN 인덱스 생성

**목적**: FAQ 답변에 관련 칼럼 및 사례 링크 추가

**실행 필요 여부**: ❌

---

### 의뢰인 후기 시스템 v1 (20251118)

**파일**: `20251118_create_testimonials_table.sql`

**내용**:
- `testimonials` 테이블 생성 (초기 버전)
- 9개 샘플 데이터 삽입

**상태**: ⚠️ 폐기됨 (v2로 대체됨)

**실행 필요 여부**: ❌

---

### 의뢰인 후기 증빙 사진 (20251119)

**파일**: `20251119_add_evidence_photos_table.sql`

**내용**:
- `testimonial_evidence_photos` 테이블 생성
- 카톡, 문자, 네이버 리뷰, 편지 등 증빙 관리
- 개인정보 블러 처리 확인 필드

**상태**: ⚠️ 폐기됨 (v2로 대체됨)

**실행 필요 여부**: ❌

---

### 의뢰인 후기 시스템 v2 (20251120) ⭐

**파일**: `20251120_recreate_testimonials_system.sql`

**내용**:
- 기존 `testimonials` 테이블 삭제
- 새로운 `testimonial_cases` 테이블 생성
- `testimonial_evidence_photos` 재생성
- 증빙 중심 시스템으로 재설계

**주요 변경사항**:
- `testimonials` → `testimonial_cases`로 이름 변경
- `highlight_text` 추가 (카드 표시용)
- `case_result_amount` 추가 (금액)
- `consent_given` 필수 확인
- 증빙 사진과 1:N 관계 강화

**실행 필요 여부**: ❌ (00_COMPLETE에 포함됨)

---

### FAQ 카테고리 확장 (20251119)

**파일**: `20251119_update_faq_categories.sql`

**내용**:
- 기존 7개 → 15개 카테고리로 확장
- CHECK 제약조건 업데이트

**새로운 카테고리**:
- `emergency`, `domestic-violence`, `divorce-process`
- `separation-expense`, `evidence-collection`, `adultery`
- `alimony`, `custody`, `child-support`, `visitation`
- `property-division`, `paternity`, `post-divorce`
- `international-divorce`, `legal-support`

**실행 필요 여부**: ❌

---

### 상담 예약 시스템 (최신)

**파일**:
- `create_bookings_table.sql` - 예약 테이블
- `create_blocked_times_table.sql` - 휴무일/시간 차단

**내용**:
- 방문/화상 상담 예약 관리
- 평일 09:00-18:00, 30분 단위
- 관리자 휴무일/시간 차단 기능

**실행 필요 여부**: ❌ (00_COMPLETE에 포함됨)

---

## 🔍 검증 방법

데이터베이스 설정 후 검증:

```bash
node scripts/verify-database-setup.js
```

**확인 항목**:
1. ✅ 9개 테이블 존재 여부
2. ✅ 주요 컬럼 존재 여부
3. ✅ 데이터 개수 확인

---

## 🛠️ 문제 해결

### 문제 1: 테이블이 이미 존재한다는 에러

**원인**: 이미 생성된 테이블에 개별 마이그레이션 실행

**해결**:
- `00_COMPLETE_DATABASE_SETUP.sql`은 `IF NOT EXISTS`를 사용하므로 안전하게 재실행 가능
- 개별 파일은 실행하지 마세요

### 문제 2: 외래키 제약조건 오류

**원인**: 테이블 생성 순서가 잘못됨

**해결**:
- `00_COMPLETE_DATABASE_SETUP.sql`을 사용하세요 (올바른 순서로 정렬됨)
- 순서: `cases` → `blog_posts` → `instagram_posts`

### 문제 3: 함수가 이미 존재한다는 에러

**원인**: 같은 함수를 여러 번 생성 시도

**해결**:
- `CREATE OR REPLACE FUNCTION`을 사용하세요
- `00_COMPLETE_DATABASE_SETUP.sql`은 이미 처리됨

---

## 📝 마이그레이션 작성 가이드

새로운 마이그레이션 파일 추가 시:

1. **파일명 규칙**:
   ```
   YYYYMMDD_description.sql
   예: 20251120_add_team_members_table.sql
   ```

2. **반드시 포함할 내용**:
   - `IF NOT EXISTS` 사용 (안전한 재실행)
   - 인덱스 생성 (`CREATE INDEX IF NOT EXISTS`)
   - RLS 정책 설정
   - `updated_at` 트리거
   - 주석 및 COMMENT

3. **예시 템플릿**:
   ```sql
   -- [테이블명] 생성
   CREATE TABLE IF NOT EXISTS table_name (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- 인덱스
   CREATE INDEX IF NOT EXISTS idx_table_name_field ON table_name(field);

   -- 트리거
   CREATE TRIGGER update_table_name_updated_at
     BEFORE UPDATE ON table_name
     FOR EACH ROW
     EXECUTE FUNCTION update_updated_at_column();

   -- RLS
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Public can view"
     ON table_name FOR SELECT
     USING (true);

   -- 주석
   COMMENT ON TABLE table_name IS '테이블 설명';
   ```

4. **`00_COMPLETE_DATABASE_SETUP.sql` 업데이트**:
   - 새 마이그레이션을 통합 파일에 추가
   - 올바른 순서로 배치 (외래키 의존성 고려)

---

## 📚 참고 자료

- **Supabase Migrations**: https://supabase.com/docs/guides/database/migrations
- **PostgreSQL DDL**: https://www.postgresql.org/docs/current/ddl.html
- **Row Level Security**: https://supabase.com/docs/guides/auth/row-level-security

---

## 🔗 관련 파일

- **검증 스크립트**: `/scripts/verify-database-setup.js`
- **설정 가이드**: `/SUPABASE_DATABASE_SETUP.md`
- **빠른 시작**: `/QUICK_START_DATABASE.md`
- **프로젝트 문서**: `/CLAUDE.md`

---

**마지막 업데이트**: 2025-11-19
**유지보수**: 새로운 테이블 추가 시 이 README와 `00_COMPLETE_DATABASE_SETUP.sql`을 함께 업데이트하세요.
