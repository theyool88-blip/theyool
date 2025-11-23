'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO, PHOTO_TYPE_INFO } from '@/types/testimonial';
import TestimonialModal, { type TestimonialData } from './TestimonialModal';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
}

export default function TestimonialEvidenceGallery() {
  const [cases, setCases] = useState<CaseWithEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 클라이언트 사이드에서만 Portal 사용
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleCaseClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedIndex((prev) => (prev - 1 + cases.length) % cases.length);
    } else {
      setSelectedIndex((prev) => (prev + 1) % cases.length);
    }
  };

  const handleCTA = () => {
    setIsModalOpen(false);
    window.location.href = 'tel:1661-7633';
  };

  // DB 데이터를 TestimonialModal 형식으로 변환
  const convertToModalData = (testimonialCase: CaseWithEvidence): TestimonialData => {
    const categoryInfo = CATEGORY_INFO[testimonialCase.category];

    // full_story 조합: story_before + story_journey + story_after
    const fullStory = [
      testimonialCase.story_before,
      testimonialCase.story_journey,
      testimonialCase.story_after
    ].filter(Boolean).join('\n\n') || testimonialCase.full_story || testimonialCase.highlight_text;

    return {
      id: testimonialCase.id,
      snippet: testimonialCase.highlight_text.substring(0, 50) + '...',
      initial: testimonialCase.client_initial || 'A',
      role: testimonialCase.client_role || `${testimonialCase.client_age_group || '40대'}, ${categoryInfo?.label || '기타'}`,
      age: testimonialCase.client_age_group || testimonialCase.client_role || '40대',
      caseType: categoryInfo?.label || '기타',
      fullContent: fullStory,
      evidenceImages: testimonialCase.evidence_photos?.map(p => p.photo_url) || []
    };
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억`;
  };

  if (loading) {
    return (
      <section className="relative py-16 bg-gradient-to-b from-white via-sage-50/20 to-white">
        {/* Top Gradient Overlay - ThePlan/RealStory/Insta/ExpertInsights에서 자연스러운 전환 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-0" />

        {/* Bottom Gradient Overlay - FAQ로 자연스러운 전환 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">
              Real Client Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              진짜 의뢰인, 진짜 후기
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              힘든 시간을 함께 이겨낸 분들의 이야기
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>네이버 검증</span>
              </div>
              <span>•</span>
              <span>익명 보장</span>
              <span>•</span>
              <span>실제 사례</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] bg-gray-200 rounded-2xl border-2 border-gray-300 animate-pulse h-80" />
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
      <section className="relative py-16 bg-gradient-to-b from-white via-sage-50/20 to-white overflow-hidden">
        {/* Top Gradient Overlay - ThePlan/RealStory/Insta/ExpertInsights에서 자연스러운 전환 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-0" />

        {/* Bottom Gradient Overlay - FAQ로 자연스러운 전환 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/90 to-transparent pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">
              Real Client Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              진짜 의뢰인, 진짜 후기
            </h2>
            {/* 감정적 서브헤딩 추가 */}
            <p className="text-base md:text-lg text-gray-600 mb-6">
              힘든 시간을 함께 이겨낸 분들의 이야기
            </p>

            {/* 신뢰 배지 */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>네이버 검증</span>
              </div>
              <span>•</span>
              <span>익명 보장</span>
              <span>•</span>
              <span>실제 사례</span>
            </div>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {cases.map((testimonialCase, index) => {
              const primaryPhoto = testimonialCase.evidence_photos[0];
              const categoryInfo = CATEGORY_INFO[testimonialCase.category];

              return (
                <div
                  key={testimonialCase.id}
                  className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] snap-start"
                >
                  <button
                    onClick={() => handleCaseClick(index)}
                    className="w-full group rounded-2xl border-2 border-sage-200 hover:border-sage-400 hover:shadow-2xl transition-all duration-300 overflow-hidden text-left h-80 relative"
                    aria-label={`${categoryInfo?.label || '기타'} 후기`}
                  >
                    {/* 배경 이미지 또는 기본 그라데이션 */}
                    {primaryPhoto ? (
                      <>
                        <img
                          src={primaryPhoto.photo_url}
                          alt={primaryPhoto.alt_text || '증빙 사진'}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* 밝은 Sage 오버레이 - 이미지 잘 보이면서 텍스트 가독성 확보 */}
                        <div className="absolute inset-0 bg-gradient-to-b from-sage-50/90 via-sage-100/85 to-sage-50/80"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-white">
                        {/* 부드러운 패턴 */}
                        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`reviewPattern-${testimonialCase.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="1.5" fill="#6DB5A4" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#reviewPattern-${testimonialCase.id})`} />
                        </svg>
                      </div>
                    )}

                    {/* 콘텐츠 영역 */}
                    <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                      {/* 상단: 카테고리 + 네이버 인증 */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-xs font-semibold shadow-sm">
                          {categoryInfo?.label || '기타'}
                        </span>
                        <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                          <svg className="w-3.5 h-3.5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-gray-700 font-medium">네이버</span>
                        </div>
                      </div>

                      {/* 중앙: 하이라이트 텍스트 (2줄) - 인용 표시 */}
                      <div className="flex-1 flex items-center relative">
                        {/* 큰 따옴표 아이콘 */}
                        <svg className="absolute -left-2 -top-2 w-8 h-8 text-sage-400/40" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                        <h3
                          className="text-xl md:text-2xl font-bold text-gray-900 line-clamp-2 leading-snug pl-6"
                          dangerouslySetInnerHTML={{
                            __html: `"${testimonialCase.highlight_text}"`.replace(/(재산분할|양육권|위자료|승소|합의|상담|방향|해결|성공|확보|편해|잘 케어|꼼꼼|친절|감사|추천)/g,
                                '<span class="text-sage-700 font-extrabold">$1</span>')
                          }}
                        />
                      </div>

                      {/* 하단: 금액 */}
                      {testimonialCase.case_result_amount && (
                        <div className="pt-4 border-t-2 border-sage-300/50">
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-sage-700">
                              {formatAmount(testimonialCase.case_result_amount)}
                            </p>
                            <span className="text-sm text-gray-600">확보</span>
                          </div>
                        </div>
                      )}

                      {/* 호버 시 "자세히 보기" */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4">
                        <span className="text-sm text-sage-700 flex items-center gap-1 bg-white/95 px-3 py-1.5 rounded-full border border-sage-300 shadow-sm">
                          자세히 보기
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Scroll Hint for Mobile */}
          <div className="text-center mt-6 lg:hidden">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-200 rounded-full">
              <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm font-medium text-gray-700">좌우로 스크롤</span>
              <svg className="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium"
            >
              <span>모든 후기 보기</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Modal - Portal로 body에 렌더링 */}
      {isMounted && isModalOpen && cases.length > 0 && createPortal(
        <TestimonialModal
          testimonial={convertToModalData(cases[selectedIndex])}
          currentIndex={selectedIndex}
          totalCount={cases.length}
          onClose={() => setIsModalOpen(false)}
          onNavigate={handleNavigate}
          onCTA={handleCTA}
        />,
        document.body
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
