'use client';

import { useState } from 'react';
import Image from 'next/image';

interface EvidenceGalleryProps {
  pageType: 'alimony' | 'custody' | 'property';
}

export default function EvidenceGallery({ pageType }: EvidenceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const evidenceData = {
    alimony: {
      title: '실제 감액 성공 증거',
      description: '법원 판결문과 합의서로 증명하는 확실한 성과',
      images: [
        {
          id: 1,
          thumbnail: '/images/evidence/alimony-judgment-1.jpg',
          full: '/images/evidence/alimony-judgment-1-full.jpg',
          title: '5억→3천만원 판결문',
          description: '청구액 5억원에서 3천만원으로 94% 감액 확정',
          badge: '94% 감액',
        },
        {
          id: 2,
          thumbnail: '/images/evidence/alimony-judgment-2.jpg',
          full: '/images/evidence/alimony-judgment-2-full.jpg',
          title: '3억→완전 기각 판결',
          description: '증거 불충분으로 위자료 청구 전부 기각',
          badge: '0원 방어',
        },
        {
          id: 3,
          thumbnail: '/images/evidence/alimony-settlement.jpg',
          full: '/images/evidence/alimony-settlement-full.jpg',
          title: '2억→5천만원 합의서',
          description: '재산분할과 상계하여 75% 감액 합의',
          badge: '75% 감액',
        },
      ],
    },
    custody: {
      title: '양육권 확보 증거',
      description: '법원 결정문으로 증명하는 승소 사례',
      images: [
        {
          id: 1,
          thumbnail: '/images/evidence/custody-judgment-1.jpg',
          full: '/images/evidence/custody-judgment-1-full.jpg',
          title: '단독 양육권 결정문',
          description: '경제력 열세에도 주 양육자 인정받아 승소',
          badge: '엄마 승소',
        },
        {
          id: 2,
          thumbnail: '/images/evidence/custody-emergency.jpg',
          full: '/images/evidence/custody-emergency-full.jpg',
          title: '임시양육자 지정 결정',
          description: '72시간 만에 긴급 양육권 확보',
          badge: '긴급 승소',
        },
        {
          id: 3,
          thumbnail: '/images/evidence/custody-dad.jpg',
          full: '/images/evidence/custody-dad-full.jpg',
          title: '아빠 양육권 결정문',
          description: '자녀 의사 존중하여 아빠 양육권 인정',
          badge: '아빠 승소',
        },
      ],
    },
    property: {
      title: '재산분할 승소 증거',
      description: '은닉 재산 발견과 기여도 인정 판결',
      images: [
        {
          id: 1,
          thumbnail: '/images/evidence/property-judgment-1.jpg',
          full: '/images/evidence/property-judgment-1-full.jpg',
          title: '은닉 재산 3억 발견',
          description: '금융조회로 가족 명의 재산 추적 성공',
          badge: '3억 발견',
        },
        {
          id: 2,
          thumbnail: '/images/evidence/property-60percent.jpg',
          full: '/images/evidence/property-60percent-full.jpg',
          title: '60% 기여도 인정 판결',
          description: '전업주부 내조 인정받아 10억 중 6억 획득',
          badge: '60% 인정',
        },
        {
          id: 3,
          thumbnail: '/images/evidence/property-protection.jpg',
          full: '/images/evidence/property-protection-full.jpg',
          title: '특유재산 보호 결정',
          description: '상속 재산 1억 분할 대상 제외 확정',
          badge: '완벽 보호',
        },
      ],
    },
  };

  const data = evidenceData[pageType];

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const selectedImageData = data.images.find((img) => img.id === selectedImage);

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
      <div className="text-center mb-12">
        <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
          실제 증거
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {data.title}
        </h2>
        <p className="text-gray-600">{data.description}</p>
      </div>

      {/* 이미지 그리드 */}
      <div className="grid md:grid-cols-3 gap-6">
        {data.images.map((image) => (
          <div
            key={image.id}
            onClick={() => openLightbox(image.id)}
            className="relative group cursor-pointer bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl"
          >
            {/* 배지 */}
            <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {image.badge}
            </div>

            {/* 이미지 (Placeholder) */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500 font-semibold">판결문</p>
                </div>
              </div>
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all">
                  <div className="bg-white rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <div className="p-4">
              <h3 className="font-bold text-gray-900 mb-1">{image.title}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 안내 메시지 */}
      <div className="mt-8 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <p className="text-sm text-gray-700 text-center">
          <strong className="text-yellow-700">💡 참고:</strong> 실제 판결문은 개인정보 보호를 위해
          일부 내용이 가려져 있습니다. 상담 시 전체 판결문을 확인하실 수 있습니다.
        </p>
      </div>

      {/* Lightbox 모달 */}
      {selectedImage && selectedImageData && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="닫기"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            className="max-w-4xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 이미지 영역 */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="w-24 h-24 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 font-semibold">판결문 원본</p>
                  <p className="text-sm text-gray-400 mt-2">개인정보 보호를 위해 일부 가림 처리</p>
                </div>
              </div>
            </div>

            {/* 설명 영역 */}
            <div className="p-6">
              <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                {selectedImageData.badge}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedImageData.title}
              </h3>
              <p className="text-gray-700">{selectedImageData.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
