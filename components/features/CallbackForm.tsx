'use client';

import { useState } from 'react';

interface CallbackFormProps {
  pageType?: 'property' | 'custody' | 'alimony' | 'general';
  variant?: 'default' | 'compact';
  className?: string;
}

interface FormData {
  name: string;
  phone: string;
  preferredTime: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

export default function CallbackForm({
  pageType = 'general',
  variant = 'default',
  className = ''
}: CallbackFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    preferredTime: '언제든지'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Phone number formatting
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '성함을 입력해주세요';
    }

    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호를 입력해주세요 (010-XXXX-XXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          category: pageType === 'property' ? '재산분할' :
                   pageType === 'custody' ? '양육권' :
                   pageType === 'alimony' ? '위자료' : '일반 상담',
          message: `전화 상담 요청 (희망 시간: ${formData.preferredTime})`
        })
      });

      if (response.ok) {
        setIsSuccess(true);

        // Google Analytics event (if available)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'callback_form_submit', {
            event_category: 'consultation',
            event_label: pageType,
            preferred_time: formData.preferredTime
          });
        }
      } else {
        throw new Error('제출에 실패했습니다');
      }
    } catch (error) {
      alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div
        className={`bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-8 ${className}`}
        style={{ animation: 'formSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="text-center">
          <div
            className="text-5xl mb-4"
            style={{ animation: 'checkmarkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            ✅
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            접수 완료!
          </h3>
          <p className="text-gray-700 mb-1">
            <strong>10분 내</strong> 변호사가 직접 전화드리겠습니다
          </p>
          <p className="text-sm text-gray-600 mb-6">
            📞 {formData.phone}
          </p>
          <div className="text-xs text-gray-500 bg-white rounded-lg p-4 mb-4">
            <p className="mb-2">📱 부재중 전화가 될 수 있으니 <strong>1661-7633</strong> 번호를 저장해주세요.</p>
            <p className="mb-2">혹시 연락을 못 받으신 경우:</p>
            <p>→ 1661-7633으로 회신 주시거나</p>
            <p>→ 카카오톡 '법무법인 더율'을 검색해 메시지 주세요</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/cases"
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors text-sm"
            >
              성공사례 둘러보기
            </a>
            <a
              href="/faq"
              className="px-6 py-2 bg-white border border-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
            >
              이혼큐레이션 먼저 확인
            </a>
          </div>
        </div>

        <style jsx>{`
          @keyframes checkmarkPop {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // Main form
  return (
    <div
      className={`bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 md:p-8 border-2 border-amber-100 shadow-lg ${className}`}
      style={{ animation: 'formSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {/* Trust badges - Above form */}
      {variant === 'default' && (
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full">
            <span className="text-amber-600">🔒</span>
            <span className="text-sm font-semibold text-amber-800">비밀보장</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full">
            <span className="text-amber-600">⚡</span>
            <span className="text-sm font-semibold text-amber-800">10분 내 연락</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-full">
            <span className="text-amber-600">💯</span>
            <span className="text-sm font-semibold text-amber-800">스팸 없음</span>
          </div>
        </div>
      )}

      {/* Headline */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          📞 변호사가 직접 전화드립니다
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          상황을 간단히 듣고 10분 무료 법률 상담을 도와드립니다.<br />
          비밀보장은 기본, 편한 시간에 편안하게 상담받으세요.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            성함 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder="예: 홍길동"
            className={`w-full px-4 py-3.5 rounded-xl border-2 text-base transition-all duration-200 outline-none ${
              errors.name
                ? 'border-red-500 ring-4 ring-red-100'
                : 'border-gray-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100'
            }`}
            aria-required="true"
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-600 mt-1" role="alert">
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        {/* Phone field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            className={`w-full px-4 py-3.5 rounded-xl border-2 text-base transition-all duration-200 outline-none ${
              errors.phone
                ? 'border-red-500 ring-4 ring-red-100'
                : 'border-gray-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100'
            }`}
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-helper'}
            disabled={isSubmitting}
          />
          {errors.phone ? (
            <p id="phone-error" className="text-sm text-red-600 mt-1" role="alert">
              ⚠️ {errors.phone}
            </p>
          ) : (
            <p id="phone-helper" className="text-xs text-gray-500 mt-1">
              입력하신 번호로 변호사가 직접 전화드립니다
            </p>
          )}
        </div>

        {/* Time slot field - only in default variant */}
        {variant === 'default' && (
          <div>
            <label htmlFor="time-slot" className="block text-sm font-semibold text-gray-700 mb-2">
              통화 가능 시간 <span className="text-gray-400 font-normal">(선택)</span>
            </label>
            <select
              id="time-slot"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-300 text-base transition-all duration-200 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 bg-white"
              disabled={isSubmitting}
            >
              <option value="언제든지">언제든지 괜찮아요</option>
              <option value="오전 (9-12시)">오전 (9-12시)</option>
              <option value="오후 (12-18시)">오후 (12-18시)</option>
              <option value="저녁 (18-21시)">저녁 (18-21시)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              *선택하지 않으시면 빠른 시간 내 연락드립니다
            </p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.name || !formData.phone}
          className={`w-full px-10 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 ${
            isSubmitting || !formData.name || !formData.phone
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-black hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              <span>접수 중...</span>
            </div>
          ) : (
            '지금 전화받기 (무료)'
          )}
        </button>
      </form>

      {/* Alternative contact methods - only in default variant */}
      {variant === 'default' && (
        <div className="mt-6 pt-6 border-t border-amber-200">
          <p className="text-sm text-gray-600 text-center mb-3">전화가 어려우신가요?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:1661-7633"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-800 rounded-full font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all text-sm"
            >
              📞 지금 바로 문의: 1661-7633
            </a>
            <a
              href="http://pf.kakao.com/_xdKxhcG/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-300 text-gray-800 rounded-full font-semibold hover:bg-yellow-400 transition-all text-sm"
            >
              💬 카카오톡 상담 (24시간)
            </a>
          </div>
        </div>
      )}

      {/* Privacy notice */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        개인정보는 상담 목적으로만 사용되며, 상담 종료 후 즉시 폐기됩니다.{' '}
        <a href="/privacy" className="underline hover:text-gray-700">
          개인정보처리방침 보기
        </a>
      </p>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes formSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
