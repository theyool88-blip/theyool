'use client';

interface CostTransparencyProps {
  pageType: 'alimony' | 'custody' | 'property';
}

export default function CostTransparency({ pageType }: CostTransparencyProps) {
  const costData = {
    alimony: {
      title: '위자료 방어 수임료 안내',
      description: '사건 난이도와 청구액에 따라 차등 적용됩니다',
      consultationFee: '무료',
      retainerFee: '200만원~500만원',
      successFee: '감액 성공액의 10~15%',
      paymentOptions: [
        '착수금 분할납부 가능 (3개월)',
        '법률구조공단 지원 가능 (소득 기준)',
        '성공보수는 결과 확정 후 납부',
      ],
      examples: [
        { claim: '3억 청구', retainer: '300만원', success: '감액액의 12%', total: '예: 2.7억 감액 시 총 3,240만원' },
        { claim: '1억 청구', retainer: '200만원', success: '감액액의 15%', total: '예: 7천만원 감액 시 총 1,250만원' },
      ],
    },
    custody: {
      title: '양육권 소송 수임료 안내',
      description: '사건 유형과 긴급성에 따라 차등 적용됩니다',
      consultationFee: '무료',
      retainerFee: '300만원~600만원',
      successFee: '협의 (양육비 1년분의 20% 수준)',
      paymentOptions: [
        '착수금 분할납부 가능 (3개월)',
        '법률구조공단 지원 가능 (소득 기준)',
        '긴급 임시양육자 지정 신청 별도',
      ],
      examples: [
        { claim: '단독 양육권', retainer: '400만원', success: '협의', total: '평균 총 600~800만원' },
        { claim: '공동 → 단독 변경', retainer: '350만원', success: '협의', total: '평균 총 500~700만원' },
      ],
    },
    property: {
      title: '재산분할 소송 수임료 안내',
      description: '분할 대상 재산 규모에 따라 차등 적용됩니다',
      consultationFee: '무료',
      retainerFee: '300만원~800만원',
      successFee: '추가 확보액의 8~12%',
      paymentOptions: [
        '착수금 분할납부 가능 (3개월)',
        '법률구조공단 지원 가능 (소득 기준)',
        '은닉 재산 조회 비용 별도',
      ],
      examples: [
        { claim: '10억 재산', retainer: '500만원', success: '추가 확보액의 10%', total: '예: 3억 추가 확보 시 총 3,500만원' },
        { claim: '3억 재산', retainer: '300만원', success: '추가 확보액의 12%', total: '예: 1억 추가 확보 시 총 1,500만원' },
      ],
    },
  };

  const data = costData[pageType];

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border-2 border-blue-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
            투명한 비용 안내
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600">{data.description}</p>
        </div>

        {/* 기본 수임료 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            기본 수임료 구조
          </h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-700 font-semibold">초회 상담</td>
                <td className="py-3 text-right">
                  <span className="text-green-600 font-bold">{data.consultationFee}</span>
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-700 font-semibold">착수금 (계약 시)</td>
                <td className="py-3 text-right font-bold text-gray-900">{data.retainerFee}</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700 font-semibold">성공보수 (종료 후)</td>
                <td className="py-3 text-right font-bold text-blue-600">{data.successFee}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 납부 옵션 */}
        <div className="bg-yellow-50 rounded-xl p-6 mb-6 border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-2xl">✓</span>
            납부 편의 옵션
          </h3>
          <ul className="space-y-2">
            {data.paymentOptions.map((option, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="text-yellow-600 mt-1">•</span>
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 실제 사례별 예상 비용 */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            사례별 예상 비용
          </h3>
          <div className="space-y-4">
            {data.examples.map((example, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{example.claim}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">예시</span>
                </div>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">착수금</p>
                    <p className="font-semibold text-gray-900">{example.retainer}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">성공보수</p>
                    <p className="font-semibold text-blue-600">{example.success}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">총 예상 비용</p>
                    <p className="font-bold text-emerald-600">{example.total}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-6 bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong className="text-blue-600">📌 참고사항:</strong> 위 비용은 일반적인 사례 기준이며,
            실제 수임료는 사건의 난이도, 증거 상태, 상대방 대응 등을 종합적으로 검토한 후
            <strong> 초회 상담 시 정확히 안내</strong>드립니다. 부담 없이 먼저 상담받아보세요.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const consultForm = document.querySelector('#consultation-form');
              consultForm?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg"
          >
            무료 상담으로 정확한 견적 받기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
