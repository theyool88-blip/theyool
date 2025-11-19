import AlimonyClient from './AlimonyClient';

export const metadata = {
  title: '위자료 방어 전략 | 법무법인 더율',
  description: '부당한 위자료 청구로부터 당신을 지킵니다. 평균 70% 감액 성공. 10년 이상 위자료 전문 변호사가 함께합니다.',
  keywords: '위자료 방어, 위자료 감액, 위자료 청구, 이혼 위자료, 위자료 변호사',
  openGraph: {
    title: '위자료 방어 전략 | 법무법인 더율',
    description: '부당한 위자료 청구로부터 당신을 지킵니다. 평균 70% 감액 성공.',
    url: 'https://theyool.com/alimony-defense',
    siteName: '법무법인 더율',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function AlimonyDefensePage() {
  return <AlimonyClient />;
}
