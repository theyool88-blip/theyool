'use client';

import { useEffect, useRef } from 'react';
import MobileMenu from '@/components/ui/MobileMenu';

export default function InstaTheyoolPage() {
  const menuContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'openMenu') {
        // Find and click the MobileMenu button
        const menuButton = menuContainerRef.current?.querySelector('button');
        menuButton?.click();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Hidden MobileMenu trigger */}
      <div
        ref={menuContainerRef}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 10000, opacity: 0, pointerEvents: 'none' }}
      >
        <div style={{ pointerEvents: 'all' }}>
          <MobileMenu />
        </div>
      </div>

      {/* Full-screen Instagram-like UI in iframe */}
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
