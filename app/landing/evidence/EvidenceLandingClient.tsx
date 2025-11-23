'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Camera, FileText, MessageSquare, CreditCard, Shield, Check, X, ArrowRight, Phone, Calendar, AlertCircle, Eye, Lock, Search } from 'lucide-react'

export default function EvidenceLandingClient() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const evidenceTypes = [
    {
      category: '불륜 증거',
      icon: <Camera className="w-6 h-6" />,
      items: [
        { type: '사진/동영상', validity: '높음', note: '직접적 증거, 명확할수록 좋음' },
        { type: '통화녹음', validity: '중간', note: '통화 상대 동의 불필요' },
        { type: '카톡/문자', validity: '높음', note: '공증 필수' },
        { type: '호텔 영수증', validity: '중간', note: '추가 증거 필요' }
      ]
    },
    {
      category: '재산 증거',
      icon: <CreditCard className="w-6 h-6" />,
      items: [
        { type: '통장 사본', validity: '높음', note: '잔액 및 거래내역' },
        { type: '등기부등본', validity: '높음', note: '부동산 소유 확인' },
        { type: '신용카드 내역', validity: '중간', note: '숨긴 지출 입증' },
        { type: '금융거래정보', validity: '높음', note: '법원 조회 가능' }
      ]
    },
    {
      category: '양육 증거',
      icon: <Heart className="w-6 h-6" />,
      items: [
        { type: '양육 일지', validity: '중간', note: '꾸준한 기록 필요' },
        { type: '교육비 영수증', validity: '높음', note: '양육 참여 입증' },
        { type: '학대 증거', validity: '높음', note: '사진, 진단서' },
        { type: '제3자 진술', validity: '중간', note: '교사, 이웃 등' }
      ]
    }
  ]

  const legalMethods = [
    {
      method: '통화 녹음',
      legal: true,
      condition: '당사자 중 1명이 녹음하면 합법',
      tips: ['녹음 앱 사용', '날짜/시간 확인', '전체 대화 보관']
    },
    {
      method: '카톡/문자 캡처',
      legal: true,
      condition: '공증 받으면 증거능력 인정',
      tips: ['전체 대화 맥락', '날짜 표시', '공증사무소 방문']
    },
    {
      method: 'CCTV 촬영',
      legal: true,
      condition: '본인 집/차량 내부는 합법',
      tips: ['공공장소 불법', '자택 내부 OK', '차량 내부 OK']
    },
    {
      method: '탐정 고용',
      legal: false,
      condition: '한국에서 탐정업 불법',
      tips: ['개인정보보호법 위반', '증거능력 상실 위험', '비추천']
    },
    {
      method: '배우자 폰 몰래 확인',
      legal: false,
      condition: '통신비밀보호법 위반',
      tips: ['불법 수집 증거', '오히려 불리', '절대 금지']
    }
  ]

  const collectionSteps = [
    {
      number: '01',
      title: '증거 계획 수립',
      description: '필요한 증거 유형 파악',
      details: ['사건 유형 분석', '입증 사항 정리', '수집 방법 결정']
    },
    {
      number: '02',
      title: '합법적 수집',
      description: '법적 효력 있는 방법 사용',
      details: ['녹음 진행', '문서 확보', '사진 촬영']
    },
    {
      number: '03',
      title: '증거 보전',
      description: '증거능력 확보',
      details: ['공증 진행', '원본 보관', '복사본 제작']
    },
    {
      number: '04',
      title: '법적 활용',
      description: '소송에서 효과적 제출',
      details: ['증거 목록 작성', '제출 시기 결정', '증인 확보']
    }
  ]

  const mistakes = [
    {
      mistake: '불법 촬영/도청',
      risk: '오히려 처벌받을 수 있음',
      solution: '합법적 방법으로만 수집'
    },
    {
      mistake: '증거 조작/편집',
      risk: '증거능력 상실 + 위증죄',
      solution: '원본 그대로 보관'
    },
    {
      mistake: '공증 없이 제출',
      risk: '상대방이 부인하면 무용지물',
      solution: '즉시 공증사무소 방문'
    },
    {
      mistake: '너무 늦게 수집',
      risk: '증거 인멸, 시효 경과',
      solution: '결심 즉시 시작'
    }
  ]

  const commonQuestions = [
    {
      emoji: '🤳',
      question: '배우자 몰래 녹음해도 되나요?',
      answer: '통화 당사자가 녹음하는 것은 합법입니다'
    },
    {
      emoji: '💬',
      question: '카톡 캡처는 증거가 될까요?',
      answer: '공증 받으면 강력한 증거가 됩니다'
    },
    {
      emoji: '📸',
      question: '사진은 어떻게 찍어야 하나요?',
      answer: '날짜/장소가 명확하고 편집하지 않은 원본'
    },
    {
      emoji: '🔒',
      question: '배우자 폰을 몰래 봐도 되나요?',
      answer: '절대 안 됩니다. 통신비밀보호법 위반입니다'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-700 via-gray-600 to-slate-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gray-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              증거수집 전문
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              법적 효력 있는 증거,<br />
              <span className="text-slate-200">합법적으로</span> 확보하세요
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              12년 경력, 1,200건 이상 처리한 증거 전문 변호사가<br className="sm:hidden" />
              불륜부터 재산까지 확실한 증거 확보 방법을 안내합니다
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/booking"
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl inline-block text-center"
              >
                무료 증거수집 상담 신청
              </Link>
              <a
                href="tel:1661-7633"
                className="bg-slate-600/50 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-600/70 transition-all border-2 border-white/30"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                전화 상담 1661-7633
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-200">12년</div>
                <div className="text-sm text-white/80 mt-1">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-200">1,200건+</div>
                <div className="text-sm text-white/80 mt-1">사건 처리</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-200">비밀 100%</div>
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
            <Link href="/" className="text-gray-500 hover:text-slate-600">홈</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/faq" className="text-gray-500 hover:text-slate-600">이혼큐레이션</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-slate-600 font-medium">증거수집</span>
          </nav>
        </div>
      </div>

      {/* Empathy Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900">
              이혼 소송, 증거가 전부입니다
            </h2>

            <p className="text-center text-lg text-gray-700 mb-8 leading-relaxed">
              아무리 억울해도 증거가 없으면 인정받기 어렵습니다.<br />
              하지만 잘못된 방법으로 수집하면 오히려 불리해질 수 있습니다.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="text-3xl mb-3">📱</div>
                <h4 className="font-bold mb-2 text-gray-900">무엇을 모아야 할까요?</h4>
                <p className="text-sm text-gray-600">
                  사진? 녹음? 문자?<br />
                  어떤 증거가 필요한지
                </p>
              </div>

              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="text-3xl mb-3">⚖️</div>
                <h4 className="font-bold mb-2 text-gray-900">합법적으로 할 수 있나요?</h4>
                <p className="text-sm text-gray-600">
                  몰래 녹음하면<br />
                  불법 아닌가요?
                </p>
              </div>

              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="text-3xl mb-3">🔍</div>
                <h4 className="font-bold mb-2 text-gray-900">어떻게 활용하나요?</h4>
                <p className="text-sm text-gray-600">
                  수집한 증거를<br />
                  어떻게 제출해야 할까요?
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-100 to-gray-100 border-l-4 border-slate-600 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">
                법무법인 더율은 12년간 1,200건 이상의 사건에서 결정적 증거를 확보했습니다.
              </p>
              <p className="text-gray-700">
                합법적이면서도 효과적인 증거 수집 방법부터 법정 제출까지,
                전 과정을 전문적으로 지원해드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence Types */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">이혼 소송에 필요한 증거들</h2>
            <p className="text-gray-600">사건 유형별 필수 증거와 증거능력</p>
          </div>

          <div className="space-y-8">
            {evidenceTypes.map((category, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-slate-600 mr-3">{category.icon}</div>
                  <h3 className="text-2xl font-bold">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{item.type}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.validity === '높음' ? 'bg-green-100 text-green-700' :
                          item.validity === '중간' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          증거능력 {item.validity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Methods */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">합법 vs 불법 증거수집 방법</h2>
            <p className="text-gray-600">잘못 수집하면 오히려 불리해집니다</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {legalMethods.map((method, idx) => (
              <div key={idx} className={`bg-white rounded-xl p-6 shadow-lg border-2 ${
                method.legal ? 'border-green-200' : 'border-red-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    {method.legal ? (
                      <Check className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <h3 className="font-bold text-lg">{method.method}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    method.legal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {method.legal ? '합법' : '불법'}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{method.condition}</p>
                <ul className="space-y-1">
                  {method.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="text-sm text-gray-600 flex items-start">
                      <span className={method.legal ? 'text-green-500' : 'text-red-500'}>•</span>
                      <span className="ml-2">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">증거수집 4단계 프로세스</h2>
            <p className="text-gray-600">체계적으로 수집하고 활용합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionSteps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < collectionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-slate-300 -ml-3" />
                  </div>
                )}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-slate-600/20 mb-2">{step.number}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-xs text-gray-500 flex items-start">
                        <span className="text-slate-500 mr-1">•</span>
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

      {/* Common Mistakes */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">증거수집 시 흔한 실수</h2>
            <p className="text-gray-600">이런 실수는 절대 하지 마세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {mistakes.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
                <div className="flex items-start mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="font-bold text-lg">{item.mistake}</h3>
                </div>
                <div className="mb-3">
                  <span className="text-sm text-gray-600">위험:</span>
                  <p className="text-red-600 font-medium">{item.risk}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">해결:</span>
                  <p className="text-green-600 font-medium">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">자주 묻는 질문</h2>
            <p className="text-gray-600">증거수집 관련 궁금증을 해결하세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {commonQuestions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">{item.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/faq?category=evidence-collection"
              className="inline-flex items-center text-slate-600 font-medium hover:text-slate-700"
            >
              증거수집 FAQ 13개 더 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-20 bg-gradient-to-br from-slate-700 to-gray-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                증거수집 전문 변호사가<br />
                직접 담당합니다
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">임은지 변호사</h3>
                    <p className="text-white/90 text-sm">증거수집 전문 12년 경력, 합법적 수집 전문</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Search className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">결정적 증거 확보</h3>
                    <p className="text-white/90 text-sm">불륜, 재산, 양육 모든 증거 전문</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Lock className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">100% 합법적 수집</h3>
                    <p className="text-white/90 text-sm">불법 증거 제로, 증거능력 보장</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">무료 상담에서 확인하세요</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-slate-200 mr-2" />
                  <span>필요한 증거 유형 분석</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-slate-200 mr-2" />
                  <span>합법적 수집 방법 안내</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-slate-200 mr-2" />
                  <span>기존 증거 활용 전략</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-slate-200 mr-2" />
                  <span>증거 보전 방법</span>
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
      <section className="py-20 bg-gradient-to-br from-slate-100 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            확실한 증거로 승소하세요
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            지금 바로 무료 상담으로 증거 전략을 확인하세요
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
              className="bg-white text-slate-600 px-6 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all border-2 border-slate-200 flex items-center justify-center"
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
            무료 증거수집 상담 신청
          </Link>
        </div>
      )}
    </div>
  )
}
