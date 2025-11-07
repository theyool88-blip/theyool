'use client';

import { useState } from 'react';
import { ConsultationFormData, CONSULTATION_CATEGORIES } from '@/types/consultation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';

interface ConsultationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ConsultationForm({ onSuccess, onCancel }: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    category: '',
    message: '',
    agree_privacy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof ConsultationFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처를 입력해주세요';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일을 입력해주세요';
    }

    if (!formData.agree_privacy) {
      newErrors.agree_privacy = '개인정보 수집 및 이용에 동의해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          category: formData.category || null,
          message: formData.message || null,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || '상담 신청에 실패했습니다');
      }

      setSubmitSuccess(true);

      // 성공 후 폼 초기화
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: '',
        message: '',
        agree_privacy: false,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.';
      alert(message);
      console.error('Consultation submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="text-center py-8 md:py-12">
        <div className="mb-4 md:mb-6 text-5xl md:text-6xl">✅</div>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-3 md:mb-4">
          상담 신청이 완료되었습니다
        </h3>
        <p className="text-sm md:text-base text-[var(--gray-600)] mb-6 md:mb-8">
          빠른 시일 내에 연락드리겠습니다.<br />
          평일 09:00 - 18:00 순차적으로 연락드립니다.
        </p>
        <Button onClick={() => setSubmitSuccess(false)}>
          추가 상담 신청
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-2">
          무료 상담 신청
        </h2>
        <p className="text-sm md:text-base text-[var(--gray-600)]">
          30분 무료 초기 상담을 진행해드립니다
        </p>
      </div>

      <Input
        label="이름"
        type="text"
        placeholder="홍길동"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />

      <Input
        label="연락처"
        type="tel"
        placeholder="010-1234-5678"
        required
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        error={errors.phone}
        helperText="상담 일정 조율을 위해 필요합니다"
      />

      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        helperText="(선택) 이메일로도 연락 가능합니다"
      />

      <Select
        label="상담 분야"
        placeholder="선택해주세요"
        options={CONSULTATION_CATEGORIES.map(cat => ({ value: cat.value, label: cat.label }))}
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />

      <Textarea
        label="상담 내용"
        placeholder="간략하게 상황을 알려주시면 더욱 정확한 상담이 가능합니다"
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        helperText="(선택) 비밀이 보장됩니다"
      />

      <div className="bg-[var(--gray-50)] p-4 rounded-lg">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agree_privacy}
            onChange={(e) => setFormData({ ...formData, agree_privacy: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-[var(--gray-300)] text-[var(--accent)] focus:ring-[var(--accent)]"
          />
          <span className="text-sm text-[var(--gray-700)]">
            개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">*</span>
            <br />
            <span className="text-xs text-[var(--gray-500)]">
              상담 목적으로만 사용되며, 상담 완료 후 1년 뒤 파기됩니다.
            </span>
          </span>
        </label>
        {errors.agree_privacy && (
          <p className="mt-2 text-sm text-red-500">{errors.agree_privacy}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full md:flex-1"
          >
            취소
          </Button>
        )}
        <Button
          type="submit"
          loading={loading}
          className="w-full md:flex-1"
        >
          상담 신청하기
        </Button>
      </div>
    </form>
  );
}
