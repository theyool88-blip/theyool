'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import MobileMenu from '@/components/ui/MobileMenu';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - 홈페이지와 동일 */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm">
        <nav className="max-w-[1200px] mx-auto px-8 sm:px-16 md:px-20">
          <div className="flex justify-between items-center h-16">
            {/* 왼쪽: 햄버거 메뉴 */}
            <div className="flex items-center">
              <MobileMenu />
            </div>

            {/* 중앙: 로고 */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="/images/logo-horizontal.png"
                  alt="법무법인 더율"
                  width={180}
                  height={45}
                  className="h-6 md:h-7 w-auto cursor-pointer"
                  style={{ filter: 'brightness(0) saturate(100%) invert(46%) sepia(13%) saturate(1243%) hue-rotate(118deg) brightness(93%) contrast(87%)' }}
                  priority
                />
              </Link>
            </div>

            {/* 오른쪽: 상담예약 버튼 */}
            <div className="flex items-center">
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="text-sm font-semibold text-sage-700 hover:text-sage-800 underline decoration-2 underline-offset-4 decoration-sage-600 transition-colors"
              >
                상담예약
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Consultation Booking Modal */}
      <ConsultationBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-sage-50 text-neutral-800 py-20 px-8 sm:px-16 md:px-20 border-t border-sage-200">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-sage-800">법무법인 더율</h4>
              <p className="text-neutral-600 text-lg mb-4">이혼전문변호사</p>
              <p className="text-neutral-600 text-sm">광고 책임 변호사 : 임은지</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-sage-800">연락처</h4>
              <p className="text-neutral-600 mb-2">
                전화: <a href="tel:1661-7633" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">1661-7633</a>
              </p>
              <p className="text-neutral-600">
                이메일: <a href="mailto:info@theyool.com" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">info@theyool.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-sage-800">오시는 길</h4>
              <a href="/contact" className="block text-neutral-600 text-sm mb-3 hover:text-sage-700 transition-colors">
                <span className="font-semibold text-sage-800">천안 주사무소</span><br />
                충남 천안시 동남구 청수5로 11, 9층
              </a>
              <a href="/contact" className="block text-neutral-600 text-sm hover:text-sage-700 transition-colors">
                <span className="font-semibold text-sage-800">평택 분사무소</span><br />
                경기 평택시 평남로 1029-1, 6층
              </a>
            </div>
          </div>

          <div className="border-t border-sage-200 pt-8 mb-6">
            <div className="text-neutral-600 text-sm space-y-2">
              <p>법인명 : 법무법인 더율 | 대표자 : 육심원외 1</p>
              <p>사업자번호 : 354-85-01451(평택), 514-86-01593(천안)</p>
            </div>
          </div>

          <div className="border-t border-sage-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  이용약관
                </Link>
                <Link href="/disclaimer" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  면책공고
                </Link>
                <Link href="/faq" className="text-sage-700 hover:text-sage-800 transition-colors font-medium">
                  이혼큐레이션
                </Link>
              </div>
            </div>
            <p className="text-neutral-500 text-sm text-center md:text-left">
              Copyright &copy; 2025 법무법인 더율 | Powered by 법무법인 더율
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
