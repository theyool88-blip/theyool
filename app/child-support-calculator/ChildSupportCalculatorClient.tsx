'use client';

import { useMemo, useState } from 'react';
import PageLayout from '@/components/layouts/PageLayout';
import ScrollReveal from '@/components/ScrollReveal';
import ConsultationButton from '@/components/features/ConsultationButton';
import {
  AGE_BRACKETS,
  CHILD_COUNT_FACTORS,
  CHILD_SUPPORT_TABLE,
  INCOME_BRACKETS,
  REGION_OPTIONS,
  type RegionType,
} from '@/data/childSupportGuidelines';

interface Child {
  age: number | '';
}

interface CalculationResult {
  monthlyAmount: number;
  baseAmount: number;
  additionalCosts: number;
  totalAmount: number;
  custodyParentShare: number;
  nonCustodyParentShare: number;
}

type CustodyOption = 'self' | 'spouse';

const getIncomeBracketIndex = (income: number) => {
  const index = INCOME_BRACKETS.findIndex((bracket) => income >= bracket.min && income <= bracket.max);
  return index === -1 ? INCOME_BRACKETS.length - 1 : index;
};

const getAgeKey = (age: number) => {
  const bracket = AGE_BRACKETS.find((item) => age >= item.min && age <= item.max);
  return (bracket ?? AGE_BRACKETS[AGE_BRACKETS.length - 1]).key;
};

