'use client';

import { useState, useMemo } from 'react';
import type { TestimonialCase, CaseCategory } from '@/types/testimonial';
import { CATEGORY_INFO } from '@/types/testimonial';
import CaseFormModal from './CaseFormModal';

interface Props {
  initialCases: TestimonialCase[];
}

type StatusFilter = 'all' | 'published' | 'featured' | 'pending';

export default function TestimonialCasesClient({ initialCases }: Props) {
  const [cases, setCases] = useState<TestimonialCase[]>(initialCases);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<TestimonialCase | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // 필터 상태
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CaseCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const handleCreateNew = () => {
    setEditingCase(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonialCase: TestimonialCase) => {
    setEditingCase(testimonialCase);
    setIsModalOpen(true);
  };

  const handleDelete = async (caseId: string) => {
    if (!confirm('정말 이 케이스를 삭제하시겠습니까? 연결된 증빙 사진도 모두 삭제됩니다.')) {
      return;
    }

    setIsDeleting(caseId);

    try {
      const response = await fetch(`/api/admin/testimonial-cases/${caseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete case');
      }

      setCases((prev) => prev.filter((c) => c.id !== caseId));
      alert('케이스가 삭제되었습니다.');
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSaveSuccess = (savedCase: TestimonialCase) => {
    if (editingCase) {
      // Update existing
      setCases((prev) => prev.map((c) => (c.id === savedCase.id ? savedCase : c)));
    } else {
      // Add new
      setCases((prev) => [savedCase, ...prev]);
    }
    setIsModalOpen(false);
    setEditingCase(null);
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return '-';
    return `${(amount / 100000000).toFixed(1)}억`;
  };

  // 필터링된 케이스
  const filteredCases = useMemo(() => {
    return cases.filter(c => {
      // 검색 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesHighlight = c.highlight_text?.toLowerCase().includes(query);
        const matchesClient = c.client_initial?.toLowerCase().includes(query);
        const matchesDate = c.case_date?.includes(query);
        if (!matchesHighlight && !matchesClient && !matchesDate) {
          return false;
        }
      }

      // 카테고리 필터
      if (categoryFilter !== 'all' && c.category !== categoryFilter) {
        return false;
      }

      // 상태 필터
      if (statusFilter === 'published' && (!c.published || !c.consent_given)) return false;
      if (statusFilter === 'featured' && !c.featured) return false;
      if (statusFilter === 'pending' && c.consent_given) return false;

      return true;
    });
  }, [cases, searchQuery, categoryFilter, statusFilter]);

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">의뢰인 후기 관리</h1>
          <p className="text-gray-600 mt-1">증빙 중심 신뢰 구축 시스템</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          + 새 케이스 추가
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <div className="text-gray-600 text-sm">전체 케이스</div>
          <div className="text-2xl font-bold">{cases.length}</div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-gray-600 text-sm">게시됨</div>
          <div className="text-2xl font-bold text-green-600">
            {cases.filter((c) => c.published && c.consent_given).length}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-gray-600 text-sm">추천 케이스</div>
          <div className="text-2xl font-bold text-amber-600">
            {cases.filter((c) => c.featured).length}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <div className="text-gray-600 text-sm">동의 대기</div>
          <div className="text-2xl font-bold text-orange-600">
            {cases.filter((c) => !c.consent_given).length}
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 space-y-4">
        {/* 검색 바 */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="하이라이트, 의뢰인, 날짜 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              초기화
            </button>
          )}
        </div>

        {/* 필터 버튼들 */}
        <div className="flex items-center gap-4">
          {/* 상태 필터 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">상태:</span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === 'published'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              게시됨
            </button>
            <button
              onClick={() => setStatusFilter('featured')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === 'featured'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              추천
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              동의대기
            </button>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-gray-600 font-medium">카테고리:</span>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              전체
            </button>
            {Object.entries(CATEGORY_INFO).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setCategoryFilter(key as CaseCategory)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  categoryFilter === key
                    ? `${info.bgColor} ${info.color}`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {info.icon} {info.label}
              </button>
            ))}
          </div>
        </div>

        {/* 필터 결과 표시 */}
        {(searchQuery || categoryFilter !== 'all' || statusFilter !== 'all') && (
          <div className="text-sm text-gray-600">
            {filteredCases.length}개의 케이스가 검색되었습니다.
          </div>
        )}
      </div>

      {/* Cases Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                카테고리
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                하이라이트
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                의뢰인
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                금액
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                날짜
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                상태
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  {cases.length === 0
                    ? '등록된 케이스가 없습니다. 새 케이스를 추가해보세요.'
                    : '검색 결과가 없습니다.'}
                </td>
              </tr>
            ) : (
              filteredCases.map((testimonialCase) => {
                const categoryInfo = CATEGORY_INFO[testimonialCase.category];
                return (
                  <tr key={testimonialCase.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${categoryInfo.bgColor} ${categoryInfo.color}`}
                      >
                        <span>{categoryInfo.icon}</span>
                        <span>{categoryInfo.label}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs truncate font-medium">
                        {testimonialCase.highlight_text}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{testimonialCase.client_initial}</div>
                        {testimonialCase.client_role && (
                          <div className="text-xs text-gray-500">
                            {testimonialCase.client_role}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-rose-600">
                        {formatAmount(testimonialCase.case_result_amount)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {testimonialCase.case_date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {testimonialCase.published && testimonialCase.consent_given && (
                          <span className="inline-flex items-center text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded">
                            ✓ 게시
                          </span>
                        )}
                        {testimonialCase.featured && (
                          <span className="inline-flex items-center text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                            ⭐ 추천
                          </span>
                        )}
                        {!testimonialCase.consent_given && (
                          <span className="inline-flex items-center text-xs text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
                            ⚠ 동의대기
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/admin/testimonial-cases/${testimonialCase.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          상세
                        </a>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleEdit(testimonialCase)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          수정
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleDelete(testimonialCase.id)}
                          disabled={isDeleting === testimonialCase.id}
                          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                        >
                          {isDeleting === testimonialCase.id ? '삭제중...' : '삭제'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Case Form Modal */}
      {isModalOpen && (
        <CaseFormModal
          testimonialCase={editingCase}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCase(null);
          }}
          onSaveSuccess={handleSaveSuccess}
        />
      )}
    </div>
  );
}
