'use client';

import { useState } from 'react';

interface DocumentChecklistProps {
  pageType: 'alimony' | 'custody' | 'property';
}

export default function DocumentChecklist({ pageType }: DocumentChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const checklistData = {
    alimony: {
      title: '위자료 방어 상담 시 준비 서류',
      description: '아래 서류를 준비하시면 더 정확한 상담이 가능합니다',
      required: [
        { id: 1, name: '위자료 청구서 (내용증명 또는 소장)', importance: '필수' },
        { id: 2, name: '혼인관계증명서', importance: '필수' },
        { id: 3, name: '상대방 주장 증거 자료 (카톡, 사진 등)', importance: '필수' },
      ],
      recommended: [
        { id: 4, name: '본인 소득·재산 증명 서류 (원천징수, 등기부 등)' },
        { id: 5, name: '상대방 유책 사유 입증 자료 (있는 경우)' },
        { id: 6, name: '혼인 파탄 경위 정리 메모' },
        { id: 7, name: '이전 합의 내용 (있는 경우)' },
      ],
      tip: '서류가 없어도 상담 가능합니다. 기억나는 내용만으로도 충분히 상담 가능하니 부담 갖지 마세요.',
    },
    custody: {
      title: '양육권 상담 시 준비 서류',
      description: '아래 서류를 준비하시면 더 정확한 상담이 가능합니다',
      required: [
        { id: 1, name: '가족관계증명서 (자녀 포함)', importance: '필수' },
        { id: 2, name: '주민등록등본 (자녀 현 거주지)', importance: '필수' },
        { id: 3, name: '자녀 현황 정리 (나이, 학교, 건강 상태)', importance: '필수' },
      ],
      recommended: [
        { id: 4, name: '어린이집/학교 생활기록부' },
        { id: 5, name: '양육 증빙 자료 (사진, 영수증, 일기 등)' },
        { id: 6, name: '본인 소득증명원 (재직증명서, 급여명세서)' },
        { id: 7, name: '상대방 양육 부적격 증거 (있는 경우)' },
        { id: 8, name: '자녀 의견서 (만 13세 이상)' },
      ],
      tip: '긴급한 경우(자녀 탈취 등) 서류 없이도 즉시 상담 가능합니다. 우선 연락주세요.',
    },
    property: {
      title: '재산분할 상담 시 준비 서류',
      description: '아래 서류를 준비하시면 더 정확한 상담이 가능합니다',
      required: [
        { id: 1, name: '혼인관계증명서', importance: '필수' },
        { id: 2, name: '본인 재산 목록 (부동산, 예금, 주식 등)', importance: '필수' },
        { id: 3, name: '상대방 알고 있는 재산 정보', importance: '필수' },
      ],
      recommended: [
        { id: 4, name: '부동산 등기부등본 (본인 + 상대방)' },
        { id: 5, name: '금융거래 내역 (통장 사본)' },
        { id: 6, name: '결혼 전 재산 증명 자료 (특유재산)' },
        { id: 7, name: '상속·증여 증명 서류 (있는 경우)' },
        { id: 8, name: '부채 증명 서류 (대출계약서 등)' },
        { id: 9, name: '사업자등록증 (사업자인 경우)' },
        { id: 10, name: '재산 은닉 의심 정황 메모' },
      ],
      tip: '정확한 재산 목록을 모르셔도 괜찮습니다. 상담 후 금융조회 신청으로 파악 가능합니다.',
    },
  };

  const data = checklistData[pageType];

  const handleCheck = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = data.required.length + data.recommended.length;
  const checkedCount = checkedItems.size;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border-2 border-green-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
            준비 서류 체크리스트
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600">{data.description}</p>
        </div>

        {/* 진행률 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              준비 완료: {checkedCount}/{totalItems}
            </span>
            <span className="text-sm font-bold text-green-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 필수 서류 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-red-500">★</span>
            필수 서류
          </h3>
          <div className="space-y-3">
            {data.required.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-green-300 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleCheck(item.id)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                    {item.importance}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 권장 서류 */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-green-500">✓</span>
            권장 서류 (있으면 더 좋습니다)
          </h3>
          <div className="space-y-2">
            {data.recommended.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-200 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleCheck(item.id)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 팁 */}
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <span className="text-xl">💡</span>
            <span><strong>Tip:</strong> {data.tip}</span>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const consultForm = document.querySelector('#consultation-form');
              consultForm?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg"
          >
            {checkedCount > 0 ? `${checkedCount}개 준비 완료! 상담 신청하기` : '지금 바로 상담 신청하기'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            서류 준비가 안 되어도 상담 가능합니다
          </p>
        </div>
      </div>
    </section>
  );
}
