import { NextResponse } from 'next/server';
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

export const revalidate = 0;

export async function GET() {
  // 환경변수가 없으면 빈 배열 반환
  if (!hasValidEnvironment()) {
    console.warn('[Instagram API] Missing environment variables. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in deployment.');
    return NextResponse.json({
      posts: [],
      error: 'Missing environment variables'
    });
  }

  try {
    const { data: posts, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Instagram API] Database error:', error);
      return NextResponse.json({
        posts: [],
        error: error.message
      }, { status: 200 });
    }

    if (!posts || posts.length === 0) {
      console.warn('[Instagram API] No published posts found in database');
    }

    const enriched = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      type: p.post_type,
      thumbnail: p.thumbnail_url || null,
      images: p.images || [],
      mediaUrl: p.thumbnail_url || null, // for backward compatibility
      caption: p.caption,
      views: p.views,
      likes: p.likes,
      date: p.published_at || p.created_at,
      linkedCaseId: p.linked_case_id,
      linkedBlogId: p.linked_blog_id,
      author: p.author || 'theyool_official',
      authorProfileUrl: p.author_profile_url || null,
    }));

    console.log(`[Instagram API] Successfully fetched ${enriched.length} posts`);
    return NextResponse.json({ posts: enriched });
  } catch (e) {
    console.error('[Instagram API] Unexpected error:', e);
    return NextResponse.json({
      posts: [],
      error: e instanceof Error ? e.message : 'Unknown error'
    }, { status: 200 });
  }
}
