import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const revalidate = 0;

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch instagram posts:', error);
      return NextResponse.json({ posts: [] }, { status: 200 });
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

    return NextResponse.json({ posts: enriched });
  } catch (e) {
    console.error('Failed to fetch instagram posts:', e);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
