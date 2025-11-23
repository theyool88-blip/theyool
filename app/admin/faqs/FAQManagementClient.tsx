'use client';

import { useState, useEffect } from 'react';
import type { FAQ } from '@/lib/supabase/faq';

const categories = [
  { name: '필수가이드', slug: 'featured' }, // featured flag를 사용하는 특별 카테고리
  { name: '긴급상황/즉시도움', slug: 'emergency' },
  { name: '가정폭력/위협', slug: 'domestic-violence' },
  { name: '이혼절차/기본정보', slug: 'divorce-process' },
  { name: '별거/생활비', slug: 'separation-expense' },
  { name: '증거수집/준비', slug: 'evidence-collection' },
  { name: '불륜/외도', slug: 'adultery' },
  { name: '위자료', slug: 'alimony' },
  { name: '양육권', slug: 'custody' },
  { name: '양육비', slug: 'child-support' },
  { name: '면접교섭', slug: 'visitation' },
  { name: '재산분할', slug: 'property-division' },
  { name: '친자확인', slug: 'paternity' },
  { name: '이혼 후 문제', slug: 'post-divorce' },
  { name: '국제이혼/특수상황', slug: 'international-divorce' },
  { name: '변호사/법적지원', slug: 'legal-support' },
];

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  published: boolean;
}

interface Case {
  id: string;
  slug: string;
  title: string;
  published: boolean;
}

