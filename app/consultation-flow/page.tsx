'use client';

import { useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';

export default function ConsultationFlowPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: '무료 법률 진단',
      duration: '30분',
      description: '현재 상황의 법적 쟁점을 파악하고 긴급 대응이 필요한 리스크를 체크합니다.',
      details: [
        '이혼 사유 검토 및 유책성 판단 (민법 제840조)',
        '즉시 대응 필요한 리스크 확인 (재산은닉, 자녀탈취)',
        '보유 증거 1차 평가 및 증거능력 검토',
        '완전한 비밀보장 - 100% 익명 상담 가능',
      ],
      icon: '⚖️',
      color: 'purple',
      emotional: '막막했던 상황이 법적으로 명확해집니다. 무엇을 해야 할지 보입니다.',
    },
    {
      number: '02',
      title: '증거 전략 수립',
      duration: '20분',
      description: '보유 증거를 평가하고 추가 확보 방안을 설계합니다.',
      details: [
        '현재 증거의 법적 효력 및 증명력 평가',
        '추가 확보 가능한 증거 유형 안내 (통신, 금융, 영상)',
        '상대방 예상 반박과 대응 시나리오',
        '증거 수집 시 법적 한계와 주의사항',
      ],
      icon: '🔍',
      color: 'blue',
      emotional: '단순한 감정이 아닌, 법정에서 인정받을 수 있는 증거로 준비합니다.',
    },
    {
      number: '03',
      title: '맞춤 솔루션 설계',
      duration: '40분',
      description: '3가지 시나리오별 전략을 제시하고 예상 결과를 구체화합니다.',
      details: [
        '협의이혼 vs 조정이혼 vs 재판이혼 비교 분석',
        'Best/Normal/Worst 시나리오별 예상 결과',
        '단계별 절차 로드맵과 예상 소요 기간',
        '각 시나리오별 비용 및 리스크 투명 공개',
      ],
      icon: '🎯',
      color: 'indigo',
      emotional: '최선과 차선의 계획을 모두 준비하니, 더 이상 불안하지 않습니다.',
    },
    {
      number: '04',
      title: '비용 안내',
      duration: '15분',
      description: '투명하게, 숨김없이 모든 비용을 설명합니다.',
      details: [
        '착수금, 성공보수, 실비 등 상세 안내',
        '분할 납부 및 할인 가능 여부 상담',
        '법률구조공단 지원 대상 확인',
        '예산에 맞는 최선의 방법 제안',
      ],
      icon: '💰',
      color: 'green',
      emotional: '경제적 부담도 함께 나눕니다. 당신이 감당할 수 있는 범위 안에서.',
    },
    {
      number: '05',
      title: '계획 제안',
      duration: '20분',
      description: '구체적인 실행 계획을 문서로 드립니다.',
      details: [
        '단계별 실행 계획서 제공 (무료)',
        '필요한 서류와 증거 체크리스트',
        '예상 일정과 중요 시점 안내',
        '변호사 선임 여부는 자유롭게 결정',
      ],
      icon: '📋',
      color: 'amber',
      emotional: '의뢰하지 않아도 괜찮습니다. 계획서는 무료로 드립니다.',
    },
    {
      number: '06',
      title: '수임 결정',
      duration: '충분히',
      description: '결정은 당신이 합니다. 급하지 않습니다.',
      details: [
        '상담 후 충분히 고민하세요 (압박 없음)',
        '다른 법무법인과 비교해도 됩니다',
        '결정하시면 계약서 작성 및 착수',
        '전담 변호사 배정 및 연락 시스템 구축',
      ],
      icon: '🤝',
      color: 'pink',
      emotional: '압박하지 않습니다. 당신이 준비되었을 때, 함께하겠습니다.',
    },
    {
      number: '07',
      title: '함께 걷기',
      duration: '끝까지',
      description: '이제부터 혼자가 아닙니다. 끝까지 함께합니다.',
      details: [
        '전담 변호사 1:1 케어 (담당 변경 없음)',
        '24시간 긴급 연락 가능 (카톡/전화)',
        '주요 결정 전 반드시 사전 상담',
        '이혼 후 삶까지 함께 준비합니다',
      ],
      icon: '🌟',
      color: 'purple',
      emotional: '새로운 시작까지, 더율이 함께 걷겠습니다.',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: {
        bg: 'from-purple-50 to-white',
        border: 'border-purple-200 hover:border-purple-300',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-600',
      },
      blue: {
        bg: 'from-blue-50 to-white',
        border: 'border-blue-200 hover:border-blue-300',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-600',
      },
      indigo: {
        bg: 'from-indigo-50 to-white',
        border: 'border-indigo-200 hover:border-indigo-300',
        text: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-600',
      },
      green: {
        bg: 'from-green-50 to-white',
        border: 'border-green-200 hover:border-green-300',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-600',
      },
      amber: {
        bg: 'from-amber-50 to-white',
        border: 'border-amber-200 hover:border-amber-300',
        text: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-600',
      },
      pink: {
        bg: 'from-pink-50 to-white',
        border: 'border-pink-200 hover:border-pink-300',
        text: 'text-pink-600',
        badge: 'bg-pink-100 text-pink-600',
      },
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/10 to-white py-20">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="text-center">
            <p className="text-xs md:text-sm text-purple-600/70 mb-3 tracking-[0.2em] uppercase">
              Consultation Flow
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              상담의 흐름
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              더율의 상담은 다릅니다.<br />
              법률보다 <span className="font-semibold text-gray-900">당신의 마음</span>을 먼저 듣습니다.
            </p>
          </div>
        </section>

        {/* Timeline Navigation */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12">
          <div className="flex justify-center overflow-x-auto pb-4">
            <div className="flex gap-2 md:gap-4">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeStep === index
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {step.number}. {step.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Active Step Detail */}
        <section className="max-w-[900px] mx-auto px-6 md:px-12 mb-16">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeStep === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute invisible'
                }`}
              >
                <div className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 md:p-12 border-2 ${colors.border} shadow-xl`}>
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-6xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-bold ${colors.text}`}>{step.number}</span>
                        <span className={`px-3 py-1 ${colors.badge} text-xs font-semibold rounded-full`}>
                          {step.duration}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h2>
                      <p className="text-lg text-gray-700 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6">
                    <ul className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className={`${colors.text} mt-1`}>✓</span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Emotional Message */}
                  <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 text-center">
                    <p className="text-white text-sm md:text-base font-light italic">
                      "{step.emotional}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Navigation Buttons */}
        <section className="max-w-[900px] mx-auto px-6 md:px-12 mb-16">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← 이전 단계
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-6 py-3 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음 단계 →
            </button>
          </div>
        </section>

        {/* Privacy & Features */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">100% 비밀보장</h3>
              <p className="text-sm text-gray-600">
                상담 내용은 절대 외부에 유출되지 않습니다. 익명 상담도 가능합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-4">🆓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">첫 상담 무료</h3>
              <p className="text-sm text-gray-600">
                초회 상담 비용은 없습니다. 계획서도 무료로 제공합니다.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">압박 없음</h3>
              <p className="text-sm text-gray-600">
                의뢰를 강요하지 않습니다. 충분히 고민하고 결정하세요.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금 상담 시작하기
            </h2>
            <p className="text-lg mb-8 opacity-90">
              혼자 고민하지 마세요. 오늘 안에 해결책을 찾아드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:1661-7633"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 상담 (1661-7633)
              </Link>
              <a
                href="http://pf.kakao.com/_xdKxhcG/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-400 text-amber-900 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C6.486 3 2 6.596 2 11c0 2.52 1.438 4.75 3.64 6.27-.216.78-.778 2.842-.893 3.306-.135.54.194.533.395.395.145-.1 2.37-1.617 3.35-2.276C9.543 18.897 10.748 19 12 19c5.514 0 10-3.596 10-8s-4.486-8-10-8z"/>
                </svg>
                카카오톡 상담
              </a>
            </div>
            <p className="text-sm mt-6 opacity-75">
              평일 09:00-18:00 · 주말/공휴일 예약 상담
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
