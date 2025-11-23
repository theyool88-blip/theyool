# 예약 시스템 설정 가이드

## 🎯 개요

법무법인 더율의 **방문 상담** 및 **화상 상담** 예약 시스템입니다.

### 주요 기능
- ✅ 5단계 예약 위저드 (상담 유형 → 날짜 → 시간 → 지점 → 개인정보)
- ✅ 실시간 시간대 가용성 확인
- ✅ 이메일 자동 알림 (의뢰인 + 관리자)
- ✅ 관리자 대시보드 (상태 관리, 필터링, CSV 내보내기)
- ✅ Row Level Security (RLS) 보안
- ✅ 모바일 최적화 UI

---

## 📋 필수 설정 (1회만 수행)

### 1단계: Supabase 데이터베이스 테이블 생성

**❗ 중요**: 이 단계를 완료해야 예약 시스템이 작동합니다.

#### 방법 A: Supabase Dashboard (권장)

1. **Supabase SQL Editor 열기**
   - URL: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new

2. **SQL 복사**
   ```bash
   # 터미널에서 SQL 출력
   node scripts/show-migration-sql.js
   ```

   또는 파일을 직접 열기:
   ```bash
   cat supabase/migrations/create_bookings_table.sql
   ```

3. **SQL Editor에 붙여넣고 실행**
   - 전체 SQL 복사
   - Supabase SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

4. **테이블 생성 확인**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL="https://kqqyipnlkmmprfgygauk.supabase.co" \
   SUPABASE_SERVICE_ROLE_KEY="your-key" \
   node scripts/verify-bookings-table.js
   ```

#### 방법 B: Supabase CLI (고급 사용자)

```bash
# Supabase CLI 로그인
npx supabase login

# 마이그레이션 푸시
npx supabase db push
```

---

## 📁 파일 구조

```
theyool/
├── app/
│   ├── booking/
│   │   └── page.tsx                          # 예약 페이지 (/booking)
│   ├── admin/
│   │   └── bookings/
│   │       └── page.tsx                      # 관리자 예약 관리
│   └── api/
│       ├── bookings/
│       │   ├── route.ts                      # POST - 예약 생성
│       │   └── available-slots/
│       │       └── route.ts                  # GET - 가용 시간대 조회
│       └── admin/
│           └── bookings/
│               ├── route.ts                  # GET - 예약 목록
│               └── [id]/
│                   └── route.ts              # PATCH/DELETE - 예약 수정/삭제
├── components/
│   └── features/
│       └── BookingForm.tsx                   # 5단계 예약 위저드 컴포넌트
├── lib/
│   ├── supabase/
│   │   └── bookings.ts                       # 예약 비즈니스 로직
│   └── email/
│       └── bookingTemplates.ts               # 이메일 템플릿
├── types/
│   └── booking.ts                            # TypeScript 타입 정의
└── supabase/
    └── migrations/
        └── create_bookings_table.sql         # 데이터베이스 스키마
```

---

## 🎨 사용 방법

### 의뢰인 예약 플로우

1. **예약 페이지 접속**
   ```
   http://localhost:3000/booking
   ```

2. **5단계 진행**
   - Step 1: 상담 유형 선택 (방문 / 화상)
   - Step 2: 희망 날짜 선택
   - Step 3: 희망 시간 선택 (실시간 가용성 확인)
   - Step 4: 방문 지점 선택 (방문 상담만 해당)
   - Step 5: 개인정보 입력 (이름, 전화번호, 이메일, 상담분야, 메시지)

3. **예약 완료**
   - 확인 이메일 자동 발송
   - 관리자에게 알림 이메일 발송

### 관리자 예약 관리

1. **관리자 로그인**
   ```
   http://localhost:3000/admin/login
   ```

2. **예약 관리 페이지**
   ```
   http://localhost:3000/admin/bookings
   ```

3. **기능**
   - 📊 통계 대시보드 (전체/대기중/확정/이번주 예약)
   - 🔍 필터링 (상태, 유형, 날짜 범위, 검색)
   - 📋 예약 목록 (테이블 뷰)
   - 👁️ 예약 상세 보기 (모달)
   - ✏️ 상태 변경 (대기중 → 확정 → 완료 / 취소)
   - 🔗 화상상담 링크 입력
   - 📝 관리자 메모 작성
   - 📥 CSV 내보내기
   - 🗑️ 예약 삭제

---

## 🔧 API 엔드포인트

### 공개 API

#### 1. 예약 생성
```typescript
POST /api/bookings
Content-Type: application/json

{
  "type": "visit" | "video",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@example.com",
  "category": "재산분할",
  "message": "상담 희망 내용...",
  "preferred_date": "2025-11-20",
  "preferred_time": "14:00",
  "office_location": "천안" | "평택"  // 방문 상담만 필수
}
```

#### 2. 가용 시간대 조회
```typescript
GET /api/bookings/available-slots?date=2025-11-20&office=천안

// Response
{
  "success": true,
  "slots": [
    { "time": "09:00", "available": true },
    { "time": "09:30", "available": true },
    { "time": "10:00", "available": false },
    // ...
  ]
}
```

### 관리자 API (인증 필요)

#### 3. 예약 목록 조회
```typescript
GET /api/admin/bookings?status=pending&type=visit&search=홍길동

