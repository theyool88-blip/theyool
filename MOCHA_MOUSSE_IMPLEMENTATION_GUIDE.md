# Mocha Mousse 구현 가이드

**빠른 시작 가이드**: 새 색상 팔레트를 즉시 적용하는 방법

---

## 1. 빠른 비교: 기존 vs 새 팔레트

### 현재 사용 중 (Rose Gold)
```
로고 메인: #a8826f (theyool-rose-500)
보조 색상: 블루, 핑크, 앰버 (각각 독립적)
문제점: Pantone 2025 트렌드 미반영, 일관성 부족
```

### 새 팔레트 (Mocha Mousse)
```
로고 메인: #A47764 (mocha-500) - Pantone 17-1230
통합 시스템: Mocha + Trust Blue + Copper + Sage + Rose
장점: 2025 트렌드, 통일된 브랜드 경험, 접근성 우수
```

---

## 2. 즉시 적용 가능한 변경 사항

### Step 1: Tailwind Config 업데이트

**파일**: `/Users/hskim/theyool/tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === 새 팔레트: Mocha Mousse (Pantone 2025) ===
        mocha: {
          50: '#FAF7F5',
          100: '#F4EDE8',
          200: '#E9DBCE',
          300: '#D4C3B5',
          400: '#BDA28D',
          500: '#A47764', // Pantone 17-1230
          600: '#8D6652',
          700: '#7D5E4D',
          800: '#5F4939',
          900: '#453426',
        },
        trust: {
          50: '#F0F6F9',
          100: '#E0EEF4',
          200: '#C1DCE9',
          300: '#92C3D9',
          400: '#6CA8C4',
          500: '#6490A4', // Complementary to Mocha
          600: '#527A8A',
          700: '#3F5F6F',
          800: '#2D4550',
          900: '#1C2E37',
        },
        copper: {
          50: '#FFF8F3',
          100: '#FFEEE0',
          200: '#FFDDC1',
          300: '#FFC896',
          400: '#FFB06B',
          500: '#FF9A4D', // CTA primary
          600: '#E08038',
          700: '#C26B28',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E8F0EC',
          200: '#D1E1D9',
          300: '#A8C9B8',
          400: '#7FB197',
          500: '#5A9976',
          600: '#4A8062',
          700: '#3A6850',
        },
        dustyRose: {
          50: '#FDF6F5',
          100: '#FAEBE9',
          200: '#F5D7D3',
          300: '#E8B5AD',
          400: '#DB9487',
          500: '#CE7361',
          600: '#B55E4D',
          700: '#9D4A3A',
        },
        cream: {
          50: '#FFFCF9',
          100: '#FEF9F3',
          200: '#FDF2E6',
        },

        // === 기존 팔레트 유지 (하위 호환성) ===
        theyool: {
          rose: {
            50: '#faf6f4',
            100: '#f5f0ed',
            200: '#ebe3dd',
            300: '#d4c3b5',
            400: '#bda28d',
            500: '#a8826f', // 기존 로고 색상
            600: '#967360',
            700: '#7d5e4d',
            800: '#5f4939',
            900: '#453426',
          },
          cream: {
            50: '#fffcf9',
            100: '#fef9f3',
            200: '#fdf2e6',
            300: '#fbebd9',
          },
          gray: {
            50: '#fafafa',
            100: '#f5f5f7',
            200: '#e8e8ed',
            300: '#d2d2d7',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#6e6e73',
            700: '#515154',
            800: '#424245',
            900: '#1d1d1f',
          },
        },
        brand: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          purple: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
          },
        },
      },
      backgroundImage: {
        // 새 그라데이션
        'gradient-mocha': 'linear-gradient(135deg, #FAF7F5 0%, #F4EDE8 50%, #E9DBCE 100%)',
        'gradient-trust': 'linear-gradient(135deg, #F0F6F9 0%, #E0EEF4 50%, #C1DCE9 100%)',
        'gradient-hero': 'linear-gradient(180deg, #FFFCF9 0%, #F4EDE8 100%)',

        // 기존 그라데이션 유지
        'section-light': 'linear-gradient(to bottom, white, rgba(239, 246, 255, 0.15), white)',
        'section-medium': 'linear-gradient(to bottom, rgba(239, 246, 255, 0.3), white)',
        'section-dark': 'linear-gradient(to bottom right, #111827, #1f2937)',
        'section-blue-amber': 'linear-gradient(to bottom, rgba(239, 246, 255, 0.2), white, rgba(254, 243, 199, 0.1))',
      },
      boxShadow: {
        'mocha': '0 4px 16px rgba(164, 119, 100, 0.12)',
        'mocha-lg': '0 12px 32px rgba(164, 119, 100, 0.16)',
        'trust': '0 4px 16px rgba(100, 144, 164, 0.12)',
        'copper': '0 4px 16px rgba(255, 154, 77, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Step 2: globals.css에 변수 추가

**파일**: `/Users/hskim/theyool/app/globals.css`

기존 `:root` 블록 아래에 추가:

```css
:root {
  /* 기존 변수들... */

  /* ===== Mocha Mousse System (Pantone 2025) ===== */
  --mocha-50: #FAF7F5;
  --mocha-100: #F4EDE8;
  --mocha-200: #E9DBCE;
  --mocha-300: #D4C3B5;
  --mocha-400: #BDA28D;
  --mocha-500: #A47764;
  --mocha-600: #8D6652;
  --mocha-700: #7D5E4D;
  --mocha-800: #5F4939;
  --mocha-900: #453426;

  --trust-50: #F0F6F9;
  --trust-100: #E0EEF4;
  --trust-200: #C1DCE9;
  --trust-500: #6490A4;
  --trust-600: #527A8A;
  --trust-800: #2D4550;

  --copper-50: #FFF8F3;
  --copper-100: #FFEEE0;
  --copper-500: #FF9A4D;
  --copper-600: #E08038;

  /* Quick Access Updates */
  --color-primary: var(--mocha-500);
  --color-primary-hover: var(--mocha-600);
  --color-accent: var(--copper-500);
  --color-accent-hover: var(--copper-600);
  --color-secondary: var(--trust-500);
}
```

---

## 3. 컴포넌트별 마이그레이션 가이드

### 3.1 ConsultationButton (상담 신청 버튼)

**현재 코드**:
```tsx
<button className="bg-theyool-rose-500 hover:bg-theyool-rose-600 text-white">
  상담 신청
