// Notion 데이터베이스 속성 타입
export interface CaseProperties {
  제목: { title: Array<{ plain_text: string }> };
  slug: { rich_text: Array<{ plain_text: string }> };
  카테고리: { multi_select: Array<{ name: string }> };
  결과: { rich_text: Array<{ plain_text: string }> };
  배경색: { select: { name: string } | null };
  공개: { checkbox: boolean };
  작성일: { date: { start: string } | null };
}

// 변환된 케이스 데이터 타입
export interface Case {
  id: string;
  slug: string;
  title: string;
  categories: string[]; // 영문 카테고리 배열 (adultery, alimony, etc.)
  categoryNames: string[]; // 한글 카테고리 배열 (상간, 위자료, etc.)
  result: string;
  bgColor: string;
  published: boolean;
  date: string;
  content?: string; // 상세 페이지용
}

// 카테고리 매핑
export const categoryMap: Record<string, string> = {
  '상간': 'adultery',
  '위자료': 'alimony',
  '재산분할': 'property',
  '양육권': 'custody',
};

// 배경색 매핑
export const bgColorMap: Record<string, string> = {
  'pink': 'from-pink-100 via-purple-50 to-blue-50',
  'purple': 'from-purple-100 via-indigo-50 to-pink-50',
  'green': 'from-green-100 via-emerald-50 to-teal-50',
  'amber': 'from-amber-100 via-yellow-50 to-orange-50',
  'red': 'from-red-100 via-rose-50 to-pink-50',
};
