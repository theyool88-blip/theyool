'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';

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
  {
    label: '전문 서비스',
    children: [
      { label: '위자료 청구', href: '/services/alimony' },
      { label: '재산분할', href: '/services/property-division' },
      { label: '양육권/양육비', href: '/services/custody' },
      { label: '불륜/상간', href: '/services/adultery' },
    ]
  },
  { label: '변호사 비용', href: '/lawyer-fees' },
  { label: '구성원', href: '/team' },
  { label: '오시는 길', href: '/contact' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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

      {/* Off-canvas Panel - 전체 화면, Sage Green 테마 */}
      <div
        className="absolute inset-0 bg-white flex flex-col animate-slide-left"
        role="dialog"
        aria-modal="true"
        aria-label="메인 네비게이션"
      >
        {/* Header - 로고 + 닫기 버튼 */}
        <div className="flex items-center justify-between px-8 sm:px-16 md:px-20 py-5 border-b border-sage-100">
          {/* 로고 - Sage Green 필터 적용 */}
          <a
            href="/"
            onClick={closeMenu}
            className="flex items-center"
          >
            <Image
              src="/images/logo-horizontal.png"
              alt="법무법인 더율"
              width={140}
              height={35}
              className="h-7 w-auto"
              style={{ filter: 'brightness(0) saturate(100%) invert(46%) sepia(13%) saturate(1243%) hue-rotate(118deg) brightness(93%) contrast(87%)' }}
              priority
            />
          </a>

          {/* 닫기 버튼 - Sage Green hover */}
          <button
            onClick={closeMenu}
            className="p-2 text-sage-400 hover:text-sage-700 hover:bg-sage-50 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-sage-600"
            aria-label="메뉴 닫기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Navigation - Sage Green 디자인 */}
        <nav className="flex-1 overflow-y-auto px-8 sm:px-16 md:px-20 py-8">
          <div className="max-w-xl mx-auto w-full">
            {sectionLinks.map((item, index) => {
              const isExpanded = expandedItems.has(item.label);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <div
                  key={item.label}
                  className="border-b border-sage-100 last:border-0"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
                  }}
                >
                  {/* 메인 메뉴 항목 */}
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={`group w-full py-6 transition-all rounded-lg hover:bg-sage-50/50 focus-visible:outline-2 focus-visible:outline-sage-600 text-left ${
                        isExpanded ? 'bg-sage-50' : ''
                      }`}
                      aria-expanded={isExpanded}
                      aria-controls={`submenu-${item.label}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-medium text-gray-900 group-hover:text-sage-700 transition-colors tracking-tight">
                          {item.label}
                        </span>
                        <svg
                          className={`w-5 h-5 flex-shrink-0 text-sage-400 group-hover:text-sage-700 transition-all duration-300 ${
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
                      className="group block py-6 transition-all rounded-lg hover:bg-sage-50/30 focus-visible:outline-2 focus-visible:outline-sage-600"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl sm:text-3xl font-medium text-gray-900 group-hover:text-sage-700 transition-colors tracking-tight">
                          {item.label}
                        </span>
                        <svg
                          className="w-5 h-5 flex-shrink-0 text-sage-400 group-hover:text-sage-700 group-hover:translate-x-2 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  )}

                  {/* 서브메뉴 - 왼쪽 보더와 들여쓰기 */}
                  {hasChildren && isExpanded && (
                    <div
                      id={`submenu-${item.label}`}
                      className="pb-4 pl-6 space-y-3 border-l-2 border-sage-200 ml-2"
                    >
                      {item.children!.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between py-3 transition-all rounded-lg hover:bg-sage-50/30 focus-visible:outline-2 focus-visible:outline-sage-600"
                        >
                          <span className="text-lg sm:text-xl font-light text-gray-600 group-hover:text-sage-700 transition-colors">
                            {child.label}
                          </span>
                          <svg
                            className="w-5 h-5 flex-shrink-0 text-sage-400 group-hover:text-sage-700 group-hover:translate-x-1 transition-all duration-300"
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

        {/* Footer - Sage Green CTA & 신뢰 요소 */}
        <div className="border-t border-sage-200 bg-sage-50 px-8 sm:px-16 md:px-20 py-6 space-y-4">
          {/* 신뢰 배지 - 상담 가능 시간 */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-sage-700 font-medium">평일 09:00-18:00 상담 가능</span>
          </div>

          {/* CTA 버튼 - 상담 예약 모달 열기 */}
          <button
            onClick={() => {
              setIsBookingModalOpen(true);
              closeMenu();
            }}
            className="w-full px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-sage-600 text-white hover:bg-sage-700 hover:scale-[1.02] shadow-md hover:shadow-lg"
          >
            상담문의
          </button>

          {/* 전화번호 - Sage Green */}
          <div className="text-center">
            <p className="text-xs text-sage-600 mb-1">긴급 전화 상담</p>
            <a
              href="tel:1661-7633"
              className="text-xl font-bold text-sage-700 hover:text-sage-800 transition-colors focus-visible:outline-2 focus-visible:outline-sage-600 rounded"
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
        className="p-2 text-black hover:text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-sage-600 rounded"
        aria-label="메뉴 열기"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isMounted && isOpen && createPortal(overlay, document.body)}

      {/* 상담 예약 모달 */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </>
  );
}
