import { createClient } from '@supabase/supabase-js';
import { categoryMap, categoryImageMap, categoryOverlayMap, bgColorMap } from '@/lib/notion/types';
import type { CaseListItem, CaseDetail } from '@/types/case';
import { splitMarkdownMetadata } from '@/lib/utils/markdown';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
);

export interface Case {
  id: string;
  notion_id: string;
  slug?: string | null;
  title: string;
  badge: string | null;
  categories?: string[];
  category?: string | null;
  background: string | null;
  strategy: string | null;
  result: string | null;
  icon: string | null;
  image_url?: string | null;
  published: boolean;
  views: number;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface CaseInput {
  title: string;
  slug?: string;
  badge?: string | null;
  categories?: string[];
  background?: string | null;
  strategy?: string | null;
  result?: string | null;
  icon?: string | null;
  image_url?: string | null;
  published?: boolean;
  sort_order?: number | null;
}

// 모든 Cases 가져오기
export async function getCases(): Promise<Case[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Cases 조회 실패:', error);
    return [];
  }

  return data || [];
}

// 단일 Case 가져오기
export async function getCaseById(id: string): Promise<Case | null> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Case 조회 실패:', error);
    return null;
  }

  return data;
}

// Case 생성
export async function createCase(input: CaseInput): Promise<Case | null> {
  console.log('[createCase] Input:', JSON.stringify(input, null, 2));

  // Generate slug from title if not provided
  const slug = input.slug || null;

  // Prepare insert data (no 'category' or 'image_url' fields - they don't exist in the database)
  const insertData = {
    notion_id: `manual-${Date.now()}`, // 수동 생성 표시
    title: input.title,
    slug: slug,
    badge: input.badge || null,
    categories: input.categories || [],
    background: input.background || null,
    strategy: input.strategy || null,
    result: input.result || null,
    icon: input.icon || null,
    published: input.published ?? true,
    views: 0,
    sort_order: input.sort_order || null,
  };

  console.log('[createCase] Insert data:', JSON.stringify(insertData, null, 2));

  const { data, error} = await supabase
    .from('cases')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('[createCase] Supabase error:', error);
    console.error('[createCase] Error details:', JSON.stringify(error, null, 2));
    return null;
  }

  console.log('[createCase] Success! Created case:', data?.id);
  return data;
}

// Case 수정
export async function updateCase(id: string, input: Partial<CaseInput>): Promise<Case | null> {
  const { data, error } = await supabase
    .from('cases')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Case 수정 실패:', error);
    return null;
  }

  return data;
}

// Case 삭제
export async function deleteCase(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('cases')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Case 삭제 실패:', error);
    return false;
  }

  return true;
}

// 조회수 증가
export async function incrementCaseViews(slug: string): Promise<void> {
  await supabase.rpc('increment_case_views', { case_slug: slug });
}

const DEFAULT_CATEGORY = '이혼';
const DEFAULT_GRADIENT = 'from-pink-100 via-purple-50 to-blue-50';
const UUID_REGEX = /^[0-9a-fA-F-]{36}$/;

function isUuid(value: string) {
  return UUID_REGEX.test(value);
}

function toStaticSlug(row: Case): string {
  return row.slug || row.notion_id || row.id;
}

function normalizeCategories(row: Case) {
  const raw = Array.isArray(row.categories)
    ? row.categories
    : row.category
    ? [row.category]
    : [];
  const categoryNames = raw.length ? raw : [DEFAULT_CATEGORY];
  const categories = categoryNames.map((name) => categoryMap[name] || 'alimony');
  return { categories, categoryNames };
}

function truncate(text?: string | null, limit = 160) {
  if (!text) return undefined;
  const value = text.replace(/\s+/g, ' ').trim();
  if (!value) return undefined;
  return value.length > limit ? `${value.slice(0, limit).trim()}…` : value;
}

function buildContent(row: Case) {
  const { content } = splitMarkdownMetadata(row.background || '');
  if (content && content.trim()) {
    return content.trim();
  }

  const sections: string[] = [];
  if (row.background) {
    sections.push(`## 사건 배경\n\n${row.background.trim()}`);
  }
  if (row.strategy) {
    sections.push(`## 대응 전략\n\n${row.strategy.trim()}`);
  }
  if (row.result) {
    sections.push(`## 결과\n\n${row.result.trim()}`);
  }
  if (!sections.length) {
    sections.push(row.title);
  }
  return sections.join('\n\n');
}

