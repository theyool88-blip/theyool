/**
 * Conversion Funnel Configuration
 * 법무법인 더율 전환 퍼널 설정 및 데이터
 */

import { FunnelItem, LeadTypeConfig, ColorScheme } from './types';

/**
 * 퍼널 6개 항목 데이터
 * 심리적 여정에 따른 최적 순서: Hot → Warm → Cold
 */
export const funnelItems: FunnelItem[] = [
  {
    id: 'free-consultation',
    icon: 'phone',
    title: '10분 무료 진단받기',
    description: '전문 변호사가 직접 상황 분석',
    link: 'modal:consultation',
    leadType: 'hot'
  },
  {
    id: 'consultation-process',
    icon: 'refresh',
    title: '상담 진행과정 확인하기',
    description: '첫 상담부터 사건 종료까지 전 과정',
    link: '/consultation',
    leadType: 'warm'
  },
  {
    id: 'transparent-fees',
    icon: 'currency',
    title: '수임료 투명하게 확인',
    description: '숨김없는 비용 안내',
    link: '/consultation#pricing',
    leadType: 'warm'
  },
  {
    id: 'success-cases',
    icon: 'scale',
    title: '나와 같은 성공사례',
    description: '실제 승소 판결문 공개',
    link: '/cases',
    leadType: 'warm'
  },
  {
    id: 'client-reviews',
    icon: 'star',
    title: '실제 의뢰인 생생 후기',
    description: '1,000건+ 진짜 후기',
    link: '/consultation#testimonials',
    leadType: 'warm'
  },
  {
    id: 'divorce-guide',
    icon: 'lightbulb',
    title: '이혼 전문 Q&A 확인',
    description: '76개 핵심 질문과 답변',
    link: '/faq',
    leadType: 'cold'
  }
];

/**
 * 색상 테마별 아이콘 색상
 */
export const iconColors: Record<ColorScheme, string> = {
  sage: 'text-sage-600',
  amber: 'text-amber-600',
  cyan: 'text-cyan-600',
  purple: 'text-purple-600',
  indigo: 'text-indigo-600',
  pink: 'text-pink-600'
};

/**
 * Lead Type 별 색상 및 스타일 설정 (색상 테마별)
 */
