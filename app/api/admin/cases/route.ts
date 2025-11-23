import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getAdminCases, createCase } from '@/lib/supabase/cases';

// GET: 모든 Cases 조회 (페이지네이션 + 검색)
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

    const { data, total } = await getAdminCases({ page, limit, search });

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
    console.error('Cases 조회 실패:', error);
    return NextResponse.json({ success: false, message: '조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// POST: 새 Case 생성
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false, message: '인증이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Creating case with payload:', JSON.stringify(body, null, 2));

    // 필수 필드 검증
    if (!body.title) {
      return NextResponse.json({ success: false, message: '제목은 필수입니다.' }, { status: 400 });
    }

    const newCase = await createCase(body);

    if (!newCase) {
      console.error('createCase returned null');
      return NextResponse.json({ success: false, message: '생성 중 오류가 발생했습니다.' }, { status: 500 });
    }

    console.log('Case created successfully:', newCase.id);
    return NextResponse.json({ success: true, data: newCase });
  } catch (error) {
    console.error('Case 생성 실패:', error);
    return NextResponse.json({ success: false, message: '생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
