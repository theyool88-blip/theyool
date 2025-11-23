'use client';

import { useState } from 'react';

interface Step1PhoneProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function Step1Phone({ value, onChange, error }: Step1PhoneProps) {
  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          혼자 고민하지 마세요
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          이혼전문변호사가 바로 연락드립니다
        </p>
        <p className="text-sm text-gray-500">
          원하시는 시간에 편안하게 상담받으세요
        </p>
      </div>

      {/* Step Title */}
      <div className="pt-4">
        <label className="block text-lg font-semibold text-gray-900 mb-2">
          1. 편하게 연락받으실 번호를 알려주세요 <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-4">
          예약 확정 문자 발송용
        </p>
      </div>

      {/* Phone Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <input
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder="010-0000-0000"
          maxLength={13}
          className={`
            w-full h-14 pl-12 pr-4 rounded-xl border-2 text-lg
            transition-all duration-200
            ${error
              ? 'border-red-500 focus:border-red-600 focus:ring-red-500'
              : 'border-gray-200 focus:border-amber-600 focus:ring-amber-500'
            }
            focus:outline-none focus:ring-2
          `}
          aria-label="연락처 입력"
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
        />
        {error && (
          <div
            id="phone-error"
            className="absolute left-0 top-full mt-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>

      {/* Trust Element */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>100% 비밀보장 · 제3자 공유 없음</span>
      </div>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          ✅ 오늘 상담 신청 12건 · 평균 2시간 내 연락
        </p>
      </div>
    </div>
  );
}
