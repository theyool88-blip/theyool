# ✅ 데이터베이스 설정 체크리스트

법무법인 더율 웹사이트의 Supabase 데이터베이스를 완전히 설정하기 위한 단계별 체크리스트입니다.

---

## 📋 전체 단계 개요

- **소요 시간**: 약 10-15분
- **난이도**: 쉬움 (복사 & 붙여넣기)
- **필요 사항**: Supabase 계정, 로컬 환경 (.env.local 설정 완료)

---

## Step 1: 사전 확인 ✅

### 1.1 환경 변수 확인

`.env.local` 파일에 다음 값이 설정되어 있는지 확인:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***
ADMIN_EMAIL=admin@theyool.com
ADMIN_PASSWORD=***
```

- [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정 완료
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정 완료
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 설정 완료
- [ ] `ADMIN_EMAIL` 및 `ADMIN_PASSWORD` 설정 완료

### 1.2 Supabase 프로젝트 확인

- [ ] Supabase Dashboard 로그인 가능
- [ ] 올바른 프로젝트 선택됨 (법무법인 더율)
- [ ] 프로젝트 URL이 `.env.local`과 일치

---

## Step 2: 데이터베이스 설정 (Supabase Dashboard) 🎯

### 2.1 SQL Editor 접속

1. [ ] [Supabase Dashboard](https://app.supabase.com) 접속
2. [ ] 왼쪽 메뉴에서 **"SQL Editor"** 클릭
3. [ ] 새 쿼리 시작 ("New query" 버튼)

### 2.2 완전한 설정 SQL 실행

1. [ ] 로컬 파일 열기: `supabase/migrations/00_COMPLETE_DATABASE_SETUP.sql`
2. [ ] **파일 전체 내용 복사** (840줄)
3. [ ] Supabase SQL Editor에 **붙여넣기**
4. [ ] 우측 상단 **"Run"** 버튼 클릭 ▶️
5. [ ] 실행 완료 대기 (약 30초~1분)
6. [ ] 성공 메시지 확인:
   ```
   ✅ 법무법인 더율 데이터베이스 설정 완료!
   ```

**예상 출력**:
```sql
NOTICE: ✅ 법무법인 더율 데이터베이스 설정 완료!
NOTICE:    - 총 9개 테이블 생성
NOTICE:    - 모든 인덱스, 트리거, RLS 정책 설정 완료
...
```

### 2.3 테이블 생성 확인

1. [ ] 왼쪽 메뉴에서 **"Table Editor"** 클릭
2. [ ] 다음 9개 테이블이 보이는지 확인:
   - [ ] `cases`
   - [ ] `blog_posts`
   - [ ] `faqs`
   - [ ] `instagram_posts`
   - [ ] `testimonial_cases`
   - [ ] `testimonial_evidence_photos`
   - [ ] `bookings`
   - [ ] `blocked_times`
   - [ ] `consultations`

---

## Step 3: 로컬 검증 (터미널) ✅

### 3.1 검증 스크립트 실행

터미널에서 다음 명령 실행:

```bash
node scripts/verify-database-setup.js
```

### 3.2 결과 확인

- [ ] 모든 테이블 존재 확인 (9개)
- [ ] 각 테이블의 행 개수 표시
- [ ] 주요 컬럼 존재 확인
- [ ] **최종 메시지 확인**:
   ```
   ✅ 모든 테이블과 컬럼이 정상적으로 설정되었습니다!
   ```

**문제 발생 시**:
- [ ] 에러 메시지 확인
- [ ] `SUPABASE_DATABASE_SETUP.md` 문제 해결 섹션 참조
- [ ] 필요시 Step 2를 다시 실행 (안전하게 재실행 가능)

---

## Step 4: Storage 버킷 생성 (선택적) 📦

이미지 및 미디어 파일 저장을 위한 버킷 생성:

### 4.1 Storage 메뉴 접속

1. [ ] Supabase Dashboard > **"Storage"** 메뉴 클릭
2. [ ] 기존 버킷 확인

### 4.2 필요한 버킷 생성

각 버킷에 대해:

#### Bucket 1: blog-images
- [ ] "New bucket" 클릭
- [ ] Name: `blog-images`
- [ ] **Public bucket** 체크 ✅
- [ ] "Create bucket" 클릭

#### Bucket 2: case-images
- [ ] Name: `case-images`
- [ ] **Public bucket** 체크 ✅
- [ ] 생성 완료

#### Bucket 3: instagram-media
- [ ] Name: `instagram-media`
- [ ] **Public bucket** 체크 ✅
- [ ] 생성 완료

#### Bucket 4: testimonial-photos (선택적)
- [ ] Name: `testimonial-photos`
- [ ] **Public bucket** 체크 ✅
- [ ] 생성 완료

### 4.3 버킷 정책 설정 (자동)

모든 버킷을 Public으로 생성하면 자동으로 읽기 권한이 설정됩니다.

- [ ] 각 버킷의 "Policies" 탭에서 정책 확인
- [ ] "Public access" 정책이 활성화되어 있는지 확인

---

## Step 5: 데이터 마이그레이션 (기존 데이터가 있는 경우) 📊

기존에 WordPress나 다른 소스에서 데이터를 가져오는 경우:

### 5.1 FAQ 데이터 마이그레이션

```bash
node scripts/migrate-faq-complete.js
```

- [ ] 실행 완료
- [ ] 에러 없이 완료 확인
- [ ] Supabase Dashboard에서 `faqs` 테이블 행 개수 확인 (76개 예상)

### 5.2 Instagram 데이터 마이그레이션

```bash
node scripts/migrate-instagram-complete.js
```

- [ ] 실행 완료
- [ ] `instagram_posts` 테이블 확인 (12개 예상)

### 5.3 의뢰인 후기 데이터 마이그레이션

```bash
node scripts/migrate-testimonials.js
```

- [ ] 실행 완료
- [ ] `testimonial_cases` 테이블 확인 (9개 예상)

**참고**: 성공사례(`cases`) 및 칼럼(`blog_posts`)은 별도 마이그레이션 스크립트가 있는 경우 실행

---

## Step 6: 관리자 기능 테스트 🧪

### 6.1 관리자 로그인

1. [ ] 브라우저에서 `http://localhost:3000/admin/login` 접속
2. [ ] Email: `admin@theyool.com` 입력
3. [ ] Password: `.env.local`의 `ADMIN_PASSWORD` 입력
4. [ ] 로그인 성공 확인

