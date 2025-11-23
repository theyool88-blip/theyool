'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlockedTime, BlockType, OfficeLocation } from '@/types/blocked-time';

interface NewBlockForm {
  block_type: BlockType;
  blocked_date: string;
  blocked_time_start: string;
  blocked_time_end: string;
  office_location: OfficeLocation;
  reason: string;
}

export default function BlockedTimesPage() {
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Filter states
  const [filterType, setFilterType] = useState<BlockType | 'all'>('all');
  const [filterOffice, setFilterOffice] = useState<OfficeLocation | 'all'>('all');

  // New block form state
  const [newBlock, setNewBlock] = useState<NewBlockForm>({
    block_type: 'date',
    blocked_date: '',
    blocked_time_start: '09:00',
    blocked_time_end: '18:00',
    office_location: null,
    reason: '',
  });

  // Load blocked times
  const fetchBlockedTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/blocked-times');

      if (!response.ok) {
        throw new Error('Failed to fetch blocked times');
      }

      const data = await response.json();
      setBlockedTimes(data.blockedTimes || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockedTimes();
  }, []);

  // Filter blocked times
  const filteredBlockedTimes = blockedTimes.filter((bt) => {
    if (filterType !== 'all' && bt.block_type !== filterType) return false;
    if (filterOffice !== 'all') {
      if (filterOffice === null && bt.office_location !== null) return false;
      if (filterOffice !== null && bt.office_location !== filterOffice) return false;
    }
    return true;
  });

  // Create new blocked time
  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newBlock.blocked_date) {
      alert('날짜를 선택해주세요');
      return;
    }

    if (newBlock.block_type === 'time_slot') {
      if (!newBlock.blocked_time_start || !newBlock.blocked_time_end) {
        alert('시작 시간과 종료 시간을 입력해주세요');
        return;
      }
      if (newBlock.blocked_time_start >= newBlock.blocked_time_end) {
        alert('종료 시간은 시작 시간보다 늦어야 합니다');
        return;
      }
    }

    try {
      setSubmitting(true);

      const payload: any = {
        block_type: newBlock.block_type,
        blocked_date: newBlock.blocked_date,
        office_location: newBlock.office_location,
        reason: newBlock.reason || null,
      };

      if (newBlock.block_type === 'time_slot') {
        payload.blocked_time_start = newBlock.blocked_time_start;
        payload.blocked_time_end = newBlock.blocked_time_end;
      }

      const response = await fetch('/api/admin/blocked-times', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blocked time');
      }

      // Reset form and close modal
      setNewBlock({
        block_type: 'date',
        blocked_date: '',
        blocked_time_start: '09:00',
        blocked_time_end: '18:00',
        office_location: null,
        reason: '',
      });
      setShowAddModal(false);

      // Refresh list
      await fetchBlockedTimes();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete blocked time
  const handleDelete = async (id: string) => {
    if (!confirm('이 차단 시간을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blocked-times/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blocked time');
      }

      await fetchBlockedTimes();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">⏰ 예약 가능 시간 설정</h1>
              <p className="text-sm text-gray-600 mt-1">휴무일, 시간 차단, 사무소별 관리</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                ← 대시보드
              </Link>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                + 시간 차단 추가
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">유형</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as BlockType | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="date">종일 차단</option>
                <option value="time_slot">시간대 차단</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">사무소</label>
              <select
                value={filterOffice === null ? 'null' : filterOffice}
                onChange={(e) => setFilterOffice(e.target.value === 'null' ? null : e.target.value as OfficeLocation | 'all')}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="null">모든 사무소</option>
                <option value="천안">천안</option>
                <option value="평택">평택</option>
              </select>
            </div>

            <div className="ml-auto flex items-end">
              <span className="text-sm text-gray-600">
                총 <strong>{filteredBlockedTimes.length}</strong>개 차단 설정
              </span>
            </div>
          </div>
        </div>

        {/* Loading/Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-amber-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">로딩 중...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Blocked Times Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      유형
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      날짜
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      시간
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      사무소
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      사유
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      등록자
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlockedTimes.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        차단된 시간이 없습니다
                      </td>
                    </tr>
                  ) : (
                    filteredBlockedTimes.map((block) => (
                      <tr key={block.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            block.block_type === 'date'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {block.block_type === 'date' ? '종일' : '시간대'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(block.blocked_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {block.block_type === 'time_slot'
                            ? `${block.blocked_time_start} - ${block.blocked_time_end}`
                            : '종일'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {block.office_location || '모든 사무소'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {block.reason || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {block.created_by || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleDelete(block.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Add Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">시간 차단 추가</h2>
              <p className="text-sm text-gray-600 mt-1">특정 날짜 또는 시간대를 예약 불가능하게 설정합니다</p>
            </div>

            <form onSubmit={handleCreateBlock} className="p-6 space-y-4">
              {/* Block Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  차단 유형 *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewBlock({ ...newBlock, block_type: 'date' })}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      newBlock.block_type === 'date'
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold mb-1">종일 차단</div>
                    <div className="text-xs opacity-75">하루 전체를 차단</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewBlock({ ...newBlock, block_type: 'time_slot' })}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      newBlock.block_type === 'time_slot'
                        ? 'border-amber-600 bg-amber-50 text-amber-900'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold mb-1">시간대 차단</div>
                    <div className="text-xs opacity-75">특정 시간만 차단</div>
                  </button>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  날짜 *
                </label>
                <input
                  type="date"
                  value={newBlock.blocked_date}
                  onChange={(e) => setNewBlock({ ...newBlock, blocked_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Time Range (only for time_slot) */}
              {newBlock.block_type === 'time_slot' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시작 시간 *
                    </label>
                    <input
                      type="time"
                      value={newBlock.blocked_time_start}
                      onChange={(e) => setNewBlock({ ...newBlock, blocked_time_start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      종료 시간 *
                    </label>
                    <input
                      type="time"
                      value={newBlock.blocked_time_end}
                      onChange={(e) => setNewBlock({ ...newBlock, blocked_time_end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Office Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사무소
                </label>
                <select
                  value={newBlock.office_location === null ? '' : newBlock.office_location}
                  onChange={(e) => setNewBlock({
                    ...newBlock,
                    office_location: e.target.value === '' ? null : e.target.value as OfficeLocation
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">모든 사무소</option>
                  <option value="천안">천안</option>
                  <option value="평택">평택</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  "모든 사무소"를 선택하면 천안과 평택 모두에 적용됩니다
                </p>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  사유
                </label>
                <textarea
                  value={newBlock.reason}
                  onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })}
                  placeholder="예: 공휴일, 법정 공휴일, 내부 회의 등"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? '추가 중...' : '시간 차단 추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
