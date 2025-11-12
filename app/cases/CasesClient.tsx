'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import type { Case } from '@/lib/notion/types';

interface CasesClientProps {
  cases: Case[];
}

const categories = ['전체', '상간', '위자료', '재산분할', '양육권', '이혼'];

export default function CasesClient({ cases }: CasesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredCases = selectedCategory === '전체'
    ? cases
    : cases.filter(c => c.categoryNames.includes(selectedCategory));

  return (
    <PageLayout>
      {/* Hero Section + 카테고리 통합 */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-pink-50/20 to-white overflow-hidden">
        {/* Soft Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="caseDots" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1.5" fill="#f9a8d4" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#caseDots)" />
            <circle cx="20%" cy="40%" r="180" fill="#fce7f3" opacity="0.2" />
            <circle cx="80%" cy="60%" r="200" fill="#fae8ff" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto">
          {/* 제목 */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-pink-600/70 mb-3 tracking-[0.2em] uppercase">Success Cases</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
              실제 성공 사례
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              더율이 만들어낸 승리의 기록들
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 성공사례 그리드 */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* 사례 카드 그리드 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {filteredCases.map((caseItem, index) => (
              <ScrollReveal key={caseItem.id} delay={index * 100}>
                <Link href={`/cases/${caseItem.slug}`}>
                  <div className={`group relative bg-gradient-to-br ${caseItem.bgColor} rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border-2 border-white/50`}>
                    {/* 배경 패턴 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/15 rounded-full -ml-12 -mb-12" />

                    {/* Categories (다중 카테고리) */}
                    <div className="relative mb-4 flex flex-wrap gap-2">
                      {caseItem.categoryNames.map((name, idx) => (
                        <span key={idx} className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                          {name}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="relative text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                      {caseItem.title}
                    </h3>

                    {/* Result Badge */}
                    <div className="relative inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 mt-4">
                      <span className="text-sm md:text-base font-bold text-gray-900">
                        {caseItem.result}
                      </span>
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* 안내 메시지 */}
          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">해당 카테고리의 사례가 준비중입니다.</p>
            </div>
          )}

          {/* Coming Soon */}
          {cases.length > 0 && (
            <ScrollReveal delay={400}>
              <div className="mt-16 text-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200">
                <div className="text-6xl mb-6">📋</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  더 많은 성공사례 준비중
                </h3>
                <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  의뢰인의 개인정보 보호를 위해 세심하게 준비 중입니다.<br />
                  곧 더 많은 성공사례를 만나보실 수 있습니다.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA - 홈페이지 스타일 */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white via-purple-50/15 to-pink-50/20 overflow-hidden">
        {/* Warm Hope Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ctaHopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fae8ff', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 0.25 }} />
              </linearGradient>
            </defs>
            <circle cx="25%" cy="35%" r="200" fill="url(#ctaHopeGrad)" />
            <circle cx="75%" cy="65%" r="220" fill="#fdf2f8" opacity="0.3" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            당신의 사건도<br />
            성공사례로 만들겠습니다
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-700">
            30분 무료 상담으로 당신의 사건을 분석해드립니다
          </p>
          <a
            href="tel:02-1234-5678"
            className="inline-block bg-gray-900 text-white font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl"
          >
            📞 지금 상담하기
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
