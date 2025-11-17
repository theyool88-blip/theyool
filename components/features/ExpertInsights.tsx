'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/supabase/blog';

export default function ExpertInsights() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured blog posts from API
    fetch('/api/blog?limit=3&sortBy=featured')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Blog posts loading error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <p className="text-gray-500">칼럼을 불러오는 중...</p>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null; // 포스트가 없으면 섹션 자체를 숨김
  }

  // 예상 읽는 시간 계산 (간단한 추정)
  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.length / 2; // 한글 기준 대략적 계산
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes < 1 ? 1 : minutes;
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">
            Expert Column
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            판결문엔 안 나오는 진짜 이야기
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            법정 밖에서 꼭 알아야 할 현실적인 조언들
          </p>
        </div>

        {/* 칼럼 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {posts.map((post) => {
            const readTime = getReadTime(post.content);
            const primaryCategory = post.categories && post.categories.length > 0
              ? post.categories[0]
              : '법률정보';

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300"
              >
                {/* 카테고리 뱃지 */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                      {primaryCategory}
                    </span>
                    <span className="text-xs text-gray-400">
                      {readTime}분 읽기
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* 요약 */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt || post.content.substring(0, 150).replace(/[#*\n]/g, ' ')}
                  </p>

                  {/* 저자 & 날짜 */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>{post.author || '법무법인 더율'}</span>
                    <span>
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : new Date(post.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                      }
                    </span>
                  </div>
                </div>

                {/* 호버 시 "자세히 읽기" 표시 */}
                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-sm text-amber-600 font-medium group-hover:gap-3 transition-all">
                    자세히 읽기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 전체 칼럼 보기 CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-amber-500 text-amber-600 font-semibold rounded-full hover:bg-amber-50 transition-all duration-300 hover:gap-4 shadow-sm"
          >
            변호사 칼럼 전체보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
