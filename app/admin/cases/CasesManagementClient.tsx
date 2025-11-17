'use client';

import { useState, useEffect, useRef } from 'react';
import ImageUploader from '@/components/admin/ImageUploader';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { splitMarkdownMetadata, injectBackgroundMetadata, slugify } from '@/lib/utils/markdown';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface Case {
  id: string;
  notion_id?: string | null;
  slug?: string | null;
  title: string;
  badge: string | null;
  categories: string[];
  background: string | null;
  result: string | null;
  icon: string | null;
  published: boolean;
  views: number;
  sort_order: number | null;
}

const categoryOptions = ['이혼', '재산분할', '위자료', '양육권', '상간사건'];

export default function CasesManagementClient() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    badge: '',
    categories: [] as string[],
    content: '',
    result: '',
    icon: '',
    published: true,
    sort_order: null as number | null,
  });
  const [imageAlt, setImageAlt] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const selectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      const res = await fetch('/api/admin/cases');
      const data = await res.json();
      if (data.success) {
        setCases(data.data);
      }
    } catch (error) {
      console.error('Cases 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }

      if (!formData.slug.trim()) {
        alert('URL Slug를 입력해주세요.');
        return;
      }

      if (!formData.content.trim()) {
        alert('본문을 입력해주세요.');
        return;
      }

      const normalizedSlug = slugify(formData.slug);

      const url = editingCase
        ? `/api/admin/cases/${editingCase.id}`
        : '/api/admin/cases';

      const method = editingCase ? 'PUT' : 'POST';
      const summary = formData.content
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/[#>*_`]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 200);

      const payload = {
        title: formData.title,
        slug: normalizedSlug,
        badge: formData.badge || null,
        categories: formData.categories,
        background: injectBackgroundMetadata(formData.content, backgroundImage || undefined),
        strategy: summary,
        result: formData.result || summary,
        icon: formData.icon || null,
        published: formData.published,
        sort_order: formData.sort_order,
      };

      console.log('[CasesManagement] Submitting payload:', JSON.stringify(payload, null, 2));

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('[CasesManagement] Response status:', res.status);

      const data = await res.json();
      console.log('[CasesManagement] Response data:', data);

      if (data.success) {
        alert(editingCase ? '성공사례가 수정되었습니다.' : '성공사례가 생성되었습니다.');
        setShowModal(false);
        resetForm();
        loadCases();
      } else {
        console.error('[CasesManagement] Error:', data);
        alert(data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('[CasesManagement] Caught error:', error);
      alert(`오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleEdit = (caseItem: Case) => {
    setEditingCase(caseItem);
    const { content, backgroundImage: bg } = splitMarkdownMetadata(caseItem.background || '');
    setFormData({
      title: caseItem.title,
      slug: caseItem.slug || caseItem.notion_id || '',
      badge: caseItem.badge || '',
      categories: caseItem.categories || [],
      content: content || '',
      result: caseItem.result || '',
      icon: caseItem.icon || '',
      published: caseItem.published,
      sort_order: caseItem.sort_order,
    });
    setBackgroundImage(bg || '');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/cases/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        alert('성공사례가 삭제되었습니다.');
        loadCases();
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setEditingCase(null);
    setFormData({
      title: '',
      slug: '',
      badge: '',
      categories: [],
      content: '',
      result: '',
      icon: '',
      published: true,
      sort_order: null,
    });
    setBackgroundImage('');
  };

  const toggleCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.includes(category)
        ? formData.categories.filter(c => c !== category)
        : [...formData.categories, category],
    });
  };

  if (loading) {
    return <div className="text-center py-12">로딩 중...</div>;
  }

  const updateSelection = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    selectionRef.current = {
      start: target.selectionStart ?? 0,
      end: target.selectionEnd ?? 0,
    };
  };

  const insertAtSelection = (snippet: string) => {
    setFormData((prev) => {
      const content = prev.content || '';
      const { start, end } = selectionRef.current;
      const safeStart = Math.max(0, Math.min(content.length, start));
      const safeEnd = Math.max(0, Math.min(content.length, end));
      const newContent =
        content.slice(0, safeStart) + snippet + content.slice(safeEnd);
      const cursorPos = safeStart + snippet.length;
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(cursorPos, cursorPos);
          selectionRef.current = { start: cursorPos, end: cursorPos };
        }
      }, 0);
      return { ...prev, content: newContent };
    });
  };

  const handleInlineImageUpload = (url: string) => {
    insertAtSelection(`\n\n![${imageAlt || 'image'}](${url})\n`);
    alert('이미지가 본문에 추가되었습니다.');
  };

  const handleImageUpload = (url: string) => {
    insertAtSelection(`\n\n![${imageAlt || 'image'}](${url})\n`);
    alert('이미지가 본문에 추가되었습니다.');
  };

  return (
    <div>
      {/* 액션 버튼 */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          전체 성공사례 ({cases.length}개)
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          + 새 성공사례 추가
        </button>
      </div>

      {/* 테이블 뷰 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                제목
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
            {cases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {caseItem.icon && <span className="text-lg">{caseItem.icon}</span>}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                      {caseItem.badge && (
                        <span className="text-xs text-pink-600">{caseItem.badge}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {caseItem.categories.slice(0, 2).map((cat) => (
                      <span key={cat} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {caseItem.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      caseItem.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {caseItem.published ? '공개' : '비공개'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(caseItem)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(caseItem.id)}
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingCase ? '성공사례 수정' : '새 성공사례 추가'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="예: Case 01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (이모지)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="예: 💰"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="예: 3x-divorce-case"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 text-sm rounded transition-colors ${
                        formData.categories.includes(cat)
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">본문 (Markdown) *</label>
                </div>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.content}
                    onChange={(val) => setFormData({ ...formData, content: val || '' })}
                    height={400}
                    preview="edit"
                    textareaProps={{
                      onSelect: updateSelection,
                      onKeyUp: updateSelection,
                      onClick: updateSelection,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">결과</label>
                <textarea
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">카드 배경 이미지</label>
                    <p className="text-xs text-gray-500">업로드하지 않으면 기본 배경이 사용됩니다.</p>
                  </div>
                  {backgroundImage && (
                    <button
                      type="button"
                      onClick={() => setBackgroundImage('')}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      배경 이미지 제거
                    </button>
                  )}
                </div>
                {backgroundImage && (
                  <div className="w-full h-44 rounded-lg overflow-hidden border border-gray-200">
                    <img src={backgroundImage} alt="배경 미리보기" className="w-full h-full object-cover" />
                  </div>
                )}
                <ImageUploader
                  bucket="public-content"
                  accept="image/*"
                  onUpload={(url) => setBackgroundImage(url)}
                />
              </div>

              <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">이미지 설명 (선택)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="예: 상담 장면"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <p className="text-xs text-gray-500">
                  업로드 즉시 현재 커서 위치에 Markdown 이미지가 삽입됩니다.
                </p>
                <ImageUploader bucket="public-content" accept="image/*" onUpload={handleInlineImageUpload} />
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
                  {editingCase ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
