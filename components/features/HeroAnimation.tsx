'use client';

import { useEffect } from 'react';

export default function HeroAnimation() {
  useEffect(() => {
    // 단순하고 부드러운 fade-in 애니메이션
    const heroText1 = document.querySelector('.hero-text-1');
    const heroText2 = document.querySelector('.hero-text-2');
    const heroText3 = document.querySelector('.hero-text-3');

    // 순차적으로 등장 (더 빠르고 부드럽게)
    if (heroText1) {
      setTimeout(() => heroText1.classList.add('hero-fade-in'), 200);
    }
    if (heroText2) {
      setTimeout(() => heroText2.classList.add('hero-fade-in'), 400);
    }
    if (heroText3) {
      setTimeout(() => heroText3.classList.add('hero-fade-in'), 600);
    }
  }, []);

  return null;
}
