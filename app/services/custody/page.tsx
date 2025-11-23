import PageLayout from '@/components/layouts/PageLayout';
import ServicePageLayout from '@/components/features/ServicePageLayout';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';
import { Baby, Heart, DollarSign, Users, Calendar, Shield } from 'lucide-react';

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

  const features = [
    {
      title: '아이 중심 접근',
      description: '아이의 정서적 안정과 복리를 최우선으로 고려한 양육 방안을 제시합니다.',
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: '양육 적합성 입증',
      description: '양육 환경, 경제력, 애착 관계 등을 종합적으로 입증하여 양육권을 확보합니다.',
      icon: <Baby className="w-6 h-6" />
    },
    {
      title: '적정 양육비 산정',
      description: '아이의 실제 필요와 부모의 경제력을 고려한 합리적인 양육비를 산정합니다.',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: '면접교섭권 보장',
      description: '비양육 부모의 면접교섭권을 합리적으로 설정하여 아이와의 관계를 유지합니다.',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: '양육 계획 수립',
      description: '학업, 의료, 종교 등 아이의 성장 전반에 대한 구체적인 계획을 수립합니다.',
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: '강제이행 확보',
      description: '양육비 미지급, 면접교섭 방해 등에 대한 법적 대응 방안을 마련합니다.',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const process = [
    {
      step: '01',
      title: '양육 환경 평가',
      description: '부모 각자의 양육 능력, 주거 환경, 경제력, 양육 보조자, 교육 계획 등을 종합적으로 평가합니다. 필요시 가사조사관 조사에 대비합니다.'
    },
    {
      step: '02',
      title: '아이 의사 확인',
      description: '아이의 연령과 성숙도를 고려하여 의사를 확인합니다. 13세 이상인 경우 법원이 직접 의견을 청취할 수 있습니다.'
    },
    {
      step: '03',
      title: '양육비 산정',
      description: '법원의 양육비 산정기준표를 기초로 아이의 실제 필요 비용을 산출합니다. 교육비, 의료비, 특별활동비 등을 구체적으로 계산합니다.'
    },
    {
      step: '04',
      title: '양육 협의서 작성',
      description: '양육권자, 양육비, 면접교섭 일정과 방법, 특별 사항 등을 구체적으로 명시한 협의서를 작성합니다.'
    },
    {
      step: '05',
      title: '법원 결정 및 이행',
      description: '협의가 되지 않을 경우 법원에 심판을 청구합니다. 결정 후에는 이행 상황을 모니터링하고 필요시 강제집행 등의 조치를 취합니다.'
    }
  ];

  return (
    <PageLayout>
      <ServicePageLayout
        title="양육권 및 양육비"
        subtitle="아이의 행복이 최우선입니다"
        description="아이의 건강한 성장을 위한 최선의 양육 방안을 찾고, 부모의 책임을 명확히 합니다"
        gradientFrom="from-blue-600"
        gradientTo="to-purple-600"
        features={features}
        process={process}
        faqs={allFAQs}
        relatedCases={relatedCases}
        ctaTitle="양육 문제 상담받기"
        ctaDescription="아이를 위한 최선의 선택, 전문가와 함께 신중하게 결정하세요."
      />
    </PageLayout>
  );
}