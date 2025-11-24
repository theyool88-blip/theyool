import PageLayout from '@/components/layouts/PageLayout';
import AlimonyClient from './AlimonyClient';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';

export const metadata = {
  title: '위자료 청구 - 법무법인 더율',
  description: '이혼 시 위자료 청구 조건과 금액 산정 기준, 성공 전략을 안내합니다. 전문 변호사가 최대 위자료를 받을 수 있도록 도와드립니다.',
};

export default async function AlimonyPage() {
  // 위자료 관련 FAQ 가져오기
  const alimonyFAQs = await getFAQsByCategory('alimony');
  const separationFAQs = await getFAQsByCategory('separation-expense');
  const allFAQs = [...alimonyFAQs, ...separationFAQs]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.sort_order || 999) - (b.sort_order || 999);
    });

  // 위자료 관련 성공사례 가져오기
  const relatedCases = await getCasesByCategory('위자료');

  return (
    <PageLayout>
      <AlimonyClient
        allFAQs={allFAQs}
        relatedCases={relatedCases}
      />
    </PageLayout>
  );
}
