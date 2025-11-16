import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion/blog';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theyool.com';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: '변호사 칼럼 | 법무법인 더율',
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const description = post.excerpt || post.title;

  return {
    title: `${post.title} | 변호사 칼럼 | 법무법인 더율`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: `${post.title} | 법무법인 더율`,
      description,
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  return <BlogDetailClient post={post} canonicalUrl={canonicalUrl} />;
}
