import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/auth/auth';

// 환경 변수에서 관리자 계정 정보 가져오기
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@theyool.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'theyool2024!';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 간단한 인증 (프로덕션에서는 해싱된 비밀번호 사용)
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      await createSession(email);

      return NextResponse.json({
        success: true,
        message: '로그인 성공',
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '로그인 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
