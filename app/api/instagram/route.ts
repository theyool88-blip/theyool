import { NextResponse } from 'next/server';
import { getInstagramPosts, getLinkedOriginalUrl } from '@/lib/notion/instagram';

export const revalidate = 0;

export async function GET() {
  try {
    const posts = await getInstagramPosts();
    const enriched = await Promise.all(
      posts.map(async (p) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        thumbnail: p.thumbnail || null,
        images: p.images || [], // 모든 이미지 배열 추가
        mediaUrl: p.mediaUrl || null,
        caption: p.caption,
        views: p.views,
        likes: p.likes,
        date: p.date,
        originalUrl: await getLinkedOriginalUrl(p),
      }))
    );
    return NextResponse.json({ posts: enriched });
  } catch (e) {
    console.error('Failed to fetch instagram posts:', e);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
