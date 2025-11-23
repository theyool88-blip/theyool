import { Metadata } from 'next';
import EvidenceLandingClient from './EvidenceLandingClient';

export const metadata: Metadata = {
  title: '이혼 증거수집 전문 변호사 | 법무법인 더율',
  description: '불륜증거부터 재산증거까지 법적 효력 있는 증거 확보 방법. 12년 경력 전문 변호사가 합법적 증거수집 전략을 제시합니다. 무료 상담으로 증거 확보 방법을 확인하세요.',
  keywords: '증거수집, 불륜증거, 이혼증거, 재산증거, 증거능력, 이혼변호사',
  openGraph: {
    title: '이혼 증거수집 전문 변호사 | 법무법인 더율',
    description: '법적 효력 있는 증거수집 방법. 12년 경력 전문가가 안내합니다',
    type: 'website',
  },
};

export default function EvidenceLandingPage() {
  return <EvidenceLandingClient />;
}
