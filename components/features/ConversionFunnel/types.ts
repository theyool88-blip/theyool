/**
 * Conversion Funnel Component Types
 * 법무법인 더율 전환 퍼널 타입 정의
 */

export type LeadType = 'hot' | 'warm' | 'cold';
export type ColorScheme = 'sage' | 'amber' | 'cyan' | 'purple' | 'indigo' | 'pink';

export interface FunnelItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  leadType: LeadType;
}

export interface FunnelCardProps {
  item: FunnelItem;
  index: number;
  onModalOpen?: () => void;
  colorScheme?: ColorScheme;
}

export interface ConversionFunnelProps {
  title?: string;
  subtitle?: string;
  className?: string;
  excludeItems?: string[];
  colorScheme?: ColorScheme;
  onOpenConsultationModal?: () => void;
}

export interface LeadTypeConfig {
  bgGradient: string;
  bgGradientHover: string;
  border: string;
  borderHover: string;
  badge?: {
    bg: string;
    text: string;
    label: string;
  };
  textColor: string;
  shadow: string;
  shadowHover: string;
}
