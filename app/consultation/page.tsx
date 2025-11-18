import { Metadata } from 'next';
import ConsultationClient from './ConsultationClient';

export const metadata: Metadata = {
  title: '상담 안내 | 법무법인 더율',
  description: '이혼 전문 변호사 상담 방법, 준비물, 비용 안내. 전화/영상/방문 상담 중 선택하세요. 10분 무료 전화상담 제공.',
  openGraph: {
    title: '상담 안내 | 법무법인 더율',
    description: '이혼 전문 변호사 상담 방법, 준비물, 비용 안내',
    type: 'website',
  },
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
