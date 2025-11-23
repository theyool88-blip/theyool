# 법무법인 더율 - Supabase 데이터베이스 설정 가이드

**마지막 업데이트**: 2025-11-19

---

## 📋 목차

1. [개요](#개요)
2. [데이터베이스 구조](#데이터베이스-구조)
3. [설정 방법](#설정-방법)
4. [검증 방법](#검증-방법)
5. [문제 해결](#문제-해결)
6. [Storage 버킷 설정](#storage-버킷-설정)

---

## 개요

이 문서는 법무법인 더율 웹사이트의 Supabase 데이터베이스를 완전히 설정하는 방법을 설명합니다.

### 필요한 테이블 (총 9개)

| 테이블명 | 설명 | 행 개수 (예상) |
|---------|------|---------------|
| `cases` | 성공사례 | 21개 |
| `blog_posts` | 변호사 칼럼 | 18개 |
| `faqs` | 이혼큐레이션(Q&A) | 76개 |
| `instagram_posts` | Instagram 게시물 | 12개 |
| `testimonial_cases` | 의뢰인 후기 케이스 | 9개 |
| `testimonial_evidence_photos` | 의뢰인 후기 증빙 사진 | 0개 (관리자 추가) |
| `bookings` | 방문/화상 상담 예약 | 0개 (사용자 신청) |
| `blocked_times` | 휴무일/시간 차단 | 0개 (관리자 추가) |
| `consultations` | 상담 신청 | 0개 (사용자 신청) |

---

## 데이터베이스 구조

### 1. Cases (성공사례)

```typescript
interface Case {
  id: UUID;
  title: string;
  slug: string; // URL 경로 (예: case-001)
  category: string; // '위자료', '재산분할', '양육권' 등
  background: string; // 사건 배경 (Markdown)
  strategy: string; // 승소 전략 (Markdown)
  result: string; // 사건 결과 (Markdown)
  image_url?: string; // 대표 이미지
  published: boolean;
  views: number;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- Full-text search (제목, 배경, 전략, 결과)
- 카테고리별 필터링
- 조회수 자동 증가
- RLS: 게시된 사례만 공개

---

### 2. Blog Posts (변호사 칼럼)

```typescript
interface BlogPost {
  id: UUID;
  title: string;
  slug: string;
  excerpt?: string; // 요약
  content: string; // Markdown 본문
  category?: string; // '위자료', '재산분할', '양육권', '이혼절차' 등
  tags?: string[]; // 태그 배열
  thumbnail_url?: string; // 썸네일 이미지
  author: string; // 기본값: '법무법인 더율'
  published: boolean;
  featured: boolean; // 추천 칼럼
  views: number;
  published_at?: timestamp;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- Full-text search (제목, 요약, 본문, 태그)
- 카테고리 및 태그 필터링
- 추천 칼럼 설정
- 조회수 자동 증가

---

### 3. FAQs (이혼큐레이션)

```typescript
interface FAQ {
  id: UUID;
  question: string;
  slug: string;
  category: string; // 15개 카테고리 (emergency, domestic-violence 등)
  summary?: string; // 질문 요약
  answer: string; // Markdown 답변
  featured: boolean; // 추천 질문
  published: boolean;
  views: number;
  sort_order?: number; // 정렬 순서
  related_blog_posts?: string[]; // 관련 칼럼 slug 배열
  related_cases?: string[]; // 관련 사례 slug 배열
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- Full-text search (질문, 요약, 답변)
- 15개 카테고리 지원
- 관련 칼럼/사례 연결
- 조회수 자동 증가

**카테고리 목록** (15개):
1. `emergency` - 긴급 상황
2. `domestic-violence` - 가정폭력
3. `divorce-process` - 이혼 절차
4. `separation-expense` - 혼인비용분담
5. `evidence-collection` - 증거수집
6. `adultery` - 상간사건
7. `alimony` - 위자료
8. `custody` - 양육권
9. `child-support` - 양육비
10. `visitation` - 면접교섭권
11. `property-division` - 재산분할
12. `paternity` - 친권·친생자
13. `post-divorce` - 이혼 후 문제
14. `international-divorce` - 국제이혼
15. `legal-support` - 법률구조·소송비용

---

### 4. Instagram Posts

```typescript
interface InstagramPost {
  id: UUID;
  title: string;
  slug: string;
  post_type: '릴스' | '일상' | '성공사례' | '칼럼' | '일반' | '홍보';
  caption?: string; // 게시물 설명
  thumbnail_url?: string;
  images?: string[]; // 이미지 URL 배열
  author: string; // 기본값: 'theyool_official'
  author_profile_url?: string; // 작성자 프로필 이미지
  linked_case_id?: UUID; // 연결된 성공사례
  linked_blog_id?: UUID; // 연결된 칼럼
  published: boolean;
  views: number;
  likes: number;
  published_at?: timestamp;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- 성공사례 및 칼럼과 연결
- 조회수/좋아요 자동 증가
- 게시물 유형별 필터링

---

### 5. Testimonial Cases (의뢰인 후기)

```typescript
interface TestimonialCase {
  id: UUID;
  category: string; // 'alimony', 'custody', 'property', 'adultery'
  highlight_text: string; // "위자료 2억 승소" (카드 표시용)
  case_result_amount?: bigint; // 금액 (원 단위)
  client_initial: string; // "김", "이"
  client_role?: string; // "40대 여성"
  client_age_group?: string; // "30대", "40대"
  full_story?: string; // 전체 스토리 (라이트박스용)
  story_before?: string; // 상담 전 상황
  story_journey?: string; // 진행 과정
  story_after?: string; // 결과 후 변화
  case_date: string; // "2024년 10월"
  case_duration?: string; // "3개월"
  attorney_name?: string; // "임은지"
  verified: boolean; // 검증 완료
  consent_given: boolean; // **[CRITICAL]** 게시 동의
  consent_date?: timestamp;
  featured: boolean; // 추천 후기
  published: boolean;
  display_order: number; // 노출 순서
  views: number;
  helpful_count: number;
  metadata: jsonb; // 확장 필드
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- Full-text search (highlight_text, full_story 등)
- 카테고리별 필터링
- 증빙 사진과 연결 (1:N 관계)
- **동의 필수**: `consent_given = true`만 공개

---

### 6. Testimonial Evidence Photos (증빙 사진)

```typescript
interface TestimonialEvidencePhoto {
  id: UUID;
  case_id: UUID; // testimonial_cases.id (외래키)
  evidence_type: 'kakao' | 'sms' | 'naver' | 'letter' | 'other';
  photo_url: string; // Supabase Storage URL
  display_order: number; // 표시 순서
  caption?: string; // "카카오톡 대화 1/3"
  original_date?: timestamp; // 원본 날짜
  file_size?: number;
  file_type?: string; // MIME type
  width?: number;
  height?: number;
  alt_text?: string; // SEO & 접근성
  blur_applied: boolean; // **[CRITICAL]** 개인정보 블러 처리
  verified_by?: UUID;
  verified_at?: timestamp;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- ON DELETE CASCADE (케이스 삭제 시 자동 삭제)
- **블러 필수**: `blur_applied = true`만 공개
- 증빙 유형별 필터링

---

### 7. Bookings (상담 예약)

```typescript
interface Booking {
  id: UUID;
  type: 'visit' | 'video'; // 방문 or 화상 상담
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  name: string;
  phone: string;
  email?: string;
  category?: string; // '위자료', '양육권' 등
  message?: string;
  preferred_date: date; // 희망 날짜
  preferred_time: string; // "14:00" (HH:MM)
  office_location?: '천안' | '평택'; // visit만 필수
  video_link?: string; // 관리자가 추가
  admin_notes?: string;
  confirmed_at?: timestamp;
  cancelled_at?: timestamp;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- 누구나 예약 가능 (INSERT)
- 관리자만 조회/수정/삭제
- 평일(월-금) 09:00-18:00만 예약 가능 (점심 12:00-13:00 제외)
- 30분 단위 시간 슬롯

---

### 8. Blocked Times (휴무일/시간 차단)

```typescript
interface BlockedTime {
  id: UUID;
  block_type: 'date' | 'time_slot'; // 날짜 전체 or 특정 시간대
  blocked_date?: date;
  blocked_time_start?: string; // "09:00"
  blocked_time_end?: string; // "12:00"
  office_location?: '천안' | '평택' | null; // null = 전체
  reason?: string; // "공휴일", "법원 출장"
  created_by?: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- 관리자만 생성/수정/삭제
- 누구나 조회 가능 (예약 시 차단 시간 확인)
- 특정 날짜 전체 or 특정 시간대 차단 가능

---

### 9. Consultations (상담 신청)

```typescript
interface Consultation {
  id: UUID;
  name: string;
  phone: string;
  email?: string;
  category?: string; // '위자료', '양육권' 등
  message?: string;
  status: 'pending' | 'in_progress' | 'completed';
  admin_notes?: string;
  created_at: timestamp;
  updated_at: timestamp;
}
```

**주요 기능**:
- 누구나 상담 신청 가능 (INSERT)
- 관리자만 조회/수정
- 상태별 필터링

---

## 설정 방법

### Step 1: Supabase Dashboard 로그인

1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택 (법무법인 더율)
3. 왼쪽 메뉴에서 **SQL Editor** 클릭

### Step 2: 완전한 데이터베이스 설정 SQL 실행

1. 로컬에서 다음 파일 열기:
   ```
   supabase/migrations/00_COMPLETE_DATABASE_SETUP.sql
   ```

2. 파일 내용 전체를 복사

3. Supabase SQL Editor에 붙여넣기

4. **"Run"** 버튼 클릭

5. 실행 완료 메시지 확인:
   ```
   ✅ 법무법인 더율 데이터베이스 설정 완료!
   ```

### Step 3: 검증

터미널에서 다음 명령 실행:

```bash
node scripts/verify-database-setup.js
```

**예상 출력**:

```
================================================
법무법인 더율 - 데이터베이스 설정 검증
================================================

📋 [1/3] 테이블 존재 여부 확인 중...

   cases                          ✅ 존재 (성공사례)
   blog_posts                     ✅ 존재 (변호사 칼럼)
   faqs                           ✅ 존재 (이혼큐레이션(Q&A))
   instagram_posts                ✅ 존재 (Instagram 게시물)
   testimonial_cases              ✅ 존재 (의뢰인 후기 케이스)
   testimonial_evidence_photos    ✅ 존재 (의뢰인 후기 증빙 사진)
   bookings                       ✅ 존재 (방문/화상 상담 예약)
   blocked_times                  ✅ 존재 (휴무일/시간 차단)
   consultations                  ✅ 존재 (상담 신청)

📊 [2/3] 테이블별 데이터 개수 확인 중...

   cases                             21개 (성공사례)
   blog_posts                        18개 (변호사 칼럼)
   faqs                              76개 (이혼큐레이션(Q&A))
   instagram_posts                   12개 (Instagram 게시물)
   testimonial_cases                  9개 (의뢰인 후기 케이스)
   testimonial_evidence_photos        0개 (의뢰인 후기 증빙 사진)
   bookings                           0개 (방문/화상 상담 예약)
   blocked_times                      0개 (휴무일/시간 차단)
   consultations                      0개 (상담 신청)

🔍 [3/3] 주요 컬럼 존재 여부 확인 중...

   ✅ cases: 모든 주요 컬럼 존재
   ✅ blog_posts: 모든 주요 컬럼 존재
   ✅ faqs: 모든 주요 컬럼 존재
   ✅ instagram_posts: 모든 주요 컬럼 존재
   ✅ testimonial_cases: 모든 주요 컬럼 존재
   ✅ testimonial_evidence_photos: 모든 주요 컬럼 존재
   ✅ bookings: 모든 주요 컬럼 존재
   ✅ blocked_times: 모든 주요 컬럼 존재
   ✅ consultations: 모든 주요 컬럼 존재

================================================
검증 결과
================================================

✅ 모든 테이블과 컬럼이 정상적으로 설정되었습니다!
```

---

## 문제 해결

### 문제 1: 테이블이 없다고 나옵니다

**원인**: SQL 스크립트가 아직 실행되지 않음

**해결**:
1. Supabase Dashboard > SQL Editor
2. `supabase/migrations/00_COMPLETE_DATABASE_SETUP.sql` 내용 복사
3. 붙여넣고 "Run" 클릭

### 문제 2: 권한 오류 (permission denied)

**원인**: RLS(Row Level Security) 정책 설정 오류

**해결**:
1. SQL Editor에서 다음 실행:
   ```sql
   -- 특정 테이블의 RLS 비활성화 (임시)
   ALTER TABLE cases DISABLE ROW LEVEL SECURITY;
   ```
2. 또는 Service Role Key 사용 확인:
   ```bash
   # .env.local에 올바른 키 설정 확인
   SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
   ```

### 문제 3: 컬럼이 누락됨

**원인**: 마이그레이션 파일이 부분적으로만 실행됨

**해결**:
1. 전체 SQL 스크립트를 다시 실행 (IF NOT EXISTS로 안전)
2. 또는 개별 마이그레이션 파일 실행:
   ```bash
   # 예: FAQs 카테고리 업데이트
   supabase/migrations/20251119_update_faq_categories.sql
   ```

### 문제 4: Foreign Key 오류

**원인**: `instagram_posts`의 `linked_case_id`가 존재하지 않는 `cases.id`를 참조

**해결**:
1. 먼저 `cases` 및 `blog_posts` 테이블 생성
2. 그 다음 `instagram_posts` 테이블 생성
3. 완전한 스크립트(`00_COMPLETE_DATABASE_SETUP.sql`)는 이미 올바른 순서로 정렬됨

---

## Storage 버킷 설정

Supabase Storage에 다음 버킷을 생성해야 합니다:

### 1. blog-images

**용도**: 변호사 칼럼 이미지

**설정**:
- Public: ✅ (누구나 읽기 가능)
- File size limit: 10MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

**경로 예시**:
```
blog-images/
  ├── 2024-10-15-alimony-guide.jpg
  ├── 2024-11-01-custody-tips.png
  └── ...
```

### 2. case-images

**용도**: 성공사례 이미지

**설정**:
- Public: ✅
- File size limit: 10MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

**경로 예시**:
```
case-images/
  ├── case-001-hero.jpg
  ├── case-002-result.png
  └── ...
```

### 3. instagram-media

**용도**: Instagram 게시물 이미지

**설정**:
- Public: ✅
- File size limit: 10MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

**경로 예시**:
```
instagram-media/
  ├── post-001/
  │   ├── img1.jpg
  │   └── img2.jpg
  └── ...
```

### 4. testimonial-photos (선택적)

**용도**: 의뢰인 후기 증빙 사진 (블러 처리된 카톡, 문자, 네이버 리뷰 등)

**설정**:
- Public: ✅
- File size limit: 10MB
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`

**경로 예시**:
```
testimonial-photos/
  ├── {case_id}/
  │   ├── kakao-01-blurred.jpg
  │   ├── naver-review-blurred.png
  │   └── ...
  └── ...
```

**중요**: 모든 증빙 사진은 반드시 개인정보를 블러 처리한 후 업로드해야 합니다.

---

## 버킷 생성 방법

1. Supabase Dashboard > **Storage** 메뉴
2. **"New bucket"** 클릭
3. 버킷 이름 입력 (예: `blog-images`)
4. **Public bucket** 체크 ✅
5. **"Create bucket"** 클릭

각 버킷에 대해 반복

---

## 다음 단계

데이터베이스 설정이 완료되면:

1. **데이터 마이그레이션** (기존 데이터가 있는 경우):
   ```bash
   # 예: WordPress에서 마이그레이션
   node scripts/migrate-cases-from-wordpress.js
   node scripts/migrate-blog-from-wordpress.js
   node scripts/migrate-faq-complete.js
   ```

2. **관리자 계정으로 로그인**:
   - URL: `http://localhost:3000/admin/login`
   - Email: `admin@theyool.com`
   - Password: (`.env.local`의 `ADMIN_PASSWORD`)

3. **콘텐츠 관리 시작**:
   - 성공사례 추가/수정
   - 변호사 칼럼 작성
   - FAQ 관리
   - Instagram 게시물 업로드

4. **상담 예약 시스템 테스트**:
   - 휴무일 설정 (`/admin/bookings`)
   - 예약 페이지 테스트 (`/book-visit`, `/book-video`)

---

## 참고 자료

- **Supabase 공식 문서**: https://supabase.com/docs
- **PostgreSQL 문서**: https://www.postgresql.org/docs/
- **Row Level Security (RLS)**: https://supabase.com/docs/guides/auth/row-level-security

---

## 문의

데이터베이스 설정 중 문제가 발생하면:

1. 먼저 검증 스크립트 실행: `node scripts/verify-database-setup.js`
2. Supabase Dashboard에서 직접 테이블 확인
3. 필요시 개발팀에 문의

---

**마지막 업데이트**: 2025-11-19
**버전**: 1.0.0
