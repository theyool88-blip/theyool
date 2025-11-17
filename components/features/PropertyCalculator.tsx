'use client';

import { useState } from 'react';

export default function PropertyCalculator() {
  const [totalAssets, setTotalAssets] = useState('');
  const [specialAssets, setSpecialAssets] = useState('');
  const [debt, setDebt] = useState('');
  const [contribution, setContribution] = useState(50);
  const [employmentType, setEmploymentType] = useState<'both' | 'single' | 'homemaker'>('both');
  const [result, setResult] = useState<number | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const contributionPresets = {
    both: 50,
    single: 55,
    homemaker: 50,
  };

  const calculate = () => {
    const assets = parseFloat(totalAssets) || 0;
    const special = parseFloat(specialAssets) || 0;
    const debtAmount = parseFloat(debt) || 0;

    const divisibleAssets = Math.max(0, assets - special - debtAmount);
    const myShare = divisibleAssets * (contribution / 100);

    setResult(myShare);
    setShowBreakdown(true);
  };

  const handleEmploymentChange = (type: 'both' | 'single' | 'homemaker') => {
    setEmploymentType(type);
    setContribution(contributionPresets[type]);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 md:p-8 border-2 border-emerald-200 shadow-xl">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">💰</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          예상 재산분할액 계산기
        </h3>
        <p className="text-sm text-gray-600">
          간단한 정보 입력으로 예상 분할액을 즉시 확인하세요
        </p>
      </div>

      <div className="space-y-5">
        {/* 총 재산 규모 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            총 재산 규모 (부부 합산)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="예: 50000"
              value={totalAssets}
              onChange={(e) => setTotalAssets(e.target.value)}
              className="w-full p-4 pr-16 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              만원
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            부동산, 예금, 주식, 차량 등 모든 재산 포함
          </p>
        </div>

        {/* 특유재산 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            특유재산 (본인의 결혼 전 재산 + 상속/증여)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="예: 5000"
              value={specialAssets}
              onChange={(e) => setSpecialAssets(e.target.value)}
              className="w-full p-4 pr-16 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              만원
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            분할 대상에서 제외되는 재산
          </p>
        </div>

        {/* 부채 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            부채 (대출, 빚)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="예: 10000"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              className="w-full p-4 pr-16 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-emerald-500 text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              만원
            </span>
          </div>
        </div>

        {/* 고용 형태 선택 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            혼인 중 고용 상태
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleEmploymentChange('both')}
              className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                employmentType === 'both'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-emerald-300'
              }`}
            >
              맞벌이
              <div className="text-xs mt-1 opacity-75">50%</div>
            </button>
            <button
              type="button"
              onClick={() => handleEmploymentChange('single')}
              className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                employmentType === 'single'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-emerald-300'
              }`}
            >
              외벌이
              <div className="text-xs mt-1 opacity-75">55%</div>
            </button>
            <button
              type="button"
              onClick={() => handleEmploymentChange('homemaker')}
              className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                employmentType === 'homemaker'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-emerald-300'
              }`}
            >
              전업주부
              <div className="text-xs mt-1 opacity-75">50%</div>
            </button>
          </div>
        </div>

        {/* 기여도 슬라이더 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            예상 기여도: <span className="text-emerald-600 text-lg">{contribution}%</span>
          </label>
          <input
            type="range"
            min="30"
            max="70"
            value={contribution}
            onChange={(e) => setContribution(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>30%</span>
            <span>50%</span>
            <span>70%</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 전업주부 평균 45-55%, 내조 입증 시 60% 이상 가능
          </p>
        </div>

        {/* 계산 버튼 */}
        <button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
        >
          예상 분할액 계산하기
        </button>

        {/* 결과 표시 */}
        {result !== null && showBreakdown && (
          <div className="bg-white rounded-xl p-6 border-2 border-emerald-300 shadow-lg animate-fade-in">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-2">예상 재산분할액</p>
              <p className="text-4xl font-bold text-emerald-600">
                {result.toLocaleString()}만원
              </p>
              <p className="text-sm text-gray-500 mt-1">
                약 {(result / 10000).toFixed(1)}억원
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">총 재산</span>
                <span className="font-semibold">{parseFloat(totalAssets || '0').toLocaleString()}만원</span>
              </div>
              {parseFloat(specialAssets || '0') > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>- 특유재산</span>
                  <span className="font-semibold">-{parseFloat(specialAssets).toLocaleString()}만원</span>
                </div>
              )}
              {parseFloat(debt || '0') > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>- 부채</span>
                  <span className="font-semibold">-{parseFloat(debt).toLocaleString()}만원</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">분할 대상 재산</span>
                <span className="font-semibold">
                  {Math.max(
                    0,
                    parseFloat(totalAssets || '0') -
                      parseFloat(specialAssets || '0') -
                      parseFloat(debt || '0')
                  ).toLocaleString()}만원
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>× 기여도</span>
                <span className="font-semibold">{contribution}%</span>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-gray-700">
                <strong>⚠️ 주의:</strong> 이 계산은 예상치이며, 실제 분할액은 재산 형성 과정,
                증거 자료, 법원 판단 등에 따라 달라질 수 있습니다. 정확한 상담은 전문 변호사와 진행하세요.
              </p>
            </div>

            <button
              onClick={() => {
                const consultSection = document.querySelector('#consultation-form');
                consultSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              전문 변호사 무료 상담 받기 →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
