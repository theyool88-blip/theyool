'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ThePlanHighlight() {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  return (
    <section className="relative py-24 md:py-36 bg-gradient-to-b from-white via-sage-50/30 to-white">
      {/* Bottom gradient transition to RealStory */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white/95 pointer-events-none z-[5]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* THE PLAN 카드 - Sage Dark */}
        <div className="relative bg-gradient-to-br from-sage-800 to-sage-900 rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
          {/* Accent pattern - Sage Green */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sage-400/30 to-sage-300/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* WHY THEYOOL 배지 */}
            <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold rounded-full mb-6 border border-white/20 tracking-widest">
              WHY THEYOOL?
            </div>

            {/* 타이틀 영역 */}
            <div className="mb-8">
              <div className="text-5xl md:text-7xl font-black text-white mb-4 leading-none">
                THE PLAN
              </div>
              <p className="text-lg md:text-xl font-semibold text-white mb-4">
                1,200의 경험을 거치며 만든 체계적인 승소 전략이 있습니다
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                결혼할 때는 몰랐던 것들, 이혼할 때는 모든 걸 알고 결정해야 합니다.<br />
                더율은 당신이 놓칠 수 있는 모든 것을 미리 준비합니다.
              </p>
            </div>

            {/* 4가지 아코디언 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* 1. 이혼과 상간에 집중 */}
              <div className="flex flex-col p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <button
                  onClick={() => setExpanded1(!expanded1)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <span className="text-sage-400 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-white font-semibold mb-1">이혼과 상간에 집중</p>
                      <span className="text-white/60 text-sm">{expanded1 ? '▲' : '▼'}</span>
                    </div>
                    <p className="text-xs text-gray-400">좁고 깊게, 그래서 더 잘합니다</p>
                  </div>
                </button>
                {expanded1 && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      더율은 이혼과 상간 사건만 전문으로 합니다. 위자료, 재산분할, 양육권, 양육비 - 이 네 가지를 위해 모든 역량을 집중합니다.
                    </p>
                    <Link href="/cases" className="text-sm text-sage-400 hover:text-sage-300 font-medium">
                      성공사례 보기 →
                    </Link>
                  </div>
                )}
              </div>

              {/* 2. 모든 질문에 답이 있습니다 */}
              <div className="flex flex-col p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <button
                  onClick={() => setExpanded2(!expanded2)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <span className="text-sage-400 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-white font-semibold mb-1">모든 질문에 답이 있습니다</p>
                      <span className="text-white/60 text-sm">{expanded2 ? '▲' : '▼'}</span>
                    </div>
                    <p className="text-xs text-gray-400">76개의 이혼큐레이션 Q&A</p>
                  </div>
                </button>
                {expanded2 && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      이혼을 앞둔 당신의 불안, 우리는 이미 알고 있습니다. 혼자 고민하지 마세요, 우리가 먼저 겪고 정리한 답이 있습니다.
                    </p>
                    <Link href="/faq" className="text-sm text-sage-400 hover:text-sage-300 font-medium">
                      이혼큐레이션 전체 보기 →
                    </Link>
                  </div>
                )}
              </div>

              {/* 3. 1,200건이 증명합니다 */}
              <div className="flex flex-col p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <button
                  onClick={() => setExpanded3(!expanded3)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <span className="text-sage-400 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-white font-semibold mb-1">1,200건이 증명합니다</p>
                      <span className="text-white/60 text-sm">{expanded3 ? '▲' : '▼'}</span>
                    </div>
                    <p className="text-xs text-gray-400">숫자로 증명된 실력</p>
                  </div>
                </button>
                {expanded3 && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      21개의 성공사례와 18개의 전문 칼럼이 우리의 실력을 말해줍니다. 숫자로 증명된 87%의 승소율, 평균 92시간의 집중 투입.
                    </p>
                    <Link href="/blog" className="text-sm text-sage-400 hover:text-sage-300 font-medium">
                      변호사 칼럼 읽기 →
                    </Link>
                  </div>
                )}
              </div>

              {/* 4. 미리 설계하는 승소 전략 */}
              <div className="flex flex-col p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <button
                  onClick={() => setExpanded4(!expanded4)}
                  className="flex items-start gap-3 w-full text-left"
                >
                  <span className="text-sage-400 flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm md:text-base text-white font-semibold mb-1">미리 설계하는 승소 전략</p>
                      <span className="text-white/60 text-sm">{expanded4 ? '▲' : '▼'}</span>
                    </div>
                    <p className="text-xs text-gray-400">THE PLAN으로 이겨놓고 시작</p>
                  </div>
                </button>
                {expanded4 && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                      이 모든 경험과 전문성으로 완성한 것이 바로 THE PLAN입니다. 당신의 사건을 시작하기 전에, 끝을 먼저 그립니다.
                    </p>
                    <Link href="/the-plan" className="text-sm text-sage-400 hover:text-sage-300 font-medium">
                      The Plan 자세히 알아보기 →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* 설명 텍스트 */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm md:text-base text-white font-medium mb-2">
                막막한 마음으로 시작하지 마세요.
              </p>
              <p className="text-sm md:text-base text-gray-300 mb-6">
                더율의 THE PLAN으로 이미 검증된 길을 따라가세요.
              </p>
            </div>

            {/* CTA 버튼 */}
            <Link
              href="/the-plan"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-all group text-sm md:text-base shadow-xl hover:shadow-2xl hover:scale-105"
            >
              THE PLAN 확인하기
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
