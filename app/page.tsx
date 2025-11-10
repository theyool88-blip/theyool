'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConsultationButton from '@/components/features/ConsultationButton';
import MobileMenu from '@/components/ui/MobileMenu';
import SmoothScroll from '@/components/SmoothScroll';
import HeroAnimation from '@/components/features/HeroAnimation';
import ServicesModule from '@/components/features/ServicesModule';
import Modal from '@/components/ui/Modal';
import ConsultationForm from '@/components/features/ConsultationForm';
import RealStory from '@/components/features/RealStory';
import YouTubeSection from '@/components/features/YouTubeSection';
import SectionReveal from '@/components/effects/SectionReveal';

export default function Home() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <SmoothScroll />
      {/* Header - SKIN1004 스타일 */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm">
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
                  className="h-6 md:h-7 w-auto cursor-pointer brightness-0"
                  priority
                />
              </Link>
            </div>

            {/* 오른쪽: 상담예약 텍스트 */}
            <div className="flex items-center">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="text-sm font-normal text-black hover:text-gray-600 transition-colors"
              >
                상담예약
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - SKIN1004 스타일 with Animation */}
      <section className="hero-section relative min-h-screen flex flex-col overflow-hidden hero-parallax bg-white">
        <HeroAnimation />

        {/* Minimal Geometric Background Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f0f0f0', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#e8e8e8', stopOpacity: 0.6 }} />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f5f5f5', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#ececec', stopOpacity: 0.5 }} />
              </linearGradient>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
              </pattern>
            </defs>

            {/* Dots Pattern */}
            <rect width="100%" height="100%" fill="url(#dots)" />

            {/* Subtle circles */}
            <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
            <circle cx="80%" cy="70%" r="250" fill="url(#grad2)" />
            <circle cx="70%" cy="25%" r="150" fill="#f5f5f5" opacity="0.5" />
            <circle cx="30%" cy="75%" r="180" fill="#efefef" opacity="0.5" />

            {/* Very subtle rectangles */}
            <rect x="50%" y="40%" width="300" height="300" fill="#f0f0f0" opacity="0.3" transform="rotate(45 65 55)" />
            <rect x="15%" y="55%" width="250" height="250" fill="#f5f5f5" opacity="0.35" transform="rotate(30 27 67)" />

            {/* Minimal lines */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e0e0e0" strokeWidth="1" opacity="0.4" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
          </svg>
        </div>

        {/* White Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

        {/* Content */}
        <div className="hero-content relative z-10 flex-1 flex flex-col justify-end pb-28 md:pb-36 px-6 md:px-12 max-w-[1200px] mx-auto w-full">
          <div className="ml-0 md:ml-12 flex flex-col items-start">
            {/* Subtitle */}
            <p className="text-base md:text-xl text-gray-900 mb-6 md:mb-8 tracking-wide font-normal hero-text-1">
              한결같이, 한 분야에.
            </p>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 leading-[1.1] text-gray-900 tracking-tight hero-text-2">
              이혼에 집중합니다.
            </h1>

            {/* CTA Buttons */}
            <div className="hero-text-3">
              <button className="px-6 py-2.5 md:px-8 md:py-3 bg-transparent border border-gray-900 text-gray-900 rounded-full font-normal text-xs md:text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
                상담문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Talk 버튼 (오른쪽 하단 고정 + 플로팅) - 전역 */}
      <div className="fixed bottom-8 right-4 z-50 animate-float">
        <button
          onClick={() => setIsTalkModalOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full text-white font-medium shadow-2xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center border-[0.5px] border-white"
        >
          <span className="text-xs md:text-sm">Talk</span>
        </button>
      </div>

      {/* Talk 모달 */}
      <Modal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)} maxWidth="lg">
        <ConsultationForm onCancel={() => setIsTalkModalOpen(false)} />
      </Modal>

      {/* 전문성 강조 섹션 - 검정 기하학 배경 */}
      <section id="about" className="relative min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-black overflow-hidden hero-parallax">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="darkGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#2a2a2a', stopOpacity: 0.8 }} />
              </linearGradient>
              <pattern id="darkGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* Grid Pattern */}
            <rect width="100%" height="100%" fill="url(#darkGrid)" />

            {/* Geometric shapes */}
            <circle cx="15%" cy="20%" r="250" fill="url(#darkGrad1)" />
            <circle cx="85%" cy="80%" r="200" fill="#1a1a1a" opacity="0.6" />
            <rect x="60%" y="30%" width="350" height="350" fill="#2a2a2a" opacity="0.4" transform="rotate(45 72 48)" />
            <rect x="10%" y="60%" width="280" height="280" fill="#222" opacity="0.5" transform="rotate(30 24 74)" />

            {/* Lines */}
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#333" strokeWidth="2" opacity="0.3" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#333" strokeWidth="2" opacity="0.3" />
          </svg>
        </div>

        <SectionReveal>
          <div className="relative z-10 max-w-[1040px] w-full px-6 md:px-12 mx-auto">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-400 mb-3 tracking-[0.2em] uppercase">Expertise</p>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-white tracking-tight">
                오직 이혼, 단 하나의 분야
              </h3>
              <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-10 font-light max-w-2xl mx-auto leading-relaxed">
                형사도, 민사도 하지 않습니다.<br />
                <span className="font-semibold text-white">이혼과 상간 사건</span>만을 연구합니다.
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mx-auto">
                한 사건, 한 인생.<br />
                더율은 <span className="font-bold text-white">'이혼 이후의 삶'</span>을 설계합니다.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* 더 플랜 섹션 - 하얀 배경 */}
      <section id="plan" className="min-h-screen flex items-center py-16 md:py-32 bg-white hero-parallax">
        <SectionReveal>
          <div className="max-w-[1200px] w-full px-6 md:px-12 mx-auto">
              <div className="text-center mb-12 md:mb-20">
              <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Strategy</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                더 플랜 <span className="text-gray-500 font-light">(The Plan)</span>
              </h2>
              <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto">
                단순한 승소가 아닌,<br />
                <span className="text-gray-900 font-semibold">이후의 삶</span>까지 설계하는 3단계 전략
              </p>
            </div>

            {/* Mobile condensed timeline */}
            <div className="md:hidden space-y-3">
              {[
                {
                  step: '01',
                  title: '초기 증거 확보',
                  desc: '증거 흐름 선점 및 자료 보전',
                },
                {
                  step: '02',
                  title: '전략 설계',
                  desc: '맞춤 전략 및 소송 시나리오 설계',
                },
                {
                  step: '03',
                  title: '승소 후 설계',
                  desc: '이후의 삶까지 고려한 결과 완성',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex gap-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{item.step}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold mb-1 text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3단계 타임라인 */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
              <div className="plan-card group relative bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 hover:bg-gray-100 hover:border-gray-300 transition-all duration-500">
                {/* 숫자 배지 */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">1</span>
                </div>

                <div className="mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">초기 증거 확보</h3>
                  <p className="text-gray-700 leading-relaxed">
                    이혼 초기에 <span className="text-gray-900 font-semibold">증거의 흐름</span>을 잡는 것이 가장 중요합니다.
                    체계적인 증거 수집과 보전으로 유리한 고지를 선점합니다.
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  증거 수집 · 법률 분석 · 전략 방향 설정
                </div>
              </div>

            {/* Step 2 */}
              <div className="plan-card group relative bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 hover:bg-gray-100 hover:border-gray-300 transition-all duration-500">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">2</span>
                </div>

                <div className="mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">맞춤 전략 수립</h3>
                  <p className="text-gray-700 leading-relaxed">
                    의뢰인의 상황에 최적화된 <span className="text-gray-900 font-semibold">승소 전략</span>을 설계합니다.
                    위자료, 재산분할, 양육권을 종합적으로 고려한 전략을 수립합니다.
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  전략 수립 · 협상 준비 · 소송 대응
                </div>
              </div>

            {/* Step 3 */}
              <div className="plan-card group relative bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 hover:bg-gray-100 hover:border-gray-300 transition-all duration-500">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">3</span>
                </div>

                <div className="mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">승소 후 설계</h3>
                  <p className="text-gray-700 leading-relaxed">
                    승소는 시작입니다. <span className="text-gray-900 font-semibold">이후의 삶</span>을 고려한 최적의 결과를 만들어냅니다.
                    의뢰인의 다음 인생을 위한 가장 유리한 설계를 완성합니다.
                  </p>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  결과 최적화 · 사후 관리 · 새로운 시작
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Real Story 섹션 - 위자료/재산분할/양육권 통합 */}
      <RealStory />

      {/* YouTube 섹션 */}
      <YouTubeSection />

      {/* 기존 위자료 섹션 (백업용 - 나중에 삭제) */}
      <section id="alimony-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-[#0a0a0a] hero-parallax">
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
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-300">{item.badge}</span>
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
                <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                  <span className="text-blue-400 font-semibold text-sm">Case 01</span>
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
                    <span className="text-blue-400">✓</span>
                    <span className="text-sm text-gray-400">증거 확보</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span>
                    <span className="text-sm text-gray-400">전략 수립</span>
                  </div>
                </div>
              </div>

              <div className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                  <span className="text-blue-400 font-semibold text-sm">Case 02</span>
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
                    <span className="text-blue-400">✓</span>
                    <span className="text-sm text-gray-400">전략적 접근</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">✓</span>
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
      <section id="custody-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-[#0a0a0a] hero-parallax">
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

      {/* 최종 CTA 섹션 */}
      <section id="contact" className="min-h-screen flex items-center py-16 md:py-32 px-6 md:px-12 gradient-hero text-white hero-parallax">
        <SectionReveal>
          <div className="max-w-[1040px] mx-auto text-center w-full">
            <p className="text-3xl md:text-5xl font-bold mb-10 md:mb-12 leading-tight">
              지금, 당신의 상황을<br />전략으로 바꿀 때입니다.
            </p>
            <a
              href="tel:02-1234-5678"
              className="inline-block bg-[var(--secondary)] text-[var(--primary-dark)] font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:bg-[var(--secondary-light)] transition-all hover-lift shadow-toss-xl"
            >
              📞 지금 상담하기
            </a>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-white/80">
              평일 09:00 - 18:00 | 주말/공휴일 예약 상담
            </p>
          </div>
        </SectionReveal>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-20 px-6 lg:px-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4">법무법인 더율</h4>
              <p className="text-[var(--gray-400)] text-lg">이혼전문변호사</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">연락처</h4>
              <p className="text-[var(--gray-400)] mb-2">전화: 02-1234-5678</p>
              <p className="text-[var(--gray-400)]">이메일: info@theyool.com</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">상담시간</h4>
              <p className="text-[var(--gray-400)] mb-2">평일: 09:00 - 18:00</p>
              <p className="text-[var(--gray-400)]">주말/공휴일: 예약 상담</p>
            </div>
          </div>
          <div className="border-t border-[var(--gray-800)] pt-8 text-center">
            <p className="text-[var(--gray-500)]">&copy; 2024 법무법인 더율. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
