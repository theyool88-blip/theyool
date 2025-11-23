import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getBlogPosts, createBlogPost } from '@/lib/supabase/blog';

// GET: 모든 Blog Posts 조회 (페이지네이션 + 검색)
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '40');
    const search = searchParams.get('search') || '';

    const { data, total } = await getBlogPosts({ page, limit, search });

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Blog Posts 조회 실패:', error);
    return NextResponse.json({ success: false, message: '조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 새 Blog Post 생성
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();

    // 필수 필드 검증
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ success: false, message: '제목, Slug, 내용은 필수입니다.' }, { status: 400 });
    }

    const newPost = await createBlogPost(body);

    if (!newPost) {
      return NextResponse.json({ success: false, message: '생성 중 오류가 발생했습니다. (Slug 중복 확인 필요)' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: newPost });
  } catch (error) {
    console.error('Blog Post 생성 실패:', error);
    return NextResponse.json({ success: false, message: '생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
