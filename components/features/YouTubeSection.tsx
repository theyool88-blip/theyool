'use client';

import { useState } from 'react';
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

  return (
    <section className="relative min-h-screen flex items-center py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden hero-parallax">
      {/* Warm Communication Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Warm Beige Gradient */}
            <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: '#fed7aa', stopOpacity: 0.15 }} />
            </linearGradient>

            {/* Soft Peach Accent */}
            <radialGradient id="peachGlow">
              <stop offset="0%" style={{ stopColor: '#fdba74', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: '#fdba74', stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {/* Soft circles for warmth */}
          <circle cx="25%" cy="35%" r="180" fill="url(#warmGrad)" />
          <circle cx="75%" cy="65%" r="200" fill="url(#peachGlow)" />
          <circle cx="50%" cy="50%" r="140" fill="#fef3c7" opacity="0.12" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">YouTube</p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
              더율 STORY
            </h2>
            <p className="text-base md:text-xl text-gray-700 font-light">
              이혼 소송, 제대로 알고 시작하세요
            </p>
          </div>
        </ScrollReveal>

        {/* Video Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-sm md:max-w-2xl mx-auto">
          {videos.map((video, index) => (
            <ScrollReveal key={video.id} delay={index * 100}>
              <div className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-500 hover:shadow-xl">
                {/* Thumbnail */}
                <div
                  className="relative aspect-video bg-gray-100 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedVideo(video.videoId)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />

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
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-900 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg"
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
