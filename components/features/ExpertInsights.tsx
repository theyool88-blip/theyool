'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white">
        <div className="max-w-[920px] mx-auto px-6 md:px-12">
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

  // 카테고리별 그라데이션 색상 매핑 (Sage Green 계열)
  const getCategoryGradient = (category: string) => {
    const gradients: { [key: string]: string } = {
      '위자료': 'from-sage-100 to-sage-200',
      '재산분할': 'from-sage-100 to-emerald-100',
      '양육권': 'from-sage-100 to-teal-100',
      '불륜': 'from-sage-200 to-sage-300',
      '법률정보': 'from-sage-100 to-sage-200',
      '이혼절차': 'from-sage-100 to-cyan-100',
      '기타': 'from-sage-50 to-sage-100',
    };
    return gradients[category] || gradients['법률정보'];
  };

  // 카테고리별 아이콘 매핑
  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      '위자료': '💰',
      '재산분할': '🏠',
      '양육권': '👶',
      '불륜': '💔',
      '법률정보': '⚖️',
      '이혼절차': '📋',
    };
    return emojis[category] || '📖';
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-sage-50/30 to-transparent pointer-events-none z-[5]" />

      <div className="max-w-[920px] mx-auto px-6 md:px-12">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sage-600" />
            <p className="text-xs md:text-sm text-sage-700 font-semibold tracking-wide uppercase">
              Expert Column
            </p>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
            판결문엔 안 나오는 진짜 이야기
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            법정 밖에서 꼭 알아야 할 현실적인 조언들
          </p>
        </div>

        {/* 칼럼 카드 - 수직 스택 레이아웃 */}
        <div className="divide-y divide-gray-200 mb-10">
          {posts.map((post) => {
            const primaryCategory = post.categories && post.categories.length > 0
              ? post.categories[0]
              : '법률정보';
            const gradientClass = getCategoryGradient(primaryCategory);
            const emoji = getCategoryEmoji(primaryCategory);

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-4 py-3 md:py-4">
                  {/* 일러스트 이미지 - 왼쪽 (세로로 더 긴 비율) */}
                  <div className={`relative w-[110px] h-[133px] md:w-[145px] md:h-[187px] flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br ${gradientClass}`}>
                    {(post as any).illustration_image ? (
                      <Image
                        src={(post as any).illustration_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    ) : (
                      // 플레이스홀더: 카테고리 아이콘
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl md:text-5xl opacity-50">
                          {emoji}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 콘텐츠 영역 - 오른쪽 */}
                  <div className="flex-1 min-w-0 flex flex-col justify-start gap-1.5 py-1">
                    {/* 주제 뱃지 */}
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-sage-700 text-white text-xs font-semibold rounded-md">
                        {primaryCategory}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="text-lg md:text-2xl font-semibold text-gray-900 line-clamp-3 group-hover:text-sage-700 transition-colors leading-tight">
                      {post.title}
                    </h3>
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
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-sage-600 text-white font-semibold rounded-full hover:bg-sage-700 transition-all duration-300 hover:gap-3.5 shadow-md hover:shadow-lg"
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
