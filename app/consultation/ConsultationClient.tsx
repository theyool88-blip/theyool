'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/layouts/PageLayout';
import Modal from '@/components/ui/Modal';
import EnhancedChannelSelector from '@/components/features/EnhancedChannelSelector';

export default function ConsultationClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      { q: '무료 상담은 어떻게 받나요?', a: '전화로만 10분 무료예요. 첫 상담 1회만 무료이고, 이혼 관련 상담만 가능해요. 재상담이나 일반 법률 상담은 유료예요.' },
      { q: '뭘 준비해야 해요?', a: '아무것도 안 가져와도 돼요. 있으면 좋은 것: 혼인증명서, 재산서류, 증거(문자/사진). 없어도 상담은 가능해요.' },
      { q: '이름 안 밝혀도 되나요?', a: '네, 전화는 익명 OK예요. 개인정보 없이 상황만 말씀하셔도 법률 조언 받으실 수 있어요.' },
      { q: '꼭 계약해야 하나요?', a: '아니요. 상담만 받고 가도 돼요. 강요 안 해요. 충분히 고민하고 결정하세요.' },
    ],
    비용: [
      { q: '상담 비용은 얼마예요?', a: '전화 10분: 무료 (첫회만)\n영상/방문: 5만원 (수임하면 환불)' },
      { q: '변호사 비용은 얼마예요?', a: '착수금 300만원부터, 성공보수는 따로 상의해요. 상담할 때 정확한 견적 알려드릴게요.' },
      { q: '나눠서 낼 수 있나요?', a: '네, 최대 6개월 분납 가능해요. 경제적 상황 고려해서 조정할 수 있어요.' },
    ],
    절차: [
      { q: '얼마나 걸려요?', a: '평균 6-12개월이에요. 협의이혼은 더 빨라요. 사건마다 달라요.' },
      { q: '비밀 지켜져요?', a: '100% 보장이에요. 변호사는 법으로 비밀유지 의무가 있어요.' },
      { q: '다른 변호사 만났는데 또 상담해도 돼요?', a: '물론이에요. 비교 상담 추천해요. 더 나은 전략 보여드릴게요.' },
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
        {/* Section 1: Hero - Toss 스타일 강화 */}
        <section className="relative min-h-[90vh] flex flex-col overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-24 pb-16 md:pt-32 md:pb-20">
          {/* Geometric Background Pattern */}
          <div className="absolute inset-0 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f0f0f0', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: '#e8e8e8', stopOpacity: 0.6 }} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#f5f5f5', stopOpacity: 0.5 }} />
                  <stop offset="100%" style={{ stopColor: '#ececec', stopOpacity: 0.5 }} />
                </linearGradient>
                <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
              <circle cx="20%" cy="30%" r="200" fill="url(#grad1)" />
              <circle cx="80%" cy="70%" r="250" fill="url(#grad2)" />
              <circle cx="70%" cy="25%" r="150" fill="#f5f5f5" opacity="0.5" />
              <circle cx="30%" cy="75%" r="180" fill="#efefef" opacity="0.5" />
              <rect x="50%" y="40%" width="300" height="300" fill="#f0f0f0" opacity="0.3" transform="rotate(45)" />
              <rect x="15%" y="55%" width="250" height="250" fill="#f5f5f5" opacity="0.35" transform="rotate(30)" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#e0e0e0" strokeWidth="1" opacity="0.4" />
              <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#e0e0e0" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/40 z-[1]"></div>

          {/* Content */}
          <div className="relative z-10 flex-1 flex items-center">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 w-full">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                    이혼 전문 변호사<br />
                    무료 상담 받으세요
                  </h1>

                  <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
                    법무법인 더율이 1,200건의 경험으로 도와드립니다<br />
                    10분 전화상담은 비용이 없습니다
                  </p>

                  <div className="bg-white rounded-2xl p-6 mb-8 shadow-md">
                    <p className="text-base font-semibold text-gray-900 mb-4">지금 이런 고민 하고 계신가요?</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">이혼 절차를 어떻게 시작해야 할지 모르겠어요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">재산분할과 양육권, 무엇부터 준비해야 하나요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">상대방이 먼저 변호사를 선임했어요</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm md:text-base text-gray-700">증거 자료가 법적 효력이 있는지 궁금해요</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-gray-900 mb-8 font-semibold drop-shadow-[0_1px_4px_rgba(255,255,255,0.8)]">
                    10분이면 충분합니다<br />
                    당신의 상황에 맞는 명확한 답을 드릴게요
                  </p>


                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <a
                      href="tel:1661-7633"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gray-900 text-white rounded-full font-bold text-sm md:text-base hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      무료 상담받기 (1661-7633)
                    </a>
                    <a
                      href="#success-preview"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-gray-900 font-semibold text-sm md:text-base rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-all duration-300"
                    >
                      먼저 성공사례 확인하기
                    </a>
                  </div>

                  {/* 법적 고지 - 작은 글씨 */}
                  <p className="text-xs text-gray-500 mb-6">
                    *전화상담 10분만 무료 (첫회 한정, 이혼 상담만)<br />
                    영상/방문 상담은 5만원 (수임 시 환불)
                  </p>

                  {/* 신뢰 지표 */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>이혼 소송 1,200건</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>100% 비밀보장</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>계약 강요 없음</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>평균 응답 30초</span>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 min-h-[400px] flex items-center justify-center shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                    <div className="relative text-center p-8">
                      <div className="text-6xl mb-4 opacity-20">📷</div>
                      <p className="text-gray-600 font-medium">전문 상담 장면</p>
                      <p className="text-sm text-gray-500 mt-2">곧 공개됩니다</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 성공사례 */}
        <section id="success-preview" className="py-16 md:py-24 bg-gradient-to-b from-white via-pink-50/30 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-pink-600/70 mb-3 tracking-[0.2em] uppercase">Success Stories</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                어제도 누군가 해결했어요
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto">
                21개 사례 중 최신 3개예요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {recentCases.map((case_, idx) => (
                <Link
                  key={idx}
                  href={`/cases/${case_.slug}`}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                      {case_.category}
                    </span>
                    <span className="text-xs text-gray-500">{case_.caseNumber}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {case_.result}
                  </h3>
                  <p className="text-sm text-gray-600">사건 상세 보기 →</p>
                </Link>
              ))}
            </div>

            <div className="text-center mb-12">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-bold text-lg transition-colors"
              >
                21개 사례 더 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 실적 박스 */}
            <div className="bg-white rounded-3xl p-10 shadow-lg border-2 border-blue-100/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 -z-10"></div>
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

        {/* Section 3: 프로세스 (사무소 사진 섹션 제거됨) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Process</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                어떻게 진행되나요?
              </h2>
            </div>

            <div className="space-y-8">
              {/* STEP 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">전화하세요 (1분)</h3>
                    <p className="text-gray-700 mb-4 font-light">1661-7633 누르면 바로 연결</p>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">10분 무료로 들어드려요</h3>
                    <p className="text-gray-700 mb-4 font-light">상황 듣고 방향 알려드릴게요</p>
                    <Link
                      href="/faq"
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors"
                    >
                      자주 묻는 질문 76개 보기 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">맞춤 전략 만들어요</h3>
                    <p className="text-gray-700 mb-4 font-light">당신 상황에 딱 맞는 방법 찾아요</p>
                    <Link
                      href="/the-plan"
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors"
                    >
                      더율의 승소 전략 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 서류 준비 체크리스트 (NEW) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Preparation</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                뭘 준비하면 좋을까요?
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                없어도 상담은 가능해요. 있으면 더 정확해요.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 필수 서류 */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📄</span>
                  필수 서류
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">혼인관계증명서</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">가족관계증명서</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">주민등록등본</span>
                  </li>
                </ul>
              </div>

              {/* 있으면 좋은 것 */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
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

            <div className="mt-8 bg-blue-50 rounded-2xl p-6 text-center">
              <p className="text-gray-700 font-medium mb-2">아무것도 없어도 괜찮아요</p>
              <p className="text-sm text-gray-600">상황만 말씀해주시면 필요한 것 알려드릴게요</p>
            </div>
          </div>
        </section>

        {/* Section 5: 상담 채널 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Contact Method</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                어떻게 만날까요?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* 전화 (10분 무료) */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">전화 상담</h3>
                    <p className="text-amber-600 font-bold text-sm">10분 무료 ✓</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>가장 빠른 상담</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>익명 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>즉시 연결</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mb-4">*첫회만, 이혼 상담만</p>
                </div>
                <a
                  href="tel:1661-7633"
                  className="block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl text-center"
                >
                  1661-7633
                </a>
              </div>

              {/* 영상 상담 */}
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all">
                <div className="mb-6">
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    <div className="relative text-center">
                      <svg className="w-20 h-20 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">화상 상담</h3>
                    <p className="text-blue-600 font-semibold text-sm">5만원 (수임 시 환불)</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>집에서 편하게</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>화면 공유 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>얼굴 보며 상담</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  예약하기
                </button>
              </div>

              {/* 방문 상담 (추천) */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-400 hover:shadow-xl transition-all">
                <span className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-md">
                  추천
                </span>
                <div className="mb-6">
                  <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl h-48 flex items-center justify-center mb-4 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    <div className="relative text-center">
                      <svg className="w-20 h-20 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">방문 상담</h3>
                    <p className="text-amber-600 font-semibold text-sm">5만원 (수임 시 환불)</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>서류 바로 검토</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>깊은 상담 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">✓</span>
                      <span>당일 계약도 OK</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl"
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

        {/* Section 6: FAQ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                다들 이런 거 물어봐요
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
                      ? 'bg-gray-900 text-white shadow-lg'
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
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all"
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
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors"
              >
                76개 Q&A 더 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 7: 비용 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[900px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-green-600/70 mb-3 tracking-[0.2em] uppercase">Pricing</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                얼마예요?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">상담</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">무료</div>
                <p className="text-gray-600 mb-2 font-light">10분</p>
                <p className="text-xs text-gray-500">전화만, 첫 번째만</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center shadow-lg border-2 border-blue-500 hover:shadow-xl transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">변호사 비용</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">300만원~</div>
                <div className="text-sm text-gray-700 space-y-1 mb-2">
                  <p>착수금</p>
                  <p className="text-xs text-gray-500">성공보수 따로</p>
                </div>
                <p className="text-xs text-gray-500">상담할 때 정확히</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-4">분납</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">OK</div>
                <p className="text-gray-600 mb-2 font-light">최대 6개월</p>
                <p className="text-xs text-gray-500">부담 줄여요</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: 변호사 소개 (단순화) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Our Team</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                누가 도와주나요?
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
                  <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full mb-4">
                    광고 책임 변호사
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">임은지 변호사</h3>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>서울대 법학과</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>사법시험 52회</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>이혼 전문 10년</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>승소율 87%</span>
                    </li>
                  </ul>

                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
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

        {/* Section 9: 후기 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Testimonials</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                상담받은 분들 후기
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-4 text-gray-300">"</div>
                  <p className="text-gray-700 mb-4 leading-relaxed font-light">
                    {testimonial.quote}
                  </p>
                  <p className="text-sm text-gray-500">- {testimonial.author}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 -z-10"></div>
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

        {/* Section 10: Final CTA (압박 없이) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-amber-50/20">
          <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-gray-100">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                오늘 결정 안 해도 돼요<br />
                일단 물어보세요
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-10 font-light leading-relaxed">
                10분만 시간 내서 전화해보세요<br />
                무엇을 해야 하는지 알려드릴게요
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">지금 전화하기</h3>
                  <a
                    href="tel:1661-7633"
                    className="block py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg mb-2"
                  >
                    1661-7633
                  </a>
                  <p className="text-sm text-gray-500">평일 09:00-18:00 | 주말 예약</p>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">아직 준비 중이세요?</h3>
                  <div className="space-y-2">
                    <Link
                      href="/faq"
                      className="block py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all"
                    >
                      자주 묻는 질문
                    </Link>
                    <Link
                      href="/blog"
                      className="block py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all"
                    >
                      전문 칼럼 읽기
                    </Link>
                    <Link
                      href="/cases"
                      className="block py-3 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all"
                    >
                      성공사례 확인
                    </Link>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">우리가 약속해요</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    비밀 지켜요
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    계약 강요 안 해요
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    생각할 시간 드려요
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="3xl">
          <EnhancedChannelSelector onClose={() => setIsModalOpen(false)} />
        </Modal>
      </div>
    </PageLayout>
  );
}
