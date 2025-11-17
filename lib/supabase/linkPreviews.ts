/**
 * Supabase data fetching utilities for link previews
 * Fetches minimal metadata for blog posts and cases to display in link preview boxes
 */

import { createClient } from '@/lib/supabase/server';
import { BlogPreviewData, CasePreviewData } from '@/types/linkPreview';

/**
 * Fetches blog post preview data by slug
 * Only fetches necessary columns for preview display
 * @param slug - Blog post slug
 * @returns Blog preview data or null if not found/unpublished
 */
export async function getBlogPreviewBySlug(slug: string): Promise<BlogPreviewData | null> {
  try {
    const supabase = await createClient();

    console.log('[getBlogPreviewBySlug] Fetching blog with slug:', slug);

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, excerpt, published_at, views, categories')
      .eq('slug', slug)
      .eq('published', true) // Only fetch published posts
      .single();

    if (error) {
      console.error(`[getBlogPreviewBySlug] Error for slug "${slug}":`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return null;
    }

    if (!data) {
      console.log(`[getBlogPreviewBySlug] No data found for slug "${slug}"`);
      return null;
    }

    console.log('[getBlogPreviewBySlug] Found blog:', { id: data.id, slug: data.slug, title: data.title });

    return {
      id: data.id as string,
      slug: data.slug as string,
      title: data.title as string,
      excerpt: (data.excerpt as string | null) || undefined,
      publishedAt: (data.published_at as string | null) || undefined,
      views: (data.views as number | null) || undefined,
      categories: (data.categories as string[] | null) || undefined,
    };
  } catch (error) {
    console.error(`[getBlogPreviewBySlug] Exception for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches case preview data by slug
 * Only fetches necessary columns for preview display
 * @param slug - Case slug
 * @returns Case preview data or null if not found
 */
export async function getCasePreviewBySlug(slug: string): Promise<CasePreviewData | null> {
  try {
    const supabase = await createClient();

    console.log('[getCasePreviewBySlug] Fetching case with slug:', slug);

    const { data, error } = await supabase
      .from('cases')
      .select('id, slug, title, result, categories')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      console.error(`[getCasePreviewBySlug] Error for slug "${slug}":`, {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return null;
    }

    if (!data) {
      console.log(`[getCasePreviewBySlug] No data found for slug "${slug}"`);
      return null;
    }

    console.log('[getCasePreviewBySlug] Found case:', { id: data.id, slug: data.slug, title: data.title });

    return {
      id: data.id as string,
      slug: data.slug as string,
      title: data.title as string,
      summary: undefined, // No summary field in cases table
      result: (data.result as string | null) || undefined,
      categories: (data.categories as string[] | null) || undefined,
      coverImage: undefined, // No image field in cases table
    };
  } catch (error) {
    console.error(`[getCasePreviewBySlug] Exception for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetches multiple blog previews in parallel
 * @param slugs - Array of blog post slugs
 * @returns Map of slug to blog preview data
 */
export async function getBlogPreviewsBatch(slugs: string[]): Promise<Map<string, BlogPreviewData>> {
  const previewMap = new Map<string, BlogPreviewData>();

  if (slugs.length === 0) {
    return previewMap;
  }

  // Fetch all previews in parallel
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const preview = await getBlogPreviewBySlug(slug);
      return { slug, preview };
    })
  );

  // Build map, filtering out null results
  for (const { slug, preview } of results) {
    if (preview) {
      previewMap.set(slug, preview);
    }
  }

  return previewMap;
}

/**
 * Fetches multiple case previews in parallel
 * @param slugs - Array of case slugs
 * @returns Map of slug to case preview data
 */
export async function getCasePreviewsBatch(slugs: string[]): Promise<Map<string, CasePreviewData>> {
  const previewMap = new Map<string, CasePreviewData>();

  if (slugs.length === 0) {
    return previewMap;
  }

  // Fetch all previews in parallel
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const preview = await getCasePreviewBySlug(slug);
      return { slug, preview };
    })
  );

  // Build map, filtering out null results
  for (const { slug, preview } of results) {
    if (preview) {
      previewMap.set(slug, preview);
    }
  }

  return previewMap;
}

/**
 * Fetches all internal link previews (both blog and case) in parallel
 * @param blogSlugs - Array of blog post slugs
 * @param caseSlugs - Array of case slugs
 * @returns Object with blog and case preview maps
 */
export async function getAllLinkPreviews(
  blogSlugs: string[],
  caseSlugs: string[]
): Promise<{
  blogPreviews: Map<string, BlogPreviewData>;
  casePreviews: Map<string, CasePreviewData>;
}> {
  const [blogPreviews, casePreviews] = await Promise.all([
    getBlogPreviewsBatch(blogSlugs),
    getCasePreviewsBatch(caseSlugs),
  ]);

  return {
    blogPreviews,
    casePreviews,
  };
}
