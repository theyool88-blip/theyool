'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import MobileMenu from '@/components/ui/MobileMenu';
import ConsultationButton from '@/components/features/ConsultationButton';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Apple Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <nav className="max-w-[1040px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo-horizontal.png"
                  alt="법무법인 더율"
                  width={200}
                  height={50}
                  className="h-7 md:h-8 w-auto"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile Menu (햄버거) - 왼쪽 */}
              <MobileMenu />

              {/* 상담문의 버튼 - 오른쪽 */}
              <ConsultationButton size="sm" />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-20 px-6 lg:px-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4">법무법인 더율</h4>
              <p className="text-[var(--gray-400)] text-lg">이혼전문변호사</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">연락처</h4>
              <p className="text-[var(--gray-400)] mb-2">전화: 02-1234-5678</p>
              <p className="text-[var(--gray-400)]">이메일: info@theyool.com</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">상담시간</h4>
              <p className="text-[var(--gray-400)] mb-2">평일: 09:00 - 18:00</p>
              <p className="text-[var(--gray-400)]">주말/공휴일: 예약 상담</p>
            </div>
          </div>
          <div className="border-t border-[var(--gray-800)] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[var(--gray-500)] text-center md:text-left">
                &copy; 2024 법무법인 더율. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  이용약관
                </Link>
                <Link href="/faq" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
