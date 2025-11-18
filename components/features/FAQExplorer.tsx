'use client';

import { useState } from 'react';
import Link from 'next/link';
import CTABox, { CTAButton } from '@/components/ui/CTABox';

export default function FAQExplorer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0); // 첫 번째 FAQ 기본 선택

  const faqCards = [
    {
      icon: '💬',
      question: '언제 상담을 받아야 하나요?',
      answer: '많은 분들이 \'아직은 아닌가\' 고민하시지만, 이혼을 생각하신 바로 그 순간이 상담 적기입니다. 저희가 상담한 의뢰인의 87%가 \'더 일찍 왔어야 했다\'고 말씀하십니다. 초기 상담은 법적 권리와 선택지를 명확히 아는 것부터 시작합니다. 섣부른 행동으로 불리해지기 전에, 전문가와 함께 차분히 상황을 정리하고 최선의 방향을 찾아보세요. 상담 후 결정은 언제든 본인이 하실 수 있습니다.',
      category: '상담',
      preview: '많은 분들이 \'아직은 아닌가\' 고민하시지만, 이혼을 생각하신 바로 그 순간이 상담 적기입니다.',
      lawyer: '임은지',
    },
    {
      icon: '💰',
      question: '변호사 비용이 부담스러워요',
      answer: '수임료에 대한 부담은 당연한 걱정입니다. 법무법인 더율은 투명한 수임료 체계를 운영하며, 첫 상담에서 예상 비용을 명확히 안내드립니다. 실제로 의뢰인의 73%가 재산분할과 위자료를 통해 수임료 이상을 회수하셨습니다. 또한 법원 소송구조 제도, 분할 납부 등 다양한 방법을 통해 경제적 부담을 덜어드립니다. 비용 때문에 정당한 권리를 포기하지 마세요. 먼저 무엇을 받을 수 있는지 확인해보시기 바랍니다.',
      category: '수임료',
      preview: '수임료에 대한 부담은 당연한 걱정입니다. 법무법인 더율은 투명한 수임료 체계를 운영하며...',
      lawyer: '육심원',
    },
    {
      icon: '📋',
      question: '증거가 없어도 이혼 가능한가요?',
      answer: '증거가 부족하다고 포기하기는 이릅니다. 법무법인 더율은 20년 경험을 바탕으로 숨겨진 증거를 찾아내는 노하우를 보유하고 있습니다. 통화 녹음, 문자 메시지, 신용카드 사용 내역 등 일상적인 자료도 중요한 증거가 될 수 있습니다. 실제로 \'증거가 없다\'고 오신 분들의 65%가 저희와 함께 필요한 증거를 확보하셨습니다. 혼자 판단하지 마시고, 전문가의 눈으로 상황을 재평가받아 보세요.',
      category: '증거',
      preview: '증거가 부족하다고 포기하기는 이릅니다. 법무법인 더율은 20년 경험을 바탕으로...',
      lawyer: '임은지',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50/20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">
            Most Asked Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            다들 처음엔 이게 궁금하더라고요
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            실제 상담에서 가장 많이 받은 질문 TOP 3
          </p>
        </div>

        {/* FAQ List - Inline Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="space-y-3">
            {faqCards.map((faq, index) => {
              const isSelected = selectedIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border-2 transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-br from-blue-50 to-amber-50/30 border-blue-400 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setSelectedIndex(isSelected ? null : index)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Category Badge - Small and subtle */}
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {faq.category}
                        </span>

                        {/* Question - Most prominent */}
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {faq.question}
                        </h3>

                        {/* Preview - Only show when NOT selected */}
                        {!isSelected && (
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {faq.preview}
                          </p>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <div className={`flex-shrink-0 transition-transform duration-300 ${
                        isSelected ? 'rotate-180' : ''
                      }`}>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Answer - Inline expansion */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isSelected ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200">
                        {/* Full Answer */}
                        <p className="text-base text-gray-700 leading-relaxed mb-6">
                          {faq.answer}
                        </p>

                        {/* Verification Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">
                              {faq.lawyer} 변호사 답변
                            </span>
                          </div>

                          <Link
                            href={`/faq?category=${faq.category}`}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                          >
                            관련 Q&A 더보기 →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <CTABox
          title="아직 궁금증이 남았나요?"
          description="76개 실전 Q&A로 바로 답을 찾아보세요"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTAButton
              href="/faq"
              variant="primary"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            >
              76개 Q&A 전체 보기
            </CTAButton>

            <CTAButton
              variant="secondary"
              onClick={() => {
                const modal = document.querySelector('[data-consultation-modal]');
                if (modal) {
                  (modal as HTMLElement).click();
                }
              }}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
            >
              무료 상담 신청하기
            </CTAButton>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-gray-400">
              100% 비밀보장 · 익명상담 가능 · 24시간 내 연락
            </p>
          </div>
        </CTABox>
      </div>
    </section>
  );
}
