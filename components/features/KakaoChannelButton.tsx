'use client';

import { useEffect, useState } from 'react';

export default function KakaoChannelButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트로 버튼 표시/숨김
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openKakaoChannel = () => {
    // 실제 카카오톡 채널 URL로 교체 필요
    // 예: https://pf.kakao.com/_your_channel_id
    window.open('https://pf.kakao.com/_xmxjxjxj', '_blank');
  };

  return (
    <>
      {/* 데스크탑: 우측 하단 플로팅 버튼 */}
      <div className="hidden md:block">
        <button
          onClick={openKakaoChannel}
          className={`fixed right-6 bottom-24 z-40 transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          aria-label="카카오톡 상담"
        >
          <div className="relative group">
            {/* 툴팁 */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                카카오톡 실시간 상담
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                  <div className="border-8 border-transparent border-l-gray-900"></div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="bg-yellow-400 hover:bg-yellow-500 rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 cursor-pointer">
              <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 5.58 2 10c0 2.89 2.09 5.41 5.18 6.81L6 22l6.09-3.43C12.06 18.57 12.03 18.57 12 18.57c5.52 0 10-3.58 10-8.57S17.52 2 12 2z" />
              </svg>
            </div>

            {/* 뱃지 */}
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              N
            </div>
          </div>
        </button>
      </div>

      {/* 모바일: 하단 고정 바 (StickyMobileCTA와 함께 작동) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 gap-2 p-3">
          {/* 전화 */}
          <a
            href="tel:1661-7633"
            className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-700">전화상담</span>
          </a>

          {/* 카카오톡 */}
          <button
            onClick={openKakaoChannel}
            className="flex flex-col items-center gap-1 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors relative"
          >
            <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 5.58 2 10c0 2.89 2.09 5.41 5.18 6.81L6 22l6.09-3.43C12.06 18.57 12.03 18.57 12 18.57c5.52 0 10-3.58 10-8.57S17.52 2 12 2z" />
            </svg>
            <span className="text-xs font-semibold text-gray-700">카톡상담</span>
            <div className="absolute -top-1 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              N
            </div>
          </button>

          {/* 예약 */}
          <button
            onClick={() => {
              const form = document.querySelector('#consultation-form');
              form?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-700">예약하기</span>
          </button>
        </div>
      </div>
    </>
  );
}
