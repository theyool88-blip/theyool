'use client';

import PageLayout from '@/components/layouts/PageLayout';
import ConsultationBookingModal from '@/components/features/ConsultationBooking/ConsultationBookingModal';
import PhonePrepModal from '@/components/features/PhonePrepModal';
import { useState } from 'react';

export default function LawyerFeesPage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  return (
    <PageLayout>
    <div className="min-h-screen bg-white">
      {/* 히어로 섹션 */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              투명한 변호사 비용
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              사건의 성격과 난이도에 따른 합리적인 수임료를 책정합니다.
              <br />
              모든 비용은 사전에 투명하게 안내드리며, <span className="text-sage-700 font-semibold">숨겨진 비용은 없습니다.</span>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-8 py-4 bg-sage-600 text-white rounded-lg font-semibold hover:bg-sage-700 transition-colors"
            >
              상담 신청하기
            </button>
            <button
              onClick={() => {
                const section = document.getElementById('cost-examples');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-sage-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              비용 계산 예시 보기
            </button>
          </div>
        </div>
      </section>

      {/* 요금 기준 안내 */}
      <div className="bg-amber-50 border-l-4 border-amber-500 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-amber-800 flex items-start gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>
              <strong className="font-semibold">2025년 1월 기준</strong> 요금입니다.
              요금 제도는 법무법인 정책에 따라 변경될 수 있으며, 사건의 난이도, 소송 가액 등에 따라 개별 조정될 수 있습니다. 정확한 비용은 무료 상담을 통해 안내드립니다.
            </span>
          </p>
        </div>
      </div>

      {/* 무료 상담 안내 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            전화상담 10분 무료
          </h2>

          <div className="bg-sage-50 rounded-xl p-8 border border-sage-200">
            <p className="text-gray-700 text-lg text-center mb-6 leading-relaxed">
              전화로 사건을 검토하고 구체적인 비용을 안내드립니다.
              <br />
              변호사 선임 여부는 상담 후 결정하실 수 있습니다.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-sage-100">
                <p className="text-gray-700 flex items-start">
                  <span className="text-sage-600 mr-2">•</span>
                  사건의 승소 가능성 검토
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sage-100">
                <p className="text-gray-700 flex items-start">
                  <span className="text-sage-600 mr-2">•</span>
                  예상 소요 기간 안내
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sage-100">
                <p className="text-gray-700 flex items-start">
                  <span className="text-sage-600 mr-2">•</span>
                  구체적인 비용 견적
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sage-100">
                <p className="text-gray-700 flex items-start">
                  <span className="text-sage-600 mr-2">•</span>
                  단계별 진행 프로세스
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 결제 옵션 - 위로 이동 */}
      <section className="py-16" style={{ background: 'var(--sage-bg-medium)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            다양한 결제 옵션
          </h2>
          <p className="text-center text-gray-600 mb-12">
            다양한 결제 옵션을 선택할 수 있습니다
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 분할 납부 */}
            <div className="bg-white rounded-xl p-6 border-2 border-sage-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-sage-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">분할 납부</h3>
                  <p className="text-gray-700 mb-3">
                    착수금을 2~3회로 나누어 납부할 수 있습니다.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      경제적 상황에 맞춰 조정 가능
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      상담 시 구체적인 일정 협의
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      별도 이자 없음
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 후불제 (성공보수) */}
            <div className="bg-white rounded-xl p-6 border-2 border-sage-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-sage-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">후불제 (성공보수)</h3>
                  <p className="text-gray-700 mb-3">
                    원칙은 판결 후 지급이지만, 후불제 약정 시 실제 지급받은 후 납부 가능합니다.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      원칙: 판결 확정 후 지급
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      후불제 약정: 실제 금액 수령 후 지급 가능
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      패소 시 성공보수 없음
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 착수금 무료 플랜 */}
            <div className="bg-gradient-to-br from-sage-600 to-sage-700 rounded-xl p-6 border-2 border-sage-600 text-white shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">착수금 무료 플랜</h3>
                  <p className="mb-3 text-sage-50">
                    일부 사건에 한해 착수금 없이 성공보수만으로 진행 가능합니다.
                  </p>
                  <ul className="space-y-1 text-sm text-sage-100">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      위자료 청구 사건 중심
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      변호사 판단에 따라 적용
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      상담 시 신청 가능 여부 확인
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 결제 수단 */}
            <div className="bg-white rounded-xl p-6 border-2 border-sage-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-sage-600 text-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">다양한 결제 수단</h3>
                  <p className="text-gray-700 mb-3">
                    편리한 방법으로 결제하실 수 있습니다.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      계좌 이체 (가장 일반적)
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      신용카드 결제
                    </li>
                    <li className="flex items-start">
                      <span className="text-sage-600 mr-2">•</span>
                      현금 납부
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              <strong className="text-gray-900 block mb-2">결제 관련 안내</strong>
              모든 결제 옵션은 상담 시 구체적인 상황에 맞춰 조정 가능합니다.
              경제 상황에 따라 적합한 결제 방법을 협의할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 가사사건별 비용 안내 */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              사건 유형별 변호사 비용
            </h2>
            <p className="text-gray-600">
              아래 비용은 일반적인 기준이며, 사안의 복잡도와 재산 규모에 따라 조정될 수 있습니다.
              <br />
              정확한 비용은 무료 전화상담을 통해 안내받으실 수 있습니다.
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. 이혼 소송 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">1. 이혼 소송</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">구분</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">착수금</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">성공보수</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">협의이혼</td>
                      <td className="px-6 py-4 text-sm text-gray-700">100만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">-</td>
                      <td className="px-6 py-4 text-sm text-gray-600">서류 작성 및 상담 지원</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">조정이혼</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">협의</td>
                      <td className="px-6 py-4 text-sm text-gray-600">법원 조정 대리</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">재판이혼</td>
                      <td className="px-6 py-4 text-sm text-gray-700">300만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">재산분할액의 5~10%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">1심 기준</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
                <p className="mb-1">• 재산분할이 복잡한 경우 별도 협의</p>
                <p className="mb-1">• 항소심/상고심은 별도 계약</p>
                <p>• 긴급 가처분 신청 시 추가 비용 발생 가능</p>
              </div>
            </div>

            {/* 2. 위자료 청구 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">2. 위자료 청구</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">구분</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">착수금</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">성공보수</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">단독 청구</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">인용액의 15~20%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">위자료만 청구하는 경우</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">이혼 병행</td>
                      <td className="px-6 py-4 text-sm text-gray-700">100만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">인용액의 10~15%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">이혼소송과 함께 진행</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. 재산분할 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">3. 재산분할</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">재산 규모</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">착수금</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">성공보수</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">1억 미만</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">확보액의 8~10%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">1억~5억</td>
                      <td className="px-6 py-4 text-sm text-gray-700">300만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">확보액의 6~8%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">5억 이상</td>
                      <td className="px-6 py-4 text-sm text-gray-700">500만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">확보액의 5~7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
                <p className="mb-1">• 재산 은닉 조사 필요 시 별도 비용</p>
                <p className="mb-1">• 해외 자산 포함 시 추가 협의</p>
                <p>• 부동산 명도 포함 시 별도 계산</p>
              </div>
            </div>

            {/* 4. 양육권/양육비 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">4. 양육권/양육비</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">구분</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">착수금</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">성공보수</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">양육권 지정</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">100~300만원</td>
                      <td className="px-6 py-4 text-sm text-gray-600">양육권 확보 시</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">양육비 청구</td>
                      <td className="px-6 py-4 text-sm text-gray-700">150만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">3개월분 양육비</td>
                      <td className="px-6 py-4 text-sm text-gray-600">최초 청구 기준</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">양육비 변경</td>
                      <td className="px-6 py-4 text-sm text-gray-700">100만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">증액분의 3개월분</td>
                      <td className="px-6 py-4 text-sm text-gray-600">증액 청구 시</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. 상간자 소송 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">5. 상간자 소송</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">구분</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">착수금</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">성공보수</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">손해배상</td>
                      <td className="px-6 py-4 text-sm text-gray-700">200만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">인용액의 20~25%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">불법행위 입증 필요</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">위자료 병행</td>
                      <td className="px-6 py-4 text-sm text-gray-700">추가 100만원~</td>
                      <td className="px-6 py-4 text-sm text-gray-700">인용액의 15~20%</td>
                      <td className="px-6 py-4 text-sm text-gray-600">배우자 상대 병행</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 6. 기타 가사사건 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-sage-700 text-white px-6 py-4">
                <h3 className="text-xl font-bold">6. 기타 가사사건</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  혼인무효, 취소, 친생자관계존부확인, 파양, 친권상실·제한, 후견인 선임 등
                  <br />
                  기타 가사사건은 사안별로 별도 협의하여 결정합니다.
                </p>
                <p className="text-gray-600 text-sm">
                  관련 민사·형사 사건은 별도 협의에 따라 진행합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비용 계산 예시 */}
      <section id="cost-examples" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            실제 비용 계산 예시
          </h2>

          <div className="space-y-6">
            {/* 예시 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                사례 1: 재산분할이 있는 이혼
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>상황:</strong> 결혼 10년, 아파트(시가 3억) 보유, 자녀 2명
                </p>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">비용 구성:</p>
                <div className="ml-4 space-y-2">
                  <p>1. 재판이혼 착수금: <span className="font-semibold text-sage-700">400만원</span></p>
                  <p>2. 재산분할 (1.5억 확보 시): 1,500만원 × 7% = <span className="font-semibold text-sage-700">1,050만원</span></p>
                  <p>3. 양육권/양육비: 착수금 200만원 + 성공보수 <span className="font-semibold text-sage-700">200만원</span></p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    총 예상 비용: 1,850만원
                  </p>
                  <div className="bg-sage-50 rounded-lg p-4 space-y-2.5 border border-sage-100">
                    <p className="text-base font-semibold text-gray-900 mb-3">실제 부담 방식</p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>초기 부담:</strong> 착수금 600만원 (2-3회 분납 가능)</span>
                    </p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>성공보수 1,250만원:</strong> 재산분할 1.5억 수령 후 지급</span>
                    </p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>실질 비용:</strong> 확보한 재산의 12% (1.5억 중 1,850만원)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 예시 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                사례 2: 위자료 단독 청구
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>상황:</strong> 배우자 불륜으로 인한 위자료 청구
                </p>
              </div>
              <div className="space-y-3 text-gray-700">
                <p className="font-semibold text-gray-900">비용 구성:</p>
                <div className="ml-4 space-y-2">
                  <p>1. 착수금: <span className="font-semibold text-sage-700">200만원</span></p>
                  <p>2. 위자료 3,000만원 인용 시: 3,000만원 × 20% = <span className="font-semibold text-sage-700">600만원</span></p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    총 예상 비용: 800만원
                  </p>
                  <div className="bg-sage-50 rounded-lg p-4 space-y-2.5 border border-sage-100">
                    <p className="text-base font-semibold text-gray-900 mb-3">실제 부담 방식</p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>초기 부담:</strong> 착수금 200만원 (분납 가능)</span>
                    </p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>성공보수 600만원:</strong> 위자료 3,000만원 수령 후 지급</span>
                    </p>
                    <p className="flex items-start text-sm text-gray-700">
                      <span className="text-sage-600 mr-2 mt-0.5">•</span>
                      <span><strong>실질 비용:</strong> 수령 위자료의 27% (3,000만원 중 800만원)</span>
                    </p>
                    <p className="flex items-start text-sm text-gray-600 mt-2 pt-2 border-t border-gray-200">
                      <span className="mr-2 mt-0.5">→</span>
                      <span>실수령액: 2,200만원</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: 'var(--sage-bg-medium)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            자주 묻는 질문
          </h2>

          <div className="space-y-4">
            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-sage-50 transition-colors flex justify-between items-center">
                Q1. 당장 큰 돈이 없는데 변호사 선임이 가능한가요?
                <span className="text-sage-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200 leading-relaxed">
                <p className="font-semibold text-gray-900 mb-3">네, 가능합니다. 다음 방법을 제공합니다:</p>
                <div className="space-y-2 ml-4">
                  <p className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    <span><strong>착수금 2-3회 분납</strong> (무이자)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    <span><strong>착수금 무료 플랜</strong> (일부 위자료 청구 사건)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    <span><strong>후불제 약정</strong> (재산 수령 후 지급)</span>
                  </p>
                </div>
                <p className="mt-3 text-gray-700">
                  상담 시 개별 상황에 맞는 방법을 안내합니다.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-sage-50 transition-colors flex justify-between items-center">
                Q2. 성공보수는 언제 지급하나요?
                <span className="text-sage-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200 leading-relaxed">
                <p className="mb-2"><strong className="text-sage-700">원칙:</strong> 판결 확정 후 지급</p>
                <p className="mb-3"><strong className="text-sage-700">후불제 약정 시:</strong> 실제로 금전을 수령하신 때 지급 가능합니다.</p>
                <p className="text-sm text-gray-600">
                  예) 재산분할의 경우 부동산 처분 후, 위자료의 경우 상대방으로부터 실수령 후 지급 가능
                </p>
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-sage-50 transition-colors flex justify-between items-center">
                Q3. 패소하면 비용은 어떻게 되나요?
                <span className="text-sage-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                착수금은 반환되지 않으나, 성공보수는 발생하지 않습니다.
                상대방 소송비용은 패소 비율에 따라 부담하실 수 있습니다.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-sage-50 transition-colors flex justify-between items-center">
                Q4. 법원 비용은 별도인가요?
                <span className="text-sage-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                네, 인지대, 송달료 등 법원 비용은 별도입니다.
                일반적으로 50~200만원 정도이며, 소가에 따라 달라집니다.
              </div>
            </details>

            <details className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-sage-50 transition-colors flex justify-between items-center">
                Q5. 상담만 받고 선임하지 않아도 되나요?
                <span className="text-sage-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-200">
                물론입니다. 전화상담 10분은 무료이며 선임 의무가 없습니다.
                충분히 검토하신 후 결정하실 수 있습니다.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 성공 보수 체계 */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            성공 보수 체계
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">성공 시 지급</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                성공 시에만 추가 보수가 발생합니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">투명한 계산</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                모든 성공보수는 실제 확보한 금액 기준으로 사전에 약정한 비율대로 계산됩니다.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200">
              <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">수령 후 지급</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                재산분할이나 위자료 수령 후 지급하므로 당장의 비용 부담이 적습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 부가 서비스 */}
      <section className="py-16" style={{ background: 'var(--sage-bg-medium)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            추가 제공 서비스
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  무료 부가 서비스
                </h3>
                <ul className="space-y-2.5 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    이혼 후 성본 창설 및 개명 무료 대리
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    양육비 이행명령 신청 무료 지원
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    재산분할 후 등기 자문 무료 제공
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  사건 종료 후 지원
                </h3>
                <ul className="space-y-2.5 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    사건 종료 후 6개월간 무료 법률 자문
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    양육비 미지급 시 강제집행 우대 수임
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    관련 민사 사건 우대 수임
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  법무법인 더율의 실적
                </h3>
                <ul className="space-y-2.5 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    3,000건 이상의 가사사건 수행 경험
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    평균 위자료 인용률 85% 이상
                  </li>
                  <li className="flex items-start">
                    <span className="text-sage-600 mr-2">•</span>
                    재산분할 평균 증액 1.5억원
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            정확한 비용 상담을 받아보세요
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            무료 전화상담으로 사건별 상세한 비용을 안내받으실 수 있습니다
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <button
              onClick={() => setShowBookingModal(true)}
              className="px-10 py-4 bg-sage-600 text-white rounded-lg font-semibold text-lg hover:bg-sage-700 transition-colors"
            >
              상담 신청하기
            </button>
            <button
              onClick={() => setShowPhoneModal(true)}
              className="px-10 py-4 bg-white text-sage-700 border border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              전화 문의하기
            </button>
          </div>

          <p className="text-sm text-gray-600">
            평일 09:00~18:00 | 주말 예약 상담 가능
            <br />
            상담 예약 후 24시간 이내 연락드립니다
          </p>
        </div>
      </section>

      {/* 면책 사항 */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            * 위 비용은 2025년 기준 일반적인 사례를 바탕으로 작성되었습니다.
            <br />
            * 실제 비용은 사안의 복잡도, 긴급성, 관할 법원 등에 따라 달라질 수 있습니다.
            <br />
            * 관련 민사·형사 사건은 별도 협의에 따라 진행합니다.
            <br />
            * 모든 비용은 부가세 별도입니다.
          </p>
        </div>
      </section>

      {/* Modals */}
      <ConsultationBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
      <PhonePrepModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
    </div>
    </PageLayout>
  );
}
