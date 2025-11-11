import { getCases } from '@/lib/notion/cases';
import CasesClient from './CasesClient';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

export default async function CasesPage() {
  // Notion에서 데이터 가져오기
  const cases = await getCases();

  return <CasesClient cases={cases} />;
}
