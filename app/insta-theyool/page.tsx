'use client';

import { useEffect } from 'react';

export default function InstaTheyoolPage() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Full-screen Instagram-like UI in iframe - no header for immersive experience */}
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
