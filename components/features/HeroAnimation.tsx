'use client';

import { useEffect } from 'react';

export default function HeroAnimation() {
  useEffect(() => {
    // TVING 스타일 계단식 fade-in 애니메이션
    const heroText1 = document.querySelector('.hero-text-1');
    const heroText2 = document.querySelector('.hero-text-2');
    const heroText3 = document.querySelector('.hero-text-3');

    // 순차적으로 등장
    if (heroText1) {
      setTimeout(() => heroText1.classList.add('hero-fade-in'), 100);
    }
    if (heroText2) {
      setTimeout(() => heroText2.classList.add('hero-fade-in'), 300);
    }
    if (heroText3) {
      setTimeout(() => heroText3.classList.add('hero-fade-in'), 500);
    }
  }, []);

  return null;
}
