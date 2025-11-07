'use client';

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    // 모든 앵커 링크에 부드러운 스크롤 적용
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (!href) return;

        const targetElement = document.querySelector(href);
        if (targetElement) {
          const headerOffset = 80; // 헤더 높이
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 스크롤 가속도 조정 (부드러운 스크롤)
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.style.scrollBehavior = 'smooth';
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
}
