'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ConsultationProcess() {
  useEffect(() => {
    // Simple fade-in animation
    const element = document.querySelector('.consultation-content');
    if (element) {
      setTimeout(() => {
        element.classList.add('opacity-100', 'translate-y-0');
      }, 100);
    }
  }, []);

  return (
    <section className="relative pt-40 md:pt-48 pb-12 md:pb-14 overflow-hidden">
      {/* Background Gradient - Sage Green 톤으로 전환 */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sage-50/20 to-sage-50/30" />

      {/* Top Gradient Overlay - Hero에서 자연스러운 전환 */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />


      {/* Decorative Illustration Background - Sage Green */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6DB5A4" />
              <stop offset="100%" stopColor="#5A9988" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative max-w-[800px] mx-auto px-6 md:px-12 text-center">
        <div className="consultation-content opacity-0 translate-y-4 transition-all duration-1000">
          {/* Badge - Sage Green */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full mb-6">
            <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-sage-700">첫 상담 10분 무료</span>
          </div>

          {/* Headline - Sage Green 액센트 */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-sage-500">새로운 시작</span>, 10분이면 충분해요
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-[600px] mx-auto">
            복잡하게 생각하지 마세요.<br />
            지금 바로 시작할 수 있습니다.
          </p>

          {/* CTA Button - Sage Green */}
          <Link
            href="/consultation"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-sage-500 hover:bg-sage-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span>상담 과정 확인</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* Trust Indicators - sage-700 사용 (강조, 눈에 띄는 체크마크) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              비밀 보장
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              부담 없는 상담
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              전문가 1:1 상담
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
