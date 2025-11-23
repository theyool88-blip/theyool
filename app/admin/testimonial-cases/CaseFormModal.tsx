'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import type { TestimonialCase, CaseCategory, PhotoType, EvidencePhoto } from '@/types/testimonial';
import { CATEGORY_INFO, PHOTO_TYPE_INFO } from '@/types/testimonial';

interface Props {
  testimonialCase: TestimonialCase | null;
  onClose: () => void;
  onSaveSuccess: (savedCase: TestimonialCase) => void;
}

type Tab = 'basic' | 'evidence';

export default function CaseFormModal({ testimonialCase, onClose, onSaveSuccess }: Props) {
  const isEditing = !!testimonialCase;
  const [activeTab, setActiveTab] = useState<Tab>('basic');
  const [savedCaseId, setSavedCaseId] = useState<string | null>(testimonialCase?.id || null);

  const [formData, setFormData] = useState({
    category: testimonialCase?.category || 'alimony' as CaseCategory,
    highlight_text: testimonialCase?.highlight_text || '',
    case_result_amount: testimonialCase?.case_result_amount
      ? String(testimonialCase.case_result_amount / 100000000)
      : '',
    client_initial: testimonialCase?.client_initial || '',
    client_role: testimonialCase?.client_role || '',
    client_age_group: testimonialCase?.client_age_group || '',
    full_story: testimonialCase?.full_story || '',
    story_before: testimonialCase?.story_before || '',
    story_journey: testimonialCase?.story_journey || '',
    story_after: testimonialCase?.story_after || '',
    case_date: testimonialCase?.case_date || '',
    case_duration: testimonialCase?.case_duration || '',
    attorney_name: testimonialCase?.attorney_name || '임은지',
    consent_given: testimonialCase?.consent_given || false,
    featured: testimonialCase?.featured || false,
    published: testimonialCase?.published || false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Evidence photo states
  const [evidencePhotos, setEvidencePhotos] = useState<EvidencePhoto[]>([]);
  const [selectedPhotoType, setSelectedPhotoType] = useState<PhotoType>('kakao');
  const [photoCaption, setPhotoCaption] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing evidence photos when editing
  useEffect(() => {
    if (testimonialCase?.id) {
      loadEvidencePhotos(testimonialCase.id);
    }
  }, [testimonialCase?.id]);

  const loadEvidencePhotos = async (caseId: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/evidence-photo?caseId=${caseId}`);
      if (!response.ok) return;

      const { data } = await response.json();
      setEvidencePhotos(data || []);
    } catch (error) {
      console.error('Failed to load evidence photos:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      // Convert amount to won
      const amountInWon = formData.case_result_amount
        ? Math.round(parseFloat(formData.case_result_amount) * 100000000)
        : null;

      const payload = {
        ...formData,
        case_result_amount: amountInWon,
        client_role: formData.client_role || null,
        client_age_group: formData.client_age_group || null,
        full_story: formData.full_story || null,
        story_before: formData.story_before || null,
        story_journey: formData.story_journey || null,
        story_after: formData.story_after || null,
        case_duration: formData.case_duration || null,
        attorney_name: formData.attorney_name || null,
      };

      const url = isEditing
        ? `/api/admin/testimonial-cases/${testimonialCase.id}`
        : '/api/admin/testimonial-cases';

      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save case');
      }

      const { data } = await response.json();
      setSavedCaseId(data.id);

      // If it's a new case and we saved successfully, switch to evidence tab
      if (!isEditing) {
        setActiveTab('evidence');
        alert('케이스가 저장되었습니다! 이제 증빙 사진을 업로드하세요.');
      } else {
        onSaveSuccess(data);
      }
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!savedCaseId) {
      alert('먼저 기본 정보를 저장해주세요.');
      return;
    }

    const file = files[0];

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      alert('지원되는 이미지 형식: JPEG, PNG, WebP, HEIC');
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setIsUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseId', savedCaseId);
      formData.append('evidenceType', selectedPhotoType);
      if (photoCaption) {
        formData.append('caption', photoCaption);
      }

      const response = await fetch('/api/admin/testimonials/evidence-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const { id, photo_url, evidence_type, display_order } = await response.json();

      const newPhoto: EvidencePhoto = {
        id,
        case_id: savedCaseId,
        photo_url,
        evidence_type,
        display_order,
        caption: photoCaption || null,
        original_date: null,
        file_size: file.size,
        file_type: file.type,
        width: null,
        height: null,
        alt_text: null,
        blur_applied: true,
        verified_by: null,
        verified_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null,
        updated_by: null,
      };

      setEvidencePhotos([...evidencePhotos, newPhoto]);
      setPhotoCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('사진이 업로드되었습니다!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (!confirm('이 사진을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/testimonials/evidence-photo/${photoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setEvidencePhotos(evidencePhotos.filter((p) => p.id !== photoId));
      alert('사진이 삭제되었습니다.');
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleFinish = () => {
    if (savedCaseId) {
      // Refresh the case data to include photos
      onSaveSuccess({ ...testimonialCase, id: savedCaseId } as TestimonialCase);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full my-8">
        {/* Header - Enhanced */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl z-10">
          <div className="px-8 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? '케이스 수정' : '새 케이스 추가'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'basic' ? '기본 정보를 입력하세요' : '증빙 사진을 업로드하세요'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all text-2xl w-10 h-10 flex items-center justify-center"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          {/* Tab Navigation - Enhanced */}
          <div className="flex border-b border-gray-200 px-8">
            <button
              type="button"
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === 'basic'
                  ? 'text-amber-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  activeTab === 'basic'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </span>
                기본 정보
              </span>
              {activeTab === 'basic' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"></div>
              )}
            </button>
            <button
              type="button"
              onClick={() => savedCaseId ? setActiveTab('evidence') : alert('먼저 기본 정보를 저장해주세요.')}
              className={`px-6 py-4 font-semibold text-base transition-all relative ${
                activeTab === 'evidence'
                  ? 'text-amber-600'
                  : savedCaseId
                  ? 'text-gray-500 hover:text-gray-700'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              disabled={!savedCaseId}
            >
              <span className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                  activeTab === 'evidence'
                    ? 'bg-amber-600 text-white'
                    : savedCaseId
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </span>
                증빙 사진
                {evidencePhotos.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                    {evidencePhotos.length}
                  </span>
                )}
              </span>
              {activeTab === 'evidence' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content Area - Enhanced Padding */}
        <div className="px-8 py-6 max-h-[calc(90vh-180px)] overflow-y-auto">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 px-5 py-4 rounded-md shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">오류가 발생했습니다</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Basic Info */}
          {activeTab === 'basic' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-xl mb-1 text-gray-900 flex items-center gap-2">
                  <span className="text-amber-600">📋</span>
                  기본 정보
                </h3>
                <p className="text-sm text-gray-600 mb-5">케이스의 기본 정보를 입력하세요</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      카테고리 <span className="text-red-500 text-base">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as CaseCategory })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    >
                      {Object.values(CATEGORY_INFO).map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      사건 날짜 <span className="text-red-500 text-base">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.case_date}
                      onChange={(e) => setFormData({ ...formData, case_date: e.target.value })}
                      placeholder="2024년 10월"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      하이라이트 텍스트 <span className="text-red-500 text-base">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.highlight_text}
                      onChange={(e) => setFormData({ ...formData, highlight_text: e.target.value })}
                      placeholder="위자료 2억 승소"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      결과 금액 (억 단위)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.case_result_amount}
                      onChange={(e) =>
                        setFormData({ ...formData, case_result_amount: e.target.value })
                      }
                      placeholder="2.0"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Client Info Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-xl mb-1 text-gray-900 flex items-center gap-2">
                  <span className="text-amber-600">👤</span>
                  의뢰인 정보
                </h3>
                <p className="text-sm text-gray-600 mb-5">의뢰인의 익명화된 정보를 입력하세요</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      이니셜 <span className="text-red-500 text-base">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.client_initial}
                      onChange={(e) => setFormData({ ...formData, client_initial: e.target.value })}
                      placeholder="김"
                      maxLength={2}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      역할
                    </label>
                    <input
                      type="text"
                      value={formData.client_role}
                      onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                      placeholder="40대 여성"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      연령대
                    </label>
                    <select
                      value={formData.client_age_group}
                      onChange={(e) => setFormData({ ...formData, client_age_group: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    >
                      <option value="">선택 안함</option>
                      <option value="20대">20대</option>
                      <option value="30대">30대</option>
                      <option value="40대">40대</option>
                      <option value="50대">50대</option>
                      <option value="60대 이상">60대 이상</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Stories Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-xl mb-1 text-gray-900 flex items-center gap-2">
                  <span className="text-amber-600">📝</span>
                  스토리
                </h3>
                <p className="text-sm text-gray-600 mb-5">라이트박스에 표시될 의뢰인 이야기를 입력하세요</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      전체 후기
                    </label>
                    <textarea
                      value={formData.full_story}
                      onChange={(e) => setFormData({ ...formData, full_story: e.target.value })}
                      rows={5}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                      placeholder="의뢰인의 전체 후기 내용을 입력하세요..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        상담 전
                      </label>
                      <textarea
                        value={formData.story_before}
                        onChange={(e) => setFormData({ ...formData, story_before: e.target.value })}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                        placeholder="상담 전 상황..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        진행 과정
                      </label>
                      <textarea
                        value={formData.story_journey}
                        onChange={(e) => setFormData({ ...formData, story_journey: e.target.value })}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                        placeholder="사건 진행 과정..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        결과 후
                      </label>
                      <textarea
                        value={formData.story_after}
                        onChange={(e) => setFormData({ ...formData, story_after: e.target.value })}
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                        placeholder="결과 이후 변화..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-bold text-xl mb-1 text-gray-900 flex items-center gap-2">
                  <span className="text-amber-600">📊</span>
                  추가 정보
                </h3>
                <p className="text-sm text-gray-600 mb-5">사건 기간 및 담당 변호사 정보를 입력하세요</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      사건 기간
                    </label>
                    <input
                      type="text"
                      value={formData.case_duration}
                      onChange={(e) => setFormData({ ...formData, case_duration: e.target.value })}
                      placeholder="3개월"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      담당 변호사
                    </label>
                    <input
                      type="text"
                      value={formData.attorney_name}
                      onChange={(e) => setFormData({ ...formData, attorney_name: e.target.value })}
                      placeholder="임은지"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Settings Section */}
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="font-bold text-xl mb-1 text-gray-900 flex items-center gap-2">
                  <span className="text-amber-600">⚙️</span>
                  게시 설정
                </h3>
                <p className="text-sm text-gray-600 mb-5">게시 동의 및 노출 설정을 확인하세요</p>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-400 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.consent_given}
                      onChange={(e) =>
                        setFormData({ ...formData, consent_given: e.target.checked })
                      }
                      className="w-5 h-5 mt-0.5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-base font-semibold text-gray-900">
                        게시 동의 확인 <span className="text-red-500 text-lg">*</span>
                      </span>
                      <p className="text-sm text-gray-600 mt-1">의뢰인이 후기 게시에 동의했습니다</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-400 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 mt-0.5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-base font-semibold text-gray-900">게시 여부</span>
                      <p className="text-sm text-gray-600 mt-1">웹사이트에 공개적으로 표시합니다</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-400 transition-all">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 mt-0.5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-base font-semibold text-gray-900 flex items-center gap-1">
                        추천 케이스 <span className="text-amber-500">⭐</span>
                      </span>
                      <p className="text-sm text-gray-600 mt-1">홈페이지 메인에 우선 노출합니다</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 -mx-8 px-8 -mb-6 pb-6 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="text-red-500 font-semibold">*</span> 필수 입력 항목
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                      disabled={isSaving}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          저장 중...
                        </>
                      ) : (
                        <>
                          <span>{isEditing ? '✓' : '→'}</span>
                          {isEditing ? '수정 완료' : '저장 후 증빙 추가'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Tab Content: Evidence Photos */}
          {activeTab === 'evidence' && (
            <div className="space-y-7">
              {/* Photo Type Selection */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <label className="block text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-amber-600">📁</span>
                  증빙 유형 선택
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.values(PHOTO_TYPE_INFO).map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedPhotoType(type.value)}
                      className={`px-4 py-4 border-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
                        selectedPhotoType === type.value
                          ? `${type.bgColor} ${type.color} ${type.borderColor} shadow-md`
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl">{type.icon}</span>
                        <span className="text-xs font-bold">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Input */}
              <div>
                <label className="block text-base font-bold text-gray-900 mb-3">
                  설명 (선택사항)
                </label>
                <input
                  type="text"
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                  placeholder="예: 카카오톡 대화 1/3"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  disabled={isUploadingPhoto}
                />
                <p className="text-sm text-gray-500 mt-2">사진에 대한 간단한 설명을 입력하세요</p>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-base font-bold text-gray-900 mb-3">
                  사진 업로드
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-3 border-dashed rounded-xl p-10 text-center transition-all ${
                    isDragging
                      ? 'border-amber-500 bg-amber-50 scale-105'
                      : 'border-gray-300 hover:border-amber-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    disabled={isUploadingPhoto}
                  />

                  {isUploadingPhoto ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-600 border-t-transparent mx-auto" />
                      <p className="text-gray-700 font-semibold text-lg">업로드 중...</p>
                      <p className="text-sm text-gray-500">잠시만 기다려주세요</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📸</div>
                      <div>
                        <p className="text-gray-900 font-bold text-lg">
                          클릭하여 파일 선택 또는 드래그 앤 드롭
                        </p>
                        <p className="text-base text-gray-600 mt-2">
                          JPEG, PNG, WebP, HEIC 형식 지원 (최대 10MB)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 shadow-md hover:shadow-lg transition-all"
                      >
                        파일 선택하기
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-amber-900 flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    업로드 전 확인사항
                  </p>
                  <ul className="text-sm text-amber-800 space-y-1 ml-7">
                    <li>개인정보(이름, 연락처 등)가 블러 처리되었는지 확인하세요</li>
                    <li>증빙 사진은 신뢰도 구축의 핵심 요소입니다</li>
                    <li>선명하고 읽기 쉬운 이미지를 사용하세요</li>
                  </ul>
                </div>
              </div>

              {/* Uploaded Photos */}
              {evidencePhotos.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                      <span className="text-amber-600">📋</span>
                      업로드된 사진
                    </h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                      총 {evidencePhotos.length}개
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {evidencePhotos.map((photo) => {
                      const typeInfo = PHOTO_TYPE_INFO[photo.evidence_type];
                      return (
                        <div
                          key={photo.id}
                          className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                        >
                          {/* Image */}
                          <div className="relative h-48 bg-gray-100">
                            <img
                              src={photo.photo_url}
                              alt={photo.caption || '증빙 사진'}
                              className="w-full h-full object-cover"
                            />
                            {/* Delete Button - Enhanced */}
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                              aria-label="사진 삭제"
                            >
                              <span className="text-lg font-bold">×</span>
                            </button>
                          </div>

                          {/* Info */}
                          <div className="p-4">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2 ${typeInfo.bgColor} ${typeInfo.color}`}>
                              <span>{typeInfo.icon}</span>
                              <span>{typeInfo.label}</span>
                            </div>
                            {photo.caption && (
                              <p className="text-sm text-gray-700 font-medium mt-2">
                                {photo.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 pt-6 -mx-8 px-8 -mb-6 pb-6 rounded-b-xl">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveTab('basic')}
                    className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <span>←</span>
                    기본 정보로 돌아가기
                  </button>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-bold text-amber-600">{evidencePhotos.length}개</span>의 증빙 사진이 업로드되었습니다
                    </p>
                    <button
                      type="button"
                      onClick={handleFinish}
                      className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>✓</span>
                      완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
