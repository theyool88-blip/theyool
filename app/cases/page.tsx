'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';

export default function CasesPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              성공사례
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              더율이 만들어낸 승리의 기록들
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 성공사례 섹션 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-6">
                95% 승소율의 비밀
              </h2>
              <p className="text-xl text-[var(--gray-600)] max-w-3xl mx-auto">
                체계적인 준비와 전략, 그리고 의뢰인과의 소통으로 만들어낸 결과입니다
              </p>
            </div>
          </ScrollReveal>

          {/* 임시 콘텐츠 - Phase 3에서 실제 케이스로 대체 */}
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="card-glass p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 rounded-full text-sm font-bold">
                      승소
                    </div>
                    <div className="text-sm text-[var(--gray-500)]">
                      2024년 {index}월
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                    사건 #{index} - 위자료 청구 소송
                  </h3>
                  <p className="text-base text-[var(--gray-700)] leading-relaxed mb-6">
                    상대방의 부정행위로 인한 이혼 소송에서 의뢰인의 권리를
                    최대한 보호하고, 합당한 위자료를 받아낸 사례입니다.
                  </p>
                  <div className="border-t border-[var(--gray-200)] pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[var(--gray-600)]">소송 유형</span>
                      <span className="font-semibold text-[var(--primary)]">위자료 청구</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming Soon 메시지 */}
          <ScrollReveal delay={500}>
            <div className="mt-16 text-center p-12 bg-[var(--gray-50)] rounded-2xl">
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                더 많은 성공사례 준비중
              </h3>
              <p className="text-base text-[var(--gray-600)] max-w-2xl mx-auto">
                의뢰인의 개인정보 보호를 위해 세심하게 준비 중입니다.
                곧 더 많은 성공사례를 만나보실 수 있습니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              당신의 사건도<br />
              성공사례로 만들겠습니다
            </h2>
            <p className="text-xl mb-12 opacity-90">
              30분 무료 상담으로 당신의 사건을 분석해드립니다
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
