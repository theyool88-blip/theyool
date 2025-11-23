'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '@/components/ui/MobileMenu';
import Modal from '@/components/ui/Modal';
import ConsultationForm from '@/components/features/ConsultationForm';

interface Case {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string;
  background: string;
  strategy: string;
  result: string;
  icon: string;
  bgColor: string;
  featured: boolean;
}

interface ThePlanClientProps {
  cases: Case[];
}

export default function ThePlanClient({ cases }: ThePlanClientProps) {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    // 퍼즐 애니메이션 트리거
    const wrapper = document.querySelector('.puzzle-wrapper');
    let puzzleObs: IntersectionObserver | null = null;
    if (wrapper) {
      puzzleObs = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('puzzle-animated');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      puzzleObs.observe(wrapper);
    }

    return () => {
      observer.disconnect();
      puzzleObs?.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm">
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MobileMenu />
            </div>
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

      {/* Talk 버튼 */}
      <div className="fixed bottom-8 right-4 z-50 animate-float">
        <button
          onClick={() => setIsTalkModalOpen(true)}
          className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-full text-white font-medium shadow-2xl hover:bg-gray-800 hover:scale-110 transition-all duration-300 flex items-center justify-center border-[0.5px] border-white"
        >
          <span className="text-xs md:text-sm">Talk</span>
        </button>
      </div>

      <Modal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)} maxWidth="lg">
        <ConsultationForm onCancel={() => setIsTalkModalOpen(false)} />
      </Modal>

      {/* Hero Section - Warm & Modern */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white pt-16">
        {/* Minimal Geometric Background Pattern */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
            <circle cx="20%" cy="30%" r="200" fill="#fef3c7" opacity="0.4" />
            <circle cx="80%" cy="70%" r="250" fill="#fde68a" opacity="0.3" />
            <circle cx="70%" cy="25%" r="150" fill="#f5f5f5" opacity="0.5" />
            <circle cx="30%" cy="75%" r="180" fill="#efefef" opacity="0.5" />
          </svg>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-amber-700">12년간 1,200건의 답</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            이겨놓고 설계하는<br/>
            <span className="text-amber-600">승소 전략</span>
          </h1>

          <p className="text-lg md:text-2xl font-light text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
            복잡한 이혼, 혼자 고민하지 마세요
          </p>

          <p className="text-sm md:text-base text-gray-600 mb-10 max-w-2xl mx-auto">
            12년간 1,200건의 경험으로 만든 검증된 방법이 있어요
          </p>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-10">
            <div className="scroll-reveal">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">12년</p>
              <p className="text-sm text-gray-600">전문 경력</p>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1,200+</p>
              <p className="text-sm text-gray-600">성공 사례</p>
            </div>
            <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">87%</p>
              <p className="text-sm text-gray-600">승소율</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <button
              onClick={() => setIsTalkModalOpen(true)}
              className="group px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>10분 무료 진단 받기</span>
            </button>

            <button
              onClick={() => document.getElementById('strategy-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-gray-900 rounded-full font-medium border-2 border-gray-200 hover:border-amber-600 hover:shadow-lg transition-all duration-300"
            >
              전략 살펴보기
            </button>
          </div>

          <p className="text-xs text-gray-500 italic">
            "다들 '진작 올걸' 해요"
          </p>
        </div>
      </section>

      {/* 왜 이혼도 계획이 필요할까요? */}
      <section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/10 to-white overflow-hidden hero-parallax">
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="problemDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#f59e0b" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#problemDots)" />
            <circle cx="15%" cy="30%" r="180" fill="#fef3c7" opacity="0.2" />
            <circle cx="85%" cy="70%" r="200" fill="#fde68a" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Problems</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                준비 없이 시작하면<br className="hidden md:block"/>
                이런 일이 생겨요
              </h2>
              <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
                12년간 1,200건을 보며 배운 것<br className="hidden md:block"/>
                <span className="font-medium text-gray-900">준비 없는 이혼은 더 큰 고통으로 이어져요</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">법원이 인정하는 사유가 없으면</h3>
                    <p className="text-amber-700 mb-2 font-bold">→ 이혼 자체가 불가능해요</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      불륜, 악의적 유기, 부정행위 등<br/>
                      명확한 법적 사유가 있어야 이혼이 가능해요
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-2xl">💸</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">재산 추적을 제대로 못하면</h3>
                    <p className="text-amber-700 mb-2 font-bold">→ 수억원을 놓칠 수 있어요</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      배우자가 숨긴 부동산, 예금, 주식, 사업체 자산<br/>
                      찾지 못하면 그대로 상대방 몫이 돼요
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-2xl">👶</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">양육 계획을 입증하지 못하면</h3>
                    <p className="text-amber-700 mb-2 font-bold">→ 아이를 빼앗길 수 있어요</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      양육 환경, 경제력, 양육 의지를 증명하지 못하면<br/>
                      법원은 상대방에게 양육권을 줘요
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">강제집행 준비를 안하면</h3>
                    <p className="text-amber-700 mb-2 font-bold">→ 양육비를 한 푼도 못 받아요</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      상대방이 안 주면 끝이에요<br/>
                      사전에 재산을 파악하고 강제집행 방안을 준비해야 해요
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-amber-100 hover:shadow-lg transition-all duration-300 md:col-span-2">
                <div className="flex items-start gap-4 max-w-3xl mx-auto">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">급하게 협의이혼만 하면</h3>
                    <p className="text-amber-700 mb-2 font-bold">→ 3년 후 다시 법정에 서요</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      재산분할, 양육비, 면접교섭 등<br/>
                      세부 조건을 제대로 정하지 않으면 나중에 더 큰 분쟁이 생겨요
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 문제 상황별 대응 가이드 CTA */}
            <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 text-center">
              <p className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                지금 당장 해결이 필요한 긴급 상황이신가요?
              </p>
              <p className="text-sm text-gray-600 mb-6">
                위급한 상황별 즉시 대응 가이드를 확인하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/faq?category=emergency"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  긴급 상황 대응 가이드
                </Link>
                <Link
                  href="/faq?category=evidence-collection"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-700 rounded-full font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  증거 수집 방법
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 전환 섹션: 그래서 우리가 The Plan을 만들었습니다 */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-amber-50/30 to-white overflow-hidden">
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          <div className="scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              <span className="text-sm font-semibold text-amber-800">Solution</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              그래서<br className="md:hidden"/>
              <span className="text-amber-600">The Plan</span>을 만들었어요
            </h2>

            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              12년간 1,200건의 이혼을 하면서<br className="hidden md:block"/>
              똑같은 문제들을 마주했어요
            </p>

            <p className="text-base md:text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              같은 실수로 고통받는 분들을 보며<br/>
              "이겨놓고 설계하는" 시스템을 만들었어요
            </p>

            {/* 4대 전략 미리보기 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="scroll-reveal bg-white p-4 md:p-6 rounded-xl shadow-sm border border-amber-100">
                <div className="text-3xl md:text-4xl mb-2">01</div>
                <p className="text-sm md:text-base font-semibold text-gray-900">이혼사유 확립</p>
              </div>
              <div className="scroll-reveal bg-white p-4 md:p-6 rounded-xl shadow-sm border border-amber-100" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl md:text-4xl mb-2">02</div>
                <p className="text-sm md:text-base font-semibold text-gray-900">재산분할 최대화</p>
              </div>
              <div className="scroll-reveal bg-white p-4 md:p-6 rounded-xl shadow-sm border border-amber-100" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl md:text-4xl mb-2">03</div>
                <p className="text-sm md:text-base font-semibold text-gray-900">양육권 확보</p>
              </div>
              <div className="scroll-reveal bg-white p-4 md:p-6 rounded-xl shadow-sm border border-amber-100" style={{ animationDelay: '0.3s' }}>
                <div className="text-3xl md:text-4xl mb-2">04</div>
                <p className="text-sm md:text-base font-semibold text-gray-900">양육비 확보</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4가지 전략 상세 설명 */}
      <section id="strategy-section" className="relative py-16 md:py-24 bg-white">
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
          <div className="text-center mb-12 md:mb-20 scroll-reveal">
            <p className="text-xs md:text-sm text-purple-600/70 mb-3 tracking-[0.2em] uppercase">Strategy</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              The Plan의 4가지 전략
            </h2>
            <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
              이겨놓고 설계하는 체계적인 승소 전략
            </p>
          </div>

          {/* Strategy 1 */}
          <div className="mb-16 md:mb-24 scroll-reveal">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-shrink-0 md:w-32 hidden md:block">
                <div className="text-[80px] md:text-[120px] font-bold text-gray-200 leading-none">1</div>
              </div>
              <div className="flex-1 relative">
                {/* 모바일 배경 숫자 */}
                <div className="absolute -top-2 -right-4 text-[160px] md:hidden font-bold text-blue-100/60 leading-none pointer-events-none select-none z-0">01</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-4 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full tracking-wide">이혼사유</span>
                  </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  이혼 사유 확실히 하기
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  법원이 인정하는 명확한 이혼 사유를 입증하는 게 첫걸음이에요
                  불륜, 악의적 유기, 부정행위 등 법적 사유를 체계적으로 준비해요
                </p>
                <ul className="space-y-3 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs mt-0.5">✓</span>
                    <span>법적으로 인정되는 이혼 사유 분석</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs mt-0.5">✓</span>
                    <span>증거 수집 및 입증 전략 수립</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs mt-0.5">✓</span>
                    <span>상대방 반박 대비 방어 전략</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <Link
                    href="/faq?category=divorce-process"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <span>이혼 절차 관련 FAQ 더 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="mb-16 md:mb-24 scroll-reveal">
            <div className="flex flex-col md:flex-row-reverse items-start gap-6 md:gap-12">
              <div className="flex-shrink-0 md:w-32 hidden md:block">
                <div className="text-[80px] md:text-[120px] font-bold text-gray-200 leading-none md:text-right">2</div>
              </div>
              <div className="flex-1 md:text-right relative">
                {/* 모바일 배경 숫자 */}
                <div className="absolute -top-2 -right-4 text-[160px] md:hidden font-bold text-green-100/60 leading-none pointer-events-none select-none z-0">02</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:justify-end">
                    <span className="inline-block px-4 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full tracking-wide">재산분할</span>
                  </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  재산분할 최대화
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  숨겨진 재산을 찾아내고, 기여도를 입증해서 정당한 몫을 확보해요
                  부동산, 예금, 주식, 연금 등 모든 재산을 빠짐없이 파악해요
                </p>
                <ul className="space-y-3 text-sm md:text-base text-gray-600 md:flex md:flex-col md:items-end">
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xs mt-0.5">✓</span>
                    <span>은닉재산 추적 및 재산조회</span>
                  </li>
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xs mt-0.5">✓</span>
                    <span>기여도 및 기여분 입증</span>
                  </li>
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xs mt-0.5">✓</span>
                    <span>부동산, 금융자산, 사업체 평가</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-green-100 md:flex md:justify-end">
                  <Link
                    href="/faq?category=property-division"
                    className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                  >
                    <span>재산분할 관련 FAQ 더 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy 3 */}
          <div className="mb-16 md:mb-24 scroll-reveal">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <div className="flex-shrink-0 md:w-32 hidden md:block">
                <div className="text-[80px] md:text-[120px] font-bold text-gray-200 leading-none">3</div>
              </div>
              <div className="flex-1 relative">
                {/* 모바일 배경 숫자 */}
                <div className="absolute -top-2 -right-4 text-[160px] md:hidden font-bold text-amber-100/60 leading-none pointer-events-none select-none z-0">03</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-4 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full tracking-wide">양육권</span>
                  </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  양육권 확보
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  자녀를 위한 양육 계획을 세우고, 양육 능력을 입증해요
                  자녀와의 관계, 양육 환경, 경제력 등을 종합적으로 준비해요
                </p>
                <ul className="space-y-3 text-sm md:text-base text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs mt-0.5">✓</span>
                    <span>양육 환경 및 계획 입증</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs mt-0.5">✓</span>
                    <span>자녀와의 관계 및 애착 관계 증명</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 text-xs mt-0.5">✓</span>
                    <span>상대방의 양육 부적격 사유 입증</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <Link
                    href="/faq?category=custody"
                    className="inline-flex items-center gap-2 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    <span>양육권 관련 FAQ 더 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy 4 */}
          <div className="scroll-reveal">
            <div className="flex flex-col md:flex-row-reverse items-start gap-6 md:gap-12">
              <div className="flex-shrink-0 md:w-32 hidden md:block">
                <div className="text-[80px] md:text-[120px] font-bold text-gray-200 leading-none md:text-right">4</div>
              </div>
              <div className="flex-1 md:text-right relative">
                {/* 모바일 배경 숫자 */}
                <div className="absolute -top-2 -right-4 text-[160px] md:hidden font-bold text-red-100/60 leading-none pointer-events-none select-none z-0">04</div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 md:justify-end">
                    <span className="inline-block px-4 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full tracking-wide">양육비</span>
                  </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
                  양육비 확보
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  적정 양육비를 산정하고, 계속 받을 수 있는 방안을 마련해요
                  상대방의 실제 소득과 재산을 파악해서 적절한 양육비를 청구해요
                </p>
                <ul className="space-y-3 text-sm md:text-base text-gray-600 md:flex md:flex-col md:items-end">
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xs mt-0.5">✓</span>
                    <span>상대방 소득 및 재산 조사</span>
                  </li>
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xs mt-0.5">✓</span>
                    <span>적정 양육비 산정 및 청구</span>
                  </li>
                  <li className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-600 text-xs mt-0.5">✓</span>
                    <span>미지급 시 강제집행 방안 마련</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-red-100 md:flex md:justify-end">
                  <Link
                    href="/faq?category=child-support"
                    className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <span>양육비 관련 FAQ 더 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 성공 사례 */}
      {cases.length > 0 && (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-amber-50/20 via-white to-white overflow-hidden">
          {/* Warm Background Pattern */}
          <div className="absolute inset-0 w-full h-full opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15%" cy="25%" r="150" fill="#fef3c7" opacity="0.4" />
              <circle cx="85%" cy="75%" r="180" fill="#fde68a" opacity="0.3" />
            </svg>
          </div>

          <div className="max-w-[1040px] px-6 md:px-12 mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16 scroll-reveal">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
                <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                <span className="text-xs font-semibold text-amber-800 tracking-wider">SUCCESS STORIES</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                The Plan으로<br className="md:hidden"/>
                <span className="text-amber-600">평온을 되찾은 분들</span>
              </h2>
              <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
                지금은 새로운 삶을 살고 계십니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {cases.map((caseItem, index) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.slug}`}
                  className="scroll-reveal group block bg-gradient-to-br from-white to-amber-50/30 p-6 md:p-8 rounded-2xl border border-amber-100/50 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Category Badge with warm accent */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1.5 bg-amber-100/80 text-amber-800 text-xs font-semibold rounded-full">
                      {caseItem.badge}
                    </span>
                    <svg className="w-5 h-5 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Title with warm hover */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
                    {caseItem.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {caseItem.background}
                  </p>

                  {/* Read More with warm accent */}
                  <div className="flex items-center gap-2 text-sm text-amber-700 font-semibold group-hover:text-amber-800 transition-colors">
                    <span>사례 보기</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center scroll-reveal">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-transparent border border-gray-900 text-gray-900 rounded-full font-normal text-xs md:text-sm tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                모든 성공 사례 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* The Plan FAQ Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/20 overflow-hidden">
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
          <div className="text-center mb-12 md:mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-4">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              <span className="text-xs font-semibold text-amber-800 tracking-wider">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              The Plan에 대해<br className="md:hidden"/>
              <span className="text-amber-600">자주 묻는 질문</span>
            </h2>
            <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
              구체적인 궁금증을 해결해드립니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Q1 - 가장 기본적인 질문 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    The Plan이란 정확히 무엇인가요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                The Plan은 12년간 1,200건의 이혼 사건을 처리하며 발견한 패턴을 체계화한 승소 전략입니다. 일반적인 접근과 달리 "이겨놓고 설계한다"는 원칙으로, 승소 시나리오를 먼저 정한 뒤 역산하여 필요한 증거와 절차를 준비합니다. 이혼사유 확립, 재산분할 최대화, 양육권 확보, 양육비 확보라는 4가지 핵심 전략으로 구성되어 있습니다.
              </div>
            </details>

            {/* Q2 - 차별화 포인트 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    다른 법무법인과 The Plan의 차이는 무엇인가요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                "이겨놓고 설계한다"는 것이 핵심입니다. 일반적인 접근은 소송 시작 후 증거를 수집하지만, The Plan은 승소 시나리오를 먼저 설계하고 역산하여 전략을 수립합니다. 12년간 1,200건의 경험으로 만든 체계적 시스템입니다.
              </div>
            </details>

            {/* Q3 - 비용 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    The Plan 수임료는 어떻게 책정되나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                사건의 복잡도와 목표에 따라 맞춤형으로 책정됩니다. 기본 수임료는 500만원부터 시작하며, 초기 무료 상담에서 정확한 견적을 안내드립니다. 성공 보수는 별도 협의를 통해 투명하게 결정됩니다.
              </div>
            </details>

            {/* Q4 - 전문성 검증 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    변호사가 직접 상담하나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                네, 모든 상담과 사건 진행은 담당 변호사가 직접 합니다. 법무법인 더율은 이혼 전문 변호사가 초기 상담부터 사건 종결까지 전 과정을 직접 담당하는 시스템입니다. 상담사나 사무직원이 아닌 실제 소송을 진행할 변호사와 직접 상담하며 전략을 수립합니다. 12년 경력의 전문성을 직접 경험하실 수 있습니다.
              </div>
            </details>

            {/* Q5 - 비밀보장 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    비밀보장이 되나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                네, 철저히 보장됩니다. 변호사에게는 법적으로 의뢰인의 비밀을 지킬 의무가 있으며(변호사법 제26조), 이를 위반하면 형사처벌을 받습니다. 상담 내용, 개인정보, 사건 내역 등 모든 정보는 암호화되어 관리되며, 의뢰인의 동의 없이는 절대 외부에 공개되지 않습니다. 가족이나 지인에게도 알리지 않고 진행 가능합니다.
              </div>
            </details>

            {/* Q6 - 성공률 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    The Plan의 실제 성공률은 어떻게 되나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                87%의 승소율을 기록하고 있습니다. 특히 재산분할의 경우 87%의 사례에서 숨겨진 재산을 발견했으며, 양육권 분쟁에서도 높은 성공률을 보이고 있습니다. 12년간 1,200건 이상의 경험이 뒷받침합니다.
              </div>
            </details>

            {/* Q7 - 시간 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    The Plan 전체 과정은 얼마나 걸리나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                평균적으로 6개월 정도 소요됩니다. 협의이혼의 경우 2-3개월, 재판이혼은 6-12개월이 일반적입니다. 사건의 복잡도에 따라 달라지며, 첫 상담에서 예상 기간을 안내드립니다.
              </div>
            </details>

            {/* Q8 - 심리적 안전 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    상담 후 꼭 의뢰해야 하나요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                아니요, 부담 없이 상담만 받으셔도 됩니다. 초기 상담에서는 현재 상황을 진단하고 예상되는 결과와 전략을 설명드립니다. 상담 후 충분히 고민하신 뒤 결정하시면 되며, 강요나 권유는 일절 하지 않습니다. 많은 분들이 상담만으로도 방향을 잡고 도움을 받으셨습니다. 상담비는 무료이며, 시간 제한 없이 충분히 상담해드립니다.
              </div>
            </details>

            {/* Q9 - 협의이혼 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    협의이혼도 The Plan이 필요한가요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                네, 더욱 필요합니다. 협의이혼이 빠르고 간단해 보이지만, 재산분할, 양육권, 양육비 등 세부 조건을 제대로 정하지 않으면 이혼 후 더 큰 분쟁이 발생합니다. The Plan으로 처음부터 완벽하게 마무리하는 것이 중요합니다.
              </div>
            </details>

            {/* Q10 - 진행 중인 사건 */}
            <details className="scroll-reveal group bg-white p-6 rounded-xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
              <summary className="flex items-start justify-between cursor-pointer list-none">
                <div className="flex items-start gap-3 flex-1">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold mt-0.5">Q</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                    이미 진행 중인 이혼도 The Plan 적용이 가능한가요?
                  </h3>
                </div>
                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 pl-9 text-sm text-gray-600 leading-relaxed">
                가능합니다. 진행 단계를 분석하여 남은 절차에 The Plan을 적용합니다. 특히 1심 진행 중이거나 항소를 준비 중이라면 The Plan의 체계적 접근이 큰 도움이 됩니다. 현재 상황 진단은 무료로 제공됩니다.
              </div>
            </details>
          </div>

          {/* FAQ 하단 CTA */}
          <div className="text-center mt-12 scroll-reveal">
            <p className="text-sm text-gray-600 mb-6">
              더 궁금한 점이 있으신가요?
            </p>
            <button
              onClick={() => setIsTalkModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 hover:shadow-xl transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              10분 무료 상담 신청
            </button>
          </div>
        </div>
      </section>

      {/* 4가지 핵심 요소의 완벽한 조화 - 부드러운 애니메이션 */}
      <section className="relative py-20 md:py-32 bg-[#f8f6f3] overflow-hidden">
        <div className="max-w-[1200px] px-6 md:px-12 mx-auto">
          {/* 제목과 다이어그램 간격을 모바일에서 더 가깝게 */}
          <div className="text-center mb-8 md:mb-20">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.3em] uppercase">Harmony</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              4가지 핵심 요소의 완벽한 조화
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              결혼은 실패했지만, 이혼만큼은 신중하게
            </p>
          </div>

          {/* 퍼즐 재시작: 4개 블록 + 텍스트 + 시퀀스 애니메이션 */}
          <div className="relative max-w-4xl mx-auto h-[420px] md:h-[520px] puzzle-wrapper">
            <svg className="w-full h-full" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="p1Shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="0" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.12"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                {/* Masks for concave cut-outs only (expanded to keep convex visible) */}
                <mask id="maskP1">
                  <rect x="80" y="80" width="200" height="200" fill="white"/>
                  {/* right concave (cut out) */}
                  <circle cx="280" cy="180" r="30" fill="black"/>
                </mask>
                <mask id="maskP2">
                  <rect x="280" y="80" width="200" height="200" fill="white"/>
                  {/* bottom concave */}
                  <circle cx="380" cy="280" r="30" fill="black"/>
                </mask>
                <mask id="maskP3">
                  <rect x="80" y="280" width="200" height="200" fill="white"/>
                  {/* top concave */}
                  <circle cx="180" cy="280" r="30" fill="black"/>
                </mask>
                <mask id="maskP4">
                  <rect x="280" y="280" width="200" height="200" fill="white"/>
                  {/* left concave */}
                  <circle cx="280" cy="380" r="30" fill="black"/>
                </mask>
              </defs>
              {/* Piece 1 (TL): right concave, bottom convex */}
              <g className="puzzle-quad quad-1">
                <g mask="url(#maskP1)">
                  <rect x="80" y="80" width="200" height="200" fill="#FFE5E5" />
                </g>
                {/* bottom convex add */}
                <circle cx="180" cy="280" r="30" fill="#FFE5E5" />
                <text x="180" y="155" textAnchor="middle" fontSize="12" fontWeight={600} fill="#d1d5db" letterSpacing={2}>01</text>
                <text x="180" y="180" textAnchor="middle" fontSize="16" fontWeight={700} fill="#FF6B7A" letterSpacing={2.5}>GROUNDS</text>
                <text x="180" y="200" textAnchor="middle" fontSize="11" fill="#FF8A95">이혼사유 확립</text>
              </g>

              {/* Piece 2 (TR): left convex, bottom concave */}
              <g className="puzzle-quad quad-2">
                <g mask="url(#maskP2)">
                  <rect x="280" y="80" width="200" height="200" fill="#E5F0FF" />
                </g>
                {/* left convex add (outside mask to avoid clipping) */}
                <circle cx="280" cy="180" r="30" fill="#E5F0FF" />
                <text x="380" y="155" textAnchor="middle" fontSize="12" fontWeight={600} fill="#d1d5db" letterSpacing={2}>02</text>
                <text x="380" y="180" textAnchor="middle" fontSize="16" fontWeight={700} fill="#5EAEFF" letterSpacing={2.5}>PROPERTY</text>
                <text x="380" y="200" textAnchor="middle" fontSize="11" fill="#7DBEFF">재산분할 최대화</text>
              </g>

              {/* Bottom row for lift */}
              <g className="bottom-row">
                {/* Piece 4 (BR): top convex, left concave — behind layer */}
                <g className="puzzle-quad quad-4">
                  <g mask="url(#maskP4)">
                    <rect x="280" y="280" width="200" height="200" fill="#E8F5E9" />
                  </g>
                  <circle cx="380" cy="280" r="30" fill="#E8F5E9" />
                  <text x={380} y={355} textAnchor="middle" fontSize={12} fontWeight={600} fill="#d1d5db" letterSpacing={2}>04</text>
                  <text x={380} y={380} textAnchor="middle" fontSize={16} fontWeight={700} fill="#66BB6A" letterSpacing={2.5}>SUPPORT</text>
                  <text x={380} y={400} textAnchor="middle" fontSize={11} fill="#81C784">양육비 확보</text>
                </g>

                {/* Piece 3 (BL): top concave, right convex — front layer */}
                <g className="puzzle-quad quad-3">
                  <g mask="url(#maskP3)">
                    <rect x="80" y="280" width="200" height="200" fill="#FFF6E5" />
                  </g>
                  {/* right convex add */}
                  <circle cx="280" cy="380" r="30" fill="#FFF6E5" />
                  <text x="180" y="355" textAnchor="middle" fontSize="12" fontWeight={600} fill="#d1d5db" letterSpacing={2}>03</text>
                  <text x="180" y="380" textAnchor="middle" fontSize="16" fontWeight={700} fill="#FFA94D" letterSpacing={2.5}>CUSTODY</text>
                  <text x="180" y="400" textAnchor="middle" fontSize="11" fill="#FFB966">양육권 확보</text>
                </g>

                {/* Piece 4 (BR): top convex, left concave */}
                <g className="puzzle-quad quad-4" style={{ display: 'none' }}>
                  <g mask="url(#maskP4)">
                    <rect x="280" y="280" width="200" height="200" fill="#E8F5E9" />
                  </g>
                  {/* top convex add (outside mask to avoid clipping) */}
                  <circle cx="380" cy="280" r="30" fill="#E8F5E9" />
                  <text x="380" y="355" textAnchor="middle" fontSize="12" fontWeight={600} fill="#d1d5db" letterSpacing={2}>04</text>
                  <text x="380" y="380" textAnchor="middle" fontSize="16" fontWeight={700} fill="#66BB6A" letterSpacing={2.5}>SUPPORT</text>
                  <text x="380" y="400" textAnchor="middle" fontSize="11" fill="#81C784">양육비 확보</text>
                </g>
              </g>

              {/* 중앙 THE PLAN 텍스트 */}
              <g className="puzzle-center-text">
                <text x="280" y="288" textAnchor="middle" fontSize="44" fontWeight={800} fill="#334155" letterSpacing={5}>THE</text>
                <text x="280" y="336" textAnchor="middle" fontSize="44" fontWeight={800} fill="#334155" letterSpacing={5}>PLAN</text>
              </g>
            </svg>
          </div>

          <div className="text-center mt-12">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              4가지 요소가 완벽하게 준비되었을 때, 비로소 진정한 평온을 되찾습니다
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Warm & Hopeful */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20%" cy="30%" r="200" fill="#fef3c7" opacity="0.5" />
            <circle cx="80%" cy="70%" r="250" fill="#fde68a" opacity="0.4" />
          </svg>
        </div>

        <div className="max-w-[1040px] px-6 md:px-12 mx-auto relative z-10">
          <div className="text-center scroll-reveal">
            {/* Trust Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 shadow-sm">
              <span className="text-sm font-semibold text-amber-700">24시간 이내 첫 상담 가능</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              오늘부터 시작하세요
            </h2>

            <p className="text-lg md:text-xl mb-4 text-gray-700 leading-relaxed max-w-2xl mx-auto">
              하루가 아까워요<br/>
              3개월 후엔 달라져 있을 거예요
            </p>

            <p className="text-sm md:text-base text-gray-500 mb-10 italic max-w-xl mx-auto">
              "다들 '진작 올걸' 해요"
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="group inline-flex items-center gap-2 px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl text-base md:text-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                10분 무료 진단 받기
              </button>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-amber-600 hover:shadow-lg transition-all duration-300 text-base"
              >
                성공사례 먼저 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500 mb-1">평균 응답 시간</p>
                <p className="text-lg font-bold text-gray-900">2시간</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">의뢰인 만족도</p>
                <p className="text-lg font-bold text-gray-900">94%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">평균 처리 기간</p>
                <p className="text-lg font-bold text-gray-900">6개월</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
