'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const stories = [
  {
    id: 'adultery',
    title: '상간',
    subtitle: '배신에 대한 정당한 대가',
    story: 'D씨는 배우자의 불륜 사실을\n확인한 후 냉철하게 대응했습니다.\n상간자를 상대로 한 손해배상 청구에서\n명확한 증거를 바탕으로\n상당한 금액의 배상을 받아내며\n심리적 상처에 대한 정당한 보상을 받았습니다.',
    result: '상간자 손해배상 8천만원 확보',
    outcome: '그리고 1년 후, 새 직장에서 행복 찾음',
    bgColor: 'from-red-100 via-rose-50 to-pink-50',
    textColor: 'text-gray-800',
    caseId: 'adultery-case-01',
  },
  {
    id: 'alimony',
    title: '위자료',
    subtitle: '새로운 시작을 위한 첫걸음',
    story: '20년을 함께한 결혼 생활이 끝났지만,\nA씨는 포기하지 않았습니다.\n배우자의 불륜과 정신적 학대로 인한 고통을\n치밀한 증거 수집으로 입증했고,\n5억원의 위자료 확보로\n새로운 인생의 든든한 기반을 마련할 수 있었습니다.',
    result: '위자료 5천만원 → 2억 확보',
    outcome: '그리고 지금은 안정적인 자영업으로 재기',
    bgColor: 'from-pink-100 via-purple-50 to-blue-50',
    textColor: 'text-gray-800',
    caseId: 'alimony-case-01',
  },
  {
    id: 'property',
    title: '재산분할',
    subtitle: '정당한 몫을 되찾다',
    story: 'B씨는 결혼 생활 동안\n배우자가 은닉한 재산을 추적했습니다.\n체계적인 재산 조사와 전략적 접근으로\n숨겨진 부동산과 금융자산을 찾아냈고,\n공정한 재산분할을 통해\n경제적 자립의 토대를 세웠습니다.',
    result: '은닉 재산 3억 발견 → 60% 획득',
    outcome: '그리고 자녀 교육비 걱정 없이 새 출발',
    bgColor: 'from-green-100 via-emerald-50 to-teal-50',
    textColor: 'text-gray-800',
    caseId: 'property-case-01',
  },
  {
    id: 'custody',
    title: '양육권',
    subtitle: '아이의 미래를 지키다',
    story: 'C씨는 아이의 안전과 행복을\n최우선으로 생각했습니다.\n폭력적인 배우자로부터 아이를 보호하기 위해\n철저한 증거를 확보했고,\n단독 양육권과 함께 양육비 전액을 인용받아\n아이가 안정적으로 성장할 수 있는\n환경을 만들었습니다.',
    result: '단독 양육권 + 월 120만원 양육비',
    outcome: '그리고 아이는 이제 밝은 웃음을 되찾음',
    bgColor: 'from-amber-100 via-yellow-50 to-orange-50',
    textColor: 'text-gray-800',
    caseId: 'custody-case-01',
  },
];

