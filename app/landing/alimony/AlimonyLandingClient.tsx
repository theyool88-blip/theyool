'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, AlertCircle, TrendingUp, Scale, Clock, Shield } from 'lucide-react';

export default function AlimonyLandingClient() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-amber-50 px-6 py-2 rounded-full mb-6">
              <span className="text-sm font-semibold text-amber-700">12년 경력, 1,200건 이상 처리</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              정당한 위자료,<br />
              <span className="text-amber-100">안심하고 받으세요</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              평균 2,000~3,000만원, 법원 인정 기준<br />
              12년 경력 전문 변호사가 처음부터 끝까지 함께합니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-2xl hover:scale-105"
              >
                무료 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                전화: 1661-7633
              </a>
            </div>

            {/* 신뢰 배지 */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>12년 경력</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>1,200건+ 처리</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>비밀 100% 보장</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 위자료란? */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            위자료, 정확히 알고 청구하세요
          </h2>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-2 border-amber-200 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">위자료란?</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              이혼을 하게 된 것에 <strong className="text-orange-600">책임이 있는 배우자(유책배우자)</strong>에게
              이혼으로 인한 정신적 고통에 대한 배상을 청구하는 것입니다.
            </p>
            <p className="text-sm text-gray-600">
              📌 법적 근거: 민법 제806조 및 제843조
            </p>
          </div>

          {/* 핵심 정보 카드 */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-orange-400 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                <h4 className="font-bold text-lg">금액 범위</h4>
              </div>
              <p className="text-3xl font-bold text-orange-600 mb-2">500만원~5,000만원</p>
              <p className="text-sm text-gray-600">평균 2,000~3,000만원</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-orange-400 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
                <h4 className="font-bold text-lg">청구 기한</h4>
              </div>
              <p className="text-3xl font-bold text-orange-600 mb-2">3년</p>
              <p className="text-sm text-gray-600">이혼일로부터 3년 이내</p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-orange-400 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
                <h4 className="font-bold text-lg">재산분할</h4>
              </div>
              <p className="text-2xl font-bold text-orange-600 mb-2">별도 청구</p>
              <p className="text-sm text-gray-600">독립적으로 청구 가능</p>
            </div>
          </div>
        </div>
      </section>

      {/* 감정적 공감 섹션 */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              혼자 고민하지 마세요
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p className="text-center">
                이혼은 인생에서 가장 힘든 결정 중 하나입니다.<br />
                특히 배우자의 잘못으로 인한 이혼이라면, 그 고통은 더욱 클 수밖에 없습니다.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-3">💭</div>
                  <h4 className="font-bold mb-2 text-gray-900">이런 걱정 하시나요?</h4>
                  <p className="text-sm text-gray-600">
                    "위자료를 받을 수 있을까?<br />
                    얼마나 받을 수 있을까?"
                  </p>
                </div>

                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="font-bold mb-2 text-gray-900">비밀이 걱정되시나요?</h4>
                  <p className="text-sm text-gray-600">
                    "주변에 알려질까봐<br />
                    상담조차 망설여져요"
                  </p>
                </div>

                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-3xl mb-3">⚖️</div>
                  <h4 className="font-bold mb-2 text-gray-900">정당한 보상이 중요하시죠?</h4>
                  <p className="text-sm text-gray-600">
                    "받을 수 있는 만큼<br />
                    제대로 받고 싶어요"
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg mt-8">
                <p className="font-semibold text-gray-900 mb-2">
                  법무법인 더율은 12년간 1,200건 이상의 이혼 사건을 처리하며 의뢰인의 마음을 이해해왔습니다.
                </p>
                <p className="text-gray-700">
                  모든 상담은 철저히 비밀이 보장되며, 당신이 받아야 할 정당한 위자료를 받을 수 있도록
                  처음부터 끝까지 함께하겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 위자료를 받을 수 있는 경우 */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            이런 경우 위자료를 받을 수 있습니다
          </h2>
          <p className="text-center text-gray-600 mb-12">
            배우자의 잘못으로 이혼하게 되었다면 정당한 배상을 받으세요
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '배우자의 불륜',
                description: '부정행위(간통)가 명확한 경우, 배우자와 상간자 모두에게 청구 가능',
                severity: 'high'
              },
              {
                title: '가정폭력',
                description: '신체적, 정신적 학대로 혼인 관계가 파탄난 경우',
                severity: 'high'
              },
              {
                title: '악의의 유기',
                description: '정당한 이유 없이 가족을 버리고 생활비를 주지 않은 경우',
                severity: 'medium'
              },
              {
                title: '심각한 모욕·학대',
                description: '지속적인 언어폭력, 모욕으로 정신적 고통을 준 경우',
                severity: 'medium'
              },
              {
                title: '도박·낭비',
                description: '심각한 도박이나 낭비로 가정 경제를 파탄시킨 경우',
                severity: 'medium'
              },
              {
                title: '범죄 행위',
                description: '배우자의 범죄 행위로 혼인 관계 유지가 불가능한 경우',
                severity: 'medium'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  item.severity === 'high'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-orange-50 border-orange-200'
                } hover:shadow-lg transition-all`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
                    item.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
            <div className="flex items-start gap-3">
              <Scale className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2 text-gray-900">제3자에게도 청구 가능</h4>
                <p className="text-gray-700">
                  불륜 상대방(상간자), 혼인 파탄의 직접적 원인을 제공한 제3자에게도
                  위자료를 청구할 수 있습니다. 배우자와 별개로 독립적인 청구가 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 위자료 산정 기준 */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            위자료 금액, 이렇게 결정됩니다
          </h2>
          <p className="text-center text-gray-600 mb-12">
            법원은 다음 요소들을 종합적으로 고려하여 금액을 결정합니다
          </p>

          <div className="space-y-4 mb-12">
            {[
              {
                factor: '이혼에 이르게 된 경위와 유책의 정도',
                description: '누구의 잘못이 얼마나 큰지, 혼인 파탄의 주된 원인이 무엇인지'
              },
              {
                factor: '혼인 관계 파탄의 원인과 책임',
                description: '불륜, 폭력 등 구체적인 파탄 사유와 각 당사자의 책임 정도'
              },
              {
                factor: '당사자의 재산상태 및 생활 정도',
                description: '유책배우자의 경제적 능력과 생활 수준'
              },
              {
                factor: '당사자의 연령, 직업',
                description: '나이, 직업, 향후 경제활동 가능성 등'
              },
              {
                factor: '혼인 기간',
                description: '결혼 생활의 기간과 그 동안의 기여도'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-gray-900">{item.factor}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-6 rounded-xl">
            <h4 className="font-bold text-lg mb-3 text-gray-900">💡 알아두세요</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>우리나라는 위자료 산정 기준표가 없어, 법원이 개별 사안을 종합적으로 고려하여 직권으로 결정합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>특수한 직종이나 직책이 아닌 경우 5,000만원 이상은 매우 드뭅니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>최근 2023년 서울고등법원은 유책배우자에게 2억원의 위자료를 명령한 사례도 있습니다</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            실제 성공 사례
          </h2>
          <p className="text-center text-gray-600 mb-12">
            법무법인 더율이 의뢰인과 함께 이룬 결과입니다
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 사례 1 */}
            <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">배우자 불륜 사건</h3>
                  <p className="text-sm text-gray-500">40대 여성, 혼인 기간 15년</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">상황:</span>
                  <p className="text-sm text-gray-700">
                    남편의 지속적인 불륜 관계 발견, 증거 확보가 어려운 상황
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">전략:</span>
                  <p className="text-sm text-gray-700">
                    디지털 포렌식과 탐정을 통한 명확한 증거 수집, 상간자에게도 동시 청구
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-sm">결과:</span>
                  <p className="text-sm text-gray-700 font-semibold">
                    배우자 3,500만원 + 상간자 2,000만원 = 총 5,500만원 위자료 확보
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-xs text-gray-600 italic">
                  "혼자였다면 포기했을 거예요. 변호사님이 끝까지 함께해주셔서 정당한 보상을 받을 수 있었습니다."
                </p>
              </div>
            </div>

            {/* 사례 2 */}
            <div className="bg-white border-2 border-amber-200 rounded-2xl p-8 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  B
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">가정폭력 사건</h3>
                  <p className="text-sm text-gray-500">30대 여성, 혼인 기간 8년</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">상황:</span>
                  <p className="text-sm text-gray-700">
                    지속적인 신체적·정신적 폭력, 경찰 신고 이력 다수
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold text-sm">전략:</span>
                  <p className="text-sm text-gray-700">
                    경찰 신고 기록, 진단서, 증인 진술 등 체계적 증거 정리 및 제출
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold text-sm">결과:</span>
                  <p className="text-sm text-gray-700 font-semibold">
                    4,000만원 위자료 + 양육권 확보 + 양육비 월 150만원
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="text-xs text-gray-600 italic">
                  "아이들과 안전하게 새 출발할 수 있게 되었습니다. 믿고 맡기길 정말 잘했어요."
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/cases"
              className="inline-block bg-amber-100 text-amber-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-200 transition-all border-2 border-amber-300"
            >
              더 많은 성공사례 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 위자료 청구 프로세스 */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            위자료 청구 프로세스
          </h2>

          <div className="relative">
            {/* 세로 연결선 (모바일) */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-orange-500 md:hidden"></div>

            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: '무료 상담 및 사건 분석',
                  description: '이혼 사유와 증거를 검토하고, 위자료 청구 가능성과 예상 금액을 분석합니다.'
                },
                {
                  step: '02',
                  title: '증거 수집 및 보강',
                  description: '기존 증거를 검토하고 부족한 증거를 추가로 수집합니다. 필요시 디지털 포렌식, 탐정 등을 활용합니다.'
                },
                {
                  step: '03',
                  title: '위자료 청구',
                  description: '협의이혼의 경우 협상을 진행하고, 재판상 이혼의 경우 소장에 위자료 청구를 포함하여 제출합니다.'
                },
                {
                  step: '04',
                  title: '소송 진행 및 합의',
                  description: '법원 심리 과정에서 증거를 제출하고 주장을 펼칩니다. 유리한 조건의 합의를 시도합니다.'
                },
                {
                  step: '05',
                  title: '판결 및 강제집행',
                  description: '법원 판결을 받거나 합의를 완료합니다. 상대방이 지급하지 않을 경우 강제집행을 진행합니다.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start relative">
                  {/* 스텝 번호 */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg z-10">
                    {item.step}
                  </div>

                  {/* 내용 */}
                  <div className="flex-1 bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-orange-400 transition-all shadow-sm hover:shadow-lg">
                    <h3 className="font-bold text-xl mb-2 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-600 via-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            정당한 위자료,<br />
            지금 바로 상담받으세요
          </h2>

          <p className="text-xl mb-8 text-white/90">
            12년 경력 전문 변호사가 처음부터 끝까지 함께합니다
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/booking"
              className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-800 transition-all shadow-2xl hover:scale-105"
            >
              무료 상담 신청 →
            </Link>
            <a
              href="tel:1661-7633"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all"
            >
              📞 1661-7633
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div>✓ 상담료 무료</div>
            <div>✓ 비밀 보장</div>
            <div>✓ 평일 09:00-18:00</div>
            <div>✓ 주말 예약 가능</div>
          </div>
        </div>
      </section>

      {/* Footer 링크 */}
      <section className="py-8 px-6 bg-gray-900 text-gray-400 text-center text-sm">
        <div className="max-w-4xl mx-auto space-y-2">
          <p>법무법인 더율 | 이혼 전문 변호사</p>
          <p>광고 책임 변호사: 임은지</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            <Link href="/" className="hover:text-white transition-colors">홈으로</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