</button>
```

**새 코드**:
```tsx
<button className="bg-copper-500 hover:bg-copper-600 text-white shadow-copper">
  상담 신청
</button>
```

**이유**: CTA 버튼은 Copper (따뜻한 오렌지)를 사용하여 긍정적 액션 유도

### 3.2 PageLayout (헤더 로고)

**현재 코드**:
```tsx
<div className="text-theyool-rose-500 font-bold text-2xl">
  더율
</div>
```

**새 코드**:
```tsx
<div className="text-mocha-500 font-bold text-2xl">
  더율
</div>
```

**이유**: 로고는 Mocha 500 사용 (Pantone 공식 색상)

### 3.3 섹션 배경

**현재 코드**:
```tsx
<section className="bg-theyool-cream-50 py-20">
```

**새 코드**:
```tsx
<section className="bg-cream-50 py-20">
```

또는:

```tsx
<section className="bg-mocha-100 py-20"> {/* 더 따뜻한 톤 */}
```

### 3.4 카드 컴포넌트

**현재 코드**:
```tsx
<div className="bg-white border border-gray-200 hover:border-theyool-rose-500">
```

**새 코드**:
```tsx
<div className="bg-white border border-mocha-200 hover:border-mocha-500 hover:shadow-mocha">
```

### 3.5 링크

**현재 코드**:
```tsx
<a className="text-theyool-rose-600 hover:text-theyool-rose-700">
```

**새 코드**:
```tsx
<a className="text-mocha-600 hover:text-mocha-700 underline">
```

---

## 4. 페이지별 적용 예시

### Homepage (/)

```tsx
// Hero Section
<section className="bg-gradient-hero py-32">
  <h1 className="text-gray-900 text-6xl font-bold">이겨놓고 설계하다</h1>
  <p className="text-gray-600 text-xl">법무법인 더율</p>
  <button className="bg-copper-500 hover:bg-copper-600 text-white px-8 py-4 rounded-xl shadow-copper">
    무료 상담 신청
  </button>
