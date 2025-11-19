'use client';

import { useState, useEffect } from 'react';

interface TestimonialFormData {
  // 의뢰인 정보
  client_name: string;
  client_initial: string;
  client_role: string;

  // 사건 정보
  case_category: string;
  case_result: string;
  case_duration: string;
  case_date: string;

  // 후기 콘텐츠
  content: string;
  rating: number;

  // 스토리텔링 (선택)
  story_before: string;
  story_journey: string;
  story_after: string;

  // 이미지 관리
  photo_url: string | null;
  use_photo: boolean;
  avatar_bg_color: string;
  avatar_text_color: string;

  // 담당 변호사
  attorney_name: string;

  // 메타데이터
  verified: boolean;
  consent_given: boolean;

  // 노출 관리
  featured: boolean;
  published: boolean;
  display_order: number;
}

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  testimonialId?: string | null;
}

const CATEGORIES = [
  '재산분할',
  '양육권',
  '위자료',
  '협의이혼',
  '상간손해배상',
  '재판이혼',
  '양육비청구',
];

const AVATAR_COLORS = [
  { bg: 'from-amber-100 to-amber-200', text: 'text-amber-700', name: 'Amber' },
  { bg: 'from-blue-100 to-blue-200', text: 'text-blue-700', name: 'Blue' },
  { bg: 'from-green-100 to-green-200', text: 'text-green-700', name: 'Green' },
  { bg: 'from-purple-100 to-purple-200', text: 'text-purple-700', name: 'Purple' },
  { bg: 'from-pink-100 to-pink-200', text: 'text-pink-700', name: 'Pink' },
  { bg: 'from-indigo-100 to-indigo-200', text: 'text-indigo-700', name: 'Indigo' },
];

