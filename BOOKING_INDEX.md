# 예약 시스템 - 파일 인덱스

## 문서 (Documentation)

| 파일 | 용도 | 독자 |
|------|------|------|
| `BOOKING_QUICK_START.md` | 빠른 시작 가이드 (10분 셋업) | 개발자 |
| `BOOKING_SYSTEM_README.md` | 완전한 시스템 문서 (API, 이메일, 예시) | 개발자, 유지보수 |
| `BOOKING_IMPLEMENTATION_GUIDE.md` | 프론트엔드 구현 가이드 | 프론트엔드 개발자 |
| `BOOKING_SYSTEM_SUMMARY.md` | 구현 완료 요약 | PM, 개발팀 리드 |

## 추천 읽기 순서

1. **처음 시작**: `BOOKING_QUICK_START.md` (10분)
2. **API 이해**: `BOOKING_SYSTEM_README.md` (30분)
3. **프론트엔드 구현**: `BOOKING_IMPLEMENTATION_GUIDE.md` (1시간)
4. **전체 요약**: `BOOKING_SYSTEM_SUMMARY.md` (5분)

---

## 구현 파일 (Implementation)

### 데이터베이스
```
supabase/migrations/
└── create_bookings_table.sql         # 테이블 생성 SQL
```

### 백엔드 로직
```
lib/supabase/
└── bookings.ts                       # CRUD 함수, 비즈니스 로직
```

### API 엔드포인트
```
app/api/
├── bookings/
│   ├── route.ts                      # POST: 예약 생성 (공개)
│   └── available-slots/
│       └── route.ts                  # GET: 예약 가능 시간 (공개)
└── admin/
    └── bookings/
        ├── route.ts                  # GET: 예약 목록 (관리자)
        └── [id]/
            └── route.ts              # GET/PATCH/DELETE: 예약 관리 (관리자)
```

### 타입 정의
```
types/
└── booking.ts                        # TypeScript 타입, 유틸리티
```

### 테스트
```
scripts/
└── test-booking-api.js               # API 자동 테스트 스크립트
```

---

## 다음 구현 파일 (Frontend - TODO)

### 고객용 페이지
```
app/booking/
└── page.tsx                          # 예약 신청 페이지
```

### 관리자 페이지
```
app/admin/bookings/
├── page.tsx                          # 예약 목록
└── [id]/
    └── page.tsx                      # 예약 상세/수정
```

### 컴포넌트
```
components/
├── features/
│   └── BookingForm.tsx               # 예약 폼
└── admin/
    ├── BookingsTable.tsx             # 예약 목록 테이블
    ├── BookingDetail.tsx             # 예약 상세
    └── BookingFilters.tsx            # 필터 UI
```

---

## API 빠른 참조

### 공개 API

| 메서드 | 경로 | 설명 | 파일 |
|--------|------|------|------|
| POST | `/api/bookings` | 예약 생성 | `app/api/bookings/route.ts` |
| GET | `/api/bookings/available-slots` | 예약 가능 시간 조회 | `app/api/bookings/available-slots/route.ts` |

### 관리자 API (인증 필요)

| 메서드 | 경로 | 설명 | 파일 |
|--------|------|------|------|
| GET | `/api/admin/bookings` | 예약 목록 | `app/api/admin/bookings/route.ts` |
| GET | `/api/admin/bookings/[id]` | 예약 상세 | `app/api/admin/bookings/[id]/route.ts` |
| PATCH | `/api/admin/bookings/[id]` | 예약 수정 | `app/api/admin/bookings/[id]/route.ts` |
| DELETE | `/api/admin/bookings/[id]` | 예약 삭제 | `app/api/admin/bookings/[id]/route.ts` |

---

## 함수 빠른 참조

### 공개 함수 (`lib/supabase/bookings.ts`)

```typescript
// 예약 생성 (공개)
createBooking(input: CreateBookingInput): Promise<Booking>

// 예약 가능 시간 조회 (공개)
getAvailableSlots(date: string, office?: string): Promise<AvailableSlotsResponse>

// 시간 슬롯 생성
generateTimeSlots(): string[]

// 평일 체크
isWeekday(date: Date): boolean
```

### 관리자 함수 (`lib/supabase/bookings.ts`)

```typescript
// 예약 목록 조회
getBookings(filters?: BookingFilters): Promise<Booking[]>

// 단일 예약 조회
getBookingById(id: string): Promise<Booking | null>

// 예약 수정
updateBooking(id: string, input: UpdateBookingInput): Promise<Booking>

// 예약 삭제
deleteBooking(id: string): Promise<void>

// 통계 조회
getBookingStats(): Promise<BookingStats>
```

---

## 타입 빠른 참조 (`types/booking.ts`)

### 핵심 타입
```typescript
type BookingType = 'visit' | 'video'
type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
type OfficeLocation = '천안' | '평택'

interface Booking { ... }
interface CreateBookingInput { ... }
interface UpdateBookingInput { ... }
interface TimeSlot { time: string; available: boolean }
```

### 유틸리티 함수
```typescript
isValidPhone(phone: string): boolean
isValidEmail(email: string): boolean
isValidDate(dateString: string): boolean
isValidTime(timeString: string): boolean
isWeekday(date: Date): boolean
formatDate(dateString: string): string
generateTimeSlots(): string[]
```

---

## 환경 변수

```bash
# .env.local

# Supabase (이미 설정됨)
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***

# Resend (이메일 발송) - 추가 필요
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site URL (이메일 링크) - 추가 필요
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 빠른 명령어

### 개발
```bash
# 개발 서버 시작
npm run dev