// Response
{
  "success": true,
  "bookings": [ /* 예약 배열 */ ],
  "total": 42
}
```

#### 4. 예약 수정
```typescript
PATCH /api/admin/bookings/[id]
Content-Type: application/json

{
  "status": "confirmed",
  "video_link": "https://zoom.us/j/123456789",
  "admin_notes": "내부 메모..."
}
```

#### 5. 예약 삭제
```typescript
DELETE /api/admin/bookings/[id]
```

---

## 📧 이메일 알림

### 환경 변수 설정

`.env.local`에 Resend API 키 추가:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### 이메일 템플릿

1. **의뢰인 확인 이메일**
   - 제목: "법무법인 더율 상담 예약 확인"
   - 내용: 예약 정보, 준비사항, 연락처

2. **관리자 알림 이메일**
   - 제목: "새로운 상담 예약 - [이름]님"
   - 내용: 예약 상세, 의뢰인 정보, 관리 링크

3. **확정 이메일** (관리자가 확정 시 자동 발송)
   - 화상 상담: 화상 링크 포함
   - 방문 상담: 오시는 길 안내

---

## 🕐 시간대 설정

### 영업 시간
- **평일**: 09:00 ~ 18:00
- **점심 시간**: 12:00 ~ 13:00 (예약 불가)
- **주말/공휴일**: 예약 불가

### 시간 단위
- 30분 단위 (09:00, 09:30, 10:00, ...)

### 시간대 코드 위치
```typescript
// lib/supabase/bookings.ts
export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 18;
  const lunchStart = 12;
  const lunchEnd = 13;

  // 시간대 생성 로직...
}
```

---

## 🔒 보안 (Row Level Security)

### RLS 정책

1. **공개 (public)**
   - INSERT만 허용 (예약 생성)
   - SELECT/UPDATE/DELETE 불가

2. **인증된 사용자 (authenticated)**
   - 모든 작업 허용 (SELECT/UPDATE/DELETE)
   - 관리자만 로그인 가능

### 테이블 스키마
```sql
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- 예약 정보
  type TEXT NOT NULL CHECK (type IN ('visit', 'video')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),

  -- 의뢰인 정보
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,

  -- 일정 정보
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  office_location TEXT CHECK (office_location IN ('천안', '평택')),

  -- 관리 정보
  video_link TEXT,
  admin_notes TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);
```

---

## 🧪 테스트

### 1. 예약 생성 테스트
```bash
# 테스트 스크립트 실행
node scripts/test-booking-api.js
```

### 2. 수동 테스트
```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 테스트
open http://localhost:3000/booking
```

### 3. 테이블 확인
```bash
NEXT_PUBLIC_SUPABASE_URL="https://kqqyipnlkmmprfgygauk.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="your-key" \
node scripts/verify-bookings-table.js
```

---

## 🚀 프로덕션 배포

### 체크리스트

- [ ] Supabase 테이블 생성 완료
- [ ] `.env.local` 환경 변수 설정
- [ ] Resend API 키 설정
- [ ] 이메일 템플릿 테스트
- [ ] 예약 플로우 전체 테스트
- [ ] 관리자 페이지 접근 테스트
- [ ] 모바일 UI 테스트
- [ ] RLS 정책 확인
- [ ] 프로덕션 환경 변수 설정

### Vercel 환경 변수
```bash
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=re_...
ADMIN_EMAIL=admin@theyool.com
ADMIN_PASSWORD=...
```

---

## 📊 모니터링

### Supabase Dashboard
- 테이블 데이터: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/editor
- API 로그: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/logs

### Vercel Analytics
- 페이지 조회수
- 예약 전환율
- 오류 추적

---

## 🆘 문제 해결

### 문제: "relation public.bookings does not exist"
**해결**: Supabase에서 마이그레이션 SQL을 실행하지 않았습니다.
```bash
node scripts/show-migration-sql.js
# SQL을 복사하여 Supabase Dashboard에서 실행
```

### 문제: "Could not find the function public.exec_sql"
**해결**: Supabase는 보안상 DDL 실행 RPC를 제공하지 않습니다. Dashboard에서 수동 실행 필요.

### 문제: 이메일이 발송되지 않음
**해결**:
1. `.env.local`에 `RESEND_API_KEY` 설정 확인
2. Resend Dashboard에서 도메인 인증 확인
3. 개발 중에는 인증된 이메일로만 발송 가능

### 문제: 시간대가 표시되지 않음
**해결**:
1. 날짜가 선택되었는지 확인
2. API 엔드포인트 응답 확인: `/api/bookings/available-slots`
3. 브라우저 콘솔에서 에러 확인

---

## 📚 추가 문서

- [API 상세 문서](./BOOKING_SYSTEM_README.md)
- [구현 가이드](./BOOKING_IMPLEMENTATION_GUIDE.md)
- [빠른 시작](./BOOKING_QUICK_START.md)

---

## 💡 추후 개선 사항

- [ ] Google Calendar 연동
- [ ] 예약 수정/취소 기능 (의뢰인)
- [ ] SMS 알림 추가
- [ ] 자동 리마인더 (1일 전)
- [ ] 예약 가능한 시간대 동적 설정 (관리자)
- [ ] 반복 예약 기능
- [ ] 대기자 명단

---

**Last Updated**: 2025-11-19
**Version**: 1.0.0
