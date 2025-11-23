'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PhonePrepModal from './PhonePrepModal';

interface FloatingConsultationWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  triggerAfterSeconds?: number;
  showAfterScrollPercent?: number;
  excludePages?: string[];
}

export default function FloatingConsultationWidget({
  position = 'bottom-right',
  triggerAfterSeconds = 5,
  showAfterScrollPercent = 30,
  excludePages = ['/booking', '/admin']
}: FloatingConsultationWidgetProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if current page should exclude widget
    const currentPath = window.location.pathname;
    const shouldExclude = excludePages.some(page => currentPath.startsWith(page));

    if (shouldExclude) {
      setShouldRender(false);
      return;
    }

    // Time-based trigger
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, triggerAfterSeconds * 1000);

    // Scroll-based trigger
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent >= showAfterScrollPercent) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerAfterSeconds, showAfterScrollPercent, excludePages]);

  if (!shouldRender) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
  };

  const handleKakaoTalk = () => {
    window.open('http://pf.kakao.com/_xdKxhcG/chat', '_blank');
    setIsExpanded(false);
  };

  return (
    <>
      <div
        className={`
          fixed z-50 ${positionClasses[position]}
          transition-all duration-300 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        {/* Collapsed Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group relative bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 transition-all duration-200 flex items-center gap-3 animate-bounce-subtle"
            aria-label="상담 신청"
          >
            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-pink-400 opacity-75 animate-ping" />

            <span className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hidden sm:inline">무료 상담</span>
              <span className="sm:hidden">상담</span>
            </span>
          </button>
        )}

        {/* Expanded Menu */}
        {isExpanded && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-80 sm:w-96 animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">상담 방법을 선택하세요</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Options */}
            <div className="p-4 space-y-3">
              {/* Phone */}
              <button
                onClick={() => {
                  setShowPhoneModal(true);
                  setIsExpanded(false);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800">전화 상담</div>
                  <div className="text-sm text-gray-600">즉시 연결 (2분 내 응답)</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* KakaoTalk */}
              <button
                onClick={handleKakaoTalk}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 hover:border-yellow-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c5.5 0 10 3.58 10 8 0 4.42-4.5 8-10 8-1.28 0-2.5-.2-3.62-.57L3 21l1.89-5.09C3.69 14.66 2 12.44 2 10c0-4.42 4.5-8 10-8z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800">카카오톡 상담</div>
                  <div className="text-sm text-gray-600">익명 가능 (10분 내 응답)</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Booking Form */}
              <button
                onClick={() => {
                  router.push('/booking');
                  setIsExpanded(false);
                }}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-800">상담 예약</div>
                  <div className="text-sm text-gray-600">방문/화상 예약 (30분 무료)</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                평일 09:00-18:00 | 주말/공휴일 예약 상담
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPhoneModal && (
        <PhonePrepModal isOpen={showPhoneModal} onClose={() => setShowPhoneModal(false)} />
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
