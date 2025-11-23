import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

/**
 * 환경변수가 설정되어 있는지 확인
 */
function hasValidEnvironment(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return !!(url && key && url !== 'https://placeholder.supabase.co' && key !== 'placeholder-key');
}

export interface BlogPost {
  id: string;
  notion_id: string;
  title: string;
  slug: string;
  categories: string[];
  tags: string[];
  excerpt: string | null;
  content: string;
  published: boolean;
  featured: boolean;
  views: number;
  author: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  illustration_image?: string | null;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  categories?: string[];
  tags?: string[];
  excerpt?: string | null;
  content: string;
  published?: boolean;
  featured?: boolean;
  author?: string;
  published_at?: string | null;
  illustration_image?: string | null;
}

// 모든 Blog Posts 가져오기 (관리자용 - 요약 정보만)
export async function getBlogPosts(options?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: BlogPost[]; total: number }> {
  if (!hasValidEnvironment()) {
    return { data: [], total: 0 };
  }

  const page = options?.page || 1;
  const limit = options?.limit || 40;
  const search = options?.search || '';

  // 리스트용 - content 제외하고 필요한 필드만 선택
  let query = supabase
    .from('blog_posts')
    .select('id, title, slug, categories, tags, published, featured, views, author, published_at, illustration_image, created_at, updated_at', { count: 'exact' });

  // 검색 (제목만)
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }

  // 페이지네이션
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await query
    .range(start, end)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Blog Posts 조회 실패:', error);
    return { data: [], total: 0 };
  }

  // @ts-ignore - BlogPost type mismatch with selected fields
  return { data: data || [], total: count || 0 };
}

// 단일 Blog Post 가져오기
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Blog Post 조회 실패:', error);
    return null;
  }

  return data;
}

// Blog Post 생성
export async function createBlogPost(input: BlogPostInput): Promise<BlogPost | null> {
  console.log('[createBlogPost] Starting with input:', JSON.stringify(input, null, 2));

  // Slug 중복 체크
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', input.slug)
    .single();

  if (existing) {
    console.error('[createBlogPost] 이미 존재하는 slug입니다:', input.slug);
    return null;
  }

  const insertData = {
    notion_id: `manual-${Date.now()}`, // 수동 생성 표시
    title: input.title,
    slug: input.slug,
    categories: input.categories || [],
    tags: input.tags || [],
    excerpt: input.excerpt || null,
    content: input.content,
    published: input.published ?? true,
    featured: input.featured ?? false,
    views: 0,
    author: input.author || '법무법인 더율',
    published_at: input.published_at || new Date().toISOString(),
    illustration_image: input.illustration_image || null,
  };

  console.log('[createBlogPost] Insert data:', JSON.stringify(insertData, null, 2));

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('[createBlogPost] Blog Post 생성 실패:', error);
    console.error('[createBlogPost] Error details:', JSON.stringify(error, null, 2));
    return null;
  }

  console.log('[createBlogPost] Success! Created blog post:', data.id);
  return data;
}

// Blog Post 수정
export async function updateBlogPost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  // Slug 변경 시 중복 체크
  if (input.slug) {
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', input.slug)
      .neq('id', id)
      .single();

    if (existing) {
      console.error('이미 존재하는 slug입니다:', input.slug);
      return null;
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Blog Post 수정 실패:', error);
    return null;
  }

  return data;
}

// Blog Post 삭제
export async function deleteBlogPost(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Blog Post 삭제 실패:', error);
    return false;
  }

  return true;
}

// 조회수 증가
export async function incrementBlogViews(slug: string): Promise<void> {
  await supabase.rpc('increment_blog_views', { post_slug: slug });
}

// 최신/추천 블로그 포스트 가져오기 (홈페이지용)
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  if (!hasValidEnvironment()) {
    return [];
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('추천 블로그 포스트 조회 실패:', error);
    return [];
  }

  return data || [];
}

// Slug로 Blog Post 가져오기
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!hasValidEnvironment()) {
    return null;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Blog Post 조회 실패:', error);
    return null;
  }

  return data;
}

// 모든 Blog Post의 Slug 가져오기 (Static Params 생성용)
export async function getAllBlogSlugs(): Promise<string[]> {
  if (!hasValidEnvironment()) {
    return [];
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('Blog Slugs 조회 실패:', error);
    return [];
  }

  return data.map(post => post.slug);
}

/**
 * 유사한 칼럼 가져오기 (카테고리 기반 추천)
 * @param currentSlug - 현재 포스트의 slug
 * @param categories - 현재 포스트의 카테고리 배열
 * @param limit - 가져올 포스트 개수 (기본값: 3)
 * @returns 추천 포스트 배열
 */
export async function getSimilarBlogPosts(
  currentSlug: string,
  categories: string[],
  limit: number = 3
): Promise<BlogPost[]> {
  if (!hasValidEnvironment()) {
    return [];
  }

  // 현재 포스트 ID 가져오기
  const { data: current } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', currentSlug)
    .eq('published', true)
    .single();

  if (!current) {
    return [];
  }

  const currentId = current.id;

  // 1. 같은 카테고리를 가진 포스트들 가져오기
  let similarPosts: BlogPost[] = [];

  if (categories && categories.length > 0) {
    // 카테고리 중 하나라도 겹치는 포스트 찾기
    const { data: sameCategoryData } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .neq('id', currentId)
      .overlaps('categories', categories)
      .order('published_at', { ascending: false })
      .limit(limit);

    similarPosts = (sameCategoryData as BlogPost[]) || [];
  }

  // 2. 개수가 부족하면 다른 포스트로 채우기
  if (similarPosts.length < limit) {
    const remaining = limit - similarPosts.length;
    const { data: otherData } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .neq('id', currentId)
      .order('published_at', { ascending: false })
      .limit(remaining);

    const otherPosts = (otherData as BlogPost[]) || [];

    // 중복 제거하며 추가
    const existingIds = new Set(similarPosts.map(p => p.id));
    const uniqueOthers = otherPosts.filter(p => !existingIds.has(p.id));

    similarPosts = [...similarPosts, ...uniqueOthers];
  }

  return similarPosts;
}
