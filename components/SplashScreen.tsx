'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 프로그레스 바 애니메이션 (0 → 100%)
    const duration = 3500; // 3.5초
    const steps = 60;
    const increment = 100 / steps;
    const intervalTime = duration / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    // 4초 후 페이드아웃 시작
    const fadeOutTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 4000);

    // 4.8초 후 완전히 제거
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* 로고 */}
        <div className="splash-logo mb-12">
          <Image
            src="/images/logo-horizontal.png"
            alt="법무법인 더율"
            width={280}
            height={70}
            className="w-[280px] md:w-[320px] h-auto"
            priority
          />
        </div>

        {/* 슬로건 */}
        <div className="splash-slogan mb-12">
          <p className="text-white text-lg md:text-xl font-light tracking-widest">
            이겨놓고 설계하다
          </p>
        </div>

        {/* 프로그레스 바 */}
        <div className="splash-progress w-[280px] md:w-[320px]">
          <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* 글로우 효과 */}
              <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-white/60 to-transparent blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
