'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TestimonialFormModal from './TestimonialFormModal';

interface Testimonial {
  id: string;
  client_name: string;
  client_initial: string;
  client_role: string;
  case_category: string;
  case_result: string;
  case_date: string;
  content: string;
  rating: number;
  verified: boolean;
  consent_given: boolean;
  published: boolean;
  featured: boolean;
  photo_url: string | null;
  use_photo: boolean;
  display_order: number;
  created_at: string;
}

export default function TestimonialsManagementClient() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 후기 목록 로드
  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === 'published') params.append('published', 'true');
      if (filter === 'draft') params.append('published', 'false');
      if (selectedCategory !== 'all') params.append('category', selectedCategory);

      const response = await fetch(`/api/admin/testimonials?${params}`);
      const data = await response.json();

      if (data.data) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('후기 로드 실패:', error);
      alert('후기를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, [filter, selectedCategory]);

  // 삭제
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" 후기를 삭제하시겠습니까?`)) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        loadTestimonials();
      } else {
        const error = await response.json();
        alert(`삭제 실패: ${error.error}`);
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 게시 상태 토글
  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (response.ok) {
        loadTestimonials();
      } else {
        alert('상태 변경 실패');
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const categories = [
    'all',
    '재산분할',
    '양육권',
    '위자료',
    '협의이혼',
    '상간손해배상',
    '재판이혼',
    '양육비청구',
  ];

  return (
    <div>
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">총 {testimonials.length}개</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingId(null);
                setShowModal(true);
              }}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              + 후기 추가
            </button>
          </div>
        </div>

        {/* 필터 */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'published'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              게시됨
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'draft'
                  ? 'bg-gray-600 text-white'
                  : 'bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              비공개
            </button>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '모든 카테고리' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 테이블 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">후기가 없습니다.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            첫 후기 추가하기
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  의뢰인
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  결과
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평점
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                        <span className="text-amber-700 font-bold">
                          {testimonial.client_initial}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {testimonial.client_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.client_role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {testimonial.case_category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {testimonial.case_result}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-gray-900">
                        {testimonial.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          togglePublished(testimonial.id, testimonial.published)
                        }
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          testimonial.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {testimonial.published ? '게시됨' : '비공개'}
                      </button>
                      {testimonial.verified && (
                        <span className="block px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          검증됨
                        </span>
                      )}
                      {testimonial.featured && (
                        <span className="block px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          추천
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(testimonial.id);
                        setShowModal(true);
                      }}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      수정
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(testimonial.id, testimonial.client_name)
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 모달 */}
      <TestimonialFormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
        }}
        onSuccess={loadTestimonials}
        testimonialId={editingId}
      />
    </div>
  );
}
