'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Baby, Heart, Scale, Users, Shield, Check, ArrowRight, Phone, MessageSquare, Calendar, AlertCircle, BookOpen, Home } from 'lucide-react'

export default function CustodyLandingClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const custodyVsParentalRights = [
    {
      type: '양육권',
      definition: '자녀를 직접 키우고 돌볼 권리',
      includes: ['거주지 결정', '일상적 양육', '교육 결정', '의료 결정'],
      whoGets: '부 또는 모 중 1명'
    },
    {
      type: '친권',
      definition: '자녀의 법적 대리인 역할',
      includes: ['재산 관리', '법률행위 대리', '중요 계약', '상속 등'],
      whoGets: '부모 공동 또는 단독'
    }
  ]

  const decisionFactors = [
    {
      icon: <Baby className="w-5 h-5" />,
      factor: '자녀의 나이',
      detail: '영유아는 모에게 유리, 청소년은 의사 존중',
      weight: '높음'
    },
    {
      icon: <Heart className="w-5 h-5" />,
      factor: '양육 의지',
      detail: '직접 양육 의사와 구체적 계획',
      weight: '매우 높음'
    },
    {
      icon: <Home className="w-5 h-5" />,
      factor: '양육 환경',
      detail: '주거, 경제력, 교육 환경',
      weight: '높음'
    },
    {
      icon: <Users className="w-5 h-5" />,
      factor: '주 양육자',
      detail: '기존 주 양육자가 누구였는지',
      weight: '매우 높음'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      factor: '자녀의 의사',
      detail: '만 13세 이상은 의견 청취 필수',
      weight: '중요'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      factor: '부모의 양육능력',
      detail: '건강, 직업, 생활 패턴 등',
      weight: '높음'
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: '양육권 조사',
      description: '현재 양육 상황 및 증거 수집',
      details: ['주 양육자 입증', '양육 환경 조사', '자녀 의사 확인']
    },
    {
      number: '02',
      title: '협의 또는 소송',
      description: '합의 시도 후 법원 결정',
      details: ['양육 협의', '조정 신청', '소송 진행']
    },
    {
      number: '03',
      title: '가사조사 대응',
      description: '법원의 양육 환경 조사',
      details: ['가정방문 준비', '면담 대응', '보고서 검토']
    },
    {
      number: '04',
      title: '양육권 확정',
      description: '법원 결정 및 이행',
      details: ['판결 확정', '인도 청구', '면접교섭 결정']
    }
  ]

  const changeReasons = [
    '기존 양육자의 양육 태만',
    '자녀 학대 또는 방임',
    '양육 환경의 급격한 악화',
    '자녀의 명시적 의사 변경',
    '양육자의 건강 악화',
    '자녀의 복리에 현저히 반하는 상황'
  ]

  const commonConcerns = [
    {
      emoji: '👩',
      title: '엄마가 무조건 유리한가요?',
      solution: '영유아기에는 유리하나, 절대적 기준은 아닙니다'
    },
    {
      emoji: '💼',
      title: '일이 바빠서 걱정이에요',
      solution: '직장이 있어도 양육 의지와 계획이 중요합니다'
    },
    {
      emoji: '🏠',
      title: '경제력이 부족한데',
      solution: '경제력보다 양육 의지와 환경이 우선입니다'
    },
    {
      emoji: '👶',
      title: '아이를 빼앗길까 두려워요',
      solution: '주 양육자였다면 유리한 위치에 있습니다'
    }
  ]

  const jointCustody = {
    definition: '부모가 함께 자녀를 양육하는 형태',
    types: [
      { name: '물리적 공동양육', desc: '일정 기간씩 번갈아 양육' },
      { name: '법적 공동양육', desc: '중요 결정을 공동으로 결정' }
    ],
    pros: ['부모 모두와의 관계 유지', '양육 부담 분산', '자녀의 정서적 안정'],
    cons: ['부모 간 갈등 시 어려움', '자녀의 혼란 가능', '거주지 제약']
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-purple-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              양육권 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              아이의 최선의 이익,<br />
              <span className="text-purple-200">함께 지켜냅니다</span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12년 경력, 1,200건 이상 처리한 양육권 전문 변호사가<br className="sm:hidden" />
              양육권 결정부터 변경까지 아이의 행복을 최우선으로 합니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                무료 양육권 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-purple-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700/70 transition-all border-2 border-white/30"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                전화 상담 1661-7633
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">12년</div>
                <div className="text-sm text-white/80 mt-1">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">1,200건+</div>
                <div className="text-sm text-white/80 mt-1">사건 처리</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">비밀 100%</div>
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
            <Link href="/" className="text-gray-500 hover:text-purple-600">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/faq" className="text-gray-500 hover:text-purple-600">이혼큐레이션</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-purple-600 font-medium">양육권</span>
          </nav>
        </div>
      </div>

      {/* Empathy Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-purple-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              아이의 미래가 걸린 중요한 결정
            </h2>

            <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
              양육권은 단순히 누가 키우느냐의 문제가 아닙니다.<br />
              아이의 행복과 미래가 달린 가장 중요한 결정입니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl mb-3">👶</div>
                <h4 className="font-bold mb-2 text-gray-900">아이를 지키고 싶어요</h4>
                <p className="text-sm text-gray-600">
                  내가 키워야<br />
                  아이가 행복할 수 있어요
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl mb-3">😰</div>
                <h4 className="font-bold mb-2 text-gray-900">어떻게 준비해야 할까요?</h4>
                <p className="text-sm text-gray-600">
                  법원은 무엇을<br />
                  중요하게 볼까요?
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl mb-3">🛡️</div>
                <h4 className="font-bold mb-2 text-gray-900">전문가가 필요해요</h4>
                <p className="text-sm text-gray-600">
                  양육권 분쟁,<br />
                  혼자 하기 어려워요
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-pink-600 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">
                법무법인 더율은 12년간 1,200건 이상의 양육권 사건을 처리하며 부모와 아이를 도왔습니다.
              </p>
              <p className="text-gray-700">
                가사조사 대응부터 법원 변론까지, 아이의 최선의 이익을 위해
                처음부터 끝까지 함께하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custody vs Parental Rights */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육권과 친권의 차이</h2>
            <p className="text-gray-600">두 개념을 정확히 이해하고 전략을 세워야 합니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {custodyVsParentalRights.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-3 text-purple-600">{item.type}</h3>
                <p className="text-gray-700 mb-4 font-medium">{item.definition}</p>
                <div className="mb-4">
                  <h4 className="font-bold text-sm text-gray-600 mb-2">포함 내용:</h4>
                  <ul className="space-y-1">
                    {item.includes.map((include, includeIdx) => (
                      <li key={includeIdx} className="text-sm text-gray-700 flex items-center">
                        <Check className="w-3 h-3 text-purple-500 mr-2" />
                        {include}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <span className="text-xs text-gray-500">누가 갖나요?</span>
                  <p className="font-bold text-gray-900">{item.whoGets}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center max-w-3xl mx-auto">
            <p className="text-gray-700">
              <AlertCircle className="inline-block w-5 h-5 text-purple-600 mr-2" />
              양육권과 친권은 분리 가능합니다. 양육권은 A에게, 친권은 B에게 줄 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Decision Factors */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">법원은 무엇을 보고 결정하나요?</h2>
            <p className="text-gray-600">양육권 결정의 핵심 기준 6가지</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decisionFactors.map((factor, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="text-purple-600 mb-3">{factor.icon}</div>
                <h3 className="font-bold text-lg mb-2">{factor.factor}</h3>
                <p className="text-gray-600 text-sm mb-3">{factor.detail}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  factor.weight === '매우 높음' ? 'bg-purple-100 text-purple-700' :
                  factor.weight === '높음' ? 'bg-pink-100 text-pink-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  중요도: {factor.weight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육권 결정 절차</h2>
            <p className="text-gray-600">체계적인 4단계로 양육권을 확보합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-purple-300 -ml-3" />
                  </div>
                )}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-purple-600/20 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-gray-500 flex items-start">
                        <span className="text-purple-500 mr-1">•</span>
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

      {/* Joint Custody */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">공동양육권이란?</h2>
            <p className="text-gray-600">부모가 함께 자녀를 양육하는 형태</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
              <p className="text-lg text-gray-700 mb-6">{jointCustody.definition}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {jointCustody.types.map((type, idx) => (
                  <div key={idx} className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-bold mb-2">{type.name}</h4>
                    <p className="text-sm text-gray-600">{type.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-green-600 mb-3 flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    장점
                  </h4>
                  <ul className="space-y-2">
                    {jointCustody.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-red-600 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    단점
                  </h4>
                  <ul className="space-y-2">
                    {jointCustody.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Change Reasons */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">양육권 변경이 가능한 경우</h2>
            <p className="text-gray-600">사정 변경이 있으면 양육권을 변경할 수 있습니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {changeReasons.map((reason, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 flex items-center shadow hover:shadow-lg transition-all">
                <Check className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800">{reason}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white border-2 border-purple-200 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-gray-700 text-center">
              <AlertCircle className="inline-block w-5 h-5 text-purple-600 mr-2" />
              양육권 변경은 자녀의 복리에 현저히 필요한 경우에만 인정됩니다
            </p>
          </div>
        </div>
      </section>

      {/* Common Concerns */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">이런 고민 하고 계신가요?</h2>
            <p className="text-gray-600">많은 분들이 같은 걱정을 하십니다</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {commonConcerns.map((concern, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
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
              href="/faq?category=custody"
              className="inline-flex items-center text-purple-600 font-medium hover:text-purple-700"
            >
              양육권 FAQ 12개 더 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                양육권 전문 변호사가<br />
                직접 담당합니다
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">임은지 변호사</h3>
                    <p className="text-white/90 text-sm">양육권 전문 12년 경력, 가사조사 대응 전문</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Heart className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">아이 중심 해결</h3>
                    <p className="text-white/90 text-sm">자녀의 최선의 이익을 최우선으로</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Scale className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">양육권 확보율 89%</h3>
                    <p className="text-white/90 text-sm">체계적 준비로 높은 승소율 달성</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">무료 상담에서 확인하세요</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-200 mr-2" />
                  <span>양육권 확보 가능성 진단</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-200 mr-2" />
                  <span>가사조사 대응 전략</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-200 mr-2" />
                  <span>증거 수집 방법 안내</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-purple-200 mr-2" />
                  <span>예상 절차 및 기간</span>
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
      <section className="py-20 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            아이의 행복한 미래, 함께 만들어갑니다
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            양육권 고민, 더 이상 혼자 하지 마세요
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
              className="bg-white text-purple-600 px-6 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all border-2 border-purple-200 flex items-center justify-center"
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
            무료 양육권 상담 신청
          </Link>
        </div>
      )}
    </div>
  )
}
