import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/supabase/blog';

// GET: 단일 Blog Post 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { id } = await params;
    const post = await getBlogPostById(id);

    if (!post) {
      return NextResponse.json({ success: false, message: '찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Blog Post 조회 실패:', error);
    return NextResponse.json({ success: false, message: '조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: Blog Post 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updatedPost = await updateBlogPost(id, body);

    if (!updatedPost) {
      return NextResponse.json({ success: false, message: '수정 중 오류가 발생했습니다. (Slug 중복 확인 필요)' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error('Blog Post 수정 실패:', error);
    return NextResponse.json({ success: false, message: '수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: Blog Post 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const { id } = await params;
    const success = await deleteBlogPost(id);

    if (!success) {
      return NextResponse.json({ success: false, message: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '삭제되었습니다.' });
  } catch (error) {
    console.error('Blog Post 삭제 실패:', error);
    return NextResponse.json({ success: false, message: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
