'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import type { FAQ } from '@/lib/supabase/faq';
import ScrollReveal from '@/components/ScrollReveal';

interface RelatedCase {
  id: string;
  slug?: string | null;
  title: string;
  category?: string | null;
  categories?: string[];
  description?: string | null;
  background?: string | null;
}

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage?: string;
  gradientFrom: string;
  gradientTo: string;
  features: {
    title: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  process?: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: FAQ[];
  relatedCases?: RelatedCase[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export default function ServicePageLayout({
  title,
  subtitle,
  description,
  heroImage,
  gradientFrom,
  gradientTo,
  features,
  process,
  faqs,
  relatedCases,
  ctaTitle = "전문가와 상담하세요",
  ctaDescription = "복잡한 법률 문제, 혼자 고민하지 마세요. 전문 변호사가 최적의 해결책을 찾아드립니다."
}: ServicePageLayoutProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // FAQ 카테고리 추출
  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // 필터링된 FAQ
  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const categoryLabels: Record<string, string> = {
    'all': '전체',
    'alimony': '위자료',
    'separation-expense': '별거 생활비',
    'property-division': '재산분할',
    'custody': '양육권',
    'child-support': '양육비',
    'visitation': '면접교섭',
    'paternity': '친자관계',
    'adultery': '불륜/상간'
  };

  return (
    <>
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <ScrollReveal>
            <div className="text-center text-white">
              <p className="text-lg md:text-xl mb-4 opacity-90">{subtitle}</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto opacity-95">
                {description}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  상담 예약하기
                </Link>
                <a
                  href="#faq-section"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  자주 묻는 질문 보기
                  <ChevronDown className="w-5 h-5" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="white"
              d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,90.7C672,96,768,96,864,85.3C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              서비스 특징
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  {feature.icon && (
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (optional) */}
      {process && process.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                진행 절차
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              {process.map((step, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section id="faq-section" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {title} 관련 궁금증을 해결해드립니다
            </p>
          </ScrollReveal>

          {/* Category Filter */}
          {categories.length > 2 && (
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {categoryLabels[category] || category}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.slice(0, 10).map((faq, index) => (
              <ScrollReveal key={faq.id} delay={index * 50}>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div
                        className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                      <Link
                        href={`/faq/${faq.slug}`}
                        className="inline-flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700 mt-3"
                      >
                        자세히 보기
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filteredFAQs.length > 10 && (
            <div className="text-center mt-8">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                더 많은 FAQ 보기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Cases Section */}
      {relatedCases && relatedCases.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                관련 성공사례
              </h2>
              <p className="text-center text-gray-600 mb-12">
                실제 사건 해결 사례를 확인하세요
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedCases.slice(0, 3).map((caseItem, index) => (
                <ScrollReveal key={caseItem.id} delay={index * 100}>
                  <Link
                    href={`/cases/${caseItem.slug}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className={`h-48 bg-gradient-to-br from-pink-500 to-pink-600 relative`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-white/90 text-xs font-medium rounded-full mb-2">
                          {caseItem.categories?.[0] || caseItem.category || '사례'}
                        </span>
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {caseItem.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {caseItem.description || caseItem.background?.slice(0, 100) || '자세한 내용은 클릭하여 확인하세요.'}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                모든 성공사례 보기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`py-20 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {ctaTitle}
            </h2>
            <p className="text-xl mb-8 opacity-95">
              {ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                상담 예약하기
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
              >
                <MessageCircle className="w-5 h-5" />
                문의하기
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <p className="text-sm opacity-90">무료 상담</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <p className="text-sm opacity-90">24시간 접수</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-90" />
                <p className="text-sm opacity-90">비밀 보장</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}