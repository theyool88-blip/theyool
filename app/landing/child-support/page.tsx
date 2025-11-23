import { Metadata } from 'next';
import ChildSupportLandingClient from './ChildSupportLandingClient';

export const metadata: Metadata = {
  title: '양육비 청구 전문 변호사 | 법무법인 더율',
  description: '미지급 양육비 강제집행부터 증액 청구까지. 12년 경력 전문 변호사가 아이의 권리를 지킵니다. 무료 상담으로 양육비 산정액과 청구 전략을 확인하세요.',
  keywords: '양육비, 양육비 청구, 양육비 미지급, 양육비 증액, 양육비 산정, 양육비 변호사',
  openGraph: {
    title: '양육비 청구 전문 변호사 | 법무법인 더율',
    description: '미지급 양육비 강제집행부터 증액까지. 아이의 권리를 지킵니다',
    type: 'website',
  },
};

export default function ChildSupportLandingPage() {
  return <ChildSupportLandingClient />;
}
