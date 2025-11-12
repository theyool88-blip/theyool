import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function randomState(len = 24) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < len; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const clientId = process.env.KAKAO_REST_API_KEY;
  const redirectUri = process.env.KAKAO_REDIRECT_URI || `${origin}/api/auth/kakao/callback`;
  const scope = 'profile_nickname,profile_image';

  if (!clientId) {
    return NextResponse.json({ error: 'KAKAO_REST_API_KEY is not set' }, { status: 400 });
  }

  const state = randomState();
  (await cookies()).set('k_state', state, { httpOnly: true, sameSite: 'lax', maxAge: 300, path: '/' });

  const url = new URL('https://kauth.kakao.com/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', scope);
  url.searchParams.set('state', state);

  return NextResponse.redirect(url);
}