# API 테스트
node scripts/test-booking-api.js
```

### 데이터베이스
```sql
-- Supabase Dashboard > SQL Editor

-- 1. 테이블 생성
-- 파일: supabase/migrations/create_bookings_table.sql 복사

-- 2. 확인
SELECT * FROM bookings LIMIT 5;

-- 3. 통계
SELECT status, COUNT(*) FROM bookings GROUP BY status;
```

### API 테스트 (cURL)
```bash
# 예약 생성
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"type":"visit","name":"테스트","phone":"010-1234-5678","preferred_date":"2025-11-20","preferred_time":"14:00","office_location":"천안"}'

# 예약 가능 시간 조회
curl "http://localhost:3000/api/bookings/available-slots?date=2025-11-20&office=천안"
```

---

## 구현 진행 상태

### 완료 (2025-11-19)
- [x] 데이터베이스 스키마
- [x] 백엔드 함수 (CRUD)
- [x] 공개 API (예약 생성, 시간 조회)
- [x] 관리자 API (목록, 상세, 수정, 삭제)
- [x] 이메일 알림 (3종)
- [x] 입력 검증 (Zod)
- [x] 타입 시스템 (TypeScript)
- [x] 테스트 스크립트
- [x] 문서화 (4개 문서)

### 다음 작업
- [ ] Supabase 테이블 생성 (5분)
- [ ] 환경 변수 설정 (2분)
- [ ] API 테스트 실행 (3분)
- [ ] 고객용 예약 페이지 구현 (2시간)
- [ ] 관리자 예약 관리 페이지 구현 (3시간)
- [ ] 네비게이션 업데이트 (10분)

---

## 파일 크기

| 파일 | 크기 | LOC |
|------|------|-----|
| `create_bookings_table.sql` | ~3KB | ~130 |
| `lib/supabase/bookings.ts` | ~10KB | ~300 |
| `app/api/bookings/route.ts` | ~8KB | ~250 |
| `app/api/bookings/available-slots/route.ts` | ~1KB | ~50 |
| `app/api/admin/bookings/route.ts` | ~2KB | ~80 |
| `app/api/admin/bookings/[id]/route.ts` | ~10KB | ~300 |
| `types/booking.ts` | ~5KB | ~200 |
| `scripts/test-booking-api.js` | ~5KB | ~150 |
| **총계** | **~44KB** | **~1,460** |

---

## 통합 지점

### 기존 시스템과의 통합

1. **인증 시스템** (`lib/auth/auth.ts`)
   - `getSession()` 함수 사용
   - 관리자 API 보호

2. **Supabase Client** (`lib/supabase/client.ts`, `server.ts`)
   - 기존 클라이언트 재사용
   - RLS 정책 자동 적용

3. **관리자 레이아웃** (`app/admin/layout.tsx`)
   - 기존 레이아웃 사용
   - 네비게이션에 "예약 관리" 추가

4. **페이지 레이아웃** (`components/layouts/PageLayout.tsx`)
   - 고객용 페이지에 사용
   - 네비게이션에 "상담 예약" 추가

---

## 디버깅 체크리스트

### 예약 생성 실패
1. [ ] Supabase 테이블이 생성되었는지 확인
2. [ ] RLS 정책이 적용되었는지 확인
3. [ ] 환경 변수가 설정되었는지 확인
4. [ ] 브라우저 콘솔에서 에러 확인
5. [ ] 서버 로그에서 에러 확인

### 이메일 발송 실패
1. [ ] `RESEND_API_KEY`가 설정되었는지 확인
2. [ ] Resend 대시보드에서 도메인 인증 확인
3. [ ] 이메일 주소가 유효한지 확인
4. [ ] API 키 권한 확인

### 예약 가능 시간 조회 실패
1. [ ] 날짜 형식이 YYYY-MM-DD인지 확인
2. [ ] 평일(월-금)인지 확인
3. [ ] Supabase 연결 확인
4. [ ] API 응답 확인

---

## 성능 메트릭

### API 응답 시간 (예상)
- POST `/api/bookings`: ~500ms (이메일 포함)
- GET `/api/bookings/available-slots`: ~100ms
- GET `/api/admin/bookings`: ~200ms (100개 기준)
- PATCH `/api/admin/bookings/[id]`: ~300ms

### 데이터베이스 쿼리
- 인덱스로 최적화됨
- N+1 문제 없음
- 필요한 필드만 SELECT

---

## 보안 체크리스트

- [x] SQL Injection 방지
- [x] XSS 방지
- [x] CSRF 방지
- [x] 입력 검증
- [x] 인증 체크
- [x] RLS 정책
- [x] HTTPS 강제 (프로덕션)
- [x] Rate Limiting (Vercel/Supabase)

---

## 다음 버전 계획 (v2.0)

### 추가 기능
- [ ] 캘린더 뷰
- [ ] SMS 알림
- [ ] Google Calendar 연동
- [ ] 예약 변경 기능
- [ ] 대기자 목록
- [ ] 예약 리마인더

### 개선사항
- [ ] 실시간 예약 (WebSocket)
- [ ] AI 일정 최적화
- [ ] 자동 배정 (변호사별)
- [ ] 통계 대시보드 (차트)

---

**최종 업데이트**: 2025-11-19
**버전**: 1.0 (백엔드 완료)
**다음 마일스톤**: 프론트엔드 구현
