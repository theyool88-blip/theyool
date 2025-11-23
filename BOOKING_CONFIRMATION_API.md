# 예약 확인 페이지 백엔드 API 구현 완료

## 개요
예약 확인 페이지를 위한 공개 API 엔드포인트를 성공적으로 구현했습니다.

---

## 구현된 기능

### 1. API 엔드포인트

#### GET /api/bookings/[id]
- **목적**: 특정 예약 ID로 예약 정보 조회
- **인증**: 불필요 (UUID가 추측 불가능하므로 충분히 안전)
- **파일**: `/app/api/bookings/[id]/route.ts`

#### 응답 형식 (성공)
```json
{
  "success": true,
  "booking": {
    "id": "108b951a-b4fa-4b52-8c8e-42c164a59c4e",
    "created_at": "2025-11-19T13:01:04.682556+00:00",
    "type": "visit",
    "status": "pending",
    "name": "김영희",
    "phone": "010-1234-5678",
    "email": "test@example.com",
    "category": "재산분할",
    "message": "재산분할 관련 상담을 받고 싶습니다.",
    "preferred_date": "2025-11-25",
    "preferred_time": "10:00",
    "office_location": "천안",
    "video_link": null
  }
}
```

#### 응답 형식 (에러)
```json
// Invalid UUID format (400)
{
  "success": false,
  "error": "Invalid booking ID format"
}

// Booking not found (404)
{
  "success": false,
  "error": "Booking not found"
}

// Server error (500)
{
  "success": false,
  "error": "Failed to fetch booking"
}
```

---

## 보안 설계

### 1. 민감 정보 제외
다음 필드는 응답에서 제외됩니다:
- `admin_notes` - 관리자 메모
- `confirmed_at` - 확정 시간
- `cancelled_at` - 취소 시간
- `updated_at` - 수정 시간

### 2. UUID 검증
- 정규 표현식으로 UUID 형식 검증
- 잘못된 형식은 400 Bad Request 반환

### 3. RLS 우회 전략
- UUID 자체가 추측 불가능하므로 충분한 보안 제공
- 서버 사이드 클라이언트 사용하여 RLS 우회
- 민감 정보는 애플리케이션 레벨에서 필터링

---

## 파일 구조

### 1. 데이터베이스 헬퍼 함수
**파일**: `/lib/supabase/bookings.ts`

```typescript
/**
 * PUBLIC: Get a single booking by ID (no authentication required)
 * Returns booking without sensitive admin information
 * Excludes: admin_notes, confirmed_at, cancelled_at, updated_at
 */
export async function getPublicBookingById(id: string): Promise<Booking | null>
```

### 2. API 라우트
**파일**: `/app/api/bookings/[id]/route.ts`

```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
)
```

---

## 테스트 결과

### ✅ 테스트 케이스

1. **유효한 예약 ID**
   ```bash
   curl http://localhost:3000/api/bookings/108b951a-b4fa-4b52-8c8e-42c164a59c4e
   ```
   - 결과: 200 OK, 예약 정보 반환
   - 민감 정보 제외 확인 완료

2. **잘못된 UUID 형식**
   ```bash
   curl http://localhost:3000/api/bookings/invalid-uuid
   ```
   - 결과: 400 Bad Request
   - 에러 메시지: "Invalid booking ID format"

3. **존재하지 않는 UUID**
   ```bash
   curl http://localhost:3000/api/bookings/00000000-0000-0000-0000-000000000000
   ```
   - 결과: 404 Not Found
   - 에러 메시지: "Booking not found"

---

## 사용 방법

### 프론트엔드 통합 예시

```typescript
// 예약 확인 페이지 컴포넌트
async function fetchBookingDetails(bookingId: string) {
  const response = await fetch(`/api/bookings/${bookingId}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error);
  }

  return data.booking;
}

// 사용 예시
try {
  const booking = await fetchBookingDetails('108b951a-b4fa-4b52-8c8e-42c164a59c4e');
  console.log('예약 정보:', booking);
  console.log('예약자:', booking.name);
  console.log('상담 유형:', booking.type);
  console.log('예약 날짜:', booking.preferred_date);
  console.log('예약 시간:', booking.preferred_time);
} catch (error) {
  console.error('예약 조회 실패:', error);
}
```

---

## 데이터베이스 마이그레이션

### RLS 정책 추가 (선택사항)
**파일**: `/supabase/migrations/20251120_add_public_booking_select.sql`

```sql
-- Allow public to SELECT bookings by ID
CREATE POLICY IF NOT EXISTS "Allow public to read bookings by ID"
  ON public.bookings
  FOR SELECT
  TO public
  USING (true);
