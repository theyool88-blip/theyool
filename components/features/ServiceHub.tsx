'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  stats: string;
  color: string;
  bgGradient: string;
}

const services: Service[] = [
  {
    id: 'alimony',
    icon: '💰',
    title: '위자료',
    subtitle: '당신의 아픔을, 제대로 보상받도록',
    description: '이혼 초기에 증거의 흐름을 잡는 것이 가장 중요합니다. 철저한 증거 수집과 전략으로 최고 수준의 위자료를 확보합니다.',
    stats: '평균 3억원 이상 확보',
    color: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
  },
  {
    id: 'property',
    icon: '🏠',
    title: '재산분할',
    subtitle: '당신의 이혼 후의 삶을, 결정력 있게',
    description: '재산분할은 숫자의 문제가 아니라 전략의 문제입니다. 은닉 재산 추적부터 방어 전략까지 완벽하게 대응합니다.',
    stats: '은닉 재산 발견율 95%',
    color: 'from-emerald-500 to-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100',
  },
  {
    id: 'custody',
    icon: '👶',
    title: '양육권',
    subtitle: '우리 아이가, 제대로 클 수 있도록',
    description: '아이의 최선의 이익을 위한 치밀한 준비가 결과를 만듭니다. 양육 환경 입증부터 양육비 확보까지 완벽 지원합니다.',
    stats: '단독 양육권 확보율 90%',
    color: 'from-amber-500 to-amber-600',
    bgGradient: 'from-amber-50 to-amber-100',
  },
];

export default function ServiceHub() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1200px] mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm md:text-base text-gray-500 mb-4 tracking-widest uppercase">Services</p>
          <h2 className="text-4xl md:text-6xl font-bold text-[var(--primary)] mb-6 tracking-tight">
            어떤 도움이 필요하신가요?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            더율은 위자료, 재산분할, 양육권 모든 영역에서<br className="hidden md:block" />
            최상의 결과를 만들어냅니다
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card group relative"
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Link href={`#${service.id}`} className="block">
                <div
                  className={`
                    relative overflow-hidden rounded-3xl p-8 md:p-10
                    bg-white border-2 border-gray-200
                    hover:border-gray-300 hover:shadow-2xl
                    transition-all duration-500
                    ${hoveredId === service.id ? 'transform scale-105' : ''}
                  `}
                >
                  {/* 배경 그라디언트 - 호버 시 나타남 */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-br ${service.bgGradient}
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    `}
                  />

                  {/* 컨텐츠 */}
                  <div className="relative z-10">
                    {/* 아이콘 */}
                    <div className="text-6xl md:text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      {service.icon}
                    </div>

                    {/* 제목 */}
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-3 group-hover:text-black transition-colors">
                      {service.title}
                    </h3>

                    {/* 서브타이틀 */}
                    <p className="text-base md:text-lg text-gray-600 mb-6 font-medium group-hover:text-gray-700 transition-colors">
                      {service.subtitle}
                    </p>

                    {/* 설명 - 호버 시에만 표시 */}
                    <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
                      <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* 통계 배지 */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 group-hover:bg-white rounded-full transition-colors">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-xs md:text-sm font-semibold text-gray-700">
                        {service.stats}
                      </span>
                    </div>

                    {/* 화살표 - 호버 시 표시 */}
                    <div className="mt-6 flex items-center text-[var(--primary)] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                      <span className="text-sm font-semibold mr-2">자세히 보기</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-gray-600 mb-6">어떤 상황이든, 더율이 함께합니다</p>
          <Link
            href="#services"
            className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-full hover:bg-black transition-colors duration-300"
          >
            모든 서비스 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
