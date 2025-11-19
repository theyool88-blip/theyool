'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  clientInitial: string;
  caseType: string;
  result: string;
}

interface ThePlanTestimonialsProps {
  testimonials: Testimonial[];
}

export default function ThePlanTestimonials({ testimonials }: ThePlanTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) {
    return null;
  }

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Card */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-md">
        {/* Quote Mark */}
        <div className="text-5xl text-gray-300 mb-4">"</div>

        {/* Quote Text */}
        <p className="text-lg md:text-xl font-light italic text-gray-700 leading-relaxed mb-6">
          {current.quote}
        </p>

        {/* Attribution */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-semibold text-gray-900">— {current.clientInitial}</p>
            <p className="text-sm text-gray-500">{current.caseType}</p>
          </div>

          {/* Result Badge */}
          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {current.result}
          </div>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gray-900 w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
