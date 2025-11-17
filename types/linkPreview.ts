/**
 * Type definitions for internal link preview feature
 */

export interface BlogPreviewData {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  views?: number;
  categories?: string[];
}

export interface CasePreviewData {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  result?: string;
  categories?: string[];
  coverImage?: string;
}

export type LinkPreviewData = BlogPreviewData | CasePreviewData;

export interface InternalLinkPreviewProps {
  type: 'blog' | 'case';
  slug: string;
  title: string;
  excerpt?: string;
  summary?: string;
  categories?: string[];
  result?: string;
  publishedAt?: string;
  views?: number;
}

export interface InternalLink {
  type: 'blog' | 'case';
  slug: string;
  text: string;
  fullMatch: string;
}
