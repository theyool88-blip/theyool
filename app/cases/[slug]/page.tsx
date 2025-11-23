import { getPublicCaseBySlug, getPublicCaseSlugs, getSimilarCases } from '@/lib/supabase/cases';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { extractHeadings, plainText, slugify } from '@/lib/utils/markdown';
import { extractAllInternalLinks, groupLinksByType, parseInternalLink } from '@/lib/utils/contentLinks';
import { getAllLinkPreviews } from '@/lib/supabase/linkPreviews';
import type { Metadata } from 'next';
import type { BlogPreviewData, CasePreviewData } from '@/types/linkPreview';
import { InternalLinkPreview } from '@/components/features/ContentLinkPreview';
import ConsultationPromptCard from '@/components/features/ConsultationPromptCard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theyool.com';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

// 정적 경로 생성
export async function generateStaticParams() {
  try {
    const slugs = await getPublicCaseSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error('Failed to generate case static params:', error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseData = await getPublicCaseBySlug(slug);

  if (!caseData) {
    return {
      title: '성공사례 | 법무법인 더율',
    };
  }

  const canonicalUrl = `${SITE_URL}/cases/${caseData.slug || slug}`;
  const description = caseData.summary || caseData.result || '';

  return {
    title: `${caseData.title} | 성공사례 | 법무법인 더율`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: `${caseData.title} | 법무법인 더율`,
      description,
      type: 'article',
      images: caseData.backgroundImage ? [caseData.backgroundImage] : undefined,
    },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseData = await getPublicCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  // Extract internal links from content and fetch preview metadata
  const internalLinks = extractAllInternalLinks(caseData.content || '');
  const { blogSlugs, caseSlugs } = groupLinksByType(internalLinks);

  // Fetch all link previews and similar cases in parallel
  const [{ blogPreviews, casePreviews }, similarCases] = await Promise.all([
    getAllLinkPreviews(blogSlugs, caseSlugs),
    getSimilarCases(slug, caseData.categories, 3),
  ]);

  const headings = extractHeadings(caseData.content || '');
  const canonicalUrl = `${SITE_URL}/cases/${caseData.slug || slug}`;
  const description = caseData.summary || caseData.result || '';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseData.title,
    description,
    mainEntityOfPage: canonicalUrl,
    datePublished: caseData.date,
    author: {
      '@type': 'Organization',
      name: '법무법인 더율',
    },
    image: caseData.backgroundImage || caseData.coverImage,
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className={`relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br ${caseData.bgColor} overflow-hidden`}>
        {caseData.backgroundImage && (
          <div className="absolute inset-0">
            <img src={caseData.backgroundImage} alt="배경" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/40 to-black/20" />
          </div>
        )}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="detailDots" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1.5" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#detailDots)" />
            <circle cx="15%" cy="30%" r="200" fill="white" opacity="0.1" />
            <circle cx="85%" cy="70%" r="250" fill="white" opacity="0.08" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] px-6 md:px-12 mx-auto text-center">
          {/* 카테고리 뱃지 (다중 카테고리) */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {caseData.categoryNames.map((name, idx) => (
              <span key={idx} className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800">
                {name}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-gray-900 leading-tight">
            {caseData.title}
          </h1>

          {/* 결과 뱃지 */}
          <div className="inline-flex items-center px-8 py-4 bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-gray-200/50">
            <span className="text-lg md:text-xl font-bold text-gray-900">
              {caseData.result}
            </span>
          </div>
        </div>
      </section>

      {/* 본문 콘텐츠 */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1000px] mx-auto md:grid md:grid-cols-[260px,1fr] gap-8">
          {headings.length > 1 && (
            <aside className="toc-block mb-10 rounded-2xl border border-gray-200 bg-gray-50/80 p-6 md:sticky md:top-32 h-fit">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-[0.2em] mb-3">Contents</p>
              <ol className="space-y-2 text-gray-700 text-sm">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={`toc-item ${heading.level === 3 ? 'pl-4 text-gray-500 text-sm' : 'font-semibold text-gray-800'}`}
                  >
                    <a href={`#${heading.id}`} className="hover:text-pink-600 transition-colors">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}
          <div className="max-w-[800px] w-full">
          <article className="markdown-body prose prose-lg max-w-none">
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
                p: ({ children, node }) => {
                  // p 태그 안에 img만 있으면 p를 렌더링하지 않음 (validation 에러 방지)
                  const hasOnlyImage = node?.children?.length === 1 &&
                    node?.children[0]?.type === 'element' &&
                    node?.children[0]?.tagName === 'img';

                  if (hasOnlyImage) {
                    return <>{children}</>;
                  }

                  return <p className="text-lg leading-relaxed text-gray-700 mb-6">{children}</p>;
                },
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-3 mb-6 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-3 mb-6 text-gray-700">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="text-lg leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-pink-300 pl-6 py-2 my-8 bg-pink-50/50 italic text-gray-700">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">{children}</strong>
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
                        className="text-pink-600 underline-offset-4 hover:underline font-semibold"
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
                      className="text-pink-600 underline-offset-4 hover:underline"
                    >
                      {children}
                    </a>
                  );
                },
                img: ({ src, alt }) => {
                  const imageSrc = typeof src === 'string' ? src : '';
                  return (
                    <div className="my-8 flex justify-center">
                      <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 max-w-full">
                        <Image
                          src={imageSrc}
                          alt={alt || caseData.title}
                          width={1200}
                          height={800}
                          className="h-auto max-w-full"
                          unoptimized
                          loading="lazy"
                          quality={75}
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 600px"
                          style={{
                            maxHeight: '500px',
                            width: 'auto',
                            maxWidth: '100%'
                          }}
                        />
                      </div>
                    </div>
                  );
                },
              }}
            >
              {caseData.content || ''}
            </ReactMarkdown>
          </article>

          {/* 유사한 성공사례 추천 */}
          {similarCases.length > 0 && (
            <div className="mt-16 pt-12 border-t border-pink-100">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  유사한 성공사례
                </h2>
                <p className="text-gray-600">
                  더율이 해결한 비슷한 사건들을 확인해보세요
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {similarCases.map((similarCase) => (
                  <Link
                    key={similarCase.id}
                    href={`/cases/${similarCase.slug || similarCase.id}`}
                    className="group"
                  >
                    <div className="h-full p-6 rounded-2xl border-2 border-pink-100 hover:border-pink-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-pink-50/30">
                      {/* 카테고리 뱃지 */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {similarCase.categoryNames.slice(0, 2).map((cat, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* 제목 */}
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-700 transition-colors line-clamp-2 mb-3">
                        {similarCase.title}
                      </h3>

                      {/* 요약 또는 결과 */}
                      {(similarCase.summary || similarCase.result) && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {similarCase.summary || similarCase.result}
                        </p>
                      )}

                      {/* 더보기 링크 */}
                      <div className="flex items-center gap-2 text-pink-600 text-sm font-semibold">
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
          )}

          {/* 성공사례 전체보기 */}
          <div className="mt-8 text-center">
            <Link
              href="/cases"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 bg-gradient-to-r from-pink-50 to-blue-50 border-2 border-gray-200 text-gray-900 hover:border-pink-300 hover:shadow-lg hover:scale-105"
            >
              성공사례 전체보기
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 하단 CTA - Enhanced Consultation Prompt */}
          <div className="mt-12">
            <ConsultationPromptCard
              variant="success-story"
              testimonial={{
                text: "비슷한 상황이었는데, 더율 덕분에 원하는 결과를 얻었습니다. 혼자 고민하지 말고 전문가와 상담하세요.",
                author: "의뢰인 A씨"
              }}
            />
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
