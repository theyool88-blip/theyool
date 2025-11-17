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
import FAQExplorer from '@/components/features/FAQExplorer';
import ExpertInsights from '@/components/features/ExpertInsights';
import TestimonialsCarousel from '@/components/features/TestimonialsCarousel';
import EmpathySection from '@/components/features/EmpathySection';
import ConsultationTimingGuide from '@/components/features/ConsultationTimingGuide';
import DualPerspectiveCard from '@/components/features/DualPerspectiveCard';
import QuickCalculatorWidget from '@/components/features/QuickCalculatorWidget';
import EnhancedChannelSelector from '@/components/features/EnhancedChannelSelector';

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
      <section className="hero-section relative min-h-screen flex flex-col overflow-hidden hero-parallax bg-gradient-to-b from-blue-50/40 via-white to-white">
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
            <rect x="50%" y="40%" width="300" height="300" fill="#f0f0f0" opacity="0.3" transform="rotate(45)" />
            <rect x="15%" y="55%" width="250" height="250" fill="#f5f5f5" opacity="0.35" transform="rotate(30)" />

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
              지금이 딱 좋아요
            </p>

            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1] text-gray-900 tracking-tight hero-text-2">
              1,200번의 새 출발<br />
              이번엔 당신 차례예요
            </h1>

            {/* Supporting Text */}
            <p className="text-sm md:text-base text-gray-700 mb-8 md:mb-10 font-light leading-relaxed hero-text-2">
              법적 승리는 기본. 마음까지 돌봐드려요
            </p>

            {/* CTA Buttons */}
            <div className="hero-text-3 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsTalkModalOpen(true)}
                  className="px-6 py-2.5 md:px-8 md:py-3 bg-gray-900 text-white rounded-full font-medium text-xs md:text-sm tracking-wide hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  10분만 주세요. 무료예요
                </button>
                <span className="text-xs md:text-sm text-gray-600 self-center">
                  100% 비밀 · 편하게 물어보세요
                </span>
              </div>

              {/* 문제별 바로가기 링크 */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500">급하신가요?</span>
                <Link href="/alimony-defense" className="text-xs md:text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-colors">
                  위자료 청구 받았어요 →
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/custody-battle" className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                  양육권 싸움 중 →
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/property-division" className="text-xs md:text-sm text-green-600 hover:text-green-700 font-medium hover:underline transition-colors">
                  재산 뺏길 위기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 섹션 - 품질 중심 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white border-y border-blue-100/30">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">연 120+</p>
              <p className="text-sm text-gray-600">연 120건만</p>
              <p className="text-xs text-gray-400 mt-1">진짜 도움될 분만 선택</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">92시간</p>
              <p className="text-sm text-gray-600">한 건에 92시간</p>
              <p className="text-xs text-gray-400 mt-1">남들은 15시간이에요</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">1:1</p>
              <p className="text-sm text-gray-600">전담 변호사 1명</p>
              <p className="text-xs text-gray-400 mt-1">끝까지 함께해요</p>
            </div>
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">87%</p>
              <p className="text-sm text-gray-600">87% 성공</p>
              <p className="text-xs text-gray-400 mt-1">12년, 1,200건의 증명</p>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 타이밍 가이드 섹션 */}
      <ConsultationTimingGuide />

      {/* 공감 섹션 - 당신의 상황, 우리가 이해합니다 */}
      <EmpathySection />

      {/* 문제별 솔루션 게이트웨이 섹션 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Your Case</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              뭐가 제일 급해요?
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              급한 것부터 하나씩 정리할게요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* 위자료 문제 */}
            <DualPerspectiveCard
              title="위자료 문제"
              category="위자료"
              landingPageUrl="/alimony-defense"
              claimant={{
                description: '정당한 보상 받아야죠\n증거부터 금액까지 다 챙겨드려요',
                faqLinks: [
                  { text: '상간자에게 위자료를 받을 수 있나요?', url: '/faq?category=위자료' },
                  { text: '불륜 증거가 부족해도 위자료 청구 가능한가요?', url: '/faq?category=위자료' },
                  { text: '위자료 금액은 어떻게 결정되나요?', url: '/faq?category=위자료' },
                ],
                stats: '평균 1.5억 받았어요',
              }}
              respondent={{
                description: '부당한 청구 받았어요?\n과도한 금액, 확 줄여드려요',
                faqLinks: [
                  { text: '위자료 청구가 부당한 경우 대응 방법은?', url: '/faq?category=위자료' },
                  { text: '위자료 금액이 너무 높은데 감액 가능한가요?', url: '/faq?category=위자료' },
                  { text: '상대방 책임도 있는데 위자료를 내야 하나요?', url: '/faq?category=위자료' },
                ],
                stats: '70% 깎았어요',
              }}
            />

            {/* 재산분할 문제 */}
            <DualPerspectiveCard
              title="재산분할 문제"
              category="재산분할"
              landingPageUrl="/property-division"
              claimant={{
                description: '공정하게 나누고 싶어요?\n숨긴 재산까지 다 찾아드려요',
                faqLinks: [
                  { text: '결혼 전 재산도 분할 대상인가요?', url: '/faq?category=재산분할' },
                  { text: '상대방이 재산을 숨기고 있는 것 같아요', url: '/faq?category=재산분할' },
                  { text: '전세보증금은 어떻게 나누나요?', url: '/faq?category=재산분할' },
                ],
                stats: '60% 지켰어요',
              }}
              respondent={{
                description: '너무 많이 달라고 해요?\n정당한 만큼만 주면 돼요',
                faqLinks: [
                  { text: '빚도 재산분할 대상이 되나요?', url: '/faq?category=재산분할' },
                  { text: '내 고유 재산을 지키려면 어떻게 해야 하나요?', url: '/faq?category=재산분할' },
                  { text: '재산형성 기여도를 입증하는 방법은?', url: '/faq?category=재산분할' },
                ],
                stats: '0원. 완벽 방어했어요',
              }}
            />

            {/* 양육권/양육비 문제 */}
            <DualPerspectiveCard
              title="양육권 · 양육비 문제"
              category="양육권"
              landingPageUrl="/custody-battle"
              claimant={{
                description: '아이와 함께하고 싶죠?\n양육권부터 양육비까지 다 챙겨요',
                faqLinks: [
                  { text: '경제력이 없어도 양육권을 가질 수 있나요?', url: '/faq?category=양육권' },
                  { text: '양육비는 언제까지 받을 수 있나요?', url: '/faq?category=양육권' },
                  { text: '양육비 얼마? 바로 계산 →', url: '/child-support-calculator' },
                ],
                stats: '10명 중 9명 성공',
              }}
              respondent={{
                description: '양육비 부담되시나요?\n적정선 찾아드려요. 아이도 만나고요',
                faqLinks: [
                  { text: '양육비 금액이 너무 높은데 조정 가능한가요?', url: '/faq?category=양육권' },
                  { text: '면접교섭권은 어떻게 행사하나요?', url: '/faq?category=양육권' },
                  { text: '양육비를 못 낼 형편인데 어떻게 하나요?', url: '/faq?category=양육권' },
                ],
                stats: '딱 맞게 조정했어요',
              }}
            />

            {/* 협의이혼 vs 재판이혼 */}
            <DualPerspectiveCard
              title="협의이혼 vs 재판이혼"
              category="협의이혼"
              claimant={{
                description: '상대가 안 한대요?\n재판으로 끝내드려요. 유리하게요',
                faqLinks: [
                  { text: '협의가 안 될 때는 어떻게 하나요?', url: '/faq?category=협의이혼' },
                  { text: '이혼소송 기간은 얼마나 걸리나요?', url: '/faq?category=협의이혼' },
                  { text: '재판이혼에 필요한 증거는 무엇인가요?', url: '/faq?category=협의이혼' },
                ],
                stats: '6개월이면 끝나요',
              }}
              respondent={{
                description: '이혼 원치 않아요?\n거부할 수 있어요. 도와드려요',
                faqLinks: [
                  { text: '협의이혼과 재판이혼의 차이는?', url: '/faq?category=협의이혼' },
                  { text: '이혼을 거부할 수 있나요?', url: '/faq?category=협의이혼' },
                  { text: '억지로 서명하라고 해요', url: '/faq?category=협의이혼' },
                ],
                stats: '절반 이상 막았어요',
              }}
            />
          </div>
        </div>
      </section>

      {/* Real Story 섹션 - 위자료/재산분할/양육권 통합 */}
      <RealStory />

      {/* FAQ Explorer 섹션 */}
      <FAQExplorer />

      {/* 간편 계산기 위젯 */}
      <QuickCalculatorWidget />

      {/* Insta더율 & YouTube 통합 섹션 - 친근감 형성 */}
      <InstaTheyoolSection />

      {/* 변호사 칼럼 섹션 */}
      <ExpertInsights />

      {/* Talk 버튼 (오른쪽 하단 고정 + 플로팅) - 전역 */}
      <div className="fixed bottom-8 right-4 z-50 animate-float">
        <button
          data-consultation-modal="true"
          onClick={() => setIsTalkModalOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full text-white font-medium shadow-2xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center border-[0.5px] border-white"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Talk 모달 */}
      <Modal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)} maxWidth="3xl">
        <EnhancedChannelSelector onClose={() => setIsTalkModalOpen(false)} />
      </Modal>

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

      {/* 의뢰인 후기 섹션 - 캐러셀 */}
      <TestimonialsCarousel />

      {/* 최종 CTA 섹션 - 희망과 새로운 시작 */}
      <section id="contact" className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-amber-50/20 hero-parallax overflow-hidden">
        {/* Warm Hope Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#dbeafe', stopOpacity: 0.25 }} />
                <stop offset="100%" style={{ stopColor: '#fef3c7', stopOpacity: 0.25 }} />
              </linearGradient>
            </defs>
            {/* Gentle circles representing new beginning */}
            <circle cx="25%" cy="35%" r="200" fill="url(#hopeGrad)" />
            <circle cx="75%" cy="65%" r="220" fill="#dbeafe" opacity="0.3" />
            <circle cx="50%" cy="50%" r="150" fill="#fef3c7" opacity="0.2" />
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:bg-gray-800 transition-all hover-lift shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 전화 → 1661-7633
              </a>
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg border-2 border-gray-900 hover:bg-gray-50 transition-all shadow-lg"
              >
                카톡이 편하면 여기로
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              100% 비밀 · 익명 OK
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-20 px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4">더율</h4>
              <p className="text-[var(--gray-400)] text-lg mb-4">이혼 전문이에요</p>
              <p className="text-[var(--gray-400)] text-sm">광고 책임 변호사 : 임은지</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">바로 연락하세요</h4>
              <p className="text-[var(--gray-400)] mb-2">
                전화: <a href="tel:1661-7633" className="hover:text-white transition-colors">1661-7633</a>
              </p>
              <p className="text-[var(--gray-400)]">
                이메일: <a href="mailto:info@theyool.com" className="hover:text-white transition-colors">info@theyool.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">여기 있어요</h4>
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
