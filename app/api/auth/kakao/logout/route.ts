import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  (await cookies()).set('k_user', '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}

