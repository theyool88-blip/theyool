'use client';

import { useState } from 'react';
import { OfficeLocation } from '@/types/consultation';

interface Step4AdditionalInfoProps {
  name: string;
  category: string;
  officeLocation: OfficeLocation | '';
  message: string;
  requestType: 'callback' | 'visit' | 'video';
  selectedDate: string;
  selectedTime: string;
  phone: string;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onOfficeChange: (value: OfficeLocation | '') => void;
  onMessageChange: (value: string) => void;
}

export default function Step4AdditionalInfo({
  name,
  category,
  officeLocation,
  message,
  requestType,
  selectedDate,
  selectedTime,
  phone,
  onNameChange,
  onCategoryChange,
  onOfficeChange,
  onMessageChange
}: Step4AdditionalInfoProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const categories = [
    { value: '', label: '상담 분야 선택 (선택)' },
    { value: '재산분할', label: '재산분할' },
    { value: '양육권·양육비', label: '양육권·양육비' },
    { value: '위자료', label: '위자료' },
    { value: '불륜·상간', label: '불륜·상간' },
    { value: '기타', label: '기타' }
  ];

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  const getMethodLabel = () => {
    switch (requestType) {
      case 'callback': return '전화상담';
      case 'visit': return '방문상담';
      case 'video': return '화상상담';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          4. 마지막으로 조금만 더 알려주세요
        </h3>
        <p className="text-sm text-gray-500">
          선택 사항 - 더 준비된 상담을 위해
        </p>
      </div>

      {/* Accordion */}
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
          aria-expanded={isExpanded}
        >
          <span className="font-semibold text-gray-900">
            {isExpanded ? '▼' : '▶'} 기본 정보 (선택)
          </span>
        </button>

        {isExpanded && (
          <div className="p-4 space-y-4 bg-white">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                이름 (선택)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="홍길동"
                className="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                상담 분야 (선택)
              </label>
              <select
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Office Location (방문시만) */}
            {requestType === 'visit' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  사무소 (방문시)
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => onOfficeChange('천안')}
                    className={`
                      flex-1 py-3 rounded-lg border-2 font-semibold transition-all
                      ${officeLocation === '천안'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                      }
                    `}
                  >
                    천안
                  </button>
                  <button
                    onClick={() => onOfficeChange('평택')}
                    className={`
                      flex-1 py-3 rounded-lg border-2 font-semibold transition-all
                      ${officeLocation === '평택'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                      }
                    `}
                  >
                    평택
                  </button>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                상세 내용 (선택)
              </label>
              <textarea
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="간단히 상황을 알려주시면 더 정확한 상담이 가능합니다"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Booking Summary */}
      <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl space-y-2">
        <p className="text-xs font-semibold text-gray-500 mb-3">예약 요약</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">
              {formatDisplayDate(selectedDate)} {selectedTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">
              {getMethodLabel()}
              {requestType === 'visit' && officeLocation && ` (${officeLocation})`}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Message */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          상담 내용은 철저히 비밀로 보호됩니다
        </p>
        <p className="text-xs text-gray-500 mt-1">
          상담 신청 ≠ 수임 계약. 편하게 문의하세요.
        </p>
      </div>

      {/* Social Proof */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          ✅ SSL 암호화 전송 · 대한변호사협회 인증
        </p>
      </div>
    </div>
  );
}
