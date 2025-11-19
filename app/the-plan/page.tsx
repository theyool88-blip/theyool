import ThePlanClient from './ThePlanClient';
import { getPublicCases } from '@/lib/supabase/cases';
import { bgColorMap } from '@/lib/constants/categories';

export const metadata = {
  title: '더 플랜 (The Plan) | 법무법인 더율',
  description: '이겨놓고 설계하는 체계적인 승소 전략. 1,200번의 이혼을 거치며 만든 검증된 길이 있습니다.',
};

export default async function ThePlanPage() {
  // Fetch featured cases from Supabase
  const allCases = await getPublicCases();

  // Map to The Plan Client format
  const cases = allCases.slice(0, 6).map((caseItem) => ({
    id: caseItem.id,
    slug: caseItem.slug,
    title: caseItem.title,
    category: caseItem.categoryNames[0] || '이혼',
    badge: caseItem.categoryNames[0] || '이혼',
    background: caseItem.summary || '',
    strategy: '',
    result: caseItem.result || '',
    icon: getIconForCategory(caseItem.categoryNames[0]),
    bgColor: caseItem.bgColor || bgColorMap[caseItem.categoryNames[0]] || 'bg-blue-50',
    featured: true,
  }));

  return <ThePlanClient cases={cases} />;
}

// Helper function to get icon based on category
function getIconForCategory(category: string): string {
  const iconMap: Record<string, string> = {
    '위자료': '💰',
    '재산분할': '🏠',
    '양육권': '👶',
    '양육비': '📋',
    '협의이혼': '🤝',
    '재판이혼': '⚖️',
    '상간': '💔',
    '이혼 후': '🌅',
    '이혼': '📄',
  };

  return iconMap[category] || '📄';
}
