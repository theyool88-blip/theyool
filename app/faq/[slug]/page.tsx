import { getFAQBySlug, getFAQs, getFAQsByCategory } from '@/lib/supabase/faq';
import { getPublicCases } from '@/lib/supabase/cases';
import { getBlogPosts } from '@/lib/supabase/blog';
import { categoryOverlayMap } from '@/lib/notion/types';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// 카테고리 정의
const categories = [
  { name: '이혼절차', slug: 'divorce-process', color: 'text-blue-600' },
  { name: '재산분할', slug: 'property-division', color: 'text-green-600' },
  { name: '위자료', slug: 'alimony', color: 'text-red-600' },
  { name: '양육권', slug: 'custody', color: 'text-orange-600' },
  { name: '양육비', slug: 'child-support', color: 'text-pink-600' },
  { name: '면접교섭', slug: 'visitation', color: 'text-purple-600' },
  { name: '별거/생활비', slug: 'separation-expense', color: 'text-indigo-600' },
  { name: '가정폭력', slug: 'domestic-violence', color: 'text-rose-600' },
  { name: '상간/불륜', slug: 'adultery', color: 'text-amber-600' },
  { name: '이혼 후 문제', slug: 'post-divorce', color: 'text-teal-600' },
  { name: '기타', slug: 'etc', color: 'text-gray-600' },
];

// 동적 라우트를 위한 정적 경로 생성
export async function generateStaticParams() {
  try {
    const faqs = await getFAQs();
    return faqs.map((faq) => ({
      slug: faq.slug,
    }));
  } catch (error) {
    console.error('Failed to generate FAQ static params:', error);
    return [];
  }
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const faq = await getFAQBySlug(decodedSlug);

  if (!faq) {
    return {
      title: 'FAQ를 찾을 수 없습니다 | 법무법인 더율',
    };
  }

  return {
    title: `${faq.question} | FAQ | 법무법인 더율`,
    description: faq.summary || faq.question,
  };
}

