'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Home, Calculator, Building, Coins, TrendingUp, Shield, AlertCircle, Check, ArrowRight, Phone, MessageSquare, Calendar, Users } from 'lucide-react'

export default function PropertyLandingClient() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const propertyTypes = [
    {
      icon: <Home className="w-6 h-6" />,
      title: '부동산',
      items: ['아파트', '주택', '토지', '상가'],
      description: '시가 기준 평가'
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: '금융자산',
      items: ['예금', '적금', '펀드', '보험'],
      description: '잔액 증명 기준'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: '주식/투자',
      items: ['상장주식', '비상장주식', '가상자산'],
      description: '시가 평가'
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: '사업체/퇴직금',
      items: ['개인사업', '법인지분', '퇴직금', '연금'],
      description: '감정평가 필요'
    }
  ]

  const divisionRatios = [
    {
      case: '전업주부 20년',
      ratio: '50:50',
      description: '장기간 가사노동 기여도 인정'
    },
    {
      case: '맞벌이 부부',
      ratio: '40~60%',
      description: '소득 비율과 가사 기여도 고려'
    },
    {
      case: '단기 혼인 (3년 미만)',
      ratio: '20~30%',
      description: '혼인 기간과 기여도 비례'
    },
    {
      case: '특유재산 증식',
      ratio: '10~30%',
      description: '관리/증식 기여분만 인정'
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: '재산 목록 작성',
      description: '공동재산과 특유재산 구분',
      details: ['부동산 등기부등본', '금융자산 잔액증명', '부채 증빙서류']
    },
    {
      number: '02',
      title: '재산 가치 평가',
      description: '시가 기준 객관적 평가',
      details: ['감정평가', '시세 조회', '전문가 자문']
    },
    {
      number: '03',
      title: '기여도 산정',
      description: '경제적/비경제적 기여 입증',
      details: ['소득 증빙', '가사노동 입증', '육아 기여도']
    },
    {
      number: '04',
      title: '분할 비율 결정',
      description: '법원 기준에 따른 공정한 분할',
      details: ['판례 분석', '협상 전략', '최종 합의']
    }
  ]

  const hiddenAssets = [
    '명의신탁 부동산',
    '차명계좌 예금',
    '해외 자산',
    '가상화폐',
    '대여금/채권',
    '골프회원권',
    '고가 예술품',
    '명품/귀금속'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              이혼 재산분할 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              당신이 지켜온 재산,<br />
              <span className="text-yellow-300">정당하게 분할</span>받으세요
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12년 경력, 1,200건 이상 처리한 재산분할 전문 변호사가<br className="sm:hidden" />
              숨겨진 재산까지 찾아 공정한 분할을 실현합니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                무료 재산분할 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-amber-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-700/70 transition-all border-2 border-white/30"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                전화 상담 1661-7633
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">12년</div>
                <div className="text-sm text-white/80 mt-1">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">1,200건+</div>
                <div className="text-sm text-white/80 mt-1">사건 처리</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">비밀 100%</div>
                <div className="text-sm text-white/80 mt-1">보장</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-amber-600">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/services" className="text-gray-500 hover:text-amber-600">전문 서비스</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-amber-600 font-medium">재산분할</span>
          </nav>
        </div>
      </div>

      {/* Empathy Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-amber-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              함께 일궈온 삶, 이제는 정당한 마무리가 필요합니다
            </h2>

            <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
              수년, 혹은 수십년간 함께 만들어온 재산을 나누는 일.<br />
              단순한 숫자의 문제가 아닌, 당신의 노력과 헌신에 대한 인정입니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <div className="text-3xl mb-3">🏠</div>
                <h4 className="font-bold mb-2 text-gray-900">정든 집을 떠나야 할까봐</h4>
                <p className="text-sm text-gray-600">
                  함께 만든 보금자리,<br />
                  당신의 권리를 지켜드립니다
                </p>
              </div>

              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-bold mb-2 text-gray-900">미래가 불안하신가요?</h4>
                <p className="text-sm text-gray-600">
                  경제적 자립을 위한<br />
                  정당한 분할을 실현합니다
                </p>
              </div>

              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-bold mb-2 text-gray-900">믿고 맡길 수 있을까?</h4>
                <p className="text-sm text-gray-600">
                  1,200건의 경험으로<br />
                  끝까지 함께합니다
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-orange-600 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">
                법무법인 더율은 12년간 1,200건 이상의 재산분할 사건을 처리하며 의뢰인의 마음을 이해해왔습니다.
              </p>
              <p className="text-gray-700">
                모든 상담은 철저히 비밀이 보장되며, 당신이 받아야 할 정당한 재산을 확보할 수 있도록
                처음부터 끝까지 함께하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Concept Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">재산분할, 무엇을 나누는가?</h2>
            <p className="text-gray-600">혼인 중 형성된 모든 재산이 분할 대상입니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertyTypes.map((type, idx) => (
              <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="text-amber-600 mb-4">{type.icon}</div>
                <h3 className="font-bold text-lg mb-2">{type.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{type.description}</p>
                <ul className="space-y-1">
                  {type.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm text-gray-700 flex items-center">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Hidden Assets Alert */}
          <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">배우자가 숨긴 재산도 찾아냅니다</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {hiddenAssets.map((asset, idx) => (
                    <span key={idx} className="text-sm bg-white px-3 py-1 rounded-full text-gray-700">
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Division Ratio Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">재산분할 비율은 어떻게 정해지나요?</h2>
            <p className="text-gray-600">기여도에 따라 20~50%까지 인정됩니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {divisionRatios.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{item.case}</h3>
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold">
                    {item.ratio}
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-amber-100 px-6 py-3 rounded-full">
              <Calculator className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-medium">무료 재산분할 예상 계산 →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">재산분할 진행 과정</h2>
            <p className="text-gray-600">체계적인 4단계 프로세스로 최대 분할을 실현합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-amber-300 -ml-3" />
                  </div>
                )}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-amber-600/20 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-gray-500 flex items-start">
                        <span className="text-amber-500 mr-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">실제 성공 사례</h2>
            <p className="text-gray-600">법무법인 더율이 성취한 재산분할 승소 사례</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                승소
              </div>
              <h3 className="font-bold text-lg mb-2">은닉 재산 70억 발견</h3>
              <p className="text-gray-600 text-sm mb-4">
                차명계좌와 해외 부동산을 추적하여 숨겨진 재산 70억원을 찾아내 의뢰인이 35억원을 분할받은 사례
              </p>
              <div className="pt-4 border-t">
                <div className="text-2xl font-bold text-amber-600">35억원 획득</div>
                <div className="text-sm text-gray-500">분할 비율 50%</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                승소
              </div>
              <h3 className="font-bold text-lg mb-2">전업주부 20년 인정</h3>
              <p className="text-gray-600 text-sm mb-4">
                20년간 전업주부로 헌신한 기여도를 인정받아 남편 재산의 50%인 12억원을 분할받은 사례
              </p>
              <div className="pt-4 border-t">
                <div className="text-2xl font-bold text-amber-600">12억원 획득</div>
                <div className="text-sm text-gray-500">분할 비율 50%</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                승소
              </div>
              <h3 className="font-bold text-lg mb-2">사업체 지분 평가</h3>
              <p className="text-gray-600 text-sm mb-4">
                비상장 법인의 실제 가치를 정확히 평가하여 저평가된 지분가치를 3배 상향, 8억원 추가 확보
              </p>
              <div className="pt-4 border-t">
                <div className="text-2xl font-bold text-amber-600">8억원 추가</div>
                <div className="text-sm text-gray-500">평가액 3배 상향</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/cases" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700">
              더 많은 성공사례 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-600 to-orange-500 rounded-3xl p-12 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  재산분할 전문 변호사가<br />
                  직접 담당합니다
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">임은지 변호사</h3>
                      <p className="text-white/90 text-sm">재산분할 전문 12년 경력, 대한변협 가사법 전문</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">전담 팀 구성</h3>
                      <p className="text-white/90 text-sm">회계사, 감정평가사, 금융전문가 협업</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TrendingUp className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">재산 추적 시스템</h3>
                      <p className="text-white/90 text-sm">숨겨진 재산 발견율 89%, 평균 30% 추가 확보</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">무료 상담에서 확인하세요</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-300 mr-2" />
                    <span>예상 분할 금액 계산</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-300 mr-2" />
                    <span>숨겨진 재산 추적 방법</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-300 mr-2" />
                    <span>승소 가능성 진단</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-300 mr-2" />
                    <span>절세 전략 상담</span>
                  </li>
                </ul>
                <Link
                  href="/booking"
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all inline-block text-center"
                >
                  무료 상담 신청하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            당신의 미래를 위한 첫 걸음, 함께 시작하세요
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            청구 시효 2년, 지금이 가장 적절한 시기입니다
          </p>

          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <Link
              href="/booking"
              className="bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              상담 예약
            </Link>
            <a
              href="tel:1661-7633"
              className="bg-white text-amber-600 px-6 py-4 rounded-xl font-bold hover:bg-amber-50 transition-all border-2 border-amber-200 flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              전화 상담
            </a>
            <a
              href="https://pf.kakao.com/_xmLWxkK"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 text-gray-800 px-6 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all flex items-center justify-center"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              카톡 상담
            </a>
          </div>

          <p className="text-sm text-gray-500">
            상담은 100% 무료이며, 비밀이 보장됩니다
          </p>
        </div>
      </section>

      {/* Floating CTA - Mobile Only */}
      {scrolled && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
          <Link
            href="/booking"
            className="w-full bg-gray-900 text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-all inline-block text-center"
          >
            무료 재산분할 상담 신청
          </Link>
        </div>
      )}
    </div>
  )
}