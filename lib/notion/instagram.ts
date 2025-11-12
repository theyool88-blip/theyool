import { notion } from './client';

const INSTAGRAM_DB_ID = process.env.NOTION_INSTAGRAM_DB || '';

// 인스타그램 게시물 속성 타입
export interface InstagramProperties {
  제목: { title: Array<{ plain_text: string }> };
  타입: { select: { name: string } | null };
  성공사례: { relation: Array<{ id: string }> };
  변호사칼럼: { relation: Array<{ id: string }> };
  썸네일: { files: Array<{ file?: { url: string }; external?: { url: string }; name: string }> };
  캡션: { rich_text: Array<{ plain_text: string }> };
  조회수: { number: number | null };
  좋아요수: { number: number | null };
  공개: { checkbox: boolean };
  게시일: { date: { start: string } | null };
}

// 변환된 인스타그램 게시물 타입
export interface InstagramPost {
  id: string;
  title: string;
  type: string; // '성공사례' | '칼럼' | '일반' | '홍보'
  linkedCaseId?: string; // 연결된 성공사례 ID
  linkedBlogId?: string; // 연결된 칼럼 ID
  thumbnail?: string; // 첫 번째 이미지 (호환성 유지)
  images: string[]; // 모든 이미지 배열
  mediaUrl?: string; // 동영상 URL 우선 (없으면 썸네일 사용)
  caption: string;
  views: number;
  likes: number;
  published: boolean;
  date: string;
}

// Notion 속성을 InstagramPost 객체로 변환
function parseInstagramPost(page: any): InstagramPost {
  const properties = page.properties as InstagramProperties;

  const title = properties.제목?.title?.[0]?.plain_text || '';
  const type = properties.타입?.select?.name || '일반';
  const linkedCaseId = properties.성공사례?.relation?.[0]?.id;
  const linkedBlogId = properties.변호사칼럼?.relation?.[0]?.id;

  // 모든 이미지를 배열로 가져오기
  const allFiles = properties.썸네일?.files || [];
  const images = allFiles
    .map((file: any) => file?.file?.url || file?.external?.url)
    .filter((url: string | undefined): url is string => !!url);

  // 첫 번째 이미지 (호환성 유지)
  const thumbnail = images[0];

  // 동영상 URL을 위해 추가적인 필드 시도 (스키마에 따라 유연 처리)
  const anyProps = page.properties as any;
  const mediaUrl: string | undefined =
    anyProps?.동영상URL?.url ||
    anyProps?.video?.url ||
    anyProps?.Video?.url ||
    (anyProps?.미디어?.rich_text?.[0]?.plain_text ?? undefined);
  const caption = properties.캡션?.rich_text?.map((t: any) => t.plain_text).join('') || '';
  const views = properties.조회수?.number || 0;
  const likes = properties.좋아요수?.number || 0;
  const published = properties.공개?.checkbox || false;
  const date = properties.게시일?.date?.start || new Date().toISOString();

  return {
    id: page.id,
    title,
    type,
    linkedCaseId,
    linkedBlogId,
    thumbnail,
    images, // 모든 이미지 배열 추가
    mediaUrl,
    caption,
    views,
    likes,
    published,
    date,
  };
}

// 모든 공개된 인스타그램 게시물 가져오기
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: INSTAGRAM_DB_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '게시일',
          direction: 'descending',
        },
      ],
    });

    return response.results.map(parseInstagramPost);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}

// 특정 ID의 인스타그램 게시물 가져오기
export async function getInstagramPostById(id: string): Promise<InstagramPost | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return parseInstagramPost(page);
  } catch (error) {
    console.error('Error fetching Instagram post:', error);
    return null;
  }
}

// 인스타그램 게시물 생성
// createInstagramPost was removed per user request

// 연결된 원문 URL 가져오기
export async function getLinkedOriginalUrl(post: InstagramPost): Promise<string | null> {
  try {
    if (post.type === '성공사례' && post.linkedCaseId) {
      // 성공사례 페이지 가져오기
      const casePage = await notion.pages.retrieve({ page_id: post.linkedCaseId });
      if ('properties' in casePage) {
        const slug = (casePage.properties as any).slug?.rich_text?.[0]?.plain_text;
        return slug ? `/cases/${slug}` : null;
      }
    }

    if (post.type === '칼럼' && post.linkedBlogId) {
      // 칼럼 페이지 가져오기
      const blogPage = await notion.pages.retrieve({ page_id: post.linkedBlogId });
      if ('properties' in blogPage) {
        const slug = (blogPage.properties as any).slug?.rich_text?.[0]?.plain_text;
        return slug ? `/blog/${slug}` : null;
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching linked original URL:', error);
    return null;
  }
}

// 조회수 증가
export async function incrementInstagramViews(postId: string): Promise<void> {
  try {
    // 현재 조회수 가져오기
    const page = await notion.pages.retrieve({ page_id: postId });
    if (!('properties' in page)) return;

    const currentViews = (page.properties as any).조회수?.number || 0;

    // 조회수 +1 업데이트
    await notion.pages.update({
      page_id: postId,
      properties: {
        조회수: {
          number: currentViews + 1,
        },
      },
    });
  } catch (error) {
    console.error('Error incrementing Instagram views:', error);
  }
}

// 좋아요 증가
export async function incrementInstagramLikes(postId: string): Promise<void> {
  try {
    // 현재 좋아요수 가져오기
    const page = await notion.pages.retrieve({ page_id: postId });
    if (!('properties' in page)) return;

    const currentLikes = (page.properties as any).좋아요수?.number || 0;

    // 좋아요수 +1 업데이트
    await notion.pages.update({
      page_id: postId,
      properties: {
        좋아요수: {
          number: currentLikes + 1,
        },
      },
    });
  } catch (error) {
    console.error('Error incrementing Instagram likes:', error);
  }
}

// 타입별 필터링
export function filterInstagramByType(posts: InstagramPost[], type: string): InstagramPost[] {
  if (type === '전체') return posts;
  return posts.filter(p => p.type === type);
}
