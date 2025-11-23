'use client';

import { RequestType } from '@/types/consultation';

interface Step2MethodProps {
  value: RequestType | null;
  onChange: (value: RequestType) => void;
}

export default function Step2Method({ value, onChange }: Step2MethodProps) {
  const methods = [
    {
      type: 'callback' as RequestType,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: '전화상담',
      subtitle: '가장 빠르고 편리한 상담',
      badge: '인기',
      description: '지금 바로'
    },
    {
      type: 'visit' as RequestType,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: '방문상담',
      subtitle: '대면으로 꼼꼼하게',
      description: '천안·평택 사무소'
    },
    {
      type: 'video' as RequestType,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      title: '화상상담',
      subtitle: '얼굴 보며 안전하게',
      description: '거리 제약 없이'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          2. 어떤 방법으로 상담받고 싶으신가요? <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-500">
          편하신 상담 방식을 선택해주세요
        </p>
      </div>

      {/* Method Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {methods.slice(0, 2).map((method) => (
          <button
            key={method.type}
            onClick={() => onChange(method.type)}
            className={`
              group relative p-6 rounded-2xl border-2 transition-all duration-300
              ${value === method.type
                ? 'border-amber-600 bg-amber-50 shadow-lg scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md'
              }
            `}
            aria-label={`${method.title} 선택`}
            aria-pressed={value === method.type}
          >
            {method.badge && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 bg-amber-600 text-white text-xs font-bold rounded-md">
                  {method.badge}
                </span>
              </div>
            )}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center transition-colors
                ${value === method.type ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600 group-hover:bg-amber-50 group-hover:text-amber-600'}
              `}>
                {method.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">
                  {method.title}
                </h4>
                <p className="text-xs text-gray-500 mb-1">
                  {method.subtitle}
                </p>
                <p className="text-sm font-semibold text-amber-600">
                  {method.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Video option - Full width */}
      <button
        onClick={() => onChange(methods[2].type)}
        className={`
          w-full p-6 rounded-2xl border-2 transition-all duration-300
          ${value === methods[2].type
            ? 'border-amber-600 bg-amber-50 shadow-lg'
            : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-md'
          }
        `}
        aria-label={`${methods[2].title} 선택`}
        aria-pressed={value === methods[2].type}
      >
        <div className="flex items-center gap-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
            ${value === methods[2].type ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-600'}
          `}>
            {methods[2].icon}
          </div>
          <div className="text-left flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              {methods[2].title}
            </h4>
            <p className="text-xs text-gray-500 mb-1">
              {methods[2].subtitle}
            </p>
            <p className="text-sm font-semibold text-amber-600">
              {methods[2].description}
            </p>
          </div>
        </div>
      </button>

      {/* Social Proof */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-500">
          ✅ 전화상담 72% 선택 · 평균 만족도 4.8/5.0
        </p>
      </div>
    </div>
  );
}
