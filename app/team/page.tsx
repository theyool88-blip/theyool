'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';

export default function TeamPage() {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        {/* 참고 자료의 히어로 이미지 영역과 동일한 비율 */}
        <div className="relative w-full aspect-[4/5] md:aspect-[5/3]">
          {/* 배경 이미지 */}
          <Image
            src="/images/profile-lawyer-new.jpg"
            alt="임은지 변호사"
            fill
            className="object-cover"
            style={{ objectPosition: '35% center' }}
            priority
          />

          {/* 그라디언트 오버레이 - 오른쪽만 어둡게 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/15 to-black/35"></div>

          {/* 표어 텍스트 - 오른쪽 */}
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="pr-12 md:pr-20 lg:pr-28">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white md:[writing-mode:vertical-rl] tracking-tight md:tracking-[0.25em] leading-none drop-shadow-2xl" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                이혼의<br />진심
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* 철학 섹션 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="h-px w-24 bg-gray-300 mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 font-light">
                13년간 오직 이혼 사건만을 다뤄온 경험으로<br />
                의뢰인의 새로운 시작을 설계합니다
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                법무법인 더율은 이혼 사건에만 집중하여 축적한 노하우와 전략으로<br />
                최선의 결과를 만들어냅니다
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 변호사 프로필 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              임은지 이혼전문변호사
            </h2>
            <div className="h-px w-16 bg-blue-400 mx-auto"></div>
          </div>

          {/* 약력 정보 */}
          <div className="space-y-6 md:space-y-8">
            {/* 대한변호사협회 등록 */}
            <ScrollReveal delay={0}>
              <div className="bg-gradient-to-br from-blue-100/60 to-blue-50/40 rounded-2xl p-6 md:p-8 border border-blue-200/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="text-xl md:text-2xl">⚖️</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">대한변호사협회 등록</h3>
                </div>
                <p className="text-base md:text-lg text-blue-700 font-medium ml-14 md:ml-16">이혼전문변호사</p>
              </div>
            </ScrollReveal>

            {/* 학력 */}
            <ScrollReveal delay={100}>
              <div className="bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-2xl p-6 md:p-8 border border-blue-100/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-xl md:text-2xl">🎓</span>
                  학력
                </h3>
                <ul className="space-y-2 text-gray-700 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>연세대학교 졸업</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>숙명여고 졸업</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 현직 */}
            <ScrollReveal delay={200}>
              <div className="bg-gradient-to-br from-purple-50/50 to-blue-50/30 rounded-2xl p-6 md:p-8 border border-purple-100/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-xl md:text-2xl">💼</span>
                  현직
                </h3>
                <ul className="space-y-2 text-gray-700 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>법무법인 더율 평택분사무소 주재</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>경기도평택교육지원청 인사위원</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>평택시 임대주택 분쟁조정위원</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>안성경찰서 경미범죄심사위원</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>안성시 공직자윤리위원회 위원</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>주식회사 유앤미코스메틱 자문변호사</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>미디어팟 자문변호사</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* 전임 */}
            <ScrollReveal delay={300}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 md:p-8 border border-gray-200/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-default">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-xl md:text-2xl">📋</span>
                  전임
                </h3>
                <ul className="space-y-2 text-gray-700 text-base md:text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>대한변호사협회 대의원</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>대법원 국선변호인</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>서울도봉경찰서 수사민원센터 자문변호사</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>금천초등학교 고문변호사</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-500 mt-1">•</span>
                    <span>주식회사 한솔교육 고문변호사</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 위촉장 및 인증서 - 무한 슬라이드 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-12">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                위촉장 및 인증서
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                다양한 공공기관 및 기업의 자문 위촉을 받아 활동하고 있습니다
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 무한 슬라이드 컨테이너 */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll pointer-events-none">
            {/* 여러 세트 반복 (완전한 순환) */}
            {[...Array(4)].map((_, setIndex) => (
              [
                'certi-7', 'certi-6', 'certi-5', 'certi-3',
                'certi-2', 'certi-1', 'home-divorce-certi-3'
              ].map((cert, index) => (
                <div key={`set-${setIndex}-${index}`} className="flex-shrink-0 w-[160px] md:w-[180px]">
                  <div className="bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-xl p-3 border border-purple-100/50">
                    <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-sm">
                      <Image
                        src={`https://theyool-divorce.com/wp-content/uploads/2025/02/${cert}-212x300.jpg`}
                        alt={`${cert} 위촉장 및 인증서`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% / 4));
            }
          }
          .animate-scroll {
            animation: scroll 10s linear infinite;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1200px] px-6 md:px-12 mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                13년간의 경험과 노하우로<br />
                여러분의 새로운 시작을 돕겠습니다
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-2xl mx-auto">
                이혼은 끝이 아닌 새로운 시작입니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:1661-7633"
                  className="inline-flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-sm md:text-base"
                >
                  상담 문의하기
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
