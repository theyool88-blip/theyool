'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import MobileMenu from '@/components/ui/MobileMenu';
import Modal from '@/components/ui/Modal';
import ConsultationForm from '@/components/features/ConsultationForm';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - 홈페이지와 동일 */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm">
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-8">
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
                  className="h-6 md:h-7 w-auto cursor-pointer brightness-0"
                  priority
                />
              </Link>
            </div>

            {/* 오른쪽: 상담예약 텍스트 */}
            <div className="flex items-center">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="text-sm font-normal text-black hover:text-gray-600 transition-colors"
              >
                상담예약
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 상담 모달 */}
      <Modal isOpen={isTalkModalOpen} onClose={() => setIsTalkModalOpen(false)}>
        <ConsultationForm onCancel={() => setIsTalkModalOpen(false)} />
      </Modal>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--gray-900)] text-white py-20 px-6 lg:px-8">
        <div className="max-w-[1040px] mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="text-2xl font-bold mb-4">법무법인 더율</h4>
              <p className="text-[var(--gray-400)] text-lg mb-4">이혼전문변호사</p>
              <p className="text-[var(--gray-400)] text-sm">광고 책임 변호사 : 임은지</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">연락처</h4>
              <p className="text-[var(--gray-400)] mb-2">
                전화: <a href="tel:1661-7633" className="hover:text-white transition-colors">1661-7633</a>
              </p>
              <p className="text-[var(--gray-400)]">
                이메일: <a href="mailto:info@theyool.com" className="hover:text-white transition-colors">info@theyool.com</a>
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">오시는 길</h4>
              <a href="/contact" className="block text-[var(--gray-400)] text-sm mb-3 hover:text-white transition-colors">
                <span className="font-semibold text-white">천안 주사무소</span><br />
                충남 천안시 동남구 청수5로 11, 9층
              </a>
              <a href="/contact" className="block text-[var(--gray-400)] text-sm hover:text-white transition-colors">
                <span className="font-semibold text-white">평택 분사무소</span><br />
                경기 평택시 평남로 1029-1, 6층
              </a>
            </div>
          </div>

          <div className="border-t border-[var(--gray-800)] pt-8 mb-6">
            <div className="text-[var(--gray-400)] text-sm space-y-2">
              <p>법인명 : 법무법인 더율 | 대표자 : 육심원외 1</p>
              <p>사업자번호 : 354-85-01451(평택), 514-86-01593(천안)</p>
            </div>
          </div>

          <div className="border-t border-[var(--gray-800)] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
                <Link href="/terms" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  이용약관
                </Link>
                <Link href="/disclaimer" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  면책공고
                </Link>
                <Link href="/faq" className="text-[var(--gray-400)] hover:text-white transition-colors">
                  이혼큐레이션
                </Link>
              </div>
            </div>
            <p className="text-[var(--gray-500)] text-sm text-center md:text-left">
              Copyright &copy; 2025 법무법인 더율 | Powered by 법무법인 더율
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
