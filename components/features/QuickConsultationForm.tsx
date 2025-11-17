'use client';

import { useState } from 'react';

interface QuickConsultationFormProps {
  pageType: 'alimony' | 'custody' | 'property';
  variant?: 'default' | 'compact';
}

export default function QuickConsultationForm({ pageType, variant = 'default' }: QuickConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    situation: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const situationOptions = {
    alimony: [
      '위자료 청구를 받았습니다',
      '위자료를 청구하려고 합니다',
      '감액 협상이 필요합니다',
      '기타',
    ],
    custody: [
      '양육권을 확보하고 싶습니다',
      '양육권을 빼앗길 위기입니다',
      '자녀를 데려갔습니다',
      '기타',
    ],
    property: [
      '재산 은닉이 의심됩니다',
      '재산분할 비율을 높이고 싶습니다',
      '특유재산을 보호하고 싶습니다',
      '기타',
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          category: pageType,
          message: formData.situation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '상담 신청에 실패했습니다.');
      }

      setIsSubmitted(true);

      // Google Analytics 이벤트 전송 (GA4가 설치되어 있다면)
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'consultation_submit', {
          event_category: 'engagement',
          event_label: pageType,
          value: 1,
        });
      }

      // 5초 후 폼 리셋
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', situation: '' });
      }, 5000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : '상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">접수 완료!</h3>
        <p className="text-gray-700 mb-1">
          <strong>30분 내</strong> 전문 상담사가 연락드리겠습니다
        </p>
        <p className="text-sm text-gray-600">
          📞 {formData.phone}
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-3">⚡ 30초 긴급 상담</h3>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm mb-3">
            {error}
          </div>
        )}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="성함"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="tel"
            placeholder="연락처 (예: 010-1234-5678)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <select
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">상황 선택</option>
            {situationOptions[pageType].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? '접수 중...' : '무료 상담 신청'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          ✓ 100% 비밀보장 ✓ 스팸 없음 ✓ 30분 내 연락
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-xl border-2 border-blue-200">
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          30초 무료 상담 신청
        </h3>
        <p className="text-gray-600">
          지금 신청하시면 <strong className="text-blue-600">30분 내</strong> 전문 상담사가 연락드립니다
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            성함 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="예: 홍길동"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="010-1234-5678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            현재 상황 <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
            required
          >
            <option value="">선택해주세요</option>
            {situationOptions[pageType].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? '접수 중...' : '무료 상담 신청하기'}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-3 rounded-lg">
          <div className="text-2xl mb-1">🔒</div>
          <p className="text-xs text-gray-600">100% 비밀보장</p>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div className="text-2xl mb-1">⚡</div>
          <p className="text-xs text-gray-600">30분 내 연락</p>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <div className="text-2xl mb-1">💯</div>
          <p className="text-xs text-gray-600">스팸 없음</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        개인정보는 상담 목적으로만 사용되며, 상담 종료 후 즉시 폐기됩니다.
      </p>
    </form>
  );
}
