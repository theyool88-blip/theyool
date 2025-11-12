'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import type { BlogPost } from '@/lib/notion/blog';

interface BlogClientProps {
  posts: BlogPost[];
}

const categories = ['전체', '이혼절차', '재산분할', '양육권', '위자료', '상간', '법률상식'];

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredPosts = selectedCategory === '전체'
    ? posts
    : posts.filter(p => p.categories.includes(selectedCategory));

  // 추천 칼럼 (featured)
  const featuredPosts = posts.filter(p => p.featured).slice(0, 2);
  // 일반 칼럼
  const regularPosts = filteredPosts.filter(p => !p.featured || selectedCategory !== '전체');

  return (
    <PageLayout>
      {/* Hero Section - 따뜻하고 전문적인 느낌 */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-amber-50 via-orange-50/30 to-white overflow-hidden">
        {/* Warm Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blogPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="#f59e0b" opacity="0.15" />
                <circle cx="10" cy="10" r="1" fill="#fb923c" opacity="0.1" />
                <circle cx="50" cy="50" r="1" fill="#fb923c" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blogPattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          <ScrollReveal>
            <div className="inline-block px-4 py-1.5 bg-amber-100/60 backdrop-blur-sm rounded-full mb-6">
              <span className="text-xs md:text-sm text-amber-800 font-semibold tracking-wide">📚 LEGAL INSIGHTS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              변호사 칼럼
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              더율이 전하는 법률 이야기<br className="md:hidden" />
              <span className="text-amber-700 font-medium">따뜻한 시선으로 바라본 법의 세계</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 추천 칼럼 섹션 (Featured) - 성공사례와 차별화 */}
      {selectedCategory === '전체' && featuredPosts.length > 0 && (
        <section className="py-16 md:py-20 px-6 md:px-12 bg-white border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">추천 칼럼</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 100}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group relative bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 border-2 border-amber-100/50 overflow-hidden h-full">
                      {/* 배경 장식 */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/20 to-orange-100/20 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>

                      {/* Featured Badge */}
                      <div className="relative mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-lg">
                          ⭐ 추천
                        </span>
                      </div>

                      {/* Categories (다중 카테고리) */}
                      <div className="relative mb-3 flex flex-wrap gap-2">
                        {post.categories.map((category, idx) => (
                          <span key={idx} className="text-sm text-amber-700 font-semibold">
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="relative text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-amber-800 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Meta */}
                      <div className="relative flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views.toLocaleString()}
                        </span>
                      </div>

                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="relative flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2.5 py-1 bg-amber-100/60 text-amber-800 rounded-full text-xs font-medium">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <div className="relative inline-flex items-center gap-2 text-amber-700 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>자세히 읽기</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 카테고리 필터 */}
      <section className="sticky top-16 z-40 py-6 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-[1200px] px-6 md:px-12 mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 칼럼 그리드 - 매거진 스타일 */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto">
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <ScrollReveal key={post.id} delay={index * 80}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Category Badges (다중 카테고리) */}
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.categories.map((category, idx) => (
                            <span key={idx} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs text-gray-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {post.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-xl text-gray-500">해당 카테고리의 칼럼이 준비중입니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - 따뜻한 느낌 */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-50 via-orange-50/40 to-pink-50/30 overflow-hidden">
        {/* Warm Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20%" cy="30%" r="200" fill="#fbbf24" opacity="0.1" />
            <circle cx="80%" cy="70%" r="250" fill="#fb923c" opacity="0.1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              법률 고민,<br />
              전문가와 함께 해결하세요
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-700">
              30분 무료 상담으로 당신의 상황을 분석해드립니다
            </p>
            <a
              href="tel:02-1234-5678"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              📞 지금 상담하기
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
