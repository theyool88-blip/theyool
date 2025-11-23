import { getFAQs } from '@/lib/supabase/faq';
import PageLayout from '@/components/layouts/PageLayout';
import FAQClient from './FAQClient';

export const revalidate = 60;

export const metadata = {
  title: '이혼큐레이션(Q&A) | 법무법인 더율',
  description: '이혼, 필요한 것만 큐레이션합니다. 이혼절차, 재산분할, 위자료, 양육권 등 궁금한 사항을 빠르게 해결할 수 있습니다.',
};

// 카테고리 정의 (15개)
const categories = [
  { name: '긴급상황/즉시도움', slug: 'emergency', color: 'text-red-600' },
  { name: '가정폭력/위협', slug: 'domestic-violence', color: 'text-rose-600' },
  { name: '이혼절차/기본정보', slug: 'divorce-process', color: 'text-blue-600' },
  { name: '별거/생활비', slug: 'separation-expense', color: 'text-indigo-600' },
  { name: '증거수집/준비', slug: 'evidence-collection', color: 'text-yellow-600' },
  { name: '불륜/외도', slug: 'adultery', color: 'text-amber-600' },
  { name: '위자료', slug: 'alimony', color: 'text-orange-600' },
  { name: '양육권', slug: 'custody', color: 'text-pink-600' },
  { name: '양육비', slug: 'child-support', color: 'text-fuchsia-600' },
  { name: '면접교섭', slug: 'visitation', color: 'text-purple-600' },
  { name: '재산분할', slug: 'property-division', color: 'text-green-600' },
  { name: '친자확인', slug: 'paternity', color: 'text-lime-600' },
  { name: '이혼 후 문제', slug: 'post-divorce', color: 'text-teal-600' },
  { name: '국제이혼/특수상황', slug: 'international-divorce', color: 'text-cyan-600' },
  { name: '변호사/법적지원', slug: 'legal-support', color: 'text-slate-600' },
];

export default async function FAQPage() {
  const allFAQs = await getFAQs();

  // 카테고리별로 FAQ 그룹핑 (slug 기반)
  const faqsByCategory: Record<string, typeof allFAQs> = {};

  categories.forEach(cat => {
    faqsByCategory[cat.slug] = allFAQs.filter(faq =>
      faq.category === cat.slug
    );
  });

  return (
    <PageLayout>
      {/* 검색바를 FAQClient로 분리 */}
      <FAQClient allFAQs={allFAQs} faqsByCategory={faqsByCategory} categories={categories} />
    </PageLayout>
  );
}
