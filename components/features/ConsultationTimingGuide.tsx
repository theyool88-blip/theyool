'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConsultationTimingGuide() {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const timelineStages = [
    {
      stage: '고민 단계',
      icon: '🤔',
      description: '혼자 생각 중이에요',
      situations: [
        '이혼을 고민만 하고 있어요',
        '법적 정보를 찾아보는 중이에요',
        '이혼 절차가 궁금해요',
        '예상 비용을 알고 싶어요',
      ],
      action: 'FAQ 먼저 볼게요',
      actionUrl: '/faq',
      actionType: 'secondary' as const,
      tip: '충분히 알아보고 준비하세요',
    },
    {
      stage: '대화 시작',
      icon: '💬',
      description: '배우자와 얘기 중이에요',
      situations: [
        '배우자와 이혼 대화를 시작했어요',
        '협의이혼을 준비하고 있어요',
        '별거를 고려하고 있어요',
        '조건 협의를 시작하려 해요',
      ],
      action: '전략 상담받을게요',
      actionUrl: '#consultation',
      actionType: 'primary' as const,
      tip: '초기 대응이 결과를 좌우해요',
    },
    {
      stage: '갈등 심화',
      icon: '⚠️',
      description: '상황이 심각해졌어요',
      situations: [
        '배우자의 불륜을 발견했어요',
        '이혼 요구를 받았어요',
        '위자료 청구 통보를 받았어요',
        '재산 은닉 징후가 보여요',
      ],
      action: '1주일 내 연락주세요',
      actionUrl: '#consultation',
      actionType: 'primary' as const,
      tip: '빠른 대응이 필요해요',
    },
    {
      stage: '긴급 상황',
      icon: '🚨',
      description: '법적 조치가 시작됐어요',
      situations: [
        '법원 서류를 받았어요',
        '상대방 변호사가 연락했어요',
        '폭력이나 협박을 당했어요',
        '아이를 데려가려 해요',
      ],
      action: '바로 도와주세요',
      actionUrl: 'tel:1661-7633',
      actionType: 'urgent' as const,
      tip: '즉시 대응이 필요합니다',
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 제목 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">
            When to Consult
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            지금 어느 단계에 계신가요?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-2">
            결심 전이든, 진행 중이든, 막 끝났든
          </p>
          <p className="text-base md:text-lg text-gray-500 font-light max-w-2xl mx-auto">
            모든 단계에서 도움드릴 수 있어요
          </p>
        </div>

        {/* 데스크톱 타임라인 - Inline Accordion */}
        <div className="hidden md:block max-w-5xl mx-auto mb-12">
          <div className="relative mb-16">
            {/* 연결선 배경 */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-blue-200 via-amber-200 to-red-200"></div>

            {/* 단계들 */}
            <div className="relative grid grid-cols-4 gap-4">
              {timelineStages.map((stage, index) => {
                const isSelected = selectedStage === index;
                return (
                  <div key={index} className="flex flex-col">
                    {/* 단계 카드 */}
                    <button
                      onClick={() => setSelectedStage(isSelected ? null : index)}
                      className="flex flex-col items-center cursor-pointer group focus:outline-none"
                    >
                      {/* 아이콘 */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-500 to-amber-500 shadow-lg scale-110'
                          : 'bg-white border-2 border-gray-200 group-hover:border-blue-300 group-hover:shadow-md'
                      }`}>
                        <span>{stage.icon}</span>
                      </div>

                      {/* 단계명 */}
                      <p className={`text-sm font-semibold mb-1 transition-colors duration-300 ${
                        isSelected ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'
                      }`}>
                        {stage.stage}
                      </p>

                      {/* 설명 */}
                      <p className="text-xs text-gray-500 text-center">
                        {stage.description}
                      </p>

                      {/* 확장 표시 */}
                      <div className={`mt-2 transition-transform duration-300 ${
                        isSelected ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Inline 상세 내용 */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isSelected ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-xl">
                        {/* 상황 목록 */}
                        <div className="space-y-2 mb-6">
                          {stage.situations.map((situation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5 text-sm">✓</span>
                              <p className="text-sm text-gray-700">{situation}</p>
                            </div>
                          ))}
                        </div>

                        {/* Tip */}
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-gray-600">
                            💡 {stage.tip}
                          </p>
                        </div>

                        {/* Action 버튼 */}
                        <button
                          onClick={() => handleAction(stage)}
                          className={`w-full px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                            stage.actionType === 'urgent'
                              ? 'bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg'
                              : stage.actionType === 'primary'
                              ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
          </div>
        </div>

        {/* 모바일 타임라인 - Inline Accordion */}
        <div className="md:hidden max-w-2xl mx-auto mb-12">
          <div className="space-y-3">
            {timelineStages.map((stage, index) => {
              const isSelected = selectedStage === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-50 to-amber-50/30 border-blue-400 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {/* 단계 헤더 */}
                  <button
                    onClick={() => setSelectedStage(isSelected ? null : index)}
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-3xl flex-shrink-0">{stage.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 mb-1">{stage.stage}</p>
                          <p className="text-sm text-gray-600">{stage.description}</p>
                        </div>
                      </div>

                      {/* 확장 표시 */}
                      <div className={`flex-shrink-0 transition-transform duration-300 ${
                        isSelected ? 'rotate-180' : ''
                      }`}>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Inline 상세 내용 */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isSelected ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5">
                      <div className="pt-4 border-t border-gray-200">
                        {/* 상황 목록 */}
                        <div className="space-y-2 mb-5">
                          {stage.situations.map((situation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">✓</span>
                              <p className="text-sm text-gray-700">{situation}</p>
                            </div>
                          ))}
                        </div>

                        {/* Tip */}
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <p className="text-xs text-gray-600">
                            💡 {stage.tip}
                          </p>
                        </div>

                        {/* Action 버튼 */}
                        <button
                          onClick={() => handleAction(stage)}
                          className={`w-full px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                            stage.actionType === 'urgent'
                              ? 'bg-red-600 text-white hover:bg-red-700 shadow-md active:scale-95'
                              : stage.actionType === 'primary'
                              ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md active:scale-95'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95'
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
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center">
          <p className="text-base md:text-lg text-gray-700 mb-2 font-light">
            어떤 단계든 도와드릴 수 있어요
          </p>
          <p className="text-sm text-gray-500">
            비밀 보장 · 익명 상담 가능 · 오늘 연락드려요
          </p>
        </div>
      </div>
    </section>
  );
}
