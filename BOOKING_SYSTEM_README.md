# 법무법인 더율 - 상담 예약 시스템

## 개요

방문 상담 및 화상 상담 예약을 위한 완전한 예약 시스템입니다. 고객은 원하는 날짜와 시간에 상담을 예약할 수 있으며, 관리자는 예약을 관리하고 확정할 수 있습니다.

---

## 주요 기능

### 고객용 기능
- ✅ 방문 상담 예약 (천안/평택 사무소 선택)
- ✅ 화상 상담 예약
- ✅ 실시간 예약 가능 시간대 조회
- ✅ 예약 접수 확인 이메일 자동 발송
- ✅ 예약 확정 시 확정 이메일 발송 (화상 링크 포함)

### 관리자용 기능
- ✅ 모든 예약 목록 조회 (필터링 가능)
- ✅ 예약 상태 관리 (pending → confirmed → completed)
- ✅ 화상 상담 링크 추가
- ✅ 관리자 메모 작성
- ✅ 예약 취소/삭제
- ✅ 신규 예약 알림 이메일 수신

---

## 데이터베이스 설정

### 1. Supabase에서 테이블 생성

Supabase SQL Editor에서 다음 파일을 실행하세요:

```bash
supabase/migrations/create_bookings_table.sql
```

이 스크립트는 다음을 수행합니다:
- `bookings` 테이블 생성
- 인덱스 생성 (성능 최적화)
- Row Level Security (RLS) 정책 설정
- 자동 `updated_at` 업데이트 트리거 생성

### 2. 테이블 스키마

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,

  -- Booking details
  type TEXT ('visit' | 'video'),
  status TEXT ('pending' | 'confirmed' | 'cancelled' | 'completed'),

  -- Customer info
  name TEXT,
  phone TEXT,
  email TEXT,
  category TEXT,
  message TEXT,

  -- Scheduling
  preferred_date DATE,
  preferred_time TEXT,
  office_location TEXT ('천안' | '평택'),

  -- Admin fields
  video_link TEXT,
  admin_notes TEXT,
  confirmed_at TIMESTAMP,
  cancelled_at TIMESTAMP
);
```

---

## API 엔드포인트

### 1. POST /api/bookings
**예약 생성 (공개 API)**

```typescript
// Request
POST /api/bookings
Content-Type: application/json

{
  "type": "visit" | "video",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@example.com", // optional
  "category": "재산분할", // optional
  "message": "상담 관련 추가 요청사항", // optional
  "preferred_date": "2025-11-20",
  "preferred_time": "14:00",
  "office_location": "천안" // visit인 경우 필수
}

// Response (201 Created)
{
  "success": true,
  "booking": {
    "id": "uuid",
    "type": "visit",
    "status": "pending",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "email": "hong@example.com",
    "preferred_date": "2025-11-20",
    "preferred_time": "14:00",
    "office_location": "천안",
    "created_at": "2025-11-19T10:30:00Z",
    ...
  },
  "message": "상담 예약이 접수되었습니다. 담당자가 확인 후 연락드리겠습니다."
}
```

**자동 이메일 발송:**
- 고객에게 예약 접수 확인 이메일
- 관리자에게 신규 예약 알림 이메일

---

### 2. GET /api/bookings/available-slots
**예약 가능 시간대 조회 (공개 API)**

```typescript
// Request
GET /api/bookings/available-slots?date=2025-11-20&office=천안

// Response (200 OK)
{
  "success": true,
  "date": "2025-11-20",
  "slots": [
    { "time": "09:00", "available": true },
    { "time": "09:30", "available": true },
    { "time": "10:00", "available": false }, // 이미 예약됨
    { "time": "10:30", "available": true },
    ...
    { "time": "17:30", "available": true }
  ]
}
```

**운영 시간:**
- 평일: 09:00 - 18:00
- 점심시간: 12:00 - 13:00 (예약 불가)
- 주말/공휴일: 예약 불가
- 30분 단위 슬롯

---

### 3. GET /api/admin/bookings
**예약 목록 조회 (관리자 전용)**

```typescript
// Request
GET /api/admin/bookings?status=pending&type=visit&date_from=2025-11-20

