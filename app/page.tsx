'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import MobileMenu from '@/components/ui/MobileMenu';
import SmoothScroll from '@/components/SmoothScroll';
import HeroAnimation from '@/components/features/HeroAnimation';
import RealStory from '@/components/features/RealStory';
import InstaTheyoolSection from '@/components/features/InstaTheyoolSection';
import FAQExplorer from '@/components/features/FAQExplorer';
import ExpertInsights from '@/components/features/ExpertInsights';
import TestimonialEvidenceGallery from '@/components/features/TestimonialEvidenceGallery';
import ThePlanHighlight from '@/components/features/ThePlanHighlight';
import ConsultationTimingGuide from '@/components/features/ConsultationTimingGuide';
import ConsultationProcess from '@/components/features/ConsultationProcess';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import PhonePrepModal from '@/components/features/PhonePrepModal';
import TestimonialPulse from '@/components/features/TestimonialPulse';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPhonePrepModalOpen, setIsPhonePrepModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // (Removed) Venn diagram animation trigger
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LegalService',
                '@id': 'https://theyool.com/#legalservice',
                name: '법무법인 더율',
                description: '이혼 전문 법률 서비스 - 위자료, 재산분할, 양육권 전문',
                url: 'https://theyool.com',
                telephone: '1661-7633',
                priceRange: '$$',
                image: 'https://theyool.com/images/logo-horizontal.png',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'KR',
                  addressRegion: '충남',
                  addressLocality: '천안시',
                  streetAddress: '동남구 청수5로 11, 9층',
                  postalCode: '31116'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 36.8151,
                  longitude: 127.1139
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '18:00'
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  reviewCount: '1200',
                  bestRating: '5',
                  worstRating: '1'
                },
                sameAs: [
                  'https://www.instagram.com/theyool',
                  'https://blog.naver.com/theyool'
                ]
              },
              {
                '@type': 'Organization',
                '@id': 'https://theyool.com/#organization',
                name: '법무법인 더율',
                url: 'https://theyool.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://theyool.com/images/logo-horizontal.png'
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '1661-7633',
                  contactType: 'Customer Service',
                  areaServed: 'KR',
                  availableLanguage: 'Korean'
                },
                founder: {
                  '@type': 'Person',
                  name: '육심원'
                }
              },
              {
                '@type': 'WebSite',
                '@id': 'https://theyool.com/#website',
                url: 'https://theyool.com',
                name: '법무법인 더율',
                publisher: {
                  '@id': 'https://theyool.com/#organization'
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://theyool.com/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              }
            ]
          })
        }}
      />
      <SmoothScroll />

      {/* Header - SKIN1004 스타일 */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}>
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 왼쪽: 햄버거 메뉴 */}
            <div className="flex items-center">
              <MobileMenu />
            </div>

            {/* 중앙: 로고 */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="/images/logo-horizontal.png"
                  alt="법무법인 더율"
                  width={180}
                  height={45}
                  className="h-6 md:h-7 w-auto cursor-pointer"
                  style={{ filter: 'brightness(0) saturate(100%) invert(46%) sepia(13%) saturate(1243%) hue-rotate(118deg) brightness(93%) contrast(87%)' }}
                  priority
                />
              </Link>
            </div>

            {/* 오른쪽: 상담예약 텍스트 */}
            <div className="flex items-center">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="text-sm font-semibold text-sage-700 hover:text-sage-800 underline decoration-2 underline-offset-4 decoration-sage-600 transition-colors"
              >
                상담예약
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Sage Green Style */}
      <section className="hero-section relative min-h-screen flex flex-col overflow-hidden hero-parallax bg-gradient-to-b from-sage-50/30 via-white to-white">
        <HeroAnimation />

        {/* Minimal Geometric Background Pattern - Sage Green Tone */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#E8F5F2', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#D1EBE5', stopOpacity: 0.3 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#F0F9F7', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#E8F5F2', stopOpacity: 0.2 }} />
              </linearGradient>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#6DB5A4" opacity="0.15" />
              </pattern>
            </defs>

            {/* Dots Pattern */}
            <rect width="100%" height="100%" fill="url(#dots)" />

            {/* Subtle circles - Sage Green Tone */}
            <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
            <circle cx="80%" cy="70%" r="250" fill="url(#grad2)" />
            <circle cx="70%" cy="25%" r="150" fill="#E8F5F2" opacity="0.3" />
            <circle cx="30%" cy="75%" r="180" fill="#D1EBE5" opacity="0.25" />

            {/* Very subtle rectangles */}
            <rect x="50%" y="40%" width="300" height="300" fill="#E8F5F2" opacity="0.2" transform="rotate(45)" />
            <rect x="15%" y="55%" width="250" height="250" fill="#F0F9F7" opacity="0.25" transform="rotate(30)" />

            {/* Minimal lines - Sage tone */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#B3DDD4" strokeWidth="1" opacity="0.2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#B3DDD4" strokeWidth="1" opacity="0.15" />
          </svg>
        </div>

        {/* White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

        {/* Content */}
        <div className="hero-content relative z-10 flex-1 flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
          <div className="ml-0 md:ml-12 flex flex-col items-start max-w-[680px]">
            {/* Badge - Sage Green style (light background, improved padding) */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-sage-100 rounded-full mb-6 hero-text-1">
              <span className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></span>
              <span className="text-sm md:text-base font-semibold text-sage-800">
                <span className="text-sage-700 font-bold">12년</span>간 <span className="text-sage-700 font-bold">1,200건</span>의 답
              </span>
            </div>

            {/* Main Headline - Enhanced typography */}
            <h1 className="text-[44px] md:text-[56px] lg:text-[68px] font-bold mb-10 leading-[1.25] md:leading-[1.3] text-neutral-800 hero-text-2">
              복잡한 이혼,<br />
              <span className="text-sage-500">10분이면 정리돼요</span>
            </h1>

            {/* CTA Section */}
            <div className="hero-text-3 flex flex-col gap-4">
              <button
                onClick={() => setIsPhonePrepModalOpen(true)}
                className="group px-10 py-5 bg-sage-600 hover:bg-sage-700 text-white rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
                style={{
                  boxShadow: '0 8px 30px rgba(90, 153, 136, 0.35)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(90, 153, 136, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(90, 153, 136, 0.35)';
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>10분 무료 진단 받기</span>
              </button>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  비밀보장
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-sage-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  평일 저녁·주말 가능
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 프로세스 안내 섹션 */}
      <ConsultationProcess />

      {/* 신뢰 지표 섹션 - 품질 중심 */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-28 bg-gradient-to-b from-white via-sage-50/40 to-white border-y border-sage-100/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-sage-700 mb-2">연 120건</p>
              <p className="text-sm text-gray-600">한 분 한 분</p>
              <p className="text-xs text-gray-400 mt-1">정성껏 모십니다</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-sage-700 mb-2">평균 92시간</p>
              <p className="text-sm text-gray-600">한 건에 쏟는 시간</p>
              <p className="text-xs text-gray-400 mt-1">평균의 6배예요</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-sage-700 mb-2">전담 1명</p>
              <p className="text-sm text-gray-600">변호사 1명이</p>
              <p className="text-xs text-gray-400 mt-1">처음부터 끝까지</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-sage-700 mb-2">87% 성공</p>
              <p className="text-sm text-gray-600">1,200번 증명</p>
              <p className="text-xs text-gray-400 mt-1">12년 경험의 결과</p>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 타이밍 가이드 섹션 */}
      <ConsultationTimingGuide
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
        onOpenPhoneModal={() => setIsPhonePrepModalOpen(true)}
      />

      {/* THE PLAN 하이라이트 - 왜 더율인가? */}
      <ThePlanHighlight />

      {/* Real Story 섹션 - 위자료/재산분할/양육권 통합 */}
      <RealStory />

      {/* Insta더율 & YouTube 통합 섹션 - 친근감 형성 */}
      <InstaTheyoolSection />

      {/* 변호사 칼럼 섹션 */}
      <ExpertInsights />

      {/* Testimonial Pulse - 좌측 하단 후기 배지 (9초 후 표시) */}
      <TestimonialPulse />

      {/* Scroll To Top Button - 위로가기 플로팅 버튼 */}
      <ScrollToTop />

      {/* Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Phone Prep Modal */}
      <PhonePrepModal
        isOpen={isPhonePrepModalOpen}
        onClose={() => setIsPhonePrepModalOpen(false)}
      />

      {/* 기존 위자료 섹션 (백업용 - 나중에 삭제) */}
      <section id="alimony-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-amber-100/40 hero-parallax">
        <div className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs md:text-sm text-gray-500 mb-2 tracking-[0.2em] uppercase">Alimony</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">위자료</h2>
              <p className="text-sm md:text-base text-gray-400 font-light">당신의 아픔을, 제대로 보상받도록</p>
            </div>

            <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-10 text-center leading-relaxed max-w-2xl mx-auto">
              이혼 초기에 <span className="text-white font-semibold">증거의 흐름</span>을 잡는 것이 가장 중요합니다
            </p>

            <div className="md:hidden space-y-3">
              {[
                {
                  badge: 'Case 01',
                  emoji: '💰',
                  title: '위자료 5억 확보',
                  desc: '압도적인 증거와 전략으로 최고 수준 확보',
                },
                {
                  badge: 'Case 02',
                  emoji: '📋',
                  title: '2천만 원 조정',
                  desc: '제한된 증거로도 유리한 합의 도출',
                },
              ].map((item) => (
                <div
                  key={item.badge}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-amber-300">{item.badge}</span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          {/* 사례 카드 그리드 */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                  <span className="text-amber-400 font-semibold text-sm">Case 01</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">💰</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  전업주부,<br />위자료 5억 승소
                </h3>
                <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                  철저한 증거 수집과 전략으로 최고 수준의 위자료를 확보했습니다.
                  경제적 기여도와 정신적 고통을 입증하여 의미 있는 결과를 만들었습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white/10 rounded-full mb-6">
                  <span className="text-lg md:text-xl font-bold text-white">위자료 5억</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">증거 확보</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">전략 수립</span>
                  </div>
                </div>
              </div>

              <div className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                  <span className="text-amber-400 font-semibold text-sm">Case 02</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">📋</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  불륜 증거 부족,<br />2천만 원 확보
                </h3>
                <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                  제한된 증거에서도 전략적 접근으로 의미 있는 결과를 만들었습니다.
                  조정 과정에서 상대방의 약점을 파악하여 합리적 합의를 이끌어냈습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white/10 rounded-full mb-6">
                  <span className="text-lg md:text-xl font-bold text-white">2천만 원</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">전략적 접근</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">합의 도출</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 기존 재산분할 섹션 (백업용 - 나중에 삭제) */}
      <section id="property-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-white hero-parallax">
        <div className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs md:text-sm text-gray-500 mb-2 tracking-[0.2em] uppercase">Property Division</p>
              <h2 className="text-3xl md:text-5xl font-bold text-[var(--primary)] mb-2 tracking-tight">재산분할</h2>
              <p className="text-sm md:text-base text-gray-600 font-light">당신의 이혼 후의 삶을, 결정력 있게</p>
            </div>

            <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-10 text-center leading-relaxed max-w-2xl mx-auto">
              재산분할은 숫자의 문제가 아니라 <span className="text-[var(--primary)] font-semibold">전략의 문제</span>입니다
            </p>

            <div className="md:hidden space-y-3">
              {[
                {
                  badge: 'Case 01',
                  emoji: '🛡️',
                  title: '0원 방어 성공',
                  desc: '법리로 청구 차단, 의뢰인 자산 완벽 보호',
                },
                {
                  badge: 'Case 02',
                  emoji: '🔍',
                  title: '은닉 재산 발견',
                  desc: '숨겨진 재산 추적으로 공정한 분할 실현',
                },
              ].map((item) => (
                <div
                  key={item.badge}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-emerald-600">{item.badge}</span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h4 className="text-base font-semibold text-[var(--primary)] mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          {/* 사례 카드 그리드 */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="group case-card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl p-8 md:p-10 hover:border-gray-300 hover:shadow-2xl transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-emerald-500/10 rounded-full mb-6">
                  <span className="text-emerald-600 font-semibold text-sm">Case 01</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">🛡️</div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4 leading-tight">
                  재산분할<br />0원 방어 성공
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                  의뢰인의 재산을 완벽하게 보호한 방어 전략의 승리입니다.
                  상대방의 부당한 청구를 법리적으로 차단하여 재산을 지켜냈습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white rounded-full mb-6 shadow-sm">
                  <span className="text-lg md:text-xl font-bold text-[var(--primary)]">0원 방어</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-sm text-gray-600">방어 전략</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-sm text-gray-600">재산 보호</span>
                  </div>
                </div>
              </div>

              <div className="group case-card bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl p-8 md:p-10 hover:border-gray-300 hover:shadow-2xl transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-emerald-500/10 rounded-full mb-6">
                  <span className="text-emerald-600 font-semibold text-sm">Case 02</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">🔍</div>
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4 leading-tight">
                  은닉 재산 발견,<br />분할 비율 수정
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                  숨겨진 재산을 찾아내어 정당한 몫을 되찾았습니다.
                  체계적인 재산 조사와 추적으로 공정한 분할을 실현했습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white rounded-full mb-6 shadow-sm">
                  <span className="text-lg md:text-xl font-bold text-[var(--primary)]">은닉 재산 발견</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-sm text-gray-600">재산 추적</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-sm text-gray-600">비율 수정</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 기존 양육권 섹션 (백업용 - 나중에 삭제) */}
      <section id="custody-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-amber-50/40 via-orange-50/30 to-rose-50/40 hero-parallax">
        <div className="max-w-[1200px] mx-auto w-full">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-xs md:text-sm text-gray-500 mb-2 tracking-[0.2em] uppercase">Child Custody</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">양육권</h2>
              <p className="text-sm md:text-base text-gray-400 font-light">우리 아이가, 제대로 클 수 있도록</p>
            </div>

            <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-10 text-center leading-relaxed max-w-2xl mx-auto">
              아이의 <span className="text-white font-semibold">최선의 이익</span>을 위한 치밀한 준비가 결과를 만듭니다
            </p>

            <div className="md:hidden space-y-3">
              {[
                {
                  badge: 'Case 01',
                  emoji: '👶',
                  title: '단독 양육권 확보',
                  desc: '양육 환경 입증으로 안정적 선택 실현',
                },
                {
                  badge: 'Case 02',
                  emoji: '⚖️',
                  title: '양육비 100% 인용',
                  desc: '폭력 사실 입증 및 전액 양육비 확보',
                },
              ].map((item) => (
                <div
                  key={item.badge}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-amber-300">{item.badge}</span>
                    <span className="text-xl">{item.emoji}</span>
                  </div>
                  <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

          {/* 사례 카드 그리드 */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-10">
              <div className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                  <span className="text-amber-400 font-semibold text-sm">Case 01</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">👶</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  양육권 다툼,<br />단독 양육권 확보
                </h3>
                <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                  아이의 최선의 이익을 위한 치밀한 준비가 결과를 만들었습니다.
                  양육 환경과 능력을 입증하여 단독 양육권을 쟁취했습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white/10 rounded-full mb-6">
                  <span className="text-lg md:text-xl font-bold text-white">단독 양육권</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">환경 입증</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">단독 양육</span>
                  </div>
                </div>
              </div>

              <div className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-amber-500/20 rounded-full mb-6">
                  <span className="text-amber-400 font-semibold text-sm">Case 02</span>
                </div>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">⚖️</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  폭력 배우자,<br />양육비 100% 인용
                </h3>
                <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                  아이의 안전과 경제적 보호를 동시에 확보했습니다.
                  폭력 사실을 입증하고 청구한 양육비 전액을 인용받았습니다.
                </p>
                <div className="inline-flex items-center px-5 py-3 bg-white/10 rounded-full mb-6">
                  <span className="text-lg md:text-xl font-bold text-white">양육비 100%</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">안전 확보</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400">✓</span>
                    <span className="text-sm text-gray-400">양육비 확보</span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* 의뢰인 후기 섹션 - 증빙 갤러리 */}
      <TestimonialEvidenceGallery />

      {/* FAQ Explorer 섹션 */}
      <FAQExplorer />

      {/* 최종 CTA 섹션 - 희망과 새로운 시작 */}
      <section id="contact" className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/30 to-sage-100/40 hero-parallax overflow-hidden">
        {/* Calm Hope Pattern - Sage Green */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#E8F5F2', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#D1EBE5', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            {/* Gentle circles representing new beginning */}
            <circle cx="25%" cy="35%" r="200" fill="url(#hopeGrad)" />
            <circle cx="75%" cy="65%" r="220" fill="#E8F5F2" opacity="0.35" />
            <circle cx="50%" cy="50%" r="150" fill="#D1EBE5" opacity="0.25" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-[1200px] px-6 md:px-12 mx-auto text-center">
            <p className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight text-gray-900">
              오늘이 그날이에요
            </p>
            <p className="text-base md:text-xl text-gray-600 mb-4 font-light max-w-2xl mx-auto">
              하루하루가 아까워요<br />
              3개월 후엔 달라져 있어요
            </p>
            <p className="text-sm md:text-base text-gray-500 mb-10 md:mb-12 italic max-w-xl mx-auto">
              "다들 '진작 올걸' 해요"
            </p>

            {/* Mobile-First: 3가지 균형잡힌 상담 선택 */}
            <div className="max-w-4xl mx-auto mb-8">
              {/* 모바일: 3개 카드 - 아이콘 중심 균형 레이아웃 */}
              <div className="md:hidden space-y-3">
                {/* 1. 전화 상담 - Sage Dark */}
                <a
                  href="tel:1661-7633"
                  className="group block bg-sage-800 text-white rounded-2xl shadow-lg active:scale-98 transition-all hover:bg-sage-900"
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center justify-between">
                      {/* 왼쪽: 아이콘 + 텍스트 그룹 */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-lg mb-0.5">지금 바로 전화</p>
                          <p className="text-sm text-gray-300">10분 무료 상담</p>
                          <p className="text-xl font-bold mt-1.5">1661-7633</p>
                        </div>
                      </div>
                      {/* 오른쪽: 화살표 */}
                      <svg className="w-6 h-6 text-white/40 flex-shrink-0 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* 2. 영상/방문 예약 - Sage Green */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group w-full bg-sage-600 text-white rounded-2xl shadow-lg active:scale-98 transition-all"
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center justify-between">
                      {/* 왼쪽: 아이콘 + 텍스트 그룹 */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl flex-shrink-0">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg mb-0.5">영상/방문 예약</p>
                          <p className="text-sm text-sage-50">편한 시간에 자세히</p>
                          <p className="text-lg font-semibold mt-1.5">예약하기</p>
                        </div>
                      </div>
                      {/* 오른쪽: 화살표 */}
                      <svg className="w-6 h-6 text-white/60 flex-shrink-0 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* 3. 상담 가이드 - 화이트 with Sage Green 액센트 */}
                <Link
                  href="/consultation"
                  className="group block bg-white border-2 border-sage-200 rounded-2xl shadow-lg active:scale-98 transition-all hover:border-sage-400"
                >
                  <div className="px-5 py-5">
                    <div className="flex items-center justify-between">
                      {/* 왼쪽: 아이콘 + 텍스트 그룹 */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-sage-50 rounded-xl flex-shrink-0">
                          <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg text-gray-900 mb-0.5">처음이신가요?</p>
                          <p className="text-sm text-gray-600">상담 방법 자세히 보기</p>
                          <p className="text-lg font-semibold text-sage-600 mt-1.5">가이드 보기</p>
                        </div>
                      </div>
                      {/* 오른쪽: 화살표 */}
                      <svg className="w-6 h-6 text-sage-600/60 flex-shrink-0 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Desktop: 3개 그리드 유지 */}
              <div className="hidden md:grid md:grid-cols-3 gap-4">
                {/* 전화상담 */}
                <a
                  href="tel:1661-7633"
                  className="group bg-sage-800 text-white p-6 rounded-2xl hover:bg-sage-900 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg mb-2">지금 바로 전화</p>
                  <p className="text-sm text-gray-300 mb-3">10분 무료 상담</p>
                  <p className="text-xl font-bold">1661-7633</p>
                </a>

                {/* 영상/방문상담 */}
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="group bg-sage-600 text-white p-6 rounded-2xl hover:bg-sage-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg mb-2">영상/방문 예약</p>
                  <p className="text-sm text-sage-100 mb-3">편한 시간에 자세히</p>
                  <p className="text-base font-semibold">예약하기 →</p>
                </button>

                {/* 상담 가이드 */}
                <Link
                  href="/consultation"
                  className="group bg-white text-gray-900 p-6 rounded-2xl border-2 border-gray-300 hover:border-sage-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-8 h-8 text-gray-700 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="font-bold text-lg mb-2">처음이신가요?</p>
                  <p className="text-sm text-gray-600 mb-3">상담 방법 자세히 보기</p>
                  <p className="text-base font-semibold text-sage-600 group-hover:text-sage-700 transition-colors">가이드 보기 →</p>
                </Link>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sage-50 text-neutral-800 py-20 px-6 lg:px-8 border-t border-sage-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-sage-800">더율</h4>
              <p className="text-neutral-600 text-lg mb-4">이혼 전문이에요</p>
              <p className="text-neutral-600 text-sm">광고 책임 변호사 : 임은지</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-sage-800">바로 연락하세요</h4>
              <p className="text-neutral-600 mb-2">
                전화: <a href="tel:1661-7633" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">1661-7633</a>
              </p>
              <p className="text-neutral-600">
                이메일: <a href="mailto:info@theyool.com" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">info@theyool.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-sage-800">여기 있어요</h4>
              <a href="/contact" className="block text-neutral-600 text-sm mb-3 hover:text-sage-700 transition-colors">
                <span className="font-semibold text-sage-800">천안 주사무소</span><br />
                충남 천안시 동남구 청수5로 11, 9층
              </a>
              <a href="/contact" className="block text-neutral-600 text-sm hover:text-sage-700 transition-colors">
                <span className="font-semibold text-sage-800">평택 분사무소</span><br />
                경기 평택시 평남로 1029-1, 6층
              </a>
            </div>
          </div>

          <div className="border-t border-sage-200 pt-8 mb-6">
            <div className="text-neutral-600 text-sm space-y-2">
              <p>법인명 : 법무법인 더율 | 대표자 : 육심원외 1</p>
              <p>사업자번호 : 354-85-01451(평택), 514-86-01593(천안)</p>
            </div>
          </div>

          <div className="border-t border-sage-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex gap-6 text-sm flex-wrap justify-center">
                <Link href="/privacy" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  이용약관
                </Link>
                <Link href="/disclaimer" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  면책공고
                </Link>
                <Link href="/faq" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  이혼큐레이션
                </Link>
              </div>
            </div>
            <p className="text-neutral-500 text-sm text-center md:text-left">
              Copyright &copy; 2025 법무법인 더율 | Powered by 법무법인 더율
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
