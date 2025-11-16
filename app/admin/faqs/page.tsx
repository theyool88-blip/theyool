import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/auth';
import Link from 'next/link';
import FAQManagementClient from './FAQManagementClient';

export default async function FAQManagementPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← 대시보드
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">FAQ 관리</h1>
            </div>
            <span className="text-sm text-gray-600">{session.email}</span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FAQManagementClient />
      </main>
    </div>
  );
}
