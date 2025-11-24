'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageLayout from '@/components/layouts/PageLayout';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import PhonePrepModal from '@/components/features/PhonePrepModal';
import ConversionFunnel from '@/components/features/ConversionFunnel';

export default function ConsultationClient() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPhonePrepModalOpen, setIsPhonePrepModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState('상담');

  // Mock data - 추후 Supabase에서 동적 로딩
  const recentCases = [
    { category: '재산분할', result: '집값 70% 지켰어요', caseNumber: '2024나1234', slug: 'case-1' },
    { category: '양육권', result: '아이 둘 다 키우게 됐어요', caseNumber: '2024드5678', slug: 'case-2' },
    { category: '위자료', result: '1.5억 받았어요', caseNumber: '2024가합9012', slug: 'case-3' },
  ];

  const faqCategories = {
    상담: [
      { q: '정말 10분만 무료인가요?', a: '네, 처음 전화하시는 분께 10분 무료입니다.\n억지로 시간을 늘리거나 유료 전환을 강요하지 않아요.\n10분 안에 핵심 조언을 드리려 노력합니다.' },
      { q: '뭘 준비해야 하나요?', a: '특별히 준비하실 건 없어요.\n혼인증명서나 재산 서류가 있으면 더 정확한 상담이 가능하지만,\n없어도 충분히 도움드릴 수 있습니다. 편하게 전화주세요.' },
      { q: '신분을 밝히기 부담스러워요', a: '이해합니다. 전화상담은 익명으로도 가능해요.\n상황만 말씀해주시면 일반적인 법률 조언을 드릴 수 있습니다.\n신뢰가 생기면 그때 자세한 상담을 진행하셔도 됩니다.' },
      { q: '상담하면 꼭 의뢰해야 하나요?', a: '절대 아닙니다. 상담은 상담일 뿐이에요.\n오히려 여러 곳을 비교해보시길 권합니다.\n저희가 드린 조언만으로도 도움이 되면 그것으로 충분해요.' },
    ],
    비용: [
      { q: '상담 비용이 정확히 어떻게 되나요?', a: '전화: 첫 10분 무료, 연장 시 분당 5천원\n화상상담: 5만원 (30분, 수임 시 환불)\n방문상담: 5만원 (1시간, 수임 시 환불)\n\n부담되시면 무료 전화상담부터 시작하세요.' },
      { q: '변호사 비용이 부담돼요', a: '많이 고민되시죠. 착수금은 300만원부터 시작하지만\n사안에 따라 조정 가능합니다. 최대 6개월 분납도 가능해요.\n무엇보다 비용 대비 얻으실 수 있는 결과를 설명드려\n합리적인 판단을 하실 수 있게 돕겠습니다.' },
      { q: '성공보수는 어떻게 되나요?', a: '재산분할이나 위자료를 받는 경우에만 발생합니다.\n보통 받으신 금액의 10-20% 정도이지만,\n상담 시 정확한 비율과 상한액을 미리 정해드려요.\n예상치 못한 추가 비용은 없습니다.' },
    ],
    절차: [
      { q: '이혼까지 얼마나 걸리나요?', a: '협의이혼은 1-3개월, 조정이혼은 3-6개월,\n재판이혼은 6-12개월 정도 걸립니다.\n하지만 무작정 빨리 끝내는 것보다\n제대로 준비해서 좋은 결과를 얻는 게 중요해요.' },
      { q: '상담 내용이 새어나갈까 걱정돼요', a: '절대 그런 일은 없습니다.\n변호사는 법적으로 비밀유지 의무가 있고,\n이를 위반하면 형사처벌을 받습니다.\n직원들도 모두 비밀유지 서약을 했습니다.\n안심하고 말씀하세요.' },
      { q: '다른 변호사도 만나보고 싶어요', a: '당연히 그러셔야 합니다.\n이혼은 인생의 중요한 결정이니까요.\n저희 상담 내용을 메모해가시면\n다른 곳과 비교하기 좋을 거예요.\n최선의 선택하시길 응원합니다.' },
    ],
  };

  const testimonials = [
    { quote: '처음엔 막막했는데, 쉽게 설명해주셔서 안심됐어요', author: '40대, 재산분할' },
    { quote: '다른 곳은 어렵다고 했는데 여기서 양육권 받았어요', author: '30대, 양육권' },
    { quote: '비용도 투명하고 진행도 세심했어요', author: '50대, 위자료' },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Section 1: Hero - Sage Green Style */}
        <section id="hero" className="relative min-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-b from-sage-50/30 via-white to-white pt-24 pb-16 md:pt-32 md:pb-20 scroll-mt-20">
          {/* Geometric Background Pattern - Sage Green */}
          <div className="absolute inset-0 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#E8F5F2', stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: '#D1EBE5', stopOpacity: 0.4 }} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#F0F9F7', stopOpacity: 0.4 }} />
                  <stop offset="100%" style={{ stopColor: '#E8F5F2', stopOpacity: 0.3 }} />
                </linearGradient>
                <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#6DB5A4" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
              <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
              <circle cx="80%" cy="70%" r="250" fill="url(#grad2)" />
              <circle cx="70%" cy="25%" r="150" fill="#E8F5F2" opacity="0.4" />
              <circle cx="30%" cy="75%" r="180" fill="#D1EBE5" opacity="0.35" />
              <rect x="50%" y="40%" width="300" height="300" fill="#E8F5F2" opacity="0.25" transform="rotate(45)" />
              <rect x="15%" y="55%" width="250" height="250" fill="#F0F9F7" opacity="0.3" transform="rotate(30)" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#B0DDD3" strokeWidth="1" opacity="0.3" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#B0DDD3" strokeWidth="1" opacity="0.25" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/40 z-[1]"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                    지금 너무 힘드시죠<br />
                    <span className="text-sage-600">답은 있습니다</span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
                    12년간 1,200분의 길을 함께 걸었습니다<br />
                    당신의 상황도 해결책이 있어요
                  </p>

                  <div className="bg-white rounded-2xl p-6 mb-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)]">
                    <p className="text-base font-semibold text-gray-900 mb-4">지금 이런 고민 하고 계신가요?</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">이혼 절차를 어떻게 시작해야 할지 모르겠어요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">재산분할과 양육권, 무엇부터 준비해야 하나요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">상대방이 먼저 변호사를 선임했어요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">증거 자료가 법적 효력이 있는지 궁금해요</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-gray-900 mb-8 font-semibold drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
                    전화 10분, 무료입니다<br />
                    부담 없이 먼저 들어보세요
                  </p>


                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <button
                      onClick={() => setIsPhonePrepModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-sage-600 text-white rounded-full font-bold text-sm md:text-base hover:bg-sage-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      편하게 물어보기 (10분 무료)
                    </button>
                    <a
                      href="#success-preview"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 font-semibold text-sm md:text-base rounded-full border-2 border-sage-200 hover:border-sage-600 hover:bg-gray-50 transition-all duration-300"
                    >
                      먼저 성공사례 확인하기
                    </a>
                  </div>

                  {/* 무료 상담 안내 - 명확하고 투명하게 */}
                  <div className="bg-sage-50/50 rounded-xl p-4 mb-6 border border-sage-200">
                    <p className="text-sm font-semibold text-gray-900 mb-2">📞 10분 무료 전화상담 안내</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• 첫 상담만 무료 (재상담은 유료)</li>
                      <li>• 이혼 관련 상담만 가능</li>
                      <li>• 10분 후 연장 시 분당 5,000원</li>
                      <li>• 계약 강요 절대 없음</li>
                    </ul>
                  </div>

                  {/* 신뢰 지표 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sage-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>이혼 소송 1,200건</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sage-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>100% 비밀보장</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sage-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>계약 강요 없음</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-sage-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>평균 응답 30초</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sage-50 to-sage-100 shadow-xl">
                    <Image
                      src="/images/consultation/hero-consultation-warm.png"
                      alt="법무법인 더율 편안한 상담 장면"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 성공사례 - Sage Green */}
        <section id="success" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Success Stories</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                비슷한 상황, 좋은 결과
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
                당신과 같은 고민을 했던 분들의 이야기
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {recentCases.map((case_, idx) => (
                <Link
                  key={idx}
                  href={`/cases/${case_.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all duration-300 border-2 border-transparent hover:border-sage-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-sage-100 text-sage-700 text-xs font-semibold rounded-full">
                      {case_.category}
                    </span>
                    <span className="text-xs text-gray-500">{case_.caseNumber}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sage-600 transition-colors">
                    {case_.result}
                  </h3>
                  <p className="text-sm text-gray-600">사건 상세 보기 →</p>
                </Link>
              ))}
            </div>

            <div className="text-center mb-12">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-bold text-lg transition-colors"
              >
                21개 사례 더 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 실적 박스 - Sage Green */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-sage-100/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 via-white to-sage-50/20 -z-10"></div>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">23건</p>
                  <p className="text-sm md:text-base text-gray-700">이번주 상담했어요</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">1,200건</p>
                  <p className="text-sm md:text-base text-gray-700">지금까지 도왔어요</p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">45분</p>
                  <p className="text-sm md:text-base text-gray-700">평균 상담시간</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 프로세스 - Sage Green */}
        <section id="process" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Process</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                간단한 3단계
              </h2>
            </div>

            <div className="space-y-8">
              {/* STEP 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
                    <Image
                      src="/images/consultation/icon-phone.png"
                      alt="전화"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">전화 한 통 (30초)</h3>
                    <p className="text-gray-700 mb-4 font-light">1661-7633 평균 대기 30초</p>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-sage-100 to-sage-200 text-sage-800 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">상황 파악 (10분)</h3>
                    <p className="text-gray-700 mb-4 font-light">핵심만 여쭤보고 방향 제시</p>
                    <Link
                      href="/faq"
                      className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-sm font-semibold transition-colors"
                    >
                      자주 묻는 질문 76개 보기 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex items-center justify-center shadow-sm relative overflow-hidden">
                    <Image
                      src="/images/consultation/icon-direction.png"
                      alt="방향 제시"
                      width={120}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">해결 방향 제시</h3>
                    <p className="text-gray-700 mb-4 font-light">가능한 선택지와 예상 결과 설명</p>
                    <Link
                      href="/the-plan"
                      className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 text-sm font-semibold transition-colors"
                    >
                      더율의 승소 전략 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 서류 준비 체크리스트 - Sage Green */}
        <section id="preparation" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Preparation</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                뭘 준비하면 좋을까요?
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                없어도 상담은 가능해요. 있으면 더 정확해요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 필수 서류 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] relative overflow-hidden">
                {/* 배경 일러스트 */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <Image
                    src="/images/consultation/icon-checklist.jpg"
                    alt="체크리스트"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                  <span className="text-2xl">📄</span>
                  필수 서류
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">혼인관계증명서</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">가족관계증명서</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">주민등록등본</span>
                  </li>
                </ul>
              </div>

              {/* 있으면 좋은 것 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)]">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">💼</span>
                  있으면 더 좋아요
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">재산 목록 (부동산, 예금 등)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">증거 자료 (문자, 사진, 녹음)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">상황 정리 메모</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-sage-50 rounded-2xl p-6 text-center">
              <p className="text-gray-700 font-medium mb-2">아무것도 없어도 괜찮아요</p>
              <p className="text-sm text-gray-600">상황만 말씀해주시면 필요한 것 알려드릴게요</p>
            </div>
          </div>
        </section>

        {/* Section 5: 상담 채널 - Sage Green */}
        <section id="channels" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Contact Method</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                어떻게 만날까요?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* 전화 (10분 무료) */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">전화 상담</h3>
                    <p className="text-sage-600 font-bold text-sm">10분 무료 ✓</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>가장 빠른 상담</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>익명 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>즉시 연결</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mb-4">*첫회만, 이혼 상담만</p>
                </div>
                <a
                  href="tel:1661-7633"
                  className="block w-full py-3 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl text-center"
                >
                  1661-7633
                </a>
              </div>

              {/* 영상 상담 */}
              <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <div className="mb-6">
                  <div className="relative bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    <div className="relative text-center">
                      <svg className="w-20 h-20 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">화상 상담</h3>
                    <p className="text-sage-600 font-semibold text-sm">5만원 (수임 시 환불)</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>집에서 편하게</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>화면 공유 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>얼굴 보며 상담</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  예약하기
                </button>
              </div>

              {/* 방문 상담 (추천) */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-sage-400 hover:shadow-xl transition-all">
                <span className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-sage-500 to-sage-600 text-white text-xs font-bold rounded-full shadow-md">
                  추천
                </span>
                <div className="mb-6">
                  <div className="relative bg-gradient-to-br from-sage-500 to-sage-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    <div className="relative text-center">
                      <svg className="w-20 h-20 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">방문 상담</h3>
                    <p className="text-sage-600 font-semibold text-sm">5만원 (수임 시 환불)</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>서류 바로 검토</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>깊은 상담 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-sage-600 mt-1">✓</span>
                      <span>당일 계약도 OK</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  예약하기
                </button>
              </div>
            </div>

            {/* 오시는 길 안내 */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">오시는 길</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-bold text-gray-900 mb-2">천안 주사무소</p>
                  <p className="text-sm text-gray-600">충남 천안시 동남구 청수5로 11, 9층</p>
                  <p className="text-xs text-gray-500 mt-1">평일 09:00-18:00 | 주말 예약 가능</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 mb-2">평택 분사무소</p>
                  <p className="text-sm text-gray-600">경기 평택시 평남로 1029-1, 6층</p>
                  <p className="text-xs text-gray-500 mt-1">평일 09:00-18:00 | 주말 예약 가능</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: FAQ - Sage Green */}
        <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                자주 궁금해하시는 것들
              </h2>
            </div>

            {/* 카테고리 탭 */}
            <div className="flex justify-center gap-4 mb-8 flex-wrap">
              {Object.keys(faqCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedFaqCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedFaqCategory === category
                      ? 'bg-sage-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ 리스트 */}
            <div className="space-y-4 mb-8">
              {faqCategories[selectedFaqCategory as keyof typeof faqCategories].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-sage-300 hover:shadow-[0_2px_12px_rgba(109,181,164,0.08)] transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-200 pt-4 font-light whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-bold text-lg transition-colors"
              >
                76개 Q&A 더 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: 비용 - Sage Green */}
        <section id="pricing" className="py-16 md:py-24 bg-white scroll-mt-20">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Pricing</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                투명한 비용 안내
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">전화 상담</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">0원</div>
                <p className="text-gray-600 mb-2 font-light">첫 10분</p>
                <p className="text-xs text-gray-500">이혼 상담만 가능</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-sage-500 hover:shadow-xl transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">수임료</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">300만원~</div>
                <div className="text-sm text-gray-700 space-y-1 mb-2">
                  <p>착수금 기준</p>
                  <p className="text-xs text-gray-500">성공보수 별도 협의</p>
                </div>
                <p className="text-xs text-gray-500">사안별 맞춤 견적</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">분납 가능</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">6개월</div>
                <p className="text-gray-600 mb-2 font-light">최대 기간</p>
                <p className="text-xs text-gray-500">상황 고려해 조정</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: 변호사 소개 - Sage Green */}
        <section id="team" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Our Team</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                함께할 변호사
              </h2>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border-2 border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-80 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl"></div>
                    <div className="relative text-center">
                      <div className="text-6xl mb-4 opacity-20">📷</div>
                      <p className="text-gray-600 font-medium">임은지 변호사</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-block px-4 py-1.5 bg-sage-600 text-white text-xs font-semibold rounded-full mb-4">
                    광고 책임 변호사
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">임은지 변호사</h3>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>서울대 법학과</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>사법시험 52회</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>이혼 전문 10년</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>승소율 87%</span>
                    </li>
                  </ul>

                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-bold transition-colors"
                  >
                    전체 변호사 보기
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: 후기 - Sage Green */}
        <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-sage-600/70 mb-3 tracking-[0.2em] uppercase">Testimonials</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                먼저 경험한 분들의 이야기
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(109,181,164,0.08)] hover:shadow-[0_8px_24px_rgba(109,181,164,0.12)] transition-all"
                >
                  <div className="text-4xl mb-4 text-gray-300">"</div>
                  <p className="text-gray-700 mb-4 leading-relaxed font-light">
                    {testimonial.quote}
                  </p>
                  <p className="text-sm text-gray-500">- {testimonial.author}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-sage-100/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 via-white to-sage-50/20 -z-10"></div>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">4.8/5.0</p>
                  <p className="text-sm text-gray-600">만족도</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">92%</p>
                  <p className="text-sm text-gray-600">다시 찾는 분</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Final CTA - Sage Green */}
        <section id="cta" className="py-16 md:py-24 bg-gradient-to-b from-white via-sage-50/20 to-white scroll-mt-20">
          <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-100">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                결정은 나중에 하세요<br />
                <span className="text-sage-600">일단 들어보세요</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-10 font-light leading-relaxed">
                지금은 정보가 필요한 시기예요<br />
                10분 무료 상담으로 상황을 정리해드릴게요
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">지금 전화하기</h3>
                  <button
                    onClick={() => setIsPhonePrepModalOpen(true)}
                    className="block w-full py-4 bg-sage-600 hover:bg-sage-700 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg mb-2"
                  >
                    1661-7633
                  </button>
                  <p className="text-sm text-gray-500">평일 09:00-18:00 | 주말 예약</p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">아직 준비 중이세요?</h3>
                  <div className="space-y-2">
                    <Link
                      href="/faq"
                      className="block py-3 bg-white border-2 border-sage-200 text-gray-900 font-semibold rounded-full hover:border-sage-600 hover:bg-gray-50 transition-all"
                    >
                      자주 묻는 질문
                    </Link>
                    <Link
                      href="/blog"
                      className="block py-3 bg-white border-2 border-sage-200 text-gray-900 font-semibold rounded-full hover:border-sage-600 hover:bg-gray-50 transition-all"
                    >
                      전문 칼럼 읽기
                    </Link>
                    <Link
                      href="/cases"
                      className="block py-3 bg-white border-2 border-sage-200 text-gray-900 font-semibold rounded-full hover:border-sage-600 hover:bg-gray-50 transition-all"
                    >
                      성공사례 확인
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">저희가 지키는 3가지 원칙</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    100% 비밀보장
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    의뢰 강요 없음
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    충분한 검토 시간
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 전환 퍼널 - 추가 탐색 옵션 */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-sage-50/30">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <ConversionFunnel
              title="아직 결정이 어려우시다면"
              subtitle="더 알아보고 천천히 결정하세요"
              excludeItems={['consultation-process']}
              onOpenConsultationModal={() => setIsBookingModalOpen(true)}
            />
          </div>
        </section>

        {/* Modals */}
        <ConsultationBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
        <PhonePrepModal
          isOpen={isPhonePrepModalOpen}
          onClose={() => setIsPhonePrepModalOpen(false)}
        />
      </div>
    </PageLayout>
  );
}
