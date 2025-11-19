import { createClient } from '@/lib/supabase/server';

/**
 * Testimonial 타입 정의
 */
export interface Testimonial {
  id: string;
  client_name: string;
  client_initial: string;
  client_role: string;
  case_category: string;
  case_result: string;
  case_duration?: string;
  case_date: string;
  content: string;
  rating: number;
  story_before?: string;
  story_journey?: string;
  story_after?: string;
  photo_url?: string;
  use_photo: boolean;
  avatar_bg_color: string;
  avatar_text_color: string;
  attorney_name?: string;
  attorney_id?: string;
  verified: boolean;
  consent_given: boolean;
  consent_date?: string;
  featured: boolean;
  published: boolean;
  display_order: number;
  views: number;
  helpful_count: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

/**
 * 게시된 후기 목록 조회 (공개용)
 */
export async function getPublishedTestimonials(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from('testimonials')
    .select('*', { count: 'exact' })
    .eq('published', true)
    .eq('consent_given', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (options?.category) {
    query = query.eq('case_category', options.category);
  }

  if (options?.featured) {
    query = query.eq('featured', true);
  }

  const limit = options?.limit || 9;
  const offset = options?.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching testimonials:', error);
    return { data: [], count: 0, error };
  }

  return { data: data as Testimonial[], count: count || 0, error: null };
}

/**
 * 추천 후기 조회 (홈페이지용)
 */
export async function getFeaturedTestimonials(limit: number = 9) {
  return getPublishedTestimonials({ featured: true, limit });
}

/**
 * 카테고리별 후기 조회
 */
export async function getTestimonialsByCategory(category: string, limit: number = 6) {
  return getPublishedTestimonials({ category, limit });
}

/**
 * 단일 후기 조회
 */
export async function getTestimonialById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .eq('consent_given', true)
    .single();

  if (error) {
    console.error('Error fetching testimonial:', error);
    return { data: null, error };
  }

  return { data: data as Testimonial, error: null };
}

/**
 * 카테고리별 통계 조회
 */
export async function getTestimonialStatsByCategory() {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc('get_testimonial_stats_by_category');

  if (error) {
    console.error('Error fetching stats:', error);
    return { data: [], error };
  }

  return { data, error: null };
}

/**
 * 조회수 증가
 */
export async function incrementTestimonialViews(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc('increment_testimonial_views', {
    testimonial_id: id,
  });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}

/**
 * 카테고리 목록 (하드코딩)
 */
export const TESTIMONIAL_CATEGORIES = [
  '재산분할',
  '양육권',
  '위자료',
  '협의이혼',
  '상간손해배상',
  '재판이혼',
  '양육비청구',
] as const;

export type TestimonialCategory = (typeof TESTIMONIAL_CATEGORIES)[number];

/**
 * 카테고리별 색상 매핑
 */
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  재산분할: { bg: 'from-amber-100 to-amber-200', text: 'text-amber-700' },
  양육권: { bg: 'from-blue-100 to-blue-200', text: 'text-blue-700' },
  위자료: { bg: 'from-pink-100 to-pink-200', text: 'text-pink-700' },
  협의이혼: { bg: 'from-green-100 to-green-200', text: 'text-green-700' },
  상간손해배상: { bg: 'from-purple-100 to-purple-200', text: 'text-purple-700' },
  재판이혼: { bg: 'from-orange-100 to-orange-200', text: 'text-orange-700' },
  양육비청구: { bg: 'from-teal-100 to-teal-200', text: 'text-teal-700' },
};
