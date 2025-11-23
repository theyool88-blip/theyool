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
 * 환경변수가 설정되어 있는지 확인
 */
function hasValidEnvironment(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // placeholder 값이거나 없으면 false
  return !!(url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key');
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
  // 환경변수가 없으면 빈 배열 반환 (빌드 타임 대응)
  if (!hasValidEnvironment()) {
    return [];
  }

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
  // 환경변수가 없으면 null 반환 (빌드 타임 대응)
  if (!hasValidEnvironment()) {
    return null;
  }

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
  // 환경변수가 없으면 빈 배열 반환 (빌드 타임 대응)
  if (!hasValidEnvironment()) {
    return [];
  }

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
  // 환경변수가 없으면 빈 배열 반환 (빌드 타임 대응)
  if (!hasValidEnvironment()) {
    return [];
  }

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
  // 환경변수가 없으면 빈 배열 반환 (빌드 타임 대응)
  if (!hasValidEnvironment()) {
    return [];
  }

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

/**
 * 관리자용 - 모든 FAQ 가져오기 (페이지네이션 + 검색 + 카테고리 필터)
 */
export async function getAdminFAQs(options?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<{ data: FAQ[]; total: number }> {
  if (!hasValidEnvironment()) {
    return { data: [], total: 0 };
  }

  const page = options?.page || 1;
  const limit = options?.limit || 40;
  const search = options?.search || '';
  const category = options?.category || '';

  const supabase = createBuildTimeClient();

  // answer 필드를 제외하고 요약 정보만 선택
  let query = supabase
    .from('faqs')
    .select('id, question, slug, category, summary, featured, published, views, sort_order, created_at, updated_at', { count: 'exact' });

  // 검색 (질문만)
  if (search) {
    query = query.ilike('question', `%${search}%`);
  }

  // 카테고리 필터
  if (category) {
    if (category === 'featured') {
      // "필수가이드" 카테고리 - featured = true인 FAQ만
      query = query.eq('featured', true);
    } else {
      // 일반 카테고리
      query = query.eq('category', category);
    }
  }

  // 페이지네이션
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await query
    .range(start, end)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FAQ 조회 실패:', error);
    return { data: [], total: 0 };
  }

  return { data: data as FAQ[], total: count || 0 };
}
