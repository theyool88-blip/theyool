'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ConsultationTimingGuide() {
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
      color: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-50',
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
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      iconBg: 'bg-purple-50',
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
      color: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
      iconBg: 'bg-amber-50',
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
      color: 'from-red-50 to-red-100',
      borderColor: 'border-red-200',
      iconBg: 'bg-red-50',
    },
  ];

  const handleAction = (stage: typeof timelineStages[0]) => {
    if (stage.actionUrl === '#consultation') {
      const modal = document.querySelector('[data-consultation-modal]');
      if (modal) {
        (modal as HTMLElement).click();
      }
    } else if (stage.actionUrl.startsWith('tel:')) {
      window.location.href = stage.actionUrl;
    } else {
      window.location.href = stage.actionUrl;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="max-w-[1100px] mx-auto px-4 md:px-12">
        {/* 제목 - 토스 스타일 */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 tracking-tight leading-tight">
            지금 어떤 상황이신가요
          </h2>
          <p className="text-sm md:text-xl text-gray-600 font-light">
            언제든 도와드릴 수 있어요
          </p>
        </div>

        {/* 데스크톱 그리드 - 모던 카드 스타일 */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 mb-12">
          {timelineStages.map((stage, index) => {
            const isSelected = selectedStage === index;
            return (
              <div key={index} className="flex flex-col">
                {/* 카드 */}
                <button
                  onClick={() => setSelectedStage(isSelected ? null : index)}
                  aria-label={`${stage.stage} 상황 자세히 보기`}
                  aria-expanded={isSelected}
                  className={`relative rounded-3xl p-6 min-h-[280px] transition-all duration-300 cursor-pointer group overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${stage.color} border-2 ${stage.borderColor} shadow-xl scale-105`
                      : 'bg-white border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  {/* 배경 이미지 - 오른쪽 배치 */}
                  {isSelected ? (
                    <div className="absolute inset-0 pointer-events-none opacity-25 transition-opacity duration-300">
                      <Image
                        src={stage.imagePath}
                        alt={stage.stage}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6">
                      <Image
                        src={stage.imagePath}
                        alt={stage.stage}
                        width={180}
                        height={180}
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* 제목 */}
                  <div className="relative z-10 text-center">
                    <div className={`inline-block ${isSelected ? 'mt-4' : 'mt-16'}`}>
                      <div className="bg-white/50 backdrop-blur-sm rounded-lg px-3 py-1 mb-2">
                        <h3 className="text-base font-bold text-gray-900 leading-tight">
                          {stage.stage}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-600">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* 확장 아이콘 */}
                  <div className={`flex justify-center transition-transform duration-300 relative z-10 ${
                    isSelected ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      stage.actionType === 'urgent'
                        ? 'bg-red-50/90 border border-red-200/50 text-red-900'
                        : index === 2
                        ? 'bg-amber-50/90 border border-amber-200/50 text-amber-900'
                        : index === 1
                        ? 'bg-purple-50/90 border border-purple-200/50 text-purple-900'
                        : 'bg-blue-50/90 border border-blue-200/50 text-blue-900'
                    }`}>
                      <p className="text-xs font-medium">
                        {stage.tip}
                      </p>
                    </div>

                    {/* Action 버튼 */}
                    <button
                      onClick={() => handleAction(stage)}
                      className={`w-full px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 relative z-10 ${
                        stage.actionType === 'urgent'
                          ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg hover:scale-105'
                          : stage.actionType === 'primary'
                          ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105'
                          : 'bg-white text-gray-900 hover:bg-gray-50 shadow-sm'
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
                        stage.actionType === 'urgent'
                          ? 'bg-red-50 border-red-300 text-red-900'
                          : stage.actionType === 'primary' && index === 2
                          ? 'bg-amber-50 border-amber-300 text-amber-900'
                          : stage.actionType === 'primary' && index === 1
                          ? 'bg-purple-50 border-purple-300 text-purple-900'
                          : 'bg-blue-50 border-blue-300 text-blue-900'
                      }`}>
                        <p className="text-sm font-medium leading-relaxed">
                          {stage.tip}
                        </p>
                      </div>

                      {/* Action 버튼 - 더 크고 눈에 띄게 */}
                      <button
                        onClick={() => handleAction(stage)}
                        className={`w-full px-6 py-4 rounded-full font-bold text-base transition-all duration-300 ${
                          stage.actionType === 'urgent'
                            ? 'bg-red-600 text-white active:bg-red-700 shadow-lg active:scale-95'
                            : stage.actionType === 'primary'
                            ? 'bg-gray-900 text-white active:bg-gray-800 shadow-lg active:scale-95'
                            : 'bg-white text-gray-900 active:bg-gray-50 shadow-md border-2 border-gray-200 active:scale-95'
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
