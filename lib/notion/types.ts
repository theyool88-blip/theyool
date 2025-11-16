// Notion 데이터베이스 속성 타입
export interface CaseProperties {
  제목: { title: Array<{ plain_text: string }> };
  slug: { rich_text: Array<{ plain_text: string }> };
  카테고리: { multi_select: Array<{ name: string }> };
  결과: { rich_text: Array<{ plain_text: string }> };
  요약: { rich_text: Array<{ plain_text: string }> };
  배경색: { select: { name: string } | null };
  커버이미지: { files: Array<{ name: string; file?: { url: string }; external?: { url: string } }> };
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
  summary?: string; // 요약 (1-2줄)
  bgColor: string;
  coverImage?: string; // 커버 이미지 URL (선택적)
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

// 카테고리별 배경 이미지 매핑
export const categoryImageMap: Record<string, string> = {
  'adultery': '/images/adultery-bg.png',
  '상간': '/images/adultery-bg.png',
  'alimony': '/images/alimony-bg.png',
  '위자료': '/images/alimony-bg.png',
  'property': '/images/property-bg.png',
  '재산분할': '/images/property-bg.png',
  'custody': '/images/custody-bg.png',
  '양육권': '/images/custody-bg.png',
};

// 카테고리별 파스텔 오버레이 색상
export const categoryOverlayMap: Record<string, string> = {
  'adultery': 'from-pink-50/80 via-rose-50/75 to-red-50/70',
  '상간': 'from-pink-50/80 via-rose-50/75 to-red-50/70',
  'alimony': 'from-purple-50/80 via-lavender-50/75 to-blue-50/70',
  '위자료': 'from-purple-50/80 via-lavender-50/75 to-blue-50/70',
  'property': 'from-emerald-50/80 via-teal-50/75 to-cyan-50/70',
  '재산분할': 'from-emerald-50/80 via-teal-50/75 to-cyan-50/70',
  'custody': 'from-amber-50/80 via-orange-50/75 to-yellow-50/70',
  '양육권': 'from-amber-50/80 via-orange-50/75 to-yellow-50/70',
};