function toCaseListItem(row: Case): CaseListItem {
  const slug = toStaticSlug(row);
  const { categories, categoryNames } = normalizeCategories(row);
  const { backgroundImage, content } = splitMarkdownMetadata(row.background || '');
  const primaryCategory = categoryNames[0] || categories[0];
  const bgColor =
    bgColorMap[primaryCategory] ||
    bgColorMap[categories[0]] ||
    DEFAULT_GRADIENT;
  const coverImage =
    backgroundImage ||
    row.image_url ||
    categoryImageMap[primaryCategory] ||
    categoryImageMap[categories[0]];

  return {
    id: row.id,
    slug,
    title: row.title,
    categories,
    categoryNames,
    result: row.result || '',
    summary: truncate(row.strategy) || truncate(row.result) || truncate(content),
    bgColor,
    coverImage,
    backgroundImage,
    date: row.created_at,
  };
}

function toCaseDetail(row: Case): CaseDetail {
  const listItem = toCaseListItem(row);
  return {
    ...listItem,
    content: buildContent(row),
  };
}

export async function getPublicCases(): Promise<CaseListItem[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Public cases 조회 실패:', error);
    return [];
  }

  return (data as Case[] | null)?.map(toCaseListItem) ?? [];
}

export async function getPublicCaseSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('id, notion_id')
    .eq('published', true);

  if (error) {
    console.error('Case slug 조회 실패:', error);
    return [];
  }

  return (data || []).map((row: any) => row.notion_id || row.id);
}

export async function getPublicCaseBySlug(slug: string): Promise<CaseDetail | null> {
  const normalizedSlug = decodeURIComponent(slug);

  const query = supabase.from('cases').select('*').eq('published', true);

  if (isUuid(normalizedSlug)) {
    query.eq('id', normalizedSlug);
  } else {
    query.or(`slug.eq.${normalizedSlug},notion_id.eq.${normalizedSlug}`);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error('Case detail 조회 실패:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  return toCaseDetail(data as Case);
}

/**
 * 카테고리별 성공사례 가져오기
 * @param categoryName - 카테고리 이름 (예: '위자료', '재산분할', '양육권')
 * @param limit - 가져올 사례 개수 (기본값: 10)
 * @returns 해당 카테고리의 사례 배열
 */
export async function getCasesByCategory(
  categoryName: string,
  limit: number = 10
): Promise<CaseListItem[]> {
  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('published', true)
    .contains('categories', [categoryName])
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Category cases 조회 실패:', error);
    return [];
  }

  return (data as Case[] | null)?.map(toCaseListItem) ?? [];
}

/**
 * 유사한 성공사례 가져오기 (카테고리 기반 추천)
 * @param currentSlug - 현재 케이스의 slug (또는 UUID나 notion_id)
 * @param categories - 현재 케이스의 카테고리 배열
 * @param limit - 가져올 사례 개수 (기본값: 3)
 * @returns 추천 사례 배열
 */
export async function getSimilarCases(
  currentSlug: string,
  categories: string[],
  limit: number = 3
): Promise<CaseListItem[]> {
  const normalizedSlug = decodeURIComponent(currentSlug);

  // 현재 케이스 ID 가져오기
  const query = supabase
    .from('cases')
    .select('id')
    .eq('published', true);

  if (isUuid(normalizedSlug)) {
    query.eq('id', normalizedSlug);
  } else {
    query.or(`slug.eq.${normalizedSlug},notion_id.eq.${normalizedSlug}`);
  }

  const { data: current } = await query.maybeSingle();

  if (!current) {
    return [];
  }

  const currentId = current.id;

  // 1. 같은 카테고리를 가진 사례들 가져오기
  let similarCases: Case[] = [];

  if (categories && categories.length > 0) {
    // 카테고리 중 하나라도 겹치는 사례 찾기
    const { data: sameCategoryData } = await supabase
      .from('cases')
      .select('*')
      .eq('published', true)
      .neq('id', currentId)
      .overlaps('categories', categories)
      .order('created_at', { ascending: false })
      .limit(limit);

    similarCases = (sameCategoryData as Case[]) || [];
  }

  // 2. 개수가 부족하면 다른 사례로 채우기
  if (similarCases.length < limit) {
    const remaining = limit - similarCases.length;
    const { data: otherData } = await supabase
      .from('cases')
      .select('*')
      .eq('published', true)
      .neq('id', currentId)
      .order('created_at', { ascending: false })
      .limit(remaining);

    const otherCases = (otherData as Case[]) || [];

    // 중복 제거하며 추가
    const existingIds = new Set(similarCases.map(c => c.id));
    const uniqueOthers = otherCases.filter(c => !existingIds.has(c.id));

    similarCases = [...similarCases, ...uniqueOthers];
  }

  return similarCases.map(toCaseListItem);
}
