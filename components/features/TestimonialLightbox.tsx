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
}

export default function TestimonialLightbox({
  testimonialCase,
  onClose,
  onNavigate,
  hasPrev = false,
  hasNext = false
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

  // 좌우 화살표 키로 게시물 네비게이션
  useEffect(() => {
    if (!onNavigate) return;

    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate('next');
      }
    };

    window.addEventListener('keydown', handleArrowKeys);
    return () => window.removeEventListener('keydown', handleArrowKeys);
  }, [onNavigate, hasPrev, hasNext]);

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
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 md:p-6">
        {/* Previous Button */}
        {onNavigate && hasPrev && (
          <button
            onClick={() => onNavigate('prev')}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 rounded-full text-white transition-all text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="이전 후기 보기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">이전</span>
          </button>
        )}
        {!hasPrev && <div />}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-900 transition-all shadow-md hover:shadow-lg hover:scale-105 touch-manipulation active:scale-95 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="후기 닫기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Next Button */}
        {onNavigate && hasNext && (
          <button
            onClick={() => onNavigate('next')}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 rounded-full text-white transition-all text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="다음 후기 보기"
          >
            <span className="hidden sm:inline">다음</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasNext && <div />}
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
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
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={handleNextPhoto}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                        >
                          →
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

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t">
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
