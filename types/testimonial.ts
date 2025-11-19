// ================================================
// Testimonial Types - Evidence-First Architecture
// ================================================

export type PhotoType = 'kakao' | 'sms' | 'naver' | 'letter' | 'other';
export type CaseCategory = 'alimony' | 'custody' | 'property' | 'adultery';

/**
 * Evidence Photo - Primary content unit
 * 증빙이 곧 콘텐츠다: Evidence IS the content
 */
export interface EvidencePhoto {
  id: string;
  case_id: string;
  evidence_type: PhotoType;
  photo_url: string;
  display_order: number;
  caption?: string | null;

  // Metadata
  original_date?: string | null;
  file_size?: number | null;
  file_type?: string | null;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;

  // Privacy & Compliance
  blur_applied: boolean;
  verified_by?: string | null;
  verified_at?: string | null;

  // Audit
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
}

/**
 * Testimonial Case - Evidence-centric client story
 */
export interface TestimonialCase {
  id: string;

  // Category (required)
  category: CaseCategory;

  // Card Display Fields
  highlight_text: string; // e.g., "위자료 2억 승소"
  case_result_amount?: number | null; // Amount in won

  // Client Info (anonymized)
  client_initial: string; // e.g., "김", "이"
  client_role?: string | null; // e.g., "40대 여성"
  client_age_group?: string | null; // e.g., "30대", "40대"

  // Stories (for lightbox)
  full_story?: string | null; // Complete testimonial
  story_before?: string | null; // Situation before consultation
  story_journey?: string | null; // Process
  story_after?: string | null; // Life after result

  // Case Info
  case_date: string; // e.g., "2024년 10월"
  case_duration?: string | null; // e.g., "3개월"

  // Attorney
  attorney_name?: string | null;
  attorney_id?: string | null;

  // Metadata
  verified: boolean;
  consent_given: boolean; // CRITICAL: Must be true to publish
  consent_date?: string | null;

  // Display Settings
  featured: boolean;
  published: boolean;
  display_order: number;

  // Statistics
  views: number;
  helpful_count: number;

  // Extensibility
  metadata?: Record<string, any> | null;

  // Audit
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;

  // Extended fields (computed or joined)
  evidence_count?: number;
  evidence_photos?: EvidencePhoto[];
}

/**
 * @deprecated Use TestimonialCase instead
 * Old testimonial structure - kept for migration reference only
 */
export interface Testimonial {
  id: string;
  client_name: string;
  client_initial: string;
  client_role: string;
  case_category: string;
  case_result: string;
  case_duration?: string | null;
  case_date: string;
  content: string;
  rating: number;
  story_before?: string | null;
  story_journey?: string | null;
  story_after?: string | null;
  photo_url?: string | null;
  use_photo: boolean;
  avatar_bg_color: string;
  avatar_text_color: string;
  attorney_name?: string | null;
  attorney_id?: string | null;
  verified: boolean;
  consent_given: boolean;
  consent_date?: string | null;
  featured: boolean;
  published: boolean;
  display_order: number;
  views: number;
  helpful_count: number;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
  evidence_count?: number;
  has_evidence?: boolean;
  evidence_photos?: EvidencePhoto[];
}

// ================================================
// API Request/Response Types
// ================================================

export interface CaseCreateRequest {
  category: CaseCategory;
  highlight_text: string;
  case_result_amount?: number;
  client_initial: string;
  client_role?: string;
  client_age_group?: string;
  full_story?: string;
  story_before?: string;
  story_journey?: string;
  story_after?: string;
  case_date: string;
  case_duration?: string;
  attorney_name?: string;
  attorney_id?: string;
  consent_given: boolean;
  featured?: boolean;
  published?: boolean;
}

export interface CaseUpdateRequest extends Partial<CaseCreateRequest> {
  id: string;
}

export interface EvidencePhotoUploadRequest {
  file: File;
  caseId: string;
  evidenceType: PhotoType;
  caption?: string;
  originalDate?: string; // ISO 8601
  displayOrder?: number;
}

export interface EvidencePhotoUploadResponse {
  id: string;
  photo_url: string;
  evidence_type: PhotoType;
  display_order: number;
}

export interface EvidencePhotoListResponse {
  data: EvidencePhoto[];
  count: number;
}

export interface EvidencePhotoReorderRequest {
  caseId: string;
  reorderedIds: string[]; // Array of evidence photo IDs in new order
}

export interface CaseWithEvidenceResponse {
  case: TestimonialCase;
  evidence_photos: EvidencePhoto[];
}

// ================================================
// Helper Types
// ================================================

export interface PhotoTypeInfo {
  value: PhotoType;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const PHOTO_TYPE_INFO: Record<PhotoType, PhotoTypeInfo> = {
  kakao: {
    value: 'kakao',
    label: '카카오톡',
    icon: '💬',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  sms: {
    value: 'sms',
    label: '문자 메시지',
    icon: '📱',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  naver: {
    value: 'naver',
    label: '네이버 지도',
    icon: '⭐',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  letter: {
    value: 'letter',
    label: '의뢰인 편지',
    icon: '✉️',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  other: {
    value: 'other',
    label: '기타',
    icon: '📄',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
};

export function getPhotoTypeInfo(type: PhotoType): PhotoTypeInfo {
  return PHOTO_TYPE_INFO[type] || PHOTO_TYPE_INFO.other;
}

export function generateAltText(
  photoType: PhotoType,
  testimonialCase: Partial<TestimonialCase>,
  index: number = 0
): string {
  const typeLabel = PHOTO_TYPE_INFO[photoType]?.label || '후기 증빙';
  const clientInitial = testimonialCase.client_initial || '의뢰인';
  const category = testimonialCase.category || '';

  return `${clientInitial} ${category} ${typeLabel} ${index > 0 ? index + 1 : ''}`.trim();
}

/**
 * Category Display Info
 */
export interface CategoryInfo {
  value: CaseCategory;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_INFO: Record<CaseCategory, CategoryInfo> = {
  alimony: {
    value: 'alimony',
    label: '위자료',
    icon: '💰',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
  },
  custody: {
    value: 'custody',
    label: '양육권',
    icon: '👶',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  property: {
    value: 'property',
    label: '재산분할',
    icon: '🏠',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
  },
  adultery: {
    value: 'adultery',
    label: '상간사건',
    icon: '⚖️',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
};

export function getCategoryInfo(category: CaseCategory): CategoryInfo {
  return CATEGORY_INFO[category] || CATEGORY_INFO.alimony;
}
