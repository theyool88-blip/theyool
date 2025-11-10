'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';

// 카테고리별 파스텔 색상 (따뜻한 느낌)
const categoryStyles = {
  '위자료': {
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    card: 'hover:bg-blue-50/50',
  },
  '재산분할': {
    badge: 'bg-green-50 text-green-700 border border-green-200',
    card: 'hover:bg-green-50/50',
  },
  '양육권': {
    badge: 'bg-orange-50 text-orange-700 border border-orange-200',
    card: 'hover:bg-orange-50/50',
  },
  '상간사건': {
    badge: 'bg-purple-50 text-purple-700 border border-purple-200',
    card: 'hover:bg-purple-50/50',
  },
  '이혼절차': {
    badge: 'bg-pink-50 text-pink-700 border border-pink-200',
    card: 'hover:bg-pink-50/50',
  },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '위자료', '재산분할', '양육권', '상간사건', '이혼절차'];

  // Featured Article (실제로는 CMS나 API에서 가져올 데이터)
  const featuredArticle = {
    id: 'featured',
    title: '이혼 위자료, 얼마나 받을 수 있을까?',
    excerpt: '이혼 시 위자료는 상대방의 귀책사유, 혼인기간, 재산상태 등을 종합적으로 고려하여 결정됩니다. 실제 판례를 통해 위자료 산정 기준과 최대한 많이 받는 방법을 자세히 알아보겠습니다.',
    category: '위자료',
    date: '2024.11.10',
    readTime: '5분',
  };

  // 칼럼 리스트 (실제로는 CMS나 API에서 가져올 데이터)
  const articles = [
    {
      id: 1,
      title: '재산분할, 혼인 기간이 짧아도 받을 수 있나요?',
      excerpt: '혼인 기간이 짧더라도 재산분할을 받을 수 있습니다. 중요한 것은 혼인 기간보다 기여도입니다.',
      category: '재산분할',
      date: '2024.11.09',
      readTime: '4분',
    },
    {
      id: 2,
      title: '양육권 분쟁, 어떻게 대비해야 할까요?',
      excerpt: '양육권은 아이의 최선의 이익을 기준으로 판단됩니다. 준비 방법을 알아봅니다.',
      category: '양육권',
      date: '2024.11.08',
      readTime: '6분',
    },
    {
      id: 3,
      title: '상간소송, 승소하기 위한 증거 확보 방법',
      excerpt: '상간소송에서 가장 중요한 것은 증거입니다. 효과적인 증거 수집 방법을 소개합니다.',
      category: '상간사건',
      date: '2024.11.07',
      readTime: '5분',
    },
    {
      id: 4,
      title: '이혼 절차, 조정부터 소송까지 한눈에',
      excerpt: '이혼 조정과 소송의 차이, 각 단계별 준비사항을 상세히 설명합니다.',
      category: '이혼절차',
      date: '2024.11.06',
      readTime: '7분',
    },
    {
      id: 5,
      title: '위자료 청구 시효, 언제까지 가능한가요?',
      excerpt: '위자료 청구에도 시효가 있습니다. 놓치지 말아야 할 시점을 알려드립니다.',
      category: '위자료',
      date: '2024.11.05',
      readTime: '4분',
    },
    {
      id: 6,
      title: '재산 은닉 의심될 때, 어떻게 대응할까?',
      excerpt: '상대방이 재산을 숨기고 있다면? 재산 조회 및 추적 방법을 소개합니다.',
      category: '재산분할',
      date: '2024.11.04',
      readTime: '5분',
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section - 홈페이지 스타일 미니멀 디자인 */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 bg-white overflow-hidden">
        {/* Minimal Geometric Background Pattern (홈페이지와 동일) */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f0f0f0', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#e8e8e8', stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f5f5f5', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#ececec', stopOpacity: 0.5 }} />
              </linearGradient>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#dots)" />
            <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
            <circle cx="80%" cy="70%" r="250" fill="url(#grad2)" />
            <circle cx="70%" cy="25%" r="150" fill="#f5f5f5" opacity="0.5" />
            <circle cx="30%" cy="75%" r="180" fill="#efefef" opacity="0.5" />
            <rect x="50%" y="40%" width="300" height="300" fill="#f0f0f0" opacity="0.3" transform="rotate(45 65 55)" />
            <rect x="15%" y="55%" width="250" height="250" fill="#f5f5f5" opacity="0.35" transform="rotate(30 27 67)" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e0e0e0" strokeWidth="1" opacity="0.4" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

        {/* Content */}
        <div className="relative z-10 max-w-[1040px] mx-auto text-center">
          <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">
            Column
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            칼럼
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            이혼 전문 변호사가 전하는 법률 인사이트
          </p>
        </div>
      </section>

      {/* Featured Article - Magazine 스타일 */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs md:text-sm text-gray-500 mb-8 tracking-[0.2em] uppercase text-center">
            Featured
          </p>

          <Link href={`/blog/${featuredArticle.id}`}>
            <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-300 hover:shadow-toss-xl transition-all duration-500 cursor-pointer">
              <div className="grid md:grid-cols-2 gap-0">
                {/* 썸네일 영역 - 파스텔 그라디언트 */}
                <div className="relative h-64 md:h-full bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="text-8xl md:text-9xl opacity-20">⚖️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${categoryStyles[featuredArticle.category as keyof typeof categoryStyles].badge}`}>
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-gray-500">{featuredArticle.date}</span>
                    <span className="text-xs text-gray-500">· {featuredArticle.readTime}</span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-700 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="text-sm text-gray-900 font-semibold group-hover:underline">
                    자세히 읽기 →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Filter + Articles Grid */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {/* Category Filter - 서브틀하게 */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-toss'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Articles Grid - 2열 레이아웃 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article, index) => {
              const style = categoryStyles[article.category as keyof typeof categoryStyles];

              return (
                <Link href={`/blog/${article.id}`} key={article.id}>
                  <article className={`group bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 transition-all duration-500 cursor-pointer hover:border-gray-300 hover:shadow-toss-lg hover:-translate-y-1 ${style.card}`}>
                    {/* 카테고리 + 메타 정보 */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${style.badge}`}>
                        {article.category}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </h3>

                    {/* 요약 */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* 하단 메타 정보 */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-200">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {/* 더 보기 버튼 */}
          <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-white text-gray-900 border border-gray-300 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all shadow-toss">
              칼럼 더보기
            </button>
          </div>
        </div>
      </section>

      {/* Coming Soon 안내 */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1040px] mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-12 md:p-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              전문 칼럼 준비중
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              이혼 전문 변호사의 실무 경험을 바탕으로 한<br className="hidden md:block" />
              유익한 법률 정보를 곧 만나보실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 상담 CTA */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              칼럼으로 해결되지 않는<br className="md:hidden" /> 궁금증이 있으신가요?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              전문 변호사와의 상담을 통해 정확한 답변을 받으세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:02-1234-5678"
                className="inline-block bg-gray-900 text-white font-semibold px-10 py-4 rounded-full text-base hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-toss-lg"
              >
                📞 전화 상담하기
              </a>
              <Link
                href="/contact"
                className="inline-block bg-white text-gray-900 font-semibold px-10 py-4 rounded-full text-base border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
