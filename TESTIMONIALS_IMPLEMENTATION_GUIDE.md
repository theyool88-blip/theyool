# Testimonials Implementation Guide

## 개요
의뢰인 후기(Testimonials) 기능을 하드코딩에서 Supabase 데이터베이스로 마이그레이션하고, 관리자 시스템을 통해 관리할 수 있도록 구현합니다.

---

## 1. Database Migration

### 단계 1: SQL Migration 실행

```bash
# Supabase CLI로 마이그레이션 실행
supabase db push

# 또는 Supabase Dashboard > SQL Editor에서 직접 실행
# 파일: supabase/migrations/20251118_create_testimonials_table.sql
```

### 단계 2: Storage Bucket 생성

Supabase Dashboard > Storage > New Bucket
```
버킷명: testimonial-photos
공개 여부: Public
파일 크기 제한: 5MB
허용 MIME 타입: image/jpeg, image/png, image/webp
```

또는 SQL로 실행:
```sql
-- 파일: supabase/storage/testimonial-photos-bucket.sql
-- Dashboard > SQL Editor에서 실행
```

### 단계 3: 데이터 확인

```sql
-- Supabase Dashboard > SQL Editor
SELECT * FROM testimonials ORDER BY display_order;

-- 9개의 초기 데이터가 삽입되었는지 확인
```

---

## 2. API Routes 배포

생성된 파일:
- `/app/api/admin/testimonials/route.ts` (관리자 CRUD)
- `/app/api/admin/testimonials/[id]/route.ts` (개별 관리)
- `/app/api/admin/testimonials/upload-photo/route.ts` (사진 업로드)
- `/app/api/testimonials/route.ts` (공개 API)

테스트:
```bash
# 개발 서버 실행
npm run dev

# API 테스트 (관리자 로그인 필요)
curl http://localhost:3000/api/admin/testimonials

# 공개 API 테스트
curl http://localhost:3000/api/testimonials?limit=9
```

---

## 3. Component Migration

### 3-1. 기존 컴포넌트 백업

```bash
cp components/features/TestimonialsCarousel.tsx components/features/TestimonialsCarousel.tsx.backup
```

### 3-2. 새 컴포넌트 생성

파일: `components/features/TestimonialsCarousel.tsx` (수정)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchPublicTestimonials } from '@/lib/supabase/testimonials-client';

