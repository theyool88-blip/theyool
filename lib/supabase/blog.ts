import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
}

// 모든 Blog Posts 가져오기
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false, nullsLast: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Blog Posts 조회 실패:', error);
    return [];
  }

  return data || [];
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
  // Slug 중복 체크
  const { data: existing } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', input.slug)
    .single();

  if (existing) {
    console.error('이미 존재하는 slug입니다:', input.slug);
    return null;
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
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
    })
    .select()
    .single();

  if (error) {
    console.error('Blog Post 생성 실패:', error);
    return null;
  }

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