export default async function FAQDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const faq = await getFAQBySlug(decodedSlug);

  if (!faq) {
    notFound();
  }

  // 같은 카테고리의 다른 FAQ들 (현재 FAQ 제외, 최대 4개)
  const relatedFAQs = await getFAQsByCategory(faq.category, faq.slug, 4);

  // 관련 성공사례 - 수동 참조 우선, 자동 매칭 fallback
  const allCases = await getPublicCases();
  let relatedCases = [];

  if (faq.related_cases && faq.related_cases.length > 0) {
    // 수동 참조가 있으면 slug로 필터링하고 순서 유지
    relatedCases = faq.related_cases
      .map(slug => allCases.find(c => c.slug === slug))
      .filter(Boolean) as typeof allCases;
  } else {
    // 자동 카테고리 매칭 fallback
    relatedCases = allCases
      .filter(c => c.categoryNames?.some(cat =>
        cat.includes(faq.category) ||
        faq.category.includes(cat)
      ))
      .slice(0, 3);
  }

  // 관련 칼럼 - 수동 참조 우선, 자동 매칭 fallback
  const allBlogs = await getBlogPosts();
  let relatedBlogs = [];

  if (faq.related_blog_posts && faq.related_blog_posts.length > 0) {
    // 수동 참조가 있으면 slug로 필터링하고 순서 유지
    relatedBlogs = faq.related_blog_posts
      .map(slug => allBlogs.find(blog => blog.slug === slug && blog.published))
      .filter(Boolean) as typeof allBlogs;
  } else {
    // 자동 카테고리 매칭 fallback
    relatedBlogs = allBlogs
      .filter(blog => blog.published && blog.categories?.some(cat =>
        cat.includes(faq.category) ||
        faq.category.includes(cat)
      ))
      .slice(0, 3);
  }

  // 전체 FAQ 개수 (카테고리별)
  const allFAQs = await getFAQs();
  const faqCounts: Record<string, number> = {};
  categories.forEach(cat => {
    faqCounts[cat.slug] = allFAQs.filter(f => f.category === cat.name).length;
  });

  // 카테고리별 색상 매핑
  const categoryColors: Record<string, string> = {
    '이혼절차': 'blue',
    '재산분할': 'green',
    '위자료': 'red',
    '양육권': 'orange',
    '양육비': 'pink',
    '면접교섭': 'purple',
    '별거/생활비': 'indigo',
    '가정폭력': 'rose',
    '상간/불륜': 'amber',
    '이혼 후 문제': 'teal',
    '기타': 'gray',
  };
  const categoryColor = categoryColors[faq.category] || 'gray';

  const textColorClass = `text-${categoryColor}-600`;

  return (
    <PageLayout>
      {/* 뒤로가기 */}
      <section className="bg-white py-6 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-[840px] mx-auto">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            FAQ 목록
          </Link>
        </div>
      </section>

      {/* 질문 헤더 */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[840px] mx-auto">
          {/* 카테고리 라벨 */}
          <div className="mb-6">
            <span className={`text-xs ${textColorClass} font-semibold tracking-wider uppercase`}>
              {faq.category}
            </span>
          </div>

          {/* 질문 제목 */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {faq.question}
          </h1>

          {/* 작성일 */}
          <p className="text-sm text-gray-500">
            {new Date(faq.created_at).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* 답변 본문 */}
      <section className="pb-20 md:pb-24 px-6 md:px-12 bg-white border-t border-gray-200">
        <div className="max-w-[840px] mx-auto pt-16 md:pt-20">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8 text-gray-800 leading-relaxed">
              {faq.answer.split('\n\n').map((paragraph, idx) => {
                if (paragraph.trim().startsWith('💬')) {
                  // Callout 스타일
                  return (
                    <div
                      key={idx}
                      className="bg-gray-50 border-l-2 border-gray-900 p-6 my-8"
                    >
                      <p className="text-base text-gray-800 leading-relaxed">
                        {paragraph.replace('💬 ', '')}
                      </p>
                    </div>
                  );
                } else if (paragraph.trim().startsWith('- ')) {
                  // Bullet list
                  return (
                    <ul key={idx} className="space-y-4 my-8">
                      {paragraph
                        .split('\n')
                        .filter((l) => l.trim().startsWith('- '))
                        .map((item, i) => (
                          <li
                            key={i}
                            className="text-gray-800 flex items-start gap-3 text-base leading-relaxed"
                          >
                            <span className="text-gray-900 mt-1">•</span>
                            <span>{item.replace('- ', '')}</span>
                          </li>
                        ))}
                    </ul>
                  );
                } else if (paragraph.trim()) {
                  // Regular paragraph
                  return (
                    <p key={idx} className="text-base md:text-lg text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 관련 성공사례 */}
      {relatedCases.length > 0 && (
        <section className="py-12 md:py-16 px-6 md:px-12 bg-pink-50/20">
          <div className="max-w-[840px] mx-auto">
            {/* Minimal 1-line header */}
            <div className="text-center mb-6">
              <p className="text-xs text-pink-600/60 tracking-[0.15em] uppercase font-medium">
                Similar Success Story
              </p>
            </div>

            {/* Card using EXACT cases page design, reduced height */}
            <Link href={`/cases/${relatedCases[0].slug}`}>
              <div className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer h-[280px] md:h-[300px]">
                {/* Background image */}
                {relatedCases[0].coverImage && (
                  <div className="absolute inset-0">
                    <img
                      src={relatedCases[0].coverImage}
                      alt={relatedCases[0].title}
                      className="w-full h-full object-cover object-center md:object-right"
                    />
                  </div>
                )}

                {/* Pastel overlay - EXACT from cases page */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  relatedCases[0].categoryNames && relatedCases[0].categoryNames.length > 0
                    ? categoryOverlayMap[relatedCases[0].categoryNames[0]] || 'from-pink-50/80 via-rose-50/75 to-red-50/70'
                    : 'from-pink-50/80 via-rose-50/75 to-red-50/70'
                }`} />

                {/* Additional white overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/15 to-white/10" />

                {/* Content - EXACT structure from cases page */}
                <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                  {/* Top: Category badges */}
                  <div className="flex flex-wrap gap-2">
                    {relatedCases[0].categoryNames?.map((name, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800"
                      >
                        {name}
                      </span>
                    ))}
                  </div>

                  {/* Bottom: Title + Summary + Result */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:translate-x-1 transition-transform duration-300">
                      {relatedCases[0].title}
                    </h3>

                    {/* Summary (if exists) */}
                    {relatedCases[0].summary && (
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                        {relatedCases[0].summary}
                      </p>
                    )}

                    {/* Result badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50">
                      <span className="text-sm md:text-base font-bold text-gray-900">
                        결과: {relatedCases[0].result}
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

            {/* Subtle Link to More Cases */}
            <div className="text-center mt-6">
              <Link
                href="/cases"
                className="text-xs text-gray-500 hover:text-gray-700 underline"
              >
                다른 성공사례 더 보기
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* 같은 카테고리의 다른 FAQ */}
      {relatedFAQs.length > 0 && (
        <section className="py-20 md:py-24 px-6 md:px-12 bg-white">
          <div className="max-w-[1040px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{faq.category}에 대한 궁금증을 확인해보세요</h2>
            </div>
            <div className="grid gap-4 max-w-4xl mx-auto">
              {relatedFAQs.map((relatedFaq) => (
                <Link
                  key={relatedFaq.id}
                  href={`/faq/${relatedFaq.slug}`}
                  className="group block bg-white border border-gray-200/50 hover:border-gray-900 hover:shadow-md transition-all duration-300 p-6"
                >
                  {relatedFaq.featured && (
                    <span className="inline-block text-xs text-amber-600 font-semibold mb-3 tracking-wide">
                      필수 가이드
                    </span>
                  )}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight mb-2">
                    {relatedFaq.question}
                  </h3>
                  {relatedFaq.summary && (
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedFaq.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 전체 카테고리 네비게이션 */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[1040px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">ALL CATEGORIES</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">모든 FAQ 카테고리</h2>
            <p className="text-gray-600">궁금한 주제의 질문을 찾아보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {categories.map((category) => {
              const count = faqCounts[category.slug] || 0;
              if (count === 0) return null;

              return (
                <Link
                  key={category.slug}
                  href={`/faq#${category.slug}`}
                  className="group py-6 px-4 bg-white border border-gray-200/50 hover:border-gray-900 hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {count}개의 질문
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 상담 신청 CTA */}
      <section className="py-20 md:py-24 px-6 md:px-12 bg-white border-t border-gray-200">
        <div className="max-w-[840px] mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            더 자세한 상담이 필요하신가요?
          </h3>
          <p className="text-gray-600 mb-10 text-base md:text-lg">
            법무법인 더율의 전문 변호사가 직접 상담해드립니다
          </p>
          <Link
            href="/#contact"
            className="inline-block bg-gray-900 text-white px-10 py-4 font-semibold text-base hover:bg-gray-800 transition-colors"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
