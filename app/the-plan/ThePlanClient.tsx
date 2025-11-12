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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--gray-50)] to-white pt-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-base md:text-lg text-[var(--gray-600)] mb-6 hero-text-1">
            결혼할 때는 몰랐지만, 이혼할 때는 모든 걸 알고 결정하세요
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-[var(--gray-900)] mb-8 hero-text-2 tracking-tight">
            The Plan
          </h1>
          <p className="text-2xl md:text-4xl font-light text-[var(--primary)] hero-text-3">
            이겨놓고 설계하다
          </p>
        </div>
      </section>

      {/* 왜 이혼도 계획이 필요할까요? */}
      <section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-red-50/10 to-white overflow-hidden hero-parallax">
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="problemDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#fca5a5" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#problemDots)" />
            <circle cx="15%" cy="30%" r="180" fill="#fee2e2" opacity="0.15" />
            <circle cx="85%" cy="70%" r="200" fill="#fecaca" opacity="0.12" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-xs md:text-sm text-red-600/70 mb-3 tracking-[0.2em] uppercase">Problems</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                왜 이혼도 계획이 필요할까요?
              </h2>
              <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
                무작정 시작한 이혼은 예상치 못한 결과를 가져올 수 있습니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">이혼사유 없음</h3>
                    <p className="text-gray-600 mb-2 font-medium">→ 이혼소송 기각</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      명확한 이혼 사유 없이는 재판부가 이혼을 인정하지 않을 수 있습니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">💸</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">은닉재산 못 찾음</h3>
                    <p className="text-gray-600 mb-2 font-medium">→ 적은 재산분할</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      숨겨진 재산을 찾지 못하면 정당한 몫을 받을 수 없습니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">👶</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">양육 준비 미흡</h3>
                    <p className="text-gray-600 mb-2 font-medium">→ 양육권 박탈</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      양육 환경과 계획을 제대로 입증하지 못하면 자녀를 잃을 수 있습니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">양육비 미지급</h3>
                    <p className="text-gray-600 mb-2 font-medium">→ 대응 방법 없음</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      사전 대비 없이는 양육비를 받지 못할 때 속수무책입니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="scroll-reveal bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-red-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">협의이혼만으로 종결</h3>
                    <p className="text-gray-600 mb-2 font-medium">→ 이후에 소송당함</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      불완전한 협의로 마무리하면 나중에 다시 법정에 서게 될 수 있습니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4가지 전략 상세 설명 */}
      <section className="relative py-16 md:py-24 bg-white">
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
                  법원이 인정하는 명확한 이혼 사유를 입증하는 것이 첫걸음입니다. 
                  불륜, 악의적 유기, 심각한 부정행위 등 법적으로 인정되는 사유를 체계적으로 준비합니다.
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
                  숨겨진 재산을 찾아내고, 기여도를 정확히 입증하여 정당한 몫 이상을 확보합니다.
                  부동산, 예금, 주식, 연금 등 모든 재산을 빠짐없이 파악합니다.
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
                  자녀의 최선의 이익을 위한 양육 계획을 수립하고, 양육 능력을 객관적으로 입증합니다.
                  자녀와의 관계, 양육 환경, 경제력 등을 종합적으로 준비합니다.
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
                  적정 양육비를 산정하고, 지속적으로 받을 수 있는 강제집행 방안을 마련합니다.
                  상대방의 실제 소득과 재산을 정확히 파악하여 적절한 양육비를 청구합니다.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 실제 성공 사례 */}
      {cases.length > 0 && (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/10 to-white hero-parallax">
          <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
            <div className="text-center mb-12 md:mb-16 scroll-reveal">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Success Stories</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                실제 성공 사례
              </h2>
              <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
                The Plan으로 평온을 되찾은 의뢰인들의 이야기
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {cases.map((caseItem, index) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.slug}`}
                  className="scroll-reveal group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-6 md:p-8 ${caseItem.bgColor || 'bg-blue-50'}`}>
                    <div className="text-4xl md:text-5xl mb-4">{caseItem.icon}</div>
                    <div className="inline-block px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-semibold rounded-full mb-3">
                      {caseItem.badge}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {caseItem.background}
                    </p>
                  </div>
                  <div className="px-6 md:px-8 py-4 bg-white border-t border-gray-100">
                    <span className="text-sm text-blue-600 font-medium group-hover:underline">
                      자세히 보기 →
                    </span>
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

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1040px] px-6 md:px-12 mx-auto relative z-10">
          <div className="text-center scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              당신의 평온한 새 삶을<br />함께 준비하겠습니다
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-2xl mx-auto">
              The Plan으로 이겨놓고 설계하는<br />체계적인 이혼 전략을 경험하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-sm md:text-base"
              >
                무료 상담 신청
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-transparent text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm md:text-base"
              >
                성공사례 보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
