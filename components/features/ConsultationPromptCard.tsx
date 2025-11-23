'use client';

import { useState } from 'react';
import ConsultationForm from './ConsultationForm';

type Tone = 'empathetic' | 'professional' | 'practical' | 'hopeful';
type Variant = 'success-story' | 'expert-content' | 'faq-helper' | 'service-page';

interface ConsultationPromptCardProps {
  variant: Variant;
  heading?: string;
  subheading?: string;
  testimonial?: {
    text: string;
    author: string;
  };
  tone?: Tone;
  className?: string;
}

const defaultContent: Record<Variant, {
  heading: string;
  subheading: string;
  tone: Tone;
  buttonText: string;
  trustPoints: string[];
}> = {
  'success-story': {
    heading: '이런 결과를 원하시나요?',
    subheading: '비슷한 상황에서 도움을 드렸습니다. 당신의 사건도 성공적으로 해결할 수 있습니다.',
    tone: 'hopeful',
    buttonText: '무료 상담으로 시작하기',
    trustPoints: ['100% 비밀보장', '30분 내 연락', '계약 압박 없음']
  },
  'expert-content': {
    heading: '전문가와 직접 상담하세요',
    subheading: '20년 경력 이혼 전문 변호사가 당신의 상황을 정확히 분석하고 최적의 해결책을 제시합니다.',
    tone: 'professional',
    buttonText: '전문 변호사 상담 신청',
    trustPoints: ['검증된 승소 전략', '1,200+ 성공 사례', '87% 승소율']
  },
  'faq-helper': {
    heading: '더 자세한 답변이 필요하신가요?',
    subheading: '일반적인 정보로는 부족합니다. 당신의 구체적인 상황에 맞는 법률 조언을 받으세요.',
    tone: 'practical',
    buttonText: '맞춤 상담 신청하기',
    trustPoints: ['10분 무료 상담', '즉시 답변', '전화/카톡 선택']
  },
  'service-page': {
    heading: '지금 바로 도움받으세요',
    subheading: '혼자 고민하지 마세요. 전문가가 함께합니다.',
    tone: 'empathetic',
    buttonText: '상담 신청',
    trustPoints: ['24시간 접수', '당일 연락', '무료 사건 분석']
  }
};

const toneStyles: Record<Tone, {
  bgGradient: string;
  accentColor: string;
  textColor: string;
}> = {
  hopeful: {
    bgGradient: 'from-pink-50 via-rose-50 to-pink-50',
    accentColor: 'text-pink-600',
    textColor: 'text-gray-800'
  },
  professional: {
    bgGradient: 'from-amber-50 via-yellow-50 to-amber-50',
    accentColor: 'text-amber-700',
    textColor: 'text-gray-900'
  },
  practical: {
    bgGradient: 'from-blue-50 via-indigo-50 to-blue-50',
    accentColor: 'text-blue-600',
    textColor: 'text-gray-800'
  },
  empathetic: {
    bgGradient: 'from-purple-50 via-pink-50 to-purple-50',
    accentColor: 'text-purple-600',
    textColor: 'text-gray-800'
  }
};

export default function ConsultationPromptCard({
  variant,
  heading,
  subheading,
  testimonial,
  tone,
  className = ''
}: ConsultationPromptCardProps) {
  const [showModal, setShowModal] = useState(false);

  const content = defaultContent[variant];
  const selectedTone = tone || content.tone;
  const styles = toneStyles[selectedTone];

  return (
    <>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${styles.bgGradient} border border-gray-200 shadow-lg ${className}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative px-6 py-8 sm:px-8 sm:py-10">
          <div className="max-w-3xl mx-auto">
            {/* Heading */}
            <h3 className={`text-2xl sm:text-3xl font-bold ${styles.accentColor} mb-3`}>
              {heading || content.heading}
            </h3>

            {/* Subheading */}
            <p className={`text-base sm:text-lg ${styles.textColor} mb-6 leading-relaxed`}>
              {subheading || content.subheading}
            </p>

            {/* Testimonial (optional) */}
            {testimonial && (
              <div className="bg-white/60 backdrop-blur-sm rounded-xl px-5 py-4 mb-6 border border-gray-200/50">
                <p className="text-sm sm:text-base text-gray-700 italic mb-2">
                  "{testimonial.text}"
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  - {testimonial.author}
                </p>
              </div>
            )}

            {/* Trust Points */}
            <div className="flex flex-wrap gap-3 mb-6">
              {content.trustPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50"
                >
                  <svg className={`w-4 h-4 ${styles.accentColor}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowModal(true)}
                className={`
                  flex-1 px-8 py-4 rounded-xl font-bold text-lg
                  bg-gradient-to-r ${
                    selectedTone === 'hopeful' ? 'from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' :
                    selectedTone === 'professional' ? 'from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600' :
                    selectedTone === 'practical' ? 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' :
                    'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  }
                  text-white shadow-lg hover:shadow-xl
                  transform hover:scale-105 transition-all duration-200
                  flex items-center justify-center gap-2
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {content.buttonText}
              </button>

              <a
                href="tel:1661-7633"
                className={`
                  px-6 py-4 rounded-xl font-semibold text-base
                  bg-white hover:bg-gray-50
                  ${styles.accentColor}
                  border-2 ${
                    selectedTone === 'hopeful' ? 'border-pink-300 hover:border-pink-400' :
                    selectedTone === 'professional' ? 'border-amber-300 hover:border-amber-400' :
                    selectedTone === 'practical' ? 'border-blue-300 hover:border-blue-400' :
                    'border-purple-300 hover:border-purple-400'
                  }
                  shadow-md hover:shadow-lg
                  transform hover:scale-105 transition-all duration-200
                  flex items-center justify-center gap-2
                  whitespace-nowrap
                `}
              >
                📞 1661-7633
              </a>
            </div>

            {/* Small print */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              평일 09:00-18:00 | 주말/공휴일 예약 상담 | 전화/카카오톡/방문 상담 가능
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {showModal && (
        <ConsultationForm onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
