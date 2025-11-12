import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function exchangeCodeForToken(code: string, redirectUri: string) {
  const params = new URLSearchParams();
  params.set('grant_type', 'authorization_code');
  params.set('client_id', process.env.KAKAO_REST_API_KEY || '');
  if (process.env.KAKAO_CLIENT_SECRET) params.set('client_secret', process.env.KAKAO_CLIENT_SECRET);
  params.set('redirect_uri', redirectUri);
  params.set('code', code);

  const resp = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: params.toString(),
    cache: 'no-store',
  });
  if (!resp.ok) throw new Error(`Token exchange failed: ${resp.status}`);
  return resp.json();
}

async function fetchKakaoUser(accessToken: string) {
  const resp = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  });
  if (!resp.ok) throw new Error(`Profile fetch failed: ${resp.status}`);
  return resp.json();
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const origin = url.origin;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = (await cookies()).get('k_state')?.value;
  const redirectUri = process.env.KAKAO_REDIRECT_URI || `${origin}/api/auth/kakao/callback`;

  if (!code) return NextResponse.redirect(new URL('/auth/login?error=missing_code', origin));
  if (!state || !savedState || state !== savedState) return NextResponse.redirect(new URL('/auth/login?error=state', origin));

  try {
    const token = await exchangeCodeForToken(code, redirectUri);
    const user = await fetchKakaoUser(token.access_token);

    const minimal = {
      id: user.id,
      nickname: user.kakao_account?.profile?.nickname || user.properties?.nickname || '사용자',
      profile_image: user.kakao_account?.profile?.profile_image_url || user.properties?.profile_image || '',
    };

    const res = NextResponse.redirect(new URL('/auth/login?ok=1', origin));
    (await cookies()).set('k_user', JSON.stringify(minimal), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
    (await cookies()).set('k_state', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
    return res;
  } catch (e) {
    console.error('Kakao callback error', e);
    return NextResponse.redirect(new URL('/auth/login?error=callback_failed', origin));
  }
}

