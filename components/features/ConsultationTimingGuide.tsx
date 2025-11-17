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
        {/* 공감 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-8 px-6 py-6 bg-gradient-to-br from-blue-50 via-blue-100/30 to-amber-50/20 rounded-2xl border border-blue-100/50">
          <p className="text-base md:text-lg text-gray-800 leading-relaxed">
            <span className="font-semibold text-gray-900">결심 전이든, 진행 중이든, 막 끝났든.</span><br />
            <span className="text-gray-700">모든 단계에서 도움드릴 수 있어요.</span>
          </p>
        </div>

        {/* 제목 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">
            When to Consult
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            지금 어느 단계에 계신가요?
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            각 상황에 딱 맞는 해결책이 있습니다
          </p>
        </div>

        {/* 타임라인 */}
        <div className="max-w-5xl mx-auto">
          {/* 진행 바 (데스크톱) */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              {/* 연결선 */}
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-amber-200 to-red-200"></div>

              {/* 단계들 */}
              <div className="relative grid grid-cols-4 gap-4">
                {timelineStages.map((stage, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => setSelectedStage(selectedStage === index ? null : index)}
                  >
                    {/* 아이콘 */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 transition-all ${
                      selectedStage === index
                        ? 'bg-gradient-to-br from-blue-500 to-amber-500 shadow-lg scale-110'
                        : 'bg-white border-2 border-gray-200 group-hover:border-blue-300 group-hover:shadow-md'
                    }`}>
                      <span className={selectedStage === index ? 'filter grayscale-0' : ''}>{stage.icon}</span>
                    </div>

                    {/* 단계명 */}
                    <p className={`text-sm font-semibold mb-1 transition-colors ${
                      selectedStage === index ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {stage.stage}
                    </p>

                    {/* 설명 */}
                    <p className="text-xs text-gray-500 text-center">
                      {stage.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모바일 타임라인 */}
          <div className="md:hidden space-y-4 mb-8">
            {timelineStages.map((stage, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedStage === index
                    ? 'bg-gradient-to-br from-blue-50 to-amber-50 border-blue-300'
                    : 'bg-white border-gray-200'
                }`}
                onClick={() => setSelectedStage(selectedStage === index ? null : index)}
              >
                <div className="text-3xl">{stage.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{stage.stage}</p>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 선택된 단계 상세 */}
          {selectedStage !== null && (
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">{timelineStages[selectedStage].icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {timelineStages[selectedStage].stage}
                  </h3>
                  <p className="text-gray-600">{timelineStages[selectedStage].description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {timelineStages[selectedStage].situations.map((situation, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">✓</span>
                    <p className="text-gray-700">{situation}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  💡 {timelineStages[selectedStage].tip}
                </p>
                <button
                  onClick={() => handleAction(timelineStages[selectedStage])}
                  className={`block w-full text-center px-6 py-4 rounded-full font-semibold text-sm transition-all ${
                    timelineStages[selectedStage].actionType === 'urgent'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : timelineStages[selectedStage].actionType === 'primary'
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {timelineStages[selectedStage].action}
                </button>
              </div>
            </div>
          )}

          {/* 초기 안내 (선택 전) */}
          {selectedStage === null && (
            <div className="text-center bg-gray-50 rounded-xl p-8">
              <p className="text-gray-700 mb-4">
                👆 위에서 지금 상황을 선택해보세요
              </p>
              <p className="text-sm text-gray-500">
                어떤 상황이든 상담은 무료예요
              </p>
            </div>
          )}
        </div>

        {/* 하단 안내 */}
        <div className="mt-12 text-center bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-6 border border-blue-100">
          <p className="text-sm text-gray-700 mb-2">
            💬 <span className="font-semibold">어떤 단계든 도와드릴 수 있어요</span>
          </p>
          <p className="text-xs text-gray-600">
            비밀 보장 · 익명 상담 가능 · 오늘 연락드려요
          </p>
        </div>
      </div>
    </section>
  );
}
