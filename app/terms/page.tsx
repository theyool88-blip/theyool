'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import { ChevronDown, ChevronUp, ArrowUp } from 'lucide-react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [tocOpen, setTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const sections = [
    { id: 'section-1', title: '제1조 (목적 및 정의)' },
    { id: 'section-2', title: '제2조 (약관의 효력 및 변경)' },
    { id: 'section-3', title: '제3조 (서비스의 종류 및 이용)' },
    { id: 'section-4', title: '제4조 (상담 및 예약)' },
    { id: 'section-5', title: '제5조 (수임료 및 비용)' },
    { id: 'section-6', title: '제6조 (수임 계약의 해지 및 환불)' },
    { id: 'section-7', title: '제7조 (이용자의 의무)' },
    { id: 'section-8', title: '제8조 (법인의 의무)' },
    { id: 'section-9', title: '제9조 (개인정보 보호)' },
    { id: 'section-10', title: '제10조 (지적재산권)' },
    { id: 'section-11', title: '제11조 (면책사항)' },
    { id: 'section-12', title: '제12조 (손해배상)' },
    { id: 'section-13', title: '제13조 (분쟁 해결)' },
    { id: 'section-14', title: '제14조 (기타)' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling 300px
      setShowBackToTop(window.scrollY > 300);

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setTocOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <PageLayout>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '이용약관',
            description: '법무법인 더율의 서비스 이용약관을 확인하세요. 상담 및 수임, 서비스 이용에 관한 약관을 안내합니다.',
            url: 'https://theyool.com/terms',
            inLanguage: 'ko-KR',
            isPartOf: {
              '@type': 'WebSite',
              name: '법무법인 더율',
              url: 'https://theyool.com',
            },
            publisher: {
              '@type': 'LegalService',
              '@id': 'https://theyool.com/#organization',
              name: '법무법인 더율',
              description: '이혼 전문 법률 서비스',
              url: 'https://theyool.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://theyool.com/logo.png',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: '평택시',
                addressRegion: '경기도',
                streetAddress: '평택로 51번길 35, 4층',
                addressCountry: 'KR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+82-1661-7633',
                contactType: 'customer service',
                areaServed: 'KR',
                availableLanguage: ['ko'],
              },
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: '홈',
                  item: 'https://theyool.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: '이용약관',
                  item: 'https://theyool.com/terms',
                },
              ],
            },
            about: {
              '@type': 'Thing',
              name: '법률 서비스 이용약관',
              description: '법무법인 더율의 법률 서비스 이용 조건 및 절차에 관한 약관',
            },
            mainEntity: {
              '@type': 'LegalService',
              name: '법무법인 더율',
              termsOfService: 'https://theyool.com/terms',
              areaServed: {
                '@type': 'Country',
                name: 'South Korea',
              },
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <header className="text-center mb-16">
            <p className="text-xs md:text-sm text-gray-600 mb-4 tracking-[0.2em] uppercase">
              Terms of Service
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">
              이용약관
            </h1>
            <p className="text-gray-600 text-sm">
              시행일자: 2025. 1. 1.
            </p>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 relative">
            {/* Desktop Sticky ToC - Left Sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <nav
                className="sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
                aria-label="Table of Contents"
              >
                <h2 className="text-lg font-bold text-gray-900 mb-4">목차</h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left text-sm w-full px-3 py-2 rounded transition-colors ${
                          activeSection === section.id
                            ? 'bg-amber-50 text-amber-900 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        aria-current={activeSection === section.id ? 'true' : undefined}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Mobile Collapsible ToC */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={tocOpen}
                aria-controls="mobile-toc"
              >
                <span className="font-semibold text-gray-900">목차</span>
                {tocOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {tocOpen && (
                <nav
                  id="mobile-toc"
                  className="mt-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                  aria-label="Table of Contents"
                >
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`text-left text-sm w-full px-3 py-2 rounded transition-colors ${
                            activeSection === section.id
                              ? 'bg-amber-50 text-amber-900 font-semibold'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Main Content */}
            <main className="flex-1 bg-white border border-gray-200 rounded-lg p-8 md:p-12 shadow-sm">
              <article className="prose prose-lg max-w-none">
                {/* 전문 */}
                <p className="text-gray-700 leading-relaxed mb-8">
                  법무법인 더율(이하 "법인")의 웹사이트 및 법률 서비스를 이용해 주셔서 감사합니다. 본 약관은 의뢰인 또는 이용자(이하 "이용자")가 법인이 제공하는 서비스를 이용함에 있어 법인과 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>

                {/* 제1조 */}
                <section id="section-1" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제1조 (목적 및 정의)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 본 약관은 법무법인 더율이 운영하는 웹사이트(www.theyool.com)와 제공하는 법률 서비스의 이용조건 및 절차, 기타 필요한 사항을 규정합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    </p>
                    <div className="pl-6 space-y-2">
                      <p className="text-gray-700">1. "서비스"란 법인이 제공하는 모든 법률 상담, 수임, 정보 제공 등을 의미합니다.</p>
                      <p className="text-gray-700">2. "이용자"란 본 약관에 따라 법인이 제공하는 서비스를 받는 자를 의미합니다.</p>
                      <p className="text-gray-700">3. "수임"이란 이용자와 법인 간의 법률 사무 위임 계약을 의미합니다.</p>
                    </div>
                  </div>
                </section>

                {/* 제2조 */}
                <section id="section-2" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제2조 (약관의 효력 및 변경)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 법인은 필요한 경우 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 약관이 개정될 경우, 법인은 개정 약관의 적용일자 및 개정 내용을 적용일자 7일 전부터 웹사이트에 공지합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 개정 약관에 동의하지 않는 경우, 이용자는 서비스 이용을 중단할 수 있습니다.
                    </p>
                  </div>
                </section>

                {/* 제3조 */}
                <section id="section-3" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제3조 (서비스의 종류 및 이용)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인이 제공하는 서비스는 다음과 같습니다.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                      <p className="text-gray-700">1. 이혼 관련 법률 상담 서비스</p>
                      <p className="text-gray-700">2. 이혼 소송 대리 서비스</p>
                      <p className="text-gray-700">3. 위자료, 재산분할, 양육권, 양육비 관련 법률 서비스</p>
                      <p className="text-gray-700">4. 가사 관련 기타 법률 서비스</p>
                      <p className="text-gray-700">5. 웹사이트를 통한 법률 정보 제공 서비스</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      ② 서비스 이용 시간은 법인의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. 다만, 실제 상담 및 수임은 업무시간(평일 09:00-18:00) 내에 진행됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인은 서비스 개선을 위해 정기점검 또는 긴급 점검을 실시할 수 있으며, 이 경우 사전에 공지합니다.
                    </p>
                  </div>
                </section>

                {/* 제4조 */}
                <section id="section-4" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제4조 (상담 및 예약)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 이용자는 웹사이트, 전화(1661-7633), 방문 등을 통해 상담을 신청할 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 초기 상담은 무료로 제공되며, 구체적인 법률 검토가 필요한 경우 별도의 상담료가 부과될 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 예약된 상담 일정을 변경하거나 취소하고자 하는 경우, 최소 1일 전에 통보해 주시기 바랍니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 상담 내용은 변호사의 비밀유지 의무에 따라 엄격히 보호됩니다.
                    </p>
                  </div>
                </section>

                {/* 제5조 */}
                <section id="section-5" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제5조 (수임료 및 비용)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 수임료는 사건의 성격, 난이도, 예상 소요 시간 등을 고려하여 상담 시 결정되며, 수임 계약서에 명시됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 수임료는 착수금과 성공보수로 구분될 수 있으며, 구체적인 내용은 수임 계약서에 따릅니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 인지대, 송달료 등 소송 비용은 수임료와 별도로 이용자가 부담합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 수임료 납부 방법 및 시기는 수임 계약 시 협의하여 정합니다.
                    </p>
                    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-4">
                      <p className="text-amber-900 font-semibold mb-2">수임료 관련 안내</p>
                      <p className="text-amber-800 text-sm">
                        모든 수임료는 대한변호사협회의 변호사보수 규정을 준수하여 책정되며, 투명하고 합리적인 기준에 따라 산정됩니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 제6조 */}
                <section id="section-6" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제6조 (수임 계약의 해지 및 환불)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 이용자는 수임 계약 후라도 사건 진행 상황에 따라 계약을 해지할 수 있습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 수임 계약 해지 시 환불 기준은 다음과 같습니다.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-2">
                      <p className="text-gray-700">1. 업무 착수 전: 수임료 전액 환불</p>
                      <p className="text-gray-700">2. 업무 착수 후: 진행 단계를 고려한 비율에 따라 환불</p>
                      <p className="text-gray-700">3. 소송 제기 후: 착수금은 환불 불가, 성공보수는 조정 가능</p>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인의 귀책사유로 인한 계약 해지 시에는 수임료를 전액 환불하며, 이용자가 입은 손해를 배상합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 구체적인 환불 절차와 기준은 수임 계약서에 명시된 내용을 우선으로 합니다.
                    </p>
                  </div>
                </section>

                {/* 제7조 */}
                <section id="section-7" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제7조 (이용자의 의무)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 이용자는 사건과 관련된 모든 사실을 정확하고 성실하게 알려야 합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 이용자는 법인이 요청하는 자료를 적시에 제공해야 합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 이용자는 다음 각 호의 행위를 하여서는 안 됩니다.
                    </p>
                    <div className="pl-6 space-y-2">
                      <p className="text-gray-700">1. 허위 사실 또는 허위 자료 제공</p>
                      <p className="text-gray-700">2. 타인의 개인정보 도용</p>
                      <p className="text-gray-700">3. 법인의 지적재산권 침해</p>
                      <p className="text-gray-700">4. 법인의 업무를 방해하는 행위</p>
                      <p className="text-gray-700">5. 기타 관련 법령에 위반되는 행위</p>
                    </div>
                  </div>
                </section>

                {/* 제8조 */}
                <section id="section-8" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제8조 (법인의 의무)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인은 변호사법 및 변호사 윤리규칙에 따라 성실하게 업무를 수행합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 법인은 이용자의 개인정보를 보호하고, 업무상 알게 된 비밀을 유지합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인은 이용자에게 사건 진행 상황을 적절히 보고하고 설명합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 법인은 이용자의 정당한 요구사항에 대해 신속하게 대응합니다.
                    </p>
                  </div>
                </section>

                {/* 제9조 */}
                <section id="section-9" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제9조 (개인정보 보호)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인은 이용자의 개인정보를 관련 법령에 따라 보호합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 개인정보의 수집, 이용, 제공, 관리 등에 관한 자세한 사항은 법인의 개인정보처리방침에 따릅니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인은 법령에 의한 경우를 제외하고는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                      <p className="text-blue-900 text-sm">
                        자세한 내용은 <a href="/privacy" className="text-blue-700 underline hover:text-blue-800">개인정보처리방침</a>을 참고하시기 바랍니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 제10조 */}
                <section id="section-10" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제10조 (지적재산권)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인이 작성한 모든 콘텐츠(텍스트, 이미지, 로고, 디자인 등)에 대한 지적재산권은 법인에 귀속됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 이용자는 법인의 사전 승낙 없이 웹사이트의 정보를 복제, 송신, 출판, 배포, 방송 등의 방법으로 이용하거나 제3자에게 이용하게 할 수 없습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 이용자가 제공한 자료에 대한 권리는 이용자에게 있으며, 법인은 업무 수행에 필요한 범위 내에서만 사용합니다.
                    </p>
                  </div>
                </section>

                {/* 제11조 */}
                <section id="section-11" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제11조 (면책사항)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인은 천재지변, 전쟁 등 불가항력적인 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 법인은 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 웹사이트에 게시된 법률 정보는 일반적인 정보 제공을 목적으로 하며, 구체적인 법률 자문으로 해석되어서는 안 됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ④ 법인은 이용자가 웹사이트를 통해 얻은 정보를 바탕으로 한 투자, 거래 등으로 인한 손해에 대해 책임지지 않습니다.
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
                      <p className="text-red-900 text-sm">
                        자세한 내용은 <a href="/disclaimer" className="text-red-700 underline hover:text-red-800">면책공고</a>를 참고하시기 바랍니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 제12조 */}
                <section id="section-12" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제12조 (손해배상)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인이 고의 또는 중대한 과실로 이용자에게 손해를 입힌 경우, 법인은 이용자가 입은 손해를 배상합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 이용자가 본 약관의 규정을 위반함으로 인하여 법인에 손해가 발생한 경우, 이용자는 법인에 발생한 손해를 배상해야 합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인의 손해배상 책임은 통상손해에 한하며, 특별한 사정으로 인한 손해는 법인이 그 사정을 알았거나 알 수 있었을 때에 한하여 배상책임이 있습니다.
                    </p>
                  </div>
                </section>

                {/* 제13조 */}
                <section id="section-13" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제13조 (분쟁 해결)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 법인과 이용자 간에 발생한 분쟁은 상호 협의하여 해결하는 것을 원칙으로 합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 협의가 이루어지지 않을 경우, 분쟁은 민사소송법상의 관할법원에서 해결합니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 본 약관에 명시되지 않은 사항과 본 약관의 해석에 관하여는 관련 법령 및 상관례에 따릅니다.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mt-4">
                      <p className="text-gray-900 font-semibold mb-2">관할법원</p>
                      <p className="text-gray-700 text-sm">
                        본 약관과 관련된 소송의 관할법원은 법인의 소재지를 관할하는 법원(수원지방법원 평택지원 또는 대전지방법원 천안지원)으로 합니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 제14조 */}
                <section id="section-14" className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    제14조 (기타)
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 본 약관은 대한민국 법률에 따라 규율되고 해석됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 본 약관의 일부 조항이 무효가 되더라도 다른 조항의 효력에는 영향을 미치지 않습니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 법인의 상호, 대표자, 주소, 연락처 등은 다음과 같습니다.
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mt-4">
                      <p className="text-lg font-bold text-gray-900 mb-3">법무법인 더율</p>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700"><strong>대표자:</strong> 육심원 외 1인</p>
                        <p className="text-gray-700"><strong>사업자번호:</strong> 354-85-01451(평택), 514-86-01593(천안)</p>
                        <p className="text-gray-700"><strong>광고 책임 변호사:</strong> 임은지</p>
                        <p className="text-gray-700"><strong>전화:</strong> 1661-7633</p>
                        <p className="text-gray-700"><strong>이메일:</strong> info@theyool.com</p>
                        <p className="text-gray-700"><strong>주소:</strong></p>
                        <p className="text-gray-700 pl-4">• 평택: 경기도 평택시 평택로 51번길 35, 4층</p>
                        <p className="text-gray-700 pl-4">• 천안: 충청남도 천안시 서북구 광장로 215, 7층</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 부칙 */}
                <section className="mb-10 scroll-mt-24">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                    부칙
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      ① 본 약관은 2025년 1월 1일부터 시행됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ② 2025년 1월 1일 이전에 가입한 기존 이용자에게도 본 약관이 적용됩니다.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      ③ 본 약관 시행 이전에 체결된 수임 계약은 해당 계약서의 내용에 따릅니다.
                    </p>
                  </div>
                </section>

                {/* 문의 안내 */}
                <div className="bg-amber-50 p-8 rounded-lg border border-amber-200 mt-12">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">약관 관련 문의</h3>
                  <p className="text-amber-800 mb-4">
                    본 약관에 대한 문의사항이 있으시면 아래 연락처로 문의하여 주시기 바랍니다.
                  </p>
                  <div className="space-y-2 text-amber-700">
                    <p><strong>전화:</strong> 1661-7633</p>
                    <p><strong>이메일:</strong> info@theyool.com</p>
                    <p><strong>업무시간:</strong> 평일 09:00 - 18:00</p>
                  </div>
                </div>
              </article>
            </main>
          </div>

          {/* CTA */}
          <footer className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              전문적인 법률 상담이 필요하신가요?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
              >
                상담 예약하기
              </a>
              <a
                href="/faq"
                className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-md border-2 border-gray-900 hover:bg-gray-50 transition-colors"
              >
                이혼큐레이션 보기
              </a>
            </div>
          </footer>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </PageLayout>
  );
}
