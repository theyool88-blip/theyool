'use client';

import { useState, useEffect } from 'react';

interface ConsultationProcessProps {
  onOpenModal?: () => void;
}

export default function ConsultationProcess({ onOpenModal }: ConsultationProcessProps) {
  const [selectedType, setSelectedType] = useState<'phone' | 'video' | 'visit' | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.consultation-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const consultationTypes = [
    {
      id: 'phone' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      badge: '무료 10분',
      title: '전화상담',
      description: '지금 바로 이야기해 보세요',
      features: [
        '10분 무료 법률 상담',
        '즉시 연결 가능',
        '익명으로 편하게',
      ],
      recommended: '급하게 방향 잡고 싶을 때',
      color: 'blue',
      action: 'tel:1661-7633',
      actionText: '1661-7633',
    },
    {
      id: 'video' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      badge: '편리함',
      title: '영상상담',
      description: '얼굴 보며 자세히 상담해요',
      features: [
        '변호사와 1:1 화상 미팅',
        '자료 화면 공유 가능',
        '집에서 편하게',
      ],
      recommended: '다른 곳에서 상담받은 분',
      color: 'green',
      action: 'modal',
      actionText: '영상상담 신청',
    },
    {
      id: 'visit' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      badge: '추천',
      title: '방문상담',
      description: '직접 만나 깊이 있게 이야기해요',
      features: [
        '전담 변호사와 대면 상담',
        '서류 함께 검토',
        '비밀 보장',
      ],
      recommended: '계약 결정하기 전 분',
      color: 'purple',
      action: 'modal',
      actionText: '방문상담 예약',
    },
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      blue: {
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        border: isSelected ? 'border-blue-500' : 'border-gray-200',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
      },
      green: {
        bg: isSelected ? 'bg-green-50' : 'bg-white',
        border: isSelected ? 'border-green-500' : 'border-gray-200',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
        button: 'bg-green-600 hover:bg-green-700 text-white',
      },
      purple: {
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        border: isSelected ? 'border-purple-500' : 'border-gray-200',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
      },
    };
    return colors[color as keyof typeof colors];
  };

  const handleAction = (action: string) => {
    if (action === 'modal' && onOpenModal) {
      onOpenModal();
    } else if (action.startsWith('tel:')) {
      window.location.href = action;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 consultation-reveal opacity-0">
          <div className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-4 tracking-wide">
            CONSULTATION GUIDE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            어떻게 시작하면 될까요?
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            상황에 맞는 방법을 골라보세요. 편한 게 제일 좋아요
          </p>
        </div>

        {/* Consultation Type Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {consultationTypes.map((type) => {
            const isSelected = selectedType === type.id;
            const colorClasses = getColorClasses(type.color, isSelected);

            return (
              <div
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`consultation-reveal opacity-0 relative ${colorClasses.bg} border-2 ${colorClasses.border} rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 hover:shadow-xl group`}
                style={{ animationDelay: `${0.2 * (consultationTypes.indexOf(type))}s` }}
              >
                {/* Badge */}
                <div className={`inline-block px-3 py-1 ${colorClasses.badge} rounded-full text-xs font-semibold mb-4`}>
                  {type.badge}
                </div>

                {/* Icon */}
                <div className={`${colorClasses.text} mb-4 group-hover:scale-110 transition-transform`}>
                  {type.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {type.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6">
                  {type.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`${colorClasses.text} flex-shrink-0 mt-0.5`}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Recommended */}
                <div className="mb-6 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">이런 분께 추천</p>
                  <p className="text-sm font-medium text-gray-700">{type.recommended}</p>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(type.action);
                  }}
                  className={`w-full py-3 ${colorClasses.button} rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg`}
                >
                  {type.actionText}
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust Message */}
        <div className="consultation-reveal opacity-0 text-center bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-200">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              처음엔 다들 걱정하세요
            </h3>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              "이런 것도 물어봐도 되나요?" "비용은 얼마나 할까요?"<br />
              다 궁금하신 거 맞아요. 그래서 처음 10분은 무료로 드려요
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
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
          </div>
        </div>
      </div>
    </section>
  );
}