// Query Parameters (모두 optional):
// - status: "pending" | "confirmed" | "cancelled" | "completed"
// - type: "visit" | "video"
// - office: "천안" | "평택"
// - date_from: "YYYY-MM-DD"
// - date_to: "YYYY-MM-DD"

// Response (200 OK)
{
  "success": true,
  "bookings": [
    {
      "id": "uuid",
      "type": "visit",
      "status": "pending",
      "name": "홍길동",
      "phone": "010-1234-5678",
      "preferred_date": "2025-11-20",
      "preferred_time": "14:00",
      "office_location": "천안",
      ...
    },
    ...
  ],
  "count": 5
}
```

---

### 4. GET /api/admin/bookings/[id]
**단일 예약 조회 (관리자 전용)**

```typescript
// Request
GET /api/admin/bookings/123e4567-e89b-12d3-a456-426614174000

// Response (200 OK)
{
  "success": true,
  "booking": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "type": "video",
    "status": "confirmed",
    "name": "김영희",
    "phone": "010-9876-5432",
    "email": "kim@example.com",
    "preferred_date": "2025-11-21",
    "preferred_time": "15:30",
    "video_link": "https://meet.google.com/abc-defg-hij",
    "admin_notes": "재산분할 사건, 긴급 상담 요청",
    "confirmed_at": "2025-11-19T11:00:00Z",
    ...
  }
}
```

---

### 5. PATCH /api/admin/bookings/[id]
**예약 업데이트 (관리자 전용)**

```typescript
// Request
PATCH /api/admin/bookings/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "status": "confirmed",
  "video_link": "https://meet.google.com/abc-defg-hij", // optional
  "admin_notes": "재산분할 관련 서류 준비 요청" // optional
}

// Response (200 OK)
{
  "success": true,
  "booking": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "status": "confirmed",
    "video_link": "https://meet.google.com/abc-defg-hij",
    "admin_notes": "재산분할 관련 서류 준비 요청",
    "confirmed_at": "2025-11-19T11:30:00Z",
    ...
  },
  "message": "예약이 업데이트되었습니다"
}
```

**자동 이메일 발송:**
- status가 `confirmed`로 변경되면 고객에게 확정 이메일 발송
- 화상 상담인 경우 video_link 포함

---

### 6. DELETE /api/admin/bookings/[id]
**예약 삭제 (관리자 전용)**

```typescript
// Request
DELETE /api/admin/bookings/123e4567-e89b-12d3-a456-426614174000

// Response (200 OK)
{
  "success": true,
  "message": "예약이 삭제되었습니다"
}
```

---

## 예약 상태 플로우

```
pending (접수)
   ↓
confirmed (확정) ← 관리자가 확정 처리
   ↓
completed (완료) ← 상담 완료 후

cancelled (취소) ← 언제든 취소 가능
```

**상태별 의미:**
- `pending`: 고객이 예약을 신청한 상태 (기본값)
- `confirmed`: 관리자가 예약을 확정한 상태 (이메일 발송)
- `completed`: 상담이 완료된 상태
- `cancelled`: 예약이 취소된 상태

---

## 이메일 템플릿

### 환경 변수 설정

`.env.local`에 다음 변수를 추가하세요:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site URL (for admin links in emails)
NEXT_PUBLIC_SITE_URL=https://theyool.com
```

### 발송되는 이메일

#### 1. 고객 - 예약 접수 확인
- **발송 시점**: 예약 생성 직후 (POST /api/bookings)
- **수신자**: 고객 (email 필드가 있는 경우)
- **내용**: 예약 정보, 연락 대기 안내

