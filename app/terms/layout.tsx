import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 법무법인 더율',
  description: '법무법인 더율의 서비스 이용약관을 확인하세요. 상담 및 수임, 서비스 이용에 관한 약관을 안내합니다.',
  keywords: [
    '법무법인 더율',
    '이용약관',
    '서비스 약관',
    '법률 서비스',
    '이혼 전문',
    '법률 상담',
    '변호사 약관',
    '수임 계약',
    '법률 서비스 이용약관',
  ],
  openGraph: {
    title: '이용약관 | 법무법인 더율',
    description: '법무법인 더율의 서비스 이용약관을 확인하세요. 상담 및 수임, 서비스 이용에 관한 약관을 안내합니다.',
    url: 'https://theyool.com/terms',
    siteName: '법무법인 더율',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://theyool.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '법무법인 더율 - 이혼 전문 법률 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '이용약관 | 법무법인 더율',
    description: '법무법인 더율의 서비스 이용약관을 확인하세요. 상담 및 수임, 서비스 이용에 관한 약관을 안내합니다.',
    images: ['https://theyool.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://theyool.com/terms',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
