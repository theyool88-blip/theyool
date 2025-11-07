'use client';

import { useMemo, useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

const videos = [
  {
    id: '1',
    videoId: 'dQw4w9WgXcQ', // 실제 유튜브 ID로 교체 필요
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  },
  {
    id: '2',
    videoId: 'dQw4w9WgXcQ', // 실제 유튜브 ID로 교체 필요
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  },
];

export default function YouTubeSection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  // Use deterministic pseudo-random values to avoid SSR/CSR mismatch
  const stars = useMemo(() => {
    // Mulberry32 PRNG for stable, seeded results
    const mulberry32 = (a: number) => {
      return () => {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    };

    const count = 20;
    const seedBase = 123456789; // constant seed for both server and client
    const list: {
      cx: string;
      cy: string;
      durOpacity: string;
      beginOpacity: string;
      durRadius: string;
      beginRadius: string;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const r1 = mulberry32(seedBase + i)();
      const r2 = mulberry32(seedBase + i + 101)();
      const r3 = mulberry32(seedBase + i + 202)();
      const r4 = mulberry32(seedBase + i + 303)();
      const r5 = mulberry32(seedBase + i + 404)();
      const r6 = mulberry32(seedBase + i + 505)();
      list.push({
        cx: `${Math.round(r1 * 100)}%`,
        cy: `${Math.round(r2 * 100)}%`,
        durOpacity: `${(2 + r3 * 3).toFixed(2)}s`,
        beginOpacity: `${(r4 * 3).toFixed(2)}s`,
        durRadius: `${(2 + r5 * 3).toFixed(2)}s`,
        beginRadius: `${(r6 * 3).toFixed(2)}s`,
      });
    }
    return list;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-black overflow-hidden hero-parallax">
      {/* Luxury Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Gold Gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffd700', stopOpacity: 0.3 }}>
                <animate attributeName="stop-opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#ffed4e', stopOpacity: 0.2 }}>
                <animate attributeName="stop-opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* Silver Gradient */}
            <linearGradient id="silverGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 0.25 }}>
                <animate attributeName="stop-opacity" values="0.25;0.5;0.25" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#e8e8e8', stopOpacity: 0.15 }}>
                <animate attributeName="stop-opacity" values="0.15;0.4;0.15" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            {/* Purple Accent */}
            <radialGradient id="purpleGlow">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.4 }} />
              <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
            </radialGradient>

            {/* Blur Filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Large Flowing Circles with Gold/Silver */}
          <circle cx="20%" cy="30%" r="200" fill="url(#goldGrad)" filter="url(#glow)">
            <animate attributeName="cx" values="20%;25%;20%" dur="15s" repeatCount="indefinite" />
            <animate attributeName="cy" values="30%;20%;30%" dur="12s" repeatCount="indefinite" />
            <animate attributeName="r" values="200;250;200" dur="10s" repeatCount="indefinite" />
          </circle>

          <circle cx="80%" cy="70%" r="250" fill="url(#silverGrad)" filter="url(#glow)">
            <animate attributeName="cx" values="80%;75%;80%" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cy" values="70%;80%;70%" dur="14s" repeatCount="indefinite" />
            <animate attributeName="r" values="250;200;250" dur="11s" repeatCount="indefinite" />
          </circle>

          <circle cx="50%" cy="50%" r="180" fill="url(#purpleGlow)" filter="url(#glow)">
            <animate attributeName="r" values="180;220;180" dur="8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
          </circle>

          {/* Flowing Wave Lines */}
          <path
            d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
            stroke="url(#goldGrad)"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          >
            <animate attributeName="d"
              values="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100;
                      M0,100 Q250,150 500,100 T1000,100 T1500,100 T2000,100;
                      M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100"
              dur="8s" repeatCount="indefinite" />
          </path>

          <path
            d="M0,500 Q250,450 500,500 T1000,500 T1500,500 T2000,500"
            stroke="url(#silverGrad)"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          >
            <animate attributeName="d"
              values="M0,500 Q250,450 500,500 T1000,500 T1500,500 T2000,500;
                      M0,500 Q250,550 500,500 T1000,500 T1500,500 T2000,500;
                      M0,500 Q250,450 500,500 T1000,500 T1500,500 T2000,500"
              dur="10s" repeatCount="indefinite" />
          </path>

          {/* Sparkling Stars */}
          {stars.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r="2" fill="#ffffff" opacity="0">
              <animate
                attributeName="opacity"
                values="0;0.8;0"
                dur={s.durOpacity}
                begin={s.beginOpacity}
                repeatCount="indefinite"
              />
              <animate
                attributeName="r"
                values="1;3;1"
                dur={s.durRadius}
                begin={s.beginRadius}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">YouTube</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              더율 STORY
            </h2>
            <p className="text-base md:text-xl text-gray-400 font-light">
              이혼 소송, 제대로 알고 시작하세요
            </p>
          </div>
        </ScrollReveal>

        {/* Video Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-sm md:max-w-2xl mx-auto">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 100}>
              <div className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 hover:shadow-2xl">
                {/* Thumbnail */}
                <div
                  className="relative aspect-video bg-gray-900 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedVideo(video.videoId)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                  {/* Pastel Triangle Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="relative group/play">
                      {/* Subtle outer glow */}
                      <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-purple-300/30 to-pink-300/30 blur-2xl group-hover/play:blur-3xl transition-all duration-500" />
                      {/* Pastel Triangle */}
                      <svg className="relative w-20 h-20 md:w-24 md:h-24 group-hover/play:scale-110 transition-transform duration-300" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="triangleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#e9d5ff', stopOpacity: 0.95 }} />
                            <stop offset="100%" style={{ stopColor: '#fce7f3', stopOpacity: 0.95 }} />
                          </linearGradient>
                          <filter id="triangleShadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
                          </filter>
                        </defs>
                        <polygon
                          points="30,20 30,80 75,50"
                          fill="url(#triangleGrad)"
                          filter="url(#triangleShadow)"
                          className="group-hover/play:fill-purple-200 transition-all duration-300"
                          stroke="white"
                          strokeWidth="1"
                          strokeOpacity="0.5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Thumbnail - 실제 이미지로 교체 */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* YouTube Link */}
        <ScrollReveal delay={300}>
          <div className="text-center mt-12 md:mt-16">
            <a
              href="https://youtube.com/@theyool" // 실제 유튜브 채널 링크로 교체 필요
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>채널 구독하기</span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Video Modal - Compact & Elegant */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-md aspect-video" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
