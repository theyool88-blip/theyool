'use client';

import { useState } from 'react';
import ServicePageLayout from '@/components/features/ServicePageLayout';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import type { FAQ } from '@/lib/supabase/faq';
import { Scale, FileText, Calculator } from 'lucide-react';

interface AlimonyClientProps {
  allFAQs: FAQ[];
  relatedCases: any[];
}

export default function AlimonyClient({ allFAQs, relatedCases }: AlimonyClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const features = [
    {
      title: '책임 사유 입증',
      description: '상대방의 유책 사유를 입증해서 위자료 청구권을 확보해요',
      icon: <Scale className="w-6 h-6" />
    },
    {
      title: '적정 금액 산정',
      description: '판례 분석과 경제력 조사로 받을 수 있는 금액을 산정해요',
      icon: <Calculator className="w-6 h-6" />
    },
    {
      title: '증거 확보 전략',
      description: '불륜, 폭력, 유기 등 사유별 증거 수집 전략을 제시해요',
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const process = [
    {
      step: '01',
      title: '유책 사유 분석',
      description: '상대방의 혼인 파탄 책임을 입증할 수 있는 사유를 체계적으로 분석해요. 불륜, 가정폭력, 악의적 유기, 경제적 무책임 등 다양한 사유를 검토해요'
    },
    {
      step: '02',
      title: '증거 수집 및 보전',
      description: '유책 사유별로 필요한 증거를 수집하고 법적 효력을 갖추도록 보전해요. 탐정 보고서, 의료 기록, 금융 거래 내역 등을 확보해요'
    },
    {
      step: '03',
      title: '위자료 금액 산정',
      description: '유사 판례와 당사자들의 경제력, 혼인 기간, 파탄 경위 등을 종합적으로 고려해서 적정 위자료 금액을 산정해요'
    },
    {
      step: '04',
      title: '협상 및 소송',
      description: '상대방과 협상으로 합의를 시도하고, 필요하면 소송으로 법원 판결을 받아요. 강제집행까지 고려한 전략을 수립해요'
    }
  ];

  return (
    <>
      <ServicePageLayout
        title="위자료 청구"
        subtitle="받을 수 있는 만큼 확실하게"
        description="혼인 파탄의 책임이 있는 배우자에게 정신적 고통에 대한 위자료를 청구해요"
        gradientFrom="from-amber-600"
        gradientTo="to-yellow-600"
        features={features}
        process={process}
        faqs={allFAQs}
        relatedCases={relatedCases}
        ctaTitle="위자료 청구 상담받기"
        ctaDescription="편한 시간에 상담하세요. 계약 강요 없어요"
        colorScheme="amber"
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
