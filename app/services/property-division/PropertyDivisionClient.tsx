'use client';

import { useState } from 'react';
import ServicePageLayout from '@/components/features/ServicePageLayout';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import type { FAQ } from '@/lib/supabase/faq';
import { PieChart, FileSearch, TrendingUp } from 'lucide-react';

interface PropertyDivisionClientProps {
  propertyFAQs: FAQ[];
  relatedCases: any[];
}

export default function PropertyDivisionClient({ propertyFAQs, relatedCases }: PropertyDivisionClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const features = [
    {
      title: '철저한 재산 조사',
      description: '배우자의 숨겨진 재산까지 찾아서 정확한 재산 목록을 만들어요',
      icon: <FileSearch className="w-6 h-6" />
    },
    {
      title: '기여도 입증',
      description: '가사노동, 육아, 내조 등 무형의 기여도를 수치화해서 입증해요',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: '최적 분할 전략',
      description: '세금, 대출, 명의 이전 등을 고려한 실질적인 분할 방안을 제시해요',
      icon: <PieChart className="w-6 h-6" />
    }
  ];

  const process = [
    {
      step: '01',
      title: '재산 현황 파악',
      description: '부동산, 예금, 주식, 보험, 퇴직금 등 모든 재산을 조사해요. 금융거래정보 제출명령, 재산조회 등으로 숨겨진 재산도 찾아내요'
    },
    {
      step: '02',
      title: '기여도 산정',
      description: '혼인 기간 중 재산 형성에 대한 각자의 기여도를 산정해요. 경제활동, 가사노동, 육아, 부모 봉양 등 모든 기여 요소를 고려해요'
    },
    {
      step: '03',
      title: '분할 비율 협상',
      description: '법원 판례와 개별 사정을 고려해서 적정 분할 비율을 제시하고 협상해요. 필요하면 감정평가, 회계감사 등 전문가 의견을 활용해요'
    },
    {
      step: '04',
      title: '재산 분할 실행',
      description: '합의 또는 판결에 따라 실제 재산을 분할해요. 등기이전, 예금 인출, 명의 변경 등 모든 절차를 지원해요'
    },
    {
      step: '05',
      title: '세금 및 사후관리',
      description: '재산분할에 따른 세금 문제를 검토하고 절세 방안을 제시해요. 분할 이행이 완료될 때까지 관리해요'
    }
  ];

  return (
    <>
      <ServicePageLayout
        title="재산분할"
        subtitle="공정하고 합리적인 재산 분배"
        description="혼인 기간 중 형성된 재산을 정확히 평가하고 기여도에 따라 공정하게 분할해요"
        gradientFrom="from-cyan-600"
        gradientTo="to-teal-600"
        features={features}
        process={process}
        faqs={propertyFAQs}
        relatedCases={relatedCases}
        ctaTitle="재산분할 상담받기"
        ctaDescription="숨겨진 재산 찾기부터 공정한 분할까지, 전문가가 끝까지 함께해요"
        colorScheme="cyan"
        excludeItems={['transparent-fees']}
        onOpenConsultationModal={() => setIsBookingModalOpen(true)}
      />

      {/* Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
