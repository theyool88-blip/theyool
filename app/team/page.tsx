'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';

export default function TeamPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
              구성원 소개
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              이혼 전문, 오직 한 가지에만 집중하는 전문가들
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 대표 변호사 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              대표 변호사
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-[400px_1fr] gap-12 items-start">
            <ScrollReveal delay={100}>
              <div className="card-glass p-8">
                <div className="aspect-[3/4] bg-[var(--gray-200)] rounded-2xl mb-6 flex items-center justify-center">
                  <div className="text-center text-[var(--gray-500)]">
                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p>대표 변호사 프로필 사진</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-2">
                    대표 변호사 성함
                  </h3>
                  <p className="text-base text-[var(--gray-600)]">
                    법무법인 더율 대표
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                    💼 주요 경력
                  </h3>
                  <ul className="space-y-3 text-[var(--gray-700)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>현 법무법인 더율 대표 변호사</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>전 △△법률사무소 이혼 전문 변호사</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>이혼 전문 변호사 경력 10년+</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>이혼 소송 승소율 95% 이상</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                    🎓 학력 및 자격
                  </h3>
                  <ul className="space-y-3 text-[var(--gray-700)]">
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>서울대학교 법학전문대학원 졸업</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>제XX회 변호사시험 합격</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>대한변호사협회 정회원</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                    ⚖️ 전문 분야
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['이혼소송', '재산분할', '위자료', '양육권', '상간사건', '이혼협의'].map((field, index) => (
                      <span
                        key={index}
                        className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full font-semibold text-sm"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[var(--gray-50)] p-8 rounded-2xl">
                  <h3 className="text-xl font-bold text-[var(--primary)] mb-4">
                    💬 대표 변호사 한마디
                  </h3>
                  <p className="text-base text-[var(--gray-700)] leading-relaxed italic">
                    "이혼은 끝이 아니라 새로운 시작입니다. 저는 단순히 소송에서 이기는 것을 넘어,
                    의뢰인이 이혼 후에도 행복한 삶을 살 수 있도록 돕는 것을 목표로 합니다.
                    10년 이상 이혼 사건만을 전담해온 경험으로, 당신의 다음 인생을 위한
                    최선의 전략을 제시하겠습니다."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 소속 변호사 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              소속 변호사
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: '소속 변호사 1',
                title: '변호사',
                specialty: '재산분할 전문',
                experience: '5년 경력',
              },
              {
                name: '소속 변호사 2',
                title: '변호사',
                specialty: '양육권 전문',
                experience: '7년 경력',
              },
              {
                name: '소속 변호사 3',
                title: '변호사',
                specialty: '위자료 전문',
                experience: '4년 경력',
              },
            ].map((member, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="card-glass p-8 text-center">
                  <div className="aspect-square bg-[var(--gray-200)] rounded-2xl mb-6 flex items-center justify-center mx-auto max-w-[280px]">
                    <svg className="w-24 h-24 text-[var(--gray-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--primary)] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-base text-[var(--gray-600)] mb-4">
                    {member.title}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-[var(--accent)] font-semibold">
                      {member.specialty}
                    </p>
                    <p className="text-sm text-[var(--gray-600)]">
                      {member.experience}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 팀 철학 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              더율의 철학
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <ScrollReveal delay={100}>
              <div className="text-center p-8">
                <div className="text-6xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  전문성
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  형사도, 민사도 하지 않습니다.<br />
                  오직 이혼과 상간사건만 다룹니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center p-8">
                <div className="text-6xl mb-6">💙</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  공감
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  의뢰인의 이야기를 끝까지 경청하고,<br />
                  진심으로 공감합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="text-center p-8">
                <div className="text-6xl mb-6">🤝</div>
                <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                  책임
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  소송이 끝나도 끝이 아닙니다.<br />
                  이혼 후의 삶까지 함께합니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 왜 더율을 선택해야 하는가 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-[var(--gray-50)]">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-16 text-center">
              왜 더율을 선택해야 하는가?
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={100}>
              <div className="card-glass p-10">
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-6">
                  10년 이상 이혼 전문 경력
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  이혼 사건만 10년 이상 전담해온 경험으로, 어떤 복잡한 사건도 해결할 수 있는 노하우를 갖추고 있습니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="card-glass p-10">
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-6">
                  승소율 95% 이상
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  높은 승소율은 전문성의 증거입니다. 체계적인 준비와 전략으로 최선의 결과를 만들어냅니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="card-glass p-10">
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-6">
                  투명한 소통
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  실시간 카카오톡 채널로 언제든 변호사와 직접 소통할 수 있으며, 모든 법률문서를 즉시 확인하실 수 있습니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="card-glass p-10">
                <h3 className="text-2xl font-bold text-[var(--accent)] mb-6">
                  이혼 후 케어
                </h3>
                <p className="text-base text-[var(--gray-700)] leading-relaxed">
                  소송이 끝나도 끝이 아닙니다. 양육비 미지급 대응, 면접교섭권 조정 등 이혼 후 문제도 계속 지원합니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-12 gradient-hero text-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              지금 바로 전문가와<br />
              상담하세요
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
