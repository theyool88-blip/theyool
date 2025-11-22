/**
 * Booking System TypeScript Types
 *
 * Centralized type definitions for the booking system
 */

export type BookingType = 'visit' | 'video';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type OfficeLocation = '천안' | '평택';
export type LawyerName = '육심원' | '임은지';

export interface Booking {
  id: string;
  created_at: string;
  updated_at: string;

  // Booking details
  type: BookingType;
  status: BookingStatus;

  // Customer information
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;

  // Scheduling information
  preferred_date: string; // ISO date string (YYYY-MM-DD)
  preferred_time: string; // HH:MM format

  // Visit-specific
  office_location?: OfficeLocation;

  // Video-specific
  video_link?: string;

  // Lawyer preference
  preferred_lawyer?: LawyerName;

  // Admin fields
  admin_notes?: string;
  confirmed_at?: string;
  cancelled_at?: string;
}

export interface CreateBookingInput {
  type: BookingType;
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  preferred_date: string;
  preferred_time: string;
  office_location?: OfficeLocation;
  preferred_lawyer?: LawyerName;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
  video_link?: string;
  admin_notes?: string;
  confirmed_at?: string;
  cancelled_at?: string;
}

export interface TimeSlot {
  time: string; // HH:MM format
  available: boolean;
}

export interface AvailableSlotsResponse {
  date: string;
  slots: TimeSlot[];
}

export interface BookingFilters {
  status?: BookingStatus;
  type?: BookingType;
  date_from?: string;
  date_to?: string;
  office_location?: OfficeLocation;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
  thisWeek: number;
}

/**
 * API Response types
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
  data?: T;
}

export interface CreateBookingResponse extends ApiResponse {
  booking: Booking;
}

export interface GetBookingsResponse extends ApiResponse {
  bookings: Booking[];
  count: number;
}

export interface GetBookingResponse extends ApiResponse {
  booking: Booking;
}

export interface UpdateBookingResponse extends ApiResponse {
  booking: Booking;
}

export interface GetAvailableSlotsResponse extends ApiResponse {
  date: string;
  slots: TimeSlot[];
}

/**
 * Utility type guards
 */

export function isVisitBooking(booking: Booking): booking is Booking & { office_location: OfficeLocation } {
  return booking.type === 'visit' && !!booking.office_location;
}

export function isVideoBooking(booking: Booking): boolean {
  return booking.type === 'video';
}

export function isConfirmed(booking: Booking): boolean {
  return booking.status === 'confirmed';
}

export function isPending(booking: Booking): boolean {
  return booking.status === 'pending';
}

export function isCancelled(booking: Booking): boolean {
  return booking.status === 'cancelled';
}

export function isCompleted(booking: Booking): boolean {
  return booking.status === 'completed';
}

/**
 * Status display helpers
 */

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: '대기중',
  confirmed: '확정',
  cancelled: '취소',
  completed: '완료',
};

export const BOOKING_TYPE_LABELS: Record<BookingType, string> = {
  visit: '방문 상담',
  video: '화상 상담',
};

export const OFFICE_LOCATION_LABELS: Record<OfficeLocation, string> = {
  천안: '천안 사무소',
  평택: '평택 사무소',
};

export const LAWYER_LABELS: Record<LawyerName, string> = {
  육심원: '육심원 (대표변호사)',
  임은지: '임은지 (이혼전문변호사)',
};

/**
 * Status badge colors for UI
 */

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
};

/**
 * Form validation helpers
 */

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDate(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function isValidTime(timeString: string): boolean {
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(timeString)) return false;

  const [hours, minutes] = timeString.split(':').map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
}

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday-Friday
}

/**
 * Date formatting helpers
 */

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

export function formatTime(timeString: string): string {
  return timeString; // Already in HH:MM format
}

export function formatDateTime(dateString: string, timeString: string): string {
  return `${formatDate(dateString)} ${formatTime(timeString)}`;
}

/**
 * Business logic helpers
 */

export const BUSINESS_HOURS = {
  START: '09:00',
  END: '18:00',
  LUNCH_START: '12:00',
  LUNCH_END: '13:00',
  SLOT_DURATION: 30, // minutes
};

export function generateTimeSlots(): string[] {
  const slots: string[] = [];

  // Morning slots: 09:00 - 12:00
  for (let hour = 9; hour < 12; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  // Afternoon slots: 13:00 - 18:00
  for (let hour = 13; hour < 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  return slots;
}

export function isBusinessHours(timeString: string): boolean {
  const slots = generateTimeSlots();
  return slots.includes(timeString);
}

/**
 * Booking categories (consultation types)
 */

export const BOOKING_CATEGORIES = [
  '재산분할',
  '양육권',
  '위자료',
  '상간사건',
  '일반 이혼 상담',
  '기타',
] as const;

export type BookingCategory = typeof BOOKING_CATEGORIES[number];
