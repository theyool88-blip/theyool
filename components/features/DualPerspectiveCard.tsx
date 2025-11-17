'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DualPerspectiveCardProps {
  title: string;
  claimant: {
    description: string;
    faqLinks: { text: string; url: string }[];
    stats: string;
  };
  respondent: {
    description: string;
    faqLinks: { text: string; url: string }[];
    stats: string;
  };
  category: string;
  landingPageUrl?: string; // 랜딩페이지 URL (선택)
}

export default function DualPerspectiveCard({
  title,
  claimant,
  respondent,
  category,
  landingPageUrl,
}: DualPerspectiveCardProps) {
  const [activeTab, setActiveTab] = useState<'claimant' | 'respondent'>('claimant');

  const currentContent = activeTab === 'claimant' ? claimant : respondent;

  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-l-4 border-purple-400 hover:border-purple-500 border-r border-t border-b border-gray-100 hover:shadow-xl transition-all">
      {/* Category badge instead of vertical line */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full mb-4">
        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        <span className="text-xs font-semibold text-gray-700">{category}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>

      {/* 탭 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('claimant')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'claimant'
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          청구하시는 분
        </button>
        <button
          onClick={() => setActiveTab('respondent')}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'respondent'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          청구받으신 분
        </button>
      </div>

      {/* 콘텐츠 */}
      <div className="min-h-[200px]">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {currentContent.description}
        </p>

        {/* 관련 FAQ */}
        <div className="space-y-2 mb-4">
          {currentContent.faqLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="block text-xs text-gray-500 hover:text-purple-600 transition-colors"
            >
              • {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className={`text-sm font-semibold ${
            activeTab === 'claimant' ? 'text-purple-600' : 'text-blue-600'
          }`}>
            {currentContent.stats}
          </span>
          <div className="flex gap-2">
            {landingPageUrl && (
              <Link
                href={landingPageUrl}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full hover:shadow-lg transition-all"
              >
                전문 전략 보기
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            <Link
              href={`/faq?category=${category}`}
              className="inline-flex items-center gap-2 text-sm text-purple-600 font-medium hover:gap-3 transition-all"
            >
              FAQ 보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
