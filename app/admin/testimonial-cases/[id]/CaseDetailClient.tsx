'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO, PHOTO_TYPE_INFO } from '@/types/testimonial';
import CaseFormModal from '../CaseFormModal';
import EvidencePhotoUploader from './EvidencePhotoUploader';

interface Props {
  testimonialCase: TestimonialCase;
  initialEvidencePhotos: EvidencePhoto[];
  photosError?: string;
}

export default function CaseDetailClient({
  testimonialCase: initialCase,
  initialEvidencePhotos,
  photosError,
}: Props) {
  const [testimonialCase, setTestimonialCase] = useState(initialCase);
  const [evidencePhotos, setEvidencePhotos] = useState(initialEvidencePhotos);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const categoryInfo = CATEGORY_INFO[testimonialCase.category];

  const handleUpdateSuccess = (updatedCase: TestimonialCase) => {
    setTestimonialCase(updatedCase);
    setIsEditModalOpen(false);
  };

  const handlePhotoUploadSuccess = (newPhoto: EvidencePhoto) => {
    setEvidencePhotos((prev) => [...prev, newPhoto].sort((a, b) => a.display_order - b.display_order));
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('이 증빙 사진을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/testimonials/evidence-photo/${photoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      setEvidencePhotos((prev) => prev.filter((p) => p.id !== photoId));
      alert('사진이 삭제되었습니다.');
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return '-';
    return `${(amount / 100000000).toFixed(1)}억원`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/testimonial-cases"
                className="text-gray-600 hover:text-gray-900"
              >
                ← 목록으로
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.bgColor} ${categoryInfo.color}`}
                  >
                    <span>{categoryInfo.icon}</span>
                    <span>{categoryInfo.label}</span>
                  </span>
                  <h1 className="text-2xl font-bold">{testimonialCase.highlight_text}</h1>
                </div>
                <p className="text-gray-600 mt-1">
                  {testimonialCase.client_initial} {testimonialCase.client_role} · {testimonialCase.case_date}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              케이스 수정
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Case Info */}
          <div className="col-span-1 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold text-lg mb-4">기본 정보</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-600">결과 금액</dt>
                  <dd className="text-lg font-semibold text-rose-600">
                    {formatAmount(testimonialCase.case_result_amount)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">사건 기간</dt>
                  <dd className="font-medium">{testimonialCase.case_duration || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">담당 변호사</dt>
                  <dd className="font-medium">{testimonialCase.attorney_name || '-'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">연령대</dt>
                  <dd className="font-medium">{testimonialCase.client_age_group || '-'}</dd>
                </div>
              </dl>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold text-lg mb-4">상태</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">게시 동의</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonialCase.consent_given
                        ? 'bg-green-50 text-green-700'
                        : 'bg-orange-50 text-orange-700'
                    }`}
                  >
                    {testimonialCase.consent_given ? '✓ 동의' : '⚠ 대기'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">게시 여부</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonialCase.published
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {testimonialCase.published ? '✓ 게시' : '비공개'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">추천 케이스</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      testimonialCase.featured
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {testimonialCase.featured ? '⭐ 추천' : '일반'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold text-lg mb-4">통계</h2>
              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">증빙 사진</dt>
                  <dd className="text-lg font-semibold text-blue-600">
                    {evidencePhotos.length}개
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">조회수</dt>
                  <dd className="font-medium">{testimonialCase.views}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">도움됨</dt>
                  <dd className="font-medium">{testimonialCase.helpful_count}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column - Stories & Evidence Photos */}
          <div className="col-span-2 space-y-6">
            {/* Stories Card */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="font-semibold text-lg mb-4">후기 스토리</h2>
              <div className="space-y-4">
                {testimonialCase.full_story && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">전체 후기</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">{testimonialCase.full_story}</p>
                  </div>
                )}
                {testimonialCase.story_before && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">상담 전</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {testimonialCase.story_before}
                    </p>
                  </div>
                )}
                {testimonialCase.story_journey && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">진행 과정</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {testimonialCase.story_journey}
                    </p>
                  </div>
                )}
                {testimonialCase.story_after && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">결과 후</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {testimonialCase.story_after}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Evidence Photos Card */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">증빙 사진</h2>
                <span className="text-sm text-gray-600">{evidencePhotos.length}개</span>
              </div>

              {photosError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                  {photosError}
                </div>
              )}

              {/* Photo Uploader */}
              <EvidencePhotoUploader
                caseId={testimonialCase.id}
                onUploadSuccess={handlePhotoUploadSuccess}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />

              {/* Photo Grid */}
              {evidencePhotos.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {evidencePhotos.map((photo) => {
                    const typeInfo = PHOTO_TYPE_INFO[photo.evidence_type];
                    return (
                      <div key={photo.id} className="relative group border rounded-lg overflow-hidden">
                        <img
                          src={photo.photo_url}
                          alt={photo.alt_text || '증빙 사진'}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${typeInfo.bgColor} ${typeInfo.color}`}
                          >
                            <span>{typeInfo.icon}</span>
                            <span>{typeInfo.label}</span>
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                          >
                            삭제
                          </button>
                        </div>
                        {photo.caption && (
                          <div className="p-2 bg-gray-50 border-t">
                            <p className="text-xs text-gray-600">{photo.caption}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 text-center py-12 text-gray-500">
                  아직 업로드된 증빙 사진이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <CaseFormModal
          testimonialCase={testimonialCase}
          onClose={() => setIsEditModalOpen(false)}
          onSaveSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}
