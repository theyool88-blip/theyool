'use client';

import Link from 'next/link';

export default function ThePlanHighlight() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-10">
          <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Why The Yool?</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            왜 더율인가?
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light">
            1,200건의 경험으로 만든 체계적 승소 전략
          </p>
        </div>

        {/* THE PLAN 카드 */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-200">
          {/* 타이틀 영역 */}
          <div className="flex items-center gap-4 mb-8">
            <div className="text-5xl md:text-6xl font-bold text-gray-200 leading-none">
              THE PLAN
            </div>
            <div className="flex-1">
              <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">이겨놓고 설계하다</p>
              <p className="text-sm md:text-base text-gray-600">무작정 시작하면 실패합니다</p>
            </div>
          </div>

          {/* 4가지 체크포인트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50">
              <span className="text-blue-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm md:text-base text-gray-800 font-medium">이혼사유 확실히</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50">
              <span className="text-green-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm md:text-base text-gray-800 font-medium">재산분할 최대화</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/50">
              <span className="text-amber-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm md:text-base text-gray-800 font-medium">양육권 확보</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50/50">
              <span className="text-red-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="text-sm md:text-base text-gray-800 font-medium">양육비 확보</span>
            </div>
          </div>

          {/* 설명 텍스트 */}
          <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
            이 4가지가 완벽하게 준비되었을 때, 비로소 진정한 평온을 되찾습니다.
            더율의 체계적인 전략이 당신을 이겨놓고 설계합니다.
          </p>

          {/* CTA 링크 */}
          <Link
            href="/the-plan"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
          >
            The Plan 자세히 보기
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
