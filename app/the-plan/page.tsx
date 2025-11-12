import ThePlanClient from './ThePlanClient';

export const metadata = {
  title: '더 플랜 (The Plan) | 법무법인 더율',
  description: '이겨놓고 설계하는 3단계 전략. 더율의 핵심 승소 전략을 소개합니다.',
};

export default function ThePlanPage() {
  // ThePlanClient는 자체 샘플 데이터를 사용
  return <ThePlanClient cases={[]} />;
}
