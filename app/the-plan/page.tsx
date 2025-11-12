import { getCases } from '@/lib/notion/cases';
import ThePlanClient from './ThePlanClient';

export const revalidate = 60;

export const metadata = {
  title: '더 플랜 (The Plan) | 법무법인 더율',
  description: '이겨놓고 설계하는 3단계 전략. 더율의 핵심 승소 전략을 소개합니다.',
};

export default async function ThePlanPage() {
  // 추천 성공사례만 가져오기 (featured)
  const allCases = await getCases();
  const featuredCases = allCases.filter(c => c.featured).slice(0, 3);

  return <ThePlanClient cases={featuredCases} />;
}
