'use client';

import { useState, useEffect } from 'react';

export default function LiveActivityIndicator() {
  const [viewerCount, setViewerCount] = useState(0);
  const [recentConsultations, setRecentConsultations] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // 초기 방문자 수 (47-93 사이 랜덤)
    const initialCount = Math.floor(Math.random() * 47) + 47;
    setViewerCount(initialCount);

    // 방문자 수 실시간 변동 (±3명)
    const viewerInterval = setInterval(() => {
      setViewerCount((prev) => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 ~ +3
        const newCount = prev + change;
        return Math.max(45, Math.min(95, newCount)); // 45-95 범위 유지
      });
    }, 8000);

    // 최근 상담 신청 알림 (20-40초마다)
    const consultationInterval = setInterval(() => {
      const names = ['김○○', '이○○', '박○○', '최○○', '정○○', '강○○', '조○○', '윤○○'];
      const locations = ['서울', '경기', '부산', '인천', '대구', '대전', '광주', '울산'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];

      const notification = `${randomLocation} ${randomName}님이 방금 상담을 신청했습니다`;

      setRecentConsultations((prev) => [notification, ...prev.slice(0, 2)]);
      setShowNotification(true);

      setTimeout(() => setShowNotification(false), 5000);
    }, Math.random() * 20000 + 20000); // 20-40초

    return () => {
      clearInterval(viewerInterval);
      clearInterval(consultationInterval);
    };
  }, []);

  return (
    <>
      {/* 상단 라이브 바 */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 text-center text-sm">
        <div className="flex items-center justify-center gap-4 max-w-[1200px] mx-auto flex-wrap">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="font-semibold">LIVE</span>
          </div>
          <span>
            지금 <strong className="text-lg font-bold">{viewerCount}명</strong>이 이 페이지를 보고 있습니다
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">
            오늘 <strong>127건</strong> 상담 진행 중
          </span>
        </div>
      </div>

      {/* 최근 상담 신청 알림 (우측 하단) */}
      {showNotification && recentConsultations[0] && (
        <div className="fixed bottom-24 md:bottom-6 left-6 z-40 animate-slide-in-left">
          <div className="bg-white rounded-lg shadow-2xl border-2 border-blue-200 p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  새로운 상담 신청
                </p>
                <p className="text-xs text-gray-600">
                  {recentConsultations[0]}
                </p>
                <p className="text-xs text-gray-400 mt-1">방금 전</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
