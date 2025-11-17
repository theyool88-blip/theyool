'use client';

import Link from 'next/link';
import { Calendar, Eye } from 'lucide-react';
import type { BlogPreviewData, CasePreviewData } from '@/types/linkPreview';
import { categoryOverlayMap } from '@/lib/notion/types';

/**
 * Component props - extends the base types with type discriminator
 */
interface BlogPreviewProps extends BlogPreviewData {
  type: 'blog';
}

interface CasePreviewProps extends CasePreviewData {
  type: 'case';
}

type InternalLinkPreviewProps = BlogPreviewProps | CasePreviewProps;

/**
 * Formats a number with comma separators
 * @example 1234 => "1,234"
 */
function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

/**
 * Formats a date string to Korean format
 * @example "2024-01-15" => "2024. 01. 15."
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Blog Preview Card Component
 * Uses exact design from BlogClient.tsx
 */
function BlogPreviewCard({
  slug,
  title,
  excerpt,
  publishedAt,
  views,
  categories,
}: Omit<BlogPreviewProps, 'type'>) {
  // Ensure slug doesn't start with /blog/ to prevent duplication
  const cleanSlug = slug.replace(/^\/?(blog\/)?/, '');

  // Debug logging
  if (slug !== cleanSlug) {
    console.log('[BlogPreview] Cleaned slug:', { original: slug, cleaned: cleanSlug });
  }

  return (
    <span className="block my-8">
      <Link href={`/blog/${cleanSlug}`} className="block">
        <span className="group relative bg-gradient-to-br from-white to-amber-50/30 rounded-3xl p-8 md:p-10 hover:shadow-2xl transition-all duration-500 border-2 border-amber-100/50 overflow-hidden block">
        {/* 배경 장식 - 기존 블로그 카드와 동일 */}
        <span className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 block"></span>
        <span className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-100/20 to-orange-100/20 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700 block"></span>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <span className="relative mb-3 flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category, idx) => (
              <span key={idx} className="text-sm text-amber-700 font-semibold">
                {category}
              </span>
            ))}
          </span>
        )}

        {/* Title */}
        <span className="relative text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-amber-800 transition-colors duration-300 block">
          {title}
        </span>

        {/* Excerpt */}
        {excerpt && (
          <span className="relative text-base text-gray-700 mb-4 leading-relaxed line-clamp-2 block">
            {excerpt}
          </span>
        )}

        {/* Meta */}
        <span className="relative flex items-center gap-4 text-sm text-gray-500">
          {publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(publishedAt)}
            </span>
          )}
          {views !== undefined && (
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {formatNumber(views)}
            </span>
          )}
        </span>

        {/* Screen reader only text */}
        <span className="sr-only">
          칼럼 상세 페이지로 이동: {title}
        </span>
        </span>
      </Link>
    </span>
  );
}

/**
 * Case Preview Card Component
 * Uses exact design from CasesClient.tsx
 */
function CasePreviewCard({
  slug,
  title,
  summary,
  result,
  categories,
  coverImage,
}: Omit<CasePreviewProps, 'type'>) {
  // Ensure slug doesn't start with /cases/ to prevent duplication
  const cleanSlug = slug.replace(/^\/?(cases\/)?/, '');

  // Debug logging
  if (slug !== cleanSlug) {
    console.log('[CasePreview] Cleaned slug:', { original: slug, cleaned: cleanSlug });
  }

  // 첫 번째 카테고리 기준으로 오버레이 색상 결정 (기존 로직과 동일)
  const overlayColor = categories && categories.length > 0
    ? categoryOverlayMap[categories[0]] || 'from-white/80 via-white/75 to-white/70'
    : 'from-white/80 via-white/75 to-white/70';

  return (
    <span className="block my-8">
      <Link href={`/cases/${cleanSlug}`} className="block">
        <span className="group relative rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer min-h-[280px] md:min-h-[350px] block">
        {/* 배경 이미지 */}
        {coverImage && (
          <span className="absolute inset-0 block">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover object-center md:object-right"
            />
          </span>
        )}

        {/* 파스텔 오버레이 - 기존 케이스 카드와 동일 */}
        <span className={`absolute inset-0 bg-gradient-to-br ${overlayColor} block`} />

        {/* 추가 흰색 오버레이 (가독성) */}
        <span className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/15 to-white/10 block" />

        {/* 콘텐츠 */}
        <span className="relative h-full flex flex-col justify-between p-8 md:p-10">
          {/* 상단: 카테고리 배지 */}
          {categories && categories.length > 0 && (
            <span className="flex flex-wrap gap-2">
              {categories.map((name, idx) => (
                <span
                  key={idx}
                  className="inline-block px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800"
                >
                  {name}
                </span>
              ))}
            </span>
          )}

          {/* 하단: 제목 + 결과 */}
          <span className="block">
            <span className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:translate-x-1 transition-transform duration-300 block">
              {title}
            </span>

            {/* 결과 뱃지 */}
            {result && (
              <span className="inline-flex items-center px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50">
                <span className="text-sm md:text-base font-bold text-gray-900">
                  {result}
                </span>
              </span>
            )}
          </span>
        </span>

        {/* Screen reader only text */}
        <span className="sr-only">
          성공사례 상세 페이지로 이동: {title}
        </span>
        </span>
      </Link>
    </span>
  );
}

/**
 * Main Internal Link Preview Component
 * Routes to appropriate preview card based on content type
 */
export function InternalLinkPreview(props: InternalLinkPreviewProps) {
  if (props.type === 'blog') {
    return <BlogPreviewCard {...props} />;
  }
  return <CasePreviewCard {...props} />;
}
