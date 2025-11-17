import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

// PUT: FAQ 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const body = await request.json();
    const {
      question, slug, category, summary, answer, featured, published, sort_order,
      related_blog_posts, related_cases
    } = body;

    const { data, error } = await supabase
      .from('faqs')
      .update({
        question,
        slug,
        category,
        summary,
        answer,
        featured,
        published,
        sort_order,
        related_blog_posts: related_blog_posts && related_blog_posts.length > 0 ? related_blog_posts : null,
        related_cases: related_cases && related_cases.length > 0 ? related_cases : null,
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

// DELETE: FAQ 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    const { error } = await supabase
      .from('faqs')
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
