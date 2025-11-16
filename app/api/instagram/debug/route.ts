import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        posts: []
      });
    }

    return NextResponse.json({
      success: true,
      count: posts?.length || 0,
      sample: posts?.[0] || null,
      hasEmptyTitles: posts?.filter(p => !p.title).length || 0,
      hasEmptyCaptions: posts?.filter(p => !p.caption).length || 0,
      posts: posts || []
    });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({
      success: false,
      error: error.message,
      posts: []
    });
  }
}
