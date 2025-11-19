'use client';

import { useState, FormEvent } from 'react';
import type { TestimonialCase, CaseCategory } from '@/types/testimonial';
import { CATEGORY_INFO } from '@/types/testimonial';

interface Props {
  testimonialCase: TestimonialCase | null;
  onClose: () => void;
  onSaveSuccess: (savedCase: TestimonialCase) => void;
}

export default function CaseFormModal({ testimonialCase, onClose, onSaveSuccess }: Props) {
  const isEditing = !!testimonialCase;

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
      onSaveSuccess(data);
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEditing ? '케이스 수정' : '새 케이스 추가'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  카테고리 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as CaseCategory })
                  }
                  className="w-full border rounded-lg px-3 py-2"
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
                <label className="block text-sm font-medium mb-1">
                  사건 날짜 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.case_date}
                  onChange={(e) => setFormData({ ...formData, case_date: e.target.value })}
                  placeholder="2024년 10월"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  하이라이트 텍스트 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.highlight_text}
                  onChange={(e) => setFormData({ ...formData, highlight_text: e.target.value })}
                  placeholder="위자료 2억 승소"
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">결과 금액 (억 단위)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.case_result_amount}
                  onChange={(e) =>
                    setFormData({ ...formData, case_result_amount: e.target.value })
                  }
                  placeholder="2.0"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">의뢰인 정보</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  이니셜 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.client_initial}
                  onChange={(e) => setFormData({ ...formData, client_initial: e.target.value })}
                  placeholder="김"
                  maxLength={2}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">역할</label>
                <input
                  type="text"
                  value={formData.client_role}
                  onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                  placeholder="40대 여성"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">연령대</label>
                <select
                  value={formData.client_age_group}
                  onChange={(e) => setFormData({ ...formData, client_age_group: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
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

          {/* Stories */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">스토리 (라이트박스 표시용)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">전체 후기</label>
                <textarea
                  value={formData.full_story}
                  onChange={(e) => setFormData({ ...formData, full_story: e.target.value })}
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="의뢰인의 전체 후기 내용..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">상담 전</label>
                  <textarea
                    value={formData.story_before}
                    onChange={(e) => setFormData({ ...formData, story_before: e.target.value })}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="상담 전 상황..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">진행 과정</label>
                  <textarea
                    value={formData.story_journey}
                    onChange={(e) => setFormData({ ...formData, story_journey: e.target.value })}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="사건 진행 과정..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">결과 후</label>
                  <textarea
                    value={formData.story_after}
                    onChange={(e) => setFormData({ ...formData, story_after: e.target.value })}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="결과 이후 변화..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">추가 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">사건 기간</label>
                <input
                  type="text"
                  value={formData.case_duration}
                  onChange={(e) => setFormData({ ...formData, case_duration: e.target.value })}
                  placeholder="3개월"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">담당 변호사</label>
                <input
                  type="text"
                  value={formData.attorney_name}
                  onChange={(e) => setFormData({ ...formData, attorney_name: e.target.value })}
                  placeholder="임은지"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">게시 설정</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.consent_given}
                  onChange={(e) =>
                    setFormData({ ...formData, consent_given: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  게시 동의 확인 <span className="text-red-500">(필수)</span>
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">게시 여부</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">추천 케이스</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              disabled={isSaving}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
            >
              {isSaving ? '저장 중...' : isEditing ? '수정 완료' : '케이스 추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
