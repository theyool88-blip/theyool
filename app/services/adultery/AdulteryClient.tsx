'use client';

import { useState } from 'react';
import ServicePageLayout from '@/components/features/ServicePageLayout';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import type { FAQ } from '@/lib/supabase/faq';
import { Eye, Camera, FileText, Shield, AlertTriangle, Scale } from 'lucide-react';

interface AdulteryClientProps {
  allFAQs: FAQ[];
  relatedCases: any[];
}

export default function AdulteryClient({ allFAQs, relatedCases }: AdulteryClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

  return (
    <>
      <ServicePageLayout
        title="불륜 및 상간 사건"
        subtitle="배신에 대한 정당한 책임을 묻습니다"
        description="배우자와 상간자의 불법행위를 입증하고, 정신적 고통에 대한 정당한 배상을 받아내요"
        gradientFrom="from-indigo-700"
        gradientTo="to-slate-700"
        features={features}
        process={process}
        faqs={allFAQs}
        relatedCases={relatedCases}
        ctaTitle="불륜 피해 상담받기"
        ctaDescription="증거 수집부터 손해배상까지, 끝까지 함께해요"
        colorScheme="indigo"
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
