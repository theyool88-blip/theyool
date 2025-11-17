import { getFeaturedFAQs } from '@/lib/supabase/faq';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '필수 가이드 - 이혼큐레이션 | 법무법인 더율',
  description: '이혼 전 반드시 알아야 할 필수 가이드를 확인하세요. 법무법인 더율이 제공하는 핵심 이혼 정보입니다.',
};

// 카테고리 정의 (FAQ 페이지와 동일)
const categories = [
  { name: '필수 가이드', slug: 'essential-guide', color: 'text-amber-600' },
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

export default async function EssentialGuidePage() {
  const essentialGuides = await getFeaturedFAQs(100); // Get all featured FAQs

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center py-20 md:py-32 bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
        {/* Pattern Background */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="essentialDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#f59e0b" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#essentialDots)" />
            <circle cx="20%" cy="40%" r="200" fill="#fef3c7" opacity="0.2" />
            <circle cx="80%" cy="60%" r="250" fill="#fde68a" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center w-full">
          <p className="text-xs md:text-sm text-amber-600/70 mb-4 tracking-[0.2em] uppercase">Essential Guide</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-gray-900">
            필수 가이드
          </h1>
          <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
            이혼 전 반드시 알아야 할 핵심 정보를 큐레이션했습니다.
          </p>
        </div>
      </section>

      {/* Essential Guides List */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1040px] mx-auto px-6 md:px-12">
          {essentialGuides.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 mb-4">등록된 필수 가이드가 없습니다</p>
              <p className="text-sm text-gray-400">관리자 페이지에서 FAQ를 '필수 가이드'로 지정해주세요</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-sm md:text-base text-gray-600">
                  총 <span className="font-semibold text-amber-600">{essentialGuides.length}개</span>의 필수 가이드
                </p>
              </div>

              <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
                {essentialGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/faq/${guide.slug}`}
                    className="group block bg-white border border-gray-200/50 hover:border-gray-900 hover:shadow-md transition-all duration-300 p-6 md:p-8"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <span className="inline-block text-xs text-amber-600 font-semibold mb-3 tracking-wide">
                          필수 가이드
                        </span>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors leading-tight mb-3">
                          {guide.question}
                        </h3>
                        {guide.summary && (
                          <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
                            {guide.summary}
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
            </>
          )}
        </div>
      </section>

      {/* ALL CATEGORIES 섹션 */}
      <section className="bg-white py-16 md:py-20 border-t border-gray-200">
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">모든 FAQ 카테고리</h2>
            <p className="text-sm md:text-base text-gray-600">궁금한 주제의 질문을 찾아보세요</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {categories.map((category) => {
                const href = category.slug === 'essential-guide'
                  ? '/faq/essential-guide'
                  : `/faq#${category.slug}`;

                const isEssential = category.slug === 'essential-guide';

                return (
                  <Link
                    key={category.slug}
                    href={href}
                    className={`group py-3 px-3 rounded-lg transition-all duration-300 ${
                      isEssential
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-500 hover:shadow-md'
                        : 'bg-white border border-gray-200 hover:border-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`text-sm md:text-base font-semibold mb-1 transition-colors ${
                      isEssential
                        ? 'text-amber-900 group-hover:text-amber-700'
                        : 'text-gray-900 group-hover:text-gray-600'
                    }`}>
                      {category.name}
                    </div>
                    <div className={`text-xs ${
                      isEssential ? 'text-amber-600' : 'text-gray-500'
                    }`}>
                      {category.slug === 'essential-guide' ? '필수' : '보기'}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
