import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET: 모든 Instagram 게시물 조회
export async function GET() {
  try {
    await requireAuth();

    const { data, error } = await supabase
      .from('instagram_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const linkedCaseIds = Array.from(
      new Set(
        (data || [])
          .map((post) => post.linked_case_id)
          .filter((id): id is string => Boolean(id))
      )
    );
    const linkedBlogIds = Array.from(
      new Set(
        (data || [])
          .map((post) => post.linked_blog_id)
          .filter((id): id is string => Boolean(id))
      )
    );

    const caseMap: Record<string, { title: string; slug: string }> = {};
    const blogMap: Record<string, { title: string; slug: string }> = {};

    if (linkedCaseIds.length) {
      const [
        { data: caseById, error: caseByIdError },
        { data: caseByNotion, error: caseByNotionError },
      ] = await Promise.all([
        supabase.from('cases').select('id, notion_id, title, slug').in('id', linkedCaseIds),
        supabase.from('cases').select('id, notion_id, title, slug').in('notion_id', linkedCaseIds),
      ]);

      if (caseByIdError) throw caseByIdError;
      if (caseByNotionError) throw caseByNotionError;

      [...(caseById || []), ...(caseByNotion || [])].forEach((item) => {
        if (item.id) {
          caseMap[item.id] = { title: item.title, slug: item.slug };
        }
        if (item.notion_id) {
          caseMap[item.notion_id] = { title: item.title, slug: item.slug };
        }
      });
    }

    if (linkedBlogIds.length) {
      const [
        { data: blogById, error: blogByIdError },
        { data: blogByNotion, error: blogByNotionError },
      ] = await Promise.all([
        supabase.from('blog_posts').select('id, notion_id, title, slug').in('id', linkedBlogIds),
        supabase.from('blog_posts').select('id, notion_id, title, slug').in('notion_id', linkedBlogIds),
      ]);

      if (blogByIdError) throw blogByIdError;
      if (blogByNotionError) throw blogByNotionError;

      [...(blogById || []), ...(blogByNotion || [])].forEach((item) => {
        if (item.id) {
          blogMap[item.id] = { title: item.title, slug: item.slug };
        }
        if (item.notion_id) {
          blogMap[item.notion_id] = { title: item.title, slug: item.slug };
        }
      });
    }

    const enrichedData = (data || []).map((post) => {
      const linkedCase = post.linked_case_id ? caseMap[post.linked_case_id] : null;
      const linkedBlog = post.linked_blog_id ? blogMap[post.linked_blog_id] : null;

      const original = linkedCase
        ? {
          type: 'case' as const,
          title: linkedCase.title,
          slug: linkedCase.slug,
          url: `/cases/${linkedCase.slug}`,
        }
      : linkedBlog
      ? {
          type: 'blog' as const,
          title: linkedBlog.title,
          slug: linkedBlog.slug,
          url: `/blog/${linkedBlog.slug}`,
        }
      : null;

      // thumbnail_url 필드를 thumbnail로 매핑
      return {
        ...post,
        thumbnail: post.thumbnail_url || (Array.isArray(post.images) && post.images[0]) || null,
        original,
        previewUrl: post.thumbnail_url || (Array.isArray(post.images) && post.images[0]) || null,
        images: post.images || [],
      };
    });

    return NextResponse.json({ success: true, data: enrichedData });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}

// POST: 새 Instagram 게시물 생성
export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const body = await request.json();
    const { title, post_type, caption, images, thumbnail, published, post_date } = body;

    const { data, error } = await supabase
      .from('instagram_posts')
      .insert({
        title: title || '',
        post_type: post_type || '일상',
        caption: caption || '',
        images: images || [],
        thumbnail_url: thumbnail || (images && images[0]) || null,
        published: published !== undefined ? published : true,
        published_at: post_date || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: error.message === 'Unauthorized' ? 401 : 500 }
    );
  }
}
