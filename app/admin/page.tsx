import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/auth';
import { getFAQs } from '@/lib/supabase/faq';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  // 통계 데이터 가져오기
  const faqs = await getFAQs();
  const faqCount = faqs.length;
  const publishedFaqCount = faqs.filter(f => f.published).length;

  const { count: instagramCount } = await supabase
    .from('instagram_posts')
    .select('*', { count: 'exact', head: true });

  const { count: casesCount } = await supabase
    .from('cases')
    .select('*', { count: 'exact', head: true });

  const { count: blogCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-sm text-gray-600 mt-1">법무법인 더율</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.email}</span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">성공사례</h3>
            <p className="text-3xl font-bold text-gray-900">{casesCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 사례</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">변호사 칼럼</h3>
            <p className="text-3xl font-bold text-gray-900">{blogCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 칼럼</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">FAQ</h3>
            <p className="text-3xl font-bold text-gray-900">{faqCount}</p>
            <p className="text-sm text-gray-500 mt-1">공개: {publishedFaqCount}개</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Instagram</h3>
            <p className="text-3xl font-bold text-gray-900">{instagramCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 게시물</p>
          </div>
        </div>

        {/* 관리 메뉴 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">콘텐츠 관리</h2>
          </div>
          <div className="divide-y divide-gray-200">
            <Link
              href="/admin/cases"
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    성공사례 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    성공사례 추가, 수정, 삭제
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/blog"
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    변호사 칼럼 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    칼럼 작성, 수정, 삭제 (Markdown 에디터)
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/faqs"
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    이혼큐레이션(Q&A) 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    이혼큐레이션 추가, 수정, 삭제
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/instagram"
              className="block p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Instagram 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    Instagram 게시물 관리 및 편집
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