export default function ChildSupportCalculatorClient() {
  const [custodyHolder, setCustodyHolder] = useState<CustodyOption>('self');
  const [selfIncome, setSelfIncome] = useState<string>('');
  const [spouseIncome, setSpouseIncome] = useState<string>('');
  const [numberOfChildren, setNumberOfChildren] = useState<number>(1);
  const [children, setChildren] = useState<Child[]>([{ age: 5 }]);
  const [regionType, setRegionType] = useState<RegionType>('city');

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const parseIncomeToWon = (value: string) => (parseFloat(value) || 0) * 10000;

  const selfIncomeValue = parseIncomeToWon(selfIncome);
  const spouseIncomeValue = parseIncomeToWon(spouseIncome);
  const custodyIncomeValue = custodyHolder === 'self' ? selfIncomeValue : spouseIncomeValue;
  const nonCustodyIncomeValue = custodyHolder === 'self' ? spouseIncomeValue : selfIncomeValue;
  const totalIncome = custodyIncomeValue + nonCustodyIncomeValue;
  const eitherParentZeroIncome = custodyIncomeValue === 0 || nonCustodyIncomeValue === 0;
  const custodyLabel = custodyHolder === 'self' ? '본인' : '배우자';
  const nonCustodyLabel = custodyHolder === 'self' ? '배우자' : '본인';

  const handleChildrenCountChange = (count: number) => {
    setNumberOfChildren(count);
    const newChildren: Child[] = [];
    for (let i = 0; i < count; i++) {
      newChildren.push({ age: children[i]?.age ?? 5 });
    }
    setChildren(newChildren);
  };

  const handleChildAgeChange = (index: number, rawValue: string) => {
    const sanitized = rawValue.replace(/[^0-9]/g, '');
    const newChildren = [...children];

    if (sanitized === '') {
      newChildren[index] = { age: '' };
    } else {
      const trimmed = sanitized.replace(/^0+(?=\d)/, '');
      const numericAge = Math.min(18, Math.max(0, parseInt(trimmed || '0', 10)));
      newChildren[index] = { age: Number.isNaN(numericAge) ? '' : numericAge };
    }

    setChildren(newChildren);
  };

  const baseAmountByChild = useMemo(() => {
    if (!totalIncome) return 0;
    const incomeIndex = getIncomeBracketIndex(totalIncome);
    return children.reduce((sum, child) => {
      const numericAge = typeof child.age === 'number' ? child.age : 0;
      const key = getAgeKey(numericAge);
      return sum + CHILD_SUPPORT_TABLE[regionType][key][incomeIndex];
    }, 0);
  }, [children, regionType, totalIncome]);

  const calculateChildSupport = () => {
    if (totalIncome === 0) {
      alert('본인과 배우자의 소득을 입력해주세요.');
      return;
    }

    const factorKey = numberOfChildren === 1 ? '1' : numberOfChildren === 2 ? '2' : '3+';
    const adjustedBase = baseAmountByChild * CHILD_COUNT_FACTORS[factorKey];
    const additionalCosts = 0;

    const totalAmount = adjustedBase + additionalCosts;
    const custodyShare = (custodyIncomeValue / totalIncome) * totalAmount;
    const nonCustodyShare = (nonCustodyIncomeValue / totalIncome) * totalAmount;

    setResult({
      monthlyAmount: Math.round(nonCustodyShare),
      baseAmount: Math.round(adjustedBase),
      additionalCosts: Math.round(additionalCosts),
      totalAmount: Math.round(totalAmount),
      custodyParentShare: Math.round(custodyShare),
      nonCustodyParentShare: Math.round(nonCustodyShare),
    });

    setShowResult(true);
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetForm = () => {
    setCustodyHolder('self');
    setSelfIncome('');
    setSpouseIncome('');
    setNumberOfChildren(1);
    setChildren([{ age: 5 }]);
    setRegionType('city');
    setResult(null);
    setShowResult(false);
  };

  return (
    <PageLayout>
      <section className="relative py-20 md:py-28 flex items-center justify-center px-6 md:px-12 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
        {/* Professional Pattern Background */}
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="calculatorDots" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#93c5fd" opacity="0.15" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#calculatorDots)" />
            <circle cx="20%" cy="30%" r="180" fill="#dbeafe" opacity="0.2" />
            <circle cx="80%" cy="70%" r="200" fill="#bfdbfe" opacity="0.15" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs md:text-sm text-blue-600/70 mb-3 tracking-[0.2em] uppercase">Child Support Calculator</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900">양육비 계산기</h1>
            <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              2025년 양육비 산정표 기준으로 예상 금액을 확인하세요
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Input Information</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">정보 입력</h2>
              <p className="text-base text-gray-700 font-light">
                필수 정보를 입력하시면 예상 양육비를 확인하실 수 있습니다
              </p>
            </div>
          </ScrollReveal>

          <div className="bg-gradient-to-br from-white to-gray-50/30 border-2 border-gray-200 rounded-3xl p-8 md:p-12 space-y-10 shadow-lg">
            <ScrollReveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md">1</span>
                  기본 정보
                </h3>
                <div className="space-y-6 ml-0 md:ml-13">
                  <div>
                    <p className="text-base font-semibold text-gray-900 mb-3">
                      이혼 후 누가 자녀들을 양육하나요?
                    </p>
                    <div className="flex gap-3 flex-col sm:flex-row">
                      {[
                        { value: 'self', label: '본인' },
                        { value: 'spouse', label: '배우자' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex-1 rounded-xl px-5 py-3 md:py-4 text-base font-medium cursor-pointer transition-all duration-200 ${
                            custodyHolder === option.value
                              ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                              : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="custodyHolder"
                            value={option.value}
                            checked={custodyHolder === (option.value as CustodyOption)}
                            onChange={() => setCustodyHolder(option.value as CustodyOption)}
                            className="mr-2"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md">2</span>
                  소득 정보
                </h3>
                <div className="space-y-5 ml-0 md:ml-13">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      본인 월 소득 (만원)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={selfIncome}
                        onChange={(e) => setSelfIncome(e.target.value)}
                        placeholder="예: 300"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-lg"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">만원</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      배우자 월 소득 (만원)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={spouseIncome}
                        onChange={(e) => setSpouseIncome(e.target.value)}
                        placeholder="예: 400"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-lg"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">만원</span>
                    </div>
                  </div>
                  <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-5 mt-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      세전 <strong>월</strong> 소득을 <strong>만원 단위</strong>로 입력해주세요. 연봉은 12로 나누어 기입하시면 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md">3</span>
                  자녀 거주 지역
                </h3>
                <div className="space-y-4 ml-0 md:ml-13">
                  <p className="text-base font-semibold text-gray-900 mb-3">자녀가 거주할 지역</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {REGION_OPTIONS.map((option) => (
                      <label
                        key={option.value}
                        className={`flex-1 rounded-xl px-5 py-3 md:py-4 text-base font-medium cursor-pointer transition-all duration-200 ${
                          regionType === option.value
                            ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="region"
                          value={option.value}
                          checked={regionType === option.value}
                          onChange={() => setRegionType(option.value)}
                          className="mr-2"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-light mt-3">
                    서울가정법원 2025년 산정표는 도시와 농어촌 표를 별도로 제공합니다
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-md">4</span>
                  자녀 정보
                </h3>
                <div className="space-y-4 ml-0 md:ml-13">
                  <div>
                    <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      자녀 수
                    </label>
                    <select
                      value={numberOfChildren}
                      onChange={(e) => handleChildrenCountChange(Number(e.target.value))}
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-lg bg-white"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num}명
                        </option>
                      ))}
                    </select>
                  </div>

                  {children.map((child, index) => (
                    <div key={index}>
                      <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {index + 1}번째 자녀 나이 (만)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={child.age === '' ? '' : child.age}
                          onChange={(e) => handleChildAgeChange(index, e.target.value)}
                          min="0"
                          max="18"
                          placeholder="예: 7"
                          className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all text-lg"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">세</span>
                      </div>
                    </div>
                  ))}
                  <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-5 mt-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      산정표는 만나이를 기준으로 <strong>0~2세, 3~5세, 6~8세, 9~11세, 12~14세, 15~18세</strong> 구간으로 계산합니다.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>


            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button
                  onClick={calculateChildSupport}
                  className="flex-1 bg-gray-900 text-white font-bold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  양육비 계산하기
                </button>
                <button
                  onClick={resetForm}
                  className="sm:w-auto px-8 py-3 md:px-10 md:py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full text-base md:text-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  초기화
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {showResult && result && (
        <section id="result-section" className="py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-white via-blue-50/20 to-white">
          <div className="max-w-[800px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Result</p>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">계산 결과</h2>
                <p className="text-base text-gray-700 font-light">
                  2025년 양육비 산정표 기준 예상 금액입니다
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-700 rounded-3xl p-12 mb-8 text-center shadow-2xl">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-blue-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm md:text-base text-blue-100 font-medium">{nonCustodyLabel}가 매월 지급할 양육비</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl py-8 px-6 mb-4">
                  <p className="text-6xl md:text-7xl font-bold text-white mb-2">
                    {result.monthlyAmount.toLocaleString()}
                    <span className="text-3xl md:text-4xl ml-3 font-medium">원</span>
                  </p>
                </div>
                <p className="text-sm text-blue-100">* 2025년 양육비 산정표 기준 참고용 금액입니다</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">상세 내역</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <span className="text-base text-gray-700">기본 양육비</span>
                    <span className="text-lg font-bold text-gray-900">{result.baseAmount.toLocaleString()}원</span>
                  </div>

                  {result.additionalCosts > 0 && (
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-base text-gray-700">추가 비용</span>
                      <span className="text-lg font-bold text-gray-900">{result.additionalCosts.toLocaleString()}원</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pb-4 border-b-2 border-gray-300">
                    <span className="text-base font-bold text-gray-900">총 양육비</span>
                    <span className="text-xl font-bold text-gray-900">{result.totalAmount.toLocaleString()}원</span>
                  </div>

                  <div className="bg-blue-50/50 rounded-xl p-6 mt-6">
                    <h4 className="text-base font-bold text-gray-900 mb-4">소득 비율에 따른 분담</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{custodyLabel} 부담</span>
                        <span className="text-base font-bold text-gray-900">{result.custodyParentShare.toLocaleString()}원</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{nonCustodyLabel} 부담</span>
                        <span className="text-base font-bold text-gray-900">{result.nonCustodyParentShare.toLocaleString()}원</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 font-light leading-relaxed">
                      {custodyLabel}이 직접 부담하는 비용을 제외하면, {nonCustodyLabel}는 매월{' '}
                      <strong className="font-semibold">{result.monthlyAmount.toLocaleString()}원</strong>을 지급하게 됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">유의사항</h4>
                <ul className="space-y-3 text-sm text-gray-700 font-light">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                    <span>이 계산기는 양육비 산정표를 기준으로 한 참고용 도구입니다.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                    <span>실제 양육비는 부모의 재산, 생활 수준, 자녀의 필요 등을 종합적으로 고려하여 결정됩니다.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                    <span>정확한 양육비 산정을 원하시면 전문 변호사와 상담하시길 권장합니다.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                    <span>소득이 0원으로 입력되더라도 법원은 최저양육비나 추정 소득을 적용하여 일정 금액 이상을 부담하게 할 수 있습니다.</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:1661-7633"
                  className="flex-1 inline-block text-center bg-gray-900 text-white font-bold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
                >
                  전문가 상담하기
                </a>
                <button
                  onClick={resetForm}
                  className="sm:w-auto px-8 py-3 md:px-10 md:py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-full text-base md:text-lg hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  다시 계산하기
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="py-20 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1040px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs md:text-sm text-gray-500 mb-3 tracking-[0.2em] uppercase">Principles</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">2025년 양육비 산정표 핵심</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <ScrollReveal delay={100}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">공정한 기준</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">
                  서울가정법원이 공표한 2025년 산정표는 부모 합산 소득과 자녀의 나이를 기준으로 적정 양육비를 산출합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">소득 비례 원칙</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">
                  양육비는 부모의 소득 비율에 따라 분담됩니다. 소득이 높은 쪽이 더 많은 비용을 부담하며, 자녀의 생활 수준이 유지되도록 합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">자녀 중심 원칙</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">
                  양육비는 자녀의 복리를 최우선으로 고려하여 산정됩니다. 자녀의 나이, 교육비, 의료비 등 실제 필요한 비용을 반영합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">조정 가능성</h3>
                <p className="text-base text-gray-700 font-light leading-relaxed">
                  소득 변동, 재혼, 자녀의 특별한 필요 등 사정 변경 시 양육비 조정을 청구할 수 있습니다.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 px-6 md:px-12 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-[1040px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 leading-tight">
              양육비 문제,<br />전문 변호사와 상담하세요
            </h2>
            <p className="text-base md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
              법무법인 더율의 이혼 전문 변호사가 최적의 양육비 산정을 도와드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:1661-7633"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                지금 상담하기
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
}