export const colorSchemeConfigs: Record<ColorScheme, Record<string, LeadTypeConfig>> = {
  sage: {
    hot: {
      bgGradient: 'from-sage-700 to-sage-800',
      bgGradientHover: 'from-sage-800 to-sage-900',
      border: 'border-sage-800',
      borderHover: 'border-sage-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(72, 122, 108, 0.2)',
      shadowHover: '0 8px 24px rgba(72, 122, 108, 0.3)'
    },
    warm: {
      bgGradient: 'from-sage-600 to-sage-700',
      bgGradientHover: 'from-sage-700 to-sage-800',
      border: 'border-sage-700',
      borderHover: 'border-sage-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(90, 153, 136, 0.18)',
      shadowHover: '0 8px 24px rgba(90, 153, 136, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-sage-50',
      bgGradientHover: 'from-sage-50 to-sage-100',
      border: 'border-sage-200',
      borderHover: 'border-sage-300',
      textColor: 'text-sage-900',
      shadow: '0 2px 12px rgba(109, 181, 164, 0.1)',
      shadowHover: '0 8px 24px rgba(109, 181, 164, 0.18)'
    }
  },
  amber: {
    hot: {
      bgGradient: 'from-amber-700 to-orange-800',
      bgGradientHover: 'from-amber-800 to-orange-900',
      border: 'border-amber-800',
      borderHover: 'border-orange-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(217, 119, 6, 0.2)',
      shadowHover: '0 8px 24px rgba(217, 119, 6, 0.3)'
    },
    warm: {
      bgGradient: 'from-amber-600 to-orange-700',
      bgGradientHover: 'from-amber-700 to-orange-800',
      border: 'border-amber-700',
      borderHover: 'border-amber-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(245, 158, 11, 0.18)',
      shadowHover: '0 8px 24px rgba(245, 158, 11, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-amber-50',
      bgGradientHover: 'from-amber-50 to-amber-100',
      border: 'border-amber-200',
      borderHover: 'border-amber-300',
      textColor: 'text-amber-900',
      shadow: '0 2px 12px rgba(245, 158, 11, 0.1)',
      shadowHover: '0 8px 24px rgba(245, 158, 11, 0.18)'
    }
  },
  cyan: {
    hot: {
      bgGradient: 'from-cyan-700 to-teal-800',
      bgGradientHover: 'from-cyan-800 to-teal-900',
      border: 'border-cyan-800',
      borderHover: 'border-teal-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(14, 116, 144, 0.2)',
      shadowHover: '0 8px 24px rgba(14, 116, 144, 0.3)'
    },
    warm: {
      bgGradient: 'from-cyan-600 to-teal-700',
      bgGradientHover: 'from-cyan-700 to-teal-800',
      border: 'border-cyan-700',
      borderHover: 'border-cyan-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(8, 145, 178, 0.18)',
      shadowHover: '0 8px 24px rgba(8, 145, 178, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-cyan-50',
      bgGradientHover: 'from-cyan-50 to-cyan-100',
      border: 'border-cyan-200',
      borderHover: 'border-cyan-300',
      textColor: 'text-cyan-900',
      shadow: '0 2px 12px rgba(6, 182, 212, 0.1)',
      shadowHover: '0 8px 24px rgba(6, 182, 212, 0.18)'
    }
  },
  purple: {
    hot: {
      bgGradient: 'from-purple-700 to-pink-800',
      bgGradientHover: 'from-purple-800 to-pink-900',
      border: 'border-purple-800',
      borderHover: 'border-pink-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(126, 34, 206, 0.2)',
      shadowHover: '0 8px 24px rgba(126, 34, 206, 0.3)'
    },
    warm: {
      bgGradient: 'from-purple-600 to-pink-700',
      bgGradientHover: 'from-purple-700 to-pink-800',
      border: 'border-purple-700',
      borderHover: 'border-purple-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(147, 51, 234, 0.18)',
      shadowHover: '0 8px 24px rgba(147, 51, 234, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-purple-50',
      bgGradientHover: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      borderHover: 'border-purple-300',
      textColor: 'text-purple-900',
      shadow: '0 2px 12px rgba(168, 85, 247, 0.1)',
      shadowHover: '0 8px 24px rgba(168, 85, 247, 0.18)'
    }
  },
  indigo: {
    hot: {
      bgGradient: 'from-indigo-700 to-slate-800',
      bgGradientHover: 'from-indigo-800 to-slate-900',
      border: 'border-indigo-800',
      borderHover: 'border-slate-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(67, 56, 202, 0.2)',
      shadowHover: '0 8px 24px rgba(67, 56, 202, 0.3)'
    },
    warm: {
      bgGradient: 'from-indigo-600 to-slate-700',
      bgGradientHover: 'from-indigo-700 to-slate-800',
      border: 'border-indigo-700',
      borderHover: 'border-indigo-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(79, 70, 229, 0.18)',
      shadowHover: '0 8px 24px rgba(79, 70, 229, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-indigo-50',
      bgGradientHover: 'from-indigo-50 to-indigo-100',
      border: 'border-indigo-200',
      borderHover: 'border-indigo-300',
      textColor: 'text-indigo-900',
      shadow: '0 2px 12px rgba(99, 102, 241, 0.1)',
      shadowHover: '0 8px 24px rgba(99, 102, 241, 0.18)'
    }
  },
  pink: {
    hot: {
      bgGradient: 'from-pink-700 to-rose-800',
      bgGradientHover: 'from-pink-800 to-rose-900',
      border: 'border-pink-800',
      borderHover: 'border-rose-900',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(190, 24, 93, 0.2)',
      shadowHover: '0 8px 24px rgba(190, 24, 93, 0.3)'
    },
    warm: {
      bgGradient: 'from-pink-600 to-rose-700',
      bgGradientHover: 'from-pink-700 to-rose-800',
      border: 'border-pink-700',
      borderHover: 'border-pink-800',
      textColor: 'text-white',
      shadow: '0 2px 12px rgba(219, 39, 119, 0.18)',
      shadowHover: '0 8px 24px rgba(219, 39, 119, 0.28)'
    },
    cold: {
      bgGradient: 'from-white to-pink-50',
      bgGradientHover: 'from-pink-50 to-pink-100',
      border: 'border-pink-200',
      borderHover: 'border-pink-300',
      textColor: 'text-pink-900',
      shadow: '0 2px 12px rgba(236, 72, 153, 0.1)',
      shadowHover: '0 8px 24px rgba(236, 72, 153, 0.18)'
    }
  }
};

/**
 * 기본 leadTypeConfig (하위 호환성 유지)
 */
export const leadTypeConfig = colorSchemeConfigs.sage;

/**
 * 애니메이션 타이밍 설정
 * 순차적 stagger 효과
 */
export const animationConfig = {
  staggerDelay: 80, // ms
  duration: 600, // ms
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
};
