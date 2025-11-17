/**
 * Content Link Detection and Processing Utilities
 * Detects and extracts internal links from markdown content
 */

import { InternalLink } from '@/types/linkPreview';

/**
 * Regular expressions for detecting internal links in markdown
 * Format: [text](/blog/slug) or [text](/cases/slug)
 */
const BLOG_LINK_REGEX = /\[([^\]]+)\]\(\/blog\/([^)]+)\)/g;
const CASE_LINK_REGEX = /\[([^\]]+)\]\(\/cases\/([^)]+)\)/g;

/**
 * Extracts all internal blog links from markdown content
 * @param content - Markdown content string
 * @returns Array of internal blog links with metadata
 */
export function extractBlogLinks(content: string): InternalLink[] {
  const links: InternalLink[] = [];
  const matches = Array.from(content.matchAll(BLOG_LINK_REGEX));

  for (const match of matches) {
    links.push({
      type: 'blog',
      slug: match[2],
      text: match[1],
      fullMatch: match[0],
    });
  }

  return links;
}

/**
 * Extracts all internal case links from markdown content
 * @param content - Markdown content string
 * @returns Array of internal case links with metadata
 */
export function extractCaseLinks(content: string): InternalLink[] {
  const links: InternalLink[] = [];
  const matches = Array.from(content.matchAll(CASE_LINK_REGEX));

  for (const match of matches) {
    links.push({
      type: 'case',
      slug: match[2],
      text: match[1],
      fullMatch: match[0],
    });
  }

  return links;
}

/**
 * Extracts all internal links (both blog and case) from markdown content
 * @param content - Markdown content string
 * @returns Array of all internal links
 */
export function extractAllInternalLinks(content: string): InternalLink[] {
  const blogLinks = extractBlogLinks(content);
  const caseLinks = extractCaseLinks(content);

  return [...blogLinks, ...caseLinks];
}

/**
 * Groups internal links by type for efficient batch fetching
 * @param links - Array of internal links
 * @returns Object with blog slugs and case slugs arrays
 */
export function groupLinksByType(links: InternalLink[]): {
  blogSlugs: string[];
  caseSlugs: string[];
} {
  const blogSlugs = new Set<string>();
  const caseSlugs = new Set<string>();

  for (const link of links) {
    if (link.type === 'blog') {
      blogSlugs.add(link.slug);
    } else if (link.type === 'case') {
      caseSlugs.add(link.slug);
    }
  }

  return {
    blogSlugs: Array.from(blogSlugs),
    caseSlugs: Array.from(caseSlugs),
  };
}

/**
 * Checks if a URL is an internal link to blog or case
 * @param href - URL string
 * @returns Object with type and slug if internal, null otherwise
 */
export function parseInternalLink(href: string): { type: 'blog' | 'case'; slug: string } | null {
  // Remove leading/trailing whitespace and hash fragments
  const cleanHref = href.trim().split('#')[0];

  // Check for blog link
  const blogMatch = cleanHref.match(/^\/blog\/([^/?]+)/);
  if (blogMatch) {
    return { type: 'blog', slug: blogMatch[1] };
  }

  // Check for case link
  const caseMatch = cleanHref.match(/^\/cases\/([^/?]+)/);
  if (caseMatch) {
    return { type: 'case', slug: caseMatch[1] };
  }

  return null;
}
