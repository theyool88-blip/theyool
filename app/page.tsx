'use client';

import { useState, useEffect } from 'react';
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
import InstaTheyoolSection from '@/components/features/InstaTheyoolSection';
import SectionReveal from '@/components/effects/SectionReveal';

export default function Home() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  // (Removed) Venn diagram animation trigger
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-white">
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
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="px-6 py-2.5 md:px-8 md:py-3 bg-transparent border border-gray-900 text-gray-900 rounded-full font-normal text-xs md:text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                무료 상담 신청
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 섹션 */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1,200+</p>
              <p className="text-sm text-gray-600">누적 의뢰인</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">87%</p>
              <p className="text-sm text-gray-600">평균 승소율</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">12년</p>
              <p className="text-sm text-gray-600">이혼 전문 경력</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">4.8/5.0</p>
              <p className="text-sm text-gray-600">고객 만족도</p>
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

      {/* 전문성 강조 섹션 - 신뢰감 있는 블루 톤 */}
      <section id="about" className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden hero-parallax">
        {/* Minimal Professional Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="professionalDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#93c5fd" opacity="0.15" />
              </pattern>
            </defs>
            {/* Subtle dot pattern */}
            <rect width="100%" height="100%" fill="url(#professionalDots)" />
            {/* Very subtle accent circles */}
            <circle cx="15%" cy="30%" r="180" fill="#dbeafe" opacity="0.15" />
            <circle cx="85%" cy="70%" r="200" fill="#bfdbfe" opacity="0.12" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-[1200px] px-6 md:px-12 mx-auto text-center">
            <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Expertise</p>
            <h3 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-900 tracking-tight">
              오직 이혼, 단 하나의 분야
            </h3>
            <p className="text-base md:text-xl text-gray-700 mb-8 md:mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              형사도, 민사도 하지 않습니다.<br />
              <span className="font-semibold text-gray-900">이혼과 상간 사건</span>만을 연구합니다.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
              한 사건, 한 인생.<br />
              더율은 <span className="font-bold text-gray-900">'이혼 이후의 삶'</span>을 설계합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 더 플랜 섹션 - 하얀 배경 */}
      <section id="plan" className="relative min-h-screen flex items-center bg-white">
        <div className="w-full py-16 md:py-24">
          <div className="max-w-[1200px] px-6 md:px-12 mx-auto">
            {/* Title only (diagram removed) */}
            <div className="relative text-center mb-10 md:mb-16">
              <div className="relative z-[10]">
                <p className="text-xs md:text-sm text-purple-600/70 mb-3 tracking-[0.2em] uppercase">Strategy</p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                  더 플랜 <span className="text-gray-500 font-light">(The Plan)</span>
                </h2>
                <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
                  결혼은 실패했지만, 이혼만큼은 신중하게<br />
                  <span className="text-gray-900 font-semibold">4가지 핵심 요소</span>의 완벽한 조화
                </p>
              </div>
            </div>

            {/* 더플랜 상세 보기 버튼 */}
            <div className="relative z-[10] text-center">
              <Link
                href="/the-plan"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 hover:gap-4 shadow-lg hover:shadow-xl"
              >
                The Plan 자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real Story 섹션 - 위자료/재산분할/양육권 통합 */}
      <RealStory />

      {/* Insta더율 & YouTube 통합 섹션 */}
      <InstaTheyoolSection />

      {/* 기존 위자료 섹션 (백업용 - 나중에 삭제) */}
      <section id="alimony-backup" className="hidden min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-purple-50/40 hero-parallax">
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

      {/* 의뢰인 후기 섹션 */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Testimonials</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              의뢰인의 목소리
            </h2>
            <p className="text-base md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              직접 경험하신 분들의 진솔한 이야기입니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "처음에는 막막했지만, 더율의 전략적인 접근으로 예상보다 훨씬 좋은 결과를 얻었습니다. 특히 재산분할에서 숨겨진 재산을 찾아내 주셔서 정말 감사합니다."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-lg">김</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">김○○님</p>
                  <p className="text-xs text-gray-500">재산분할 의뢰인</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "양육권 다툼으로 힘든 시기를 보냈는데, 변호사님의 따뜻한 위로와 체계적인 준비 덕분에 단독 양육권을 확보할 수 있었습니다. 진심으로 감사드립니다."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-amber-700 font-bold text-lg">이</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">이○○님</p>
                  <p className="text-xs text-gray-500">양육권 의뢰인</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "위자료 청구에서 증거가 부족하다고 생각했지만, 더율은 제가 놓친 부분까지 세심하게 챙겨주셨습니다. 5억 원이라는 결과는 상상도 못했습니다."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center">
                  <span className="text-pink-700 font-bold text-lg">박</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">박○○님</p>
                  <p className="text-xs text-gray-500">위자료 의뢰인</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 최종 CTA 섹션 - 희망과 새로운 시작 */}
      <section id="contact" className="relative min-h-screen flex items-center py-16 md:py-32 bg-gradient-to-b from-white via-purple-50/15 to-pink-50/20 hero-parallax overflow-hidden">
        {/* Warm Hope Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fae8ff', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 0.25 }} />
              </linearGradient>
            </defs>
            {/* Gentle circles representing new beginning */}
            <circle cx="25%" cy="35%" r="200" fill="url(#hopeGrad)" />
            <circle cx="75%" cy="65%" r="220" fill="#fdf2f8" opacity="0.3" />
            <circle cx="50%" cy="50%" r="150" fill="#f3e8ff" opacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-[1200px] px-6 md:px-12 mx-auto text-center">
            <p className="text-3xl md:text-5xl font-bold mb-10 md:mb-12 leading-tight text-gray-900">
              지금, 당신의 상황을<br />전략으로 바꿀 때입니다.
            </p>
            <a
              href="tel:1661-7633"
              className="inline-block bg-gray-900 text-white font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:bg-gray-800 transition-all hover-lift shadow-xl"
            >
              📞 지금 상담하기
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4">법무법인 더율</h4>
              <p className="text-[var(--gray-400)] text-lg mb-4">이혼전문변호사</p>
              <p className="text-[var(--gray-400)] text-sm">광고 책임 변호사 : 임은지</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">연락처</h4>
              <p className="text-[var(--gray-400)] mb-2">
                전화: <a href="tel:1661-7633" className="hover:text-white transition-colors">1661-7633</a>
              </p>
              <p className="text-[var(--gray-400)]">
                이메일: <a href="mailto:info@theyool.com" className="hover:text-white transition-colors">info@theyool.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">오시는 길</h4>
              <a href="/contact" className="block text-[var(--gray-400)] text-sm mb-3 hover:text-white transition-colors">
                <span className="font-semibold text-white">천안 주사무소</span><br />
                충남 천안시 동남구 청수5로 11, 9층
              </a>
              <a href="/contact" className="block text-[var(--gray-400)] text-sm hover:text-white transition-colors">
                <span className="font-semibold text-white">평택 분사무소</span><br />
                경기 평택시 평남로 1029-1, 6층
              </a>
            </div>
          </div>

          <div className="border-t border-[var(--gray-800)] pt-8 mb-6">
            <div className="text-[var(--gray-400)] text-sm space-y-2">
              <p>법인명 : 법무법인 더율 | 대표자 : 육심원외 1</p>
              <p>사업자번호 : 354-85-01451(평택), 514-86-01593(천안)</p>
            </div>
          </div>

          <div className="border-t border-[var(--gray-800)] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex gap-6 text-sm flex-wrap justify-center">
                <Link href="/privacy" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  이용약관
                </Link>
                <Link href="/disclaimer" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  면책공고
                </Link>
                <Link href="/faq" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  이혼큐레이션
                </Link>
              </div>
            </div>
            <p className="text-[var(--gray-500)] text-sm text-center md:text-left">
              Copyright &copy; 2025 법무법인 더율 | Powered by 법무법인 더율
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
