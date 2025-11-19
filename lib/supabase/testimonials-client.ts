'use client';

import { createClient } from '@/lib/supabase/client';

/**
 * 클라이언트 컴포넌트용 Testimonials 헬퍼 함수
 */

/**
 * 공개 후기 목록 조회 (클라이언트)
 */
export async function fetchPublicTestimonials(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) {
  const supabase = createClient();

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
    throw error;
  }

  return { data, count: count || 0 };
}

/**
 * "도움이 됐어요" 클릭
 */
export async function markTestimonialHelpful(id: string) {
  const response = await fetch(`/api/testimonials?id=${id}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to mark testimonial as helpful');
  }

  return response.json();
}