</section>

// Services Section
<section className="bg-mocha-50 py-20">
  <h2 className="text-mocha-800 text-4xl font-bold mb-12">전문 서비스</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white border border-mocha-200 hover:border-mocha-500 p-6 rounded-2xl">
      <h3 className="text-gray-900 text-2xl font-bold mb-3">위자료 청구</h3>
      <p className="text-gray-600">...</p>
    </div>
  </div>
</section>

// Trust Section
<section className="bg-trust-50 py-20">
  <h2 className="text-trust-800 text-4xl font-bold">The Plan</h2>
  <p className="text-gray-600">...</p>
</section>
```

### The Plan Page

```tsx
<section className="bg-gradient-trust py-20">
  <h1 className="text-trust-900 text-5xl font-bold">이겨놓고 설계하다</h1>

  <div className="bg-white border-2 border-trust-500 p-8 rounded-3xl shadow-trust">
    <h3 className="text-trust-700 text-2xl font-bold">6단계 프로세스</h3>
  </div>
</section>
```

### Service Pages (/services/*)

```tsx
// Hero
<section className="bg-gradient-mocha py-20">
  <h1 className="text-mocha-900 text-5xl font-bold">위자료 청구</h1>
</section>

// FAQ Section
<section className="bg-cream-50 py-20">
  <div className="bg-white border-l-4 border-copper-500 p-6">
    <h4 className="text-gray-900 font-bold">Q. 위자료는 얼마나 받을 수 있나요?</h4>
  </div>
</section>

// CTA
<div className="bg-copper-100 border-2 border-copper-500 p-8 rounded-2xl">
  <h3 className="text-copper-800 text-2xl font-bold">지금 상담 신청하세요</h3>
  <button className="bg-copper-500 hover:bg-copper-600 text-white">
    무료 상담
  </button>
