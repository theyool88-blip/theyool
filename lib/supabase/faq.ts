import { createClient } from './server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

export interface FAQ {
  id: string;
  question: string;
  slug: string;
  category: string;
  summary: string | null;
  answer: string;
  featured: boolean;
  published: boolean;
  views: number;
  sort_order: number | null;
  related_blog_posts: string[] | null;
  related_cases: string[] | null;
  created_at: string;
  updated_at: string;
}

/**
 * Build-time용 Supabase 클라이언트 (cookies 불필요)
 */
function createBuildTimeClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

  return createSupabaseClient<Database>(supabaseUrl, serviceRoleKey);
}

/**
 * 모든 공개된 FAQ 가져오기
 */
export async function getFAQs(): Promise<FAQ[]> {
  // Build time에는 cookies가 없으므로 직접 클라이언트 생성
  const supabase = createBuildTimeClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FAQ 조회 실패:', error);
    throw new Error('FAQ를 불러오는 중 오류가 발생했습니다.');
  }

  return data as FAQ[];
}

/**
 * 특정 slug의 FAQ 가져오기
 */
export async function getFAQBySlug(slug: string): Promise<FAQ | null> {
  const supabase = createBuildTimeClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('FAQ 조회 실패:', error);
    throw new Error('FAQ를 불러오는 중 오류가 발생했습니다.');
  }

  return data as FAQ;
}

/**
 * 카테고리별 FAQ 필터링 (특정 FAQ 제외)
 */
export async function getFAQsByCategory(category: string, excludeSlug?: string, limit?: number): Promise<FAQ[]> {
  const supabase = createBuildTimeClient();

  let query = supabase
    .from('faqs')
    .select('*')
    .eq('category', category)
    .eq('published', true);

  if (excludeSlug) {
    query = query.neq('slug', excludeSlug);
  }

  query = query
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('FAQ 조회 실패:', error);
    throw new Error('FAQ를 불러오는 중 오류가 발생했습니다.');
  }

  return data as FAQ[];
}

/**
 * 추천 FAQ만 가져오기
 */
export async function getFeaturedFAQs(limit: number = 10): Promise<FAQ[]> {
  const supabase = createBuildTimeClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('추천 FAQ 조회 실패:', error);
    throw new Error('추천 FAQ를 불러오는 중 오류가 발생했습니다.');
  }

  return data as FAQ[];
}

/**
 * FAQ 조회수 증가
 */
export async function incrementFAQViews(slug: string): Promise<void> {
  const supabase = createBuildTimeClient();

  const { error } = await supabase.rpc('increment_faq_views', {
    faq_slug: slug,
  } as any);

  if (error) {
    console.error('조회수 증가 실패:', error);
    // 조회수 증가 실패는 치명적이지 않으므로 에러를 던지지 않음
  }
}

/**
 * 조회수 기준 인기 FAQ 가져오기 (홈페이지용)
 */
export async function getPopularFAQs(limit: number = 10): Promise<FAQ[]> {
  const supabase = createBuildTimeClient();

  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('published', true)
    .order('views', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('인기 FAQ 조회 실패:', error);
    throw new Error('인기 FAQ를 불러오는 중 오류가 발생했습니다.');
  }

  return data as FAQ[];
}
