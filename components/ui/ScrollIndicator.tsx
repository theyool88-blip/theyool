'use client';

interface ScrollIndicatorProps {
  targetId?: string;
}

export default function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll down one viewport height
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce hidden md:block"
      aria-label="Scroll down"
    >
      <svg
        className="w-6 h-6 text-gray-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}
