'use client';

import { useState, useEffect } from 'react';
import {
  CreateVisitInput,
  CreateVideoInput,
  OfficeLocation,
  LawyerName,
  RequestType
} from '@/types/consultation';

// Legacy type aliases for compatibility
type BookingType = 'visit' | 'video';
type BookingFormData = (CreateVisitInput | CreateVideoInput) & { type: BookingType };

const LAWYER_LABELS: Record<LawyerName, string> = {
  '육심원': '육심원 변호사',
  '임은지': '임은지 변호사',
};
import {
  trackBookingStarted,
  trackBookingTypeSelected,
  trackBookingDateSelected,
  trackBookingTimeSelected,
  trackBookingOfficeSelected,
  trackBookingInfoSubmitted,
  trackBookingCompleted,
} from '@/lib/analytics/gtag';

interface BookingFormProps {
  onClose?: () => void;
  initialType?: BookingType;
  initialLawyer?: LawyerName;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function BookingForm({ onClose, initialType, initialLawyer }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    type: initialType,
    preferred_lawyer: initialLawyer,
  });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 📊 Analytics: 예약 시작 추적
  useEffect(() => {
    trackBookingStarted(initialType);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Step 2: 날짜 선택 시 예약 가능한 시간 로드
  useEffect(() => {
    if (currentStep === 3 && formData.preferred_date) {
      loadAvailableSlots();
    }
  }, [currentStep, formData.preferred_date]);

  const loadAvailableSlots = async () => {
    setIsLoadingSlots(true);
    try {
      const params = new URLSearchParams({
        date: formData.preferred_date!,
        ...(formData.type === 'visit' && formData.office_location && {
          office: formData.office_location,
        }),
      });

      const response = await fetch(`/api/consultations/available-slots?${params}`);
      const data = await response.json();

      if (data.success) {
        const available = data.slots
          .filter((slot: any) => slot.available)
          .map((slot: any) => slot.time);
        setAvailableSlots(available);
      }
    } catch (error) {
      console.error('Failed to load slots:', error);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 3 && formData.type === 'video') {
        // 화상 상담은 사무소 선택 스킵
        setCurrentStep(5 as Step);
      } else if (currentStep < 5) {
        setCurrentStep((currentStep + 1) as Step);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 5 && formData.type === 'video') {
      // 화상 상담은 사무소 선택 스킵
      setCurrentStep(3 as Step);
    } else if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1 && !formData.type) {
      newErrors.type = '상담 유형을 선택해주세요';
    }
    if (currentStep === 2 && !formData.preferred_date) {
      newErrors.date = '날짜를 선택해주세요';
    }
    if (currentStep === 3 && !formData.preferred_time) {
      newErrors.time = '시간을 선택해주세요';
    }
    if (currentStep === 4 && formData.type === 'visit' && !formData.office_location) {
      newErrors.office = '사무소를 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      setErrors({
        name: !formData.name ? '이름을 입력해주세요' : '',
        phone: !formData.phone ? '연락처를 입력해주세요' : '',
      });
      return;
    }

    // 📊 Analytics: 정보 입력 완료
    trackBookingInfoSubmitted({
      type: formData.type!,
      category: formData.category,
      office_location: formData.office_location,
    });

    setIsSubmitting(true);

    try {
      // Convert to consultation format
      const consultationData = {
        request_type: formData.type as RequestType,
        name: formData.name!,
        phone: formData.phone!,
        email: formData.email,
        category: formData.category,
        message: formData.message,
        preferred_date: formData.preferred_date!,
        preferred_time: formData.preferred_time!,
        ...(formData.type === 'visit' && { office_location: formData.office_location }),
        preferred_lawyer: formData.preferred_lawyer,
      };

      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultationData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // 📊 Analytics: 예약 완료! (전환)
        trackBookingCompleted({
          type: formData.type!,
          category: formData.category,
          office_location: formData.office_location,
          preferred_date: formData.preferred_date!,
          preferred_time: formData.preferred_time!,
        });

        // 성공 메시지 표시 후 홈으로 이동
        alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        if (onClose) {
          onClose();
        } else {
          window.location.href = '/';
        }
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

  // 날짜 생성 (오늘부터 2주)
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // 주말 제외
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }

    return dates;
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDayName = (date: Date) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
  };

  return (
    <div className="booking-form-container">
      {/* Progress Indicator */}
      {currentStep !== 6 && (
        <div className="progress-indicator">
          <div className={`step ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>
            <div className="step-circle">{currentStep > 1 ? '✓' : '1'}</div>
            <span className="step-label">상담 유형</span>
          </div>
          <div className={`step-line ${currentStep > 1 ? 'completed' : ''}`}></div>
          <div className={`step ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}>
            <div className="step-circle">{currentStep > 2 ? '✓' : '2'}</div>
            <span className="step-label">날짜</span>
          </div>
          <div className={`step-line ${currentStep > 2 ? 'completed' : ''}`}></div>
          <div className={`step ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}>
            <div className="step-circle">{currentStep > 3 ? '✓' : '3'}</div>
            <span className="step-label">시간</span>
          </div>
          <div className={`step-line ${currentStep > 3 ? 'completed' : ''}`}></div>
          <div className={`step ${currentStep >= 5 ? 'active' : ''}`}>
            <div className="step-circle">{currentStep > 5 ? '✓' : '4'}</div>
            <span className="step-label">완료</span>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="step-content">
        {/* Step 1: 상담 유형 선택 */}
        {currentStep === 1 && (
          <div className="step-1">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              편안한 방법으로 만나뵙겠습니다
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center mb-2">
              30분 무료 상담, 어떤 방식이 편하신가요?
            </p>
            <p className="text-sm text-gray-500 text-center mb-8">
              약 2-3분이면 예약이 완료됩니다
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                className={`consultation-type-card ${formData.type === 'visit' ? 'selected' : ''}`}
                onClick={() => {
                  setFormData({ ...formData, type: 'visit' });
                  trackBookingTypeSelected('visit');
                }}
              >
                <div className="icon-circle">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="badge recommended">추천</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">직접 만나서 상담</h3>
                <p className="text-sm text-gray-600 mb-4">
                  변호사와 1:1 대면 상담으로 깊이 있는 법률 검토
                </p>
                <ul className="benefits">
                  <li>✓ 서류 즉시 검토 가능</li>
                  <li>✓ 상세한 전략 수립</li>
                  <li>✓ 천안 · 평택 사무소</li>
                </ul>
              </button>

              <button
                className={`consultation-type-card ${formData.type === 'video' ? 'selected' : ''}`}
                onClick={() => {
                  setFormData({ ...formData, type: 'video' });
                  trackBookingTypeSelected('video');
                }}
              >
                <div className="icon-circle">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="badge">편리</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">화상으로 상담</h3>
                <p className="text-sm text-gray-600 mb-4">
                  안전한 공간에서 편하게 받는 비대면 상담
                </p>
                <ul className="benefits">
                  <li>✓ 이동 시간 절약</li>
                  <li>✓ 전국 어디서나</li>
                  <li>✓ ZOOM으로 진행</li>
                </ul>
              </button>
            </div>

            <div className="trust-badge-container">
              <span className="trust-badge">✅ 2,700건 이상 상담 경험</span>
            </div>
          </div>
        )}

        {/* Step 2: 날짜 선택 */}
        {currentStep === 2 && (
          <div className="step-2">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              변호사님이 기다리고 있습니다
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              평일 09:00-18:00 상담 가능합니다
            </p>

            <div className="calendar-grid">
              {generateDates().map((date, index) => {
                const dateStr = formatDate(date);
                const isSelected = formData.preferred_date === dateStr;

                return (
                  <button
                    key={index}
                    className={`date-button available ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, preferred_date: dateStr });
                      trackBookingDateSelected(dateStr, formData.type!);
                    }}
                  >
                    <span className="day">{getDayName(date)}</span>
                    <span className="date">{date.getDate()}</span>
                    <span className="availability">예약가능</span>
                  </button>
                );
              })}
            </div>

            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>🔒 예약 정보는 변호사만 확인합니다</p>
            </div>

            <div className="trust-badge-container">
              <span className="trust-badge">✅ 24시간 내 예약 확정</span>
            </div>
          </div>
        )}

        {/* Step 3: 시간 선택 */}
        {currentStep === 3 && (
          <div className="step-3">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              충분한 시간을 드립니다
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              30분 무료 + 추가 30분 상담 가능
            </p>

            {isLoadingSlots ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">예약 가능한 시간을 확인하고 있습니다...</p>
              </div>
            ) : (
              <div className="time-slot-groups">
                <div className="time-group">
                  <h4 className="time-group-title">오전</h4>
                  <div className="time-slot-grid">
                    {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'].map((time) => (
                      <button
                        key={time}
                        className={`time-slot ${
                          availableSlots.includes(time) ? 'available' : 'reserved'
                        } ${formData.preferred_time === time ? 'selected' : ''}`}
                        onClick={() => {
                          if (availableSlots.includes(time)) {
                            setFormData({ ...formData, preferred_time: time });
                            trackBookingTimeSelected(time, formData.preferred_date!, formData.type!);
                          }
                        }}
                        disabled={!availableSlots.includes(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="time-group">
                  <h4 className="time-group-title">오후</h4>
                  <div className="time-slot-grid">
                    {['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'].map((time) => (
                      <button
                        key={time}
                        className={`time-slot ${
                          availableSlots.includes(time) ? 'available' : 'reserved'
                        } ${formData.preferred_time === time ? 'selected' : ''}`}
                        onClick={() => {
                          if (availableSlots.includes(time)) {
                            setFormData({ ...formData, preferred_time: time });
                            trackBookingTimeSelected(time, formData.preferred_date!, formData.type!);
                          }
                        }}
                        disabled={!availableSlots.includes(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="info-box">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <p>⏰ 예약 시간은 100% 지켜집니다</p>
            </div>

            <div className="trust-badge-container">
              <span className="trust-badge">✅ 상담료 0원, 계약 강요 없음</span>
            </div>
          </div>
        )}

        {/* Step 4: 사무소 선택 (방문만) */}
        {currentStep === 4 && formData.type === 'visit' && (
          <div className="step-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              가까운 곳에서 뵙겠습니다
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              두 곳 모두 동일한 전문 변호사팀이 상담합니다
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                className={`office-card ${formData.office_location === '천안' ? 'selected' : ''}`}
                onClick={() => {
                  setFormData({ ...formData, office_location: '천안' as OfficeLocation });
                  trackBookingOfficeSelected('천안', formData.type!);
                }}
              >
                <div className="office-badge">주사무소</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">천안 주사무소</h3>
                <p className="text-sm text-gray-600 mb-3">
                  충남 천안시 동남구 청수5로 11, 9층
                </p>
                <div className="office-features">
                  <span className="feature">🚗 무료 주차 2시간</span>
                  <span className="feature">🚇 천안역 도보 7분</span>
                </div>
                <a
                  href="https://naver.me/5FxAVRyR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  지도 보기
                </a>
              </button>

              <button
                className={`office-card ${formData.office_location === '평택' ? 'selected' : ''}`}
                onClick={() => {
                  setFormData({ ...formData, office_location: '평택' as OfficeLocation });
                  trackBookingOfficeSelected('평택', formData.type!);
                }}
              >
                <div className="office-badge secondary">분사무소</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">평택 분사무소</h3>
                <p className="text-sm text-gray-600 mb-3">
                  경기 평택시 평남로 1029-1, 6층
                </p>
                <div className="office-features">
                  <span className="feature">🚗 무료 주차 2시간</span>
                  <span className="feature">🚇 평택역 도보 5분</span>
                </div>
                <a
                  href="https://naver.me/IDbN4xgq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  지도 보기
                </a>
              </button>
            </div>

            <div className="trust-badge-container mt-6">
              <span className="trust-badge">✅ 법원 도보 10분 거리</span>
            </div>
          </div>
        )}

        {/* Step 5: 개인정보 입력 */}
        {currentStep === 5 && (
          <div className="step-5">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              거의 다 되었습니다 (90% 완료)
            </h2>
            <p className="text-sm text-gray-600 text-center mb-8">
              예약 확정 문자를 보내드릴 정보만 입력해주세요
            </p>

            {/* 예약 요약 */}
            <div className="booking-summary mb-8">
              <h3 className="summary-title">예약 정보 확인</h3>
              <div className="summary-items">
                <div className="summary-item">
                  <span className="label">상담 유형</span>
                  <span className="value">{formData.type === 'visit' ? '방문 상담' : '화상 상담'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">날짜 · 시간</span>
                  <span className="value">{formData.preferred_date} {formData.preferred_time}</span>
                </div>
                {formData.type === 'visit' && (
                  <div className="summary-item">
                    <span className="label">장소</span>
                    <span className="value">{formData.office_location} 사무소</span>
                  </div>
                )}
                {formData.preferred_lawyer && (
                  <div className="summary-item">
                    <span className="label">희망 변호사</span>
                    <span className="value">{LAWYER_LABELS[formData.preferred_lawyer as LawyerName]}</span>
                  </div>
                )}
              </div>
              <button className="edit-button" onClick={() => setCurrentStep(1)}>
                수정
              </button>
            </div>

            {/* 개인정보 폼 */}
            <form className="personal-info-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div className="form-group">
                <label>이름 <span className="required">*</span></label>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label>연락처 <span className="required">*</span></label>
                <input
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.phone || ''}
                  onChange={(e) => {
                    const formatted = e.target.value.replace(/[^\d-]/g, '');
                    setFormData({ ...formData, phone: formatted });
                  }}
                  className={errors.phone ? 'error' : ''}
                />
                <p className="helper-text">예약 확인을 위해 사용됩니다</p>
                {errors.phone && <p className="error-text">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label>이메일 <span className="optional">(선택)</span></label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>상담 분야 <span className="optional">(선택)</span></label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">선택해주세요</option>
                  <option value="재산분할">재산분할</option>
                  <option value="위자료">위자료</option>
                  <option value="양육권">양육권</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label>희망 변호사 <span className="optional">(선택)</span></label>
                <select
                  value={formData.preferred_lawyer || ''}
                  onChange={(e) => setFormData({ ...formData, preferred_lawyer: e.target.value as LawyerName | '' })}
                >
                  <option value="">지정 안함</option>
                  <option value="육심원">{LAWYER_LABELS['육심원']}</option>
                  <option value="임은지">{LAWYER_LABELS['임은지']}</option>
                </select>
                <p className="helper-text">특정 변호사를 원하시면 선택해주세요</p>
              </div>

              <div className="form-group">
                <label>추가 메시지 <span className="optional">(선택)</span></label>
                <textarea
                  placeholder="간략하게 상황을 알려주시면 더 준비된 상담이 가능합니다"
                  rows={3}
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <div className="consent-box">
                <label className="consent-label">
                  <input type="checkbox" required />
                  <span>
                    개인정보 수집 및 이용에 동의합니다 <span className="required">*</span>
                  </span>
                </label>
                <p className="consent-text">
                  상담 목적으로만 사용되며, 제3자 제공 없이 비밀이 보장됩니다.{' '}
                  <a href="/privacy" target="_blank">자세히 보기</a>
                </p>
                <div className="security-badge-container">
                  <div className="security-badge">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>SSL 256-bit 암호화 전송</span>
                  </div>
                  <div className="security-badge">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>대한변호사협회 인증</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    예약 확정 중...
                  </span>
                ) : (
                  '예약 확정하기 🔒'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                입력 정보는 SSL 암호화로 안전하게 전송됩니다
              </p>
            </form>
          </div>
        )}

        {/* Success Screen */}
        {currentStep === 6 && (
          <div className="success-screen">
            <div className="success-icon">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
              ✅ 예약이 확정되었습니다!
            </h2>
            <p className="text-base text-gray-600 text-center mb-8">
              빠른 시일 내 확인 연락드리겠습니다
            </p>

            <div className="booking-confirmation">
              <h3 className="text-lg font-bold mb-4">예약 정보</h3>
              <div className="confirmation-items">
                <div className="item">
                  <span className="icon">📅</span>
                  <div>
                    <p className="label">날짜 · 시간</p>
                    <p className="value">{formData.preferred_date} {formData.preferred_time}</p>
                  </div>
                </div>
                <div className="item">
                  <span className="icon">{formData.type === 'visit' ? '📍' : '💻'}</span>
                  <div>
                    <p className="label">{formData.type === 'visit' ? '장소' : '상담 방식'}</p>
                    <p className="value">
                      {formData.type === 'visit'
                        ? `${formData.office_location} 사무소`
                        : 'ZOOM 화상 상담'}
                    </p>
                  </div>
                </div>
                <div className="item">
                  <span className="icon">📞</span>
                  <div>
                    <p className="label">연락처</p>
                    <p className="value">{formData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="notice-box">
              <h4 className="font-bold mb-3">📋 상담 전 준비사항</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 신분증을 지참해 주세요</li>
                <li>✓ 관련 서류가 있다면 함께 가져오시면 좋습니다</li>
                <li className="text-gray-600">
                  &nbsp;&nbsp;&nbsp;(혼인관계증명서, 재산 목록, 증거 자료 등)
                </li>
                <li>✓ 일정 변경이 필요하면 <strong>1661-7633</strong>으로 연락주세요</li>
              </ul>
            </div>

            {formData.type === 'visit' && formData.office_location && (
              <div className="location-box">
                <h4 className="font-bold mb-3">📍 오시는 길</h4>
                {formData.office_location === '천안' ? (
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-2">천안 주사무소</p>
                    <p className="text-gray-700 mb-3">충남 천안시 동남구 청수5로 11, 9층</p>
                    <div className="space-y-1 text-gray-600">
                      <p>🚗 주차: 건물 지하 주차장 이용 가능</p>
                      <p>🚇 대중교통: 천안역에서 택시 약 10분</p>
                      <p>📞 문의: 1661-7633</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-2">평택 분사무소</p>
                    <p className="text-gray-700 mb-3">경기 평택시 평남로 1029-1, 6층</p>
                    <div className="space-y-1 text-gray-600">
                      <p>🚗 주차: 건물 주차장 이용 가능</p>
                      <p>🚇 대중교통: 평택역에서 택시 약 15분</p>
                      <p>📞 문의: 1661-7633</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {formData.type === 'video' && (
              <div className="video-notice-box">
                <h4 className="font-bold mb-3">💻 화상 상담 안내</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ ZOOM 링크는 상담 1일 전 문자로 발송됩니다</li>
                  <li>✓ PC 또는 스마트폰에서 참여 가능합니다</li>
                  <li>✓ 조용하고 편안한 장소에서 상담받으세요</li>
                  <li>✓ 화면 공유를 통해 서류 검토가 가능합니다</li>
                </ul>
              </div>
            )}

            <div className="action-buttons">
              <a href="/" className="btn-primary">
                홈으로
              </a>
              <button className="btn-secondary" onClick={() => onClose?.()}>
                닫기
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons (except step 1 and success) */}
      {currentStep > 1 && currentStep < 6 && (
        <div className="navigation-buttons">
          <button className="btn-back" onClick={handleBack}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전
          </button>
          <button
            className="btn-next"
            onClick={currentStep === 5 ? handleSubmit : handleNext}
            disabled={isSubmitting}
          >
            {currentStep === 5 ? '예약 확정하기' : '다음'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Step 1 Next Button */}
      {currentStep === 1 && (
        <div className="navigation-buttons">
          <button className="btn-next" onClick={handleNext} disabled={!formData.type}>
            날짜 선택하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .booking-form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 24px;
        }

        /* Progress Indicator */
        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .step.active .step-circle {
          background: #f59e0b;
          color: white;
          border-color: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
        }

        .step.completed .step-circle {
          background: #10b981;
          color: white;
          border-color: #10b981;
        }

        .step-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
          white-space: nowrap;
        }

        .step.active .step-label {
          color: #111827;
          font-weight: 700;
        }

        .step-line {
          width: 40px;
          height: 2px;
          background: #e5e7eb;
          margin: 0 8px;
          margin-bottom: 28px;
        }

        .step-line.completed {
          background: #10b981;
        }

        @media (max-width: 640px) {
          .step-label {
            display: none;
          }
          .step-line {
            width: 20px;
          }
        }

        /* Consultation Type Cards */
        .consultation-type-card {
          position: relative;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .consultation-type-card:hover {
          border-color: #fbbf24;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15);
          transform: translateY(-4px);
        }

        .consultation-type-card.selected {
          border-color: #f59e0b;
          background: #fef3c7;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .icon-circle {
          width: 64px;
          height: 64px;
          background: #fef3c7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #f59e0b;
        }

        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f3f4f6;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .badge.recommended {
          background: #f59e0b;
          color: white;
        }

        .benefits {
          list-style: none;
          padding: 0;
          text-align: left;
          font-size: 14px;
          color: #6b7280;
        }

        .benefits li {
          padding: 6px 0;
        }

        /* Calendar Grid */
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 8px;
          margin-bottom: 24px;
        }

        .date-button {
          aspect-ratio: 1;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .date-button .day {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 600;
        }

        .date-button .date {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 4px 0;
        }

        .date-button .availability {
          font-size: 10px;
          color: #10b981;
          font-weight: 600;
        }

        .date-button.available:hover {
          border-color: #fbbf24;
          background: #fffbeb;
          transform: scale(1.05);
        }

        .date-button.selected {
          border-color: #f59e0b;
          background: #fef3c7;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        /* Time Slots */
        .time-slot-groups {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .time-group-title {
          font-size: 14px;
          font-weight: 700;
          color: #6b7280;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .time-slot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 8px;
        }

        .time-slot {
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: white;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .time-slot.available:hover {
          border-color: #fbbf24;
          background: #fffbeb;
          transform: scale(1.05);
        }

        .time-slot.selected {
          border-color: #f59e0b;
          background: #fef3c7;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .time-slot.reserved {
          background: #f9fafb;
          border-color: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
          text-decoration: line-through;
        }

        /* Office Cards */
        .office-card {
          position: relative;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .office-card:hover {
          border-color: #fbbf24;
          box-shadow: 0 10px 25px rgba(245, 158, 11, 0.1);
        }

        .office-card.selected {
          border-color: #f59e0b;
          background: #fef3c7;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .office-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #f59e0b;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .office-badge.secondary {
          background: #6b7280;
        }

        .office-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .feature {
          font-size: 12px;
          color: #6b7280;
        }

        .map-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #f59e0b;
          font-weight: 600;
          text-decoration: none;
        }

        .map-link:hover {
          color: #d97706;
          text-decoration: underline;
        }

        /* Booking Summary */
        .booking-summary {
          background: linear-gradient(135deg, #fef3c7, #fed7aa);
          border-radius: 16px;
          padding: 24px;
          position: relative;
        }

        .summary-title {
          font-size: 16px;
          font-weight: 700;
          color: #92400e;
          margin-bottom: 16px;
        }

        .summary-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-item .label {
          font-size: 14px;
          color: #78350f;
        }

        .summary-item .value {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .edit-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: white;
          border: 1px solid #d97706;
          color: #d97706;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .edit-button:hover {
          background: #d97706;
          color: white;
        }

        /* Form */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .required {
          color: #ef4444;
        }

        .optional {
          color: #9ca3af;
          font-weight: 400;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #f59e0b;
          box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: #ef4444;
        }

        .helper-text {
          font-size: 13px;
          color: #6b7280;
          margin-top: 6px;
        }

        .error-text {
          font-size: 13px;
          color: #ef4444;
          margin-top: 6px;
        }

        .consent-box {
          background: #f9fafb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .consent-label {
          display: flex;
          align-items: start;
          gap: 12px;
          cursor: pointer;
        }

        .consent-label input {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .consent-text {
          font-size: 12px;
          color: #6b7280;
          margin-top: 8px;
          line-height: 1.5;
        }

        .consent-text a {
          color: #f59e0b;
          text-decoration: underline;
        }

        .security-badge-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #e5e7eb;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          color: #6b7280;
          font-weight: 600;
        }

        .security-badge svg {
          color: #10b981;
        }

        /* Info Box */
        .info-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #dbeafe;
          border-radius: 12px;
          padding: 16px;
          margin-top: 16px;
          font-size: 14px;
          color: #1e40af;
          font-weight: 600;
        }

        /* Trust Badges */
        .trust-badge-container {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }

        .trust-badge {
          display: inline-block;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          color: #6b7280;
          font-weight: 600;
        }

        /* Navigation Buttons */
        .navigation-buttons {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-back,
        .btn-next {
          flex: 1;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-back {
          background: white;
          border: 2px solid #e5e7eb;
          color: #6b7280;
        }

        .btn-back:hover {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .btn-next {
          background: #111827;
          border: 2px solid #111827;
          color: white;
        }

        .btn-next:hover:not(:disabled) {
          background: #000000;
          border-color: #000000;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .btn-next:disabled {
          background: #f3f4f6;
          border-color: #e5e7eb;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .submit-button {
          width: 100%;
          padding: 18px 24px;
          background: #111827;
          color: white;
          font-size: 17px;
          font-weight: 700;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .submit-button:hover:not(:disabled) {
          background: #000000;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          transform: translateY(-2px);
        }

        .submit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        /* Success Screen */
        .success-screen {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          animation: successPulse 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin: 0 auto 24px;
          width: 64px;
          height: 64px;
        }

        @keyframes successPulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }

        .booking-confirmation {
          background: #f9fafb;
          border-radius: 16px;
          padding: 24px;
          margin: 24px 0;
          text-align: left;
        }

        .confirmation-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .confirmation-items .item {
          display: flex;
          gap: 16px;
          align-items: start;
        }

        .confirmation-items .icon {
          font-size: 24px;
        }

        .confirmation-items .label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .confirmation-items .value {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
        }

        .notice-box {
          background: #fffbeb;
          border: 1px solid #fcd34d;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
          text-align: left;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-primary,
        .btn-secondary {
          flex: 1;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: block;
          text-align: center;
        }

        .btn-primary {
          background: #111827;
          color: white;
          border: 2px solid #111827;
        }

        .btn-primary:hover {
          background: #000000;
        }

        .btn-secondary {
          background: white;
          color: #6b7280;
          border: 2px solid #e5e7eb;
        }

        .btn-secondary:hover {
          background: #f9fafb;
        }
      `}</style>
    </div>
  );
}
