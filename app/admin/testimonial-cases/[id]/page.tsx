import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/auth';
import { getCaseById } from '@/lib/supabase/testimonial-cases';
import { getAllEvidencePhotos } from '@/lib/supabase/evidence-photos';
import CaseDetailClient from './CaseDetailClient';

export const metadata = {
  title: '케이스 상세 | 법무법인 더율',
  description: '의뢰인 후기 케이스 상세 및 증빙 사진 관리',
};

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const session = await getSession();

  if (!session) {
    redirect('/admin/login');
  }

  const { data: testimonialCase, error: caseError } = await getCaseById(params.id);

  if (caseError || !testimonialCase) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">케이스를 찾을 수 없습니다</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {caseError?.message || '케이스를 불러오는데 실패했습니다.'}
        </div>
      </div>
    );
  }

  const { data: evidencePhotos, error: photosError } = await getAllEvidencePhotos(params.id);

  return (
    <CaseDetailClient
      testimonialCase={testimonialCase}
      initialEvidencePhotos={evidencePhotos || []}
      photosError={photosError?.message}
    />
  );
}
