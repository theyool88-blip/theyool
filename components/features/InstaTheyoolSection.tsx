'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ContentCard {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  image: string;
  images: string[];
  badge: string;
  icon?: string;
  caption: string;
  likes: number;
  views: number;
  date: string;
}

// 랜덤 정렬 함수
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 배열을 목표 개수만큼 반복해서 채우기
function fillToCount<T>(array: T[], targetCount: number): T[] {
  if (array.length === 0) return [];
  if (array.length >= targetCount) return array.slice(0, targetCount);

  const result: T[] = [];
  while (result.length < targetCount) {
    result.push(...array);
  }
  return result.slice(0, targetCount);
}

// 시간 표시 함수
function timeSince(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval}년 전`;
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval}개월 전`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval}일 전`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval}시간 전`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval}분 전`;
  return '방금 전';
}

const SAMPLE_CONTENT: ContentCard[] = [
  {
    id: '1',
    type: '성공사례',
    title: '위자료 5억원 승소',
    subtitle: '배우자 불륜 입증',
    image: '/images/case-sample-1.jpg',
    images: ['/images/case-sample-1.jpg'],
    badge: '성공사례',
    icon: '⚖️',
    caption: '위자료 5억원 승소 사례입니다. 배우자의 불륜을 완벽히 입증하여 최고 수준의 위자료를 확보했습니다.',
    likes: 234,
    views: 1200,
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '2',
    type: '칼럼',
    title: '이혼 절차 완벽 가이드',
    subtitle: '협의이혼 vs 재판이혼',
    image: '/images/blog-sample-1.jpg',
    images: ['/images/blog-sample-1.jpg'],
    badge: '변호사 칼럼',
    icon: '📝',
    caption: '이혼 절차에 대한 완벽 가이드입니다. 협의이혼과 재판이혼의 차이점을 알아보세요.',
    likes: 156,
    views: 890,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '3',
    type: '릴스',
    title: '재산분할 핵심 팁',
    subtitle: '3분 요약',
    image: '/images/reel-sample-1.jpg',
    images: ['/images/reel-sample-1.jpg'],
    badge: 'Reels',
    icon: '🎬',
    caption: '재산분할의 핵심을 3분 안에 알려드립니다. 꼭 알아야 할 포인트!',
    likes: 512,
    views: 2340,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '4',
    type: '성공사례',
    title: '양육권 단독 확보',
    subtitle: '아이를 위한 최선',
    image: '/images/case-sample-2.jpg',
    images: ['/images/case-sample-2.jpg'],
    badge: '성공사례',
    icon: '⚖️',
    caption: '양육권 분쟁에서 단독 양육권을 확보한 사례입니다.',
    likes: 189,
    views: 950,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

// 타입 아이콘 매핑
const TYPE_ICONS: Record<string, string> = {
  '성공사례': '⚖️',
  '칼럼': '📝',
  '일반': '📋',
  '홍보': '📢',
  '릴스': '🎬',
};

// 타입 뱃지 매핑
const TYPE_BADGES: Record<string, string> = {
  '성공사례': '성공사례',
  '칼럼': '변호사 칼럼',
  '일반': '일반',
  '홍보': '홍보',
  '릴스': 'Reels',
};

// 타입별 배지 색상
const TYPE_BADGE_COLORS: Record<string, string> = {
  '성공사례': 'bg-gradient-to-r from-emerald-500 to-teal-500',
  '칼럼': 'bg-gradient-to-r from-blue-500 to-indigo-500',
  '일반': 'bg-gradient-to-r from-purple-500 to-pink-500',
  '홍보': 'bg-gradient-to-r from-orange-500 to-red-500',
  '릴스': 'bg-gradient-to-r from-fuchsia-500 to-purple-500',
};

export default function InstaTheyoolSection() {
  const [displayCards, setDisplayCards] = useState<ContentCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();

        if (data.posts && data.posts.length > 0) {
          // Notion 데이터를 ContentCard 형식으로 변환
          const notionCards: ContentCard[] = data.posts.map((post: any) => {
            // mediaUrl이 있으면 릴스로 판단
            const isReels = post.type === '릴스' || !!post.mediaUrl;
            const finalType = isReels ? '릴스' : post.type;

            return {
              id: post.id,
              type: finalType,
              title: post.title,
              subtitle: post.caption.slice(0, 30) + (post.caption.length > 30 ? '...' : ''),
              image: post.thumbnail || post.images[0] || '/images/placeholder.jpg',
              images: post.images || [post.thumbnail || '/images/placeholder.jpg'],
              badge: TYPE_BADGES[finalType] || finalType,
              icon: TYPE_ICONS[finalType] || '📋',
              caption: post.caption,
              likes: post.likes || 0,
              views: post.views || 0,
              date: post.date,
            };
          });

          // 랜덤 정렬
          const randomCards = shuffleArray(notionCards);
          // 10개만 표시
          const filled = randomCards.slice(0, 10);
          setDisplayCards(filled);
        } else {
          // Notion 데이터가 없으면 샘플 사용 (부족하면 반복)
          const randomCards = shuffleArray(SAMPLE_CONTENT);
          const filled = fillToCount(randomCards, 10);
          setDisplayCards(filled);
        }
      } catch (error) {
        console.error('Failed to fetch instagram posts:', error);
        // 에러 시 샘플 데이터 사용 (부족하면 반복)
        const randomCards = shuffleArray(SAMPLE_CONTENT);
        const filled = fillToCount(randomCards, 10);
        setDisplayCards(filled);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/20 to-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-purple-100/50 to-purple-50/30 overflow-hidden">
      {/* Instagram 스타일 배경 - 강화 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* 도트 패턴 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #9333ea 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Instagram Gradient - 강화 */}
            <linearGradient id="instaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#f3e8ff', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 0.4 }} />
            </linearGradient>

            {/* Purple Glow - 강화 */}
            <radialGradient id="purpleGlow">
              <stop offset="0%" style={{ stopColor: '#c084fc', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 0 }} />
            </radialGradient>

            {/* Pink Glow */}
            <radialGradient id="pinkGlow">
              <stop offset="0%" style={{ stopColor: '#f0abfc', stopOpacity: 0.25 }} />
              <stop offset="100%" style={{ stopColor: '#f0abfc', stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {/* Soft circles - 더 많고 다양하게 */}
          <circle cx="15%" cy="25%" r="200" fill="url(#instaGrad)" />
          <circle cx="85%" cy="70%" r="220" fill="url(#purpleGlow)" />
          <circle cx="50%" cy="50%" r="160" fill="url(#pinkGlow)" />
          <circle cx="75%" cy="30%" r="140" fill="#f3e8ff" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* 헤더 - 간격 확대 */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-[10px] md:text-xs text-purple-600/60 mb-4 tracking-[0.3em] uppercase font-medium">Insta theyool</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-900 tracking-tight">
            더율의 진짜 이야기
          </h2>
          <p className="text-base md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            실시간으로 만나는 성공 사례와 법률 인사이트
          </p>
        </div>

        {/* 인스타그램 피드 카드 - 자동 스크롤 */}
        <div className="relative mb-14 md:mb-18 overflow-hidden">
          <div className="flex gap-4 md:gap-6 pb-4 animate-scroll-insta">
            {/* 2세트로 무한 스크롤 */}
            {[...Array(2)].map((_, setIndex) => (
              displayCards.map((content, contentIndex) => {
                const isReels = content.type === '릴스';
                return (
                  <Link
                    key={`${setIndex}-${contentIndex}-${content.id}`}
                    href="/insta-theyool"
                    className="flex-shrink-0 w-[200px] md:w-[240px] transform transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* 이미지 전체 배경에 텍스트 오버레이 */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group h-[300px] md:h-[340px]">
                      {/* 배경 이미지 또는 비디오 */}
                      {isReels ? (
                        /* 릴스: 비디오 자동 재생 */
                        <video
                          className="absolute inset-0 w-full h-full object-cover"
                          src={content.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        /* 일반: 이미지 */
                        <div
                          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                          style={{ backgroundImage: `url(${content.image})` }}
                        />
                      )}

                      {/* 그라디언트 오버레이 */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

                      {/* 상단 배지 */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg ${TYPE_BADGE_COLORS[content.type] || 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                          {TYPE_BADGES[content.type] || content.type}
                        </span>
                        {isReels && (
                          <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2.5 4v16l8-8-8-8zm11 0v16l8-8-8-8z"/>
                          </svg>
                        )}
                      </div>

                      {/* 하단 콘텐츠 정보 */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-bold text-sm mb-1.5 drop-shadow-lg line-clamp-2">
                          {content.title}
                        </h3>
                        <p className="text-white/90 text-xs mb-2 drop-shadow line-clamp-2">
                          {content.caption}
                        </p>

                        {/* 통계 */}
                        <div className="flex items-center gap-3 text-white/80 text-[10px]">
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span>{content.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>{content.views.toLocaleString()}</span>
                          </div>
                          <div className="ml-auto text-white/70 text-[9px]">
                            {timeSince(content.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ))}
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="text-center mb-16 md:mb-20">
          <Link
            href="/insta-theyool"
            className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-sm md:text-base">Insta더율 전체보기</span>
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      {/* YouTube 영상 섹션 - 명확한 구분 */}
      <div className="relative z-10 pt-12 md:pt-16 mt-8 md:mt-12 border-t border-purple-200/50">
        {/* YouTube 제목 */}
        <div className="text-center mb-8 md:mb-10 px-6 md:px-12">
          <p className="text-[10px] md:text-xs text-red-600/60 mb-3 tracking-[0.3em] uppercase font-medium">YouTube Channel</p>
          <h3 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            영상으로 만나는 더율
          </h3>
        </div>

        {/* YouTube 썸네일 - 모바일 전체 너비 */}
        <div className="relative aspect-video overflow-hidden shadow-2xl mb-8 md:mb-10 md:max-w-4xl md:mx-auto md:rounded-2xl">
          <Image
            src="/images/youtube-thumbnail.png"
            alt="더율 YouTube 영상"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 채널 바로가기 버튼 */}
        <div className="text-center px-6 md:px-12 pb-4">
          <a
            href="https://youtube.com/@theyool"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-sm md:text-base">YouTube 채널 바로가기</span>
          </a>
        </div>
      </div>

      {/* 애니메이션 스타일 */}
      <style jsx>{`
        @keyframes scroll-feed {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-insta {
          animation: scroll-feed 8s linear infinite;
          will-change: transform;
        }

        .animate-scroll-insta:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
