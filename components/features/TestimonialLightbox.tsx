'use client';

import { useState, useEffect } from 'react';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO, PHOTO_TYPE_INFO } from '@/types/testimonial';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
}

interface Props {
  testimonialCase: CaseWithEvidence;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCases?: number;
}

export default function TestimonialLightbox({
  testimonialCase,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false,
  currentIndex,
  totalCases
}: Props) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const categoryInfo = CATEGORY_INFO[testimonialCase.category];
  const { evidence_photos } = testimonialCase;

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 좌우 화살표 키 네비게이션 제거 (사용자 혼란 방지)

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억원`;
  };

  const handlePrevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? evidence_photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev === evidence_photos.length - 1 ? 0 : prev + 1));
  };

  const selectedPhoto = evidence_photos[selectedPhotoIndex];

  return (
    <div className="fixed inset-0 bg-black/90 z-[150] overflow-y-auto">
      {/* Close Button - Top Right (aligned with Modal.tsx pattern) */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-20">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 rounded-full group touch-manipulation"
          aria-label="후기 닫기"
        >
          <svg className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress Indicator - Top Center */}
      {currentIndex !== undefined && totalCases !== undefined && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 md:top-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{currentIndex + 1}</span>
            <span className="mx-1.5">/</span>
            <span>{totalCases}</span>
          </p>
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
        {/* Previous Button - Left Side */}
        {onNavigate && hasPrev && (
          <button
            onClick={() => onNavigate('prev')}
            className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white border-2 border-gray-200 hover:bg-amber-50 hover:border-amber-200 rounded-full text-gray-700 hover:text-gray-900 transition-all shadow-md hover:shadow-lg backdrop-blur-sm z-10"
            aria-label="이전 후기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button - Right Side */}
        {onNavigate && hasNext && (
          <button
            onClick={() => onNavigate('next')}
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-white border-2 border-gray-200 hover:bg-amber-50 hover:border-amber-200 rounded-full text-gray-700 hover:text-gray-900 transition-all shadow-md hover:shadow-lg backdrop-blur-sm z-10"
            aria-label="다음 후기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="bg-white rounded-lg max-w-6xl w-full overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Evidence Photos */}
            <div className="bg-gray-900 relative">
              {evidence_photos.length > 0 ? (
                <>
                  {/* Main Photo */}
                  <div className="aspect-[4/3] relative">
                    <img
                      src={selectedPhoto.photo_url}
                      alt={selectedPhoto.alt_text || '증빙 사진'}
                      className="w-full h-full object-contain"
                    />

                    {/* Photo Type Badge */}
                    <div className="absolute top-4 left-4">
                      {(() => {
                        const typeInfo = PHOTO_TYPE_INFO[selectedPhoto.evidence_type];
                        return (
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium ${typeInfo.bgColor} ${typeInfo.color}`}
                          >
                            <span>{typeInfo.icon}</span>
                            <span>{typeInfo.label}</span>
                          </span>
                        );
                      })()}
                    </div>

                    {/* Navigation Arrows */}
                    {evidence_photos.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevPhoto}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                          aria-label="이전 사진"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={handleNextPhoto}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                          aria-label="다음 사진"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}

                    {/* Photo Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {selectedPhotoIndex + 1} / {evidence_photos.length}
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {evidence_photos.length > 1 && (
                    <div className="p-4 bg-gray-800 flex gap-2 overflow-x-auto">
                      {evidence_photos.map((photo, index) => (
                        <button
                          key={photo.id}
                          onClick={() => setSelectedPhotoIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                            index === selectedPhotoIndex
                              ? 'border-amber-500'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={photo.photo_url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              )}
            </div>

            {/* Right: Case Details */}
            <div className="p-8 max-h-[80vh] overflow-y-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${categoryInfo.bgColor} ${categoryInfo.color}`}
                >
                  <span>{categoryInfo.icon}</span>
                  <span>{categoryInfo.label}</span>
                </span>
              </div>

              {/* Highlight Text */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {testimonialCase.highlight_text}
              </h2>

              {/* Amount */}
              {testimonialCase.case_result_amount && (
                <p className="text-3xl font-bold text-rose-600 mb-4">
                  {formatAmount(testimonialCase.case_result_amount)}
                </p>
              )}

              {/* Client Info */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6 pb-6 border-b">
                <span className="font-medium text-gray-900">{testimonialCase.client_initial}</span>
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
                <span>·</span>
                <span>{testimonialCase.case_date}</span>
                {testimonialCase.case_duration && (
                  <>
                    <span>·</span>
                    <span>기간: {testimonialCase.case_duration}</span>
                  </>
                )}
              </div>

              {/* Stories */}
              <div className="space-y-6">
                {testimonialCase.full_story && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">후기</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {testimonialCase.full_story}
                    </p>
                  </div>
                )}

                {testimonialCase.story_before && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">상담 전</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {testimonialCase.story_before}
                    </p>
                  </div>
                )}

                {testimonialCase.story_journey && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">진행 과정</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {testimonialCase.story_journey}
                    </p>
                  </div>
                )}

                {testimonialCase.story_after && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">결과 후</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {testimonialCase.story_after}
                    </p>
                  </div>
                )}
              </div>

              {/* Attorney */}
              {testimonialCase.attorney_name && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    담당 변호사: <span className="font-medium text-gray-900">{testimonialCase.attorney_name}</span>
                  </p>
                </div>
              )}

              {/* Mobile Navigation Buttons - Moved before CTA */}
              {onNavigate && (hasPrev || hasNext) && (
                <div className="mt-6 pt-6 border-t lg:hidden flex gap-3">
                  {hasPrev && (
                    <button
                      onClick={() => onNavigate('prev')}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-full text-gray-900 transition-all font-medium"
                      aria-label="이전 후기"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                      이전 후기
                    </button>
                  )}
                  {hasNext && (
                    <button
                      onClick={() => onNavigate('next')}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white rounded-full text-gray-900 transition-all font-medium"
                      aria-label="다음 후기"
                    >
                      다음 후기
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t">
                <a
                  href="/consultation"
                  className="block w-full px-6 py-3 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700 transition-colors font-medium"
                >
                  무료 상담 신청하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
