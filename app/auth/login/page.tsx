import { cookies } from 'next/headers';
import PageLayout from '@/components/layouts/PageLayout';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get('k_user')?.value;
  let user: { id: string; nickname: string; profile_image?: string } | null = null;
  try { if (raw) user = JSON.parse(raw); } catch {}

  return (
    <PageLayout>
      <section className="py-20 px-6 md:py-28 md:px-12 bg-white">
        <div className="max-w-md mx-auto text-center">
          {user ? (
            <div className="space-y-6">
              {user.profile_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.profile_image} alt="profile" className="w-20 h-20 rounded-full mx-auto" />
              ) : null}
              <h1 className="text-2xl md:text-3xl font-bold">안녕하세요, {user.nickname}님</h1>
              <form action="/api/auth/kakao/logout" method="post">
                <button className="px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold" type="submit">로그아웃</button>
              </form>
            </div>
          ) : (
            <div className="space-y-8">
              <h1 className="text-2xl md:text-3xl font-bold">카카오톡으로 로그인</h1>
              <p className="text-gray-600">아래 버튼을 눌러 카카오 인증을 진행하세요.</p>
              <a href="/api/auth/kakao/authorize" className="inline-flex items-center gap-3 px-6 py-3 rounded-md font-bold" style={{ background: '#FEE500', color: '#111' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 3C6.477 3 2 6.58 2 10.996c0 2.539 1.56 4.8 3.938 6.221-.132.79-.72 2.27-1.02 2.983-.16.379.24.36.504.26 1.116-.424 2.61-1.05 3.601-1.575.896.194 1.847.303 2.877.303 5.523 0 10-3.58 10-7.996S17.523 3 12 3z" />
                </svg>
                카카오로 시작하기
              </a>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