export default function TestimonialFormModal({
  isOpen,
  onClose,
  onSuccess,
  testimonialId,
}: TestimonialFormModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'story' | 'settings'>('basic');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>({
    client_name: '',
    client_initial: '',
    client_role: '',
    case_category: CATEGORIES[0],
    case_result: '',
    case_duration: '',
    case_date: '',
    content: '',
    rating: 5,
    story_before: '',
    story_journey: '',
    story_after: '',
    photo_url: null,
    use_photo: false,
    avatar_bg_color: 'from-amber-100 to-amber-200',
    avatar_text_color: 'text-amber-700',
    attorney_name: '',
    verified: false,
    consent_given: false,
    featured: false,
    published: false,
    display_order: 0,
  });

  // 수정 모드일 때 데이터 로드
  useEffect(() => {
    if (testimonialId && isOpen) {
      loadTestimonial();
    } else if (!testimonialId && isOpen) {
      // 새로 추가하는 경우 초기화
      resetForm();
    }
  }, [testimonialId, isOpen]);

  const loadTestimonial = async () => {
    try {
      const response = await fetch(`/api/admin/testimonials/${testimonialId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          client_name: data.client_name || '',
          client_initial: data.client_initial || '',
          client_role: data.client_role || '',
          case_category: data.case_category || CATEGORIES[0],
          case_result: data.case_result || '',
          case_duration: data.case_duration || '',
          case_date: data.case_date || '',
          content: data.content || '',
          rating: data.rating || 5,
          story_before: data.story_before || '',
          story_journey: data.story_journey || '',
          story_after: data.story_after || '',
          photo_url: data.photo_url || null,
          use_photo: data.use_photo || false,
          avatar_bg_color: data.avatar_bg_color || 'from-amber-100 to-amber-200',
          avatar_text_color: data.avatar_text_color || 'text-amber-700',
          attorney_name: data.attorney_name || '',
          verified: data.verified || false,
          consent_given: data.consent_given || false,
          featured: data.featured || false,
          published: data.published || false,
          display_order: data.display_order || 0,
        });
      }
    } catch (error) {
      console.error('후기 로드 실패:', error);
      alert('후기를 불러오는데 실패했습니다.');
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_initial: '',
      client_role: '',
      case_category: CATEGORIES[0],
      case_result: '',
      case_duration: '',
      case_date: '',
      content: '',
      rating: 5,
      story_before: '',
      story_journey: '',
      story_after: '',
      photo_url: null,
      use_photo: false,
      avatar_bg_color: 'from-amber-100 to-amber-200',
      avatar_text_color: 'text-amber-700',
      attorney_name: '',
      verified: false,
      consent_given: false,
      featured: false,
      published: false,
      display_order: 0,
    });
    setActiveTab('basic');
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    // 이미지 파일 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      // testimonialId가 있으면 전달 (없어도 업로드 가능)
      if (testimonialId) {
        formDataUpload.append('testimonialId', testimonialId);
      }

      const response = await fetch('/api/admin/testimonials/upload-photo', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({
          ...prev,
          photo_url: result.url,
          use_photo: true,
        }));
      } else {
        const error = await response.json();
        alert(`업로드 실패: ${error.error}`);
      }
    } catch (error) {
      console.error('업로드 실패:', error);
      alert('사진 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoDelete = async () => {
    if (!formData.photo_url || !confirm('사진을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch('/api/admin/testimonials/upload-photo', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoUrl: formData.photo_url }),
      });

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          photo_url: null,
          use_photo: false,
        }));
      }
    } catch (error) {
      console.error('사진 삭제 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.client_name.trim()) {
      alert('의뢰인 이름을 입력해주세요.');
      setActiveTab('basic');
      return;
    }
    if (!formData.client_initial.trim()) {
      alert('이니셜을 입력해주세요.');
      setActiveTab('basic');
      return;
    }
    if (!formData.content.trim()) {
      alert('후기 내용을 입력해주세요.');
      setActiveTab('content');
      return;
    }

    setLoading(true);

    try {
      const url = testimonialId
        ? `/api/admin/testimonials/${testimonialId}`
        : '/api/admin/testimonials';

      const method = testimonialId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(testimonialId ? '수정되었습니다.' : '추가되었습니다.');
        onSuccess();
        onClose();
        resetForm();
      } else {
        const error = await response.json();
        alert(`저장 실패: ${error.error}`);
      }
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {testimonialId ? '후기 수정' : '후기 추가'}
          </h2>
        </div>

        {/* 탭 네비게이션 */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'basic'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              기본 정보
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'content'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              후기 내용
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'story'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              스토리텔링
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'border-b-2 border-amber-600 text-amber-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              설정
            </button>
          </div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {/* 기본 정보 탭 */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      의뢰인 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="예: 김○○"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이니셜 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.client_initial}
                      onChange={(e) => setFormData({ ...formData, client_initial: e.target.value })}
                      placeholder="예: 김"
                      maxLength={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    의뢰인 역할 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.client_role}
                    onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                    placeholder="예: 재산분할 의뢰인"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사건 카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.case_category}
                      onChange={(e) => setFormData({ ...formData, case_category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사건 날짜 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.case_date}
                      onChange={(e) => setFormData({ ...formData, case_date: e.target.value })}
                      placeholder="예: 2024년 8월"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    사건 결과 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.case_result}
                    onChange={(e) => setFormData({ ...formData, case_result: e.target.value })}
                    placeholder="예: 은닉 재산 발견 + 공정한 분할"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      사건 소요 기간
                    </label>
                    <input
                      type="text"
                      value={formData.case_duration}
                      onChange={(e) => setFormData({ ...formData, case_duration: e.target.value })}
                      placeholder="예: 3개월"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      담당 변호사
                    </label>
                    <input
                      type="text"
                      value={formData.attorney_name}
                      onChange={(e) => setFormData({ ...formData, attorney_name: e.target.value })}
                      placeholder="예: 임은지"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    평점 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="text-3xl transition-colors"
                      >
                        <span className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600">({formData.rating}점)</span>
                  </div>
                </div>
              </div>
            )}

            {/* 후기 내용 탭 */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    후기 본문 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    placeholder="의뢰인 후기를 입력해주세요..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.content.length}자
                  </p>
                </div>

                {/* 사진 업로드 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    의뢰인 사진 (선택)
                  </label>

                  {formData.photo_url ? (
                    <div className="space-y-2">
                      <div className="relative w-32 h-32">
                        <img
                          src={formData.photo_url}
                          alt="의뢰인 사진"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handlePhotoDelete}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        사진 삭제
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        JPG, PNG, WebP (최대 5MB)
                      </p>
                      {uploading && (
                        <p className="text-sm text-amber-600 mt-1">업로드 중...</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 아바타 색상 선택 */}
                {!formData.use_photo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      아바타 색상
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {AVATAR_COLORS.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              avatar_bg_color: color.bg,
                              avatar_text_color: color.text,
                            })
                          }
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.avatar_bg_color === color.bg
                              ? 'border-amber-600 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div
                            className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center`}
                          >
                            <span className={`text-xl font-bold ${color.text}`}>
                              {formData.client_initial || '김'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 text-center">
                            {color.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 스토리텔링 탭 */}
            {activeTab === 'story' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  3막 구조의 스토리를 입력하면 더 감동적인 후기가 됩니다. (선택사항)
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    1막: 상담 전 상황
                  </label>
                  <textarea
                    value={formData.story_before}
                    onChange={(e) => setFormData({ ...formData, story_before: e.target.value })}
                    rows={4}
                    placeholder="어떤 상황에서 법률 서비스를 찾게 되셨나요?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    2막: 진행 과정
                  </label>
                  <textarea
                    value={formData.story_journey}
                    onChange={(e) => setFormData({ ...formData, story_journey: e.target.value })}
                    rows={4}
                    placeholder="변호사와 함께한 과정은 어떠셨나요?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    3막: 결과 후 변화
                  </label>
                  <textarea
                    value={formData.story_after}
                    onChange={(e) => setFormData({ ...formData, story_after: e.target.value })}
                    rows={4}
                    placeholder="문제 해결 후 어떤 변화가 있으셨나요?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* 설정 탭 */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-red-900 mb-2">
                    ⚠️ 개인정보 보호 필수
                  </h4>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.consent_given}
                      onChange={(e) =>
                        setFormData({ ...formData, consent_given: e.target.checked })
                      }
                      className="mt-1"
                    />
                    <span className="text-sm text-red-900">
                      의뢰인으로부터 <strong>후기 게시 동의</strong>를 받았습니다.
                      <br />
                      <span className="text-red-700">
                        (이 항목이 체크되지 않으면 후기가 절대 공개되지 않습니다)
                      </span>
                    </span>
                  </label>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.verified}
                      onChange={(e) =>
                        setFormData({ ...formData, verified: e.target.checked })
                      }
                    />
                    <span className="text-sm text-gray-700">검증 완료 (Verified 배지)</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                    />
                    <span className="text-sm text-gray-700">추천 후기로 표시</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({ ...formData, published: e.target.checked })
                      }
                    />
                    <span className="text-sm text-gray-700">즉시 게시</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    노출 순서
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    낮은 숫자일수록 먼저 표시됩니다 (0이 최우선)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 푸터 버튼 */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold disabled:opacity-50"
            >
              {loading ? '저장 중...' : testimonialId ? '수정하기' : '추가하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