export default function RealStory() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  // 스크롤에 따른 자동 탭 전환 효과
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const sectionHeight = rect.height;
          const viewportHeight = window.innerHeight;

          // 섹션 시작점 대비 현재 스크롤 위치
          const scrolledPast = -rect.top;

          // 섹션 내에서의 진행도 계산 (0~1)
          const scrollProgress = Math.max(0, Math.min(1,
            scrolledPast / (sectionHeight - viewportHeight)
          ));

          // 탭 전환 시점 정의
          // 0% ~ 25%: 첫 번째 스토리
          // 25% ~ 50%: 두 번째 스토리
          // 50% ~ 75%: 세 번째 스토리
          // 75% ~ 100%: 네 번째 스토리
          if (scrollProgress < 0.25) {
            setActiveTab(0);
          } else if (scrollProgress < 0.5) {
            setActiveTab(1);
          } else if (scrollProgress < 0.75) {
            setActiveTab(2);
          } else {
            setActiveTab(3);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 실행
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-b from-white via-white to-purple-50/50 overflow-hidden">
      {/* Top gradient transition from ThePlanHighlight */}
      <div className="absolute top-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-b from-white via-white/95 to-transparent pointer-events-none z-[5]" />

      {/* Container */}
      <div className="relative h-screen">
        {/* Title */}
        <div className="absolute top-12 md:top-16 left-0 right-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
            <p className="text-xs md:text-sm text-sage-600/70 mb-2 tracking-[0.2em] uppercase">Real Story</p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              실제 고객 이야기
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-light">더율과 함께한 새로운 시작</p>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative h-full">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeTab === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background - Pastel gradients */}
              {story.id === 'adultery' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/adultery-bg.png"
                      alt="상간 배경"
                      fill
                      className="object-cover"
                      priority={activeTab === 0}
                      loading={activeTab === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {/* Pastel pink/rose gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/85 via-rose-50/80 to-red-50/75" />
                </>
              ) : story.id === 'alimony' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/alimony-bg.png"
                      alt="위자료 배경"
                      fill
                      className="object-cover"
                      priority={activeTab === 1}
                      loading={activeTab === 1 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {/* Pastel purple/lavender gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/85 via-lavender-50/80 to-blue-50/75" />
                </>
              ) : story.id === 'property' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/property-bg.png"
                      alt="재산분할 배경"
                      fill
                      className="object-cover"
                      priority={activeTab === 2}
                      loading={activeTab === 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {/* Pastel green/mint gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/85 via-teal-50/80 to-cyan-50/75" />
                </>
              ) : story.id === 'custody' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/custody-bg.png"
                      alt="양육권 배경"
                      fill
                      className="object-cover"
                      priority={activeTab === 3}
                      loading={activeTab === 3 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {/* Pastel orange/peach gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/85 via-orange-50/80 to-yellow-50/75" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${story.bgColor}`} />
              )}

              {/* Tab Navigation - Inside card area */}
              <div className="absolute top-40 md:top-48 left-0 right-0 z-20">
                <div className="max-w-[900px] mx-auto px-6 md:px-8">
                  <div className="flex justify-center gap-2 md:gap-4">
                    {stories.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveTab(i)}
                        className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 backdrop-blur-md border ${
                          activeTab === i
                            ? 'bg-white/95 text-gray-900 shadow-lg border-gray-200/50'
                            : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:text-gray-900 shadow-sm border-white/40'
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content - Direct on background */}
              <div className="relative h-full flex items-center justify-center pt-72 md:pt-80 pb-16 md:pb-20">
                <div className="max-w-[900px] w-full px-6 md:px-8 mx-auto">
                  <div className="text-center">
                    {/* Story Title - with text shadow for readability */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight drop-shadow-sm">
                      {story.subtitle}
                    </h3>

                    {/* Story Content - with subtle text shadow */}
                    <div className="mb-8 md:mb-10">
                      <p className="text-base md:text-lg text-gray-800 leading-relaxed md:leading-loose whitespace-pre-line drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                        {story.story}
                      </p>
                    </div>

                    {/* Result Badge - Unified Sage green brand color */}
                    <div className="flex justify-center mb-6 md:mb-8">
                      <div className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 backdrop-blur-md rounded-2xl shadow-lg bg-gradient-to-br from-sage-600/90 to-sage-700/85">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm md:text-base lg:text-lg font-bold text-white">
                          {story.result}
                        </p>
                      </div>
                    </div>

                    {/* Outcome Text - with text shadow */}
                    <p className="text-sm md:text-base text-gray-800 mb-8 md:mb-10 italic drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
                      {story.outcome}
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                      <Link
                        href={`/cases/${story.caseId}`}
                        className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-sage-600 hover:bg-sage-700 text-white rounded-full font-semibold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                      >
                        자세히 보기
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows - Sage green ghost buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-3.5 bg-sage-600/20 hover:bg-sage-600/40 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
            aria-label="이전 스토리"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-sage-800 group-hover:text-sage-900 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 md:p-3.5 bg-sage-600/20 hover:bg-sage-600/40 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
            aria-label="다음 스토리"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-sage-800 group-hover:text-sage-900 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom gradient transition to InstaTheyoolSection */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-b from-transparent via-purple-50/30 to-purple-50/60 pointer-events-none z-[5]" />
    </section>
  );
}
