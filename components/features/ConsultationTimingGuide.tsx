'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ConsultationTimingGuideProps {
  onOpenBookingModal?: () => void;
  onOpenPhoneModal?: () => void;
}

export default function ConsultationTimingGuide({
  onOpenBookingModal,
  onOpenPhoneModal
}: ConsultationTimingGuideProps) {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const timelineStages = [
    {
      stage: '고민만 하는 중',
      imagePath: '/images/consultation-stages/stage-1-thinking.png',
      description: '아직 혼자 생각만',
      situations: [
        '이혼할까 말까 고민만',
        '절차가 뭔지 모르겠어요',
        '돈은 얼마나 들까요',
      ],
      action: 'FAQ 먼저 볼래요',
      actionUrl: '/faq',
      actionType: 'secondary' as const,
      tip: '천천히 알아보세요',
      color: 'from-sage-50 to-sage-100',
      borderColor: 'border-sage-200',
      iconBg: 'bg-sage-50',
    },
    {
      stage: '이야기 시작했어요',
      imagePath: '/images/consultation-stages/stage-2-conversation.png',
      description: '배우자랑 대화 중',
      situations: [
        '이혼 얘기 꺼냈어요',
        '협의이혼 준비 중',
        '조건 협의 시작했어요',
      ],
      action: '10분만 상담할래요',
      actionUrl: '#consultation',
      actionType: 'primary' as const,
      tip: '지금이 중요해요',
      color: 'from-sage-100 to-sage-200',
      borderColor: 'border-sage-300',
      iconBg: 'bg-sage-100',
    },
    {
      stage: '문제가 생겼어요',
      imagePath: '/images/consultation-stages/stage-3-stressed.png',
      description: '상황이 급해요',
      situations: [
        '불륜 발견했어요',
        '위자료 청구받았어요',
        '재산 숨기는 것 같아요',
      ],
      action: '이번 주 안에 연락주세요',
      actionUrl: '#consultation',
      actionType: 'primary' as const,
      tip: '빨리 시작하세요',
      color: 'from-coral-50 to-coral-100',
      borderColor: 'border-coral-300',
      iconBg: 'bg-coral-50',
    },
    {
      stage: '지금 당장 필요해요',
      imagePath: '/images/consultation-stages/stage-4-urgent.png',
      description: '법원 서류 받았어요',
      situations: [
        '소송 시작됐어요',
        '상대 변호사 있어요',
        '아이 데려가려 해요',
      ],
      action: '지금 바로 전화할게요',
      actionUrl: 'tel:1661-7633',
      actionType: 'urgent' as const,
      tip: '오늘 연락주세요',
      color: 'from-coral-100 to-coral-200',
      borderColor: 'border-coral-300',
      iconBg: 'bg-coral-100',
    },
  ];

  const handleAction = (stage: typeof timelineStages[0]) => {
    if (stage.actionUrl === '#consultation') {
      // 상담 예약 모달 열기
      onOpenBookingModal?.();
    } else if (stage.actionUrl.startsWith('tel:')) {
      // 전화 준비 모달 열기
      onOpenPhoneModal?.();
    } else {
      // 외부 링크 (예: FAQ)
      window.location.href = stage.actionUrl;
    }
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-sage-50/30 to-white">
      {/* Top Gradient Overlay - 신뢰 지표에서 자연스러운 전환 */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-0" />

      {/* Bottom Gradient Overlay - ThePlan으로 자연스러운 전환 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/70 to-transparent pointer-events-none z-0" />
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-12">
        {/* 제목 - 토스 스타일 */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 tracking-tight leading-tight">
            지금 어떤 상황이신가요
          </h2>
          <p className="text-sm md:text-xl text-gray-600 font-light">
            언제든 도와드릴 수 있어요
          </p>
        </div>

        {/* 데스크톱 그리드 - 2x2 레이아웃으로 개선 */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {timelineStages.map((stage, index) => {
            const isSelected = selectedStage === index;
            const isUrgent = index >= 2;
            return (
              <div key={index} className="flex flex-col">
                {/* 카드 */}
                <button
                  onClick={() => setSelectedStage(isSelected ? null : index)}
                  aria-label={`${stage.stage} 상황 자세히 보기`}
                  aria-expanded={isSelected}
                  className={`relative rounded-3xl p-8 min-h-[320px] transition-all duration-300 cursor-pointer group overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${stage.color} border-2 ${stage.borderColor} shadow-2xl scale-[1.02]`
                      : isUrgent
                      ? 'bg-gradient-to-br from-coral-50/80 via-white to-coral-50/40 border-2 border-coral-200/70 hover:border-coral-400 hover:shadow-xl hover:shadow-coral-200/50 hover:scale-[1.03]'
                      : index === 1
                      ? 'bg-gradient-to-br from-sage-100/70 via-white to-sage-50/50 border-2 border-sage-200/70 hover:border-sage-400 hover:shadow-lg hover:shadow-sage-200/40 hover:scale-[1.03]'
                      : 'bg-gradient-to-br from-sage-50/60 via-white to-white border-2 border-sage-100/60 hover:border-sage-300 hover:shadow-lg hover:shadow-sage-100/30 hover:scale-[1.03]'
                  }`}
                >

                  {/* 배경 이미지 - 데스크탑 버전 크게 */}
                  {isSelected ? (
                    <div className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300">
                      <Image
                        src={stage.imagePath}
                        alt={stage.stage}
                        fill
                        className="object-contain object-right-bottom"
                      />
                    </div>
                  ) : (
                    <div className="absolute bottom-0 right-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                      <Image
                        src={stage.imagePath}
                        alt={stage.stage}
                        width={360}
                        height={360}
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* 제목 */}
                  <div className="relative z-10 text-left">
                    <div className={`${isSelected ? 'mt-4' : 'mt-0'}`}>
                      <div className="bg-white/70 backdrop-blur-sm rounded-xl px-4 py-3 mb-3 inline-block">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                          {stage.stage}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {stage.description}
                        </p>
                      </div>

                      {/* 상황 미리보기 (접힌 상태에서 1개만 표시) */}
                      {!isSelected && (
                        <div className="mt-4 mb-12">
                          <p className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-sage-600">•</span>
                            <span>{stage.situations[0]}</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            +{stage.situations.length - 1}가지 상황 더보기
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 확장 아이콘 */}
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-transform duration-300 z-20 ${
                    isSelected ? 'rotate-180' : ''
                  }`}>
                    <svg className={`w-5 h-5 ${isUrgent ? 'text-coral-400' : 'text-sage-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* 확장 영역 */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isSelected ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`rounded-2xl p-5 bg-gradient-to-br ${stage.color} border ${stage.borderColor} relative overflow-hidden`}>
                    {/* 배경 이미지 */}
                    <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none">
                      <Image
                        src={stage.imagePath}
                        alt={stage.stage}
                        width={180}
                        height={180}
                        className="object-contain"
                      />
                    </div>

                    {/* 상황 목록 */}
                    <div className="space-y-2 mb-4 relative z-10">
                      {stage.situations.map((situation, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-700 mt-0.5">•</span>
                          <p className="text-sm text-gray-700">{situation}</p>
                        </div>
                      ))}
                    </div>

                    {/* Tip - 단계별 색상 조합 */}
                    <div className={`backdrop-blur-sm rounded-xl p-3 mb-4 relative z-10 ${
                      index >= 2
                        ? 'bg-coral-50/90 border border-coral-200/50 text-coral-900'
                        : index === 1
                        ? 'bg-sage-100/90 border border-sage-300/50 text-sage-900'
                        : 'bg-sage-50/90 border border-sage-200/50 text-sage-900'
                    }`}>
                      <p className="text-xs font-medium">
                        {stage.tip}
                      </p>
                    </div>

                    {/* Action 버튼 */}
                    <button
                      onClick={() => handleAction(stage)}
                      className={`w-full px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 relative z-10 ${
                        index >= 2
                          ? 'bg-coral-600 text-white hover:bg-coral-700 shadow-md hover:shadow-lg hover:scale-105'
                          : stage.actionType === 'primary'
                          ? 'bg-sage-600 text-white hover:bg-sage-700 shadow-md hover:shadow-lg hover:scale-105'
                          : 'bg-white text-sage-700 border-2 border-sage-400 hover:bg-sage-50 hover:border-sage-500 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {stage.action}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 모바일 아코디언 - 토스 스타일 (모바일 최적화) */}
        <div className="md:hidden space-y-3 mb-8">
          {timelineStages.map((stage, index) => {
            const isSelected = selectedStage === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${stage.color} ${stage.borderColor} shadow-xl`
                    : 'bg-white border-gray-200 active:border-gray-300'
                }`}
              >
                {/* 배경 이미지 - 오른쪽 배치 */}
                {isSelected ? (
                  <div className="absolute inset-0 pointer-events-none opacity-15 transition-opacity duration-300">
                    <Image
                      src={stage.imagePath}
                      alt={stage.stage}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-4">
                    <Image
                      src={stage.imagePath}
                      alt={stage.stage}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                )}

                {/* 헤더 */}
                <button
                  onClick={() => setSelectedStage(isSelected ? null : index)}
                  aria-label={`${stage.stage} 상황 자세히 보기`}
                  aria-expanded={isSelected}
                  className="w-full text-left p-4 relative z-10"
                >
                  <div className="flex items-center gap-3">
                    {/* 텍스트 영역 - 가독성 향상 */}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className={`inline-block rounded-lg px-2 py-1 ${
                        isSelected ? 'bg-white/50 backdrop-blur-sm' : ''
                      }`}>
                        <p className="font-bold text-gray-900 mb-1 text-lg leading-tight">{stage.stage}</p>
                        <p className="text-sm text-gray-600">{stage.description}</p>
                      </div>
                    </div>

                    {/* 화살표 */}
                    <div className={`flex-shrink-0 transition-transform duration-300 ${
                      isSelected ? 'rotate-180' : ''
                    }`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* 확장 영역 */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isSelected ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 pb-4 relative z-10">
                    <div className="pt-4 border-t border-gray-200/50">
                      {/* 상황 목록 - 더 큰 텍스트 */}
                      <div className="space-y-3 mb-5">
                        {stage.situations.map((situation, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="text-gray-700 mt-1 text-base">•</span>
                            <p className="text-base text-gray-700 leading-relaxed">{situation}</p>
                          </div>
                        ))}
                      </div>

                      {/* Tip - 단계별 색상 조합 */}
                      <div className={`backdrop-blur-md rounded-xl p-4 mb-5 border-2 shadow-sm ${
                        index >= 2
                          ? 'bg-coral-50 border-coral-300 text-coral-900'
                          : index === 1
                          ? 'bg-sage-100 border-sage-300 text-sage-900'
                          : 'bg-sage-50 border-sage-300 text-sage-900'
                      }`}>
                        <p className="text-sm font-medium leading-relaxed">
                          {stage.tip}
                        </p>
                      </div>

                      {/* Action 버튼 - 더 크고 눈에 띄게 */}
                      <button
                        onClick={() => handleAction(stage)}
                        className={`w-full px-6 py-4 rounded-full font-bold text-base transition-all duration-300 ${
                          index >= 2
                            ? 'bg-coral-600 text-white active:bg-coral-700 shadow-lg active:scale-95'
                            : stage.actionType === 'primary'
                            ? 'bg-sage-600 text-white active:bg-sage-700 shadow-lg active:scale-95'
                            : 'bg-white text-sage-700 active:bg-sage-50 shadow-md border-2 border-sage-300 active:scale-95'
                        }`}
                      >
                        {stage.action}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 안내 - 토스 스타일 */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-sm md:text-base text-gray-600 mb-1">
            어떤 상황이든 괜찮아요
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            비밀 보장됩니다
          </p>
        </div>
      </div>
    </section>
  );
}
