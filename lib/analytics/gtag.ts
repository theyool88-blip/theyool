/**
 * Google Analytics (GA4) 유틸리티
 *
 * 사용법:
 * 1. .env.local에 NEXT_PUBLIC_GA_MEASUREMENT_ID 추가
 * 2. app/layout.tsx에 Google Analytics 스크립트 추가
 * 3. 이벤트 추적: trackEvent('event_name', { ... })
 */

// GA Measurement ID 타입 체크
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// GA가 활성화되어 있는지 확인
export const isGAEnabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA_MEASUREMENT_ID && 'gtag' in window;
};

// 페이지뷰 추적
export const trackPageView = (url: string) => {
  if (!isGAEnabled()) return;

  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// 커스텀 이벤트 추적
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!isGAEnabled()) {
    // 개발 환경에서는 콘솔에 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 [Analytics Event]', eventName, eventParams);
    }
    return;
  }

  (window as any).gtag('event', eventName, eventParams);
};

/**
 * 예약 관련 이벤트 추적
 */

// 1. 예약 시작
export const trackBookingStarted = (type?: 'visit' | 'video') => {
  trackEvent('booking_started', {
    event_category: 'booking',
    event_label: 'Booking Modal Opened',
    initial_type: type || 'not_selected',
  });
};

// 2. 예약 유형 선택
export const trackBookingTypeSelected = (type: 'visit' | 'video') => {
  trackEvent('booking_type_selected', {
    event_category: 'booking',
    event_label: `Type: ${type}`,
    booking_type: type,
  });
};

// 3. 날짜 선택
export const trackBookingDateSelected = (date: string, type: string) => {
  trackEvent('booking_date_selected', {
    event_category: 'booking',
    event_label: `Date: ${date}`,
    booking_type: type,
    selected_date: date,
  });
};

// 4. 시간 선택
export const trackBookingTimeSelected = (time: string, date: string, type: string) => {
  trackEvent('booking_time_selected', {
    event_category: 'booking',
    event_label: `Time: ${time}`,
    booking_type: type,
    selected_date: date,
    selected_time: time,
  });
};

// 5. 사무소 선택 (방문만)
export const trackBookingOfficeSelected = (office: string, type: string) => {
  trackEvent('booking_office_selected', {
    event_category: 'booking',
    event_label: `Office: ${office}`,
    booking_type: type,
    office_location: office,
  });
};

// 6. 정보 입력 완료
export const trackBookingInfoSubmitted = (data: {
  type: string;
  category?: string;
  office_location?: string;
}) => {
  trackEvent('booking_info_submitted', {
    event_category: 'booking',
    event_label: 'Personal Info Submitted',
    booking_type: data.type,
    category: data.category || 'not_specified',
    office_location: data.office_location || 'video',
  });
};

// 7. 예약 완료 (전환!)
export const trackBookingCompleted = (data: {
  type: string;
  category?: string;
  office_location?: string;
  preferred_date: string;
  preferred_time: string;
}) => {
  trackEvent('booking_completed', {
    event_category: 'booking',
    event_label: 'Booking Completed',
    booking_type: data.type,
    category: data.category || 'not_specified',
    office_location: data.office_location || 'video',
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    // 전환 값 (예약 = 높은 가치)
    value: data.type === 'visit' ? 100 : 80, // 방문 > 화상
  });

  // 별도의 전환 이벤트 (GA4 Conversion)
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: 'Booking Conversion',
    conversion_type: 'booking',
    booking_type: data.type,
  });
};

/**
 * 상담 신청 관련 이벤트 추적
 */

// 상담 신청 시작
export const trackConsultationStarted = () => {
  trackEvent('consultation_started', {
    event_category: 'consultation',
    event_label: 'Consultation Form Opened',
  });
};

// 상담 신청 완료
export const trackConsultationSubmitted = (data: {
  category?: string;
  has_email: boolean;
  has_message: boolean;
}) => {
  trackEvent('consultation_submitted', {
    event_category: 'consultation',
    event_label: 'Consultation Submitted',
    category: data.category || 'not_specified',
    has_email: data.has_email,
    has_message: data.has_message,
    value: 50, // 상담 신청의 가치
  });

  // 별도의 전환 이벤트
  trackEvent('conversion', {
    event_category: 'conversion',
    event_label: 'Consultation Conversion',
    conversion_type: 'consultation',
  });
};

/**
 * 기타 유용한 이벤트
 */

// 전화 클릭
export const trackPhoneClick = (location: string) => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: `Phone Clicked: ${location}`,
    click_location: location,
  });
};

// CTA 버튼 클릭
export const trackCTAClick = (buttonText: string, location: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: buttonText,
    click_location: location,
  });
};

// 페이지 스크롤 깊이
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${depth}%`,
    scroll_depth: depth,
  });
};