interface Testimonial {
  id: string;
  client_name: string;
  client_initial: string;
  client_role: string;
  case_category: string;
  case_result: string;
  case_date: string;
  content: string;
  rating: number;
  verified: boolean;
  photo_url?: string;
  use_photo: boolean;
  avatar_bg_color: string;
  avatar_text_color: string;
}

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const { data } = await fetchPublicTestimonials({ limit: 9 });
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <p className="text-gray-500">후기를 불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // 후기가 없으면 섹션 숨김
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">
            Client Reviews
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            의뢰인의 목소리
          </h2>
          <p className="text-base md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            직접 경험하신 분들의 진솔한 이야기입니다
          </p>
        </div>

        {/* 캐러셀 컨테이너 */}
        <div className="relative">
          {/* 이전/다음 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
            aria-label="이전 후기"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= testimonials.length - 3}
            aria-label="다음 후기"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 후기 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-8 transition-all duration-500">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                {/* 헤더 - 날짜 + 검증 배지 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-green-700">검증됨</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">{testimonial.case_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                </div>

                {/* 후기 내용 */}
                <p className="text-gray-700 mb-6 leading-relaxed min-h-[120px]">
                  "{testimonial.content}"
                </p>

                {/* 결과 배지 */}
                {testimonial.case_result && (
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                      ✓ {testimonial.case_result}
                    </span>
                  </div>
                )}

                {/* 의뢰인 정보 */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {testimonial.use_photo && testimonial.photo_url ? (
                    <img
                      src={testimonial.photo_url}
                      alt={testimonial.client_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar_bg_color} rounded-full flex items-center justify-center`}>
                      <span className={`${testimonial.avatar_text_color} font-bold text-lg`}>
                        {testimonial.client_initial}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.client_name}</p>
                    <p className="text-xs text-gray-500">{testimonial.client_role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'w-8 bg-amber-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${index + 1}번째 후기 그룹 보기`}
              />
            ))}
          </div>
        </div>

        {/* 통계 (하드코딩 유지 또는 동적 계산) */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              1,200번의 여정, 1,200번의 새로운 시작
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              12년간 함께한 의뢰인들의 이야기가 더율의 자산입니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">98%</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">고객 만족도</p>
              <p className="text-xs text-gray-500">"진작 올걸"</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1,200+</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">누적 의뢰인</p>
              <p className="text-xs text-gray-500">12년의 경험</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">87%</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">평균 승소율</p>
              <p className="text-xs text-gray-500">업계 최고 수준</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">4.8/5</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">평균 평점</p>
              <p className="text-xs text-gray-500">실제 의뢰인 평가</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 4. Admin UI 구현

### 4-1. 관리자 페이지 생성

파일 구조:
```
app/admin/testimonials/
├── page.tsx                        # 서버 컴포넌트
├── TestimonialsManagementClient.tsx # 메인 UI
├── TestimonialTable.tsx            # 테이블
├── TestimonialModal.tsx            # 모달
└── TestimonialPhotoUploader.tsx    # 사진 업로더
```

### 4-2. 네비게이션 추가

파일: `app/admin/page.tsx` (대시보드)

```tsx
// 기존 링크 섹션에 추가
<Link
  href="/admin/testimonials"
  className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-amber-500 transition-colors"
>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">의뢰인 후기 관리</h3>
  <p className="text-sm text-gray-600">후기 등록, 수정, 사진 업로드</p>
</Link>
```

---

## 5. Testing Checklist

### Database
- [ ] testimonials 테이블 생성 확인
- [ ] 9개 초기 데이터 삽입 확인
- [ ] RLS 정책 동작 확인 (공개/비공개)
- [ ] Full-text search 동작 확인

### Storage
- [ ] testimonial-photos 버킷 생성
- [ ] 공개 읽기 권한 확인
- [ ] 파일 업로드/삭제 테스트

### API Routes
- [ ] GET /api/testimonials (공개 조회)
- [ ] GET /api/admin/testimonials (관리자 조회)
- [ ] POST /api/admin/testimonials (생성)
- [ ] PATCH /api/admin/testimonials/[id] (수정)
- [ ] DELETE /api/admin/testimonials/[id] (삭제)
- [ ] POST /api/admin/testimonials/upload-photo (사진 업로드)
- [ ] DELETE /api/admin/testimonials/upload-photo (사진 삭제)

### Frontend
- [ ] 홈페이지에서 후기 정상 로드
- [ ] 캐러셀 동작 확인
- [ ] 사진 표시 확인 (있을 때/없을 때)
- [ ] 관리자 페이지 CRUD 동작

### Security
- [ ] consent_given=false 후기는 공개 API에서 노출 안됨
- [ ] 관리자 인증 없이 API 접근 불가
- [ ] 파일 업로드 검증 (타입, 크기)

---

## 6. Deployment

```bash
# 빌드
npm run build

# 프로덕션 배포 (Vercel)
vercel --prod

# 환경 변수 확인
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
# SUPABASE_SERVICE_ROLE_KEY
```

---

## 7. Rollback Plan

문제 발생 시:

1. **컴포넌트 복원**
```bash
cp components/features/TestimonialsCarousel.tsx.backup components/features/TestimonialsCarousel.tsx
```

2. **데이터베이스 롤백**
```sql
DROP TABLE IF EXISTS testimonials CASCADE;
```

3. **Storage 삭제**
- Supabase Dashboard > Storage > testimonial-photos 삭제

---

## 8. Maintenance

### 정기 작업
- 월 1회: 비활성 후기 아카이빙
- 분기 1회: 통계 리포트 생성
- 연 1회: consent 재확인 (GDPR 준수)

### 모니터링
- 후기 등록 실패율
- 사진 업로드 실패율
- 공개 API 응답 시간

---

## 9. FAQ

**Q: 기존 하드코딩 데이터는 어떻게 되나요?**
A: SQL migration에 INSERT 문으로 자동 삽입됩니다.

**Q: 사진을 추가하려면?**
A: 관리자 페이지에서 후기 수정 > 사진 탭 > 업로드

**Q: consent_given을 false로 변경하면?**
A: 즉시 공개 API에서 노출 중단됩니다.

**Q: 비디오 후기는 지원하나요?**
A: Phase 2에서 metadata.video_url로 확장 예정입니다.

---

## 10. Support

문제 발생 시:
- GitHub Issues
- 이메일: dev@theyool.com
- Slack: #dev-support
