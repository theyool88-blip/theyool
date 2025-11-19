'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  client_name: string;
  client_initial: string;
  client_role: string;
  case_result: string;
  case_date: string;
  content: string;
  rating: number;
  verified: boolean;
  avatar_bg_color: string;
  avatar_text_color: string;
}

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 데이터베이스에서 후기 로드
  useEffect(() => {
    async function loadTestimonials() {
      try {
        const response = await fetch('/api/testimonials?limit=9');
        const result = await response.json();

        if (result.data) {
          setTestimonials(result.data);
        }
      } catch (error) {
        console.error('후기 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, testimonials.length - 3) : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= testimonials.length - 3 ? 0 : prev + 1));
  };

  // 현재 표시할 3개 선택
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  // 로딩 상태
  if (loading) {
    return (
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600">후기를 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  // 데이터 없음
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">
            Client Reviews
          </p>
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
                className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300 animate-fadeIn"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* 헤더 - 날짜 + 검증 배지 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {testimonial.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-medium text-green-700">검증됨</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">{testimonial.case_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-amber-400 text-lg">★</span>
                    ))}
                  </div>
                </div>

                {/* 후기 내용 */}
                <p className="text-gray-700 mb-6 leading-relaxed min-h-[120px]">
                  "{testimonial.content}"
                </p>

                {/* 결과 배지 */}
                {testimonial.case_result && (
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                      ✓ {testimonial.case_result}
                    </span>
                  </div>
                )}

                {/* 의뢰인 정보 */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar_bg_color} rounded-full flex items-center justify-center`}>
                    <span className={`${testimonial.avatar_text_color} font-bold text-lg`}>{testimonial.client_initial}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.client_name}</p>
                    <p className="text-xs text-gray-500">{testimonial.client_role}</p>
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
                    ? 'w-8 bg-amber-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${index + 1}번째 후기 그룹 보기`}
              />
            ))}
          </div>
        </div>

        {/* 통계 */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              1,200번의 여정, 1,200번의 새로운 시작
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              12년간 함께한 의뢰인들의 이야기가 더율의 자산입니다
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">98%</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">고객 만족도</p>
              <p className="text-xs text-gray-500">"진작 올걸"</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1,200+</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">누적 의뢰인</p>
              <p className="text-xs text-gray-500">12년의 경험</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">87%</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">평균 승소율</p>
              <p className="text-xs text-gray-500">업계 최고 수준</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">4.8/5</p>
              <p className="text-sm text-gray-700 font-semibold mb-1">평균 평점</p>
              <p className="text-xs text-gray-500">실제 의뢰인 평가</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
