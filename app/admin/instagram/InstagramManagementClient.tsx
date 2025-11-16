'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUploader from '@/components/admin/ImageUploader';

type OriginalType = 'case' | 'blog';

interface LinkedOriginal {
  type: OriginalType;
  title: string;
  slug: string;
  url: string;
}

interface InstagramPost {
  id: string;
  title: string;
  post_type: string;
  caption: string;
  images: string[];
  thumbnail: string | null;
  published: boolean;
  post_date: string;
  views: number;
  likes: number;
  created_at: string;
  linked_case_id?: string | null;
  linked_blog_id?: string | null;
  original?: LinkedOriginal | null;
  previewUrl?: string | null;
}

const postTypes = ['릴스', '일상', '성공사례', '칼럼', '일반', '홍보'];

export default function InstagramManagementClient() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<InstagramPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    post_type: '일상',
    caption: '',
    images: [] as string[],
    thumbnail: '',
    published: true,
    post_date: new Date().toISOString().split('T')[0],
  });
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/admin/instagram');
      const data = await res.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('게시물 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingPost
        ? `/api/admin/instagram/${editingPost.id}`
        : '/api/admin/instagram';

      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          thumbnail: formData.thumbnail || formData.images[0] || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingPost ? '게시물이 수정되었습니다.' : '게시물이 생성되었습니다.');
        setShowModal(false);
        resetForm();
        loadPosts();
      } else {
        alert(data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleEdit = (post: InstagramPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      post_type: post.post_type,
      caption: post.caption,
      images: post.images || [],
      thumbnail: post.thumbnail || '',
      published: post.published,
      post_date: post.post_date?.split('T')[0] || new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/instagram/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        alert('게시물이 삭제되었습니다.');
        loadPosts();
      }
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      post_type: '일상',
      caption: '',
      images: [],
      thumbnail: '',
      published: true,
      post_date: new Date().toISOString().split('T')[0],
    });
    setImageInput('');
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => {
        const newImages = [...prev.images, imageInput.trim()];
        return {
          ...prev,
          images: newImages,
          thumbnail: prev.thumbnail || newImages[0] || '',
        };
      });
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => {
      const removedImage = prev.images[index];
      const newImages = prev.images.filter((_, i) => i !== index);
      const nextThumbnail =
        removedImage && removedImage === prev.thumbnail
          ? newImages[0] || ''
          : prev.thumbnail;

      return {
        ...prev,
        images: newImages,
        thumbnail: nextThumbnail || '',
      };
    });
  };

  if (loading) {
    return <div className="text-center py-12">로딩 중...</div>;
  }

  return (
    <div>
      {/* 액션 버튼 */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          전체 게시물 ({posts.length}개)
        </h2>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          + 새 게시물 추가
        </button>
      </div>

      {/* 게시물 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {post.previewUrl ? (
              <div className="relative w-full h-48 bg-gray-100">
                <img
                  src={post.previewUrl}
                  alt={post.title || 'Instagram post'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex w-full h-48 items-center justify-center bg-gray-100 text-xs text-gray-500">
                이미지가 없습니다
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-blue-600">{post.post_type}</span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {post.published ? '공개' : '비공개'}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                {post.title || '(제목 없음)'}
              </h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{post.caption}</p>
              <div className="mb-3">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  원본
                </p>
                {post.original ? (
                  <a
                    href={post.original.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    [{post.original.type === 'case' ? '성공사례' : '칼럼'}] {post.original.title}
                  </a>
                ) : (
                  <p className="text-xs text-gray-400">연결된 원본 없음</p>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>조회 {post.views}</span>
                <span>좋아요 {post.likes}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="flex-1 px-3 py-1.5 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingPost ? '게시물 수정' : '새 게시물 추가'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">타입</label>
                <select
                  value={formData.post_type}
                  onChange={(e) => setFormData({ ...formData, post_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {postTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">캡션</label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이미지/동영상 업로드
                </label>
                <ImageUploader
                  bucket="instagram-media"
                  onUpload={(url) => {
                    setFormData((prev) => ({
                      ...prev,
                      images: [...prev.images, url],
                      thumbnail: prev.thumbnail || url, // 첫 번째 이미지를 썸네일로
                    }));
                  }}
                  accept="image/*,video/*"
                />

                {/* 업로드된 이미지 목록 */}
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      업로드된 파일 ({formData.images.length}개)
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Image ${idx + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* URL로도 추가 가능 (옵션) */}
                <details className="mt-4">
                  <summary className="text-sm text-gray-600 cursor-pointer">또는 URL로 추가하기</summary>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="url"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      추가
                    </button>
                  </div>
                </details>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">게시일</label>
                <input
                  type="date"
                  value={formData.post_date}
                  onChange={(e) => setFormData({ ...formData, post_date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
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
                  {editingPost ? '수정' : '생성'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
