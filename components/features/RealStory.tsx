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
    result: '상간자 손해배상 청구 승소',
    bgColor: 'from-red-100 via-rose-50 to-pink-50',
    textColor: 'text-gray-800',
    caseId: 'adultery-case-01', // 나중에 실제 케이스 ID로 변경
  },
  {
    id: 'alimony',
    title: '위자료',
    subtitle: '새로운 시작을 위한 첫걸음',
    story: '20년을 함께한 결혼 생활이 끝났지만,\nA씨는 포기하지 않았습니다.\n배우자의 불륜과 정신적 학대로 인한 고통을\n치밀한 증거 수집으로 입증했고,\n5억원의 위자료 확보로\n새로운 인생의 든든한 기반을 마련할 수 있었습니다.',
    result: '위자료 5억원 확보',
    bgColor: 'from-pink-100 via-purple-50 to-blue-50',
    textColor: 'text-gray-800',
    caseId: 'alimony-case-01', // 나중에 실제 케이스 ID로 변경
  },
  {
    id: 'property',
    title: '재산분할',
    subtitle: '정당한 몫을 되찾다',
    story: 'B씨는 결혼 생활 동안\n배우자가 은닉한 재산을 추적했습니다.\n체계적인 재산 조사와 전략적 접근으로\n숨겨진 부동산과 금융자산을 찾아냈고,\n공정한 재산분할을 통해\n경제적 자립의 토대를 세웠습니다.',
    result: '은닉 재산 발견 및 공정한 분할',
    bgColor: 'from-green-100 via-emerald-50 to-teal-50',
    textColor: 'text-gray-800',
    caseId: 'property-case-01', // 나중에 실제 케이스 ID로 변경
  },
  {
    id: 'custody',
    title: '양육권',
    subtitle: '아이의 미래를 지키다',
    story: 'C씨는 아이의 안전과 행복을\n최우선으로 생각했습니다.\n폭력적인 배우자로부터 아이를 보호하기 위해\n철저한 증거를 확보했고,\n단독 양육권과 함께 양육비 전액을 인용받아\n아이가 안정적으로 성장할 수 있는\n환경을 만들었습니다.',
    result: '단독 양육권 + 양육비 100% 인용',
    bgColor: 'from-amber-100 via-yellow-50 to-orange-50',
    textColor: 'text-gray-800',
    caseId: 'custody-case-01', // 나중에 실제 케이스 ID로 변경
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 섹션이 뷰포트에 있을 때만 계산
      if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        const relativeScroll = scrollY - sectionTop + windowHeight / 2;
        const sectionProgress = relativeScroll / sectionHeight;

        // 스크롤 진행도에 따라 탭 변경 (4개 탭)
        if (sectionProgress < 0.25) {
          setActiveTab(0);
        } else if (sectionProgress < 0.5) {
          setActiveTab(1);
        } else if (sectionProgress < 0.75) {
          setActiveTab(2);
        } else {
          setActiveTab(3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[400vh] bg-white">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title */}
        <div className="absolute top-20 left-0 right-0 z-10">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
            <p className="text-xs md:text-sm text-pink-600/70 mb-3 tracking-[0.2em] uppercase">Real Story</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
              실제 고객 이야기
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-light">더율과 함께한 새로운 시작</p>
          </div>
        </div>

        {/* Tab Navigation - Below Title with more space */}
        <div className="absolute top-52 left-0 right-0 z-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="flex justify-center gap-8 md:gap-12">
              {stories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-sm md:text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    activeTab === index
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {story.title}
                </button>
              ))}
            </div>
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
              {/* Background - Images with pastel overlays */}
              {story.id === 'adultery' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/adultery-bg.png"
                      alt="상간 배경"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Pastel pink/rose gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-rose-50/75 to-red-50/70" />
                  {/* Additional white overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/20" />
                </>
              ) : story.id === 'alimony' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/alimony-bg.png"
                      alt="위자료 배경"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Pastel purple/lavender gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-lavender-50/75 to-blue-50/70" />
                  {/* Additional white overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/20" />
                </>
              ) : story.id === 'property' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/property-bg.png"
                      alt="재산분할 배경"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Pastel green/mint gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-teal-50/75 to-cyan-50/70" />
                  {/* Additional white overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/20" />
                </>
              ) : story.id === 'custody' ? (
                <>
                  <div className="absolute inset-0">
                    <Image
                      src="/images/custody-bg.png"
                      alt="양육권 배경"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Pastel orange/peach gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/75 to-yellow-50/70" />
                  {/* Additional white overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/20" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${story.bgColor}`} />
              )}

              {/* Content - Perfect centering */}
              <div className="relative h-full flex items-center justify-center pt-48 pb-24">
                <div className="max-w-[600px] w-full px-6 md:px-12 mx-auto">
                  <div className="text-center">
                    <h3 className={`text-2xl md:text-4xl font-bold ${story.textColor} mb-4 md:mb-6`}>
                      {story.subtitle}
                    </h3>
                    <p className={`text-base md:text-xl ${story.textColor} mb-8 md:mb-12 leading-relaxed opacity-90 whitespace-pre-line`}>
                      {story.story}
                    </p>
                    <div className="space-y-4">
                      <div className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-gray-200/50">
                        <p className={`text-sm md:text-lg font-bold ${story.textColor}`}>
                          결과: {story.result}
                        </p>
                      </div>

                      {/* 자세히 보기 버튼 */}
                      <div>
                        <Link
                          href={`/cases/${story.caseId}`}
                          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          자세히 보기
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder for future image */}
              <div className="absolute bottom-12 right-12 opacity-20">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-white/30 rounded-full backdrop-blur-sm" />
              </div>
            </div>
          ))}

          {/* Navigation Arrows - Simple Style */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-300 hover:opacity-70"
            aria-label="이전 스토리"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-300 hover:opacity-70"
            aria-label="다음 스토리"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
