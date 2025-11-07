/**
 * 상담 신청 관련 타입
 */

export interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  category?: string | null;
  message?: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  agree_privacy: boolean;
}

export const CONSULTATION_CATEGORIES = [
  { value: 'alimony', label: '위자료' },
  { value: 'property', label: '재산분할' },
  { value: 'custody', label: '양육권' },
  { value: 'adultery', label: '상간사건' },
  { value: 'consultation', label: '일반 상담' },
  { value: 'other', label: '기타' },
] as const;
