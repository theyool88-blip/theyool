import { Metadata } from 'next';
import CustodyLandingClient from './CustodyLandingClient';

export const metadata: Metadata = {
  title: '양육권 전문 변호사 | 법무법인 더율',
  description: '양육권 결정부터 변경 청구까지. 12년 경력 전문 변호사가 아이의 최선의 이익을 위해 최선을 다합니다. 무료 상담으로 양육권 확보 전략을 확인하세요.',
  keywords: '양육권, 친권, 양육권 분쟁, 양육권 변경, 공동양육권, 양육권 변호사',
  openGraph: {
    title: '양육권 전문 변호사 | 법무법인 더율',
    description: '양육권 결정부터 변경까지. 아이의 최선의 이익을 지킵니다',
    type: 'website',
  },
};

export default function CustodyLandingPage() {
  return <CustodyLandingClient />;
}
