'use client';

import { useState, useEffect } from 'react';
import PhonePrepModal from './PhonePrepModal';

interface FloatingPhoneButtonProps {
  position?: 'bottom-right' | 'bottom-left';
  triggerAfterSeconds?: number;
  showAfterScrollPercent?: number;
  excludePages?: string[];
  phoneNumber?: string;
}

export default function FloatingPhoneButton({
  position = 'bottom-right',
  triggerAfterSeconds = 3,
  showAfterScrollPercent = 20,
  excludePages = ['/booking', '/admin'],
  phoneNumber = '1661-7633'
}: FloatingPhoneButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
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
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <>
      {/* Floating Phone Button */}
      <div
        className={`
          fixed z-50 ${positionClasses[position]}
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
        `}
      >
        <button
          onClick={() => setShowPhoneModal(true)}
          className="group relative"
          aria-label="전화 상담"
        >
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-amber-400 opacity-50 animate-pulse" />

          {/* Main button */}
          <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold px-5 py-5 rounded-full shadow-2xl hover:shadow-amber-500/50 transform hover:scale-110 transition-all duration-200 flex items-center gap-3">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap shadow-xl">
              {phoneNumber} 전화하기
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>

        {/* Quick info badge - appears after 2 seconds */}
        {isVisible && (
          <div
            className="absolute -top-16 right-0 bg-white rounded-full px-4 py-2 shadow-lg border border-amber-200 animate-slideDown"
            style={{ animationDelay: '2s' }}
          >
            <p className="text-xs font-bold text-gray-900 whitespace-nowrap">
              📞 {phoneNumber}
            </p>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              무료 상담 중
            </p>
          </div>
        )}
      </div>

      {/* Phone Prep Modal */}
      {showPhoneModal && (
        <PhonePrepModal
          isOpen={showPhoneModal}
          onClose={() => setShowPhoneModal(false)}
          phoneNumber={phoneNumber}
        />
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
