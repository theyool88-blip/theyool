'use client';

import { useState, useEffect } from 'react';

interface Step3DateTimeProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  requestType: 'callback' | 'visit' | 'video';
}

export default function Step3DateTime({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  requestType
}: Step3DateTimeProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate available dates (평일만, 오늘부터 2주)
  const generateDates = () => {
    const dates: Date[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // 평일만 (월-금)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }

    return dates;
  };

  const availableDates = generateDates();

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];

    // 오전 (09:00 - 12:00)
    for (let hour = 9; hour <= 11; hour++) {
      slots.push({ time: `${hour.toString().padStart(2, '0')}:00`, period: '오전' });
      slots.push({ time: `${hour.toString().padStart(2, '0')}:30`, period: '오전' });
    }

    // 오후 (13:00 - 18:00)
    for (let hour = 13; hour <= 17; hour++) {
      slots.push({ time: `${hour.toString().padStart(2, '0')}:00`, period: '오후' });
      slots.push({ time: `${hour.toString().padStart(2, '0')}:30`, period: '오후' });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  const morningSlots = timeSlots.filter(s => s.period === '오전');
  const afternoonSlots = timeSlots.filter(s => s.period === '오후');

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

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          3. 언제 연락드리면 좋을까요? <span className="text-red-500">*</span>
        </h3>
        <p className="text-sm text-gray-500">
          상담 가능하신 시간을 알려주세요
        </p>
      </div>

      {/* Quick Options */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => {
            const today = new Date();
            const now = today.getHours();
            let time = '14:00';
            if (now < 9) time = '09:00';
            else if (now < 17) time = `${(now + 1).toString().padStart(2, '0')}:00`;

            onDateChange(formatDate(today));
            onTimeChange(time);
          }}
          className="px-4 py-2 rounded-lg border-2 border-amber-600 bg-amber-50 text-amber-700 font-semibold text-sm hover:bg-amber-100 transition-colors"
        >
          지금 바로
        </button>
        <button
          onClick={() => {
            const today = new Date();
            onDateChange(formatDate(today));
            onTimeChange('14:00');
          }}
          className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:border-amber-300 hover:bg-amber-50 transition-colors"
        >
          오늘 오후
        </button>
        <button
          onClick={() => {
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            // 주말이면 다음 평일로
            while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
              tomorrow.setDate(tomorrow.getDate() + 1);
            }
            onDateChange(formatDate(tomorrow));
            onTimeChange('10:00');
          }}
          className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:border-amber-300 hover:bg-amber-50 transition-colors"
        >
          내일
        </button>
      </div>

      {/* Date Selection */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">날짜 선택</p>
        <div className="grid grid-cols-7 gap-2">
          {availableDates.slice(0, 7).map((date) => {
            const dateString = formatDate(date);
            const isSelected = selectedDate === dateString;
            const isToday = formatDate(new Date()) === dateString;
            const days = ['일', '월', '화', '수', '목', '금', '토'];

            return (
              <button
                key={dateString}
                onClick={() => onDateChange(dateString)}
                className={`
                  flex flex-col items-center justify-center py-3 rounded-xl transition-all
                  ${isSelected
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50'
                  }
                  ${isToday && !isSelected ? 'border-amber-600' : ''}
                `}
                aria-label={`${date.getMonth() + 1}월 ${date.getDate()}일 선택`}
                aria-pressed={isSelected}
              >
                <span className="text-xs font-medium mb-1">
                  {days[date.getDay()]}
                </span>
                <span className="text-lg font-bold">
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-4">
          {/* 오전 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">오전</p>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map(({ time }) => {
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() => onTimeChange(time)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-semibold transition-all
                      ${isSelected
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-500 hover:bg-amber-50'
                      }
                    `}
                    aria-label={`${time} 선택`}
                    aria-pressed={isSelected}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 오후 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">오후</p>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map(({ time }) => {
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() => onTimeChange(time)}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-semibold transition-all
                      ${isSelected
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-500 hover:bg-amber-50'
                      }
                    `}
                    aria-label={`${time} 선택`}
                    aria-pressed={isSelected}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl">
          <p className="text-center font-semibold text-gray-900">
            선택: {formatDisplayDate(selectedDate)} {selectedTime}
          </p>
        </div>
      )}

      {/* Social Proof */}
      <div className="text-center pt-2">
        <p className="text-sm text-gray-500">
          ✅ 24시간 내 예약 확정 · 시간 엄수율 98%
        </p>
      </div>
    </div>
  );
}
