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

  const handleCaseClick = (testimonialCase: CaseWithEvidence) => {
    setSelectedCase(testimonialCase);
    setIsLightboxOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!selectedCase) return;

    const currentIndex = cases.findIndex(c => c.id === selectedCase.id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < cases.length) {
      setSelectedCase(cases[newIndex]);
    }
  };

  const getCurrentCaseIndex = () => {
    if (!selectedCase) return -1;
    return cases.findIndex(c => c.id === selectedCase.id);
  };

  const hasPrev = getCurrentCaseIndex() > 0;
  const hasNext = getCurrentCaseIndex() < cases.length - 1;

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">
              Real Client Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              진짜 의뢰인, 진짜 후기
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <span>실제 후기</span>
              <span>•</span>
              <span>검증 완료</span>
              <span>•</span>
              <span>익명 보장</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] bg-gray-200 rounded-lg border animate-pulse h-64" />
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
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">
              Real Client Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              진짜 의뢰인, 진짜 후기
            </h2>

            {/* Trust Badges - 간소화 */}
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <span>실제 후기</span>
              <span>•</span>
              <span>검증 완료</span>
              <span>•</span>
              <span>익명 보장</span>
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
            {cases.map((testimonialCase) => {
              const primaryPhoto = testimonialCase.evidence_photos[0];

              return (
                <div
                  key={testimonialCase.id}
                  className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] snap-start"
                >
                  <button
                    onClick={() => handleCaseClick(testimonialCase)}
                    className="w-full group rounded-xl border-2 border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 overflow-hidden text-left bg-white h-80"
                  >
                    {/* 상단 이미지 영역 (30%) */}
                    <div className="h-24 relative overflow-hidden">
                      {primaryPhoto ? (
                        <img
                          src={primaryPhoto.photo_url}
                          alt={primaryPhoto.alt_text || '증빙 사진'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                          <span className="text-3xl opacity-30">📝</span>
                        </div>
                      )}
                    </div>

                    {/* 하단 콘텐츠 영역 (70%) - 흰색 배경 */}
                    <div className="p-4 flex flex-col h-56">
                      {/* 네이버 배지 - 흰색 배경 + 초록 체크 */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">네이버 리뷰</span>
                      </div>

                      {/* 큰 따옴표 + 제목 */}
                      <div className="flex-1 relative">
                        <svg className="absolute -left-1 -top-1 w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                        <h3
                          className="text-base font-bold text-gray-900 line-clamp-3 leading-tight pl-6 group-hover:text-amber-700 transition-colors"
                          dangerouslySetInnerHTML={{
                            __html: testimonialCase.highlight_text
                              .replace(/(재산분할|양육권|위자료|승소|합의|상담|방향|해결|성공|확보|편해|잘 케어|꼼꼼|친절|감사|추천)/g,
                                '<span class="text-amber-600 font-extrabold">$1</span>')
                          }}
                        />
                      </div>

                      {/* 금액 - amber 강조 */}
                      {testimonialCase.case_result_amount && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-2xl font-bold text-amber-600">
                            {formatAmount(testimonialCase.case_result_amount)}
                          </p>
                        </div>
                      )}

                      {/* 호버 시 "전체 후기" 힌트 */}
                      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          전체 후기 읽기
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>←</span>
              <span>좌우로 스크롤하여 더 많은 후기 보기</span>
              <span>→</span>
            </p>
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <span>모든 후기 보기</span>
              <span>→</span>
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
          onNavigate={handleNavigate}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
