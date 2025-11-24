'use client';

import { useState } from 'react';
import Link from 'next/link';
import CTABox, { CTAButton } from '@/components/ui/CTABox';

export default function FAQExplorer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 자동 확장 제거

  const faqCards = [
    {
      icon: '💬',
      question: '언제 상담을 받아야 하나요?',
      answer: '많은 분들이 \'아직은 아닌가\' 고민하시지만, 이혼을 생각하신 바로 그 순간이 상담 적기입니다. 저희가 상담한 의뢰인의 87%가 \'더 일찍 왔어야 했다\'고 말씀하십니다. 초기 상담은 법적 권리와 선택지를 명확히 아는 것부터 시작합니다. 섣부른 행동으로 불리해지기 전에, 전문가와 함께 차분히 상황을 정리하고 최선의 방향을 찾아보세요. 상담 후 결정은 언제든 본인이 하실 수 있습니다.',
      category: '상담',
      preview: '이혼을 생각하신 바로 그 순간이 상담 적기입니다. 87%가 "더 일찍 왔어야 했다"고 하세요.',
      stat: '의뢰인 87%',
    },
    {
      icon: '💰',
      question: '변호사 비용이 부담스러워요',
      answer: '비용 걱정하시는 거, 너무 당연해요. 이미 마음이 힘든데 경제적 부담까지 생각하면 더 막막하시죠. 법무법인 더율은 투명한 수임료 체계를 운영하며, 첫 상담에서 예상 비용을 명확히 안내드립니다. 실제로 의뢰인의 73%가 재산분할과 위자료를 통해 수임료 이상을 회수하셨습니다. 또한 법원 소송구조 제도, 분할 납부 등 다양한 방법을 통해 경제적 부담을 덜어드립니다. 비용 때문에 정당한 권리를 포기하지 마세요.',
      category: '수임료',
      preview: '투명한 수임료 체계로 첫 상담에서 명확히 안내드려요. 의뢰인 73%가 수임료 이상 회수하셨어요.',
      stat: '의뢰인 73%',
    },
    {
      icon: '📋',
      question: '증거가 없어도 이혼 가능한가요?',
      answer: '증거가 부족하다고 포기하기는 이릅니다. 법무법인 더율은 20년 경험을 바탕으로 숨겨진 증거를 찾아내는 노하우를 보유하고 있습니다. 통화 녹음, 문자 메시지, 신용카드 사용 내역 등 일상적인 자료도 중요한 증거가 될 수 있습니다. 실제로 \'증거가 없다\'고 오신 분들의 65%가 저희와 함께 필요한 증거를 확보하셨습니다. 혼자 판단하지 마시고, 전문가의 눈으로 상황을 재평가받아 보세요.',
      category: '증거',
      preview: '일상적인 자료도 증거가 될 수 있어요. 65%가 저희와 함께 증거를 확보하셨어요.',
      stat: '의뢰인 65%',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white">
      {/* Top Gradient Overlay - Testimonial에서 자연스러운 전환 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent pointer-events-none z-0" />

      {/* Bottom Gradient Overlay - 최종 CTA로 자연스러운 전환 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/95 to-transparent pointer-events-none z-0" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header - 개선된 공감적 문구 */}
        <div className="text-center mb-8">
          <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">
            Most Asked Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            혼자 고민하셨죠, 괜찮아요
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            1,200분의 의뢰인이 처음 궁금해하셨던 것들
          </p>
        </div>

        {/* 신뢰 배지 */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          <span className="text-sm text-gray-600">실제 상담 검증 답변</span>
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
                      ? 'bg-gradient-to-br from-sage-50 to-amber-50/30 border-sage-400 shadow-lg'
                      : 'bg-white border-gray-200 hover:border-sage-300 hover:shadow-md hover:bg-sage-50/20'
                  }`}
                >
                  <button
                    onClick={() => setSelectedIndex(isSelected ? null : index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedIndex(isSelected ? null : index);
                      }
                    }}
                    aria-expanded={isSelected}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Category Badge + 인기 표시 */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                            isSelected ? 'bg-sage-600 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {faq.category}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                              인기
                            </span>
                          )}
                        </div>

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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Answer - Inline expansion (Toss Style) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isSelected ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6">
                      {/* Clean separation line */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

                      {/* 사회적 증명 표시 */}
                      <div className="flex items-center gap-2 text-xs text-sage-600 bg-sage-50 rounded-lg px-3 py-2 mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                        </svg>
                        <span>같은 질문, {faq.stat}가 하셨어요</span>
                      </div>

                      {/* Answer with Toss-style typography */}
                      <div className="space-y-4">
                        <p className="text-[15px] md:text-base text-gray-800 leading-[1.7] font-normal tracking-[-0.01em]">
                          {faq.answer}
                        </p>
                      </div>

                      {/* Simple link to related content */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <Link
                          href={`/faq?category=${faq.category}`}
                          className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors group"
                        >
                          <span>관련 Q&A 더보기</span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
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
              Q&A 전체 보기
            </CTAButton>

            <CTAButton
              variant="secondary"
              iconPosition="left"
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
              첫 상담 시작하기
            </CTAButton>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-xs text-sage-100/70">
              100% 비밀보장 · 익명상담 가능 · 24시간 내 연락
            </p>
          </div>
        </CTABox>
      </div>
    </section>
  );
}
