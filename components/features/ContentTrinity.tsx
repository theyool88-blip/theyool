'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContentTrinity() {
  const [activeTab, setActiveTab] = useState<'faq' | 'blog' | 'insta'>('faq');

  // FAQ 데이터 (3개)
  const faqs = [
    {
      icon: "💬",
      question: "언제 상담을 받아야 하나요?",
      answer: "많은 분들이 '아직은 아닌가' 고민하시지만, 빨리 시작할수록 유리합니다. 증거 확보와 초기 대응이 결과를 좌우하기 때문입니다.",
      link: "/faq?category=상담문의"
    },
    {
      icon: "💰",
      question: "변호사 비용이 부담스러워요",
      answer: "수임료에 대한 부담은 당연한 걱정입니다. 더율은 투명한 비용 체계와 합리적인 분할 납부 옵션을 제공합니다. 무료 상담에서 자세히 안내드립니다.",
      link: "/faq?category=상담문의"
    },
    {
      icon: "📋",
      question: "증거가 없어도 이혼 가능한가요?",
      answer: "증거가 부족하다고 포기하기는 이릅니다. 법적으로 인정되는 증거를 수집하고 활용하는 전략이 필요합니다. 상담을 통해 가능성을 확인하세요.",
      link: "/faq?category=이혼절차"
    }
  ];

  // 칼럼 데이터 (2개 - 실제로는 API에서 가져와야 함)
  const blogs = [
    {
      title: "이혼 시 재산분할, 꼭 알아야 할 5가지",
      excerpt: "결혼 생활 동안 형성된 재산을 공정하게 나누는 방법과 주의사항을 알아봅니다.",
      category: "재산분할",
      readTime: "5분",
      link: "/blog/property-division-guide"
    },
    {
      title: "위자료 산정 기준과 청구 전략",
      excerpt: "위자료는 얼마나 받을 수 있을까요? 법원이 고려하는 요소들을 전문가가 설명합니다.",
      category: "위자료",
      readTime: "7분",
      link: "/blog/alimony-calculation"
    }
  ];

  // Instagram 데이터 (4개 - 실제로는 API에서 가져와야 함)
  const instas = [
    {
      thumbnail: "/images/insta-placeholder-1.jpg",
      title: "이혼 준비 체크리스트",
      likes: 1234,
      link: "/insta-theyool"
    },
    {
      thumbnail: "/images/insta-placeholder-2.jpg",
      title: "양육비 계산 방법",
      likes: 987,
      link: "/insta-theyool"
    },
    {
      thumbnail: "/images/insta-placeholder-3.jpg",
      title: "협의이혼 vs 재판이혼",
      likes: 1456,
      link: "/insta-theyool"
    },
    {
      thumbnail: "/images/insta-placeholder-4.jpg",
      title: "증거 수집 꿀팁",
      likes: 2103,
      link: "/insta-theyool"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 제목 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-purple-600/70 mb-3 tracking-[0.2em] uppercase">
            Content Trinity
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            궁금한 걸 바로바로
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            즉문즉답, 전문가 칼럼, 카드뉴스까지 한 곳에서
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 font-semibold text-sm md:text-base transition-all ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            💬 즉문즉답
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-6 py-3 font-semibold text-sm md:text-base transition-all ${
              activeTab === 'blog'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📝 전문가 칼럼
          </button>
          <button
            onClick={() => setActiveTab('insta')}
            className={`px-6 py-3 font-semibold text-sm md:text-base transition-all ${
              activeTab === 'insta'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📸 카드뉴스
          </button>
        </div>

        {/* FAQ 탭 */}
        {activeTab === 'faq' && (
          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <Link
                key={idx}
                href={faq.link}
                className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{faq.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {faq.answer}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-semibold">
                  자세히 보기 →
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 칼럼 탭 */}
        {activeTab === 'blog' && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {blogs.map((blog, idx) => (
              <Link
                key={idx}
                href={blog.link}
                className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-100 hover:border-amber-300 transition-all hover:shadow-lg"
              >
                <div className="inline-block px-3 py-1 bg-amber-200/50 rounded-full text-xs text-amber-700 font-semibold mb-4">
                  {blog.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">읽는 시간: {blog.readTime}</span>
                  <span className="text-amber-600 text-sm font-semibold">읽어보기 →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Instagram 탭 */}
        {activeTab === 'insta' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {instas.map((insta, idx) => (
              <Link
                key={idx}
                href={insta.link}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 hover:shadow-lg transition-all"
              >
                {/* 플레이스홀더 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">📸</div>
                </div>

                {/* 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-semibold text-sm mb-1">{insta.title}</p>
                    <div className="flex items-center text-xs">
                      <span>❤️ {insta.likes.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 더보기 버튼 */}
        <div className="text-center mt-10">
          <Link
            href={
              activeTab === 'faq'
                ? '/faq'
                : activeTab === 'blog'
                ? '/blog'
                : '/insta-theyool'
            }
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all hover:gap-4 shadow-lg hover:shadow-xl"
          >
            {activeTab === 'faq' && '이혼큐레이션 전체보기'}
            {activeTab === 'blog' && '변호사 칼럼 전체보기'}
            {activeTab === 'insta' && '인스타더율 전체보기'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
