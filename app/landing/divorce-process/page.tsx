import { Metadata } from 'next';
import DivorceProcessLandingClient from './DivorceProcessLandingClient';

export const metadata: Metadata = {
  title: '이혼절차 완벽 가이드 | 법무법인 더율',
  description: '협의이혼부터 재판이혼까지 전체 이혼 절차를 한눈에. 12년 경력 전문 변호사가 처음부터 끝까지 동행합니다. 무료 상담으로 가장 유리한 이혼 전략을 확인하세요.',
  keywords: '이혼절차, 협의이혼, 재판이혼, 이혼조정, 이혼소송, 이혼변호사, 이혼상담',
  openGraph: {
    title: '이혼절차 완벽 가이드 | 법무법인 더율',
    description: '협의이혼부터 재판이혼까지. 12년 경력 전문 변호사가 처음부터 끝까지',
    type: 'website',
  },
};

export default function DivorceProcessLandingPage() {
  return <DivorceProcessLandingClient />;
}
