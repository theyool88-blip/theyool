'use client';

import Link from 'next/link';

interface EnhancedChannelSelectorProps {
  onClose?: () => void;
}

export default function EnhancedChannelSelector({ onClose }: EnhancedChannelSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-8 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        당신이 편한 방법으로 연락주세요
      </h3>
      <p className="text-sm text-gray-600 mb-8 text-center">
        어떤 방법이든, 따뜻하게 응답하겠습니다 · 모두 무료입니다
      </p>

      <div className="grid gap-4">
        {/* 전화 상담 - 가장 긴급한 채널 */}
        <Link
          href="tel:1661-7633"
          className="group bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200 hover:border-red-300 hover:shadow-lg transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                전화 상담 (지금 바로)
              </h4>
              <p className="text-sm text-gray-600">
                즉시 연결 · 1661-7633
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">긴급</span>
                <span className="text-xs text-gray-500">평균 2분 내 연결</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* 카카오톡 상담 - 가장 인기 있는 채널 */}
        <a
          href="http://pf.kakao.com/_xdKxhcG/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border-2 border-yellow-200 hover:border-yellow-300 hover:shadow-lg transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-amber-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C6.486 3 2 6.596 2 11c0 2.52 1.438 4.75 3.64 6.27-.216.78-.778 2.842-.893 3.306-.135.54.194.533.395.395.145-.1 2.37-1.617 3.35-2.276C9.543 18.897 10.748 19 12 19c5.514 0 10-3.596 10-8s-4.486-8-10-8z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                카카오톡 상담 (익명 가능)
              </h4>
              <p className="text-sm text-gray-600">
                편한 시간에 · 100% 비밀보장
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">인기</span>
                <span className="text-xs text-gray-500">평균 10분 내 답변</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* 이메일 상담 - 자료 첨부 가능 */}
        <a
          href="mailto:info@theyool.com?subject=이혼 상담 문의"
          className="group bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                이메일 상담 (자료 첨부)
              </h4>
              <p className="text-sm text-gray-600">
                info@theyool.com · 상세 상담
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">상세</span>
                <span className="text-xs text-gray-500">24시간 내 답변</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* 화상 상담 - COVID 시대 */}
        <button
          onClick={() => {
            // Talk 모달 열기 로직
            if (onClose) onClose();
          }}
          className="group bg-gradient-to-br from-indigo-50 to-white rounded-xl p-6 border-2 border-indigo-200 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                화상 상담 (비대면)
              </h4>
              <p className="text-sm text-gray-600">
                집에서 편하게 · 예약 필요
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-xs font-semibold rounded">편리</span>
                <span className="text-xs text-gray-500">원하는 시간 예약</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* 방문 상담 - 가장 심층적인 상담 */}
        <Link
          href="/contact"
          className="group bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                방문 상담 (대면)
              </h4>
              <p className="text-sm text-gray-600">
                천안 · 평택 사무소 · 자세한 상담
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded">심층</span>
                <span className="text-xs text-gray-500">내일부터 가능</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          💬 모든 상담은 100% 비밀보장 · 첫 상담 무료 · 24시간 내 연락
        </p>
      </div>
    </div>
  );
}
