'use client';

import Link from 'next/link';

export default function BlogPreview() {
  // TODO: 실제로는 API에서 featured 칼럼을 가져와야 함
  const mainBlog = {
    title: "이혼 준비, 무엇부터 시작해야 할까요?",
    excerpt: "이혼을 결심했지만 어디서부터 시작해야 할지 막막하신가요? 12년간 1,200건의 이혼 사건을 다룬 전문 변호사가 알려드리는 이혼 준비의 모든 것. 증거 수집부터 재산 정리, 상담 타이밍까지 놓치면 안 될 핵심 체크리스트를 확인하세요.",
    category: "이혼절차",
    author: "임은지 변호사",
    readTime: "10분",
    publishedAt: "2025-01-10",
    link: "/blog/divorce-preparation-guide",
    featured: true
  };

  const subBlogs = [
    {
      title: "위자료 산정, 이것만은 꼭 알아두세요",
      excerpt: "법원이 위자료를 결정할 때 고려하는 5가지 핵심 요소와 평균 금액대를 알아봅니다.",
      category: "위자료",
      readTime: "7분",
      link: "/blog/alimony-calculation-guide"
    },
    {
      title: "양육권 분쟁, 승소 전략은?",
      excerpt: "아이와 함께하고 싶은 마음, 법적으로 인정받는 방법을 전문가가 설명합니다.",
      category: "양육권",
      readTime: "8분",
      link: "/blog/custody-winning-strategy"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 제목 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">
            Expert Column
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            판결문엔 안 나오는 진짜 이야기
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            법정 밖에서 꼭 알아야 할 현실적인 조언들
          </p>
        </div>

        {/* 메인 칼럼 (큰 카드) */}
        <Link
          href={mainBlog.link}
          className="group block bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border-2 border-amber-200 hover:border-amber-400 transition-all hover:shadow-2xl mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* 텍스트 영역 */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-4 py-1.5 bg-amber-200/70 rounded-full text-sm text-amber-800 font-semibold">
                  {mainBlog.category}
                </span>
                <span className="inline-block px-4 py-1.5 bg-purple-100 rounded-full text-sm text-purple-700 font-semibold">
                  ⭐ Featured
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                {mainBlog.title}
              </h3>

              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {mainBlog.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {mainBlog.author}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {mainBlog.readTime} 소요
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {mainBlog.publishedAt}
                </span>
              </div>
            </div>

            {/* 아이콘/일러스트 영역 (선택) */}
            <div className="hidden md:flex items-center justify-center w-48 h-48 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl">
              <div className="text-7xl">📚</div>
            </div>
          </div>

          <div className="mt-6 flex items-center text-amber-600 font-semibold group-hover:gap-2 transition-all">
            전문 읽기
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* 서브 칼럼 (2개 작은 카드) */}
        <div className="grid md:grid-cols-2 gap-6">
          {subBlogs.map((blog, idx) => (
            <Link
              key={idx}
              href={blog.link}
              className="group bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-amber-300 transition-all hover:shadow-lg"
            >
              <span className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs text-amber-700 font-semibold mb-3">
                {blog.category}
              </span>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">읽는 시간: {blog.readTime}</span>
                <span className="text-amber-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  읽어보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 전체보기 버튼 */}
        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all hover:gap-4 shadow-lg hover:shadow-xl"
          >
            변호사 칼럼 전체보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
