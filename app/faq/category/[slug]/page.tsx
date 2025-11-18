import { getFAQs } from '@/lib/supabase/faq';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// 카테고리 정의
const categories = [
  { name: '이혼절차', slug: 'divorce-process', color: 'text-blue-600', description: '이혼 절차 관련 큐레이션' },
  { name: '재산분할', slug: 'property-division', color: 'text-green-600', description: '재산분할 관련 큐레이션' },
  { name: '위자료', slug: 'alimony', color: 'text-red-600', description: '위자료 관련 큐레이션' },
  { name: '양육권', slug: 'custody', color: 'text-orange-600', description: '양육권 관련 큐레이션' },
  { name: '양육비', slug: 'child-support', color: 'text-pink-600', description: '양육비 관련 큐레이션' },
  { name: '면접교섭', slug: 'visitation', color: 'text-purple-600', description: '면접교섭 관련 큐레이션' },
  { name: '기타', slug: 'etc', color: 'text-gray-600', description: '기타 질문' },
];

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    return categories.map((cat) => ({
      slug: cat.slug,
    }));
  } catch (error) {
    console.error('Failed to generate FAQ category static params:', error);
    return [];
  }
}

// 메타데이터 생성
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = categories.find(c => c.slug === resolvedParams.slug);

  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다 | 법무법인 더율',
    };
  }

  return {
    title: `${category.name} FAQ | 법무법인 더율`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = categories.find(c => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const allFAQs = await getFAQs();
  const categoryFAQs = allFAQs.filter(faq => faq.category === category.name);

  return (
    <PageLayout>
      {/* 뒤로가기 */}
      <section className="bg-white py-6 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-[1040px] mx-auto">
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

      {/* 카테고리 헤더 */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <p className="text-xs md:text-sm text-gray-500 mb-4 tracking-[0.2em] uppercase">
            {category.name}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {category.name} FAQ
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            총 {categoryFAQs.length}개의 질문
          </p>
        </div>
      </section>

      {/* 질문 리스트 */}
      <section className="pb-20 md:pb-24 px-6 md:px-12 bg-white border-t border-gray-200">
        <div className="max-w-[1040px] mx-auto pt-12 md:pt-16">
          {categoryFAQs.length > 0 ? (
            <div className="space-y-0">
              {categoryFAQs.map((faq, idx) => (
                <Link
                  key={faq.id}
                  href={`/faq/${faq.slug}`}
                  className={`flex items-start justify-between gap-6 py-8 ${
                    idx !== 0 ? 'border-t border-gray-200' : ''
                  } hover:bg-gray-50 transition-colors group`}
                >
                  <div className="flex-1 min-w-0">
                    {faq.featured && (
                      <span className="text-xs text-gray-900 font-semibold mb-2 block">필수</span>
                    )}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-600 transition-colors">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">이 카테고리에는 질문이 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-[840px] mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            궁금한 점이 해결되지 않으셨나요?
          </h3>
          <p className="text-gray-600 mb-8 text-base">
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
