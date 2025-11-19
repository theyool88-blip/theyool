import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/auth';
import { getAllCases } from '@/lib/supabase/testimonial-cases';
import TestimonialCasesClient from './TestimonialCasesClient';

export const metadata = {
  title: '의뢰인 후기 관리 | 법무법인 더율',
  description: '의뢰인 후기 케이스 관리',
};

export default async function TestimonialCasesPage() {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { data: cases, error } = await getAllCases();

  if (error) {
    console.error('Failed to fetch testimonial cases:', error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">의뢰인 후기 관리</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          케이스 목록을 불러오는데 실패했습니다: {error.message}
        </div>
      </div>
    );
  }

  return <TestimonialCasesClient initialCases={cases || []} />;
}
