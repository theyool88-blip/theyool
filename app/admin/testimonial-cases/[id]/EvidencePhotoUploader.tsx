'use client';

import { useState, useRef, ChangeEvent } from 'react';
import type { PhotoType, EvidencePhoto } from '@/types/testimonial';
import { PHOTO_TYPE_INFO } from '@/types/testimonial';

interface Props {
  caseId: string;
  onUploadSuccess: (photo: EvidencePhoto) => void;
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

export default function EvidencePhotoUploader({
  caseId,
  onUploadSuccess,
  isUploading,
  setIsUploading,
}: Props) {
  const [selectedType, setSelectedType] = useState<PhotoType>('kakao');
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!allowedTypes.includes(file.type)) {
      alert('지원되는 이미지 형식: JPEG, PNG, WebP, HEIC');
      return;
    }

    // Validate file size (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseId', caseId);
      formData.append('evidenceType', selectedType);
      if (caption) {
        formData.append('caption', caption);
      }

      const response = await fetch('/api/admin/testimonials/evidence-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const { id, photo_url, evidence_type, display_order } = await response.json();

      // Create EvidencePhoto object
      const newPhoto: EvidencePhoto = {
        id,
        case_id: caseId,
        photo_url,
        evidence_type,
        display_order,
        caption: caption || null,
        original_date: null,
        file_size: file.size,
        file_type: file.type,
        width: null,
        height: null,
        alt_text: null,
        blur_applied: true,
        verified_by: null,
        verified_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: null,
        updated_by: null,
      };

      onUploadSuccess(newPhoto);
      setCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('사진이 업로드되었습니다!');
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      {/* Photo Type Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">증빙 유형</label>
        <div className="grid grid-cols-5 gap-2">
          {Object.values(PHOTO_TYPE_INFO).map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium transition-all ${
                selectedType === type.value
                  ? `${type.bgColor} ${type.color} ${type.borderColor} border-2`
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{type.icon}</span>
                <span className="text-xs">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Caption Input */}
      <div>
        <label className="block text-sm font-medium mb-2">설명 (선택)</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="예: 카카오톡 대화 1/3"
          className="w-full border rounded-lg px-3 py-2"
          disabled={isUploading}
        />
      </div>

      {/* File Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-amber-500 bg-amber-50'
            : 'border-gray-300 hover:border-amber-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto" />
            <p className="text-gray-600">업로드 중...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-4xl">📸</div>
            <div>
              <p className="text-gray-700 font-medium">
                클릭하여 파일 선택 또는 드래그 앤 드롭
              </p>
              <p className="text-sm text-gray-500 mt-1">
                JPEG, PNG, WebP, HEIC (최대 10MB)
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              파일 선택
            </button>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>⚠️ 업로드 전 개인정보 블러 처리 확인 필수</p>
        <p>📌 증빙 사진은 신뢰도 구축의 핵심입니다</p>
      </div>
    </div>
  );
}
