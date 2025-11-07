'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

interface CaseStudy {
  id: string;
  badge: string;
  title: string;
  description: string;
  result: string;
  icon: string;
  tags: string[];
}

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  cases: CaseStudy[];
}

const services: Service[] = [
  {
    id: 'alimony',
    title: '위자료',
    subtitle: '당신의 아픔을, 제대로 보상받도록',
    description: '이혼 초기에 증거의 흐름을 잡는 것이 가장 중요합니다',
    icon: '💰',
    color: 'blue',
    cases: [
      {
        id: 'alimony-1',
        badge: 'Case 01',
        title: '전업주부, 위자료 5억 승소',
        description: '철저한 증거 수집과 전략으로 최고 수준의 위자료를 확보했습니다. 경제적 기여도와 정신적 고통을 입증하여 의미 있는 결과를 만들었습니다.',
        result: '위자료 5억',
        icon: '💰',
        tags: ['증거 확보', '전략 수립'],
      },
      {
        id: 'alimony-2',
        badge: 'Case 02',
        title: '불륜 증거 부족, 2천만 원 확보',
        description: '제한된 증거에서도 전략적 접근으로 의미 있는 결과를 만들었습니다. 조정 과정에서 상대방의 약점을 파악하여 합리적 합의를 이끌어냈습니다.',
        result: '2천만 원',
        icon: '📋',
        tags: ['전략적 접근', '합의 도출'],
      },
    ],
  },
  {
    id: 'property',
    title: '재산분할',
    subtitle: '당신의 이혼 후의 삶을, 결정력 있게',
    description: '재산분할은 숫자의 문제가 아니라 전략의 문제입니다',
    icon: '🏠',
    color: 'emerald',
    cases: [
      {
        id: 'property-1',
        badge: 'Case 01',
        title: '재산분할 0원 방어 성공',
        description: '의뢰인의 재산을 완벽하게 보호한 방어 전략의 승리입니다. 상대방의 부당한 청구를 법리적으로 차단하여 재산을 지켜냈습니다.',
        result: '0원 방어',
        icon: '🛡️',
        tags: ['방어 전략', '재산 보호'],
      },
      {
        id: 'property-2',
        badge: 'Case 02',
        title: '은닉 재산 발견, 분할 비율 수정',
        description: '숨겨진 재산을 찾아내어 정당한 몫을 되찾았습니다. 체계적인 재산 조사와 추적으로 공정한 분할을 실현했습니다.',
        result: '은닉 재산 발견',
        icon: '🔍',
        tags: ['재산 추적', '비율 수정'],
      },
    ],
  },
  {
    id: 'custody',
    title: '양육권',
    subtitle: '우리 아이가, 제대로 클 수 있도록',
    description: '아이의 최선의 이익을 위한 치밀한 준비가 결과를 만듭니다',
    icon: '👶',
    color: 'amber',
    cases: [
      {
        id: 'custody-1',
        badge: 'Case 01',
        title: '양육권 다툼, 단독 양육권 확보',
        description: '아이의 최선의 이익을 위한 치밀한 준비가 결과를 만들었습니다. 양육 환경과 능력을 입증하여 단독 양육권을 쟁취했습니다.',
        result: '단독 양육권',
        icon: '👶',
        tags: ['환경 입증', '단독 양육'],
      },
      {
        id: 'custody-2',
        badge: 'Case 02',
        title: '폭력 배우자, 양육비 100% 인용',
        description: '아이의 안전과 경제적 보호를 동시에 확보했습니다. 폭력 사실을 입증하고 청구한 양육비 전액을 인용받았습니다.',
        result: '양육비 100%',
        icon: '⚖️',
        tags: ['안전 확보', '양육비 확보'],
      },
    ],
  },
];

export default function ServicesModule() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <p className="text-sm md:text-base text-gray-500 mb-4 tracking-widest uppercase">Services</p>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              전문 서비스
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 font-light">
              위자료, 재산분할, 양육권 모든 영역에서 최상의 결과를
            </p>
          </div>
        </ScrollReveal>

        {/* 서비스 탭 네비게이션 */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`
                  px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300
                  ${
                    activeService === index
                      ? 'bg-white text-black shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }
                `}
              >
                <span className="text-2xl mr-2">{service.icon}</span>
                <span className="text-base md:text-lg">{service.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 선택된 서비스 콘텐츠 */}
        <div className="relative">
          {services.map((service, serviceIndex) => (
            <div
              key={service.id}
              className={`
                transition-all duration-500
                ${activeService === serviceIndex ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}
              `}
            >
              {/* 서비스 설명 */}
              <div className="text-center mb-16 md:mb-20">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {service.subtitle}
                </h3>
                <p className="text-lg md:text-xl text-gray-300">
                  {service.description}
                </p>
              </div>

              {/* 사례 카드 그리드 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {service.cases.map((caseStudy, caseIndex) => (
                  <div
                    key={caseStudy.id}
                    className="group case-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
                    style={{
                      animationDelay: `${caseIndex * 0.1}s`,
                    }}
                  >
                    {/* 배지 */}
                    <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6">
                      <span className="text-blue-400 font-semibold text-sm">
                        {caseStudy.badge}
                      </span>
                    </div>

                    {/* 아이콘 */}
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-500">
                      {caseStudy.icon}
                    </div>

                    {/* 제목 */}
                    <h4 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {caseStudy.title}
                    </h4>

                    {/* 설명 */}
                    <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
                      {caseStudy.description}
                    </p>

                    {/* 결과 배지 */}
                    <div className="inline-flex items-center px-5 py-3 bg-white/10 rounded-full mb-6">
                      <span className="text-lg md:text-xl font-bold text-white">
                        {caseStudy.result}
                      </span>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-3">
                      {caseStudy.tags.map((tag) => (
                        <div key={tag} className="flex items-center gap-2">
                          <span className="text-blue-400">✓</span>
                          <span className="text-sm text-gray-400">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
