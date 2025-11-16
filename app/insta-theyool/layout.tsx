import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인스타더율 | 법무법인 더율',
  description: '법무법인 더율의 Instagram 게시물을 확인하세요. 이혼 전문 변호사의 법률 정보와 성공사례를 공유합니다.',
  openGraph: {
    title: '인스타더율 | 법무법인 더율',
    description: '법무법인 더율의 Instagram 게시물을 확인하세요. 이혼 전문 변호사의 법률 정보와 성공사례를 공유합니다.',
    type: 'website',
    url: 'https://theyool.com/insta-theyool',
    siteName: '법무법인 더율',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '인스타더율 | 법무법인 더율',
    description: '법무법인 더율의 Instagram 게시물을 확인하세요.',
  },
  alternates: {
    canonical: 'https://theyool.com/insta-theyool',
  },
};

export default function InstaTheyoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
