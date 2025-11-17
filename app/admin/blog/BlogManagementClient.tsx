'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import ImageUploader from '@/components/admin/ImageUploader';
import { splitMarkdownMetadata, injectBackgroundMetadata, slugify } from '@/lib/utils/markdown';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categories: string[];
  tags: string[];
  excerpt: string | null;
  content: string;
  published: boolean;
  featured: boolean;
  views: number;
  author: string;
  published_at: string | null;
}

const categoryOptions = ['이혼절차', '재산분할', '양육권', '위자료', '상간', '법률상식'];
const tagOptions = ['이혼', '재산', '자녀', '소송', '상담', '협의이혼', '재판이혼', '위자료', '양육비'];

const AUTOSAVE_KEY = 'blog_draft_autosave';
const AUTOSAVE_INTERVAL = 30000; // 30초

export default function BlogManagementClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageAlt, setImageAlt] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categories: [] as string[],
    tags: [] as string[],
    excerpt: '',
    content: '',
    published: true,
    featured: false,
    author: '법무법인 더율',
    published_at: new Date().toISOString().split('T')[0],
  });
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const selectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });
  const [backgroundImage, setBackgroundImage] = useState('');

  // 자동 저장 (LocalStorage)
  const autoSave = useCallback(() => {
    if (formData.title || formData.content) {
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({
        ...formData,
        backgroundImage,
        savedAt: new Date().toISOString()
      }));
      setLastSaved(new Date());
    }
  }, [formData, backgroundImage]);

  // 30초마다 자동 저장
  useEffect(() => {
    if (!showModal) return;

    const interval = setInterval(() => {
      autoSave();
    }, AUTOSAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [showModal, autoSave]);

  // 모달 열 때 임시저장 복구
  useEffect(() => {
    if (showModal && !editingPost) {
      const saved = localStorage.getItem(AUTOSAVE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (confirm('임시 저장된 내용이 있습니다. 불러올까요?')) {
          const { backgroundImage: savedBg, savedAt, ...rest } = data;
          setFormData(rest);
          setBackgroundImage(savedBg || '');
          if (savedAt) {
            setLastSaved(new Date(savedAt));
          }
        }
      }
    }
  }, [showModal, editingPost]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Blog Posts 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (!formData.slug.trim()) {
        alert('Slug를 입력해주세요.');
        setSaving(false);
        return;
      }
      const normalizedSlug = slugify(formData.slug);
      const url = editingPost
        ? `/api/admin/blog/${editingPost.id}`
        : '/api/admin/blog';

      const method = editingPost ? 'PUT' : 'POST';
      const payload = {
        ...formData,
        slug: normalizedSlug,
        content: injectBackgroundMetadata(formData.content, backgroundImage || undefined),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingPost ? '칼럼이 수정되었습니다.' : '칼럼이 생성되었습니다.');
        localStorage.removeItem(AUTOSAVE_KEY); // 임시저장 삭제
        setShowModal(false);
        resetForm();
        loadPosts();
      } else {
        alert(data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    const { content, backgroundImage: bg } = splitMarkdownMetadata(post.content);
    setFormData({
      title: post.title,
      slug: post.slug,
      categories: post.categories || [],
      tags: post.tags || [],
      excerpt: post.excerpt || '',
      content: content,
      published: post.published,
      featured: post.featured,
      author: post.author || '법무법인 더율',
      published_at: post.published_at?.split('T')[0] || new Date().toISOString().split('T')[0],
    });
    setBackgroundImage(bg || '');
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        alert('칼럼이 삭제되었습니다.');
        loadPosts();
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setLastSaved(null);
    setFormData({
      title: '',
      slug: '',
      categories: [],
      tags: [],
      excerpt: '',
      content: '',
      published: true,
      featured: false,
      author: '법무법인 더율',
      published_at: new Date().toISOString().split('T')[0],
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

  const toggleTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter(t => t !== tag)
        : [...formData.tags, tag],
    });
  };

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

  const handleImageInsert = (url: string) => {
    insertAtSelection(`\n\n![${imageAlt || 'image'}](${url})\n`);
    alert('이미지가 본문에 추가되었습니다.');
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = slugify(formData.title);
      setFormData({ ...formData, slug });
    }
  };

  if (loading) {
    return <div className="text-center py-12">로딩 중...</div>;
  }

  return (
    <div>
      {/* 액션 버튼 */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          전체 칼럼 ({posts.length}개)
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          + 새 칼럼 추가
        </button>
      </div>

      {/* Posts 테이블 */}
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
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  <div className="text-xs text-gray-500">{post.slug}</div>
                  {post.featured && (
                    <span className="inline-block mt-1 px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded">
                      추천
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {post.categories.slice(0, 2).map((cat) => (
                      <span key={cat} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {post.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      post.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {post.published ? '공개' : '비공개'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPost ? '칼럼 수정' : '새 칼럼 추가'}
              </h3>
              {lastSaved && (
                <span className="text-xs text-gray-500">
                  마지막 저장: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="예: divorce-alimony-guide"
                  />
                  <button
                    type="button"
                    onClick={generateSlug}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    자동 생성
                  </button>
                </div>
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
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 text-sm rounded transition-colors ${
                        formData.tags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요약</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="간단한 요약 (검색 결과에 표시됨)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">본문 (Markdown) *</label>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {showPreview ? '에디터로 돌아가기' : '미리보기'}
                  </button>
                </div>

                {showPreview ? (
                  <div className="border border-gray-300 rounded-md p-4 bg-white prose max-w-none">
                    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: formData.content }} />
                  </div>
                ) : (
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
                )}
              </div>

              <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">이미지 설명 (선택)</label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="예: 상담 장면"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  업로드 즉시 현재 커서 위치에 Markdown 이미지가 추가됩니다.
                </p>
                <ImageUploader
                  bucket="public-content"
                  accept="image/*"
                  onUpload={handleImageInsert}
                />
              </div>

              <div className="border border-dashed border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">히어로 배경 이미지</label>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">발행일</label>
                  <input
                    type="date"
                    value={formData.published_at}
                    onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">추천 칼럼</span>
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

              <div className="flex justify-between gap-2 pt-4">
                <button
                  type="button"
                  onClick={autoSave}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  임시 저장
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('작성 중인 내용이 삭제됩니다. 계속하시겠습니까?')) {
                        localStorage.removeItem(AUTOSAVE_KEY);
                        setShowModal(false);
                        resetForm();
                      }
                    }}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                  >
                    {saving ? '저장 중...' : (editingPost ? '수정' : '생성')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