#### 2. 관리자 - 신규 예약 알림
- **발송 시점**: 예약 생성 직후 (POST /api/bookings)
- **수신자**: admin@theyool.com
- **내용**: 예약 상세 정보, 관리자 페이지 링크

#### 3. 고객 - 예약 확정
- **발송 시점**: status가 `confirmed`로 변경될 때
- **수신자**: 고객 (email 필드가 있는 경우)
- **내용**: 확정된 날짜/시간, 방문 안내 또는 화상 링크

---

## 프론트엔드 통합 예시

### 예약 폼 컴포넌트

```typescript
'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    type: 'visit',
    name: '',
    phone: '',
    email: '',
    category: '',
    message: '',
    preferred_date: '',
    preferred_time: '',
    office_location: '천안',
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available slots when date changes
  const handleDateChange = async (date: string) => {
    setFormData({ ...formData, preferred_date: date });

    try {
      const response = await fetch(
        `/api/bookings/available-slots?date=${date}&office=${formData.office_location}`
      );
      const data = await response.json();
      setAvailableSlots(data.slots);
    } catch (error) {
      console.error('Failed to fetch available slots:', error);
    }
  };

  // Submit booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('상담 예약이 접수되었습니다!');
        // Redirect or show success message
      } else {
        alert(data.error || '예약 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('예약 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
      >
        <option value="visit">방문 상담</option>
        <option value="video">화상 상담</option>
      </select>

      {formData.type === 'visit' && (
        <select
          value={formData.office_location}
          onChange={(e) => setFormData({ ...formData, office_location: e.target.value })}
        >
          <option value="천안">천안 사무소</option>
          <option value="평택">평택 사무소</option>
        </select>
      )}

      <input
        type="date"
        value={formData.preferred_date}
        onChange={(e) => handleDateChange(e.target.value)}
        required
      />

      <select
        value={formData.preferred_time}
        onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
        required
      >
        {availableSlots
          .filter((slot) => slot.available)
          .map((slot) => (
            <option key={slot.time} value={slot.time}>
              {slot.time}
            </option>
          ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? '처리 중...' : '예약하기'}
      </button>
    </form>
  );
}
```

---

## 관리자 페이지 통합

### 예약 목록 페이지

```typescript
// app/admin/bookings/page.tsx

import { getBookings, getBookingStats } from '@/lib/supabase/bookings';

export default async function AdminBookingsPage() {
  const bookings = await getBookings({ status: 'pending' });
  const stats = await getBookingStats();

  return (
    <div>
      <h1>예약 관리</h1>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-4 gap-4">
        <div>전체: {stats.total}</div>
        <div>대기중: {stats.pending}</div>
        <div>확정: {stats.confirmed}</div>
        <div>오늘: {stats.today}</div>
      </div>

      {/* Bookings Table */}
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>시간</th>
            <th>이름</th>
            <th>유형</th>
            <th>사무소</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.preferred_date}</td>
              <td>{booking.preferred_time}</td>
              <td>{booking.name}</td>
              <td>{booking.type === 'visit' ? '방문' : '화상'}</td>
              <td>{booking.office_location || '-'}</td>
              <td>{booking.status}</td>
              <td>
                <a href={`/admin/bookings/${booking.id}`}>상세</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### 예약 상세/수정 페이지

```typescript
'use client';

import { useState } from 'react';

