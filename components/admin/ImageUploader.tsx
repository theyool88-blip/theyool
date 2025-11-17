'use client';

import { useState, useRef, DragEvent } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  bucket: 'blog-images' | 'case-images' | 'instagram-media' | 'instagram-profiles' | 'public-content';
  onUpload: (url: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // MB
  currentImage?: string;
}

export default function ImageUploader({
  bucket,
  onUpload,
  multiple = false,
  accept = 'image/*,video/*',
  maxSize = 10,
  currentImage
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // 단일 파일만 처리 (multiple은 추후 구현)

    // 파일 크기 체크
    if (file.size > maxSize * 1024 * 1024) {
      alert(`파일 크기가 너무 큽니다. (최대 ${maxSize}MB)`);
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // 미리보기 생성
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }

      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      // 업로드 진행률 시뮬레이션 (실제 진행률은 XMLHttpRequest 필요)
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();

      if (data.success) {
        onUpload(data.data.url);
        setPreview(data.data.url);
      } else {
        alert(data.message || '업로드 실패');
        setPreview(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
      setPreview(null);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      {/* 미리보기 */}
      {preview && (
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain"
            unoptimized
          />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* 업로드 영역 */}
      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        {uploading ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">업로드 중... {progress}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              클릭하거나 파일을 드래그하세요
            </p>
            <p className="text-xs text-gray-500 mt-1">
              최대 {maxSize}MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
