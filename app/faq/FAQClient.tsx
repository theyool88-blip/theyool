'use client';

import { useState, useMemo } from 'react';
import type { FAQ } from '@/lib/supabase/faq';
import Link from 'next/link';

interface Category {
  name: string;
  slug: string;
  color: string;
}

interface FAQClientProps {
  allFAQs: FAQ[];
  faqsByCategory: Record<string, FAQ[]>;
  categories: Category[];
}

export default function FAQClient({ allFAQs, faqsByCategory, categories }: FAQClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 카테고리별 개수 계산
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.keys(faqsByCategory).forEach((slug) => {
      counts[slug] = faqsByCategory[slug].length;
    });
    return counts;
  }, [faqsByCategory]);

  // 검색 필터링 + featured 우선 정렬
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      // 검색어 없을 때: 각 카테고리별로 featured 우선 정렬
      const sorted: Record<string, FAQ[]> = {};
      Object.keys(faqsByCategory).forEach((slug) => {
        sorted[slug] = [...faqsByCategory[slug]].sort((a, b) => {
          // 1. featured 우선
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          // 2. sort_order
          if (a.sort_order !== null && b.sort_order !== null) {
            return a.sort_order - b.sort_order;
          }
          if (a.sort_order !== null) return -1;
          if (b.sort_order !== null) return 1;

          // 3. 최신순
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      });
      return sorted;
    }

    // 검색어 있을 때: 전체 FAQ에서 검색
    const query = searchQuery.toLowerCase();
    const filtered = allFAQs.filter((faq) =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      (faq.summary && faq.summary.toLowerCase().includes(query)) ||
      faq.category.toLowerCase().includes(query)
    );

    // 카테고리별로 다시 그룹핑 + featured 우선 정렬
    const grouped: Record<string, FAQ[]> = {};
    categories.forEach((cat) => {
      const categoryFAQs = filtered.filter((faq) => faq.category === cat.name);
      if (categoryFAQs.length > 0) {
        grouped[cat.slug] = categoryFAQs.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.sort_order !== null && b.sort_order !== null) {
            return a.sort_order - b.sort_order;
          }
          if (a.sort_order !== null) return -1;
          if (b.sort_order !== null) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      }
    });

    return grouped;
  }, [allFAQs, faqsByCategory, categories, searchQuery]);

  const totalResults = Object.values(filteredCategories).reduce(
    (sum, faqs) => sum + faqs.length,
    0
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center py-20 md:py-32 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="faqDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#f59e0b" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#faqDots)" />
            <circle cx="20%" cy="40%" r="200" fill="#fef3c7" opacity="0.2" />
            <circle cx="80%" cy="60%" r="250" fill="#fde68a" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center w-full">
          <p className="text-xs md:text-sm text-amber-600/70 mb-4 tracking-[0.2em] uppercase">Q&A</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-gray-900">
            이혼큐레이션(Q&A)
          </h1>
          <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto font-light mb-12 leading-relaxed">
            이혼, 필요한 것만 큐레이션합니다.
          </p>

          {/* 검색바 */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="질문을 검색하세요 (질문, 답변, 카테고리)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors bg-white"
              />
            </div>

            {searchQuery.trim() && (
              <p className="text-center mt-4 text-sm text-gray-600">
                <span className="font-semibold text-amber-600">{searchQuery} {totalResults}개</span> 검색결과
              </p>
            )}
          </div>

          {/* 카테고리 네비게이션 그리드 - 검색 중에는 숨김 */}
          {!searchQuery.trim() && (
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {categories.map((category) => {
                  const count = categoryCounts[category.slug] || 0;
                  if (count === 0) return null;

                  return (
                    <a
                      key={category.slug}
                      href={`#${category.slug}`}
                      className="group py-4 px-3 bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-gray-900 hover:bg-white transition-all duration-300"
                    >
                      <div className="text-sm md:text-base font-semibold text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {count}개
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className={`bg-white ${searchQuery.trim() ? 'py-3' : 'py-16 md:py-20'}`}>
        <div className="max-w-[1040px] mx-auto px-6 md:px-12">
          {/* 검색 모드: 카테고리 구분 없이 심플하게 */}
          {searchQuery.trim() ? (
            <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
              {Object.values(filteredCategories)
                .flat()
                .sort((a, b) => {
                  // 필수 가이드 우선
                  if (a.featured && !b.featured) return -1;
                  if (!a.featured && b.featured) return 1;
                  return 0;
                })
                .map((faq) => (
                <Link
                  key={faq.id}
                  href={`/faq/${faq.slug}`}
                  className="group block bg-white border border-gray-200/50 hover:border-gray-900 hover:shadow-md transition-all duration-300 p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      {faq.featured && (
                        <span className="inline-block text-xs text-amber-600 font-semibold mb-3 tracking-wide">
                          필수 가이드
                        </span>
                      )}
                      <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight mb-3">
                        {faq.question}
                      </h3>
                      {faq.summary && (
                        <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
                          {faq.summary}
                        </p>
                      )}
                    </div>
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* 일반 모드: 카테고리별로 구분 */
            <>
              {categories.map((category, categoryIdx) => {
                const faqs = filteredCategories[category.slug] || [];
                if (faqs.length === 0) return null;

                // 교차 배경색
                const isEven = categoryIdx % 2 === 0;
                const bgClass = isEven ? 'bg-white' : 'bg-gray-50/50';

                return (
                  <div
                    key={category.slug}
                    id={category.slug}
                    className={`scroll-mt-24 ${categoryIdx !== 0 ? 'mt-0' : ''}`}
                  >
                    <div className={`py-16 md:py-20 ${bgClass} -mx-6 md:-mx-12 px-6 md:px-12`}>
                      {/* 카테고리 헤더 */}
                      <div className="mb-12 md:mb-16 text-center">
                        <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">
                          {category.slug.toUpperCase()}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                          {category.name}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 font-light">
                          총 {faqs.length}개의 질문
                        </p>
                      </div>

                      {/* FAQ 카드 리스트 */}
                      <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
                        {faqs.map((faq) => (
                          <Link
                            key={faq.id}
                            href={`/faq/${faq.slug}`}
                            className="group block bg-white border border-gray-200/50 hover:border-gray-900 hover:shadow-md transition-all duration-300 p-6 md:p-8"
                          >
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex-1 min-w-0">
                                {faq.featured && (
                                  <span className="inline-block text-xs text-amber-600 font-semibold mb-3 tracking-wide">
                                    필수 가이드
                                  </span>
                                )}
                                <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight mb-3">
                                  {faq.question}
                                </h3>
                                {faq.summary && (
                                  <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
                                    {faq.summary}
                                  </p>
                                )}
                              </div>
                              <svg
                                className="w-5 h-5 flex-shrink-0 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all mt-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* 검색 결과 없음 */}
          {searchQuery.trim() && totalResults === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 mb-4">검색 결과가 없습니다</p>
              <p className="text-sm text-gray-400">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
