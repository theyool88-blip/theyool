'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';
import { FAQ } from '@/lib/supabase/faq';

// 변호사 정보 타입
interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  education: string[];
  currentPositions: string[];
  previousPositions: string[];
  image?: string;
  certificates?: string[];
  isRepresentative?: boolean;
  experience?: string;
  motto?: string;
}

interface TeamPageClientProps {
  lawyers: LawyerProfile[];
  faqs: FAQ[];
}

export default function TeamPageClient({ lawyers, faqs }: TeamPageClientProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  return (
    <>
      {/* Hero Section - 팀 전체 소개 */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="text-center text-white">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                법무법인 더율 구성원
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-white/90">
                15년 이상의 이혼 전문 경험을 가진 전문가 팀이에요
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <p className="text-3xl font-bold">2,500+</p>
                  <p className="text-sm text-white/80">누적 상담 건수</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-sm text-white/80">승소율</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                  <p className="text-3xl font-bold">15년+</p>
                  <p className="text-sm text-white/80">전문 경력</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 법인 철학 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                우리의 철학
              </h2>
              <div className="h-px w-24 bg-gray-300 mx-auto mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8">
                "이혼은 끝이 아닌 새로운 시작입니다"
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                법무법인 더율은 단순한 법률 서비스를 넘어, 의뢰인의 새로운 삶을 설계하는
                동반자가 되고자 합니다. 15년 이상 오직 이혼 사건만을 다루며 축적한
                전문성과 노하우로 최선의 결과를 만들어냅니다.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 변호사 프로필 섹션 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                전문 변호사진
              </h2>
              <p className="text-lg text-gray-600">
                각 분야별 전문 변호사가 의뢰인을 위해 최선을 다합니다
              </p>
            </div>
          </ScrollReveal>

          {/* 변호사 카드 목록 */}
          <div className="space-y-20">
            {lawyers.map((lawyer, index) => (
              <ScrollReveal key={lawyer.id} delay={index * 100}>
                <div className={`${lawyer.isRepresentative ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200' : 'bg-white border border-gray-200'} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  {/* 변호사 헤더 */}
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      {/* 프로필 이미지 */}
                      <div className="relative w-full md:w-64 h-80 md:h-96 flex-shrink-0">
                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                          {lawyer.image && (
                            <Image
                              src={lawyer.image}
                              alt={`${lawyer.name} 변호사`}
                              fill
                              className="object-cover"
                              priority={lawyer.isRepresentative}
                            />
                          )}
                          {lawyer.isRepresentative && (
                            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              대표변호사
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 변호사 정보 */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            {lawyer.name} {lawyer.title}
                          </h3>
                          {lawyer.experience && (
                            <p className="text-lg text-blue-600 font-semibold mb-3">
                              경력 {lawyer.experience}
                            </p>
                          )}
                          {lawyer.motto && (
                            <p className="text-lg text-gray-600 italic">
                              "{lawyer.motto}"
                            </p>
                          )}
                        </div>

                        {/* 전문 분야 */}
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>⚡</span> 전문 분야
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {lawyer.specialties.map((specialty, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 학력 */}
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎓</span> 학력
                          </h4>
                          <ul className="space-y-1">
                            {lawyer.education.map((edu, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 현직 */}
                        <div className="mb-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span>💼</span> 현직
                          </h4>
                          <ul className="space-y-1">
                            {lawyer.currentPositions.slice(0, 5).map((position, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{position}</span>
                              </li>
                            ))}
                            {lawyer.currentPositions.length > 5 && (
                              <li className="text-gray-500 italic">
                                외 {lawyer.currentPositions.length - 5}개 직책
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* 전임 */}
                        {lawyer.previousPositions.length > 0 && (
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <span>📋</span> 주요 경력
                            </h4>
                            <ul className="space-y-1">
                              {lawyer.previousPositions.slice(0, 3).map((position, idx) => (
                                <li key={idx} className="text-gray-600 flex items-start gap-2">
                                  <span className="text-gray-400 mt-1">•</span>
                                  <span>{position}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 위촉장 및 인증서 (있는 경우) */}
                  {lawyer.certificates && lawyer.certificates.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 p-8">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">위촉장 및 인증서</h4>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {lawyer.certificates.slice(0, 6).map((cert, idx) => (
                          <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white shadow-sm">
                            <Image
                              src={`https://theyool-divorce.com/wp-content/uploads/2025/02/${cert}-212x300.jpg`}
                              alt={`${cert} 인증서`}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 변호사 선임 FAQ 섹션 */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                변호사 선임 관련 FAQ
              </h2>
              <p className="text-lg text-gray-600">
                법률 지원과 변호사 선임에 대한 자주 묻는 질문들
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.slice(0, 8).map((faq, index) => (
              <ScrollReveal key={faq.id} delay={index * 50}>
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-amber-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                    <span className="text-amber-500 flex-shrink-0 mt-1">Q.</span>
                    {faq.question}
                  </h3>
                  {faq.summary && (
                    <p className="text-gray-600 leading-relaxed pl-7">
                      {faq.summary}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              더 많은 FAQ 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* 팀 성과 및 통계 */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                법무법인 더율의 성과
              </h2>
              <p className="text-lg text-gray-300">
                숫자로 보는 우리의 전문성과 신뢰도
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollReveal delay={0}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">15+</p>
                <p className="text-sm md:text-base text-gray-300">년 전문 경력</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">2,500+</p>
                <p className="text-sm md:text-base text-gray-300">성공 사례</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">92%</p>
                <p className="text-sm md:text-base text-gray-300">승소율</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">24H</p>
                <p className="text-sm md:text-base text-gray-300">긴급 상담 가능</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-[1200px] px-6 md:px-12 mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                전문 변호사와 함께<br />
                새로운 시작을 준비하세요
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
                15년 이상의 경험과 전문성을 바탕으로<br />
                의뢰인에게 최적의 해결책을 제시합니다
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <ConsultationButton
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-base md:text-lg"
                />
                <a
                  href="tel:1661-7633"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-base md:text-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  전화 상담: 1661-7633
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
