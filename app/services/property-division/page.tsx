import PageLayout from '@/components/layouts/PageLayout';
import PropertyDivisionClient from './PropertyDivisionClient';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';

export const metadata = {
  title: '재산분할 - 법무법인 더율',
  description: '이혼 시 공정한 재산분할을 위한 전문 법률 서비스. 숨겨진 재산 추적부터 최적의 분할 비율까지 전문가가 도와드립니다.',
};

export default async function PropertyDivisionPage() {
  // 재산분할 관련 FAQ 가져오기
  const propertyFAQs = await getFAQsByCategory('property-division');

  // 재산분할 관련 성공사례 가져오기
  const relatedCases = await getCasesByCategory('재산분할');

  return (
    <PageLayout>
      <PropertyDivisionClient
        propertyFAQs={propertyFAQs}
        relatedCases={relatedCases}
      />
    </PageLayout>
  );
}
