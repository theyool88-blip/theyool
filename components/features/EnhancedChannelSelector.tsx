'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface EnhancedChannelSelectorProps {
  onClose?: () => void;
}

// Hardcoded testimonial quotes for instant display
const TESTIMONIAL_QUOTES = [
  {
    highlight_text: '재산분할 모두 받게 되었고, 이제 완전히 끝났네요',
    client_initial: '김',
  },
  {
    highlight_text: '친절하고 꼼꼼하게 상담해 주셔서 감사합니다',
    client_initial: '이',
  },
  {
    highlight_text: '상담 받길 정말 잘 한 것 같아요',
    client_initial: '박',
  },
];

export default function EnhancedChannelSelector({ onClose }: EnhancedChannelSelectorProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Auto-rotation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % TESTIMONIAL_QUOTES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-amber-50/20 to-white rounded-2xl p-6 md:p-8 max-w-3xl">
      {/* 헤더 - 신뢰 배지 포함 */}
      <div className="text-center mb-6">
        {/* 신뢰 배지 */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
            <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-amber-700">12년 경험</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-xs font-semibold text-amber-700">1,200건</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold text-amber-700">87% 성공</span>
          </div>
        </div>

        {/* Testimonial Quote - Rotating */}
        <div className="mb-4 flex justify-center animate-fadeIn">
          <div className="inline-flex items-start gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 max-w-[420px]">
            <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 leading-snug">
                &quot;{TESTIMONIAL_QUOTES[currentQuoteIndex].highlight_text}&quot;
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {TESTIMONIAL_QUOTES[currentQuoteIndex].client_initial} 님 · 네이버 리뷰
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          편한 방법으로 연락주세요
        </h3>
        <p className="text-sm md:text-base text-gray-600">
          어떤 방법이든 따뜻하게 응답하겠습니다 · 모두 무료입니다
        </p>
      </div>

      <div className="grid gap-3 md:gap-4">
        {/* 전화 상담 - 가장 긴급한 채널 (Amber-700) */}
        <Link
          href="tel:1661-7633"
          className="group bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-5 md:p-6 hover:from-amber-700 hover:to-amber-800 hover:shadow-xl transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg md:text-xl font-bold text-white mb-1">
                전화 상담 (지금 바로)
              </h4>
              <p className="text-sm md:text-base text-amber-50 mb-2">
                즉시 연결 · <span className="font-bold">1661-7633</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded">긴급</span>
                <span className="text-xs text-amber-100">평균 2분 내 연결</span>
              </div>
            </div>
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white/80 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* 카카오톡 상담 - 가장 인기 있는 채널 (Amber-500) */}
        <a
          href="http://pf.kakao.com/_xdKxhcG/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 md:p-6 border-2 border-amber-200 hover:border-amber-300 hover:shadow-xl transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C6.486 3 2 6.596 2 11c0 2.52 1.438 4.75 3.64 6.27-.216.78-.778 2.842-.893 3.306-.135.54.194.533.395.395.145-.1 2.37-1.617 3.35-2.276C9.543 18.897 10.748 19 12 19c5.514 0 10-3.596 10-8s-4.486-8-10-8z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                카카오톡 상담 (익명 가능)
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                편한 시간에 · 100% 비밀보장
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-600 text-white text-xs font-semibold rounded">인기</span>
                <span className="text-xs text-gray-600">평균 10분 내 답변</span>
              </div>
            </div>
            <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-600/60 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* 이메일 상담 - 자료 첨부 가능 (Gray + Amber accent) */}
        <a
          href="mailto:info@theyool.com?subject=이혼 상담 문의"
          className="group bg-white rounded-xl p-5 md:p-6 border-2 border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 group-hover:bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all">
              <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-700 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                이메일 상담 (자료 첨부)
              </h4>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                info@theyool.com · 상세 상담
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-gray-200 group-hover:bg-amber-100 text-gray-700 group-hover:text-amber-700 text-xs font-semibold rounded transition-colors">상세</span>
                <span className="text-xs text-gray-600">24시간 내 답변</span>
              </div>
            </div>
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* 화상/방문 상담 - 2열 그리드 */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
          {/* 화상 상담 */}
          <button
            onClick={() => {
              // Talk 모달 열기 로직
              if (onClose) onClose();
            }}
            className="group bg-white rounded-xl p-4 md:p-5 border-2 border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer text-left"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                  화상 상담
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mb-2">
                  집에서 편하게
                </p>
                <span className="inline-block px-2 py-0.5 bg-gray-200 group-hover:bg-amber-100 text-gray-700 group-hover:text-amber-700 text-xs font-semibold rounded transition-colors">예약 필요</span>
              </div>
            </div>
          </button>

          {/* 방문 상담 */}
          <Link
            href="/contact"
            className="group bg-white rounded-xl p-4 md:p-5 border-2 border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer"
            onClick={onClose}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors">
                  방문 상담
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mb-2">
                  천안 · 평택 사무소
                </p>
                <span className="inline-block px-2 py-0.5 bg-gray-200 group-hover:bg-amber-100 text-gray-700 group-hover:text-amber-700 text-xs font-semibold rounded transition-colors">내일부터</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 하단 안심 메시지 */}
      <div className="mt-6 pt-5 border-t border-amber-100">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-2">
            <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs md:text-sm font-semibold text-amber-700">100% 비밀 보장</span>
          </div>
          <p className="text-xs text-gray-500">
            모든 상담은 첫 상담 무료 · 평균 2시간 내 연락 · 계약 강요 없음
          </p>
        </div>
      </div>
    </div>
  );
}
