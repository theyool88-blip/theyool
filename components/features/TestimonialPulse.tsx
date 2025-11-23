'use client';

import { useEffect, useState } from 'react';
import TestimonialModal, { type TestimonialData } from './TestimonialModal';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO } from '@/types/testimonial';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
}

export default function TestimonialPulse() {
  const [cases, setCases] = useState<CaseWithEvidence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // DB에서 후기 데이터 로드
  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/testimonials/cases?limit=4&featured=true');
        const result = await response.json();

        if (result.data && result.data.length > 0) {
          setCases(result.data);
        }
      } catch (error) {
        console.error('후기 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCases();
  }, []);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('testimonialPulseDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // 로딩 중이거나 데이터가 없으면 아무것도 안 함
    if (isLoading || cases.length === 0) {
      return;
    }

    // 9초 대기 후 표시
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 9000);

    return () => clearTimeout(showTimer);
  }, [isLoading, cases]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('testimonialPulseDismissed', 'true');
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % cases.length);
    }
  };

  const handleCTA = () => {
    setIsModalOpen(false);
    window.location.href = 'tel:1661-7633';
  };

  // DB 데이터를 TestimonialModal 형식으로 변환
  const convertToModalData = (testimonialCase: CaseWithEvidence): TestimonialData => {
    const categoryInfo = CATEGORY_INFO[testimonialCase.category];

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

  if (!isVisible || isDismissed || cases.length === 0) return null;

  const currentTestimonial = convertToModalData(cases[currentIndex]);

  return (
    <>
      {/* Modal */}
      {isModalOpen && (
        <TestimonialModal
          testimonial={currentTestimonial}
          currentIndex={currentIndex}
          totalCount={cases.length}
          onClose={() => setIsModalOpen(false)}
          onNavigate={handleNavigate}
          onCTA={handleCTA}
        />
      )}

      {/* Simple Float Badge */}
      <div className="fixed bottom-28 left-0 right-0 md:left-6 md:right-auto md:bottom-8 z-40 animate-float-gentle mx-auto md:mx-0"
           style={{ maxWidth: '320px', width: 'calc(100% - 24px)' }}>
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10 transition-colors"
            aria-label="후기 닫기"
          >
            ×
          </button>

          <button
            onClick={handleClick}
            className="group flex items-center gap-3 px-4 py-3 bg-white border-2 border-sage-100 rounded-full shadow-lg shadow-sage-100/20 hover:border-sage-300 hover:shadow-xl hover:shadow-sage-200/30 hover:ring-2 hover:ring-sage-200 hover:ring-offset-1 transition-all duration-300 w-full"
            aria-label={`고객 후기 보기: ${currentTestimonial.snippet}`}
          >
            {/* Left: Check badge with count indicator */}
            <div className="flex-shrink-0 relative">
              <div className="w-5 h-5 rounded-full bg-sage-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Count indicator - subtle coral accent */}
              {cases.length > 1 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 rounded-full flex items-center justify-center animate-pulse-once">
                  <span className="text-[10px] font-bold text-white leading-none">{cases.length}</span>
                </div>
              )}
            </div>

            {/* Center: Text content */}
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-sage-700 transition-colors">
                &quot;{currentTestimonial.snippet}&quot;
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentTestimonial.age} · 실제 후기
              </p>
            </div>

            {/* Right: Arrow hint */}
            <svg className="w-4 h-4 text-gray-400 group-hover:text-sage-600 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        @keyframes pulse-once {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-pulse-once {
          animation: pulse-once 1.2s ease-out 1s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-float-gentle {
            animation: none;
          }
          .animate-pulse-once {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
