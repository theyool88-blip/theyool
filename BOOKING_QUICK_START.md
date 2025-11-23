# 예약 시스템 빠른 시작 가이드 🚀

## 1단계: Supabase 설정 (5분)

### SQL 실행
```sql
-- Supabase Dashboard > SQL Editor에서 실행
-- 파일: supabase/migrations/create_bookings_table.sql

CREATE TABLE bookings (...);
-- 전체 SQL 스크립트 복사/붙여넣기
```

### 확인
```sql
SELECT * FROM bookings LIMIT 1;
-- 테이블이 생성되었는지 확인
```

---

## 2단계: 환경 변수 설정 (2분)

`.env.local` 파일에 추가:

```bash
# Resend (이메일 발송)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 3단계: API 테스트 (3분)

```bash
# 터미널 1: 개발 서버
npm run dev

# 터미널 2: API 테스트
node scripts/test-booking-api.js
```

**예상 결과:**
```
✓ Create visit booking - SUCCESS (201)
✓ Get available slots - SUCCESS (200)
✗ Admin endpoints - FAILED (401) <- 정상 (인증 필요)
```

---

## API 빠른 참조

### 고객 API (공개)

#### 1. 예약 생성
```bash
POST /api/bookings

{
  "type": "visit",          # "visit" | "video"
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@example.com",
  "preferred_date": "2025-11-20",
  "preferred_time": "14:00",
  "office_location": "천안"  # visit인 경우 필수
}
```

#### 2. 예약 가능 시간 조회
```bash
GET /api/bookings/available-slots?date=2025-11-20&office=천안

Response:
{
  "slots": [
    { "time": "09:00", "available": true },
    { "time": "09:30", "available": false },
    ...
  ]
}
```

### 관리자 API (인증 필요)

#### 3. 예약 목록
```bash
GET /api/admin/bookings?status=pending
```

#### 4. 예약 상태 변경
```bash
PATCH /api/admin/bookings/{id}

{
  "status": "confirmed",
  "video_link": "https://meet.google.com/...",
  "admin_notes": "메모"
}
```

---

## 파일 구조

```
✅ 완료 (백엔드)
├── supabase/migrations/create_bookings_table.sql
├── lib/supabase/bookings.ts
├── app/api/bookings/route.ts
├── app/api/bookings/available-slots/route.ts
├── app/api/admin/bookings/route.ts
├── app/api/admin/bookings/[id]/route.ts
├── types/booking.ts
└── scripts/test-booking-api.js

⬜ 다음 작업 (프론트엔드)
├── app/booking/page.tsx
├── components/features/BookingForm.tsx
├── app/admin/bookings/page.tsx
└── components/admin/BookingsTable.tsx
```

---

## 예약 흐름

### 고객
1. `/booking` 페이지 접속
2. 유형 선택 (방문/화상)
3. 날짜 선택 → 예약 가능 시간 표시
4. 시간 선택 + 정보 입력
5. 예약 버튼 클릭
6. 확인 이메일 수신 (email 입력 시)

### 관리자
1. 신규 예약 알림 이메일 수신
2. `/admin/bookings` 접속
3. 예약 상세보기 클릭
4. 상태를 "확정"으로 변경
5. 화상 링크 입력 (화상 상담인 경우)
6. 저장 → 고객에게 확정 이메일 자동 발송

---

## 운영 시간

- **평일**: 09:00 - 18:00
- **점심**: 12:00 - 13:00 (예약 불가)
- **주말/공휴일**: 예약 불가
- **슬롯**: 30분 단위

---

## 예약 상태

```
pending    → 고객이 예약 신청
   ↓
confirmed  → 관리자가 확정 (이메일 발송)
   ↓
completed  → 상담 완료

cancelled  → 예약 취소 (언제든)
```

---

## 이메일 알림

### 자동 발송
1. **고객 - 예약 접수 확인** (예약 직후)
2. **관리자 - 신규 예약 알림** (예약 직후)
3. **고객 - 예약 확정** (confirmed로 변경 시)

### Resend 설정
1. https://resend.com 가입
2. API Key 생성
3. Domain 인증: `info@theyool.com`
4. `.env.local`에 키 추가

---

## cURL 테스트 예시

```bash
# 1. 예약 생성
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "type": "visit",
    "name": "테스트",
    "phone": "010-1234-5678",
    "email": "test@example.com",
    "preferred_date": "2025-11-20",
    "preferred_time": "14:00",
    "office_location": "천안"
  }'

# 2. 예약 가능 시간 조회
curl "http://localhost:3000/api/bookings/available-slots?date=2025-11-20&office=천안"

# 3. 관리자 - 예약 목록 (인증 필요)
curl http://localhost:3000/api/admin/bookings \
  -H "Cookie: admin-session=YOUR_SESSION_TOKEN"
```

---

## 문제 해결

### 이메일이 안 가요
- [ ] `RESEND_API_KEY` 설정 확인
- [ ] Resend 대시보드에서 도메인 인증 확인
- [ ] 콘솔에 에러 로그 확인

### 예약이 안 돼요
- [ ] Supabase 테이블 생성 확인 (`SELECT * FROM bookings`)
- [ ] RLS 정책 확인 (SQL 스크립트 전체 실행)
- [ ] 브라우저 콘솔에서 에러 확인

### 시간대가 안 나와요
- [ ] 날짜가 평일(월-금)인지 확인
- [ ] 과거 날짜가 아닌지 확인
- [ ] API 응답 확인 (`/api/bookings/available-slots`)

---

## 다음 작업 순서

1. ✅ Supabase 테이블 생성
2. ✅ 환경 변수 설정
3. ✅ API 테스트 실행
4. ⬜ 고객용 예약 페이지 구현 (`/app/booking/page.tsx`)
5. ⬜ 관리자 예약 관리 페이지 구현 (`/app/admin/bookings/`)
6. ⬜ 네비게이션 메뉴에 "상담 예약" 추가

---

## 전체 문서

- **완전한 문서**: `BOOKING_SYSTEM_README.md`
- **구현 가이드**: `BOOKING_IMPLEMENTATION_GUIDE.md`
- **이 빠른 가이드**: `BOOKING_QUICK_START.md`

---

**시작하기**: Supabase SQL 실행 → 환경 변수 설정 → `node scripts/test-booking-api.js`
