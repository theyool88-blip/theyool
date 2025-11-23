'use client';

import { useState, useRef, useEffect } from 'react';
import { RequestType, OfficeLocation } from '@/types/consultation';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationBookingModal({
  isOpen,
  onClose
}: ConsultationBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [phone, setPhone] = useState('');
  const [requestType, setRequestType] = useState<RequestType | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [officeLocation, setOfficeLocation] = useState<OfficeLocation | ''>('');
  const [message, setMessage] = useState('');

  // Validation errors
  const [phoneError, setPhoneError] = useState('');

  // Refs for scroll
  const dateScrollRef = useRef<HTMLDivElement>(null);
  const timeScrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    if (phoneError) setPhoneError('');
  };

  const validatePhone = (): boolean => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phone.trim()) {
      setPhoneError('연락처를 입력해주세요');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError('올바른 전화번호 형식으로 입력해주세요 (010-XXXX-XXXX)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmit = async () => {
    // Validation
    if (!validatePhone()) return;

    if (!requestType) {
      alert('상담 방법을 선택해주세요');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('희망 일시를 선택해주세요');
      return;
    }

    // 방문 상담인데 사무소 선택 안 한 경우
    if (requestType === 'visit' && !officeLocation) {
      alert('방문하실 사무소를 선택해주세요');
      return;
    }

    setIsSubmitting(true);

    try {
      const consultationData: any = {
        request_type: requestType,
        phone,
        preferred_date: selectedDate,
        preferred_time: selectedTime,
      };

      // Optional fields
      if (name) consultationData.name = name;
      if (category) consultationData.category = category;
      if (message) consultationData.message = message;
      if (requestType === 'visit' && officeLocation) {
        consultationData.office_location = officeLocation;
      }

      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('상담 신청이 완료되었습니다!\n담당 변호사가 24시간 내에 연락드리겠습니다.');
        onClose();
        // Reset form
        setPhone('');
        setRequestType(null);
        setSelectedDate('');
        setSelectedTime('');
        setName('');
        setCategory('');
        setOfficeLocation('');
        setMessage('');
      } else {
        alert(data.error || '상담 신청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Consultation error:', error);
      alert('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 현재 시간 이후의 시간만 필터링
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const isToday = selectedDate === formatDate(new Date());

    for (let hour = 9; hour <= 17; hour++) {
      for (const minute of [0, 30]) {
        // 오늘 선택 시 현재 시간 이후만 표시
        if (isToday) {
          if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
            continue;
          }
        }

        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  // 날짜 생성 (평일만, 2주)
  const generateDates = () => {
    const dates: Date[] = [];
    const today = new Date();
    let count = 0;
    let daysChecked = 0;

    while (count < 10 && daysChecked < 20) {
      const date = new Date(today);
      date.setDate(today.getDate() + daysChecked);

      // 평일만 (월-금)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
        count++;
      }
      daysChecked++;
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  const getMonthLabel = (date: Date) => {
    return `${date.getMonth() + 1}월`;
  };

  const timeSlots = generateTimeSlots();
  const availableDates = generateDates();
  const categories = [
    { value: '', label: '선택 (선택사항)' },
    { value: '이혼소송', label: '이혼소송' },
    { value: '상간·불륜', label: '상간·불륜' },
    { value: '조정이혼', label: '조정이혼' },
    { value: '협의이혼', label: '협의이혼' },
    { value: '기타', label: '기타' }
  ];

  // 빠른 시간 선택
  const handleQuickTime = () => {
    const now = new Date();
    const today = formatDate(now);
    setSelectedDate(today);

    // 현재 시간 이후 첫 번째 가능한 시간 선택
    const currentHour = now.getHours();
    if (currentHour < 9) {
      setSelectedTime('09:00');
    } else if (currentHour >= 17) {
      // 오늘은 불가능, 내일로
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      setSelectedDate(formatDate(tomorrow));
      setSelectedTime('09:00');
    } else {
      // 다음 30분 단위 시간
      const nextHour = currentHour + 1;
      setSelectedTime(`${nextHour.toString().padStart(2, '0')}:00`);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-sage-900/20 via-black/30 to-black/40 backdrop-blur-[2px] transition-opacity z-[9998]"
        onClick={onClose}
      />

      {/* Modal - Modern style */}
      <div className="relative min-h-screen flex items-center justify-center p-4 z-[9999]">
        <div className="relative w-full max-w-md">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all z-20 group"
            aria-label="닫기"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="bg-white/98 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_-10px_rgba(109,181,164,0.15)] border border-sage-100/20 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >

          {/* Content */}
          <div className="p-8 sm:p-10 space-y-6">
            {/* Header - modern */}
            <div className="text-center pb-3">
              {/* Emotional Tagline Badge */}
              <div className="flex justify-center mb-3">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-100 border border-sage-500/20"
                  style={{
                    animation: 'fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-sage-500"></div>
                  <p className="text-xs font-medium text-sage-800 tracking-wide">
                    당신의 평온함을 그립니다
                  </p>
                </div>
              </div>

              <h2 className="text-[28px] font-[650] text-gray-900 tracking-[-0.02em] mb-2">상담 예약</h2>
              <p className="text-[13px] text-gray-600">24시간 내 연락드립니다</p>
            </div>

            {/* 1. 연락처 */}
            <div className="space-y-2">
              <label className="block">
                <span className="text-[15px] font-[550] text-gray-700 tracking-[-0.01em]">
                  연락처 <span className="text-sage-600">*</span>
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="010-0000-0000"
                  maxLength={13}
                  className={`mt-2 w-full h-12 px-4 rounded-xl border text-[15px] ${
                    phoneError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-sage-500'
                  } focus:outline-none transition-all`}
                />
              </label>
              {phoneError && (
                <p className="text-[13px] text-red-500">{phoneError}</p>
              )}
            </div>

            {/* 2. 상담 방법 */}
            <div className="space-y-3">
              <p className="text-[15px] font-[550] text-gray-700 tracking-[-0.01em]">
                상담 방법 <span className="text-sage-600">*</span>
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setRequestType('callback')}
                  className={`relative py-3 px-2 rounded-xl border-2 transition-all ${
                    requestType === 'callback'
                      ? 'border-sage-500 bg-sage-500 text-white shadow-sm'
                      : 'border-gray-200 bg-white hover:border-sage-300 text-gray-700'
                  }`}
                >
                  {requestType === 'callback' && (
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-blue-500 text-white text-[9px] font-bold rounded-md">
                      무료
                    </span>
                  )}
                  <div className="text-[14px] font-[550]">전화</div>
                </button>
                <button
                  onClick={() => setRequestType('visit')}
                  className={`py-3 px-2 rounded-xl border-2 transition-all ${
                    requestType === 'visit'
                      ? 'border-sage-500 bg-sage-500 text-white shadow-sm'
                      : 'border-gray-200 bg-white hover:border-sage-300 text-gray-700'
                  }`}
                >
                  <div className="text-[14px] font-[550]">방문</div>
                </button>
                <button
                  onClick={() => setRequestType('video')}
                  className={`py-3 px-2 rounded-xl border-2 transition-all ${
                    requestType === 'video'
                      ? 'border-sage-500 bg-sage-500 text-white shadow-sm'
                      : 'border-gray-200 bg-white hover:border-sage-300 text-gray-700'
                  }`}
                >
                  <div className="text-[14px] font-[550]">화상</div>
                </button>
              </div>
            </div>

            {/* 3. 방문 사무소 (방문시만) - compact */}
            {requestType === 'visit' && (
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-900">
                  방문 사무소 <span className="text-sage-600">*</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOfficeLocation('천안')}
                    className={`py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                      officeLocation === '천안'
                        ? 'bg-sage-600 border-sage-600 text-white hover:bg-sage-700 hover:border-sage-700'
                        : 'border-gray-300 hover:border-sage-300'
                    }`}
                  >
                    천안
                  </button>
                  <button
                    onClick={() => setOfficeLocation('평택')}
                    className={`py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                      officeLocation === '평택'
                        ? 'bg-sage-600 border-sage-600 text-white hover:bg-sage-700 hover:border-sage-700'
                        : 'border-gray-300 hover:border-sage-300'
                    }`}
                  >
                    평택
                  </button>
                </div>
              </div>
            )}

            {/* 4. 희망 날짜/시간 - Compact with quick select */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">
                  날짜 · 시간 <span className="text-sage-600">*</span>
                </p>
                <button
                  onClick={handleQuickTime}
                  className="px-2.5 py-1 rounded-md bg-sage-600 hover:bg-sage-700 text-white text-xs font-bold transition-all"
                >
                  가장 빨리
                </button>
              </div>

              {/* Month label */}
              {availableDates.length > 0 && (
                <div className="text-xs font-semibold text-sage-600">
                  {getMonthLabel(availableDates[0])}
                  {availableDates[availableDates.length - 1].getMonth() !== availableDates[0].getMonth() && (
                    <> ~ {getMonthLabel(availableDates[availableDates.length - 1])}</>
                  )}
                </div>
              )}

              {/* Compact date scroll */}
              <div
                ref={dateScrollRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {availableDates.map((date) => {
                  const dateString = formatDate(date);
                  const isSelected = selectedDate === dateString;
                  const isToday = formatDate(new Date()) === dateString;
                  const days = ['일', '월', '화', '수', '목', '금', '토'];

                  return (
                    <button
                      key={dateString}
                      onClick={() => setSelectedDate(dateString)}
                      className={`flex-shrink-0 w-14 py-2 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-sage-600 text-white hover:bg-sage-700'
                          : 'bg-sage-50 text-gray-900 hover:bg-sage-100'
                      }`}
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <div className="text-[10px] opacity-70">{days[date.getDay()]}</div>
                      <div className="text-base font-bold">{date.getDate()}</div>
                      {isToday && <div className="text-[9px] font-bold">오늘</div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. 희망 시간 - Compact time scroll */}
            {selectedDate && (
              <div className="space-y-2">
                {timeSlots.length === 0 ? (
                  <div className="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-600">
                    오늘은 예약 가능한 시간이 없습니다
                  </div>
                ) : (
                  <div
                    ref={timeScrollRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-1"
                    style={{
                      scrollSnapType: 'x mandatory',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isSelected
                              ? 'bg-sage-600 text-white hover:bg-sage-700'
                              : 'bg-sage-50 text-gray-900 hover:bg-sage-100'
                          }`}
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* 6. 추가 정보 - Simple inline */}
            <details className="group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between py-2 text-sm text-gray-600">
                  <span>추가 정보</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>

              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름"
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="상담 내용"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-gray-900 focus:outline-none resize-none text-sm"
                />
              </div>
            </details>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full h-14 rounded-xl font-[650] text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm ${
                isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-sage-600 text-white hover:bg-sage-700 hover:shadow-md'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  예약 중...
                </>
              ) : (
                '예약 신청'
              )}
            </button>

            {/* Trust Message */}
            <p className="text-center text-[13px] text-gray-500 tracking-[-0.005em]">
              100% 비밀보장 · 10분 전화 무료 · 계약 강요 없음
            </p>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
}
