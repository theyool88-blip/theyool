import PageLayout from '@/components/layouts/PageLayout';
import CustodyClient from './CustodyClient';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';

export const metadata = {
  title: '양육권 및 양육비 - 법무법인 더율',
  description: '아이의 행복을 최우선으로 하는 양육권 확보 전략과 적정 양육비 산정. 면접교섭권까지 종합적으로 해결합니다.',
};

export default async function CustodyPage() {
  // 양육권/양육비 관련 FAQ 가져오기
  const custodyFAQs = await getFAQsByCategory('custody');
  const childSupportFAQs = await getFAQsByCategory('child-support');
  const visitationFAQs = await getFAQsByCategory('visitation');
  const paternityFAQs = await getFAQsByCategory('paternity');

  const allFAQs = [...custodyFAQs, ...childSupportFAQs, ...visitationFAQs, ...paternityFAQs]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.sort_order || 999) - (b.sort_order || 999);
    });

  // 양육권 관련 성공사례 가져오기
  const relatedCases = await getCasesByCategory('양육권');

  return (
    <PageLayout>
      <CustodyClient
        allFAQs={allFAQs}
        relatedCases={relatedCases}
      />
    </PageLayout>
  );
}
