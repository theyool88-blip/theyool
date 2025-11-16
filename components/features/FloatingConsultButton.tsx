'use client';

import { useState, useEffect } from 'react';

export default function FloatingConsultButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤을 200px 이상 내리면 버튼 표시
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // 전화 걸기 또는 상담 페이지로 이동
    window.location.href = 'tel:1661-7633';
  };

  const handleKakaoClick = () => {
    // 카카오톡 채널로 이동 (실제 링크로 교체 필요)
    window.open('https://pf.kakao.com/_your_channel_id', '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button Group */}
      <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3">
        {/* 확장된 버튼들 */}
        {isExpanded && (
          <div className="flex flex-col gap-3 animate-slide-in-from-right">
            {/* 카카오톡 버튼 */}
            <button
              onClick={handleKakaoClick}
              className="group flex items-center gap-3 bg-[#FEE500] hover:bg-[#FDD835] text-black px-5 py-3 rounded-full shadow-toss-xl transition-all duration-300 hover:scale-105"
              aria-label="카카오톡 상담"
            >
              <span className="text-xl">💬</span>
              <span className="font-semibold text-sm whitespace-nowrap">카카오톡 상담</span>
            </button>

            {/* 전화 버튼 */}
            <button
              onClick={handleClick}
              className="group flex items-center gap-3 bg-[var(--accent)] hover:bg-[var(--accent-dark)] text-white px-5 py-3 rounded-full shadow-toss-xl transition-all duration-300 hover:scale-105"
              aria-label="전화 상담"
            >
              <span className="text-xl">📞</span>
              <span className="font-semibold text-sm whitespace-nowrap">전화 상담</span>
            </button>
          </div>
        )}

        {/* 메인 Floating 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group relative bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white rounded-full shadow-toss-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden"
          style={{
            width: '64px',
            height: '64px',
          }}
          aria-label="상담 메뉴"
        >
          {/* 펄스 애니메이션 */}
          <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-75 animate-ping" />

          {/* 버튼 내용 */}
          <span className="relative z-10 flex items-center justify-center">
            {isExpanded ? (
              // X 아이콘 (닫기)
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // 말풍선 아이콘
              <svg className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </span>

          {/* 호버 시 확대 효과 */}
          <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>

        {/* 툴팁 */}
        {!isExpanded && (
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[var(--gray-900)] text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap">
              무료 상담하기
              <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[var(--gray-900)]" />
            </div>
          </div>
        )}
      </div>

      {/* 배경 오버레이 (확장 시) */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 z-[998] backdrop-blur-sm"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
