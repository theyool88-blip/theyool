'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/layouts/PageLayout';
import Modal from '@/components/ui/Modal';
import EnhancedChannelSelector from '@/components/features/EnhancedChannelSelector';

export default function ConsultationClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const consultationTypes = [
    {
      id: 'phone',
      icon: '📞',
      title: '전화상담',
      subtitle: '10분 무료',
      description: '지금 바로 통화해서 급한 부분부터 해결하세요',
      duration: '10분 (무료)',
      bestFor: [
        '급하게 방향을 잡고 싶을 때',
        '간단한 법률 질문이 있을 때',
        '비용과 절차가 궁금할 때',
        '다른 상담 방식이 필요한지 확인하고 싶을 때',
      ],
      process: [
        '1661-7633 전화',
        '상황 간단히 설명 (익명 가능)',
        '변호사 직접 답변',
        '필요시 영상/방문상담 예약',
      ],
      cta: {
        text: '지금 전화하기',
        action: 'tel:1661-7633',
        color: 'gray-900',
      },
    },
    {
      id: 'video',
      icon: '💻',
      title: '영상상담',
      subtitle: '집에서 편하게',
      description: '화상으로 만나 자료를 보며 자세히 상담해요',
      duration: '30-60분',
      bestFor: [
        '다른 곳에서 상담받은 분',
        '집에서 편하게 상담하고 싶을 때',
        '자료를 함께 검토하고 싶을 때',
        '멀리 계셔서 방문이 어려울 때',
      ],
      process: [
        '예약 신청 (전화/카톡)',
        '일정 확인 후 줌/구글미트 링크 전송',
        '준비한 자료 화면 공유',
        '변호사와 1:1 상담',
      ],
      prepare: [
        '혼인관계증명서',
        '가족관계증명서',
        '관련 자료 (문자, 사진 등)',
      ],
      cta: {
        text: '영상상담 예약',
        action: 'modal',
        color: 'blue-600',
      },
    },
    {
      id: 'visit',
      icon: '🏢',
      title: '방문상담',
      subtitle: '대면으로 깊이 있게',
      description: '직접 만나 모든 서류를 검토하고 전략을 세워요',
      duration: '60-90분',
      bestFor: [
        '계약을 결정하기 전',
        '복잡한 사안으로 자세한 상담이 필요할 때',
        '변호사를 직접 만나보고 싶을 때',
        '모든 서류를 함께 검토하고 싶을 때',
      ],
      process: [
        '예약 신청 (전화/카톡)',
        '일정 및 방문 지점 확인',
        '준비물 안내 받기',
        '사무실 방문하여 전담 변호사와 상담',
      ],
      prepare: [
        '신분증',
        '혼인관계증명서',
        '가족관계증명서',
        '재산 관련 서류 (등기부등본, 통장사본 등)',
        '증거 자료 (문자, 녹취, 사진 등)',
      ],
      locations: [
        {
          name: '천안 주사무소',
          address: '충남 천안시 동남구 청수5로 11, 9층',
          parking: '건물 지하 주차장 이용 가능',
        },
        {
          name: '평택 분사무소',
          address: '경기 평택시 평남로 1029-1, 6층',
          parking: '인근 공영주차장 이용',
        },
      ],
      cta: {
        text: '방문상담 예약',
        action: 'modal',
        color: 'purple-600',
      },
    },
  ];

  const faqs = [
    {
      q: '상담비용이 궁금해요',
      a: '전화상담 10분은 무료입니다. 영상/방문상담은 첫 상담 시 5만원이며, 계약 시 수임료에서 공제됩니다. 단, 상담만 받으시는 경우에도 충분한 시간을 드리기 위해 책정된 금액입니다.',
    },
    {
      q: '예약 없이 방문해도 되나요?',
      a: '변호사 일정이 있어 예약제로 운영됩니다. 전화나 카톡으로 미리 예약해주시면 충분한 시간을 확보해드립니다. 급하신 경우 당일 예약도 가능합니다.',
    },
    {
      q: '배우자 몰래 상담받을 수 있나요?',
      a: '네, 가능합니다. 100% 비밀이 보장되며, 전화상담은 익명으로도 가능합니다. 방문 시에도 개별 상담실에서 진행되어 프라이버시가 철저히 보호됩니다.',
    },
    {
      q: '상담 후 꼭 계약해야 하나요?',
      a: '아닙니다. 상담만 받고 가셔도 괜찮습니다. 충분히 고민하시고 결정하시면 됩니다. 계약을 강요하지 않습니다.',
    },
    {
      q: '준비물이 없어도 상담 가능한가요?',
      a: '네, 가능합니다. 다만 관련 서류가 있으면 더 구체적인 상담이 가능합니다. 없으시면 상담 후 필요한 서류를 안내드립니다.',
    },
    {
      q: '상담 시간은 얼마나 걸리나요?',
      a: '전화상담은 10분 내외, 영상상담은 30-60분, 방문상담은 60-90분 정도 소요됩니다. 사안에 따라 더 길어질 수 있으며, 시간 제한 없이 충분히 상담드립니다.',
    },
    {
      q: '주말이나 저녁 시간도 상담 가능한가요?',
      a: '평일 9시-6시가 기본 운영시간이나, 사전 예약 시 주말이나 저녁 시간도 가능합니다. 예약 시 편하신 시간을 말씀해주세요.',
    },
    {
      q: '다른 변호사와 상담했는데 재상담 받아도 되나요?',
      a: '물론입니다. 오히려 비교 상담을 권장합니다. 다른 곳과 비교해서 더 나은 전략을 제시해드리겠습니다.',
    },
  ];

  const processTimeline = [
    {
      step: '01',
      title: '상담 예약',
      description: '전화(1661-7633) 또는 카톡으로 예약',
      duration: '1분',
    },
    {
      step: '02',
      title: '일정 확인',
      description: '편하신 날짜와 시간 조율',
      duration: '당일~1일',
    },
    {
      step: '03',
      title: '상담 진행',
      description: '전담 변호사와 1:1 상담',
      duration: '10-90분',
    },
    {
      step: '04',
      title: '방향 제시',
      description: '구체적인 전략과 비용 안내',
      duration: '상담 중',
    },
  ];

  const handleCta = (action: string) => {
    if (action === 'modal') {
      setIsModalOpen(true);
    } else if (action.startsWith('tel:')) {
      window.location.href = action;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50 via-white to-white pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide">
                CONSULTATION GUIDE
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                처음이신가요?<br />
                천천히 알려드릴게요
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                어떻게 시작해야 할지 막막하시죠.<br />
                편한 방법으로 시작하시면 됩니다
              </p>
            </div>

            {/* Quick CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full text-base hover:bg-gray-800 transition-all shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 바로 전화 (10분 무료)
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-8 py-4 rounded-full text-base border-2 border-gray-900 hover:bg-gray-50 transition-all shadow-lg"
              >
                영상/방문 예약하기
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
            </p>
          </div>
        </section>

        {/* Consultation Types */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                3가지 상담 방법
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                상황에 맞는 방법을 선택하세요
              </p>
            </div>

            <div className="space-y-8">
              {consultationTypes.map((type, index) => (
                <div
                  key={type.id}
                  className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left: Info */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-5xl">{type.icon}</span>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {type.title}
                          </h3>
                          <p className="text-blue-600 font-semibold">{type.subtitle}</p>
                        </div>
                      </div>

                      <p className="text-lg text-gray-600 mb-6">
                        {type.description}
                      </p>

                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">소요시간</p>
                        <p className="text-base font-semibold text-gray-900">{type.duration}</p>
                      </div>

                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-3">이런 분께 추천</p>
                        <ul className="space-y-2">
                          {type.bestFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-blue-600 flex-shrink-0 mt-1">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {type.prepare && (
                        <div className="mb-6">
                          <p className="text-sm text-gray-500 mb-3">준비물</p>
                          <ul className="space-y-2">
                            {type.prepare.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-gray-400 flex-shrink-0 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {type.locations && (
                        <div className="mb-6">
                          <p className="text-sm text-gray-500 mb-3">방문 가능 지점</p>
                          {type.locations.map((loc, idx) => (
                            <div key={idx} className="mb-4 last:mb-0">
                              <p className="font-semibold text-gray-900">{loc.name}</p>
                              <p className="text-sm text-gray-600">{loc.address}</p>
                              <p className="text-xs text-gray-500">{loc.parking}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Process */}
                    <div>
                      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                        <p className="text-sm text-gray-500 mb-4 font-semibold">진행 과정</p>
                        <ol className="space-y-3">
                          {type.process.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-gray-700 pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <button
                        onClick={() => handleCta(type.cta.action)}
                        className={`w-full py-4 bg-${type.cta.color} text-white rounded-full font-bold text-base hover:opacity-90 transition-all shadow-lg`}
                        style={{
                          backgroundColor: type.cta.color === 'gray-900' ? '#111827' : type.cta.color === 'blue-600' ? '#2563eb' : '#9333ea'
                        }}
                      >
                        {type.cta.text}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                상담 진행 과정
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                예약부터 상담까지, 이렇게 진행됩니다
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processTimeline.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-2 border-blue-100 h-full">
                    <div className="text-4xl font-black text-blue-600 mb-3">{item.step}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <p className="text-xs text-blue-600 font-semibold">{item.duration}</p>
                  </div>
                  {index < processTimeline.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Transparency */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                비용 안내
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                투명하게 알려드립니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-gray-200">
                <p className="text-sm text-gray-500 mb-2">전화상담</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">무료</p>
                <p className="text-sm text-gray-600">10분 내외</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-blue-200">
                <p className="text-sm text-gray-500 mb-2">영상상담</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">5만원</p>
                <p className="text-sm text-gray-600">30-60분</p>
              </div>
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-purple-200">
                <p className="text-sm text-gray-500 mb-2">방문상담</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">5만원</p>
                <p className="text-sm text-gray-600">60-90분</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                참고사항
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0 mt-1">•</span>
                  <span>영상/방문상담 비용은 계약 시 수임료에서 공제됩니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0 mt-1">•</span>
                  <span>수임료는 사안의 복잡도에 따라 달라지며, 상담 시 정확히 안내드립니다</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 flex-shrink-0 mt-1">•</span>
                  <span>경제적으로 어려우신 분은 법률구조공단 연계 가능합니다</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                자주 묻는 질문
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light">
                궁금하신 점을 미리 확인하세요
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
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
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">더 궁금한 점이 있으신가요?</p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                이혼큐레이션(Q&A) 전체 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              이제 시작해볼까요?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              전화 한 통이면 됩니다.<br />
              10분만 주세요. 방향을 잡아드릴게요
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-10 py-5 rounded-full text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                지금 바로 전화 → 1661-7633
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-10 py-5 rounded-full text-lg border-2 border-gray-900 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                영상/방문 예약하기
              </button>
            </div>

            <p className="mt-6 text-sm text-gray-500">
              100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
            </p>
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
