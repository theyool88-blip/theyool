import { notion, DATABASE_ID } from './client';
import { NotionToMarkdown } from 'notion-to-md';
import { Case, CaseProperties, categoryMap, bgColorMap, categoryImageMap, categoryOverlayMap } from './types';

const n2m = new NotionToMarkdown({ notionClient: notion });

// Notion 속성을 Case 객체로 변환
function parseCase(page: any): Case {
  const properties = page.properties as CaseProperties;

  const title = properties.제목?.title?.[0]?.plain_text || '';
  const slug = properties.slug?.rich_text?.[0]?.plain_text || '';
  const categoryNames = properties.카테고리?.multi_select?.map((cat: any) => cat.name) || [];
  const categories = categoryNames.map((name: string) => categoryMap[name] || 'alimony');
  const result = properties.결과?.rich_text?.[0]?.plain_text || '';
  const summary = properties.요약?.rich_text?.[0]?.plain_text || '';
  const bgColorKey = properties.배경색?.select?.name || 'pink';
  const published = properties.공개?.checkbox || false;
  const date = properties.작성일?.date?.start || new Date().toISOString();

  // 커버 이미지 처리
  let coverImage: string | undefined;

  // 1. 우선순위 1: 노션에 파일이 업로드되어 있으면 그 파일 사용
  const uploadedFiles = properties.커버이미지?.files || [];
  if (uploadedFiles.length > 0) {
    const file = uploadedFiles[0];
    // Notion 내부 파일 또는 외부 링크
    coverImage = file.file?.url || file.external?.url;
  }

  // 2. 우선순위 2: 파일이 없으면 첫 번째 카테고리 기준으로 홈페이지 배경 이미지 사용
  if (!coverImage && categoryNames.length > 0) {
    coverImage = categoryImageMap[categoryNames[0]] || categoryImageMap[categories[0]];
  }

  return {
    id: page.id,
    slug,
    title,
    categories, // 영문 카테고리 배열
    categoryNames, // 한글 카테고리 배열
    result,
    summary,
    bgColor: bgColorMap[bgColorKey] || bgColorMap['pink'],
    coverImage,
    published,
    date,
  };
}

// 모든 공개된 케이스 목록 가져오기
export async function getCases(): Promise<Case[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
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

    return response.results.map(parseCase);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return [];
  }
}

// 특정 slug의 케이스 가져오기
export async function getCaseBySlug(slug: string): Promise<Case | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
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
    const caseData = parseCase(page);

    // 페이지 본문 가져오기
    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString = n2m.toMarkdownString(mdblocks);
    caseData.content = mdString.parent;

    return caseData;
  } catch (error) {
    console.error('Error fetching case by slug:', error);
    return null;
  }
}

// 모든 케이스의 slug 목록 가져오기 (정적 경로 생성용)
export async function getAllCaseSlugs(): Promise<string[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
    });

    return response.results.map((page: any) => {
      const properties = page.properties as CaseProperties;
      return properties.slug?.rich_text?.[0]?.plain_text || '';
    }).filter(Boolean);
  } catch (error) {
    console.error('Error fetching case slugs:', error);
    return [];
  }
}

// 카테고리별 케이스 필터링 (다중 카테고리 지원)
export function filterCasesByCategory(cases: Case[], category: string): Case[] {
  if (category === '전체') return cases;
  return cases.filter(c => c.categoryNames.includes(category));
}

// 검색 기능
export function searchCases(cases: Case[], query: string): Case[] {
  const lowerQuery = query.toLowerCase();
  return cases.filter(c =>
    c.title.toLowerCase().includes(lowerQuery) ||
    c.result.toLowerCase().includes(lowerQuery) ||
    c.categoryNames.some(name => name.toLowerCase().includes(lowerQuery))
  );
}
