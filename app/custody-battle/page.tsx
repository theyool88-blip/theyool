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
import LandingConsultationPrompt from '@/components/features/LandingConsultationPrompt';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABox, { CTAButton } from '@/components/ui/CTABox';

export default function CustodyBattlePage() {
  const [activeChecklist, setActiveChecklist] = useState(0);
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/cases?category=양육권&limit=3');
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

  const judgeChecklist = [
    {
      title: '엄마 유리 요인',
      items: [
        '① 영유아기 자녀 (만 5세 이하)',
        '② 주 양육자로서 장기간 돌봄',
        '③ 안정적 양육 환경 구축',
        '④ 자녀와의 강한 정서적 유대',
        '⑤ 유연한 근무 환경 (재택, 시간제)',
      ],
      rate: '87%',
      description: '엄마 양육권 확보율',
    },
    {
      title: '아빠 승소 전략',
      items: [
        '① 학령기 이상 자녀 (초등 고학년+)',
        '② 상대방 양육 부적격 입증',
        '③ 경제적 안정성 + 양육 의지',
        '④ 자녀 본인 의사 (만 13세 이상)',
        '⑤ 체계적 양육 계획서 제출',
      ],
      rate: '42%',
      description: '아빠 양육권 확보율 (전략 적용 시)',
    },
  ];

  const urgentSituations = [
    '상대방이 자녀를 데리고 가버림 (무단 인도)',
    '자녀 학대 또는 방임 의심',
    '상대방이 양육권 소송 제기 통보',
    '면접교섭이 장기간 거부되고 있음',
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white py-20">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Child Custody"
            title="양육권 확보 전략"
            subtitle="아이와 함께할 권리를 지키는 과학적 준비 시스템"
          />
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">87%</p>
              <p className="text-sm text-gray-600">양육권 확보율</p>
              <p className="text-xs text-gray-500 mt-1">더율 수임 사건 기준</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">10년+</p>
              <p className="text-sm text-gray-600">양육권 전문</p>
              <p className="text-xs text-gray-500 mt-1">200건 이상 수임</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <p className="text-3xl font-bold text-gray-900 mb-2">72시간</p>
              <p className="text-sm text-gray-600">긴급 대응</p>
              <p className="text-xs text-gray-500 mt-1">즉시 상담하세요</p>
            </div>
          </div>
        </section>

        {/* 긴급 상황 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                빠른 대응이 아이를 지킵니다
              </h2>
              <p className="text-gray-700 mb-4">
                다음 상황에서는 즉시 법률 자문을 받으세요
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {urgentSituations.map((situation, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <span className="text-gray-400 mt-1">⚠️</span>
                  <span className="text-gray-700">{situation}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-full font-bold text-lg hover:bg-rose-700 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 법률 자문받기 (1661-7633)
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
                "경제력이 없어도 이길 수 있었습니다"
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "남편은 대기업 임원이었고, 저는 파트타임으로 겨우 생활비를 벌고 있었습니다.
                '경제력이 없으면 양육권을 못 가져간다'는 말에 절망했었어요. 하지만 더율 변호사님은
                '엄마가 5년간 주 양육자였다는 것'이 가장 중요하다고 하셨습니다. 아이의 어린이집 선생님,
                소아과 의사 선생님 증언까지 준비했고, 결과는 제 승소였습니다. 지금 아이는 제 곁에서
                행복하게 자라고 있습니다."
              </blockquote>
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div>
                  <p className="font-bold text-gray-900">L씨 (30대 여성)</p>
                  <p className="text-sm text-gray-600">8년 혼인 · 자녀 1명 (만 5세)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">단독 양육권</p>
                  <p className="text-sm text-gray-600">+ 월 150만원 양육비</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 신뢰 배지 */}
        <TrustBadges />

        {/* 공감 메시지 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16 mt-16">
          <div className="bg-pink-50 rounded-2xl p-8 border-2 border-pink-200">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                아이를 사랑하는 마음만큼은 누구에게도 지지 않으실 겁니다
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                많은 분들이 <strong>"경제력이 부족해서", "일을 해야 해서"</strong> 양육권을 포기합니다.<br />
                하지만 판사가 보는 건 <strong>돈이 아니라 '누가 더 아이를 잘 키웠는가'</strong>입니다.<br />
                ① 주 양육자 지위 ② 안정적 양육 환경 ③ 정서적 유대감 - 이 3가지가 핵심입니다.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                경제력이 없어도, 일을 해도, 엄마(아빠)는 이길 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 준비 서류 체크리스트 */}
        <DocumentChecklist pageType="custody" />

        {/* 판사 체크리스트 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Judge's Criteria"
            title="판사가 보는 핵심 요소"
            subtitle="엄마 vs 아빠, 무엇이 다르게 평가되는가?"
          />

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {judgeChecklist.map((checklist, index) => (
              <button
                key={index}
                onClick={() => setActiveChecklist(index)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeChecklist === index
                    ? index === 0
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {checklist.title}
              </button>
            ))}
          </div>

          <div className={`bg-gradient-to-br ${activeChecklist === 0 ? 'from-pink-50' : 'from-blue-50'} to-white rounded-2xl p-8 border-2 ${activeChecklist === 0 ? 'border-pink-200' : 'border-blue-200'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{judgeChecklist[activeChecklist].title}</h3>
                <ul className="space-y-3">
                  {judgeChecklist[activeChecklist].items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className={activeChecklist === 0 ? 'text-pink-500 font-bold' : 'text-blue-500 font-bold'}>{item.split(' ')[0]}</span>
                      <span className="text-gray-700">{item.substring(item.indexOf(' ') + 1)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${activeChecklist === 0 ? 'bg-pink-100' : 'bg-blue-100'} rounded-xl p-6 text-center flex flex-col justify-center`}>
                <p className="text-5xl font-bold mb-2" style={{ color: activeChecklist === 0 ? '#ec4899' : '#3b82f6' }}>
                  {judgeChecklist[activeChecklist].rate}
                </p>
                <p className="text-gray-700 font-semibold mb-4">{judgeChecklist[activeChecklist].description}</p>
                <p className="text-xs text-gray-600">
                  {activeChecklist === 0
                    ? '만 5세 이하 자녀의 경우 엄마 유리 (가사법 기준)'
                    : '전략적 접근으로 일반 아빠 승소율(15%)의 2.8배'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 상담 프롬프트 */}
        <LandingConsultationPrompt topic="양육권" variant="reassurance" />

        {/* 소송 진행 과정 */}
        <LitigationTimeline pageType="custody" />

        {/* 성공 사례 */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <SectionHeader
            label="Success Stories"
            title="실제 양육권 확보 사례"
            subtitle="경제력이 아닌, 사랑과 전략으로 이긴 사례들"
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
        <EvidenceGallery pageType="custody" />

        {/* 상담 신청 폼 */}
        <section id="consultation-form" className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <QuickConsultationForm pageType="custody" />
        </section>

        {/* FAQ */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              양육권 자주 묻는 질문
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '경제력이 없어도 양육권을 가질 수 있나요?',
                  a: '네, 가능합니다. 법원은 ① 주 양육자 지위, ② 양육 의지와 능력, ③ 자녀와의 정서적 유대를 종합 평가합니다. 경제력은 양육비로 보완 가능하므로 절대적 요소가 아닙니다. 실제로 더율이 수임한 사건 중 70% 이상이 경제력이 약한 측의 승소였습니다.',
                },
                {
                  q: '자녀가 원하면 양육권이 결정되나요?',
                  a: '만 13세 이상 자녀는 법원에서 직접 의견을 청취하며, 이는 매우 중요한 판단 요소입니다. 만 10-12세는 간접적으로 의사를 확인하며, 만 5세 미만은 주 양육자를 우선합니다. 단, 자녀 의사가 부모의 압박으로 왜곡되었다면 참고하지 않습니다.',
                },
                {
                  q: '상대방이 아이를 데리고 가버렸어요. 어떻게 하나요?',
                  a: '72시간 내 ① 임시양육자 지정 신청, ② 자녀 인도 심판 청구를 해야 합니다. 시간이 지날수록 "현재 양육 상태 유지"가 유리해져 불리해집니다. 즉시 법률 자문을 받고 긴급조치를 취하세요.',
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
                href="/faq?category=양육권"
                className="text-gray-900 font-semibold hover:underline"
              >
                양육권 관련 FAQ 전체 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 비용 안내 */}
        <CostTransparency pageType="custody" />

        {/* CTA */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12">
          <CTABox
            title="다음은 당신과 아이 차례입니다"
            description="오늘 상담하면 양육 계획서 무료 작성"
          >
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <p className="text-sm font-semibold flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                이번 달 17분의 부모님께 아이와 함께할 길을 열어드렸습니다
              </p>
            </div>

            <p className="text-sm text-gray-300 mb-8">
              초회 상담 무료 · 양육권 전문 10년 · 87% 확보율 · 긴급 대응 가능
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
                href="/child-support-calculator"
                variant="secondary"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                양육비 계산하기
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
