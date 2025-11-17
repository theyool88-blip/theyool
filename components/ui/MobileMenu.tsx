'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import ConsultationButton from '@/components/features/ConsultationButton';

interface MenuItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const sectionLinks: MenuItem[] = [
  { label: '더 플랜', href: '/the-plan' },
  { label: 'Insta더율', href: '/insta-theyool' },
  { label: '실제 성공 사례', href: '/cases' },
  {
    label: '이혼가이드',
    children: [
      { label: '이혼큐레이션(Q&A)', href: '/faq' },
      { label: '변호사 칼럼', href: '/blog' },
      { label: '양육비 계산기', href: '/child-support-calculator' },
    ]
  },
  { label: '구성원', href: '/team' },
  { label: '오시는 길', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

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

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItems(new Set());
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const overlay = (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Off-canvas Panel - 전체 화면, 미니멀 */}
      <div
        className="absolute inset-0 bg-white flex flex-col animate-slide-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - 로고 + 닫기 버튼 */}
        <div className="flex items-center justify-between px-8 sm:px-16 md:px-20 py-5 border-b border-[var(--gray-100)]">
          {/* 로고 - 클릭 시 메인으로 */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <Image
              src="/images/logo-horizontal.png"
              alt="법무법인 더율"
              width={120}
              height={30}
              className="h-6 w-auto brightness-0"
              priority
            />
          </a>

          {/* 닫기 버튼 */}
          <button
            onClick={closeMenu}
            className="p-2 text-[var(--gray-400)] hover:text-[var(--primary)] hover:bg-[var(--gray-50)] rounded-full transition-all"
            aria-label="메뉴 닫기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation - 미니멀 디자인 */}
        <nav className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-20">
          <div className="max-w-xl mx-auto w-full">
            {sectionLinks.map((item, index) => {
              const isExpanded = expandedItems.has(item.label);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div
                  key={item.label}
                  className="border-b border-[var(--gray-100)] last:border-0"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
                  }}
                >
                  {/* 메인 메뉴 항목 */}
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className="group w-full py-6 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-light text-[var(--gray-900)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                          {item.label}
                        </span>
                        <svg
                          className={`w-5 h-5 text-[var(--gray-300)] group-hover:text-[var(--accent)] transition-all duration-300 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="group block py-6 transition-all"
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
                  )}

                  {/* 서브메뉴 */}
                  {hasChildren && isExpanded && (
                    <div className="pb-4 pl-6 space-y-3">
                      {item.children!.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between py-3 transition-all"
                        >
                          <span className="text-lg sm:text-xl font-light text-[var(--gray-600)] group-hover:text-[var(--accent)] transition-colors">
                            {child.label}
                          </span>
                          <svg
                            className="w-4 h-4 text-[var(--gray-300)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Footer - Contact & CTA */}
        <div className="border-t border-[var(--gray-200)] bg-[var(--gray-50)] px-8 sm:px-16 md:px-20 py-6 space-y-4">
          <ConsultationButton variant="dark" fullWidth size="lg" onClick={closeMenu} />

          <div className="text-center">
            <p className="text-xs text-[var(--gray-500)] mb-1">전화 상담</p>
            <a
              href="tel:1661-7633"
              className="text-xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
            >
              1661-7633
            </a>
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