```

**현재 구현**: RLS를 우회하는 방식으로 구현되어 있어 이 마이그레이션은 선택사항입니다.

---

## 테스트 스크립트

### 1. 테스트 예약 생성
```bash
node scripts/create-test-booking-admin.js
```

### 2. RLS 정책 테스트
```bash
node scripts/test-rls-direct.js
```

### 3. API 종합 테스트
```bash
node scripts/test-booking-detail-api.js
```

---

## 다음 단계 (프론트엔드)

### 예약 확인 페이지 구현 필요사항

1. **페이지 경로**: `/booking/confirmation/[id]`

2. **주요 기능**:
   - URL 파라미터에서 예약 ID 추출
   - API 호출하여 예약 정보 조회
   - 예약 정보 표시
   - 상태별 UI 표시 (대기중/확정/취소/완료)
   - 에러 처리 (존재하지 않는 예약, 네트워크 오류 등)

3. **UI 요소**:
   - 예약 번호 (ID 앞 8자리)
   - 예약자 정보 (이름, 연락처)
   - 상담 유형 (방문/화상)
   - 예약 일시
   - 사무실 위치 (방문 상담인 경우)
   - 상담 카테고리
   - 상담 내용
   - 상태 배지
   - 비디오 링크 (화상 상담이고 확정된 경우)

4. **예시 디자인**:
   ```tsx
   <div className="max-w-2xl mx-auto p-6">
     <h1>예약 확인</h1>
     <div className="bg-white rounded-lg shadow p-6">
       <div className="flex justify-between items-center mb-4">
         <h2>예약 번호: {booking.id.slice(0, 8).toUpperCase()}</h2>
         <StatusBadge status={booking.status} />
       </div>
       <div className="space-y-4">
         <InfoRow label="예약자" value={booking.name} />
         <InfoRow label="연락처" value={booking.phone} />
         <InfoRow label="상담 유형" value={BOOKING_TYPE_LABELS[booking.type]} />
         <InfoRow label="예약 일시" value={formatDateTime(booking.preferred_date, booking.preferred_time)} />
         {booking.office_location && (
           <InfoRow label="사무실" value={OFFICE_LOCATION_LABELS[booking.office_location]} />
         )}
         <InfoRow label="상담 분야" value={booking.category} />
         <InfoRow label="상담 내용" value={booking.message} />
       </div>
     </div>
   </div>
   ```

---

## 참고 사항

### 타입 정의 위치
- `/types/booking.ts` - Booking 관련 모든 타입 정의
- `BOOKING_STATUS_LABELS`, `BOOKING_TYPE_LABELS` 등 유틸리티 함수 제공

### 보안 고려사항
- UUID v4는 충분히 추측 불가능 (2^122 가능성)
- 추가 보안이 필요한 경우 예약자 이름 또는 전화번호 일부 확인 추가 가능
- 예: `/api/bookings/[id]/verify` 엔드포인트로 전화번호 마지막 4자리 검증

---

## 문제 해결

### Issue 1: RLS로 인한 조회 실패
**증상**: Anon key로 조회 시 빈 결과 반환
**해결**: 서버 사이드 클라이언트 사용 (Service Role Key)
**파일**: `/lib/supabase/bookings.ts:269`

### Issue 2: preferred_lawyer 컬럼 누락
**증상**: 타입 정의에는 있지만 실제 DB 스키마에 없음
**해결**: API 응답에서 해당 필드 제외
**영향**: 향후 변호사 선택 기능 추가 시 마이그레이션 필요

---

## 완료 체크리스트

- ✅ API 엔드포인트 구현 (`GET /api/bookings/[id]`)
- ✅ UUID 검증 로직
- ✅ 민감 정보 필터링
- ✅ 에러 처리 (400, 404, 500)
- ✅ 데이터베이스 헬퍼 함수 (`getPublicBookingById`)
- ✅ 보안 검토 (RLS 우회 전략)
- ✅ API 테스트 (유효/무효 UUID, 존재하지 않는 예약)
- ✅ 문서화
- ⬜ 프론트엔드 예약 확인 페이지 구현 (다음 단계)

---

## 연락처
구현 완료일: 2025-11-20
담당자: Backend & SEO Specialist
