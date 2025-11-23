# 빠른 시작: Supabase 데이터베이스 설정

**소요 시간**: 약 5분

---

## 단계별 가이드

### 1️⃣ Supabase Dashboard 열기

```
https://app.supabase.com
```

프로젝트: **법무법인 더율** 선택

### 2️⃣ SQL Editor로 이동

왼쪽 메뉴에서 **SQL Editor** 클릭

### 3️⃣ 완전한 설정 SQL 실행

1. 로컬 파일 열기:
   ```
   supabase/migrations/00_COMPLETE_DATABASE_SETUP.sql
   ```

2. **전체 내용 복사** (약 700줄)

3. Supabase SQL Editor에 **붙여넣기**

4. 우측 상단 **"Run"** 버튼 클릭 ✅

5. 완료 메시지 확인:
   ```
   ✅ 법무법인 더율 데이터베이스 설정 완료!
   ```

### 4️⃣ 검증 (로컬 터미널)

```bash
node scripts/verify-database-setup.js
```

**예상 출력**:
```
✅ 모든 테이블과 컬럼이 정상적으로 설정되었습니다!

생성된 테이블 목록:
   1. cases (성공사례)
   2. blog_posts (변호사 칼럼)
   3. faqs (이혼큐레이션)
   4. instagram_posts (Instagram)
   5. testimonial_cases (의뢰인 후기)
   6. testimonial_evidence_photos (증빙 사진)
   7. bookings (상담 예약)
   8. blocked_times (휴무일/시간)
   9. consultations (상담 신청)
```

### 5️⃣ Storage 버킷 생성 (선택적)

Supabase Dashboard > **Storage** > **New bucket**

생성할 버킷:
- ✅ `blog-images` (Public)
- ✅ `case-images` (Public)
- ✅ `instagram-media` (Public)
- ✅ `testimonial-photos` (Public)

---

## 완료! 🎉

이제 다음을 시작할 수 있습니다:

1. **관리자 로그인**:
   ```
   http://localhost:3000/admin/login
   ```

2. **데이터 마이그레이션** (기존 데이터가 있는 경우):
   ```bash
   node scripts/migrate-faq-complete.js
   node scripts/migrate-instagram-complete.js
   node scripts/migrate-testimonials.js
   ```

3. **콘텐츠 관리**:
   - `/admin/cases` - 성공사례 관리
   - `/admin/blog` - 칼럼 작성
   - `/admin/faqs` - FAQ 관리
   - `/admin/instagram` - Instagram 게시물

---

## 문제 해결

### ❌ 테이블이 없다고 나옴

→ Step 3의 SQL을 다시 실행하세요 (안전하게 재실행 가능)

### ❌ 권한 오류 (permission denied)

→ `.env.local`에 올바른 `SUPABASE_SERVICE_ROLE_KEY` 설정 확인

### ❌ 일부 컬럼 누락

→ 전체 SQL 스크립트를 다시 실행하세요 (`IF NOT EXISTS`로 안전)

---

## 상세 문서

더 자세한 내용은 다음 파일 참조:
```
SUPABASE_DATABASE_SETUP.md
```

---

**작성일**: 2025-11-19
