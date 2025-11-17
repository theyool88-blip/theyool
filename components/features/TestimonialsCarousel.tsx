'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: '김○○',
    role: '재산분할 의뢰인',
    rating: 5,
    content: '처음에는 막막했지만, 더율의 전략적인 접근으로 예상보다 훨씬 좋은 결과를 얻었습니다. 특히 재산분할에서 숨겨진 재산을 찾아내 주셔서 정말 감사합니다.',
    result: '은닉 재산 발견 + 공정한 분할',
    initial: '김',
    bgColor: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-700'
  },
  {
    id: 2,
    name: '이○○',
    role: '양육권 의뢰인',
    rating: 5,
    content: '양육권 다툼으로 힘든 시기를 보냈는데, 변호사님의 따뜻한 위로와 체계적인 준비 덕분에 단독 양육권을 확보할 수 있었습니다. 진심으로 감사드립니다.',
    result: '단독 양육권 확보',
    initial: '이',
    bgColor: 'from-amber-100 to-amber-200',
    textColor: 'text-amber-700'
  },
  {
    id: 3,
    name: '박○○',
    role: '위자료 의뢰인',
    rating: 5,
    content: '위자료 청구에서 증거가 부족하다고 생각했지만, 더율은 제가 놓친 부분까지 세심하게 챙겨주셨습니다. 5억 원이라는 결과는 상상도 못했습니다.',
    result: '위자료 5억원 확보',
    initial: '박',
    bgColor: 'from-pink-100 to-pink-200',
    textColor: 'text-pink-700'
  },
  {
    id: 4,
    name: '최○○',
    role: '협의이혼 의뢰인',
    rating: 5,
    content: '배우자와 원만하게 합의하고 싶었는데, 변호사님 덕분에 양쪽 모두 만족할 수 있는 조건으로 이혼할 수 있었습니다. 협상력이 정말 대단하십니다.',
    result: '3개월 만에 원만한 합의',
    initial: '최',
    bgColor: 'from-green-100 to-green-200',
    textColor: 'text-green-700'
  },
  {
    id: 5,
    name: '정○○',
    role: '상간 손해배상 의뢰인',
    rating: 5,
    content: '상간자를 상대로 한 소송이 처음이라 두려웠지만, 전문적인 조언과 철저한 증거 준비로 승소할 수 있었습니다. 배신에 대한 정당한 대가를 받았습니다.',
    result: '상간자 손해배상 2억원',
    initial: '정',
    bgColor: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-700'
  },
  {
    id: 6,
    name: '강○○',
    role: '재판이혼 의뢰인',
    rating: 5,
    content: '배우자가 협의를 거부해서 재판까지 가게 됐는데, 변호사님의 치밀한 준비와 강력한 변론으로 제가 원하는 모든 조건을 얻어낼 수 있었습니다.',
    result: '위자료 + 재산분할 + 양육권 모두 승소',
    initial: '강',
    bgColor: 'from-indigo-100 to-indigo-200',
    textColor: 'text-indigo-700'
  },
  {
    id: 7,
    name: '윤○○',
    role: '양육비 청구 의뢰인',
    rating: 5,
    content: '양육비를 제대로 받지 못해 고통받고 있었는데, 법적 절차를 통해 밀린 양육비와 함께 앞으로의 양육비도 확실하게 받을 수 있게 되었습니다.',
    result: '미지급 양육비 전액 + 이행명령',
    initial: '윤',
    bgColor: 'from-rose-100 to-rose-200',
    textColor: 'text-rose-700'
  },
  {
    id: 8,
    name: '한○○',
    role: '재산분할 의뢰인',
    rating: 5,
    content: '상대방이 재산을 숨기고 있다는 것을 알고 있었지만 증명할 방법이 없었습니다. 더율의 체계적인 재산 조사로 숨겨진 부동산까지 모두 찾아냈습니다.',
    result: '은닉 부동산 3건 발견',
    initial: '한',
    bgColor: 'from-teal-100 to-teal-200',
    textColor: 'text-teal-700'
  },
  {
    id: 9,
    name: '서○○',
    role: '위자료 의뢰인',
    rating: 5,
    content: '경제적으로 어려운 상황이었지만, 분납 제도를 활용해 법률 서비스를 받을 수 있었고, 위자료로 새로운 삶을 시작할 수 있는 기반을 마련했습니다.',
    result: '위자료 3억원 확보',
    initial: '서',
    bgColor: 'from-cyan-100 to-cyan-200',
    textColor: 'text-cyan-700'
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  // 현재 표시할 3개 선택
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            의뢰인의 목소리
          </h2>
          <p className="text-base md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            직접 경험하신 분들의 진솔한 이야기입니다
          </p>
        </div>

        {/* 캐러셀 컨테이너 */}
        <div className="relative">
          {/* 이전/다음 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
            aria-label="이전 후기"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 p-2 md:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= testimonials.length - 3}
            aria-label="다음 후기"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 후기 카드 그리드 */}
          <div className="grid md:grid-cols-3 gap-8 transition-all duration-500">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* 별점 */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>

                {/* 후기 내용 */}
                <p className="text-gray-700 mb-4 leading-relaxed min-h-[120px]">
                  "{testimonial.content}"
                </p>

                {/* 결과 배지 */}
                {testimonial.result && (
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      {testimonial.result}
                    </span>
                  </div>
                )}

                {/* 의뢰인 정보 */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.bgColor} rounded-full flex items-center justify-center`}>
                    <span className={`${testimonial.textColor} font-bold text-lg`}>{testimonial.initial}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${index + 1}번째 후기 그룹 보기`}
              />
            ))}
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</p>
            <p className="text-sm text-gray-600">고객 만족도</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">1,200+</p>
            <p className="text-sm text-gray-600">누적 의뢰인</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">87%</p>
            <p className="text-sm text-gray-600">평균 승소율</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4.8/5</p>
            <p className="text-sm text-gray-600">평점</p>
          </div>
        </div>
      </div>
    </section>
  );
}
