# 변호사 선택 기능 구현 완료

**구현 날짜**: 2025-11-20
**기능**: 예약 시스템에 변호사 선호도 선택 기능 추가

---

## 변경 사항 요약

예약(booking) 시스템에 고객이 희망하는 변호사를 선택할 수 있는 기능을 추가했습니다.

### 1. 데이터베이스 스키마 확장

**파일**: `/supabase/migrations/20251120_add_preferred_lawyer.sql`

```sql
-- Add preferred_lawyer column to bookings table
ALTER TABLE public.bookings
ADD COLUMN preferred_lawyer TEXT CHECK (preferred_lawyer IN ('육심원', '임은지'));

-- Add index for efficient filtering
CREATE INDEX idx_bookings_preferred_lawyer ON public.bookings(preferred_lawyer)
WHERE preferred_lawyer IS NOT NULL;
```

**특징**:
- `preferred_lawyer` 컬럼: TEXT 타입, NULL 허용 (선택사항)
- CHECK 제약조건: '육심원' 또는 '임은지'만 허용
- 인덱스: 변호사별 예약 조회 최적화

---

### 2. TypeScript 타입 정의 업데이트

**파일**: `/types/booking.ts`

#### 추가된 타입

```typescript
// 변호사 이름 타입
export type LawyerName = '육심원' | '임은지';

// Booking 인터페이스에 추가
export interface Booking {
  // ... 기존 필드
  preferred_lawyer?: LawyerName;
}

// CreateBookingInput에 추가
export interface CreateBookingInput {
  // ... 기존 필드
  preferred_lawyer?: LawyerName;
}

// 라벨 상수
export const LAWYER_LABELS: Record<LawyerName, string> = {
  육심원: '육심원 (대표변호사)',
  임은지: '임은지 (이혼전문변호사)',
};
```

---

### 3. API 검증 스키마 업데이트

**파일**: `/app/api/bookings/route.ts`

#### Zod 검증 스키마

```typescript
const createBookingSchema = z.object({
  // ... 기존 필드
  preferred_lawyer: z.enum(['육심원', '임은지']).optional(),
});
```

#### 이메일 알림 업데이트

**고객 확인 메일**과 **관리자 알림 메일** 모두에 희망 변호사 정보 표시:

```html
${booking.preferred_lawyer ? `
<div class="info-row">
  <span class="label">희망 변호사:</span>
  <span class="value">${booking.preferred_lawyer === '육심원' ? '육심원 (대표변호사)' : '임은지 (이혼전문변호사)'}</span>
</div>
` : ''}
```

---

## 마이그레이션 실행 방법

### 옵션 1: Supabase SQL Editor (권장)

1. Supabase 대시보드 접속: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new
2. 다음 SQL 실행:

```sql
-- Add preferred_lawyer column to bookings table
ALTER TABLE public.bookings
ADD COLUMN preferred_lawyer TEXT CHECK (preferred_lawyer IN ('육심원', '임은지'));

-- Add index for efficient filtering by lawyer
CREATE INDEX idx_bookings_preferred_lawyer ON public.bookings(preferred_lawyer)
WHERE preferred_lawyer IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.preferred_lawyer IS 'Optional preferred lawyer selection: 육심원 (대표변호사) or 임은지 (이혼전문변호사)';
```

3. "Run" 버튼 클릭
4. "Success. No rows returned" 메시지 확인

### 옵션 2: 스크립트 실행

```bash
node scripts/run-lawyer-migration-direct.js
```

위 스크립트는 실행할 SQL과 상세한 안내를 출력합니다.

---

## API 사용 예시

### 예약 생성 (변호사 선택 포함)

```typescript
POST /api/bookings

{
  "type": "visit",
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@example.com",
  "category": "재산분할",
  "message": "재산분할 관련 상담 요청드립니다",
  "preferred_date": "2025-11-25",
  "preferred_time": "14:00",
  "office_location": "천안",
  "preferred_lawyer": "임은지"  // ← 새로 추가된 필드
}
```

### 예약 생성 (변호사 선택 안함)

```typescript
POST /api/bookings

{
  "type": "video",
  "name": "김철수",
  "phone": "010-9876-5432",
  "preferred_date": "2025-11-26",
  "preferred_time": "10:00"
  // preferred_lawyer 생략 가능
}
```

---

## 프론트엔드 통합 가이드

### BookingForm 컴포넌트에서 사용

```typescript
import { LawyerName, LAWYER_LABELS } from '@/types/booking';

// 폼 상태
const [preferredLawyer, setPreferredLawyer] = useState<LawyerName | ''>('');

// UI 렌더링
<div className="form-group">
  <label>희망 변호사 (선택사항)</label>
  <select
    value={preferredLawyer}
    onChange={(e) => setPreferredLawyer(e.target.value as LawyerName | '')}
  >
    <option value="">지정 안함</option>
    <option value="육심원">{LAWYER_LABELS['육심원']}</option>
    <option value="임은지">{LAWYER_LABELS['임은지']}</option>
  </select>
</div>

// API 호출
const response = await fetch('/api/bookings', {
  method: 'POST',
  body: JSON.stringify({
    ...formData,
    preferred_lawyer: preferredLawyer || undefined,
  }),
});
```

