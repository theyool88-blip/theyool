'use client';

import { useEffect } from 'react';

export default function HeroAnimation() {
  useEffect(() => {
    // 배경 이미지 줌 애니메이션
    const bgImage = document.querySelector('.hero-bg-image');
    if (bgImage) {
      setTimeout(() => {
        bgImage.classList.add('hero-bg-zoom');
      }, 100);
    }

    // 패럴랙스 스크롤 효과
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroSection = document.querySelector('.hero-section');
      const heroContent = document.querySelector('.hero-content');

      if (heroSection && heroContent) {
        const heroHeight = (heroSection as HTMLElement).offsetHeight;

        // 히어로 섹션 범위 내에서만 작동
        if (scrolled < heroHeight) {
          // 배경은 느리게 (0.5배속)
          const bgWrapper = heroSection.querySelector('.absolute.inset-0') as HTMLElement;
          if (bgWrapper) {
            bgWrapper.style.transform = `translateY(${scrolled * 0.5}px)`;
          }
          // 컨텐츠는 더 느리게 (0.3배속)
          (heroContent as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
          // 스크롤에 따라 opacity 감소
          (heroContent as HTMLElement).style.opacity = `${1 - scrolled / heroHeight}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
