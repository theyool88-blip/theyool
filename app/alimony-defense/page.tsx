'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import QuickConsultationForm from '@/components/features/QuickConsultationForm';
import TrustBadges from '@/components/features/TrustBadges';
import StickyMobileCTA from '@/components/features/StickyMobileCTA';
import CostTransparency from '@/components/features/CostTransparency';
import LitigationTimeline from '@/components/features/LitigationTimeline';
import DocumentChecklist from '@/components/features/DocumentChecklist';
import EvidenceGallery from '@/components/features/EvidenceGallery';
import KakaoChannelButton from '@/components/features/KakaoChannelButton';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABox, { CTAButton } from '@/components/ui/CTABox';

export default function AlimonyDefensePage() {
  const [activeStrategy, setActiveStrategy] = useState(0);
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/cases?category=위자료&limit=3');
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
      title: '1단계: 부인 전략',
      description: '유책 사유 자체를 부정하는 방어',
      details: [
        '불륜 증거의 증거능력 검토 (불법수집 여부)',
        '정황 증거만으로는 추정 불가 법리 적용',
        '상대방 주장의 모순점 발견 및 반박',
        '알리바이 및 반증 자료 제시',
      ],
      successRate: '부인 성공 시 위자료 0원',
      color: 'green',
    },
    {
      title: '2단계: 감액 전략',
      description: '청구액을 대폭 줄이는 방어',
      details: [
        '혼인 파탄의 쌍방 책임 입증 (과실상계)',
        '경제적 능력 및 재산 상황 소명',
        '청구액의 과도함 및 비례원칙 위반 주장',
        '유사 판례 인용하여 적정선 제시',
      ],
      successRate: '평균 70% 감액 성공',
      color: 'blue',
    },
    {
      title: '3단계: 상계 전략',
      description: '역청구로 실제 지급액 최소화',
      details: [
        '재산분할, 양육비 등 다른 청구와 상계',
        '상대방의 귀책사유 발견 및 반소 제기',
        '혼인 중 경제적 기여 인정받아 청구권 확보',
        '최종 합의 과정에서 전략적 협상',
      ],
      successRate: '실지급액 50% 추가 감소',
      color: 'purple',
    },
  ];

  const checkpoints = [
    {
      title: '판사가 보는 7가지 체크포인트',
      items: [
        '① 유책 사유의 명확성 (증거의 증명력)',
        '② 혼인 파탄의 주된 원인 제공자',
        '③ 혼인 기간 및 연령',
        '④ 당사자의 재산 및 경제력',
        '⑤ 혼인 중 생활 수준',
        '⑥ 정신적 고통의 정도',
        '⑦ 기타 제반 사정 (자녀, 건강 등)',
      ],
    },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Alimony Defense"
            title="위자료 방어 전략"
            subtitle="부당한 청구로부터 당신을 지키는 검증된 방어 시스템"
          />
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">평균 70%</p>
              <p className="text-sm text-gray-600">감액 성공률</p>
              <p className="text-xs text-gray-500 mt-1">더율 수임 사건 기준</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">10년+</p>
              <p className="text-sm text-gray-600">위자료 전문</p>
              <p className="text-xs text-gray-500 mt-1">300건 이상 수임</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">48시간</p>
              <p className="text-sm text-gray-600">초기 대응</p>
              <p className="text-xs text-gray-500 mt-1">즉시 상담하세요</p>
            </div>
          </div>
        </section>

        {/* 긴급 체크리스트 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                초기 대응이 중요합니다
              </h2>
              <p className="text-gray-700 mb-4">
                다음 상황에서는 즉시 법률 자문을 받으세요
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-700">상대방 변호사로부터 내용증명 수령</span>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-700">법원으로부터 소장 또는 조정신청서 수령</span>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-700">1억 이상 고액 청구 (재산분할 비율 초과)</span>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-lg p-4">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-gray-700">상대방이 증거를 계속 수집하고 있는 징후</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 무료 상담 (1661-7633)
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
                "처음엔 3억을 요구했는데..."
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "아내가 변호사를 통해 위자료 3억을 청구했습니다. 잘못한 건 맞지만,
                그 금액은 제 재산의 80%나 되는 금액이었어요. 억울하고 분했습니다.
                더율 변호사님을 만나고 나서야 '이렇게 방어할 수 있구나'를 알았습니다.
                결과는 3천만원. 94% 감액에 성공했습니다. 그리고 지금은 새로운 삶을 살고 있습니다."
              </blockquote>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="font-bold text-gray-900">K씨 (40대 남성)</p>
                  <p className="text-sm text-gray-600">20년 혼인 · 자녀 2명</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">3억 → 3천만원</p>
                  <p className="text-sm text-gray-600">94% 감액 성공</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 신뢰 배지 */}
        <TrustBadges />

        {/* 공감 메시지 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 mt-16">
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                얼마나 억울하고 분하실지 압니다
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                잘못한 건 인정합니다. 하지만 <strong>상대방 변호사가 노리는 3가지 함정</strong>이 있습니다:<br />
                ① 과도한 청구로 협상 여지 확보 ② 증거 부족한 부분까지 전부 청구 ③ 감정적 압박으로 빠른 합의 유도
              </p>
              <p className="text-lg font-semibold text-blue-600">
                법적으로 정당한 금액만 내는 것, 그것이 당신의 권리입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 준비 서류 체크리스트 */}
        <DocumentChecklist pageType="alimony" />

        {/* 3단계 방어 전략 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Defense Strategy"
            title="3단계 방어 전략"
            subtitle="사건 유형에 따라 최적의 방어 전략을 선택합니다"
          />

          {/* Strategy Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {strategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => setActiveStrategy(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeStrategy === index
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {strategy.title}
              </button>
            ))}
          </div>

          {/* Active Strategy Detail */}
          <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {strategies[activeStrategy].title}
              </h3>
              <p className="text-gray-600">{strategies[activeStrategy].description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">주요 방법</h4>
                <ul className="space-y-3">
                  {strategies[activeStrategy].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">예상 결과</h4>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    {strategies[activeStrategy].successRate}
                  </p>
                  <p className="text-sm text-gray-600">
                    더율의 {strategies[activeStrategy].title} 평균 성공률
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 소송 진행 과정 */}
        <LitigationTimeline pageType="alimony" />

        {/* 판사 체크포인트 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 border border-indigo-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {checkpoints[0].title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {checkpoints[0].items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-indigo-500 font-bold">{item.split(' ')[0]}</span>
                  <span className="text-gray-700">{item.substring(item.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>💡 이 7가지 요소를 종합적으로 고려하여 위자료 금액이 결정됩니다</p>
            </div>
          </div>
        </section>

        {/* 성공 사례 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Success Stories"
            title="실제 방어 성공 사례"
            subtitle="부당한 청구를 막고, 정당한 금액으로 조정한 사례들"
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

          <div className="mt-8 text-center">
            <Link
              href="/cases?category=위자료"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
            >
              전체 위자료 사례 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* 증거 자료 갤러리 */}
        <EvidenceGallery pageType="alimony" />

        {/* 상담 신청 폼 */}
        <section id="consultation-form" className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <QuickConsultationForm pageType="alimony" />
        </section>

        {/* FAQ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              위자료 방어 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '위자료를 안 낼 수는 없나요?',
                  a: '유책 사유가 명확하고 증거가 충분하면 위자료 지급 의무가 발생합니다. 다만 ① 증거 불충분, ② 쌍방 책임, ③ 혼인 파탄 기여도 등을 입증하면 금액을 0원 또는 대폭 감액할 수 있습니다.',
                },
                {
                  q: '청구액이 너무 높은데 어떻게 하나요?',
                  a: '법원은 청구액을 그대로 인용하지 않습니다. ① 당사자 재산, ② 혼인 기간, ③ 유사 판례 등을 종합해 적정선을 판단하므로, 이를 근거로 감액을 주장할 수 있습니다. 평균 70% 감액 성공합니다.',
                },
                {
                  q: '이미 소송이 시작됐는데 늦은 건 아닌가요?',
                  a: '소송 진행 중이라도 답변서 제출 전, 변론기일 전이라면 충분히 대응 가능합니다. 오히려 상대방 주장을 먼저 파악한 상태에서 더 정교한 방어 전략을 수립할 수 있습니다.',
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
                href="/faq?category=위자료"
                className="text-blue-600 font-semibold hover:underline"
              >
                위자료 관련 FAQ 전체 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 비용 안내 */}
        <CostTransparency pageType="alimony" />

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12">
          <CTABox
            title="전문가와 함께 시작하세요"
            description="초회 상담 무료 · 사건 분석 및 맞춤 전략 제시"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <p className="text-sm font-semibold flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                이번 달 26분께 합리적인 해결책을 찾아드렸습니다 (평균 70% 감액)
              </p>
            </div>

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
                지금 무료 상담 (1661-7633)
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
    </PageLayout>
  );
}
