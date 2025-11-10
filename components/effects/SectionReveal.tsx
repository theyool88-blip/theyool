'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function SectionReveal({ children, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add('section-visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // 20% 보이면 활성화
        rootMargin: '0px 0px -50px 0px', // 아래에서 50px 더 들어와야 트리거
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="section-reveal">
      {children}
    </div>
  );
}
