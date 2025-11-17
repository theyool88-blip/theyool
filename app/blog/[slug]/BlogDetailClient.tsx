'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import Script from 'next/script';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '@/lib/notion/blog';
import { splitMarkdownMetadata, extractHeadings, plainText, slugify } from '@/lib/utils/markdown';
import { parseInternalLink } from '@/lib/utils/contentLinks';
import type { BlogPreviewData, CasePreviewData } from '@/types/linkPreview';
import { InternalLinkPreview } from '@/components/features/ContentLinkPreview';

interface BlogDetailClientProps {
  post: BlogPost;
  canonicalUrl: string;
  blogPreviews: Map<string, BlogPreviewData>;
  casePreviews: Map<string, CasePreviewData>;
  similarPosts: BlogPost[];
}

export default function BlogDetailClient({
  post,
  canonicalUrl,
  blogPreviews,
  casePreviews,
  similarPosts,
}: BlogDetailClientProps) {
  const { content, backgroundImage } = splitMarkdownMetadata(post.content || '');
  const headings = extractHeadings(content);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.title,
    mainEntityOfPage: canonicalUrl,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: '법무법인 더율',
    },
  };
  return (
    <PageLayout>
      {/* Hero Section - 따뜻한 헤더 */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50/30 to-white overflow-hidden">
        {backgroundImage && (
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="배경" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/70 to-white/80" />
          </div>
        )}
        {/* Warm Pattern */}
        <div className="absolute inset-0 w-full h-full opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="detailPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="#f59e0b" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#detailPattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[800px] px-6 md:px-12 mx-auto">
          <ScrollReveal>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
              <Link href="/blog" className="hover:text-amber-700 transition-colors">
                변호사 칼럼
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-amber-700 font-medium">
                {post.categories.length > 0 ? post.categories[0] : '칼럼'}
              </span>
            </div>

            {/* Category Badges (다중 카테고리) */}
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category, idx) => (
                <span key={idx} className="inline-block px-4 py-1.5 bg-amber-100/80 backdrop-blur-sm text-amber-800 rounded-full text-sm font-semibold">
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.date).toLocaleDateString('ko-KR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>조회 {post.views.toLocaleString()}</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/60 backdrop-blur-sm text-amber-800 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-12 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1000px] mx-auto md:grid md:grid-cols-[260px,1fr] gap-8">
          {headings.length > 1 && (
            <aside className="toc-block hidden md:block rounded-2xl border border-amber-100 bg-amber-50/70 p-6 sticky top-32 h-fit">
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-[0.2em] mb-3">Contents</p>
              <ol className="space-y-2 text-amber-900 text-sm">
                {headings.map((heading) => (
                  <li key={heading.id} className={`toc-item ${heading.level === 3 ? 'pl-4 text-amber-700/80 text-sm' : 'font-semibold'}`}>
                    <a href={`#${heading.id}`} className="hover:text-amber-500 transition-colors">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <div className="markdown-body prose prose-lg md:prose-xl max-w-none">
            <ScrollReveal>
              {headings.length > 1 && (
                <div className="md:hidden toc-block mb-10 rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                  <p className="text-sm font-semibold text-amber-700 uppercase tracking-[0.2em] mb-3">Contents</p>
                  <ol className="space-y-2 text-amber-900 text-sm">
                    {headings.map((heading) => (
                      <li key={heading.id} className={`toc-item ${heading.level === 3 ? 'pl-4 text-amber-700/80 text-sm' : 'font-semibold'}`}>
                        <a href={`#${heading.id}`} className="hover:text-amber-500 transition-colors">
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 id={slugify(plainText(children))} className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 id={slugify(plainText(children))} className="text-3xl font-bold mt-12 mb-6 text-gray-900">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 id={slugify(plainText(children))} className="text-2xl font-bold mt-8 mb-4 text-gray-900">{children}</h3>
                  ),
                  a: ({ href, children }) => {
                    const url = typeof href === 'string' ? href : '';

                    // Check if this is an internal link to blog or case
                    const internalLink = parseInternalLink(url);

                    if (internalLink) {
                      // Get preview data for the internal link
                      const previewData =
                        internalLink.type === 'blog'
                          ? blogPreviews.get(internalLink.slug)
                          : casePreviews.get(internalLink.slug);

                      // If preview data exists, render the rich preview component
                      if (previewData) {
                        return (
                          <InternalLinkPreview
                            {...previewData}
                            type={internalLink.type}
                          />
                        );
                      }

                      // Internal link without preview data - render as enhanced link
                      return (
                        <a
                          href={url}
                          className="text-amber-700 underline-offset-4 hover:underline font-semibold"
                        >
                          {children}
                        </a>
                      );
                    }

                    // External or legacy link
                    const isLegacy = url.includes('theyool-divorce.com');
                    return (
                      <a
                        href={url}
                        target={isLegacy ? '_blank' : undefined}
                        rel={isLegacy ? 'noopener noreferrer' : undefined}
                        className="text-amber-700 underline-offset-4 hover:underline"
                      >
                        {children}
                      </a>
                    );
                  },
                  img: ({ src, alt }) => (
                    <img
                      src={typeof src === 'string' ? src : ''}
                      alt={alt || post.title}
                      className="rounded-2xl w-full h-auto shadow-xl my-8"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {content || ''}
              </ReactMarkdown>
            </ScrollReveal>
          </div>
          <Script id="blog-jsonld" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify(jsonLd)}
          </Script>

          {/* 공유하기 버튼 */}
          <ScrollReveal delay={200}>
            <div className="mt-16 text-center">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('링크가 복사되었습니다.');
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-semibold rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                공유하기
              </button>
            </div>
          </ScrollReveal>

          {/* 유사한 칼럼 추천 */}
          {similarPosts.length > 0 && (
            <ScrollReveal delay={300}>
              <div className="mt-16 pt-12 border-t border-amber-100">
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    유사한 칼럼
                  </h2>
                  <p className="text-gray-600">
                    더율 변호사가 작성한 비슷한 주제의 칼럼을 확인해보세요
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {similarPosts.map((similarPost) => (
                    <Link
                      key={similarPost.id}
                      href={`/blog/${similarPost.slug}`}
                      className="group"
                    >
                      <div className="h-full p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30">
                        {/* 카테고리 뱃지 */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {similarPost.categories?.slice(0, 2).map((cat, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

                        {/* 제목 */}
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-700 transition-colors line-clamp-2 mb-3">
                          {similarPost.title}
                        </h3>

                        {/* 요약 */}
                        {similarPost.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                            {similarPost.excerpt}
                          </p>
                        )}

                        {/* 더보기 링크 */}
                        <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold">
                          자세히 보기
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* 칼럼 전체보기 */}
          <ScrollReveal delay={350}>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-gray-200 text-gray-900 hover:border-amber-300 hover:shadow-lg hover:scale-105"
              >
                변호사 칼럼 전체보기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-amber-50 via-orange-50/40 to-pink-50/30 overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25%" cy="40%" r="200" fill="#fbbf24" opacity="0.2" />
            <circle cx="75%" cy="60%" r="250" fill="#fb923c" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[900px] px-6 md:px-12 mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              더 궁금한 점이 있으신가요?
            </h2>
            <p className="text-lg md:text-xl mb-12 text-gray-700">
              전문 변호사와 직접 상담하세요
            </p>
            <a
              href="tel:1661-7633"
              className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              📞 무료 상담 신청
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
