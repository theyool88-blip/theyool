// @ts-nocheck - Testimonial types evidence_photos optional
'use client';

import { useState, useEffect } from 'react';
import type { TestimonialCase } from '@/types/testimonial';
import TestimonialLightbox from './TestimonialLightbox';

export default function FloatingReviewBadge() {
  const [cases, setCases] = useState<TestimonialCase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/testimonials/cases?limit=12&featured=true');
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          setCases(result.data);
          setIsVisible(true);
        }
      } catch (error) {
        console.error('후기 로드 실패:', error);
      }
    }

    loadCases();
  }, []);

  // Auto-rotation every 8 seconds
  useEffect(() => {
    if (cases.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cases.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [cases.length]);

  if (!isVisible || cases.length === 0 || isDismissed) {
    return null;
  }

  const currentCase = cases[currentIndex];

  const handleClick = () => {
    setIsLightboxOpen(true);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentIndex === 0 ? cases.length - 1 : currentIndex - 1)
      : (currentIndex === cases.length - 1 ? 0 : currentIndex + 1);
    setCurrentIndex(newIndex);
  };

  const hasPrev = cases.length > 1;
  const hasNext = cases.length > 1;

  return (
    <>
      <div className="fixed bottom-28 right-4 md:bottom-32 md:right-6 z-40 animate-float-gentle">
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 transition-colors"
            aria-label="후기 배지 닫기"
          >
            ×
          </button>

          <button
            onClick={handleClick}
            className="group flex items-center gap-3 px-4 py-3 bg-white border-2 border-amber-100 rounded-full shadow-lg shadow-amber-100/20 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-200/30 transition-all duration-300 max-w-[280px] md:max-w-[320px] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus:outline-none"
            aria-label={`고객 후기 보기: ${currentCase.highlight_text}`}
          >
          {/* Left: Naver badge */}
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Center: Text content */}
          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
              &quot;{currentCase.highlight_text}&quot;
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentCase.client_initial} 님 · 네이버 리뷰
            </p>
          </div>

          {/* Right: Arrow hint */}
          <svg className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5l7 7-7 7" />
          </svg>
        </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <TestimonialLightbox
          testimonialCase={currentCase}
          onClose={() => setIsLightboxOpen(false)}
          onNavigate={handleNavigate}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-gentle {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
