'use client';

import { useState } from 'react';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';

interface LandingConsultationPromptProps {
  topic: '위자료' | '양육권' | '재산분할' | string;
  variant?: 'default' | 'urgent' | 'reassurance';
}

export default function LandingConsultationPrompt({
  topic,
  variant = 'default'
}: LandingConsultationPromptProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const messages = {
    위자료: {
      default: {
        title: "위자료 문제, 혼자 고민하지 마세요",
        description: "청구를 받았든, 청구할 계획이든\n지금 바로 상담하면 훨씬 유리합니다",
        urgency: "시간이 지날수록 불리해져요",
      },
      urgent: {
        title: "위자료 청구서를 받으셨나요?",
        description: "답변서 제출 기한이 있어요\n늦으면 불리해집니다",
        urgency: "지금 바로 상담하세요 (10분 무료)",
      },
      reassurance: {
        title: "걱정 마세요, 방법이 있어요",
        description: "부당한 청구는 막을 수 있고\n과도한 금액은 줄일 수 있습니다",
        urgency: "1,200건 경험으로 도와드려요",
      },
    },
    양육권: {
      default: {
        title: "아이와의 미래, 지금 준비하세요",
        description: "양육권은 준비가 전부예요\n늦으면 불리해집니다",
        urgency: "지금 상담하면 확실히 유리해요",
      },
      urgent: {
        title: "양육권 분쟁 중이신가요?",
        description: "법원은 현재 양육 상황을 중요하게 봐요\n빨리 준비해야 합니다",
        urgency: "지금 바로 상담하세요 (10분 무료)",
      },
      reassurance: {
        title: "양육권, 포기하지 마세요",
        description: "경제력이 부족해도\n준비만 제대로 하면 가능합니다",
        urgency: "10명 중 9명 성공한 전략",
      },
    },
    재산분할: {
      default: {
        title: "재산분할, 제대로 받으세요",
        description: "숨긴 재산도 찾고\n정당한 몫을 챙겨드려요",
        urgency: "지금 상담하면 훨씬 유리해요",
      },
      urgent: {
        title: "재산을 숨기고 있나요?",
        description: "시간이 지날수록 추적이 어려워져요\n지금 바로 조사해야 합니다",
        urgency: "지금 바로 상담하세요 (10분 무료)",
      },
      reassurance: {
        title: "재산분할 0원? 불가능해요",
        description: "법적으로 보장된 권리예요\n정당한 몫을 찾아드려요",
        urgency: "평균 60% 지켜냈어요",
      },
    },
  };

  const currentMessages = messages[topic as keyof typeof messages]?.[variant] || messages['위자료'][variant];

  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50/50 via-white to-white">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-blue-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-4 tracking-wide">
                {currentMessages.urgency}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {currentMessages.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {currentMessages.description}
              </p>
            </div>

            {/* Consultation Options */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {/* Phone */}
              <a
                href="tel:1661-7633"
                className="group bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm">전화상담</p>
                    <p className="text-xs text-gray-300">10분 무료</p>
                  </div>
                </div>
                <p className="text-lg font-bold">1661-7633</p>
              </a>

              {/* Video/Visit */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-2xl hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm">영상상담</p>
                    <p className="text-xs text-blue-100">집에서 편하게</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">예약하기 →</p>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-br from-purple-600 to-purple-700 text-white p-6 rounded-2xl hover:shadow-xl transition-all hover:scale-105 text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <div>
                    <p className="font-bold text-sm">방문상담</p>
                    <p className="text-xs text-purple-100">직접 만나서</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">예약하기 →</p>
              </button>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-600 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>100% 비밀 보장</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>익명 상담 가능</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>계약 강요 없음</span>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="text-center mt-6">
              <a
                href="/consultation"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                상담이 처음이라면? 자세히 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ConsultationBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
