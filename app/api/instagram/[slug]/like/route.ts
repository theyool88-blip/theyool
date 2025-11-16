import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const { error } = await supabase.rpc('increment_instagram_likes', {
      post_slug: slug,
    });

    if (error) {
      console.error('Failed to increment like:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Failed to increment like:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
