'use client';

import { useEffect, useRef, useState } from 'react';
import MobileMenu from '@/components/ui/MobileMenu';

// Cache busting version - update when insta-story.html changes
const INSTA_VERSION = '20251123-v2';

export default function InstaTheyoolPage() {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [iframeSrc, setIframeSrc] = useState(`/insta-story.html?v=${INSTA_VERSION}`);

  useEffect(() => {
    // URL 해시를 iframe에 전달
    const hash = window.location.hash;
    if (hash) {
      setIframeSrc(`/insta-story.html?v=${INSTA_VERSION}${hash}`);
    }

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
        src={iframeSrc}
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
