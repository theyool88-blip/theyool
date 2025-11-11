import { getBlogPosts } from '@/lib/notion/blog';
import BlogClient from './BlogClient';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogClient posts={posts} />;
}
