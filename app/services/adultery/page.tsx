import PageLayout from '@/components/layouts/PageLayout';
import AdulteryClient from './AdulteryClient';
import { getFAQsByCategory } from '@/lib/supabase/faq';
import { getCasesByCategory } from '@/lib/supabase/cases';

export const metadata = {
  title: '불륜 및 상간 사건 - 법무법인 더율',
  description: '배우자의 불륜 증거 수집부터 상간자 손해배상청구까지. 정확한 증거와 전략으로 정당한 배상을 받아드립니다.',
};

export default async function AdulteryPage() {
  // 불륜/상간 관련 FAQ 가져오기
  const adulteryFAQs = await getFAQsByCategory('adultery');

  // 불륜 관련 성공사례 가져오기
  const relatedCases = await getCasesByCategory('상간');

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
      <AdulteryClient
        allFAQs={allFAQs}
        relatedCases={relatedCases}
      />
    </PageLayout>
  );
}
