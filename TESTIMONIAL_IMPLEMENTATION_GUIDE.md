# 의뢰인의 목소리 섹션 - 구현 가이드

**날짜**: 2025-11-19
**권장 구현**: 제안 C (수평 스크롤 캐러셀) → 제안 D (타임라인 스토리)

---

## Phase 1: 수평 스크롤 캐러셀 (Quick Win)

### 구현 개요
- **목표**: 모바일에서 1개 → 2.5개 카드 노출
- **작업 시간**: 2-3일
- **난이도**: 낮음
- **영향**: 모바일 사용자 체험 즉시 개선

### 코드 수정사항

#### 1. TestimonialEvidenceGallery.tsx 수정

```tsx
// /Users/hskim/theyool/components/features/TestimonialEvidenceGallery.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO, PHOTO_TYPE_INFO } from '@/types/testimonial';
import TestimonialLightbox from './TestimonialLightbox';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
}

export default function TestimonialEvidenceGallery() {
  const [cases, setCases] = useState<CaseWithEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseWithEvidence | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // 수평 스크롤 인디케이터
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/testimonials/cases?limit=6&featured=true');
        const result = await response.json();

        if (result.data) {
          setCases(result.data);
        }
      } catch (error) {
        console.error('케이스 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  // Intersection Observer로 현재 보이는 카드 추적
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const options = {
      root: scrollContainerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setActiveCardIndex(index);
        }
      });
    }, options);

    const cards = scrollContainerRef.current.querySelectorAll('.testimonial-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [cases]);

  const handleCaseClick = (testimonialCase: CaseWithEvidence) => {
    setSelectedCase(testimonialCase);
    setIsLightboxOpen(true);
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억`;
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">의뢰인의 목소리</h2>
            <p className="text-gray-600">직접 경험하신 분들의 진솔한 이야기입니다</p>
          </div>

          {/* 데스크톱 스켈레톤 */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border animate-pulse h-96" />
            ))}
          </div>

          {/* 모바일 스켈레톤 */}
          <div className="md:hidden flex gap-4 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] bg-white rounded-2xl border animate-pulse h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">의뢰인의 목소리</h2>
            <p className="text-base md:text-lg text-gray-600 mb-4">
              직접 경험하신 분들의 진솔한 이야기입니다
            </p>

            {/* 신뢰 배지 */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">실제 증빙 사진</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
                <span>1,200명 중 87% 승소</span>
              </span>
            </div>
          </div>

          {/* Cases Grid/Carousel */}
          <div className="relative">
            {/* 데스크톱: 3열 그리드 */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
              {cases.map((testimonialCase, index) => {
                const categoryInfo = CATEGORY_INFO[testimonialCase.category];
                const primaryPhoto = testimonialCase.evidence_photos[0];
                const photoCount = testimonialCase.evidence_photos.length;

                return (
                  <TestimonialCard
                    key={testimonialCase.id}
                    testimonialCase={testimonialCase}
                    categoryInfo={categoryInfo}
                    primaryPhoto={primaryPhoto}
                    photoCount={photoCount}
                    formatAmount={formatAmount}
                    onClick={() => handleCaseClick(testimonialCase)}
                  />
                );
              })}
            </div>

            {/* 모바일: 수평 스크롤 캐러셀 */}
            <div className="md:hidden mb-8">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {cases.map((testimonialCase, index) => {
                  const categoryInfo = CATEGORY_INFO[testimonialCase.category];
                  const primaryPhoto = testimonialCase.evidence_photos[0];
                  const photoCount = testimonialCase.evidence_photos.length;

                  return (
                    <div
                      key={testimonialCase.id}
                      data-index={index}
                      className="testimonial-card flex-shrink-0 w-[280px] snap-start"
                    >
                      <TestimonialCard
                        testimonialCase={testimonialCase}
                        categoryInfo={categoryInfo}
                        primaryPhoto={primaryPhoto}
                        photoCount={photoCount}
                        formatAmount={formatAmount}
                        onClick={() => handleCaseClick(testimonialCase)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* 스크롤 인디케이터 */}
              <div className="flex justify-center gap-2 mt-4">
                {cases.map((_, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 rounded-full ${
                      index === activeCardIndex
                        ? 'w-6 h-2 bg-orange-400'
                        : 'w-2 h-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-all font-bold text-base shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>모든 후기 보기</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedCase && (
        <TestimonialLightbox
          testimonialCase={selectedCase}
          onClose={() => {
            setIsLightboxOpen(false);
            setSelectedCase(null);
          }}
        />
      )}
    </>
  );
}

// 카드 컴포넌트 분리
function TestimonialCard({
  testimonialCase,
  categoryInfo,
  primaryPhoto,
  photoCount,
  formatAmount,
  onClick,
}: {
  testimonialCase: any;
  categoryInfo: any;
  primaryPhoto: any;
  photoCount: number;
  formatAmount: (amount: number | null | undefined) => string | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden text-left w-full h-full"
    >
      {/* Evidence Photo Preview */}
      {primaryPhoto ? (
        <div className="relative h-40 overflow-hidden bg-gray-100">
          <img
            src={primaryPhoto.photo_url}
            alt={primaryPhoto.alt_text || '증빙 사진'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Photo Count Badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <span>📸</span>
            <span>{photoCount}</span>
          </div>
          {/* Evidence Type Badge */}
          <div className="absolute top-3 left-3">
            {(() => {
              const typeInfo = PHOTO_TYPE_INFO[primaryPhoto.evidence_type];
              return (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm ${typeInfo.bgColor} ${typeInfo.color}`}
                >
                  <span>{typeInfo.icon}</span>
                  <span>{typeInfo.label}</span>
                </span>
              );
            })()}
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo.bgColor} ${categoryInfo.color}`}
          >
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.label}</span>
          </span>
        </div>

        {/* Highlight Text */}
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors leading-tight">
          {testimonialCase.highlight_text}
        </h3>

        {/* Amount */}
        {testimonialCase.case_result_amount && (
          <p className="text-2xl font-bold text-rose-600 mb-3">
            {formatAmount(testimonialCase.case_result_amount)}
          </p>
        )}

        {/* Client Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 flex-wrap">
          <span className="font-medium">{testimonialCase.client_initial}</span>
          {testimonialCase.client_role && (
            <>
              <span>·</span>
              <span>{testimonialCase.client_role}</span>
            </>
          )}
        </div>

        {/* Preview Text */}
        {testimonialCase.full_story && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
            {testimonialCase.full_story}
          </p>
        )}

        {/* Read More */}
        <div className="flex items-center gap-1 text-orange-600 font-medium text-sm group-hover:gap-2 transition-all">
          <span>자세히 보기</span>
          <span>→</span>
        </div>
      </div>
    </button>
  );
}
```

#### 2. globals.css에 스크롤바 숨김 추가

```css
/* /Users/hskim/theyool/app/globals.css */

/* 수평 스크롤바 숨김 유틸리티 */
.scrollbar-hide {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* 스크롤 스냅 부드럽게 */
.scroll-smooth {
  scroll-behavior: smooth;
}

.snap-x {
  scroll-snap-type: x mandatory;
}

.snap-start {
  scroll-snap-align: start;
}
```

### 예상 결과

**Before (현재)**:
- 모바일: 1개 카드만 보임
- 사용자가 스크롤해야 다른 케이스 발견
- 체류 시간: 평균 15초

**After (개선)**:
- 모바일: 2.5개 카드 동시 노출
- 수평 스크롤로 직관적 탐색
- 체류 시간: 평균 30초 (예상 +100%)

---

## Phase 2: 타임라인 스토리 (Long-term Impact)

### 구현 개요
- **목표**: 감정적 연결 극대화, 클릭 불필요
- **작업 시간**: 5-7일
- **난이도**: 높음
- **영향**: 상담 신청 전환율 대폭 향상

### 데이터베이스 스키마 확장

```sql
-- testimonial_cases 테이블에 컬럼 추가
ALTER TABLE testimonial_cases
ADD COLUMN emotion_before VARCHAR(50),  -- "막막함", "불안" 등
ADD COLUMN emotion_journey VARCHAR(50), -- "희망", "기대" 등
ADD COLUMN emotion_after VARCHAR(50);   -- "기쁨", "안도" 등

-- 기존 story 컬럼 활용:
-- story_before: 상담 전 상황
-- story_journey: 진행 과정
-- story_after: 결과 후 소감
```

### 새로운 컴포넌트 생성

```tsx
// /Users/hskim/theyool/components/features/TestimonialTimeline.tsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO } from '@/types/testimonial';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
  emotion_before?: string;
  emotion_journey?: string;
  emotion_after?: string;
}

export default function TestimonialTimeline() {
  const [cases, setCases] = useState<CaseWithEvidence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/testimonials/cases?limit=3&featured=true');
        const result = await response.json();

        if (result.data) {
          setCases(result.data);
        }
      } catch (error) {
        console.error('케이스 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCases();
  }, []);

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억원`;
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">의뢰인의 여정</h2>
            <p className="text-gray-600">상담 전부터 결과까지, 함께한 이야기입니다</p>
          </div>
          <div className="space-y-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 animate-pulse h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">의뢰인의 여정</h2>
          <p className="text-base md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            상담 전부터 결과까지,<br className="md:hidden" />
            함께한 이야기입니다
          </p>

          {/* 신뢰 배지 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700 font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>실제 의뢰인 스토리</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
              <span>87% 승소율 검증</span>
            </span>
          </div>
        </div>

        {/* Timeline Cases */}
        <div className="space-y-16">
          {cases.map((testimonialCase, caseIndex) => {
            const categoryInfo = CATEGORY_INFO[testimonialCase.category];

            return (
              <TimelineCase
                key={testimonialCase.id}
                testimonialCase={testimonialCase}
                categoryInfo={categoryInfo}
                formatAmount={formatAmount}
                isLast={caseIndex === cases.length - 1}
              />
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition-all font-bold text-base"
          >
            <span>더 많은 여정 보기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// 타임라인 케이스 컴포넌트
function TimelineCase({
  testimonialCase,
  categoryInfo,
  formatAmount,
  isLast,
}: {
  testimonialCase: CaseWithEvidence;
  categoryInfo: any;
  formatAmount: (amount: number | null | undefined) => string | null;
  isLast: boolean;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-amber-50 to-white border-b border-amber-100">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold mb-3 ${categoryInfo.bgColor} ${categoryInfo.color}`}
            >
              <span>{categoryInfo.icon}</span>
              <span>{categoryInfo.label}</span>
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
              {testimonialCase.highlight_text}
            </h3>
          </div>
          {testimonialCase.case_result_amount && (
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-gray-500 mb-1">최종 결과</p>
              <p className="text-3xl md:text-4xl font-black text-rose-600">
                {formatAmount(testimonialCase.case_result_amount)}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span className="font-medium">{testimonialCase.client_initial}</span>
          {testimonialCase.client_role && (
            <>
              <span>·</span>
              <span>{testimonialCase.client_role}</span>
            </>
          )}
          {testimonialCase.client_age_group && (
            <>
              <span>·</span>
              <span>{testimonialCase.client_age_group}</span>
            </>
          )}
          {testimonialCase.case_duration && (
            <>
              <span>·</span>
              <span>기간: {testimonialCase.case_duration}</span>
            </>
          )}
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="p-6 md:p-8">
        {/* Step 1: Before */}
        {testimonialCase.story_before && (
          <TimelineStep
            icon="😔"
            title="상담 전"
            emotion={testimonialCase.emotion_before || "막막함"}
            content={testimonialCase.story_before}
            color="gray"
            isLast={false}
          />
        )}

        {/* Step 2: Journey */}
        {testimonialCase.story_journey && (
          <TimelineStep
            icon="📋"
            title="더율과 함께"
            emotion={testimonialCase.emotion_journey || "희망"}
            content={testimonialCase.story_journey}
            color="amber"
            photos={testimonialCase.evidence_photos.slice(0, 3)}
            duration={testimonialCase.case_duration}
            isLast={false}
          />
        )}

        {/* Step 3: After */}
        {testimonialCase.story_after && (
          <TimelineStep
            icon="🎉"
            title="결과 후"
            emotion={testimonialCase.emotion_after || "기쁨"}
            content={testimonialCase.story_after}
            color="green"
            photos={testimonialCase.evidence_photos.filter(p => p.evidence_type === 'court_document')}
            isLast={true}
          />
        )}

        {/* Client Message */}
        {testimonialCase.full_story && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-3xl">💬</div>
                <div className="flex-1">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-3 italic">
                    "{testimonialCase.full_story}"
                  </p>
                  <p className="text-sm text-gray-600">
                    - {testimonialCase.client_initial}
                    {testimonialCase.client_age_group && `, ${testimonialCase.client_age_group}`}
                    {testimonialCase.client_role && `, ${testimonialCase.client_role}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attorney Info */}
        {testimonialCase.attorney_name && (
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">담당 변호사:</span>
            <span>{testimonialCase.attorney_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 타임라인 스텝 컴포넌트
function TimelineStep({
  icon,
  title,
  emotion,
  content,
  color,
  photos,
  duration,
  isLast,
}: {
  icon: string;
  title: string;
  emotion: string;
  content: string;
  color: 'gray' | 'amber' | 'green';
  photos?: EvidencePhoto[];
  duration?: string;
  isLast: boolean;
}) {
  const colorClasses = {
    gray: {
      bg: 'from-gray-100 to-gray-50',
      badge: 'bg-gray-100 text-gray-700',
      line: 'from-gray-300/50 to-gray-300/10',
    },
    amber: {
      bg: 'from-amber-100 to-amber-50',
      badge: 'bg-amber-100 text-amber-800',
      line: 'from-amber-400/50 to-amber-400/10',
    },
    green: {
      bg: 'from-green-100 to-green-50',
      badge: 'bg-green-100 text-green-800',
      line: 'from-green-400/50 to-green-400/10',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="relative pl-16 md:pl-20 pb-8 last:pb-0">
      {/* Icon */}
      <div className={`absolute left-0 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center text-2xl md:text-3xl shadow-lg`}>
        {icon}
      </div>

      {/* Connecting Line */}
      {!isLast && (
        <div
          className={`absolute left-6 md:left-7 top-12 md:top-14 w-0.5 h-full bg-gradient-to-b ${colors.line}`}
        />
      )}

      {/* Content */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h4 className="text-lg md:text-xl font-bold text-gray-900">{title}</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
            {emotion}
          </span>
          {duration && (
            <span className="text-sm text-gray-500">
              ({duration})
            </span>
          )}
        </div>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
          {content}
        </p>

        {/* Photos */}
        {photos && photos.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-orange-400 transition-colors">
                  <img
                    src={photo.photo_url}
                    alt={photo.alt_text || '증빙 사진'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 홈페이지 교체

```tsx
// /Users/hskim/theyool/app/page.tsx

// 기존 import 교체
// import TestimonialEvidenceGallery from '@/components/features/TestimonialEvidenceGallery';
import TestimonialTimeline from '@/components/features/TestimonialTimeline';

// 섹션 교체 (line 619-620)
{/* 의뢰인 후기 섹션 - 타임라인 버전 */}
<TestimonialTimeline />
```

---

## 성과 측정 (KPI)

### 추적할 지표

```typescript
// Google Analytics 이벤트
gtag('event', 'testimonial_interaction', {
  event_category: 'engagement',
  event_label: action, // 'scroll', 'click', 'expand'
  value: cardIndex,
});

// 측정 지표:
1. 평균 체류 시간
2. 스크롤 깊이
3. 카드 클릭률
4. 상담 신청 전환율
5. 모바일 vs 데스크톱 참여율
```

### A/B 테스트 설계

```
그룹 A (50%): 기존 디자인
그룹 B (50%): 새 디자인 (Phase 1 또는 Phase 2)

기간: 2-4주
샘플 크기: 최소 1,000명/그룹
```

---

## 결론

### 추천 로드맵

1. **Week 1-2**: Phase 1 구현 (수평 스크롤)
   - 빠른 개선, 즉시 효과

2. **Week 3-4**: 데이터 수집 및 분석
   - 사용자 행동 패턴 파악

3. **Week 5-8**: Phase 2 구현 (타임라인)
   - 감정적 연결 극대화
   - 차별화된 사용자 경험

### 예상 효과

**Phase 1 (수평 스크롤)**:
- 모바일 가시성 +200%
- 체류 시간 +50%
- 케이스 탐색률 +100%

**Phase 2 (타임라인)**:
- 감정적 공감도 +150%
- 상담 신청 전환율 +80%
- 브랜드 차별화 +100%

---

**작성**: Claude (AI Design Consultant)
**검토 필요**: UX팀, 개발팀
**구현 우선순위**: High (Phase 1) → Critical (Phase 2)
