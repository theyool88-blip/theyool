'use client';

import { useEffect } from 'react';

export default function ParallaxScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.hero-parallax');

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // 히어로 섹션(첫 번째 섹션)은 효과 적용 안함
        if (index === 0) {
          (section as HTMLElement).style.transform = 'translateY(0)';
          (section as HTMLElement).style.transition = '';
          return;
        }

        // 나머지 섹션들은 밀리는 효과만 적용
        let translateY = 0;

        // 섹션이 뷰포트 아래에 있을 때 (아직 안 보일 때)
        if (rect.top > windowHeight) {
          translateY = 100; // 아래에 100px 밀려있음
        }
        // 섹션이 뷰포트에 진입 중일 때
        else if (rect.top > 0 && rect.top <= windowHeight) {
          const progress = 1 - (rect.top / windowHeight);
          translateY = 100 * (1 - progress); // 100px에서 0px로 부드럽게
        }
        // 섹션이 뷰포트 위쪽으로 벗어날 때
        else if (rect.top <= 0 && rect.bottom > 0) {
          translateY = 0;
        }

        // 스타일 적용 - 밀리는 효과만
        (section as HTMLElement).style.transform = `translateY(${translateY}px)`;
        (section as HTMLElement).style.transition = 'transform 0.3s ease-out';
      });
    };

    // 초기 실행
    handleScroll();

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 클린업
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
