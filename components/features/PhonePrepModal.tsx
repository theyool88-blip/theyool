'use client';

import { useEffect, useState } from 'react';

interface PhonePrepModalProps {
  onClose: () => void;
  phoneNumber?: string;
  autoDialDelay?: number;
}

export default function PhonePrepModal({
  onClose,
  phoneNumber = '1661-7633',
  autoDialDelay = 2000
}: PhonePrepModalProps) {
  const [countdown, setCountdown] = useState(Math.floor(autoDialDelay / 1000));
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    // 카운트다운
    if (countdown > 0 && !cancelled) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // 자동 다이얼
    if (countdown === 0 && !cancelled) {
      window.location.href = `tel:${phoneNumber}`;
      // 전화 연결 후 모달 닫기 (약간의 지연)
      setTimeout(() => {
        onClose();
      }, 500);
    }
  }, [countdown, cancelled, phoneNumber, onClose]);

  const handleCancel = () => {
    setCancelled(true);
    onClose();
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn">
        {/* 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
          바로 연결해 드릴게요
        </h3>

        {/* 전화번호 */}
        <div className="text-center mb-6">
          <a href={`tel:${phoneNumber}`} className="text-3xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
            {phoneNumber}
          </a>
        </div>

        {/* 신뢰 포인트 */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">100% 비밀 보장</span>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">10분 무료 상담</span>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 rounded-lg p-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">계약 강요 없음</span>
          </div>
        </div>

        {/* 카운트다운 또는 상태 */}
        {!cancelled && countdown > 0 && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                {countdown}초 후 자동 연결...
              </span>
            </div>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCallNow}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            지금 바로 연결하기
          </button>
          <button
            onClick={handleCancel}
            className="w-full py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all"
          >
            취소
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