### 6.2 대시보드 확인

- [ ] 관리자 대시보드 표시됨
- [ ] 통계 카드 표시 (성공사례, 칼럼, FAQ, Instagram 등)
- [ ] 빠른 작업 링크 표시

### 6.3 각 관리 페이지 접속 테스트

- [ ] `/admin/cases` - 성공사례 관리
- [ ] `/admin/blog` - 칼럼 관리
- [ ] `/admin/faqs` - FAQ 관리
- [ ] `/admin/instagram` - Instagram 관리
- [ ] `/admin/bookings` - 예약 관리 (신규)

---

## Step 7: 공개 페이지 테스트 🌐

### 7.1 콘텐츠 페이지 확인

- [ ] `/cases` - 성공사례 목록
- [ ] `/blog` - 변호사 칼럼 목록
- [ ] `/faq` - 이혼큐레이션 페이지
- [ ] `/` - 홈페이지 (의뢰인 후기 섹션)

### 7.2 상담 예약 페이지 확인 (신규)

- [ ] `/book-visit` - 방문 상담 예약
- [ ] `/book-video` - 화상 상담 예약
- [ ] 달력에서 날짜 선택 가능
- [ ] 시간 슬롯 표시 확인

### 7.3 데이터 표시 확인

- [ ] 성공사례가 카드 형태로 표시됨
- [ ] 칼럼이 목록으로 표시됨
- [ ] FAQ가 아코디언으로 표시됨
- [ ] 의뢰인 후기가 홈페이지에 표시됨

---

## Step 8: 최종 확인 ✅

### 8.1 데이터베이스 상태

- [ ] 모든 테이블이 정상 작동
- [ ] RLS 정책이 올바르게 적용됨
- [ ] 인덱스가 생성됨 (성능 최적화)

### 8.2 관리자 기능

- [ ] 로그인/로그아웃 정상 작동
- [ ] CRUD 작업 (생성, 조회, 수정, 삭제) 가능
- [ ] 이미지 업로드 정상 작동

### 8.3 사용자 기능

- [ ] 공개 페이지 접근 가능
- [ ] 게시되지 않은 콘텐츠는 보이지 않음 (RLS 정상 작동)
- [ ] 상담 신청 및 예약 가능

---

## 🎉 완료!

모든 체크리스트 항목이 완료되었다면 데이터베이스 설정이 완료되었습니다!

### 다음 단계

1. **콘텐츠 관리**:
   - 관리자 페이지에서 성공사례, 칼럼, FAQ 추가/수정
   - 의뢰인 후기 및 증빙 사진 업로드

2. **상담 예약 관리**:
   - 휴무일 설정 (`/admin/bookings`)
   - 예약 승인/거부

3. **SEO 최적화**:
   - 각 페이지의 메타데이터 확인
   - sitemap.xml 생성
   - robots.txt 설정

4. **배포**:
   - Vercel 또는 다른 호스팅 플랫폼에 배포
   - 환경 변수 설정 확인
   - 프로덕션 테스트

---

## 📚 참고 문서

- **빠른 시작**: `QUICK_START_DATABASE.md`
- **상세 가이드**: `SUPABASE_DATABASE_SETUP.md`
- **감사 요약**: `DATABASE_AUDIT_SUMMARY.md`
- **마이그레이션 README**: `supabase/migrations/README.md`

---

## 🆘 문제 해결

### 문제 1: 테이블이 생성되지 않음

**해결**:
1. Supabase SQL Editor에서 다시 SQL 실행
2. 에러 메시지 확인
3. `00_COMPLETE_DATABASE_SETUP.sql` 파일 내용 전체가 복사되었는지 확인

### 문제 2: 검증 스크립트 에러

**해결**:
1. `.env.local` 파일 확인
2. `SUPABASE_SERVICE_ROLE_KEY`가 올바른지 확인
3. 네트워크 연결 확인

### 문제 3: 권한 오류 (permission denied)

**해결**:
1. RLS 정책 확인
2. 관리자로 로그인했는지 확인
3. Service Role Key 사용 확인

---

**작성일**: 2025-11-19
**버전**: 1.0.0
**유지보수**: 새 기능 추가 시 이 체크리스트를 업데이트하세요.
