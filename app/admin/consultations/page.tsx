'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Consultation {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  category?: string | null;
  message?: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  admin_notes?: string | null;
  created_at: string;
  updated_at: string;
}

interface ConsultationStats {
  total: number;
  pending: number;
  in_progress: number;
  completed: number;
  today: number;
  this_week: number;
  this_month: number;
  by_category: Record<string, number>;
  avg_response_time_hours: number;
  urgent_count: number;
}

export default function AdminConsultationsPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [stats, setStats] = useState<ConsultationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch consultations and stats
  useEffect(() => {
    fetchConsultations();
    fetchStats();
  }, [statusFilter, categoryFilter, searchQuery]);

  const fetchConsultations = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/admin/consultations?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setConsultations(data.consultations || []);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/consultations/stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateConsultationStatus = async (id: string, status: string, notes?: string) => {
    try {
      console.log('[FRONTEND] Updating consultation:', { id, status, notes });

      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          admin_notes: notes !== undefined ? notes : undefined
        })
      });

      const data = await response.json();
      console.log('[FRONTEND] Update response:', data);

      if (response.ok) {
        console.log('[FRONTEND] Update successful, refreshing data...');
        fetchConsultations();
        fetchStats();
        setShowDetailModal(false);
      } else {
        console.error('[FRONTEND] Update failed:', data);
        alert('상담 상태 업데이트에 실패했습니다: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('[FRONTEND] Error updating consultation:', error);
      alert('상담 상태 업데이트에 실패했습니다.');
    }
  };

  const deleteConsultation = async (id: string) => {
    if (!confirm('이 상담을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/consultations/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchConsultations();
        fetchStats();
        setShowDetailModal(false);
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
      alert('상담 삭제에 실패했습니다.');
    }
  };

  const getLeadScore = (consultation: Consultation): number => {
    let score = 0;

    // Message length (more details = higher score)
    if (consultation.message && consultation.message.length > 100) score += 2;
    else if (consultation.message && consultation.message.length > 50) score += 1;

    // Has email (more committed)
    if (consultation.email) score += 1;

    // Has category (knows what they want)
    if (consultation.category) score += 1;

    // Urgent keywords
    const urgentKeywords = ['긴급', '급함', '빨리', '즉시', '오늘', '내일', '시급'];
    if (consultation.message && urgentKeywords.some(k => consultation.message!.includes(k))) {
      score += 3;
    }

    return score;
  };

  const exportToCSV = () => {
    const headers = ['날짜', '이름', '전화번호', '이메일', '카테고리', '상태', '메시지'];
    const rows = consultations.map(c => [
      new Date(c.created_at).toLocaleString('ko-KR'),
      c.name,
      c.phone,
      c.email || '',
      c.category || '',
      c.status === 'pending' ? '대기' : c.status === 'in_progress' ? '처리중' : '완료',
      (c.message || '').replace(/"/g, '""')
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `consultations_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>📞</span>
                상담 신청 관리
              </h1>
              <p className="text-sm text-gray-600 mt-2">콜백 요청, 문의 접수, 리드 스코어링</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CSV 내보내기
              </button>
              <button
                onClick={() => router.push('/admin')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                관리자 홈
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
              <div className="text-sm text-gray-600 mb-1">총 상담</div>
              <div className="text-3xl font-bold text-gray-900">{stats.total || 0}</div>
              <div className="text-xs text-gray-500 mt-2">
                이번 달: {stats.this_month || 0}건
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
              <div className="text-sm text-gray-600 mb-1">대기 중</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.pending || 0}</div>
              {(stats.urgent_count || 0) > 0 && (
                <div className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  🔥 긴급: {stats.urgent_count}건
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
              <div className="text-sm text-gray-600 mb-1">처리 중</div>
              <div className="text-3xl font-bold text-orange-600">{stats.in_progress || 0}</div>
              <div className="text-xs text-gray-500 mt-2">
                오늘: {stats.today || 0}건
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <div className="text-sm text-gray-600 mb-1">완료</div>
              <div className="text-3xl font-bold text-green-600">{stats.completed || 0}</div>
              <div className="text-xs text-gray-500 mt-2">
                평균 응답: {stats.avg_response_time_hours || 0}시간
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <input
                type="text"
                placeholder="이름, 전화번호, 메시지 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                <option value="pending">대기 중</option>
                <option value="in_progress">처리 중</option>
                <option value="completed">완료</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체</option>
                {stats?.by_category && Object.keys(stats.by_category).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Consultations Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    스코어
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜/시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
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
                {consultations.map((consultation) => {
                  const leadScore = getLeadScore(consultation);
                  const scoreColor = leadScore >= 5 ? 'text-red-600' : leadScore >= 3 ? 'text-orange-600' : 'text-gray-600';

                  return (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-lg font-bold ${scoreColor}`}>
                          {'🔥'.repeat(Math.min(leadScore, 3))}
                          <span className="text-sm ml-1">{leadScore}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{new Date(consultation.created_at).toLocaleDateString('ko-KR')}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(consultation.created_at).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{consultation.name}</div>
                        {consultation.email && (
                          <div className="text-xs text-gray-500">{consultation.email}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <a href={`tel:${consultation.phone}`} className="hover:text-blue-600">
                          {consultation.phone}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {consultation.category || '미분류'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={consultation.status}
                          onChange={(e) => updateConsultationStatus(consultation.id, e.target.value)}
                          className={`px-3 py-1 text-sm font-medium rounded-full border-0 cursor-pointer ${
                            consultation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : consultation.status === 'in_progress'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          <option value="pending">대기</option>
                          <option value="in_progress">처리중</option>
                          <option value="completed">완료</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => {
                            setSelectedConsultation(consultation);
                            setShowDetailModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {consultations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              상담 내역이 없습니다.
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedConsultation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">상담 상세정보</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">이름</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedConsultation.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">전화번호</label>
                    <p className="text-lg text-gray-900">
                      <a href={`tel:${selectedConsultation.phone}`} className="hover:text-blue-600">
                        {selectedConsultation.phone}
                      </a>
                    </p>
                  </div>

                  {selectedConsultation.email && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">이메일</label>
                      <p className="text-lg text-gray-900">
                        <a href={`mailto:${selectedConsultation.email}`} className="hover:text-blue-600">
                          {selectedConsultation.email}
                        </a>
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600">카테고리</label>
                    <p className="text-lg text-gray-900">{selectedConsultation.category || '미분류'}</p>
                  </div>

                  {selectedConsultation.message && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">상담 내용</label>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedConsultation.message}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-600">접수 시간</label>
                    <p className="text-gray-900">
                      {new Date(selectedConsultation.created_at).toLocaleString('ko-KR')}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600 block mb-2">관리자 메모</label>
                    <textarea
                      defaultValue={selectedConsultation.admin_notes || ''}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="상담 관련 메모를 입력하세요..."
                      onBlur={(e) => {
                        if (e.target.value !== (selectedConsultation.admin_notes || '')) {
                          updateConsultationStatus(selectedConsultation.id, selectedConsultation.status, e.target.value);
                        }
                      }}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => deleteConsultation(selectedConsultation.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => setShowDetailModal(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
