import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from './blog';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
);

const BASE_SELECT = `
  id,
  notion_id,
  title,
  slug,
  categories,
  tags,
  excerpt,
  content,
  published,
  featured,
  views,
  author,
  published_at,
  created_at,
  updated_at
`;

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BASE_SELECT)
    .eq('published', true)
    .order('published_at', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('공개 칼럼 조회 실패:', error);
    return [];
  }

  return data ?? [];
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(BASE_SELECT)
    .eq('slug', slug)
    .eq('published', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('칼럼 조회 실패:', error);
    return null;
  }

  return data ?? null;
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  if (error) {
    console.error('칼럼 slug 조회 실패:', error);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}