</div>
```

---

## 5. 단계별 마이그레이션 플랜

### Week 1: 기반 작업
- [ ] `tailwind.config.ts` 업데이트
- [ ] `globals.css` 변수 추가
- [ ] 빌드 테스트 (에러 확인)
- [ ] Storybook/컴포넌트 카탈로그 업데이트 (있는 경우)

### Week 2: 핵심 컴포넌트
- [ ] `components/layouts/PageLayout.tsx` (헤더, 푸터)
- [ ] `components/features/ConsultationButton.tsx`
- [ ] `components/ui/MobileMenu.tsx`
- [ ] 기본 버튼/카드 컴포넌트

### Week 3: 주요 페이지
- [ ] `app/page.tsx` (홈페이지)
- [ ] `app/the-plan/ThePlanClient.tsx`
- [ ] `components/features/ThePlanHighlight.tsx`

### Week 4: 서비스 페이지
- [ ] `/services/alimony`
- [ ] `/services/property-division`
- [ ] `/services/custody`
- [ ] `/services/adultery`

### Week 5: 나머지 페이지 & QA
- [ ] `/cases` (성공사례)
- [ ] `/blog` (칼럼)
- [ ] `/faq` (이혼큐레이션)
- [ ] `/team` (구성원소개)
- [ ] 전체 페이지 시각적 QA
- [ ] 접근성 테스트
- [ ] 모바일 반응형 테스트

---

## 6. 품질 체크리스트

### 각 페이지 마이그레이션 후 확인 사항

**시각적 일관성**
- [ ] 배경색이 따뜻한 톤인가? (Mocha/Cream)
- [ ] CTA 버튼이 눈에 띄는가? (Copper)
- [ ] 브랜드 색상 (Mocha 500)이 적절히 사용되는가?
- [ ] 섹션 간 구분이 명확한가?

**접근성**
- [ ] 텍스트 대비율이 4.5:1 이상인가?
- [ ] 링크에 underline이 있는가?
- [ ] 버튼 텍스트가 명확한가? (18pt 이상)
- [ ] 색맹 사용자가 정보를 놓치지 않는가?

**모바일**
- [ ] 모바일에서 버튼이 충분히 큰가? (44x44px 이상)
- [ ] 텍스트가 읽기 쉬운가? (16px 이상)
- [ ] 터치 영역이 겹치지 않는가?

**브랜드 일관성**
- [ ] 로고와 조화로운가?
- [ ] 2025년 트렌드에 부합하는가?
- [ ] 법무법인의 전문성을 전달하는가?
- [ ] 따뜻하고 접근 가능한 느낌인가?

---

## 7. 테스트 방법

### A. 시각적 QA

1. **브라우저에서 확인**
   ```bash
   npm run dev
   # http://localhost:3000 접속
   ```

2. **체크리스트**
   - [ ] Chrome (데스크톱)
   - [ ] Safari (Mac)
   - [ ] Mobile Safari (iPhone)
   - [ ] Chrome (Android)

### B. 접근성 테스트

1. **WebAIM Contrast Checker**
   - URL: https://webaim.org/resources/contrastchecker/
   - 텍스트와 배경 색상 입력
   - WCAG AA 통과 확인

2. **Chrome DevTools**
   ```
   F12 → Lighthouse → Accessibility 탭
   점수 90점 이상 목표
   ```

### C. 색맹 시뮬레이션

1. **Chrome Extension: Colorblindly**
   - 설치: https://chrome.google.com/webstore/detail/colorblindly
   - Protanopia (적색맹) 모드 테스트
   - Deuteranopia (녹색맹) 모드 테스트

---

## 8. 자주 묻는 질문 (FAQ)

### Q1: 기존 theyool-rose-500과 mocha-500의 차이는?
**A**: 거의 유사하지만, mocha-500 (#A47764)이 Pantone 공식 색상이며, 2025년 트렌드를 반영합니다. 약간 더 따뜻한 톤입니다.

### Q2: 모든 페이지를 한 번에 바꿔야 하나요?
**A**: 아니오. 단계적으로 마이그레이션하세요. Tailwind config에 두 색상을 모두 유지하면 호환성이 보장됩니다.

### Q3: CTA 버튼은 왜 Copper를 사용하나요?
**A**: 심리학적으로 따뜻한 오렌지(Copper)는 긍정적 액션을 유도합니다. Mocha보다 대비가 강해 클릭률이 높습니다.

### Q4: 접근성 테스트는 어떻게 하나요?
**A**: WebAIM Contrast Checker를 사용하세요. 본문 텍스트는 4.5:1, 큰 텍스트는 3:1 이상이면 합격입니다.

### Q5: 다크모드는 지원하나요?
**A**: 현재는 라이트 모드만 지원합니다. 다크모드는 Phase 2에서 Mocha 900 기반으로 개발 예정입니다.

---

## 9. 롤백 계획

만약 새 색상이 마음에 들지 않는다면:

1. **Git으로 되돌리기**
   ```bash
   git checkout HEAD -- tailwind.config.ts
   git checkout HEAD -- app/globals.css
   ```

2. **특정 컴포넌트만 되돌리기**
   ```bash
   git checkout HEAD -- components/features/ConsultationButton.tsx
   ```

3. **하이브리드 사용**
   - 기존 색상과 새 색상을 혼용 (비추천)
   - 예: CTA만 Copper 사용, 나머지는 기존 유지

---

## 10. 지원 및 피드백

**문의 사항**
- 색상 조합이 이상한가요? → `THEYOOL_MOCHA_MOUSSE_PALETTE.md` 참조
- 접근성 문제? → Section 4 "접근성 검증" 확인
- 구현 막힘? → Section 3 "컴포넌트별 마이그레이션" 참조

**피드백**
- 마이그레이션 완료 후 스크린샷 비교
- 전환율/이탈률 변화 추적
- 사용자 피드백 수집

---

**작성일**: 2025-11-20
**최종 업데이트**: 2025-11-20

이 가이드는 법무법인 더율의 Mocha Mousse 색상 팔레트 적용을 위한 실전 가이드입니다.
단계별로 천천히 진행하시고, 각 단계마다 테스트를 꼭 해주세요!
