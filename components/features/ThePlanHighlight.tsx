'use client';

import Link from 'next/link';

export default function ThePlanHighlight() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 via-purple-50/30 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* THE PLAN 카드 - Premium Dark */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Accent pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* WHY THE PLAN 배지 */}
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full mb-6 border border-white/20 tracking-widest">
              WHY THE PLAN?
            </div>

            {/* 타이틀 영역 */}
            <div className="mb-8">
              <div className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
                THE PLAN
              </div>
              <p className="text-lg md:text-xl font-semibold text-white mb-4">
                이혼을 앞두고 막막하신가요?
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                결혼할 때는 몰랐던 것들, 이혼할 때는 모든 걸 알고 결정해야 합니다.<br />
                더율은 당신이 놓칠 수 있는 모든 것을 미리 준비합니다.
              </p>
            </div>

            {/* 4가지 체크포인트 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <span className="text-blue-400 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm md:text-base text-white font-semibold mb-1">확실한 이혼 사유</p>
                  <p className="text-xs text-gray-400">흔들리지 않는 시작</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <span className="text-green-400 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm md:text-base text-white font-semibold mb-1">정당한 재산 분할</p>
                  <p className="text-xs text-gray-400">숨겨진 것까지 찾아내는 철저함</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm md:text-base text-white font-semibold mb-1">양육권 확보</p>
                  <p className="text-xs text-gray-400">아이와의 미래를 지키는 전략</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <span className="text-red-400 flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm md:text-base text-white font-semibold mb-1">안정적 양육비</p>
                  <p className="text-xs text-gray-400">새 삶을 위한 경제적 기반</p>
                </div>
              </div>
            </div>

            {/* 설명 텍스트 */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm md:text-base text-white font-medium mb-2">
                무작정 시작한 이혼은 또 다른 실패가 됩니다.
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-6">
                더율의 THE PLAN으로 이겨놓고 설계하세요.
              </p>
            </div>

            {/* CTA 버튼 */}
            <Link
              href="/the-plan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all group text-sm md:text-base shadow-xl hover:shadow-2xl hover:scale-105"
            >
              지금 시작하기 전에, THE PLAN 먼저 보기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
