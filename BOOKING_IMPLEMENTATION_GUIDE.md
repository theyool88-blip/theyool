# 예약 시스템 구현 가이드

## 완료된 작업 ✅

### 1. 데이터베이스 스키마
- ✅ `supabase/migrations/create_bookings_table.sql` 생성
- ✅ Row Level Security (RLS) 정책 설정
- ✅ 인덱스 최적화
- ✅ 자동 `updated_at` 트리거

### 2. 백엔드 함수
- ✅ `/lib/supabase/bookings.ts` - 모든 CRUD 함수
- ✅ 시간 슬롯 생성 로직
- ✅ 예약 가능 여부 체크
- ✅ 통계 함수

### 3. API 엔드포인트
- ✅ `POST /api/bookings` - 예약 생성 (공개)
- ✅ `GET /api/bookings/available-slots` - 예약 가능 시간 조회 (공개)
- ✅ `GET /api/admin/bookings` - 예약 목록 (관리자)
- ✅ `GET /api/admin/bookings/[id]` - 예약 상세 (관리자)
- ✅ `PATCH /api/admin/bookings/[id]` - 예약 수정 (관리자)
- ✅ `DELETE /api/admin/bookings/[id]` - 예약 삭제 (관리자)

### 4. 이메일 알림
- ✅ 고객 예약 접수 확인 이메일
- ✅ 관리자 신규 예약 알림 이메일
- ✅ 고객 예약 확정 이메일 (화상 링크 포함)

### 5. TypeScript 타입
- ✅ `/types/booking.ts` - 모든 타입 정의
- ✅ 타입 가드 함수
- ✅ 유틸리티 함수

### 6. 문서화
- ✅ `BOOKING_SYSTEM_README.md` - 완전한 시스템 문서
- ✅ API 사용 예시
- ✅ 프론트엔드 통합 예시

### 7. 테스트 스크립트
- ✅ `scripts/test-booking-api.js` - API 테스트 자동화

---

## 다음 작업 (프론트엔드)

### 1. Supabase 데이터베이스 설정 (5분)

```bash
# 1. Supabase Dashboard 접속
# 2. SQL Editor로 이동
# 3. 다음 파일의 내용을 복사하여 실행:
supabase/migrations/create_bookings_table.sql
```

**확인:**
```sql
SELECT * FROM bookings LIMIT 1;
```

---

### 2. 환경 변수 설정 (2분)

`.env.local`에 추가:

```bash
# Resend API Key (이메일 발송용)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site URL (이메일 내 링크용)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Resend 설정:**
1. https://resend.com 가입
2. API Keys 생성
3. Domain 인증: `info@theyool.com`

---

### 3. API 테스트 (5분)

```bash
# 개발 서버 시작
npm run dev

# 다른 터미널에서 테스트 실행
node scripts/test-booking-api.js
```

**예상 결과:**
- ✅ 예약 생성 성공 (201)
- ✅ 시간대 조회 성공 (200)
- ✅ 관리자 API는 401 (인증 필요)

---

### 4. 고객용 예약 페이지 구현

#### A. 기본 예약 페이지 생성

**파일:** `/app/booking/page.tsx`

```typescript
import BookingForm from '@/components/features/BookingForm';
import PageLayout from '@/components/layouts/PageLayout';

export const metadata = {
  title: '상담 예약 | 법무법인 더율',
  description: '법무법인 더율의 방문 상담 및 화상 상담을 예약하세요.',
};

export default function BookingPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">상담 예약</h1>
          <p className="text-xl text-gray-600">
            방문 상담 또는 화상 상담을 선택하여 예약하세요
          </p>
        </div>

        <BookingForm />

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-pink-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">방문 상담</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 천안/평택 사무소 선택 가능</li>
              <li>✓ 대면 상담으로 자세한 논의</li>
              <li>✓ 관련 서류 직접 검토</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">화상 상담</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 장소 제약 없이 편리하게</li>
              <li>✓ 화상 링크로 간편 접속</li>
              <li>✓ 바쁜 일정에도 상담 가능</li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
```

#### B. 예약 폼 컴포넌트 생성

**파일:** `/components/features/BookingForm.tsx`

<details>
<summary>클릭하여 전체 코드 보기 (약 300줄)</summary>

```typescript
'use client';

