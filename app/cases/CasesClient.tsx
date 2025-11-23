'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import type { CaseListItem } from '@/types/case';
import { categoryOverlayMap } from '@/lib/notion/types';

interface CasesClientProps {
  cases: CaseListItem[];
}

const categories = ['전체', '상간', '위자료', '재산분할', '양육권', '이혼'];

export default function CasesClient({ cases }: CasesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');

  // 필터링 및 정렬
  let filteredCases = selectedCategory === '전체'
    ? cases
    : cases.filter(c => c.categoryNames.includes(selectedCategory));

  // 정렬 적용
  filteredCases = [...filteredCases].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  return (
    <PageLayout>
      {/* Hero Section + 카테고리 통합 */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
        {/* Soft Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="caseDots" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1.5" fill="#93c5fd" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#caseDots)" />
            <circle cx="20%" cy="40%" r="180" fill="#dbeafe" opacity="0.2" />
            <circle cx="80%" cy="60%" r="200" fill="#e0e7ff" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto">
          {/* 제목 */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Success Cases</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
              실제 성공 사례
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              더율이 만들어낸 승리의 기록들
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
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

          {/* 정렬 옵션 */}
          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900/20"
            >
              <option value="latest">최신순</option>
              <option value="oldest">오래된순</option>
            </select>
          </div>
        </div>
      </section>

      {/* 성공사례 그리드 */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* 사례 카드 그리드 */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {filteredCases.map((caseItem, index) => {
              const detailSlug = caseItem.slug || caseItem.id;
              // 첫 번째 카테고리 기준으로 오버레이 색상 결정
              const overlayColor = caseItem.categoryNames.length > 0
                ? categoryOverlayMap[caseItem.categoryNames[0]] || categoryOverlayMap[caseItem.categories[0]] || 'from-white/80 via-white/75 to-white/70'
                : 'from-white/80 via-white/75 to-white/70';

              return (
                <ScrollReveal key={caseItem.id} delay={index * 100}>
                  <Link href={`/cases/${detailSlug}`}>
                    <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-[350px] md:h-[380px]">
                      {/* 배경 이미지 */}
                      {caseItem.coverImage && (
                        <div className="absolute inset-0">
                          <img
                            src={caseItem.coverImage}
                            alt={caseItem.title}
                            className="w-full h-full object-cover object-center md:object-right"
                          />
                        </div>
                      )}

                      {/* 파스텔 오버레이 - 투명도 감소로 배경 이미지 더 보이게 */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${overlayColor}`} />

                      {/* 추가 흰색 오버레이 (가독성) - 투명도 감소 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/15 to-white/10" />

                      {/* 콘텐츠 */}
                      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                        {/* 상단: 카테고리 배지 */}
                        <div className="flex flex-wrap gap-2">
                          {caseItem.categoryNames.map((name, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800"
                            >
                              {name}
                            </span>
                          ))}
                        </div>

                        {/* 하단: 제목 + 요약 + 결과 */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:translate-x-1 transition-transform duration-300">
                            {caseItem.title}
                          </h3>

                          {/* 요약 (있는 경우) */}
                          {caseItem.summary && (
                            <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                              {caseItem.summary}
                            </p>
                          )}

                          {/* 결과 배지 */}
                          <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50">
                            <span className="text-sm md:text-base font-bold text-gray-900">
                              결과: {caseItem.result}
                            </span>
                          </div>

                          {/* Arrow Icon */}
                          <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* 안내 메시지 */}
          {filteredCases.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">해당 카테고리의 사례가 준비중입니다.</p>
            </div>
          )}

          {/* Coming Soon - 10개 미만일 때만 표시 */}
          {cases.length > 0 && cases.length < 10 && (
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
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white via-blue-50/15 to-white overflow-hidden">
        {/* Warm Hope Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ctaHopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#dbeafe', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#e0e7ff', stopOpacity: 0.25 }} />
              </linearGradient>
            </defs>
            <circle cx="25%" cy="35%" r="200" fill="url(#ctaHopeGrad)" />
            <circle cx="75%" cy="65%" r="220" fill="#eff6ff" opacity="0.3" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            다음 성공사례는<br />
            당신 차례예요
          </h2>
          <p className="text-lg md:text-xl mb-12 text-gray-700">
            30분 무료 상담으로 사건을 분석해드려요
          </p>
          <a
            href="tel:1661-7633"
            className="inline-block bg-gray-900 text-white font-bold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            지금 상담하기
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
