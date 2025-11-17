import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

// GET: 모든 FAQ 조회 (관리자용 - 비공개 포함)
export async function GET() {
  try {
    await requireAuth();

    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

// POST: 새 FAQ 생성
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const {
      question, slug, category, summary, answer, featured, published, sort_order,
      related_blog_posts, related_cases
    } = body;

    // 필수 필드 검증
    if (!question || !slug || !category || !answer) {
      return NextResponse.json(
        { success: false, message: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question,
        slug,
        category,
        summary: summary || null,
        answer,
        featured: featured || false,
        published: published !== undefined ? published : true,
        sort_order: sort_order || null,
        related_blog_posts: related_blog_posts && related_blog_posts.length > 0 ? related_blog_posts : null,
        related_cases: related_cases && related_cases.length > 0 ? related_cases : null,
      })
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
