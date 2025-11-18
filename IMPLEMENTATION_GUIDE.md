# 빠른 구현 가이드: 서비스 페이지 일관성 개선

## 30분 만에 할 수 있는 핵심 변경사항

### Step 1: 컴포넌트 임포트 추가 (1분)

각 페이지 상단에 추가:

```tsx
// Before
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';

// After
import PageLayout from '@/components/layouts/PageLayout';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABox, { CTAButton } from '@/components/ui/CTABox';
```

### Step 2: 섹션 헤더 교체 (각 5분)

#### 찾기 패턴:
```tsx
<div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    {title}
  </h2>
  <p className="text-gray-600">
    {subtitle}
  </p>
</div>
```

#### 교체 코드:
```tsx
<SectionHeader
  label="{영문 라벨}"
  title="{제목}"
  subtitle="{부제목}"
/>
```

---

## 전체 변경 사항 요약

### 위자료 방어 - 6곳 교체
### 재산분할 - 8곳 교체 (최우선)
### 양육권 싸움 - 7곳 교체

**총 예상 시간**: 2시간 13분
**예상 일관성 향상**: 60점 → 86점 (+43%)

---

📋 상세 가이드는 DESIGN_REVIEW_SERVICE_PAGES.md 참조
📊 요약은 DESIGN_REVIEW_SUMMARY.md 참조
