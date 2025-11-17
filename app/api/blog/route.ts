import { NextRequest, NextResponse } from 'next/server';
import { getFeaturedBlogPosts } from '@/lib/supabase/blog';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '3');
    const sortBy = searchParams.get('sortBy') || 'featured'; // 'featured', 'latest', 'views'

    const posts = await getFeaturedBlogPosts(limit);

    return NextResponse.json({
      success: true,
      posts,
      total: posts.length
    });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
