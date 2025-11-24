'use client';

import { useEffect, useState } from 'react';

interface PhonePrepModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber?: string;
  autoDialDelay?: number;
}

export default function PhonePrepModal({
  isOpen,
  onClose,
  phoneNumber = '1661-7633',
  autoDialDelay = 5000
}: PhonePrepModalProps) {
  const [countdown, setCountdown] = useState(Math.floor(autoDialDelay / 1000));
  const [cancelled, setCancelled] = useState(false);

  // Reset countdown and cancelled state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(Math.floor(autoDialDelay / 1000));
      setCancelled(false);
    }
  }, [isOpen, autoDialDelay]);

  useEffect(() => {
    if (countdown > 0 && !cancelled && isOpen) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, cancelled, isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCancelled(true);
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setCancelled(true);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gradient-to-b from-sage-900/20 via-black/30 to-black/40 backdrop-blur-[2px] z-[200] flex items-center justify-center p-6 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-[340px] w-full animate-scaleIn">
        <div className="relative">
          <button
            onClick={() => {
              setCancelled(true);
              onClose();
            }}
            className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all z-10 group"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="bg-white/98 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-10px_rgba(109,181,164,0.15)] border border-sage-100/20 p-14">
          <div className="flex justify-center mb-9">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/40 to-sage-300/40 rounded-3xl blur-xl"></div>
              <div className="relative w-[72px] h-[72px] bg-gradient-to-br from-sage-500 via-sage-600 to-sage-700 rounded-3xl flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(109,181,164,0.3)]">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Emotional Tagline Badge */}
            <div className="flex justify-center mb-3">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-100 border border-sage-500/20"
                style={{
                  animation: 'fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
                }}
              >
                <div className="w-1 h-1 rounded-full bg-sage-500"></div>
                <p className="text-xs font-medium text-sage-800 tracking-wide">
                  5초 후, 12년의 경험이 응답합니다
                </p>
              </div>
            </div>

            <h3 className="text-[32px] font-[650] text-gray-900 text-center tracking-[-0.02em] leading-none">
              10분 무료
            </h3>

            {!cancelled && countdown > 0 && (
              <div className="flex justify-center">
                <div className="inline-flex items-baseline gap-1.5">
                  <span className="text-[22px] font-[550] text-sage-600 tracking-[-0.01em]">
                    {countdown}
                  </span>
                  <span className="text-[15px] font-medium text-sage-500">
                    초 후 연결 준비
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-1">
            <p className="text-[15px] font-medium text-gray-700 text-center tracking-[-0.01em]">
              상담사가 준비중이에요
            </p>

            <p className="text-[13px] text-gray-500 text-center tracking-[-0.005em]">
              무슨 말을 할지 모르겠어도 괜찮아요
            </p>

            {/* Consultation Info Link - Only during countdown */}
            {!cancelled && countdown > 0 && (
              <div className="mt-5 flex justify-center">
                <a
                  href="/consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    setCancelled(true);
                    onClose();
                    window.location.href = '/consultation';
                  }}
                  className="inline-flex items-center gap-1.5 py-2 text-[14px] font-semibold text-sage-700 active:text-sage-800 transition-colors"
                >
                  <span>상담 전 궁금한 점이 있으신가요?</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>

          {!cancelled && countdown === 0 && (
            <div className="mt-8 space-y-4">
              <a
                href={`tel:${phoneNumber}`}
                onClick={() => {
                  setTimeout(() => onClose(), 300);
                }}
                className="block w-full py-4 bg-gradient-to-r from-sage-600 to-sage-500 text-white text-center font-bold rounded-2xl hover:from-sage-700 hover:to-sage-600 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                전화 연결하기
              </a>
              <p className="text-[13px] text-gray-400 text-center">
                버튼을 눌러 전화를 걸어주세요
              </p>

              {/* Consultation Info Link - Also show after countdown */}
              <div className="pt-2 border-t border-gray-200">
                <a
                  href="/consultation"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    window.location.href = '/consultation';
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 text-[14px] font-semibold text-sage-700 active:text-sage-800 transition-colors"
                >
                  <span>상담 전 궁금한 점이 있으신가요?</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-scaleIn {
          animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}
