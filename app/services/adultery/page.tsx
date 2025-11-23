import PageLayout from '@/components/layouts/PageLayout';
import ServicePageLayout from '@/components/features/ServicePageLayout';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';
import { Eye, Camera, FileText, Shield, AlertTriangle, Scale } from 'lucide-react';

export const metadata = {
  title: '불륜 및 상간 사건 - 법무법인 더율',
  description: '배우자의 불륜 증거 수집부터 상간자 손해배상청구까지. 정확한 증거와 전략으로 정당한 배상을 받아드립니다.',
};

export default async function AdulteryPage() {
  // 불륜/상간 관련 FAQ 가져오기
  const adulteryFAQs = await getFAQsByCategory('adultery');

  // 불륜 관련 성공사례 가져오기
  const relatedCases = await getCasesByCategory('상간');

  const features = [
    {
      title: '전문 증거 수집',
      description: '탐정, 디지털 포렌식 등 전문적인 방법으로 불륜 증거를 확보해요',
      icon: <Camera className="w-6 h-6" />
    },
    {
      title: '법적 증거력 확보',
      description: '수집된 증거가 법정에서 인정받을 수 있도록 적법한 절차를 지켜요',
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: '상간자 책임 추궁',
      description: '불륜 상대방에 대한 손해배상청구로 정당한 배상을 받아내요',
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: '2차 피해 방지',
      description: '불륜 사실 유포, 협박 등 2차 피해로부터 보호해요',
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: '신속한 대응',
      description: '증거 인멸 전 신속한 증거 보전과 법적 조치로 권리를 보호해요',
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      title: '종합적 해결',
      description: '이혼, 위자료, 재산분할, 양육권까지 연계해서 종합적으로 해결해요',
      icon: <Eye className="w-6 h-6" />
    }
  ];

  const process = [
    {
      step: '01',
      title: '정황 파악 및 전략 수립',
      description: '불륜 정황을 분석하고 증거 수집 가능성을 검토해요. 목적(이혼, 관계 회복, 손해배상 등)에 따른 맞춤 전략을 수립해요'
    },
    {
      step: '02',
      title: '증거 수집',
      description: '메시지, 사진, 영상, 목격자 진술, 신용카드 사용 내역, 차량 동선 등 다양한 증거를 수집해요. 필요하면 전문 탐정을 활용해요'
    },
    {
      step: '03',
      title: '증거 보전 및 분석',
      description: '수집된 증거를 법적으로 유효하게 보전하고, 증거력을 분석해요. 디지털 증거의 경우 포렌식 분석을 해요'
    },
    {
      step: '04',
      title: '법적 조치',
      description: '배우자와 상간자를 상대로 손해배상을 청구해요. 불륜이 이혼 사유인 경우 위자료 청구와 연계해서 진행해요'
    },
    {
      step: '05',
      title: '합의 또는 판결',
      description: '상대방과 합의를 시도하고, 어려우면 법원 판결을 받아요. 판결 후 강제집행까지 완료해요'
    }
  ];

  // FAQ가 부족한 경우 추가 내용 생성
  const additionalFAQs = [
    {
      id: 'adultery-add-1',
      question: '배우자의 불륜을 의심하고 있는데, 어떻게 해야 하나요?',
      slug: 'adultery-suspicion',
      category: 'adultery',
      summary: '불륜 의심 시 대처 방법',
      answer: `<p>불륜이 의심되는 상황에서는 감정적으로 대응하기보다 냉정하게 증거를 수집하는 것이 중요합니다.</p>
<ul>
<li><strong>정황 기록</strong>: 의심스러운 행동, 외박, 변화된 패턴 등을 일자별로 기록</li>
<li><strong>증거 보전</strong>: 메시지, 통화 기록, 사진 등을 안전하게 보관</li>
<li><strong>법률 상담</strong>: 전문가와 상담하여 적법한 증거 수집 방법 확인</li>
<li><strong>신중한 대처</strong>: 성급한 추궁보다는 충분한 증거 확보 후 대응</li>
</ul>
<p>무엇보다 적법한 방법으로 증거를 수집해야 법적 효력을 인정받을 수 있습니다.</p>`,
      featured: true,
      published: true,
      views: 0,
      sort_order: 1,
      related_blog_posts: null,
      related_cases: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'adultery-add-2',
      question: '상간자에게 받을 수 있는 위자료는 얼마나 되나요?',
      slug: 'adultery-damages',
      category: 'adultery',
      summary: '상간자 손해배상 금액',
      answer: `<p>상간자에 대한 손해배상(위자료) 금액은 여러 요소를 고려하여 결정됩니다.</p>
<h3>금액 결정 요소</h3>
<ul>
<li><strong>불륜의 정도</strong>: 기간, 빈도, 관계의 깊이</li>
<li><strong>파탄 기여도</strong>: 혼인 파탄에 미친 영향</li>
<li><strong>경제적 능력</strong>: 상간자의 재산과 수입</li>
<li><strong>정신적 고통</strong>: 배우자가 받은 충격의 정도</li>
</ul>
<h3>일반적인 금액</h3>
<p>법원 판례상 상간자에 대한 위자료는 보통 <strong>1,000만원~5,000만원</strong> 정도이며, 구체적 사정에 따라 달라질 수 있습니다.</p>`,
      featured: false,
      published: true,
      views: 0,
      sort_order: 2,
      related_blog_posts: null,
      related_cases: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'adultery-add-3',
      question: '불륜 증거로 인정되는 것은 무엇인가요?',
      slug: 'adultery-evidence',
      category: 'adultery',
      summary: '법적으로 인정되는 불륜 증거',
      answer: `<p>법원에서 불륜 증거로 인정받기 위해서는 부정행위를 추정할 수 있는 구체적이고 객관적인 자료가 필요합니다.</p>
<h3>직접 증거</h3>
<ul>
<li>불륜 현장 사진이나 영상</li>
<li>모텔 등 숙박업소 출입 기록</li>
<li>성관계를 암시하는 명확한 대화 내용</li>
</ul>
<h3>정황 증거</h3>
<ul>
<li>애정 표현이 담긴 메시지나 편지</li>
<li>함께 여행을 간 기록 (사진, 영수증 등)</li>
<li>신용카드 사용 내역 (선물, 식사 등)</li>
<li>목격자 진술서</li>
<li>탐정 보고서</li>
</ul>
<h3>주의사항</h3>
<p>불법적인 방법(해킹, 불법 녹음 등)으로 수집한 증거는 인정받지 못할 수 있으므로, 반드시 적법한 방법으로 증거를 수집해야 합니다.</p>`,
      featured: false,
      published: true,
      views: 0,
      sort_order: 3,
      related_blog_posts: null,
      related_cases: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const allFAQs = [...adulteryFAQs, ...additionalFAQs];

  return (
    <PageLayout>
      <ServicePageLayout
        title="불륜 및 상간 사건"
        subtitle="배신에 대한 정당한 책임을 묻습니다"
        description="배우자와 상간자의 불법행위를 입증하고, 정신적 고통에 대한 정당한 배상을 받아내요"
        gradientFrom="from-sage-600"
        gradientTo="to-sage-700"
        features={features}
        process={process}
        faqs={allFAQs}
        relatedCases={relatedCases}
        ctaTitle="불륜 피해 상담받기"
        ctaDescription="증거 수집부터 손해배상까지, 끝까지 함께해요"
      />
    </PageLayout>
  );
}