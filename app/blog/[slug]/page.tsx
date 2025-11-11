import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/notion/blog';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailClient post={post} />;
}
