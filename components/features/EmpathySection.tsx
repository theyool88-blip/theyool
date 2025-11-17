'use client';

import { useState } from 'react';

export default function EmpathySection() {
  const [, setIsTalkModalOpen] = useState(false);

  const concerns = [
    {
      icon: '💔',
      title: '상처 → 회복',
      text: '감정적 혼란을 법적 대응력으로 바꿔드려요'
    },
    {
      icon: '👶',
      title: '걱정 → 안심',
      text: '아이들의 안정적인 미래를 함께 설계해요'
    },
    {
      icon: '💰',
      title: '불안 → 확실',
      text: '정당한 재산분할로 경제적 독립을 도와요'
    },
    {
      icon: '📋',
      title: '복잡 → 단순',
      text: '어려운 절차를 쉬운 단계로 안내해요'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/30 via-white to-amber-50/20">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            이런 마음, 저희가 봐왔어요
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light">
            1,200번 들어본 고민들. 해결책도 그만큼 준비되어 있습니다.
          </p>
        </div>

        {/* 체크리스트 */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {concerns.map((concern, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 md:p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-amber-50 rounded-full flex items-center justify-center text-xl md:text-2xl">
                  {concern.icon}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                    {concern.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {concern.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 메시지 + CTA */}
        <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-white">
          <p className="text-xl md:text-2xl font-bold mb-6">
            이 중에 당신 이야기가 있나요?
          </p>
          <p className="text-sm md:text-base text-gray-300 mb-8">
            각 상황별 맞춤 전략을 바로 확인해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:1661-7633"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              내 상황 진단받기 (3분)
            </a>
            <span className="text-xs md:text-sm text-gray-400">
              평일 09:00-18:00 · 주말/공휴일 예약상담
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
