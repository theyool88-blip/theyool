'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, DollarSign, FileText, Scale, TrendingUp, AlertCircle, Check, ArrowRight, Phone, MessageSquare, Calendar, Shield, Heart, Baby, Calculator } from 'lucide-react'

export default function ChildSupportLandingClient() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const supportAmounts = [
    {
      age: '0-2세',
      income200: '30-40만원',
      income300: '40-50만원',
      income400: '50-60만원',
      income500: '60-80만원'
    },
    {
      age: '3-5세',
      income200: '35-45만원',
      income300: '45-55만원',
      income400: '55-70만원',
      income500: '70-90만원'
    },
    {
      age: '6-11세',
      income200: '40-50만원',
      income300: '50-65만원',
      income400: '65-80만원',
      income500: '80-100만원'
    },
    {
      age: '12-17세',
      income200: '45-60만원',
      income300: '60-75만원',
      income400: '75-95만원',
      income500: '95-120만원'
    }
  ]

  const enforcementMethods = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: '급여 압류',
      description: '상대방 월급에서 직접 공제',
      effectiveness: '가장 효과적',
      color: 'green'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: '재산 압류',
      description: '예금, 부동산, 차량 등 압류',
      effectiveness: '강력한 수단',
      color: 'blue'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: '감치 명령',
      description: '최대 30일 구치소 유치',
      effectiveness: '즉각 압박',
      color: 'orange'
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '신용불량 등록',
      description: '미지급 500만원 이상 시',
      effectiveness: '심리적 압박',
      color: 'red'
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: '양육비 산정',
      description: '표준양육비표 기준 계산',
      details: ['소득 확인', '자녀 나이', '특별 사정 반영']
    },
    {
      number: '02',
      title: '청구 신청',
      description: '협의 또는 소송 제기',
      details: ['협의 시도', '조정 신청', '소송 진행']
    },
    {
      number: '03',
      title: '결정 확정',
      description: '법원 결정 또는 합의',
      details: ['판결문 수령', '합의서 작성', '집행권원 확보']
    },
    {
      number: '04',
      title: '강제 집행',
      description: '미지급 시 법적 조치',
      details: ['급여 압류', '재산 압류', '감치 신청']
    }
  ]

  const changeReasons = [
    {
      type: '증액',
      reasons: ['상대방 소득 증가', '자녀 교육비 증가', '물가 상승', '의료비 증가'],
      icon: <TrendingUp className="w-5 h-5 text-green-600" />
    },
    {
      type: '감액',
      reasons: ['지급자 소득 감소', '자녀 성년', '양육권 변경', '재혼 등 사정 변경'],
      icon: <TrendingUp className="w-5 h-5 text-blue-600 rotate-180" />
    }
  ]

  const commonConcerns = [
    {
      emoji: '💸',
      title: '3년째 양육비를 안 줘요',
      solution: '과거 미지급분도 소급하여 청구 가능합니다'
    },
    {
      emoji: '📉',
      title: '상대방이 무직이라고 해요',
      solution: '잠재적 근로능력을 기준으로 산정합니다'
    },
    {
      emoji: '💰',
      title: '양육비가 너무 적어요',
      solution: '증액 청구로 정당한 금액을 받으세요'
    },
    {
      emoji: '⚖️',
      title: '법적 절차가 복잡해요',
      solution: '전문 변호사가 처음부터 끝까지 대리합니다'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-green-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              양육비 청구 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              안 주는 양육비,<br />
              <span className="text-green-200">반드시 받아낼 수 있습니다</span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12년 경력, 1,200건 이상 처리한 양육비 전문 변호사가<br className="sm:hidden" />
              미지급 강제집행부터 증액까지 아이의 권리를 지킵니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                무료 양육비 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-green-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700/70 transition-all border-2 border-white/30"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                전화 상담 1661-7633
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">12년</div>
                <div className="text-sm text-white/80 mt-1">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">1,200건+</div>
                <div className="text-sm text-white/80 mt-1">사건 처리</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">비밀 100%</div>
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
            <Link href="/" className="text-gray-500 hover:text-green-600">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/faq" className="text-gray-500 hover:text-green-600">이혼큐레이션</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-green-600 font-medium">양육비</span>
          </nav>
        </div>
      </div>

      {/* Empathy Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-green-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              혼자 키우는 것도 힘든데, 양육비까지 안 준다면
            </h2>

            <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
              아이를 키우는 데 드는 비용, 혼자 감당하지 마세요.<br />
              양육비는 아이의 당연한 권리입니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl mb-3">👶</div>
                <h4 className="font-bold mb-2 text-gray-900">아이 키우기도 벅찬데</h4>
                <p className="text-sm text-gray-600">
                  교육비, 생활비,<br />
                  모두 혼자 감당하고 계신가요?
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl mb-3">😔</div>
                <h4 className="font-bold mb-2 text-gray-900">연락도 안 되는 상대방</h4>
                <p className="text-sm text-gray-600">
                  약속만 하고 안 주거나<br />
                  아예 잠적한 경우도
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl mb-3">💪</div>
                <h4 className="font-bold mb-2 text-gray-900">법적으로 받을 수 있습니다</h4>
                <p className="text-sm text-gray-600">
                  강제집행으로<br />
                  확실하게 받아냅니다
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-emerald-600 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">
                법무법인 더율은 12년간 1,200건 이상의 양육비 사건을 처리하며 미지급 양육비를 받아냈습니다.
              </p>
              <p className="text-gray-700">
                급여 압류부터 감치 명령까지, 모든 법적 수단을 동원하여
                당신 아이의 정당한 권리를 반드시 지켜내겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Amount Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육비는 얼마나 받을 수 있나요?</h2>
            <p className="text-gray-600">자녀 나이와 부모 합산 소득에 따라 결정됩니다</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl overflow-hidden">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">자녀 나이</th>
                  <th className="px-4 py-3 text-center">200만원</th>
                  <th className="px-4 py-3 text-center">300만원</th>
                  <th className="px-4 py-3 text-center">400만원</th>
                  <th className="px-4 py-3 text-center">500만원+</th>
                </tr>
              </thead>
              <tbody>
                {supportAmounts.map((row, idx) => (
                  <tr key={idx} className="border-t border-green-200">
                    <td className="px-4 py-4 font-bold text-gray-900">{row.age}</td>
                    <td className="px-4 py-4 text-center text-gray-700">{row.income200}</td>
                    <td className="px-4 py-4 text-center text-gray-700">{row.income300}</td>
                    <td className="px-4 py-4 text-center text-gray-700">{row.income400}</td>
                    <td className="px-4 py-4 text-center text-gray-700">{row.income500}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center">
            <p className="text-gray-700 mb-2">
              <Calculator className="inline-block w-5 h-5 text-green-600 mr-2" />
              위 금액은 표준양육비 기준이며, 실제 금액은 개별 사정에 따라 달라집니다
            </p>
            <Link
              href="/booking"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-all mt-2"
            >
              내 양육비 무료 계산 받기
            </Link>
          </div>
        </div>
      </section>

      {/* Enforcement Methods */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">미지급 양육비, 이렇게 받아냅니다</h2>
            <p className="text-gray-600">법적 강제집행으로 확실하게 해결합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {enforcementMethods.map((method, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className={`text-${method.color}-600 mb-4`}>{method.icon}</div>
                <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <span className={`inline-block bg-${method.color}-100 text-${method.color}-700 px-3 py-1 rounded-full text-xs font-medium`}>
                  {method.effectiveness}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-2xl p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">과거 미지급 양육비도 받을 수 있습니다</h3>
                <p className="text-gray-700 mb-3">
                  3년치, 5년치 밀린 양육비도 소급하여 청구 가능합니다. 포기하지 마세요.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    과거 10년까지 소급 청구 가능
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    미지급 금액 + 지연이자 청구
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    일시금 또는 분할 지급 선택
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육비 청구 절차</h2>
            <p className="text-gray-600">체계적인 4단계로 확실하게 받아냅니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-green-300 -ml-3" />
                  </div>
                )}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-green-600/20 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-gray-500 flex items-start">
                        <span className="text-green-500 mr-1">•</span>
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

      {/* Change Reasons */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육비 증액·감액</h2>
            <p className="text-gray-600">사정 변경이 있으면 언제든 조정할 수 있습니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {changeReasons.map((change, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {change.icon}
                  <h3 className="font-bold text-xl ml-2">{change.type} 사유</h3>
                </div>
                <ul className="space-y-2">
                  {change.reasons.map((reason, reasonIdx) => (
                    <li key={reasonIdx} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Concerns */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">이런 고민 하고 계신가요?</h2>
            <p className="text-gray-600">많은 분들이 같은 걱정을 하십니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {commonConcerns.map((concern, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{concern.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{concern.title}</h3>
                    <p className="text-gray-600">{concern.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq?category=child-support"
              className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
            >
              양육비 FAQ 15개 더 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-500 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                양육비 전문 변호사가<br />
                직접 담당합니다
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">임은지 변호사</h3>
                    <p className="text-white/90 text-sm">양육비 전문 12년 경력, 강제집행 전문</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">미지급 회수율 92%</h3>
                    <p className="text-white/90 text-sm">급여압류·재산압류로 확실하게 집행</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">아이 중심 해결</h3>
                    <p className="text-white/90 text-sm">아이의 복리를 최우선으로 생각합니다</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">무료 상담에서 확인하세요</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-200 mr-2" />
                  <span>정확한 양육비 산정</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-200 mr-2" />
                  <span>미지급분 회수 전략</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-200 mr-2" />
                  <span>강제집행 절차 안내</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-200 mr-2" />
                  <span>증액 가능성 진단</span>
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-emerald-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            아이를 위한 정당한 권리, 지금 시작하세요
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            미지급 양육비, 더 이상 참지 마세요
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
              className="bg-white text-green-600 px-6 py-4 rounded-xl font-bold hover:bg-green-50 transition-all border-2 border-green-200 flex items-center justify-center"
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
            무료 양육비 상담 신청
          </Link>
        </div>
      )}
    </div>
  )
}
