import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/types/database';

type ConsultationInsert = Database['public']['Tables']['consultations']['Insert'];

/**
 * POST /api/consultations
 * 상담 신청 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, category, message } = body;

    // 유효성 검사
    if (!name || !phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수입니다' },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = await createClient();

    // consultations 테이블에 삽입
    const record: ConsultationInsert = {
      name,
      phone,
      email: email || null,
      category: category || null,
      message: message || null,
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('consultations')
      .insert(record as any)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: '상담 신청 저장에 실패했습니다' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: '상담 신청이 완료되었습니다'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    const errorMessage = error instanceof Error ? error.message : null;
    const isConfigError = errorMessage?.includes('Supabase');
    return NextResponse.json(
      {
        error: isConfigError
          ? '상담 신청 저장소 설정이 완료되지 않았습니다. Supabase 환경 변수를 확인해주세요.'
          : '서버 오류가 발생했습니다',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/consultations
 * 상담 신청 목록 조회 (관리자용 - Phase 3에서 구현)
 */
export async function GET(request: NextRequest) {
  // Phase 3에서 구현 예정
  return NextResponse.json(
    { error: 'Not implemented yet' },
    { status: 501 }
  );
}
