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

  // 새로운 testimonial_cases 테이블 사용
  const { count: testimonialsCount } = await supabase
    .from('testimonial_cases')
    .select('*', { count: 'exact', head: true });

  const { count: publishedTestimonialsCount } = await supabase
    .from('testimonial_cases')
    .select('*', { count: 'exact', head: true })
    .eq('published', true)
    .eq('consent_given', true);

  // 상담 통계
  const { count: consultationsCount } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true });

  const { count: pendingConsultationsCount } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // 예약 통계
  const { count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  const { count: pendingBookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50/30 via-white to-sage-50/20">
      {/* 헤더 - Sage Green 스타일 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
              <p className="text-sm text-sage-700 mt-1 font-medium">법무법인 더율</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.email}</span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-sage-50 text-sage-700 hover:bg-sage-100 rounded-lg transition-colors font-medium"
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
        {/* 통계 카드 - Sage Green 스타일 (클릭 가능) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/cases" className="bg-white rounded-xl shadow-sm border border-sage-200 p-6 hover:shadow-md hover:border-sage-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">성공사례</h3>
            <p className="text-3xl font-bold text-gray-900">{casesCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 사례</p>
          </Link>

          <Link href="/admin/blog" className="bg-white rounded-xl shadow-sm border border-sage-200 p-6 hover:shadow-md hover:border-sage-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">변호사 칼럼</h3>
            <p className="text-3xl font-bold text-gray-900">{blogCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 칼럼</p>
          </Link>

          <Link href="/admin/faqs" className="bg-white rounded-xl shadow-sm border border-sage-200 p-6 hover:shadow-md hover:border-sage-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">FAQ</h3>
            <p className="text-3xl font-bold text-gray-900">{faqCount}</p>
            <p className="text-sm text-gray-500 mt-1">공개: {publishedFaqCount}개</p>
          </Link>

          <Link href="/admin/testimonial-cases" className="bg-white rounded-xl shadow-sm border border-sage-200 p-6 hover:shadow-md hover:border-sage-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">의뢰인 후기</h3>
            <p className="text-3xl font-bold text-gray-900">{testimonialsCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">게시: {publishedTestimonialsCount || 0}개</p>
          </Link>

          <Link href="/admin/instagram" className="bg-white rounded-xl shadow-sm border border-sage-200 p-6 hover:shadow-md hover:border-sage-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">Instagram</h3>
            <p className="text-3xl font-bold text-gray-900">{instagramCount || 0}</p>
            <p className="text-sm text-gray-500 mt-1">총 게시물</p>
          </Link>

          <Link href="/admin/consultations" className="bg-gradient-to-br from-coral-50 to-white rounded-xl shadow-sm border-2 border-coral-200 p-6 hover:shadow-md hover:border-coral-300 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-coral-700 group-hover:text-coral-800 mb-2 transition-colors">상담 신청</h3>
            <p className="text-3xl font-bold text-gray-900">{consultationsCount || 0}</p>
            <p className="text-sm text-coral-600 mt-1 font-medium">
              대기 중: {pendingConsultationsCount || 0}건
            </p>
          </Link>

          <Link href="/admin/bookings" className="bg-gradient-to-br from-sage-100 to-white rounded-xl shadow-sm border-2 border-sage-300 p-6 hover:shadow-md hover:border-sage-400 transition-all cursor-pointer group">
            <h3 className="text-sm font-medium text-sage-700 group-hover:text-sage-800 mb-2 transition-colors">상담 예약</h3>
            <p className="text-3xl font-bold text-gray-900">{bookingsCount || 0}</p>
            <p className="text-sm text-sage-700 mt-1 font-medium">
              대기 중: {pendingBookingsCount || 0}건
            </p>
          </Link>
        </div>

        {/* 콘텐츠 관리 섹션 */}
        <div className="bg-white rounded-xl shadow-sm border border-sage-200 mb-6">
          <div className="p-6 border-b border-sage-100">
            <h2 className="text-lg font-semibold text-gray-900">콘텐츠 관리</h2>
          </div>
          <div className="divide-y divide-sage-100">
            <Link
              href="/admin/cases"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    성공사례 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    성공사례 추가, 수정, 삭제
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/blog"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    변호사 칼럼 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    칼럼 작성, 수정, 삭제 (Markdown 에디터)
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/faqs"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    이혼큐레이션(Q&A) 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    이혼큐레이션 추가, 수정, 삭제
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/testimonial-cases"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    의뢰인 후기 관리 (증빙 시스템)
                  </h3>
                  <p className="text-sm text-gray-600">
                    케이스 및 증빙 사진 관리 (카톡, 문자, 네이버 리뷰 등)
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/instagram"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    Instagram 관리
                  </h3>
                  <p className="text-sm text-gray-600">
                    Instagram 게시물 관리 및 편집
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* 상담 관리 섹션 */}
        <div className="bg-white rounded-xl shadow-sm border border-sage-200">
          <div className="p-6 border-b border-sage-100">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">상담 관리</h2>
                <p className="text-sm text-sage-700 mt-0.5">의뢰인 상담 신청부터 예약 확정까지</p>
              </div>
            </div>
          </div>
          <div className="divide-y divide-sage-100">
            <Link
              href="/admin/consultations"
              className="block p-6 hover:bg-coral-50/30 transition-colors border-l-4 border-l-coral-500 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">📞</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2 flex-wrap group-hover:text-coral-700 transition-colors">
                    상담 신청 관리
                    {(pendingConsultationsCount || 0) > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-coral-100 text-coral-800 rounded-full">
                        {pendingConsultationsCount}건 대기
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    콜백 요청, 문의 접수, 리드 스코어링
                  </p>
                </div>
                <svg className="w-5 h-5 text-coral-500 group-hover:text-coral-600 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/bookings"
              className="block p-6 hover:bg-sage-50/50 transition-colors border-l-4 border-l-sage-500 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">📅</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2 flex-wrap group-hover:text-sage-700 transition-colors">
                    방문/화상 예약 관리
                    {(pendingBookingsCount || 0) > 0 && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-sage-100 text-sage-800 rounded-full">
                        {pendingBookingsCount}건 대기
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600">
                    예약 확정, 시간 관리, 화상 링크 전송
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-500 group-hover:text-sage-600 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link
              href="/admin/blocked-times"
              className="block p-6 hover:bg-sage-50/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">⏰</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-sage-700 transition-colors">
                    예약 가능 시간 설정
                  </h3>
                  <p className="text-sm text-gray-600">
                    휴무일, 시간 차단, 사무소별 관리
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-400 group-hover:text-sage-600 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
