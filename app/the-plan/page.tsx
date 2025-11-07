'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';

export default function ThePlanPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              The Plan
            </h1>
            <p className="text-2xl md:text-3xl mb-6 font-medium">
              이겨놓고 설계하다
            </p>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              법무법인 더율의 승소전략 'The Plan'은<br />
              단순한 승소를 넘어, 의뢰인의 '다음 인생'을 위한<br />
              가장 유리한 설계를 완성합니다.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 철학 섹션 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
                왜 The Plan인가?
              </h2>
              <p className="text-xl text-[var(--gray-700)] leading-relaxed max-w-3xl mx-auto">
                이혼은 끝이 아니라 새로운 시작입니다.<br />
                더율은 단순히 이기는 것을 넘어, <span className="font-bold text-[var(--accent)]">이긴 후의 삶</span>을 설계합니다.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <ScrollReveal delay={100}>
              <div className="text-center p-8 card-hover">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  전략적 접근
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  사건의 처음부터 끝까지, 모든 단계를 전략적으로 설계하여 최선의 결과를 만들어냅니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center p-8 card-hover">
                <div className="text-6xl mb-6">💡</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  맞춤형 솔루션
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  모든 사건은 다릅니다. 의뢰인의 상황에 최적화된 맞춤형 전략을 제시합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center p-8 card-hover">
                <div className="text-6xl mb-6">🛡️</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  이후까지 책임
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  소송이 끝나도 끝이 아닙니다. 이혼 후의 삶까지 함께 준비합니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Plan 5단계 프로세스 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
                The Plan 5단계
              </h2>
              <p className="text-xl text-[var(--gray-700)]">
                체계적인 5단계 프로세스로 최선의 결과를 만들어냅니다
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {/* Step 1 */}
            <ScrollReveal delay={100}>
              <div className="card-glass p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                      사건 분석 & 목표 설정
                    </h3>
                    <p className="text-base md:text-lg text-[var(--gray-700)] leading-relaxed mb-4">
                      사건의 전체 구조를 파악하고, 의뢰인이 원하는 최종 목표를 명확히 합니다.
                    </p>
                    <ul className="space-y-2 text-[var(--gray-700)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>사실관계 정밀 분석</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>법적 쟁점 파악</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>현실적 목표 수립</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={200}>
              <div className="card-glass p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                      증거 확보 & 전략 수립
                    </h3>
                    <p className="text-base md:text-lg text-[var(--gray-700)] leading-relaxed mb-4">
                      승소의 핵심은 증거입니다. 체계적으로 증거를 확보하고 법적 전략을 설계합니다.
                    </p>
                    <ul className="space-y-2 text-[var(--gray-700)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>핵심 증거 확보 전략</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>법리 연구 및 판례 분석</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>상대방 예상 대응 시뮬레이션</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={300}>
              <div className="card-glass p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                      소송 진행 & 유연한 대응
                    </h3>
                    <p className="text-base md:text-lg text-[var(--gray-700)] leading-relaxed mb-4">
                      치밀한 준비를 바탕으로 소송을 진행하며, 상황 변화에 유연하게 대응합니다.
                    </p>
                    <ul className="space-y-2 text-[var(--gray-700)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>강력한 주장서면 작성</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>변론 및 증인신문 준비</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>조정 협상 전략</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal delay={400}>
              <div className="card-glass p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                      결과 확보 & 이행 지원
                    </h3>
                    <p className="text-base md:text-lg text-[var(--gray-700)] leading-relaxed mb-4">
                      최선의 결과를 얻고, 실제로 이행될 수 있도록 지원합니다.
                    </p>
                    <ul className="space-y-2 text-[var(--gray-700)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>판결/조정 분석</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>이행 절차 안내</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>강제집행 지원</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Step 5 */}
            <ScrollReveal delay={500}>
              <div className="card-glass p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                      이혼 후 케어
                    </h3>
                    <p className="text-base md:text-lg text-[var(--gray-700)] leading-relaxed mb-4">
                      이혼 이후의 삶도 함께 준비합니다. 더율은 끝까지 함께합니다.
                    </p>
                    <ul className="space-y-2 text-[var(--gray-700)]">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>양육비 미지급 대응</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>면접교섭권 조정</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">✓</span>
                        <span>이혼 후 법률 문제 상담</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 차별점 섹션 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
                다른 법무법인과의 차이
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal delay={100}>
              <div className="p-8 bg-[var(--gray-50)] rounded-3xl border-2 border-[var(--gray-200)]">
                <h3 className="text-xl font-bold text-[var(--gray-600)] mb-6 text-center">
                  일반적인 이혼 소송
                </h3>
                <ul className="space-y-4 text-[var(--gray-700)]">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>단순 승소만을 목표</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>형식적인 소송 진행</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>소송 종료 후 연락 두절</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>이혼 후 문제는 외면</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="p-8 bg-[var(--accent)]/5 rounded-3xl border-2 border-[var(--accent)]">
                <h3 className="text-xl font-bold text-[var(--accent)] mb-6 text-center">
                  더율의 The Plan
                </h3>
                <ul className="space-y-4 text-[var(--gray-700)]">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-1">✓</span>
                    <span><strong>이혼 후의 삶</strong>까지 설계</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-1">✓</span>
                    <span><strong>전략적이고 체계적</strong>인 접근</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-1">✓</span>
                    <span><strong>지속적인 소통</strong>과 케어</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--accent)] mt-1">✓</span>
                    <span><strong>이혼 후 케어</strong> 서비스 제공</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 md:py-32 px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              당신의 다음 인생을 위한<br />
              The Plan을 시작하세요
            </h2>
            <p className="text-xl mb-12 opacity-90">
              무료 상담을 통해 당신만의 전략을 들어보세요
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
