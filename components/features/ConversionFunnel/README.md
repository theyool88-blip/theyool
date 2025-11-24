# Conversion Funnel Component

법무법인 더율 전환 퍼널 컴포넌트 - 8개 항목으로 구성된 맞춤형 상담 가이드

## 개요

고객의 전환 단계(Hot/Warm/Cold)에 따라 차별화된 디자인을 제공하는 퍼널 컴포넌트입니다. Sage Green 브랜드 색상을 기반으로 긴급도와 중요도를 시각적으로 표현합니다.

## 디자인 철학

### 색상 전략
- **Hot Lead (긴급)**: Coral 계열, "긴급" 뱃지
  - 즉각적인 행동 유도 (10분 무료 진단)
  - 따뜻한 핑크-오렌지 그라데이션으로 긴급성 표현

- **Warm Lead (추천)**: Sage Green 계열, "추천" 뱃지
  - 브랜드 정체성 강조
  - 신뢰감과 안정감 전달

- **Cold Lead (탐색)**: Light Sage 계열, 뱃지 없음
  - 부담 없는 정보 탐색 유도
  - 밝고 깨끗한 배경으로 접근성 강조

### 레이아웃
- **모바일**: 2x4 그리드 (최적의 스크롤 경험)
- **데스크톱**: 4x2 그리드 (한눈에 보이는 구조)
- **카드 크기**: 최소 140px 높이 (터치 영역 44px 이상 보장)

### 애니메이션
- **진입**: 순차적 stagger (80ms 딜레이)
- **호버**: -4px 위로 이동, 그림자 증가
- **이모지**: scale(1.1) on hover
- **화살표**: 호버 시 우측으로 이동

## 사용법

### 기본 사용

```tsx
import ConversionFunnel from '@/components/features/ConversionFunnel';

export default function Page() {
  return (
    <ConversionFunnel />
  );
}
```

### 커스텀 제목

```tsx
<ConversionFunnel
  title="이혼, 혼자 고민하지 마세요"
  subtitle="더율이 함께합니다"
/>
```

### 추가 클래스

```tsx
<ConversionFunnel
  className="bg-sage-50"
/>
```

## 파일 구조

```
ConversionFunnel/
├── index.tsx              # 메인 컴포넌트
├── FunnelCard.tsx         # 개별 카드 컴포넌트
├── funnelConfig.ts        # 데이터 및 색상 설정
├── types.ts               # TypeScript 타입 정의
└── README.md              # 문서
```

## 퍼널 항목 (8개)

| ID | 이모지 | 제목 | Lead Type | 링크 |
|---|---|---|---|---|
| free-diagnosis | ⏰ | 10분 무료 진단받기 | Hot | /consultation#process |
| pricing | 💰 | 수임료 미리 확인하기 | Warm | /consultation#pricing |
| success-cases | 🏆 | 나와 같은 사례 보기 | Cold | /cases |
| preparation | 📋 | 준비서류 체크리스트 | Warm | /consultation#preparation |
| channels | 💬 | 내게 맞는 상담방법 | Warm | /consultation#channels |
| faq | ❓ | 자주 묻는 질문 | Cold | /faq |
| team | 👩‍⚖️ | 담당 변호사 미리보기 | Warm | /team |
| testimonials | ⭐ | 실제 의뢰인 후기 | Cold | /consultation#testimonials |

## 색상 상세

### Hot Lead (Coral)
```css
bgGradient: from-coral-400 to-coral-500
border: border-coral-600
badge: bg-coral-100 text-coral-800
shadow: 0 2px 8px rgba(239, 126, 144, 0.25)
```

### Warm Lead (Sage Green)
```css
bgGradient: from-sage-500 to-sage-600
border: border-sage-700
badge: bg-sage-100 text-sage-800
shadow: 0 2px 8px rgba(109, 181, 164, 0.2)
```

### Cold Lead (Light Sage)
```css
bgGradient: from-sage-50 to-sage-100
border: border-sage-200
textColor: text-gray-900
shadow: 0 2px 8px rgba(109, 181, 164, 0.08)
```

## 접근성

- **ARIA Labels**: 각 카드에 명확한 aria-label
- **Focus Visible**: 키보드 네비게이션 지원
- **Touch Target**: 최소 44x44px 보장
- **Color Contrast**: WCAG 2.1 AA 준수

## 성능 최적화

- **Intersection Observer**: 스크롤 시에만 애니메이션 실행
- **CSS Transform**: GPU 가속 활용
- **Lazy Loading**: 뷰포트 진입 시 활성화

## 커스터마이징

### 항목 수정

`funnelConfig.ts`에서 `funnelItems` 배열을 수정:

```typescript
export const funnelItems: FunnelItem[] = [
  {
    id: 'custom-item',
    emoji: '🎯',
    title: '커스텀 제목',
    description: '설명 텍스트',
    link: '/custom-link',
    leadType: 'warm'
  },
  // ...
];
```

### 색상 수정

`funnelConfig.ts`에서 `leadTypeConfig` 수정:

```typescript
export const leadTypeConfig: Record<string, LeadTypeConfig> = {
  hot: {
    bgGradient: 'from-red-400 to-red-500',
    // ...
  }
};
```

## 모바일 스크린샷 설명

**모바일 레이아웃 (375px)**:
- 2열 그리드
- 카드 간격: 12px
- 터치 영역: 충분한 패딩
- 이모지: 48px
- 제목: 14px (bold)
- 설명: 12px
- Hot/Warm 뱃지: 우측 상단

## 데스크톱 스크린샷 설명

**데스크톱 레이아웃 (1200px)**:
- 4열 그리드
- 카드 간격: 16px
- 호버 효과: -4px 위로, 그림자 증가
- 이모지 확대: scale(1.1)
- 화살표 이동: translateX(4px)

## 브랜드 정체성

이 컴포넌트는 법무법인 더율의 핵심 가치를 반영합니다:

1. **접근성**: 어려운 법률 서비스를 쉽게
2. **투명성**: 모든 정보를 미리 확인 가능
3. **신뢰**: Sage Green으로 안정감 전달
4. **전문성**: 체계적인 상담 프로세스

## 주의사항

- `/consultation` 페이지가 먼저 완성되어야 모든 링크 작동
- 모바일에서 카드 높이는 자동 조절 (min-h-[140px])
- 애니메이션은 `prefers-reduced-motion` 대응
- 다크모드 미지원 (법률 서비스 특성상 라이트 테마 유지)

## 버전 히스토리

- **v1.0.0** (2025-11-24): 초기 릴리즈
  - 8개 퍼널 항목
  - Hot/Warm/Cold 리드 타입
  - Sage Green 브랜드 색상 적용
  - 모바일 우선 반응형 디자인
