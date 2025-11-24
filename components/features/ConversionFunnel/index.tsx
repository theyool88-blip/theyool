'use client';

import { useEffect, useRef } from 'react';
import FunnelCard from './FunnelCard';
import { funnelItems } from './funnelConfig';
import { ConversionFunnelProps } from './types';

/**
 * ConversionFunnel Component
 * 법무법인 더율 전환 퍼널 - 8개 항목
 *
 * @example
 * <ConversionFunnel
 *   title="상담 전 먼저 확인해보세요"
 *   subtitle="더율이 준비한 맞춤 가이드"
 * />
 */
export default function ConversionFunnel({
  title = '상담 전 먼저 확인해보세요',
  subtitle = '더율이 준비한 맞춤 가이드',
  className = '',
  excludeItems = [],
  colorScheme = 'sage',
  onOpenConsultationModal
}: ConversionFunnelProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.scroll-reveal');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 80);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white via-sage-50/30 to-white ${className}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light">
            {subtitle}
          </p>
        </div>

        {/* Funnel List */}
        <div className="max-w-[640px] mx-auto">
          {funnelItems
            .filter(item => !excludeItems.includes(item.id))
            .map((item, index) => (
              <FunnelCard
                key={item.id}
                item={item}
                index={index}
                colorScheme={colorScheme}
                onModalOpen={onOpenConsultationModal}
              />
            ))}
        </div>

        {/* Bottom CTA - 추가 안내 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-6">
            궁금한 점이 있으신가요? 언제든 편하게 연락주세요
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:1661-7633"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 4px 14px rgba(90, 153, 136, 0.3)'
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1661-7633</span>
            </a>

            <a
              href="/consultation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-sage-600 rounded-full font-semibold text-sm transition-all duration-300"
            >
              <span>상담 가이드 전체보기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
