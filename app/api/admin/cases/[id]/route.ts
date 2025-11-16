import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/auth';
import { getCaseById, updateCase, deleteCase } from '@/lib/supabase/cases';

// GET: 단일 Case 조회
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
    const caseData = await getCaseById(id);

    if (!caseData) {
      return NextResponse.json({ success: false, message: '찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: caseData });
  } catch (error) {
    console.error('Case 조회 실패:', error);
    return NextResponse.json({ success: false, message: '조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// PUT: Case 수정
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

    const updatedCase = await updateCase(id, body);

    if (!updatedCase) {
      return NextResponse.json({ success: false, message: '수정 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: updatedCase });
  } catch (error) {
    console.error('Case 수정 실패:', error);
    return NextResponse.json({ success: false, message: '수정 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// DELETE: Case 삭제
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
    const success = await deleteCase(id);

    if (!success) {
      return NextResponse.json({ success: false, message: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '삭제되었습니다.' });
  } catch (error) {
    console.error('Case 삭제 실패:', error);
    return NextResponse.json({ success: false, message: '삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