export default function BookingDetailPage({ booking }) {
  const [status, setStatus] = useState(booking.status);
  const [videoLink, setVideoLink] = useState(booking.video_link || '');
  const [adminNotes, setAdminNotes] = useState(booking.admin_notes || '');

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          video_link: videoLink,
          admin_notes: adminNotes,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('예약이 업데이트되었습니다!');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div>
      <h1>예약 상세</h1>

      {/* Booking Info */}
      <div>
        <p>이름: {booking.name}</p>
        <p>전화번호: {booking.phone}</p>
        <p>날짜: {booking.preferred_date}</p>
        <p>시간: {booking.preferred_time}</p>
      </div>

      {/* Update Form */}
      <div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">대기중</option>
          <option value="confirmed">확정</option>
          <option value="completed">완료</option>
          <option value="cancelled">취소</option>
        </select>

        {booking.type === 'video' && (
          <input
            type="url"
            placeholder="화상 상담 링크"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
        )}

        <textarea
          placeholder="관리자 메모"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
        />

        <button onClick={handleUpdate}>업데이트</button>
      </div>
    </div>
  );
}
```

---

## 테스트

### 1. 데이터베이스 설정 확인

```bash
# Supabase SQL Editor에서 실행
SELECT * FROM bookings LIMIT 1;
```

### 2. API 테스트 (cURL)

```bash
# 1. Create booking
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "type": "visit",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "email": "hong@example.com",
    "preferred_date": "2025-11-20",
    "preferred_time": "14:00",
    "office_location": "천안"
  }'

# 2. Check available slots
curl http://localhost:3000/api/bookings/available-slots?date=2025-11-20&office=천안

# 3. Get bookings (admin - requires authentication)
curl http://localhost:3000/api/admin/bookings \
  -H "Cookie: admin-session=..."
```

---

## 보안 고려사항

### Row Level Security (RLS)
- ✅ 공개 사용자: INSERT만 가능 (예약 생성)
- ✅ 인증된 관리자: SELECT, UPDATE, DELETE 가능
- ✅ Supabase에서 자동으로 정책 적용

### 입력 검증
- ✅ Zod 스키마로 모든 입력 검증
- ✅ 전화번호 형식 검증
- ✅ 이메일 형식 검증
- ✅ 날짜/시간 형식 검증
- ✅ SQL Injection 방지 (Supabase 쿼리 빌더 사용)

### 인증
- ✅ 관리자 API는 `getSession()` 체크
- ✅ 401 Unauthorized 반환

---

## 다음 단계

### 1. 프론트엔드 페이지 구현
- [ ] `/booking` - 예약 신청 페이지
- [ ] `/admin/bookings` - 예약 관리 페이지
- [ ] `/admin/bookings/[id]` - 예약 상세 페이지

### 2. 추가 기능
- [ ] 예약 변경 기능 (고객이 직접 변경)
- [ ] SMS 알림 연동 (예: Twilio, CoolSMS)
- [ ] 캘린더 뷰 (달력으로 예약 현황 확인)
- [ ] Google Calendar 연동
- [ ] 통계 및 리포팅

### 3. 개선사항
- [ ] 예약 시 중복 방지 (동시 예약 처리)
- [ ] 예약 리마인더 (예약 1일 전 이메일)
- [ ] 대기자 목록 (예약 불가 시간대)
- [ ] 반복 예약 기능 (주기적 상담)

---

## 문제 해결

### 이메일이 발송되지 않아요
1. `.env.local`에 `RESEND_API_KEY`가 설정되어 있는지 확인
2. Resend 대시보드에서 API 키가 활성화되어 있는지 확인
3. `info@theyool.com` 도메인이 Resend에 인증되어 있는지 확인

### RLS 정책 오류가 발생해요
1. Supabase SQL Editor에서 RLS 정책이 제대로 생성되었는지 확인
2. 관리자 API 호출 시 인증 쿠키가 포함되어 있는지 확인
3. `lib/auth/auth.ts`의 `getSession()` 함수가 제대로 작동하는지 확인

### 예약 가능 시간대가 표시되지 않아요
1. `preferred_date`가 평일(월-금)인지 확인
2. 이미 예약된 시간대는 `available: false`로 표시됨
3. 점심시간(12:00-13:00)은 예약 불가

---

## 참고 자료

- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Resend Email API](https://resend.com/docs/send-with-nextjs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zod Validation](https://zod.dev/)

---

**구현 완료일**: 2025-11-19
**작성자**: Claude Code
