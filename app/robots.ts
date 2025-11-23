import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theyool.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',              // 관리자 페이지
          '/api/',                // API 엔드포인트
          '/booking/confirmation/', // 예약 확인 (개인정보 보호)
        ],
      },
      // 특정 봇 추가 차단 (스크래핑 방지)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
