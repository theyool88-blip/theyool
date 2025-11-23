// @ts-nocheck - Testimonial types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/testimonials
 * 공개 후기 목록 조회 (프론트엔드용)
 *
 * 보안: published = true AND consent_given = true만 노출
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '9');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 쿼리 빌더 - 게시되고 동의된 후기만 조회
    let query = supabase
      .from('testimonials')
      .select('id, client_name, client_initial, client_role, case_category, case_result, case_date, content, rating, verified, photo_url, use_photo, avatar_bg_color, avatar_text_color, display_order, created_at', { count: 'exact' })
      .eq('published', true)
      .eq('consent_given', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    // 필터 적용
    if (category) {
      query = query.eq('case_category', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // 페이지네이션
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
    }

    return NextResponse.json({
      data,
      count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/testimonials/[id]/helpful
 * "도움이 됐어요" 카운트 증가
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing testimonial ID' }, { status: 400 });
    }

    const supabase = await createClient();

    // RPC 함수 호출
    const { error } = await supabase.rpc('increment_testimonial_helpful', {
      testimonial_id: id,
    });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
