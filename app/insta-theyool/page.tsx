'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from '@/components/ui/MobileMenu';

export default function InstaTheyoolPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Shared header (same hamburger source as homepage) */}
      <header
        className="fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ height: 56 }}
      >
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <MobileMenu />
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image src="/images/logo-horizontal.png" alt="법무법인 더율" width={160} height={40} className="h-6 w-auto brightness-0" />
              </Link>
            </div>
            <div className="w-6" />
          </div>
        </nav>
      </header>

      {/* Instagram-like UI in iframe */}
      <iframe
        src="/insta-story.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block'
        }}
        title="Insta더율"
      />
    </div>
  );
}
