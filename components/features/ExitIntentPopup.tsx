'use client';

import { useState, useEffect } from 'react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // 이미 표시했거나, 세션 중에 닫았다면 다시 표시하지 않음
    if (hasShown || sessionStorage.getItem('exitPopupShown')) {
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // 마우스가 화면 상단을 벗어날 때만 (뒤로가기 의도)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');

        // Google Analytics 이벤트
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'exit_intent_shown', {
            event_category: 'engagement',
          });
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);

    // Google Analytics 이벤트
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_closed', {
        event_category: 'engagement',
      });
    }
  };

  const handleClaim = () => {
    // 상담 폼으로 스크롤
    const form = document.querySelector('#consultation-form');
    form?.scrollIntoView({ behavior: 'smooth' });
    setIsVisible(false);

    // Google Analytics 이벤트
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_converted', {
        event_category: 'conversion',
        value: 1,
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="닫기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 내용 */}
        <div className="p-8 text-center">
          <div className="text-5xl mb-4">⏰</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            잠깐! 무료 상담 기회를 놓치지 마세요
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            지금 신청하시는 분들께<br />
            <strong className="text-red-600 text-xl">초회 상담료 100% 무료</strong><br />
            <span className="text-sm text-gray-600">(정상가: 30만원)</span>
          </p>

          {/* 혜택 리스트 */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
            <p className="font-semibold text-gray-900 mb-3">오늘만 받을 수 있는 혜택</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span className="text-gray-700">15년 경력 전문 변호사 1:1 상담</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span className="text-gray-700">사건 승소 가능성 무료 분석</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span className="text-gray-700">맞춤 전략 제시 (추가 비용 없음)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">✓</span>
                <span className="text-gray-700">30분 내 전화 상담 보장</span>
              </li>
            </ul>
          </div>

          {/* CTA 버튼 */}
          <button
            onClick={handleClaim}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg mb-3"
          >
            지금 무료 상담 신청하기
          </button>

          <button
            onClick={handleClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            다음에 할게요
          </button>
        </div>

        {/* 긴급성 배지 */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
          🔥 오늘만 무료
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
