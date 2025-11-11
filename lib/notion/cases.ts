import { notion, DATABASE_ID } from './client';
import { NotionToMarkdown } from 'notion-to-md';
import { Case, CaseProperties, categoryMap, bgColorMap } from './types';

const n2m = new NotionToMarkdown({ notionClient: notion });

// Notion 속성을 Case 객체로 변환
function parseCase(page: any): Case {
  const properties = page.properties as CaseProperties;

  const title = properties.제목?.title?.[0]?.plain_text || '';
  const slug = properties.slug?.rich_text?.[0]?.plain_text || '';
  const category = properties.카테고리?.select?.name || '';
  const result = properties.결과?.rich_text?.[0]?.plain_text || '';
  const bgColorKey = properties.배경색?.select?.name || 'pink';
  const published = properties.공개?.checkbox || false;
  const date = properties.작성일?.date?.start || new Date().toISOString();

  return {
    id: page.id,
    slug,
    title,
    category: categoryMap[category] || 'alimony',
    categoryName: category,
    result,
    bgColor: bgColorMap[bgColorKey] || bgColorMap['pink'],
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

// 카테고리별 케이스 필터링
export function filterCasesByCategory(cases: Case[], category: string): Case[] {
  if (category === '전체') return cases;
  return cases.filter(c => c.categoryName === category);
}

// 검색 기능
export function searchCases(cases: Case[], query: string): Case[] {
  const lowerQuery = query.toLowerCase();
  return cases.filter(c =>
    c.title.toLowerCase().includes(lowerQuery) ||
    c.result.toLowerCase().includes(lowerQuery) ||
    c.categoryName.toLowerCase().includes(lowerQuery)
  );
}