import { useState, useEffect } from 'react';
import { BookingType, OfficeLocation, BOOKING_CATEGORIES } from '@/types/booking';

export default function BookingForm() {
  // Form state
  const [formData, setFormData] = useState({
    type: 'visit' as BookingType,
    name: '',
    phone: '',
    email: '',
    category: '',
    message: '',
    preferred_date: '',
    preferred_time: '',
    office_location: '천안' as OfficeLocation,
  });

  // UI state
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch available slots when date or office changes
  useEffect(() => {
    if (formData.preferred_date) {
      fetchAvailableSlots();
    }
  }, [formData.preferred_date, formData.office_location, formData.type]);

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      const params = new URLSearchParams({
        date: formData.preferred_date,
      });

      if (formData.type === 'visit') {
        params.append('office', formData.office_location);
      }

      const response = await fetch(`/api/bookings/available-slots?${params}`);
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setError('예약 가능 시간을 불러올 수 없습니다.');
      }
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setError('예약 가능 시간을 불러올 수 없습니다.');
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Reset form
        setFormData({
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
        setAvailableSlots([]);
      } else {
        setError(data.error || '예약 처리 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('예약 처리 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {success ? (
        <div className="text-center py-12">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-4">예약이 접수되었습니다!</h2>
          <p className="text-gray-600 mb-6">
            담당자가 확인 후 연락드리겠습니다.
            {formData.email && ' 이메일로 예약 확인서가 발송되었습니다.'}
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600"
          >
            새 예약하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Booking Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              상담 유형 <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'visit' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'visit'
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-300 hover:border-pink-300'
                }`}
              >
                <div className="text-2xl mb-2">🏢</div>
                <div className="font-semibold">방문 상담</div>
                <div className="text-sm text-gray-600">사무소 방문</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'video' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'video'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold">화상 상담</div>
                <div className="text-sm text-gray-600">온라인 화상</div>
              </button>
            </div>
          </div>

          {/* Office Location (for visit only) */}
          {formData.type === 'visit' && (
            <div>
              <label className="block text-sm font-medium mb-2">
                사무소 선택 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(['천안', '평택'] as OfficeLocation[]).map((office) => (
                  <button
                    key={office}
                    type="button"
                    onClick={() => setFormData({ ...formData, office_location: office })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.office_location === office
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    {office} 사무소
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="홍길동"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="010-1234-5678"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              이메일 (선택)
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="hong@example.com"
            />
            <p className="text-sm text-gray-500 mt-1">
              예약 확인 이메일을 받으시려면 입력해주세요
            </p>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              상담 분야 (선택)
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">선택하세요</option>
              {BOOKING_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="preferred_date" className="block text-sm font-medium mb-2">
              희망 날짜 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="preferred_date"
              required
              min={minDate}
              value={formData.preferred_date}
              onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value, preferred_time: '' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              평일(월-금) 09:00-18:00만 예약 가능합니다
            </p>
          </div>

          {/* Preferred Time */}
          {formData.preferred_date && (
            <div>
              <label htmlFor="preferred_time" className="block text-sm font-medium mb-2">
                희망 시간 <span className="text-red-500">*</span>
              </label>
              {loadingSlots ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent" />
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.filter(slot => slot.available).map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferred_time: slot.time })}
                      className={`p-2 border rounded-lg text-sm transition-all ${
                        formData.preferred_time === slot.time
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : 'border-gray-300 hover:border-pink-300'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
              {availableSlots.length > 0 && availableSlots.filter(s => s.available).length === 0 && (
                <p className="text-red-500 text-sm mt-2">
                  선택하신 날짜에 예약 가능한 시간이 없습니다. 다른 날짜를 선택해주세요.
                </p>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              추가 요청사항 (선택)
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="상담과 관련하여 미리 알려주실 내용이 있다면 작성해주세요"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.preferred_time}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '예약하기'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            예약 후 담당자가 확인하여 연락드립니다. 궁금하신 사항은{' '}
            <a href="tel:02-1234-5678" className="text-pink-500 hover:underline">
              02-1234-5678
            </a>
            로 문의해주세요.
          </p>
        </form>
      )}
    </div>
  );
}
```

</details>

---

### 5. 관리자 예약 관리 페이지 구현

#### A. 예약 목록 페이지

**파일:** `/app/admin/bookings/page.tsx`

```typescript
import { getBookings, getBookingStats } from '@/lib/supabase/bookings';
import BookingsTable from '@/components/admin/BookingsTable';
import { getSession } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: '예약 관리 | 관리자',
};

export default async function AdminBookingsPage() {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }

  const bookings = await getBookings();
  const stats = await getBookingStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">예약 관리</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">전체 예약</div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
          <div className="text-sm text-yellow-700">대기중</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-700">{stats.confirmed}</div>
          <div className="text-sm text-green-700">확정</div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-700">{stats.today}</div>
          <div className="text-sm text-blue-700">오늘 예약</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-lg shadow">
        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
```

#### B. 예약 테이블 컴포넌트

**파일:** `/components/admin/BookingsTable.tsx`

```typescript
'use client';

import { Booking, BOOKING_STATUS_LABELS, BOOKING_TYPE_LABELS, BOOKING_STATUS_COLORS } from '@/types/booking';
import Link from 'next/link';

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              날짜/시간
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              고객
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              유형
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              사무소
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {new Date(booking.preferred_date).toLocaleDateString('ko-KR')}
                </div>
                <div className="text-sm text-gray-500">{booking.preferred_time}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                <div className="text-sm text-gray-500">{booking.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">
                  {BOOKING_TYPE_LABELS[booking.type]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">
                  {booking.office_location || '-'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${BOOKING_STATUS_COLORS[booking.status]}`}>
                  {BOOKING_STATUS_LABELS[booking.status]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Link
                  href={`/admin/bookings/${booking.id}`}
                  className="text-pink-600 hover:text-pink-900"
                >
                  상세보기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

### 6. 네비게이션 업데이트

**파일:** `/components/layouts/PageLayout.tsx` 또는 해당 네비게이션 컴포넌트

메뉴에 "상담 예약" 추가:

```typescript
<nav>
  <Link href="/">홈</Link>
  <Link href="/the-plan">The Plan</Link>
  <Link href="/cases">성공사례</Link>
  <Link href="/booking">상담 예약</Link> {/* 새로 추가 */}
  ...
</nav>
```

---

## 완료 체크리스트

### 백엔드 (완료)
- [x] 데이터베이스 스키마 생성
- [x] CRUD 함수 구현
- [x] API 엔드포인트 구현
- [x] 이메일 알림 구현
- [x] 입력 검증 (Zod)
- [x] 인증 체크
- [x] 타입 정의

### 프론트엔드 (다음 작업)
- [ ] Supabase 테이블 생성
- [ ] 환경 변수 설정
- [ ] API 테스트 실행
- [ ] 고객용 예약 페이지 구현
- [ ] 예약 폼 컴포넌트 구현
- [ ] 관리자 예약 목록 페이지 구현
- [ ] 관리자 예약 상세 페이지 구현
- [ ] 네비게이션 업데이트

---

## 참고 파일

### 구현된 파일 목록
```
supabase/migrations/
  └── create_bookings_table.sql

lib/supabase/
  └── bookings.ts

app/api/
  ├── bookings/
  │   ├── route.ts
  │   └── available-slots/route.ts
  └── admin/bookings/
      ├── route.ts
      └── [id]/route.ts

types/
  └── booking.ts

scripts/
  └── test-booking-api.js

문서/
  ├── BOOKING_SYSTEM_README.md
  └── BOOKING_IMPLEMENTATION_GUIDE.md
```

### 다음 구현 파일
```
app/booking/
  └── page.tsx (고객용 예약 페이지)

app/admin/bookings/
  ├── page.tsx (예약 목록)
  └── [id]/page.tsx (예약 상세)

components/features/
  └── BookingForm.tsx (예약 폼)

components/admin/
  ├── BookingsTable.tsx (예약 테이블)
  └── BookingDetail.tsx (예약 상세)
```

---

## 지원 및 문의

문제가 발생하면 다음을 확인하세요:

1. **데이터베이스 연결**: Supabase 환경 변수 확인
2. **RLS 정책**: SQL 스크립트가 완전히 실행되었는지 확인
3. **이메일 발송**: Resend API 키와 도메인 인증 확인
4. **API 테스트**: `scripts/test-booking-api.js` 실행

---

**구현 완료**: 2025-11-19
**작성자**: Claude Code
