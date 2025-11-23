// @ts-nocheck - Testimonial types not yet in database.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth/auth';

/**
 * GET /api/admin/testimonials
 * 후기 목록 조회 (관리자용 - 전체 조회)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // 쿼리 파라미터
    const category = searchParams.get('category');
    const published = searchParams.get('published');
    const verified = searchParams.get('verified');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 쿼리 빌더
    let query = supabase
      .from('testimonials')
      .select('*', { count: 'exact' })
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    // 필터 적용
    if (category) {
      query = query.eq('case_category', category);
    }

    if (published !== null) {
      query = query.eq('published', published === 'true');
    }

    if (verified !== null) {
      query = query.eq('verified', verified === 'true');
    }

    if (search) {
      query = query.textSearch('search_vector', search);
    }

    // 페이지네이션
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
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
 * POST /api/admin/testimonials
 * 새 후기 생성
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // 필수 필드 검증
    const requiredFields = [
      'client_name',
      'client_initial',
      'client_role',
      'case_category',
      'case_result',
      'case_date',
      'content',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // 평점 검증 (1-5)
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          ...body,
          rating: body.rating || 5,
          created_by: session.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
