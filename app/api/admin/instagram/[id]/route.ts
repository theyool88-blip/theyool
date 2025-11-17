import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// PUT: Instagram 게시물 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const body = await request.json();
    const { title, post_type, caption, images, thumbnail, published, post_date, author, author_profile_url } = body;

    const { data, error } = await supabase
      .from('instagram_posts')
      .update({
        title,
        post_type,
        caption,
        images,
        thumbnail_url: thumbnail,
        published,
        published_at: post_date,
        author: author || 'theyool_official',
        author_profile_url: author_profile_url || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

// DELETE: Instagram 게시물 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const { error } = await supabase
      .from('instagram_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
