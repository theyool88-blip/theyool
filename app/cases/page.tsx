import { getPublicCases } from '@/lib/supabase/cases';
import CasesClient from './CasesClient';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

export default async function CasesPage() {
  const cases = await getPublicCases();

  return <CasesClient cases={cases} />;
}
