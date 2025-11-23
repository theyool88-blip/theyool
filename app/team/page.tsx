import PageLayout from '@/components/layouts/PageLayout';
import TeamPageClient from './TeamPageClient';
import { getFAQsByCategory } from '@/lib/supabase/faq';

export const metadata = {
  title: '변호사 소개 - 법무법인 더율 | 임은지 변호사',
  description: '13년 이혼 전문 경력의 임은지 변호사가 처음부터 끝까지 직접 함께합니다. 1,200건 이상의 성공 사례, 87% 승소율.',
};

// 변호사 정보 타입
interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  education: string[];
  currentPositions: string[];
  previousPositions: string[];
  image?: string;
  certificates?: string[];
  isRepresentative?: boolean;
  experience?: string;
  motto?: string;
}

// 변호사 데이터 - 임은지 변호사 (Solo Practitioner)
const lawyer: LawyerProfile = {
  id: 'lim-eunji',
  name: '임은지',
  title: '이혼전문변호사',
  experience: '13년+',
  motto: '이혼의 진심을 담아 함께합니다',
  specialties: [
    '위자료 청구 전문',
    '양육비 산정 및 변경',
    '친권 및 면접교섭권',
    '이혼 후 재산분할'
  ],
  education: [
    '연세대학교 졸업',
    '숙명여고 졸업'
  ],
  currentPositions: [
    '법무법인 더율 평택분사무소 주재',
    '경기도평택교육지원청 인사위원',
    '평택시 임대주택 분쟁조정위원',
    '안성경찰서 경미범죄심사위원',
    '안성시 공직자윤리위원회 위원',
    '주식회사 유앤미코스메틱 자문변호사',
    '미디어팟 자문변호사'
  ],
  previousPositions: [
    '대한변호사협회 대의원',
    '대법원 국선변호인',
    '서울도봉경찰서 수사민원센터 자문변호사',
    '금천초등학교 고문변호사',
    '주식회사 한솔교육 고문변호사'
  ],
  image: '/images/profile-lawyer-new.jpg',
  certificates: [
    'certi-7', 'certi-6', 'certi-5', 'certi-3',
    'certi-2', 'certi-1', 'home-divorce-certi-3'
  ]
};

export default async function TeamPage() {
  // 법률 지원 관련 FAQ 가져오기 (변호사 선임, 비용, 절차 등)
  const legalSupportFAQs = await getFAQsByCategory('legal-support');

  return (
    <PageLayout>
      <TeamPageClient lawyer={lawyer} faqs={legalSupportFAQs} />
    </PageLayout>
  );
}
