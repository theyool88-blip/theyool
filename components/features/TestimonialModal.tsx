'use client';

import { useEffect, useState } from 'react';

export interface TestimonialData {
  id: string;
  snippet: string;
  initial: string;
  profileImage?: string;
  role: string;
  fullContent: string;
  caseType: string;
  evidenceImages?: string[];
  age: string;
}

interface TestimonialModalProps {
  testimonial: TestimonialData;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onCTA: () => void;
}

export default function TestimonialModal({
  testimonial,
  currentIndex,
  totalCount,
  onClose,
  onNavigate,
  onCTA
}: TestimonialModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasEvidencePhotos = testimonial.evidenceImages && testimonial.evidenceImages.length > 0;
  const evidencePhotos = testimonial.evidenceImages || [];

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isLightboxOpen]);

  // 배경 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 터치 스와이프 (모바일)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activePhotoIndex < evidencePhotos.length - 1) {
      setActivePhotoIndex(prev => prev + 1);
    }
    if (isRightSwipe && activePhotoIndex > 0) {
      setActivePhotoIndex(prev => prev - 1);
    }
  };

  // 텍스트 미리보기 (첫 100자 또는 2줄)
  const getPreviewText = () => {
    const lines = testimonial.fullContent.split('\n');
    const firstTwoLines = lines.slice(0, 2).join('\n');
    return firstTwoLines.length > 120
      ? firstTwoLines.slice(0, 120) + '...'
      : firstTwoLines;
  };

  const needsExpansion = testimonial.fullContent.length > 120;

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-8 md:p-4 animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl max-w-sm md:max-w-2xl w-full shadow-2xl animate-scaleIn flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimal Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-2.5 flex items-center justify-between rounded-t-2xl z-10">
            {/* Client Info + Trust Badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-gray-900 text-sm">{testimonial.age}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                {testimonial.caseType}
              </span>
              {hasEvidencePhotos && (
                <>
                  <span className="text-gray-300">·</span>
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[10px] font-semibold">실제증거</span>
                  </div>
                </>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="닫기"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Hero Evidence Photo Section */}
          {hasEvidencePhotos ? (
            <div className="relative bg-gray-900 flex-shrink-0">
              {/* Main Photo Display */}
              <div
                className="relative w-full h-[280px] md:h-[380px] bg-gray-100 flex items-center justify-center overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={evidencePhotos[activePhotoIndex]}
                  alt={`후기 증거 ${activePhotoIndex + 1}`}
                  className="w-full h-full object-contain"
                  onClick={() => setIsLightboxOpen(true)}
                />

                {/* Photo Counter Badge */}
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                  {activePhotoIndex + 1}/{evidencePhotos.length}
                </div>

                {/* Expand Icon */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 left-4 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label="전체화면"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>

                {/* Navigation Arrows (Desktop hover) */}
                {evidencePhotos.length > 1 && (
                  <>
                    {activePhotoIndex > 0 && (
                      <button
                        onClick={() => setActivePhotoIndex(prev => prev - 1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 md:opacity-100 hover:scale-110 backdrop-blur-sm"
                        aria-label="이전 사진"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                    )}
                    {activePhotoIndex < evidencePhotos.length - 1 && (
                      <button
                        onClick={() => setActivePhotoIndex(prev => prev + 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all opacity-0 md:opacity-100 hover:scale-110 backdrop-blur-sm"
                        aria-label="다음 사진"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </>
                )}

              </div>
            </div>
          ) : (
            /* Fallback: No photos - show quote style */
            <div className="flex justify-center pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                <span className="text-white text-4xl font-serif leading-none relative z-10">"</span>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/40 animate-shimmer"></div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="px-5 py-4 space-y-3">
            {/* Client Testimonial Caption */}
            <div className="space-y-2">
              <div className={`text-sm md:text-base text-gray-800 leading-relaxed whitespace-pre-line ${!isTextExpanded ? 'line-clamp-3' : ''}`}>
                {testimonial.fullContent}
              </div>

              {needsExpansion && !isTextExpanded && (
                <button
                  onClick={() => setIsTextExpanded(true)}
                  className="text-sm text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                >
                  <span>더 보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              {isTextExpanded && (
                <button
                  onClick={() => setIsTextExpanded(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 font-semibold flex items-center gap-1"
                >
                  <span>접기</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Verification Note */}
            {hasEvidencePhotos && (
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">실제 의뢰인이 남긴 증빙 자료입니다</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-5 py-4 rounded-b-2xl space-y-3">
            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: totalCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx < currentIndex) onNavigate('prev');
                    else if (idx > currentIndex) onNavigate('next');
                  }}
                  className={`transition-all ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-amber-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                  aria-label={`후기 ${idx + 1}`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onCTA}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold text-sm rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>나도 이런 결과를 원한다면</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* More Testimonials Link */}
            <button
              onClick={() => {
                onClose();
                const section = document.getElementById('testimonials-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              더 많은 후기 보기 →
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && hasEvidencePhotos && (
        <div
          className="fixed inset-0 bg-black z-[300] flex items-center justify-center animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
            aria-label="닫기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Photo Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
            {activePhotoIndex + 1} / {evidencePhotos.length}
          </div>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={evidencePhotos[activePhotoIndex]}
              alt={`증거 ${activePhotoIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Navigation */}
          {evidencePhotos.length > 1 && (
            <>
              {activePhotoIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(prev => prev - 1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="이전"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {activePhotoIndex < evidencePhotos.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(prev => prev + 1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                  aria-label="다음"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        :global(.animate-shimmer) {
          animation: shimmer 3s infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