---

## 관리자 페이지 통합 가이드

### 예약 목록에서 변호사 필터링

```typescript
import { LawyerName } from '@/types/booking';

// 필터 상태
const [lawyerFilter, setLawyerFilter] = useState<LawyerName | 'all'>('all');

// Supabase 쿼리
let query = supabase.from('bookings').select('*');

if (lawyerFilter !== 'all') {
  query = query.eq('preferred_lawyer', lawyerFilter);
}

const { data: bookings } = await query;
```

### 예약 상세 정보 표시

```typescript
import { LAWYER_LABELS } from '@/types/booking';

// 컴포넌트 렌더링
{booking.preferred_lawyer && (
  <div className="info-row">
    <span className="label">희망 변호사:</span>
    <span className="value">{LAWYER_LABELS[booking.preferred_lawyer]}</span>
  </div>
)}
```

---

## 데이터베이스 스키마 (업데이트 후)

```sql
public.bookings
├── id (UUID, PRIMARY KEY)
├── created_at (TIMESTAMP WITH TIME ZONE)
├── updated_at (TIMESTAMP WITH TIME ZONE)
├── type (TEXT) -- 'visit' | 'video'
├── status (TEXT) -- 'pending' | 'confirmed' | 'cancelled' | 'completed'
├── name (TEXT)
├── phone (TEXT)
├── email (TEXT, nullable)
├── category (TEXT, nullable)
├── message (TEXT, nullable)
├── preferred_date (DATE)
├── preferred_time (TEXT)
├── office_location (TEXT, nullable) -- '천안' | '평택'
├── preferred_lawyer (TEXT, nullable) -- ✨ NEW: '육심원' | '임은지'
├── video_link (TEXT, nullable)
├── admin_notes (TEXT, nullable)
├── confirmed_at (TIMESTAMP WITH TIME ZONE, nullable)
└── cancelled_at (TIMESTAMP WITH TIME ZONE, nullable)
```

---

## 인덱스

```sql
idx_bookings_status              -- (status)
idx_bookings_type                -- (type)
idx_bookings_preferred_date      -- (preferred_date)
idx_bookings_created_at          -- (created_at DESC)
idx_bookings_status_date         -- (status, preferred_date)
idx_bookings_preferred_lawyer    -- (preferred_lawyer) WHERE preferred_lawyer IS NOT NULL ✨ NEW
```

---

## 테스트 체크리스트

- [ ] Supabase 마이그레이션 실행 완료
- [ ] 예약 생성 API 테스트 (변호사 선택 O)
- [ ] 예약 생성 API 테스트 (변호사 선택 X)
- [ ] 잘못된 변호사 이름 입력 시 검증 오류 확인
- [ ] 고객 확인 메일에 변호사 정보 표시 확인
- [ ] 관리자 알림 메일에 변호사 정보 표시 확인
- [ ] BookingForm 컴포넌트에 변호사 선택 UI 추가
- [ ] 관리자 페이지에서 변호사별 필터링 기능 추가
- [ ] 예약 상세 페이지에 변호사 정보 표시

---

## 변호사 정보

| 이름 | 직책 | 값 |
|------|------|-----|
| 육심원 | 대표변호사 | `'육심원'` |
| 임은지 | 이혼전문변호사 | `'임은지'` |

---

## 보안 및 검증

### 데이터베이스 레벨
- CHECK 제약조건으로 유효한 값만 허용
- NULL 허용 (선택사항)

### API 레벨
- Zod enum 검증으로 타입 안전성 보장
- TypeScript 타입 시스템으로 컴파일 타임 오류 방지

### 프론트엔드 레벨
- LawyerName 타입으로 자동완성 지원
- LAWYER_LABELS 상수로 일관된 표시 보장

---

## 향후 확장 가능성

1. **변호사별 일정 관리**
   - blocked_times 테이블에 lawyer 컬럼 추가
   - 변호사별로 예약 가능 시간 관리

2. **변호사 프로필 테이블**
   - lawyers 테이블 생성
   - 전문 분야, 경력, 프로필 이미지 등 관리

3. **자동 배정 로직**
   - 변호사 선택 안한 경우 자동 배정
   - 전문 분야와 일정을 고려한 최적 매칭

4. **통계 및 분석**
   - 변호사별 예약 통계
   - 선호도 분석
   - 업무량 밸런싱

---

## 문의 및 지원

이 기능에 대한 문의사항이 있으시면 개발팀에 연락해주세요.

**마지막 업데이트**: 2025-11-20
