'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/layouts/PageLayout';

// TypeScript Interfaces
interface SuccessCase {
  title: string;
  type: string;
  amount: string;
  period: string;
  description: string;
  highlight: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface TabContent {
  title: string;
  description: string;
  strategies: string[];
  caseExample: string;
}

export default function AlimonyClient() {
  // State management
  const [quickCalcStep, setQuickCalcStep] = useState(1);
  const [quickCalcAnswers, setQuickCalcAnswers] = useState({
    hasEvidence: '',
    marriageYears: '',
    claimAmount: '',
  });
  const [quickCalcResult, setQuickCalcResult] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'claim' | 'defense' | 'special'>('defense');
  const [costCalcType, setCostCalcType] = useState('defense');
  const [costAmount, setCostAmount] = useState('');
  const [costResult, setCostResult] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Mock Data
  const successCases: SuccessCase[] = [
    {
      title: '5억 청구를 2천만원으로',
      type: '방어',
      amount: '96% 감액',
      period: '2개월',
      description: '상대방이 5억 원을 청구했지만, 쌍방 책임 입증 및 증거 반박으로 2천만 원으로 합의',
      highlight: '재산의 80%를 지켰습니다',
    },
    {
      title: '증거 부족 청구 완전 차단',
      type: '방어',
      amount: '0원',
      period: '1개월',
      description: '명확한 증거 없이 추정만으로 청구한 3억 원 위자료를 법리적으로 완전 차단',
      highlight: '부당한 청구를 막았습니다',
    },
    {
      title: '역청구로 실지급액 50% 감소',
      type: '방어+역청구',
      amount: '실지급 50% 감소',
      period: '3개월',
      description: '상대방의 귀책사유를 발견하고 역청구하여 최종 지급액을 절반으로 줄임',
      highlight: '전략적 협상의 승리',
    },
  ];

  const tabContent: Record<'claim' | 'defense' | 'special', TabContent> = {
    claim: {
      title: '위자료 청구 전략',
      description: '정당한 보상을 최대한 확보하는 전략',
      strategies: [
        '체계적인 증거 수집 (불륜, 폭력, 유기 등)',
        '재산 규모 및 경제력 파악',
        '정신적 고통 입증 자료 준비',
        '유사 판례 분석 및 적정 청구액 산정',
        '협상력 확보를 위한 전략적 청구',
      ],
      caseExample: '전업주부 A씨, 배우자의 불륜 증거 확보 후 위자료 1.5억 + 재산분할 60% 확보',
    },
    defense: {
      title: '위자료 방어 전략',
      description: '과도한 청구를 적정선으로 줄이는 전략',
      strategies: [
        '증거의 증거능력 검토 (불법수집 여부)',
        '쌍방 책임 입증 (과실상계)',
        '청구액의 과도함 법리적 반박',
        '경제적 능력 및 재산 상황 소명',
        '유사 판례 인용하여 적정선 제시',
      ],
      caseExample: '개인사업자 B씨, 3억 청구를 쌍방 책임 입증으로 3천만 원으로 감액 (90% 감액)',
    },
    special: {
      title: '특수 상황 대응',
      description: '복잡한 사안에 맞춤형 전략',
      strategies: [
        '상간자 청구 (배우자 외 제3자)',
        '증거 부족 시 대응 전략',
        '혼인 파탄 후 관계 (유책배우자 판단)',
        '정신질환/중독 등 특수 사정',
        '해외 거주/외국인 배우자 사건',
      ],
      caseExample: '상간자 C씨, 배우자와의 관계가 파탄 후 시작되었음을 입증하여 청구 기각',
    },
  };

  const faqData: FAQ[] = [
    {
      question: '위자료는 꼭 내야 하나요? 안 낼 수는 없나요?',
      answer: '유책 사유가 명확하고 증거가 충분하면 위자료 지급 의무가 발생합니다. 다만 ① 증거 불충분, ② 쌍방 책임, ③ 혼인 파탄 기여도 등을 입증하면 금액을 0원 또는 대폭 감액할 수 있습니다. 평균 70% 감액에 성공합니다.',
      category: 'general',
    },
    {
      question: '상대방이 청구한 금액이 너무 높은데 어떻게 하나요?',
      answer: '법원은 청구액을 그대로 인용하지 않습니다. ① 당사자 재산, ② 혼인 기간, ③ 유사 판례 등을 종합해 적정선을 판단합니다. 상대방 변호사가 의도적으로 높게 청구하는 경우가 많으므로, 법리적 반박과 적정 금액 제시로 대응합니다.',
      category: 'general',
    },
    {
      question: '증거가 부족해도 위자료를 내야 하나요?',
      answer: '명확한 증거 없이 추정만으로는 위자료가 인정되지 않습니다. 상대방이 제시한 증거의 ① 증거능력, ② 증명력을 꼼꼼히 검토하여 반박하면 청구를 막거나 대폭 감액할 수 있습니다.',
      category: 'evidence',
    },
    {
      question: '쌍방 책임이 있으면 위자료는 어떻게 되나요?',
      answer: '쌍방 모두 귀책사유가 있으면 과실상계가 적용됩니다. 상대방의 귀책사유를 입증하면 위자료가 대폭 감액되거나 0원이 될 수 있습니다. 예: 상대방도 폭언, 경제적 방임, 성격 차이 등에 책임이 있다면 이를 적극 주장해야 합니다.',
      category: 'evidence',
    },
    {
      question: '이미 소송이 시작됐는데 지금 변호사를 선임해도 되나요?',
      answer: '답변서 제출 전, 변론기일 전이라면 충분히 대응 가능합니다. 오히려 상대방 주장을 먼저 파악한 상태에서 더 정교한 방어 전략을 수립할 수 있습니다. 즉시 상담받으세요.',
      category: 'general',
    },
    {
      question: '위자료 금액은 어떻게 결정되나요?',
      answer: '법원은 ① 유책 사유의 내용과 정도, ② 혼인 기간, ③ 당사자의 연령과 재산, ④ 혼인 중 생활 수준, ⑤ 정신적 고통의 정도, ⑥ 기타 제반 사정을 종합적으로 고려합니다. 유사 판례를 분석하여 적정선을 제시하는 것이 중요합니다.',
      category: 'cost',
    },
    {
      question: '위자료를 분할 지급할 수 있나요?',
      answer: '가능합니다. 경제적 능력이 부족한 경우 분할 지급 조건으로 합의하거나 법원에 신청할 수 있습니다. 다만 지급 지연 시 이자가 발생할 수 있으므로 조건을 명확히 해야 합니다.',
      category: 'cost',
    },
    {
      question: '상대방이 증거를 불법으로 수집했다면 어떻게 되나요?',
      answer: '불법수집 증거는 증거능력이 부정될 수 있습니다. ① 동의 없는 녹음/녹화, ② 사생활 침해, ③ 주거침입 등으로 수집한 증거는 증거능력 배제 신청이 가능합니다. 다만 판례는 케이스별로 다르므로 전문가 검토가 필요합니다.',
      category: 'evidence',
    },
    {
      question: '위자료와 재산분할은 어떻게 다른가요?',
      answer: '위자료는 정신적 고통에 대한 손해배상이고, 재산분할은 혼인 중 형성한 재산을 나누는 것입니다. 둘은 별개이므로 각각 청구 가능하며, 전략적으로 상계하거나 협상에 활용할 수 있습니다.',
      category: 'general',
    },
    {
      question: '변호사 비용은 얼마나 드나요?',
      answer: '사건 난이도, 청구액, 소송 단계에 따라 다릅니다. 일반적으로 ① 상담: 무료, ② 협상/조정: 300-500만 원, ③ 소송: 500-1,000만 원 선입니다. 청구액이 큰 경우 성공보수 조건도 가능합니다. 정확한 견적은 상담 시 안내드립니다.',
      category: 'cost',
    },
  ];

  // Quick Calculator Logic
  const handleQuickCalc = () => {
    const { hasEvidence, marriageYears, claimAmount } = quickCalcAnswers;
    const amount = parseInt(claimAmount);
    const years = parseInt(marriageYears);

    if (hasEvidence === 'weak' && years < 5) {
      setQuickCalcResult('청구 기각 가능성 높음 (0원)');
    } else if (hasEvidence === 'weak') {
      setQuickCalcResult(`예상 감액: 80-90% (${(amount * 0.1).toLocaleString()}만 원)`);
    } else if (hasEvidence === 'moderate') {
      setQuickCalcResult(`예상 감액: 50-70% (${(amount * 0.3).toLocaleString()}-${(amount * 0.5).toLocaleString()}만 원)`);
    } else {
      setQuickCalcResult(`예상 감액: 20-40% (${(amount * 0.6).toLocaleString()}-${(amount * 0.8).toLocaleString()}만 원)`);
    }
  };

  // Cost Calculator Logic
  const handleCostCalc = () => {
    const amount = parseInt(costAmount);
    if (!amount) return;

    let estimate = '';
    if (costCalcType === 'defense') {
      if (amount < 5000) estimate = '착수금: 300-500만 원 + 성공보수: 감액액의 10%';
      else if (amount < 20000) estimate = '착수금: 500-800만 원 + 성공보수: 감액액의 10%';
      else estimate = '착수금: 800-1,500만 원 + 성공보수: 감액액의 10%';
    } else {
      if (amount < 5000) estimate = '착수금: 300-500만 원 + 성공보수: 확보액의 15%';
      else if (amount < 20000) estimate = '착수금: 500-800만 원 + 성공보수: 확보액의 15%';
      else estimate = '착수금: 800-1,500만 원 + 성공보수: 확보액의 15%';
    }
    setCostResult(estimate);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Section 1: Hero - 감정적 공감 with 3 stats cards */}
        <section className="relative pt-24 pb-16 md:pb-24 bg-gradient-to-b from-blue-50/40 via-white to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Alimony</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                억울한 건 알아요<br />
                그래도 정당한 만큼만 내면 돼요
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                부당한 청구는 막고, 합리적인 금액으로 조정하는 것<br />
                그게 법이에요. 우리가 도와드릴게요
              </p>
            </div>

            {/* 3 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">평균 70%</p>
                <p className="text-sm text-gray-600">감액 성공</p>
                <p className="text-xs text-gray-400 mt-1">더율 수임 300건 기준</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10년+</p>
                <p className="text-sm text-gray-600">위자료 전문</p>
                <p className="text-xs text-gray-400 mt-1">1,200건 이혼 경험</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500">
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">48시간</p>
                <p className="text-sm text-gray-600">초기 대응</p>
                <p className="text-xs text-gray-400 mt-1">빠를수록 유리해요</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Instant Value - 30초 계산기 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Quick Assessment</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                30초 예상 결과
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                3가지만 답하면 대략적인 방향을 알려드려요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border-2 border-blue-200">
              {quickCalcStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">상대방의 증거는 얼마나 명확한가요?</h3>
                  <div className="space-y-3">
                    {[
                      { value: 'weak', label: '추정/정황 증거만 있음 (명확한 증거 없음)' },
                      { value: 'moderate', label: '일부 증거 있으나 반박 여지 있음' },
                      { value: 'strong', label: '명확한 증거 (사진, 녹음, 자백 등)' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setQuickCalcAnswers({ ...quickCalcAnswers, hasEvidence: option.value });
                          setQuickCalcStep(2);
                        }}
                        className="w-full p-4 text-left border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quickCalcStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">혼인 기간은 얼마나 되나요?</h3>
                  <div className="space-y-3">
                    {[
                      { value: '2', label: '3년 미만' },
                      { value: '5', label: '3-10년' },
                      { value: '15', label: '10-20년' },
                      { value: '25', label: '20년 이상' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setQuickCalcAnswers({ ...quickCalcAnswers, marriageYears: option.value });
                          setQuickCalcStep(3);
                        }}
                        className="w-full p-4 text-left border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setQuickCalcStep(1)}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                  >
                    ← 이전
                  </button>
                </div>
              )}

              {quickCalcStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">상대방이 청구한 금액은? (만 원)</h3>
                  <input
                    type="number"
                    placeholder="예: 30000 (3억 원)"
                    value={quickCalcAnswers.claimAmount}
                    onChange={(e) => setQuickCalcAnswers({ ...quickCalcAnswers, claimAmount: e.target.value })}
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setQuickCalcStep(2)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                    >
                      이전
                    </button>
                    <button
                      onClick={handleQuickCalc}
                      className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg"
                    >
                      결과 보기
                    </button>
                  </div>
                </div>
              )}

              {quickCalcResult && (
                <div className="mt-6 bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                  <p className="text-sm text-gray-600 mb-2">예상 결과</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">{quickCalcResult}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    ⚠️ 이는 대략적인 예상이며, 실제 결과는 증거, 법리, 판례 등에 따라 달라질 수 있습니다.
                  </p>
                  <button
                    onClick={() => {
                      setQuickCalcStep(1);
                      setQuickCalcResult(null);
                      setQuickCalcAnswers({ hasEvidence: '', marriageYears: '', claimAmount: '' });
                    }}
                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
                  >
                    다시 계산하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Problem Recognition - 오해 6가지 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-pink-600/70 mb-3 tracking-[0.2em] uppercase">Common Myths</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                이런 오해 하고 계시진 않나요?
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                많은 분들이 잘못 알고 계신 6가지
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  myth: '상대방이 청구한 금액을 다 내야 한다',
                  truth: '법원은 청구액의 평균 30-40%만 인용합니다. 과도한 청구는 법리적으로 반박 가능해요.',
                },
                {
                  myth: '잘못했으니 위자료는 어쩔 수 없다',
                  truth: '쌍방 책임이 있으면 과실상계로 대폭 감액됩니다. 상대방도 완벽하지 않아요.',
                },
                {
                  myth: '변호사 없이도 충분히 대응 가능하다',
                  truth: '상대방에게 변호사가 있다면 법리적으로 불리합니다. 평균 2배 차이 나요.',
                },
                {
                  myth: '증거가 있으니 무조건 져야 한다',
                  truth: '증거의 증거능력과 증명력을 검토하면 반박 여지가 많습니다. 불법수집 증거는 무효예요.',
                },
                {
                  myth: '빨리 합의하면 금액이 줄어든다',
                  truth: '성급한 합의는 오히려 손해입니다. 법리 검토 후 협상하면 70% 감액도 가능해요.',
                },
                {
                  myth: '소송 시작하면 이미 늦었다',
                  truth: '답변서 제출 전이라면 충분히 대응 가능합니다. 상대 주장 파악 후 더 정교한 전략 가능해요.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-500"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">❌</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.myth}</h3>
                  </div>
                  <div className="flex items-start gap-3 pl-11">
                    <span className="text-2xl -ml-11">✅</span>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.truth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Authority Building - 전문성 증명 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Our Expertise</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                왜 더율인가요?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">법리 중심 대응</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  감정이 아닌 법과 판례로 싸웁니다. 판사가 보는 7가지 체크포인트를 정확히 공략해요.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">맞춤형 전략</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  부인 전략, 감액 전략, 상계 전략 중 사건에 최적화된 방법을 선택합니다.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">투명한 소통</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  진행 상황, 예상 결과, 비용까지 모두 투명하게 공유합니다. 숨김없이요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Solution Framework - 3탭 (청구/방어/특수상황) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-gray-600/70 mb-3 tracking-[0.2em] uppercase">Strategy</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                우리의 전략
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                청구하시든, 방어하시든, 최선의 결과를 만들어드려요
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab('defense')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'defense'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                위자료 방어
              </button>
              <button
                onClick={() => setActiveTab('claim')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'claim'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                위자료 청구
              </button>
              <button
                onClick={() => setActiveTab('special')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'special'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                특수 상황
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8 border-2 border-blue-200 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{tabContent[activeTab].title}</h3>
              <p className="text-gray-600 mb-6">{tabContent[activeTab].description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">주요 전략</h4>
                  <ul className="space-y-3">
                    {tabContent[activeTab].strategies.map((strategy, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">✓</span>
                        <span className="text-gray-700">{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">실제 사례</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{tabContent[activeTab].caseExample}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Evidence Strategy - 증거 가이드 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Evidence</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                증거, 이렇게 대응하세요
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">방어할 때 체크할 것</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>증거가 불법으로 수집되었나? (동의 없는 녹음, 사생활 침해)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>정황 증거만 있나? (추정 vs 명확한 증명)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>시기가 맞나? (혼인 파탄 후 관계는 유책 아님)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>상대방 주장에 모순은 없나?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">청구할 때 준비할 것</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>문자/카톡/이메일 (날짜가 명확한 것)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>사진/영상 (원본 파일, 메타데이터 포함)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>진술서/녹음 (합법적으로 수집한 것)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>병원 기록, 상담 기록 (정신적 고통 입증)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Process Transparency - 타임라인 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Timeline</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                이렇게 진행돼요
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                { step: 1, title: '긴급 상담 (당일)', content: '사건 파악 및 초기 대응 방향 제시' },
                { step: 2, title: '증거 분석 (1-3일)', content: '상대방 증거의 증거능력 및 증명력 검토' },
                { step: 3, title: '전략 수립 (3-7일)', content: '부인/감액/상계 중 최적 전략 결정' },
                { step: 4, title: '답변서 제출 (14일 내)', content: '법리적 반박 및 적정 금액 제시' },
                { step: 5, title: '협상/조정 (1-2개월)', content: '법원 조정 또는 직접 협상' },
                { step: 6, title: '소송 진행 (필요 시)', content: '변론 및 증거 제출로 판결 유도' },
              ].map((item) => (
                <div key={item.step} className="flex gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    {item.step < 6 && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8: Success Cases - 3개 케이스 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-pink-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-pink-600/70 mb-3 tracking-[0.2em] uppercase">Success Stories</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                이렇게 해결했어요
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {successCases.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-500"
                >
                  <div className="inline-block px-3 py-1 bg-pink-100 rounded-full mb-4">
                    <span className="text-xs font-semibold text-pink-700">{item.type}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-2xl font-bold text-pink-600">{item.amount}</p>
                      <p className="text-xs text-gray-500">소요: {item.period}</p>
                    </div>
                  </div>
                  <p className="text-xs text-pink-600 font-semibold mt-3">{item.highlight}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
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
          </div>
        </section>

        {/* Section 9: Cost Calculator - 비용 계산기 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Fee Transparency</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                비용이 궁금하시죠?
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                숨김없이 알려드려요
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border-2 border-blue-200">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">사건 유형</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCostCalcType('defense')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      costCalcType === 'defense'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    방어 (감액)
                  </button>
                  <button
                    onClick={() => setCostCalcType('claim')}
                    className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                      costCalcType === 'claim'
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    청구 (확보)
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  위자료 금액 (만 원)
                </label>
                <input
                  type="number"
                  placeholder="예: 30000 (3억 원)"
                  value={costAmount}
                  onChange={(e) => setCostAmount(e.target.value)}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
                />
              </div>

              <button
                onClick={handleCostCalc}
                className="w-full px-6 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg mb-4"
              >
                예상 비용 계산하기
              </button>

              {costResult && (
                <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300">
                  <p className="text-sm text-gray-600 mb-2">예상 변호사 비용</p>
                  <p className="text-lg font-bold text-blue-600">{costResult}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    ⚠️ 사건 난이도, 진행 단계에 따라 달라질 수 있습니다. 정확한 견적은 상담 시 안내드립니다.
                  </p>
                </div>
              )}

              <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-200">
                <p className="text-xs text-gray-700">
                  <strong>💡 TIP:</strong> 성공보수 조건 가능합니다. 착수금 부담을 줄이고, 결과에 따라 지불하는 방식도 선택 가능해요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: FAQ Deep Dive - 10개 FAQ */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                자주 묻는 질문
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-500 transition-all"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/faq?category=위자료"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
              >
                위자료 관련 FAQ 전체 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 11: Trust Signals - 신뢰 요소 */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-gray-600/70 mb-3 tracking-[0.2em] uppercase">Trust</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                믿고 맡기셔도 돼요
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">100% 비밀보장</h3>
                <p className="text-xs text-gray-600">상담 내용 절대 유출 없음</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">24시간 연락 가능</h3>
                <p className="text-xs text-gray-600">급할 땐 언제든 연락하세요</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">투명한 비용</h3>
                <p className="text-xs text-gray-600">숨은 비용 없음, 명확한 계약</p>
              </div>
              <div className="text-center bg-white rounded-2xl p-6 shadow-md">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">전담 변호사</h3>
                <p className="text-xs text-gray-600">처음부터 끝까지 한 분이</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Consultation Guide - 상담 준비 */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Preparation</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                상담 전 이것만 준비하세요
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">필수 서류</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>상대방이 보낸 내용증명 또는 소장</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>관련 증거 (문자, 카톡, 사진 등)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>혼인관계증명서 (있으면)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">미리 정리할 것</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>상대방 청구 금액 및 근거</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>혼인 기간, 자녀 유무, 재산 규모</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500">•</span>
                    <span>가장 급한 것, 가장 걱정되는 것</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200 max-w-3xl mx-auto">
              <p className="text-sm text-gray-700 text-center">
                <strong>💡 걱정 마세요:</strong> 서류가 없어도, 정리가 안 되어도 괜찮아요. 상담하면서 함께 정리해드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 13: Final CTA - 최종 전환 */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-amber-50/20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                오늘 시작하면<br />
                3개월 후엔 달라져 있어요
              </h2>
              <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-2">
                하루하루가 아까워요. 지금 바로 시작하세요
              </p>
              <p className="text-sm text-gray-500 italic">"다들 '진작 올걸' 해요"</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              <a
                href="tel:1661-7633"
                className="group bg-gray-900 text-white p-8 rounded-2xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="font-bold text-lg mb-2">지금 바로 전화</p>
                <p className="text-sm text-gray-300 mb-3">10분 무료 상담</p>
                <p className="text-xl font-bold">1661-7633</p>
              </a>

              <Link
                href="/consultation-flow"
                className="group bg-blue-600 text-white p-8 rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="font-bold text-lg mb-2">영상/방문 예약</p>
                <p className="text-sm text-blue-100 mb-3">편한 시간에 자세히</p>
                <p className="text-base font-semibold">예약하기 →</p>
              </Link>

              <Link
                href="/faq?category=위자료"
                className="group bg-white text-gray-900 p-8 rounded-2xl border-2 border-gray-300 hover:border-gray-900 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-bold text-lg mb-2">처음이신가요?</p>
                <p className="text-sm text-gray-600 mb-3">위자료 FAQ 보기</p>
                <p className="text-base font-semibold text-blue-600">FAQ 보기 →</p>
              </Link>
            </div>

            <p className="text-sm text-gray-500 text-center">
              100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
