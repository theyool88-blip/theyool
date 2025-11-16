import { notion } from './client';
import { NotionToMarkdown } from 'notion-to-md';

const n2m = new NotionToMarkdown({ notionClient: notion });
const BLOG_DB_ID = process.env.NOTION_BLOG_DB || '';

// 변호사칼럼 속성 타입
export interface BlogProperties {
  제목: { title: Array<{ plain_text: string }> };
  slug: { rich_text: Array<{ plain_text: string }> };
  카테고리: { multi_select: Array<{ name: string }> };
  태그: { multi_select: Array<{ name: string }> };
  요약: { rich_text: Array<{ plain_text: string }> };
  공개: { checkbox: boolean };
  추천: { checkbox: boolean };
  작성일: { date: { start: string } | null };
  조회수: { number: number | null };
}

// 변환된 칼럼 데이터 타입
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string; // 요약 (2-3줄)
  categories: string[]; // 다중 카테고리 지원
  tags: string[];
  published: boolean;
  featured: boolean;
  date: string;
  views: number;
  content?: string; // 상세 페이지용
}

// Notion 속성을 BlogPost 객체로 변환
function parseBlogPost(page: any): BlogPost {
  const properties = page.properties as BlogProperties;

  const title = properties.제목?.title?.[0]?.plain_text || '';
  const slug = properties.slug?.rich_text?.[0]?.plain_text || '';
  const excerpt = properties.요약?.rich_text?.[0]?.plain_text || '';
  const categories = properties.카테고리?.multi_select?.map((cat: any) => cat.name) || [];
  const tags = properties.태그?.multi_select?.map((t: any) => t.name) || [];
  const published = properties.공개?.checkbox || false;
  const featured = properties.추천?.checkbox || false;
  const date = properties.작성일?.date?.start || new Date().toISOString();
  const views = properties.조회수?.number || 0;

  return {
    id: page.id,
    slug,
    title,
    excerpt,
    categories, // 다중 카테고리
    tags,
    published,
    featured,
    date,
    views,
  };
}

// 모든 공개된 칼럼 목록 가져오기
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '작성일',
          direction: 'descending',
        },
      ],
    });

    return response.results.map(parseBlogPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// 특정 slug의 칼럼 가져오기
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
      filter: {
        and: [
          {
            property: 'slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: '공개',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];
    const blogPost = parseBlogPost(page);

    // 페이지 본문 가져오기
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    blogPost.content = mdString.parent;

    return blogPost;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

// 모든 칼럼의 slug 목록 가져오기 (정적 경로 생성용)
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => {
      const properties = page.properties as BlogProperties;
      return properties.slug?.rich_text?.[0]?.plain_text || '';
    }).filter(Boolean);
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

// 추천 칼럼 가져오기
export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: BLOG_DB_ID,
      filter: {
        and: [
          {
            property: '공개',
            checkbox: {
              equals: true,
            },
          },
          {
            property: '추천',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: '작성일',
          direction: 'descending',
        },
      ],
      page_size: limit,
    });

    return response.results.map(parseBlogPost);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

// 카테고리별 칼럼 필터링 (다중 카테고리 지원)
export function filterBlogByCategory(posts: BlogPost[], category: string): BlogPost[] {
  if (category === '전체') return posts;
  return posts.filter(p => p.categories.includes(category));
}

// 태그별 칼럼 필터링
export function filterBlogByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter(p => p.tags.includes(tag));
}

// 검색 기능 (다중 카테고리 지원)
export function searchBlogPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return posts.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.categories.some(cat => cat.toLowerCase().includes(lowerQuery)) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
