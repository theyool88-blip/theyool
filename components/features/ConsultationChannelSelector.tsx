'use client';

import Link from 'next/link';

interface ConsultationChannelSelectorProps {
  onClose?: () => void;
}

export default function ConsultationChannelSelector({ onClose }: ConsultationChannelSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        어떤 방법으로 상담하시겠어요?
      </h3>
      <p className="text-sm text-gray-600 mb-8 text-center">
        편한 방법을 선택하세요. 모두 무료입니다.
      </p>

      <div className="grid gap-4">
        {/* 전화 상담 */}
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
                전화 상담 (즉시)
              </h4>
              <p className="text-sm text-gray-600">
                지금 바로 연결 · 1661-7633
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">긴급</span>
                <span className="text-xs text-gray-500">2분 이내 연결</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* 카카오톡 상담 */}
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
                카카오톡 상담 (익명)
              </h4>
              <p className="text-sm text-gray-600">
                익명 상담 가능 · 편한 시간에
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">인기</span>
                <span className="text-xs text-gray-500">10분 이내 답변</span>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* 방문/화상 상담 예약 */}
        <button
          onClick={() => {
            // Talk 모달 열기 로직은 그대로 유지
            if (onClose) onClose();
          }}
          className="group bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                방문 · 화상 상담 예약
              </h4>
              <p className="text-sm text-gray-600">
                자세한 상담 · 예약 필요
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
        </button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          💬 모든 상담은 100% 비밀보장 · 첫 상담 무료
        </p>
      </div>
    </div>
  );
}
