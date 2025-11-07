'use client';

import { ServiceData } from '@/types/service';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';
import { useState } from 'react';

interface ServicePageTemplateProps {
  data: ServiceData;
}

export default function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <div className="text-7xl mb-8">{data.icon}</div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              {data.title}
            </h1>
            <p className="text-2xl md:text-3xl mb-6 font-medium">
              {data.subtitle}
            </p>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {data.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              왜 더율인가?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {data.keyPoints.map((point, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center p-8 card-hover">
                  <div className="text-6xl mb-6">{point.icon}</div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                    {point.title}
                  </h3>
                  <p className="text-base text-[var(--gray-700)] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases Highlight */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              성공사례
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {data.caseHighlight.map((caseItem, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="card-glass p-10">
                  <div className="text-6xl mb-6 text-center">{caseItem.icon}</div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4 text-center">
                    {caseItem.title}
                  </h3>
                  <div className="text-center mb-6">
                    <span className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] font-bold px-6 py-3 rounded-full text-lg">
                      {caseItem.result}
                    </span>
                  </div>
                  <p className="text-base text-[var(--gray-700)] leading-relaxed text-center">
                    {caseItem.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              진행 프로세스
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {data.process.map((step, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="card-glass p-8 md:p-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base text-[var(--gray-700)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              자주 묻는 질문
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {data.faq.map((faqItem, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="border border-[var(--gray-200)] rounded-2xl overflow-hidden transition-all hover:shadow-toss-lg">
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 md:px-8 py-6 flex items-start justify-between gap-4 text-left bg-white hover:bg-[var(--gray-50)] transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                        Q
                      </span>
                      <span className="text-base md:text-lg font-semibold text-[var(--gray-900)]">
                        {faqItem.question}
                      </span>
                    </div>
                    <svg
                      className={`flex-shrink-0 w-5 h-5 text-[var(--gray-400)] transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 md:px-8 pb-6 bg-[var(--gray-50)]">
                      <div className="flex items-start gap-4 pt-4 border-t border-[var(--gray-200)]">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold text-sm">
                          A
                        </span>
                        <p className="text-base text-[var(--gray-700)] leading-relaxed pt-0.5">
                          {faqItem.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              지금 바로 전문 상담을<br />
              받아보세요
            </h2>
            <p className="text-xl mb-12 opacity-90">
              30분 무료 상담으로 당신의 사건을 분석해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:02-1234-5678"
                className="inline-block bg-white text-[var(--primary)] font-bold px-10 py-5 rounded-full text-lg hover:bg-[var(--gray-100)] transition-all hover-lift shadow-toss-xl"
              >
                📞 전화 상담하기
              </a>
              <ConsultationButton
                variant="secondary"
                size="lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
