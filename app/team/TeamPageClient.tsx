'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import { FAQ } from '@/lib/supabase/faq';

// 변호사 정보 타입
interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  education: string[];
  currentPositions: string[];
  previousPositions: string[];
  image?: string;
  certificates?: string[];
  isRepresentative?: boolean;
  experience?: string;
  motto?: string;
}

interface TeamPageClientProps {
  lawyer: LawyerProfile;
  faqs: FAQ[];
}

export default function TeamPageClient({ lawyer }: TeamPageClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  // 위촉장 자동 캐러셀 (5초마다)
  useEffect(() => {
    if (!lawyer.certificates || lawyer.certificates.length === 0) return;

    const interval = setInterval(() => {
      setCurrentCertIndex((prev) => (prev + 1) % lawyer.certificates!.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [lawyer.certificates]);

  return (
    <>
      {/* Hero Section - 임은지 변호사 소개 */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-sage-50/30 via-white to-white pt-16">
        {/* Sage Green Geometric Pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#6DB5A4" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
            <circle cx="20%" cy="30%" r="200" fill="#E8F5F2" opacity="0.4" />
            <circle cx="80%" cy="70%" r="250" fill="#D1EBE5" opacity="0.3" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* 왼쪽: 대형 사진 with decorative frame */}
            <ScrollReveal>
              <div className="relative group">
                {/* Decorative background element */}
                <div className="absolute -inset-4 bg-gradient-to-br from-sage-200/40 to-sage-300/30 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

                {/* Main photo */}
                <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={lawyer.image || '/images/profile-lawyer-new.jpg'}
                    alt={`${lawyer.name} 변호사`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/60 via-sage-900/20 to-transparent"></div>

                  {/* Floating badge on photo */}
                  <div className="absolute bottom-8 left-8 inline-flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                    <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-lg font-bold text-gray-900">변호사 경력 13년</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 오른쪽: 소개 */}
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-5 py-3 bg-sage-100 rounded-full">
                  <span className="w-2.5 h-2.5 bg-sage-600 rounded-full animate-pulse"></span>
                  <span className="text-base font-bold text-sage-800">이혼전문변호사 | 13년 경력</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900">
                  {lawyer.name}{' '}
                  <span className="block text-sage-700 mt-2">{lawyer.title}</span>
                </h1>

                <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-light">
                  {lawyer.motto}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="group w-full md:w-auto px-12 py-5 bg-sage-600 text-white font-bold text-lg rounded-full hover:bg-sage-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <span>무료 상담 신청</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Personal Motto - Emotional Connection */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-sage-50/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="relative bg-white rounded-3xl p-10 md:p-16 shadow-xl border-l-4 border-sage-600">
              <div className="absolute top-8 left-10 text-sage-200 text-7xl font-serif leading-none">"</div>
              <blockquote className="relative z-10 text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed text-center italic">
                {lawyer.motto}
              </blockquote>
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-sage-50 rounded-full">
                  <div className="w-2 h-2 bg-sage-600 rounded-full"></div>
                  <span className="text-sm font-semibold text-sage-800">
                    {lawyer.name} 변호사의 약속
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 약력 섹션 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                약력
              </h2>
              <div className="h-1 w-24 bg-sage-600 mx-auto"></div>
            </div>
          </ScrollReveal>

          {/* 통합된 약력 박스 */}
          <ScrollReveal delay={100}>
            <div className="bg-gradient-to-br from-sage-50/60 via-white to-sage-50/40 rounded-3xl p-12 md:p-16 border border-sage-200/60 shadow-xl">
              <div className="grid md:grid-cols-2 gap-12">
                {/* 전문 분야 */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 md:mb-8 flex items-center gap-3">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    전문 분야
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    {lawyer.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 bg-sage-600 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-lg md:text-xl">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 학력 */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 md:mb-8 flex items-center gap-3">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    학력
                  </h3>
                  <div className="space-y-4 md:space-y-5">
                    {lawyer.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2.5 h-2.5 bg-sage-600 rounded-full mt-2"></div>
                        <span className="text-gray-700 text-lg md:text-xl">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 현직 */}
                <div className="md:col-span-2 pt-6 border-t border-sage-200/60">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 md:mb-8 flex items-center gap-3">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    현직
                  </h3>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    {lawyer.currentPositions.map((position, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-sage-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-base md:text-lg">{position}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 주요 경력 */}
                {lawyer.previousPositions.length > 0 && (
                  <div className="md:col-span-2 pt-6 border-t border-sage-200/60">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 md:mb-8 flex items-center gap-3">
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      주요 경력
                    </h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                      {lawyer.previousPositions.map((position, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-sage-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600 text-base md:text-lg">{position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 위촉장 및 인증서 - Premium Gallery Style */}
      {lawyer.certificates && lawyer.certificates.length > 0 && (
        <section className="py-20 md:py-32 bg-gradient-to-b from-white via-sage-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-sage-100 rounded-full mb-6">
                  <svg className="w-5 h-5 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sage-800 font-semibold text-base">공식 인증 및 위촉</span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                  전문성을 인정받은<br className="md:hidden" /> 자격과 위촉
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  다양한 공공기관과 법률 단체로부터 받은 공식 위촉장과 인증서입니다
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="relative">
                {/* Enhanced Carousel Container with better spacing */}
                <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-sage-50/40 to-white p-8">
                  <div
                    className="flex transition-transform duration-700 ease-out gap-6"
                    style={{
                      transform: `translateX(-${currentCertIndex * (100 / 3)}%)`,
                    }}
                  >
                    {lawyer.certificates.map((cert, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 px-2"
                        style={{ width: 'calc(33.333% - 16px)' }}
                      >
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-sage-100">
                          <Image
                            src={`https://theyool-divorce.com/wp-content/uploads/2025/02/${cert}-212x300.jpg`}
                            alt={`${cert} 인증서`}
                            fill
                            className="object-contain p-4"
                          />

                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-sage-900/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Refined Indicators */}
                <div className="flex justify-center gap-3 mt-10">
                  {lawyer.certificates.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentCertIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentCertIndex
                          ? 'w-10 bg-sage-600 shadow-lg'
                          : 'w-2.5 bg-sage-200 hover:bg-sage-400 hover:w-4'
                      }`}
                      aria-label={`인증서 ${idx + 1}로 이동`}
                    />
                  ))}
                </div>

                {/* Premium Navigation Buttons */}
                <button
                  onClick={() => setCurrentCertIndex((prev) => (prev - 1 + lawyer.certificates!.length) % lawyer.certificates!.length)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-sage-700 hover:bg-sage-50 hover:scale-110 transition-all duration-300 border border-sage-100"
                  aria-label="이전 인증서"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentCertIndex((prev) => (prev + 1) % lawyer.certificates!.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-sage-700 hover:bg-sage-50 hover:scale-110 transition-all duration-300 border border-sage-100"
                  aria-label="다음 인증서"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-sage-600 to-sage-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <circle cx="20%" cy="30%" r="200" fill="white" opacity="0.3" />
            <circle cx="80%" cy="70%" r="250" fill="white" opacity="0.2" />
          </svg>
        </div>
        <div className="max-w-[1200px] px-6 md:px-12 mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                이혼 전문 변호사와 함께<br />
                <span className="text-sage-100">새로운 시작을 준비하세요</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
                13년 이상의 경험과 전문성을 바탕으로<br />
                최적의 해결책을 제시합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group inline-flex items-center gap-2 px-10 py-5 bg-white text-sage-700 font-bold rounded-full hover:bg-sage-50 transition-all duration-300 shadow-2xl hover:scale-105 text-base md:text-lg"
                >
                  <span>무료 상담 신청</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="tel:1661-7633"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-base md:text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  전화 상담: 1661-7633
                </a>
              </div>

              <p className="mt-8 text-sm text-white/70">
                평일 09:00-18:00 상담 가능 | 야간/주말 예약 상담 가능
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 상담 예약 모달 */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
