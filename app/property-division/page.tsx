'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import QuickConsultationForm from '@/components/features/QuickConsultationForm';
import TrustBadges from '@/components/features/TrustBadges';
import StickyMobileCTA from '@/components/features/StickyMobileCTA';
import PropertyCalculator from '@/components/features/PropertyCalculator';
import CostTransparency from '@/components/features/CostTransparency';
import LitigationTimeline from '@/components/features/LitigationTimeline';
import DocumentChecklist from '@/components/features/DocumentChecklist';
import EvidenceGallery from '@/components/features/EvidenceGallery';
import KakaoChannelButton from '@/components/features/KakaoChannelButton';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABox, { CTAButton } from '@/components/ui/CTABox';

export default function PropertyDivisionPage() {
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/cases?category=재산분할&limit=3');
        if (response.ok) {
          const casesData = await response.json();
          setCases(casesData);
        }
      } catch (error) {
        console.error('Failed to load cases:', error);
      }
    }
    loadCases();
  }, []);

  const strategies = [
    {
      title: '은닉 재산 추적',
      description: '숨겨진 재산을 찾아내는 전략',
      methods: [
        '금융거래정보 조회 신청 (은행, 증권, 보험)',
        '부동산 등기부등본 전국 조회',
        '국세청 소득금액증명 확인',
        '사업자등록증 및 법인 지분 조사',
        '가족 명의 재산 실질 소유자 추적',
      ],
      result: '평균 30% 추가 재산 발견',
      color: 'emerald',
    },
    {
      title: '기여도 극대화',
      description: '50% 이상 받기 위한 전략',
      methods: [
        '가사노동·육아 기여도 금액 환산',
        '배우자 사업 내조 사실 입증',
        '결혼 전 재산 증가분 기여도 주장',
        '상대방 유책 사유로 가산 청구',
        '재산 형성 과정 상세 소명',
      ],
      result: '평균 기여도 60% 인정',
      color: 'blue',
    },
    {
      title: '특유재산 보호',
      description: '내 고유 재산 지키기',
      methods: [
        '결혼 전 재산 명확히 입증',
        '상속·증여 재산 분할 대상 제외',
        '혼인 무관 재산 증가분 보호',
        '배우자 기여 없는 사업 이익 보호',
        '부채 분담 회피 전략',
      ],
      result: '고유재산 100% 보호',
      color: 'purple',
    },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Property Division"
            title="재산분할 전략"
            subtitle="당신의 정당한 몫을 지키는 체계적인 재산 분석 시스템"
          />
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">30%</p>
                <p className="text-sm text-gray-600">추가 재산 발견율</p>
                <p className="text-xs text-gray-500 mt-1">은닉 재산 추적 시</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">10년+</p>
                <p className="text-sm text-gray-600">재산분할 전문</p>
                <p className="text-xs text-gray-500 mt-1">250건 이상 수임</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">48시간</p>
                <p className="text-sm text-gray-600">초기 대응</p>
                <p className="text-xs text-gray-500 mt-1">즉시 상담하세요</p>
              </div>
            </div>
        </section>

        {/* 긴급 상황 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  재산 은닉 신호를 놓치지 마세요
                </h2>
                <p className="text-gray-800 font-semibold mb-1">
                  빠를수록 더 많이 지킬 수 있어요 <span className="text-blue-600">(골든타임 1주일)</span>
                </p>
                <p className="text-sm text-gray-600">다음 징후 발견 시 <strong>바로 재산조회 신청</strong>하세요</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                '배우자가 갑자기 재산을 가족 명의로 이전',
                '사업체 매출 축소 신고 또는 폐업 시도',
                '계좌 정리 또는 현금 인출 증가',
                '부동산 급매 또는 가등기 설정',
              ].map((situation, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <span className="text-gray-400 mt-1">⚠️</span>
                  <span className="text-gray-700">{situation}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-700 text-white rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 재산조회 신청 (1661-7633)
              </Link>
            </div>
          </div>
        </section>

        {/* 고객 증언 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <p className="text-sm text-gray-500 mb-2">Real Voice</p>
              <h2 className="text-2xl font-bold text-gray-900">
                "재산이 1억이라더니, 4억이 나왔습니다"
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "남편은 '사업이 어려워서 재산이 1억밖에 없다'고 했습니다. 하지만 더율 변호사님이
                금융거래정보 조회를 신청하고, 장모님 명의 부동산까지 추적한 결과 총 4억이 나왔습니다.
                제 기여도는 60%로 인정받았고, 최종적으로 2억 4천을 받았습니다. 만약 변호사 없이
                협의했다면 5천만원만 받을 뻔했어요."
              </blockquote>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="font-bold text-gray-900">M씨 (40대 여성)</p>
                  <p className="text-sm text-gray-600">15년 혼인 · 전업주부</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">1억 → 2.4억</p>
                  <p className="text-sm text-gray-600">은닉 재산 발견 + 60% 기여</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 신뢰 배지 */}
        <TrustBadges />

        {/* 공감 메시지 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 mt-16">
          <div className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                "재산이 없다"는 말, 절대 그대로 믿지 마세요
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                대부분의 이혼 사건에서 <strong>재산을 축소·은닉</strong>하려는 시도가 있습니다.<br />
                ① 가족 명의 이전 ② 현금 인출 후 숨김 ③ 사업 매출 축소 신고 - 이 3가지가 가장 흔합니다.<br />
                하지만 법원의 <strong>금융거래정보 조회 명령</strong>으로 대부분 찾아낼 수 있습니다.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                숨긴 재산을 찾고, 정당한 기여도를 인정받는 것. 그것이 당신의 권리입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 준비 서류 체크리스트 */}
        <DocumentChecklist pageType="property" />

        {/* 3대 전략 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Strategic Approach"
            title="재산분할 3대 전략"
            subtitle="상황에 따라 최적의 전략을 선택합니다"
          />

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {strategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => setActiveStrategy(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeStrategy === index
                    ? strategy.color === 'emerald'
                      ? 'bg-gray-900 text-white shadow-lg'
                      : strategy.color === 'blue'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {strategy.title}
              </button>
            ))}
          </div>

          <div className={`bg-gradient-to-br ${
            strategies[activeStrategy].color === 'emerald'
              ? 'from-emerald-50'
              : strategies[activeStrategy].color === 'blue'
              ? 'from-blue-50'
              : 'from-purple-50'
          } to-white rounded-2xl p-8 border-2 ${
            strategies[activeStrategy].color === 'emerald'
              ? 'border-emerald-200'
              : strategies[activeStrategy].color === 'blue'
              ? 'border-blue-200'
              : 'border-purple-200'
          }`}>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {strategies[activeStrategy].title}
              </h3>
              <p className="text-gray-600">{strategies[activeStrategy].description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">주요 방법</h4>
                <ul className="space-y-3">
                  {strategies[activeStrategy].methods.map((method, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={`mt-1 ${
                        strategies[activeStrategy].color === 'emerald'
                          ? 'text-emerald-500'
                          : strategies[activeStrategy].color === 'blue'
                          ? 'text-blue-500'
                          : 'text-purple-500'
                      }`}>✓</span>
                      <span className="text-gray-700">{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${
                strategies[activeStrategy].color === 'emerald'
                  ? 'bg-emerald-100'
                  : strategies[activeStrategy].color === 'blue'
                  ? 'bg-blue-100'
                  : 'bg-purple-100'
              } rounded-xl p-6 text-center flex flex-col justify-center`}>
                <p className={`text-4xl font-bold mb-2 ${
                  strategies[activeStrategy].color === 'emerald'
                    ? 'text-gray-900'
                    : strategies[activeStrategy].color === 'blue'
                    ? 'text-blue-600'
                    : 'text-purple-600'
                }`}>
                  {strategies[activeStrategy].result}
                </p>
                <p className="text-sm text-gray-600">더율 수임 사건 평균</p>
              </div>
            </div>
          </div>
        </section>

        {/* 재산분할 공식 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              재산분할 계산 공식
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 mb-6">
                <p className="text-center text-lg font-semibold text-gray-900 mb-4">
                  (총 재산 - 특유재산 - 부채) × 기여도 = 분할액
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-3xl mb-2">①</p>
                    <p className="text-sm font-semibold text-gray-900">총 재산 확정</p>
                    <p className="text-xs text-gray-600 mt-1">은닉 재산 추적 포함</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl mb-2">②</p>
                    <p className="text-sm font-semibold text-gray-900">기여도 산정</p>
                    <p className="text-xs text-gray-600 mt-1">가사·육아·내조 평가</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl mb-2">③</p>
                    <p className="text-sm font-semibold text-gray-900">분할액 확정</p>
                    <p className="text-xs text-gray-600 mt-1">협의 or 판결</p>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                <p>💡 <strong>기여도 평균:</strong> 맞벌이 50%, 전업주부 45-55%, 내조 인정 시 60% 이상</p>
              </div>
            </div>
          </div>
        </section>

        {/* 재산분할 계산기 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <PropertyCalculator />
        </section>

        {/* 소송 진행 과정 */}
        <LitigationTimeline pageType="property" />

        {/* 성공 사례 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Success Stories"
            title="실제 재산분할 성공 사례"
            subtitle="숨긴 재산을 찾고, 정당한 기여도를 인정받은 사례들"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {cases.length > 0 ? (
              cases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.slug}`}
                  className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all block"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{caseItem.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {caseItem.excerpt || caseItem.content?.substring(0, 100) + '...'}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-900">자세히 보기 →</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                성공사례를 불러오는 중...
              </div>
            )}
          </div>
        </section>

        {/* 증거 자료 갤러리 */}
        <EvidenceGallery pageType="property" />

        {/* 상담 신청 폼 */}
        <section id="consultation-form" className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <QuickConsultationForm pageType="property" />
        </section>

        {/* FAQ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              재산분할 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '결혼 전 재산도 분할 대상인가요?',
                  a: '원칙적으로 결혼 전 재산(특유재산)은 분할 대상이 아닙니다. 다만 ① 혼인 중 증가분, ② 배우자 기여로 증가한 부분은 분할 대상이 될 수 있습니다. 결혼 전 재산임을 입증할 서류(통장 내역, 증여계약서 등)를 미리 준비하세요.',
                },
                {
                  q: '상대방이 재산을 숨기고 있는 것 같아요',
                  a: '법원에 금융거래정보 조회 신청을 하면 배우자의 모든 은행·증권·보험 계좌를 확인할 수 있습니다. 가족 명의 재산도 실질 소유자가 배우자임을 입증하면 분할 대상에 포함됩니다. 은닉 징후 발견 즉시 변호사와 상담하세요.',
                },
                {
                  q: '전업주부인데 50%를 받을 수 있나요?',
                  a: '네, 충분히 가능합니다. 가사노동과 육아는 재산 형성에 기여한 것으로 인정되며, 법원은 평균 45-55%의 기여도를 인정합니다. 내조 사실(사업 도움 등)을 입증하면 60% 이상도 가능합니다.',
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Q. {faq.q}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">A. {faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/faq?category=재산분할"
                className="text-gray-900 font-semibold hover:underline"
              >
                재산분할 관련 FAQ 전체 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 비용 안내 */}
        <CostTransparency pageType="property" />

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12">
          <CTABox
            title="다음은 당신의 정당한 몫 찾을 차례"
            description="오늘 상담하면 재산조회 신청서 무료 작성"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <p className="text-sm font-semibold flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                이번 달 19분께 정당한 몫을 찾아드렸습니다 (평균 8,500만원)
              </p>
            </div>

            <p className="text-sm text-gray-300 mb-8">
              초회 상담 무료 · 은닉 재산 추적 전문 · 평균 60% 기여도 · 긴급 재산조회 가능
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <CTAButton
                href="tel:1661-7633"
                variant="primary"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              >
                지금 상담하기 (1661-7633)
              </CTAButton>

              <CTAButton
                href="/consultation-flow"
                variant="secondary"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                상담 흐름 보기
              </CTAButton>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-xs text-gray-400">
                평일 09:00-18:00 · 주말/공휴일 예약 상담 · 100% 비밀보장
              </p>
            </div>
          </CTABox>
        </section>
      </div>

      {/* 모바일 CTA */}
      <StickyMobileCTA />

      {/* 카카오톡 채널 버튼 */}
      <KakaoChannelButton />

      {/* Exit Intent 팝업 */}
    </PageLayout>
  );
}
