import { getPublicCaseBySlug, getPublicCaseSlugs } from '@/lib/supabase/cases';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { extractHeadings, plainText, slugify } from '@/lib/utils/markdown';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://theyool.com';

// 항상 최신 상태를 표시하기 위해 revalidate를 0으로 설정
export const revalidate = 0;

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs = await getPublicCaseSlugs();
  return slugs.map((slug) => ({ slug }));
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

          {/* 하단 CTA */}
          <div className="mt-20 p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border-2 border-gray-200 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              당신의 사건도 성공사례로 만들겠습니다
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              30분 무료 상담으로 당신의 사건을 분석해드립니다
            </p>
            <a
              href="tel:1661-7633"
              className="inline-block bg-gray-900 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              📞 지금 상담하기
            </a>
          </div>

          {/* 목록으로 돌아가기 */}
          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              목록으로 돌아가기
            </Link>
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
