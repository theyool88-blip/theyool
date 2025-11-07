'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              칼럼
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              이혼 전문 변호사가 전하는 법률 인사이트
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 칼럼 리스트 섹션 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          {/* 카테고리 필터 */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {['전체', '위자료', '재산분할', '양육권', '상간사건', '이혼절차'].map((category) => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    category === '전체'
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--gray-100)] text-[var(--gray-700)] hover:bg-[var(--gray-200)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* 임시 칼럼 콘텐츠 - Phase 3에서 실제 블로그 글로 대체 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <Link href={`/blog/${index}`}>
                  <div className="card-glass overflow-hidden hover-lift cursor-pointer group">
                    <div className="aspect-video bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                      <div className="text-white text-6xl">📝</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full font-semibold">
                          위자료
                        </span>
                        <span className="text-xs text-[var(--gray-500)]">
                          2024.11.0{index}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[var(--primary)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                        이혼 위자료 청구, 얼마나 받을 수 있을까?
                      </h3>
                      <p className="text-sm text-[var(--gray-600)] leading-relaxed line-clamp-3">
                        이혼 시 위자료는 상대방의 귀책사유, 혼인기간, 재산상태 등을
                        종합적으로 고려하여 결정됩니다. 구체적인 사례를 통해
                        알아보겠습니다.
                      </p>
                      <div className="mt-4 text-sm text-[var(--accent)] font-semibold group-hover:underline">
                        자세히 보기 →
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming Soon 메시지 */}
          <ScrollReveal delay={400}>
            <div className="mt-16 text-center p-12 bg-[var(--gray-50)] rounded-2xl">
              <div className="text-6xl mb-6">✍️</div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                전문 칼럼 준비중
              </h3>
              <p className="text-base text-[var(--gray-600)] max-w-2xl mx-auto">
                이혼 전문 변호사의 실무 경험을 바탕으로 한 유익한 법률 정보를
                곧 만나보실 수 있습니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 상담 CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="card-glass p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6">
                칼럼으로 해결되지 않는 궁금증이 있으신가요?
              </h2>
              <p className="text-lg text-[var(--gray-600)] mb-8">
                전문 변호사와의 상담을 통해 정확한 답변을 받으세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:02-1234-5678"
                  className="inline-block bg-[var(--primary)] text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-[var(--accent)] transition-all hover-lift shadow-toss-xl"
                >
                  📞 전화 상담하기
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
