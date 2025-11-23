'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, FileText, Scale, Users, Clock, CheckCircle, AlertCircle, Check, ArrowRight, Phone, MessageSquare, Calendar, Shield, Heart, Home } from 'lucide-react'

export default function DivorceProcessLandingClient() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const divorceTypes = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '협의이혼',
      duration: '3~4주',
      difficulty: '하',
      description: '부부 합의 시 가장 빠른 방법',
      features: ['양측 합의', '숙려기간', '법원 확인']
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: '조정이혼',
      duration: '2~4개월',
      difficulty: '중',
      description: '법원의 조정을 통한 합의',
      features: ['조정위원 참여', '합의 도출', '조정조서 작성']
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: '재판이혼',
      duration: '6개월~2년',
      difficulty: '상',
      description: '법원 판결로 이혼 결정',
      features: ['소송 진행', '증거 제출', '판결 확정']
    }
  ]

  const processSteps = [
    {
      number: '01',
      title: '전문가 상담',
      description: '현재 상황 분석 및 전략 수립',
      details: ['무료 법률 상담', '유리한 방법 제시', '예상 기간/비용 안내']
    },
    {
      number: '02',
      title: '증거 수집',
      description: '이혼 사유 및 재산 입증',
      details: ['불륜 증거', '재산 목록', '양육 관련 자료']
    },
    {
      number: '03',
      title: '협상 또는 소송',
      description: '상황에 맞는 최적 절차',
      details: ['협의 시도', '조정 신청', '소송 제기']
    },
    {
      number: '04',
      title: '이혼 성립',
      description: '법적 절차 완료 및 사후 관리',
      details: ['이혼 확정', '재산 분할', '양육권 확보']
    }
  ]

  const divorceCauses = [
    '배우자의 부정행위 (불륜)',
    '악의적 유기',
    '배우자 직계존속의 학대',
    '배우자에 의한 심한 모욕',
    '3년 이상 생사불명',
    '기타 혼인 지속이 어려운 중대사유'
  ]

  const commonConcerns = [
    {
      emoji: '💔',
      title: '상대방이 이혼을 거부해요',
      solution: '재판이혼으로 법원 판결을 받을 수 있습니다'
    },
    {
      emoji: '⏰',
      title: '얼마나 오래 걸릴까요?',
      solution: '협의는 3~4주, 재판은 6개월~2년 소요됩니다'
    },
    {
      emoji: '💰',
      title: '비용이 걱정돼요',
      solution: '무료 상담으로 정확한 비용을 미리 확인하세요'
    },
    {
      emoji: '👶',
      title: '아이 때문에 걱정이에요',
      solution: '양육권과 양육비를 함께 해결합니다'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              이혼절차 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              복잡한 이혼절차,<br />
              <span className="text-blue-200">처음부터 끝까지</span> 함께합니다
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12년 경력, 1,200건 이상 처리한 이혼 전문 변호사가<br className="sm:hidden" />
              협의부터 재판까지 모든 절차를 책임집니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                무료 이혼절차 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-blue-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700/70 transition-all border-2 border-white/30"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                전화 상담 1661-7633
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">12년</div>
                <div className="text-sm text-white/80 mt-1">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">1,200건+</div>
                <div className="text-sm text-white/80 mt-1">사건 처리</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">비밀 100%</div>
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
            <Link href="/" className="text-gray-500 hover:text-blue-600">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/faq" className="text-gray-500 hover:text-blue-600">이혼큐레이션</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-blue-600 font-medium">이혼절차</span>
          </nav>
        </div>
      </div>

      {/* Empathy Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-blue-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              힘든 결정, 당신 혼자가 아닙니다
            </h2>

            <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
              이혼은 인생의 큰 전환점입니다.<br />
              두렵고 막막한 마음, 법무법인 더율이 함께하겠습니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-3">🤔</div>
                <h4 className="font-bold mb-2 text-gray-900">어디서부터 시작해야 할지</h4>
                <p className="text-sm text-gray-600">
                  복잡한 절차,<br />
                  단계별로 안내해드립니다
                </p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-3">😰</div>
                <h4 className="font-bold mb-2 text-gray-900">혼자서는 불안하신가요?</h4>
                <p className="text-sm text-gray-600">
                  처음부터 끝까지<br />
                  전문 변호사가 동행합니다
                </p>
              </div>

              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl mb-3">🛡️</div>
                <h4 className="font-bold mb-2 text-gray-900">내 권리를 지킬 수 있을까?</h4>
                <p className="text-sm text-gray-600">
                  1,200건의 경험으로<br />
                  최선의 결과를 만듭니다
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-indigo-600 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">
                법무법인 더율은 12년간 1,200건 이상의 이혼 사건을 처리하며 의뢰인과 함께 걸어왔습니다.
              </p>
              <p className="text-gray-700">
                모든 상담은 철저히 비밀이 보장되며, 당신에게 가장 유리한 방법으로
                새로운 시작을 준비할 수 있도록 끝까지 함께하겠습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divorce Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">이혼의 종류와 예상 기간</h2>
            <p className="text-gray-600">상황에 따라 가장 유리한 방법을 선택합니다</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {divorceTypes.map((type, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="text-blue-600 mb-4">{type.icon}</div>
                <h3 className="font-bold text-lg mb-2">{type.title}</h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {type.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    type.difficulty === '하' ? 'bg-green-100 text-green-700' :
                    type.difficulty === '중' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    난이도 {type.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="text-sm text-gray-700 flex items-center">
                      <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">이혼절차 진행 과정</h2>
            <p className="text-gray-600">체계적인 4단계 프로세스로 안전하게 진행합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-blue-300 -ml-3" />
                  </div>
                )}
                <div className="bg-white rounded-2xl p-6 h-full shadow-lg hover:shadow-xl transition-all">
                  <div className="text-4xl font-bold text-blue-600/20 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-gray-500 flex items-start">
                        <span className="text-blue-500 mr-1">•</span>
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

      {/* Divorce Causes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">재판이혼 사유</h2>
            <p className="text-gray-600">상대방이 거부해도 법적 사유가 있으면 이혼할 수 있습니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {divorceCauses.map((cause, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800">{cause}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">내 상황이 이혼 사유에 해당할까요?</h3>
                <p className="text-gray-700 mb-3">
                  각 사례마다 법적 판단이 다릅니다. 무료 상담으로 정확한 분석을 받아보세요.
                </p>
                <Link
                  href="/booking"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-all"
                >
                  무료 상담 신청
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Concerns Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
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
              href="/faq?category=divorce-process"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              이혼절차 FAQ 20개 더 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-500 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                이혼 전문 변호사가<br />
                직접 담당합니다
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">임은지 변호사</h3>
                    <p className="text-white/90 text-sm">이혼 전문 12년 경력, 대한변협 가사법 전문</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">협의부터 재판까지</h3>
                    <p className="text-white/90 text-sm">모든 유형의 이혼 사건 전문 처리</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">1,200건+ 처리 경험</h3>
                    <p className="text-white/90 text-sm">다양한 사례를 통한 최적의 전략 수립</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">무료 상담에서 확인하세요</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-200 mr-2" />
                  <span>내 상황에 맞는 이혼 방법</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-200 mr-2" />
                  <span>예상 기간 및 절차</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-200 mr-2" />
                  <span>재산분할·양육권 전략</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-blue-200 mr-2" />
                  <span>승소 가능성 진단</span>
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
      <section className="py-20 bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            새로운 시작을 위한 첫 걸음, 함께하세요
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            지금 바로 무료 상담으로 궁금증을 해소하세요
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
              className="bg-white text-blue-600 px-6 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all border-2 border-blue-200 flex items-center justify-center"
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
            무료 이혼절차 상담 신청
          </Link>
        </div>
      )}
    </div>
  )
}
