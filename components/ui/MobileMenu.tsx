'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ConsultationButton from '@/components/features/ConsultationButton';

const sectionLinks = [
  { label: '더 플랜', href: '/the-plan' },
  { label: 'Insta더율', href: '/insta-theyool' },
  { label: '실제 성공 사례', href: '/cases' },
  { label: '변호사 칼럼', href: '/blog' },
  { label: '구성원', href: '/team' },
  { label: '오시는 길', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const overlay = (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Off-canvas Panel - 전체 화면 오버레이 */}
      <div
        className="absolute inset-0 bg-white flex flex-col animate-slide-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - 투명 */}
        <div className="flex items-center justify-start px-8 py-6">
          <button
            onClick={closeMenu}
            className="p-2 text-[var(--gray-400)] hover:text-[var(--primary)] hover:bg-[var(--gray-50)] rounded-full transition-all"
            aria-label="메뉴 닫기"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation - 미니멀 디자인 */}
        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-20">
          <div className="max-w-xl mx-auto w-full">
            {sectionLinks.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="group block py-6 border-b border-[var(--gray-100)] last:border-0 transition-all"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-light text-[var(--gray-900)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                    {item.label}
                  </span>
                  <svg
                    className="w-5 h-5 text-[var(--gray-300)] group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </nav>

        {/* Footer - Contact & CTA */}
        <div className="border-t border-[var(--gray-200)] bg-[var(--gray-50)] px-8 py-6 space-y-4">
          <ConsultationButton fullWidth size="lg" onClick={closeMenu} />

          <div className="text-center">
            <p className="text-xs text-[var(--gray-500)] mb-1">전화 상담</p>
            <a
              href="tel:02-1234-5678"
              className="text-xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
            >
              02-1234-5678
            </a>
            <p className="text-xs text-[var(--gray-400)] mt-1">평일 09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-black hover:text-gray-600 transition-colors"
        aria-label="메뉴 열기"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMounted && isOpen && createPortal(overlay, document.body)}
    </>
  );
}
