import { Metadata } from 'next';
import AlimonyLandingClient from './AlimonyLandingClient';

export const metadata: Metadata = {
  title: '위자료 청구 전문 변호사 | 법무법인 더율',
  description: '불륜, 가정폭력으로 인한 위자료 청구. 평균 2,000~3,000만원, 최대 5,000만원 이상. 15년 경력 전문 변호사가 승소 전략을 제시합니다.',
  keywords: '위자료, 위자료 청구, 이혼 위자료, 불륜 위자료, 위자료 금액, 위자료 산정, 이혼 변호사',
  openGraph: {
    title: '위자료 청구 전문 변호사 | 법무법인 더율',
    description: '불륜, 가정폭력으로 인한 위자료 청구. 평균 2,000~3,000만원',
    type: 'website',
  },
};

export default function AlimonyLandingPage() {
  return <AlimonyLandingClient />;
}
