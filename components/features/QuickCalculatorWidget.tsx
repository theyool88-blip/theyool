'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QuickCalculatorWidget() {
  const [activeCalc, setActiveCalc] = useState<'child' | 'alimony'>('child');
  const [income, setIncome] = useState('');
  const [childCount, setChildCount] = useState('1');
  const [result, setResult] = useState<number | null>(null);

  const calculateChildSupport = () => {
    const incomeNum = parseInt(income.replace(/,/g, ''));
    if (isNaN(incomeNum) || incomeNum <= 0) {
      alert('월 소득을 올바르게 입력해주세요');
      return;
    }

    const childNum = parseInt(childCount);
    // 간단한 양육비 계산 (실제는 더 복잡)
    const baseAmount = incomeNum * 0.15; // 소득의 약 15%
    const perChild = childNum === 1 ? 1 : childNum === 2 ? 1.5 : 1.8;
    const estimated = Math.round(baseAmount * perChild / 10000) * 10000;

    setResult(estimated);
  };

  const estimateAlimony = () => {
    const incomeNum = parseInt(income.replace(/,/g, ''));
    if (isNaN(incomeNum) || incomeNum <= 0) {
      alert('월 소득을 올바르게 입력해주세요');
      return;
    }

    // 위자료 예상 범위 (매우 간단한 추정)
    const minAmount = Math.round(incomeNum * 6 / 10000) * 10000;
    const maxAmount = Math.round(incomeNum * 24 / 10000) * 10000;

    setResult(maxAmount);
  };

  const formatNumber = (num: string) => {
    return num.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* 제목 */}
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm text-purple-600/70 mb-3 tracking-[0.2em] uppercase">
            Quick Calculator
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            예상 금액을 미리 확인하세요
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            간단한 정보만으로 양육비와 위자료 예상 금액을 즉시 확인할 수 있습니다
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* 탭 */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => {
                  setActiveCalc('child');
                  setResult(null);
                }}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${
                  activeCalc === 'child'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                양육비 계산
              </button>
              <button
                onClick={() => {
                  setActiveCalc('alimony');
                  setResult(null);
                }}
                className={`flex-1 py-4 text-center font-semibold transition-colors ${
                  activeCalc === 'alimony'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                위자료 예상
              </button>
            </div>

            {/* 계산기 내용 */}
            <div className="p-8">
              {activeCalc === 'child' ? (
                <>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        상대방 월 소득 (세전)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={income}
                          onChange={(e) => setIncome(formatNumber(e.target.value))}
                          placeholder="예: 5,000,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500">원</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        자녀 수
                      </label>
                      <select
                        value={childCount}
                        onChange={(e) => setChildCount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="1">1명</option>
                        <option value="2">2명</option>
                        <option value="3">3명 이상</option>
                      </select>
                    </div>

                    <button
                      onClick={calculateChildSupport}
                      className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      양육비 계산하기
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        상대방 월 소득 (세전)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={income}
                          onChange={(e) => setIncome(formatNumber(e.target.value))}
                          placeholder="예: 5,000,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500">원</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-xs text-amber-800">
                        <strong>안내:</strong> 위자료는 혼인 기간, 불법행위 정도, 재산 상황 등 여러 요소를 고려하여 결정됩니다.
                        이 계산은 참고용이며, 정확한 금액은 변호사 상담을 통해 확인하시기 바랍니다.
                      </p>
                    </div>

                    <button
                      onClick={estimateAlimony}
                      className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      위자료 예상하기
                    </button>
                  </div>
                </>
              )}

              {/* 결과 표시 */}
              {result !== null && (
                <div className="mt-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <p className="text-sm text-purple-600 mb-2">예상 금액</p>
                  <p className="text-3xl font-bold text-purple-600 mb-4">
                    {activeCalc === 'child'
                      ? `월 ${result.toLocaleString()}원`
                      : `약 ${Math.floor(result / 2).toLocaleString()}만원 ~ ${result.toLocaleString()}원`}
                  </p>
                  <p className="text-xs text-gray-600 mb-4">
                    {activeCalc === 'child'
                      ? '* 실제 양육비는 양측의 소득, 양육 비용 등을 종합적으로 고려하여 결정됩니다.'
                      : '* 실제 위자료는 혼인 기간, 유책 사유, 재산 상황 등을 종합적으로 고려하여 결정됩니다.'}
                  </p>
                  <Link
                    href={activeCalc === 'child' ? '/child-support-calculator' : '/faq?category=위자료'}
                    className="inline-block px-6 py-2 bg-purple-500 text-white text-sm font-semibold rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {activeCalc === 'child' ? '정확한 계산 하러 가기 →' : '위자료 상담 신청하기 →'}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* 하단 안내 */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>더 정확한 계산과 법적 자문이 필요하신가요?</p>
            <Link href="tel:1661-7633" className="text-purple-600 font-semibold hover:underline">
              지금 무료 상담 받기 (1661-7633)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