export default function FAQManagementClient() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [selectedFaqs, setSelectedFaqs] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    question: '',
    slug: '',
    category: 'emergency',
    summary: '',
    answer: '',
    featured: false,
    published: true,
    sort_order: null as number | null,
    related_blog_posts: [] as string[],
    related_cases: [] as string[],
  });

  useEffect(() => {
    loadFAQs();
  }, [page, searchQuery, selectedCategory]);

  useEffect(() => {
    loadBlogPosts();
    loadCases();
  }, []);

  const loadFAQs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '40',
        search: searchQuery,
        category: selectedCategory
      });

      const res = await fetch(`/api/admin/faqs?${params}`);
      const data = await res.json();

      if (data.success) {
        setFaqs(data.data);
        setTotal(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      } else {
        setError(data.message || 'FAQ를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('FAQ 로드 실패:', err);
      setError('FAQ를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
    setSelectedFaqs(new Set());
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
    setSelectedFaqs(new Set());
  };

  const loadBlogPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog?limit=1000');
      const data = await res.json();
      if (data.success) {
        setBlogPosts(data.data.map((post: any) => ({
          id: post.id,
          slug: post.slug,
          title: post.title,
          published: post.published,
        })));
      }
    } catch (error) {
      console.error('칼럼 로드 실패:', error);
    }
  };

  const loadCases = async () => {
    try {
      const res = await fetch('/api/admin/cases?limit=1000');
      const data = await res.json();
      if (data.success) {
        setCases(data.data.map((caseItem: any) => ({
          id: caseItem.id,
          slug: caseItem.slug,
          title: caseItem.title,
          published: caseItem.published,
        })));
      }
    } catch (error) {
      console.error('성공사례 로드 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingFaq
        ? `/api/admin/faqs/${editingFaq.id}`
        : '/api/admin/faqs';

      const method = editingFaq ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingFaq ? 'FAQ가 수정되었습니다.' : 'FAQ가 생성되었습니다.');
        setShowModal(false);
        resetForm();
        loadFAQs();
      } else {
        alert(data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      slug: faq.slug,
      category: faq.category,
      summary: faq.summary || '',
      answer: faq.answer,
      featured: faq.featured,
      published: faq.published,
      sort_order: faq.sort_order,
      related_blog_posts: faq.related_blog_posts || [],
      related_cases: faq.related_cases || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        alert('FAQ가 삭제되었습니다.');
        loadFAQs();
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedFaqs.size === 0) {
      alert('삭제할 FAQ를 선택해주세요.');
      return;
    }

    if (!confirm(`${selectedFaqs.size}개의 FAQ를 삭제하시겠습니까?`)) return;

    try {
      const deletePromises = Array.from(selectedFaqs).map(id =>
        fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
      );

      await Promise.all(deletePromises);
      alert(`${selectedFaqs.size}개의 FAQ가 삭제되었습니다.`);
      setSelectedFaqs(new Set());
      loadFAQs();
    } catch (error) {
      alert('일괄 삭제 중 오류가 발생했습니다.');
    }
  };

  const toggleSelectFaq = (id: string) => {
    const newSelected = new Set(selectedFaqs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFaqs(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedFaqs.size === faqs.length) {
      setSelectedFaqs(new Set());
    } else {
      setSelectedFaqs(new Set(faqs.map(f => f.id)));
    }
  };

  const resetForm = () => {
    setEditingFaq(null);
    setFormData({
      question: '',
      slug: '',
      category: 'emergency',
      summary: '',
      answer: '',
      featured: false,
      published: true,
      sort_order: null,
      related_blog_posts: [],
      related_cases: [],
    });
  };

  if (loading && page === 1) {
    return <div className="text-center py-12">로딩 중...</div>;
  }

  return (
    <div>
      {/* 액션 버튼 및 검색 */}
      <div className="mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">
              전체 FAQ ({total}개)
            </h2>
            {selectedFaqs.size > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedFaqs.size}개 선택됨
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  선택 삭제
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            + 새 FAQ 추가
          </button>
        </div>

        {/* 검색 바 및 카테고리 필터 */}
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
          >
            <option value="">전체 카테고리</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="질문 검색..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />

          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                handleSearch('');
                handleCategoryChange('');
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              전체 초기화
            </button>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={loadFAQs}
            className="text-sm underline hover:no-underline"
          >
            다시 시도
          </button>
        </div>
      )}

      {/* FAQ 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedFaqs.size === faqs.length && faqs.length > 0}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                질문
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                조회수
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
            {faqs.map((faq) => (
              <tr key={faq.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedFaqs.has(faq.id)}
                    onChange={() => toggleSelectFaq(faq.id)}
                    className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4">
                  <div
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                    onClick={() => handleEdit(faq)}
                  >
                    {faq.question}
                  </div>
                  {faq.featured && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">
                      필수 가이드
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-600">
                    {categories.find(c => c.slug === faq.category)?.name || faq.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {faq.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      faq.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {faq.published ? '공개' : '비공개'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <a
                    href={`/faq/${faq.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-900"
                  >
                    보기
                  </a>
                  <button
                    onClick={() => handleDelete(faq.id)}
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

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>

          <div className="flex items-center gap-1">
            {page > 3 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  1
                </button>
                {page > 4 && <span className="px-2">...</span>}
              </>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p >= page - 2 && p <= page + 2)
              .map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-2 border rounded-md ${
                    p === page
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}

            {page < totalPages - 2 && (
              <>
                {page < totalPages - 3 && <span className="px-2">...</span>}
                <button
                  onClick={() => setPage(totalPages)}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>

          <span className="ml-4 text-sm text-gray-600">
            {total}개 중 {(page - 1) * 40 + 1}-{Math.min(page * 40, total)}
          </span>
        </div>
      )}

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingFaq ? 'FAQ 수정' : '새 FAQ 추가'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  질문 *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="예: how-long-divorce-process"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리 *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  요약
                </label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="간단한 요약 (선택)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  답변 *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  관련 칼럼 (선택)
                </label>
                <select
                  multiple
                  value={formData.related_blog_posts}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                    setFormData({ ...formData, related_blog_posts: selected });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  size={5}
                >
                  {blogPosts
                    .filter(blog => blog.published)
                    .map(blog => (
                      <option key={blog.id} value={blog.slug}>
                        {blog.title}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Ctrl/Cmd + 클릭으로 여러 개 선택. 선택 순서가 표시 순서입니다.
                </p>
                {formData.related_blog_posts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.related_blog_posts.map((slug, idx) => {
                      const blog = blogPosts.find(b => b.slug === slug);
                      return (
                        <span
                          key={slug}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded"
                        >
                          <span className="font-semibold">{idx + 1}.</span>
                          {blog?.title}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                related_blog_posts: formData.related_blog_posts.filter(s => s !== slug),
                              });
                            }}
                            className="ml-1 text-amber-600 hover:text-amber-900"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  관련 성공사례 (선택)
                </label>
                <select
                  multiple
                  value={formData.related_cases}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                    setFormData({ ...formData, related_cases: selected });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  size={5}
                >
                  {cases
                    .filter(c => c.published)
                    .map(caseItem => (
                      <option key={caseItem.id} value={caseItem.slug}>
                        {caseItem.title}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Ctrl/Cmd + 클릭으로 여러 개 선택. 선택 순서가 표시 순서입니다.
                </p>
                {formData.related_cases.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.related_cases.map((slug, idx) => {
                      const caseItem = cases.find(c => c.slug === slug);
                      return (
                        <span
                          key={slug}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded"
                        >
                          <span className="font-semibold">{idx + 1}.</span>
                          {caseItem?.title}
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                related_cases: formData.related_cases.filter(s => s !== slug),
                              });
                            }}
                            className="ml-1 text-pink-600 hover:text-pink-900"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">필수 가이드</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">공개</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                >
                  {editingFaq ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
