'use client';

import Link from 'next/link';
import { FunnelCardProps } from './types';
import { iconColors } from './funnelConfig';

// 아이콘 SVG 맵
const iconMap: Record<string, React.ReactNode> = {
  phone: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  refresh: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  currency: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  scale: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  lightbulb: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
};

/**
 * FunnelCard Component
 * 심플한 리스트 스타일 퍼널 카드
 */
export default function FunnelCard({ item, onModalOpen, colorScheme = 'sage' }: FunnelCardProps) {
  // 모달 링크인 경우 (modal:consultation)
  const isModal = item.link.startsWith('modal:');

  // 색상 스키마에 따른 아이콘 색상
  const iconColor = iconColors[colorScheme];
  const hoverBgColor = colorScheme === 'sage' ? 'hover:bg-sage-50/30' :
                       colorScheme === 'amber' ? 'hover:bg-amber-50/30' :
                       colorScheme === 'cyan' ? 'hover:bg-cyan-50/30' :
                       colorScheme === 'purple' ? 'hover:bg-purple-50/30' :
                       colorScheme === 'indigo' ? 'hover:bg-indigo-50/30' :
                       'hover:bg-pink-50/30';

  const arrowHoverColor = colorScheme === 'sage' ? 'group-hover:text-sage-600' :
                          colorScheme === 'amber' ? 'group-hover:text-amber-600' :
                          colorScheme === 'cyan' ? 'group-hover:text-cyan-600' :
                          colorScheme === 'purple' ? 'group-hover:text-purple-600' :
                          colorScheme === 'indigo' ? 'group-hover:text-indigo-600' :
                          'group-hover:text-pink-600';

  const CardContent = () => (
    <div className={`flex items-center justify-between py-4 px-2 border-b border-gray-200 ${hoverBgColor} transition-all duration-200`}>
      {/* 왼쪽: 아이콘 + 텍스트 */}
      <div className="flex items-center gap-4">
        {/* 아이콘 - 색상 스키마 적용 */}
        <div className={iconColor}>
          {iconMap[item.icon]}
        </div>

        {/* 제목 */}
        <span className="text-base font-medium text-gray-900">
          {item.title}
        </span>
      </div>

      {/* 오른쪽: 화살표 */}
      <svg
        className={`w-5 h-5 text-gray-400 ${arrowHoverColor} group-hover:translate-x-1 transition-all duration-200`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );

  if (isModal) {
    return (
      <button
        onClick={onModalOpen}
        className="group block w-full text-left"
        aria-label={item.title}
      >
        <CardContent />
      </button>
    );
  }

  return (
    <Link
      href={item.link}
      className="group block"
      aria-label={item.title}
    >
      <CardContent />
    </Link>
  );
}
