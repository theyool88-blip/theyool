'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* 모바일 전용 하단 고정 CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-gray-200 shadow-2xl">
        {isExpanded && (
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <a
                href="tel:1661-7633"
                className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-bold text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 상담
              </a>
              <a
                href="http://pf.kakao.com/_rBxmWG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
                </svg>
                카톡 상담
              </a>
            </div>
            <Link
              href="/consultation-flow"
              className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-lg font-bold text-sm w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              상담 예약
            </Link>
          </div>
        )}

        <div className="p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            {isExpanded ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                닫기
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                무료 상담 신청
              </>
            )}
          </button>
        </div>
      </div>

      {/* 데스크탑 플로팅 버튼 */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          <a
            href="tel:1661-7633"
            className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all group"
            title="전화 상담"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              1661-7633
            </div>
          </a>

          <a
            href="http://pf.kakao.com/_rBxmWG"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-gray-900 p-4 rounded-full shadow-2xl hover:bg-yellow-500 transition-all group"
            title="카카오톡 상담"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
            </svg>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              카톡 상담
            </div>
          </a>

          <Link
            href="/consultation-flow"
            className="bg-blue-500 text-white p-4 rounded-full shadow-2xl hover:bg-blue-600 transition-all animate-pulse group"
            title="상담 예약"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              상담 예약
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
