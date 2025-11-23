import { Metadata } from 'next';
import PropertyLandingClient from './PropertyLandingClient';

export const metadata: Metadata = {
  title: '재산분할 전문 변호사 | 법무법인 더율',
  description: '이혼 재산분할 전문. 숨겨진 재산 추적, 공정한 분할 비율 확보. 12년 경력, 1,200건 이상 처리. 무료 상담으로 예상 분할 금액을 확인하세요.',
  keywords: '재산분할, 이혼 재산분할, 재산분할 변호사, 재산분할 비율, 재산분할 청구, 이혼 변호사',
  openGraph: {
    title: '재산분할 전문 변호사 | 법무법인 더율',
    description: '숨겨진 재산까지 찾아 공정한 분할 실현. 12년 경력 전문 변호사',
    type: 'website',
  },
};

export default function PropertyLandingPage() {
  return <PropertyLandingClient />;
}