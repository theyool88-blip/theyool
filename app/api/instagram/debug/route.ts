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

export async function GET() {
  // 환경변수가 없으면 빈 배열 반환
  if (!hasValidEnvironment()) {
    return NextResponse.json({
      success: true,
      count: 0,
      sample: null,
      hasEmptyTitles: 0,
      hasEmptyCaptions: 0,
      posts: []
    });
  }

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
