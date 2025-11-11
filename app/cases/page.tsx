import { getCases } from '@/lib/notion/cases';
import CasesClient from './CasesClient';

export const revalidate = 60; // 60초마다 재검증 (ISR)

export default async function CasesPage() {
  // Notion에서 데이터 가져오기
  const cases = await getCases();

  return <CasesClient cases={cases} />;
}
