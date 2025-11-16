'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedPost, RelatedCase } from '@/lib/notion/faq';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RelatedContentProps {
  관련칼럼?: RelatedPost[];
  관련사례?: RelatedCase[];
}

export default function RelatedContent({ 관련칼럼, 관련사례 }: RelatedContentProps) {
  const [showPosts, setShowPosts] = useState(false);
  const [showCases, setShowCases] = useState(false);

  const hasPosts = 관련칼럼 && 관련칼럼.length > 0;
  const hasCases = 관련사례 && 관련사례.length > 0;

  if (!hasPosts && !hasCases) {
    return null;
  }

  return (
    <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
      {/* 관련 칼럼 */}
      {hasPosts && (
        <div className="bg-amber-50 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowPosts(!showPosts)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">📖</span>
              <span className="font-semibold text-gray-900">
                관련 칼럼 ({관련칼럼.length})
              </span>
            </div>
            {showPosts ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showPosts && (
            <div className="px-4 pb-4">
              <div className="grid gap-3">
                {관련칼럼.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-amber-200"
                  >
                    <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                      {post.제목}
                    </h4>
                    {post.카테고리 && (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full inline-block">
                        {post.카테고리}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 관련 사례 */}
      {hasCases && (
        <div className="bg-pink-50 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowCases(!showCases)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-pink-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⚖️</span>
              <span className="font-semibold text-gray-900">
                실제 성공사례 ({관련사례.length})
              </span>
            </div>
            {showCases ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {showCases && (
            <div className="px-4 pb-4">
              <div className="grid gap-3">
                {관련사례.map((caseItem) => (
                  <Link
                    key={caseItem.id}
                    href={`/cases/${caseItem.slug}`}
                    className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-pink-200"
                  >
                    <div className="flex items-start gap-3">
                      {caseItem.아이콘 && (
                        <span className="text-2xl flex-shrink-0">{caseItem.아이콘}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        {caseItem.badge && (
                          <span className="text-xs font-mono text-pink-600 mb-1 block">
                            {caseItem.badge}
                          </span>
                        )}
                        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                          {caseItem.제목}
                        </h4>
                        {caseItem.카테고리.length > 0 && (
                          <div className="flex gap-1 flex-wrap">
                            {caseItem.카테고리.map((cat) => (
                              <span
                                key={cat}
                                className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
