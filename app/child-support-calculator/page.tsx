import { Metadata } from 'next';
import ChildSupportCalculatorClient from './ChildSupportCalculatorClient';

export const metadata: Metadata = {
  title: '양육비 계산기 | 법무법인 더율',
  description:
    '이혼 시 양육비를 간편하게 계산해보세요. 도시/농어촌 구분과 소득, 자녀 정보를 입력하면 2025년 양육비 산정표 기준으로 예상 양육비를 확인할 수 있습니다.',
  keywords: '양육비 계산기, 양육비 산정표, 2025 양육비, 도시 농어촌 양육비, 자녀 양육비',
  openGraph: {
    title: '양육비 계산기 | 법무법인 더율',
    description: '부모 소득과 자녀 정보를 입력하면 2025년 양육비 산정표 기준 예상 양육비를 확인할 수 있습니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function ChildSupportCalculatorPage() {
  return <ChildSupportCalculatorClient />;
}
