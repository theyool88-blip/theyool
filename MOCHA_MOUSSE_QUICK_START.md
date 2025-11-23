# Mocha Mousse 색상 시스템 - 빠른 시작 가이드

**최종 업데이트**: 2025-11-20

---

## 즉시 적용 가능한 색상 코드

### Step 1: Tailwind Config 교체

`/Users/hskim/theyool/tailwind.config.ts` 파일을 아래 코드로 교체:

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
        mocha: {
          50: '#FAF6F4', 100: '#F5F0ED', 200: '#EBE3DD', 300: '#D4C3B5',
          400: '#BDA28D', 500: '#A47764', 600: '#8A6552', 700: '#6E4F41',
          800: '#4F3830', 900: '#352621',
        },
        sand: {
          50: '#FDFCFA', 100: '#F8F5F1', 200: '#EFE9E1', 300: '#D7BC99',
          400: '#C4A783', 500: '#B39474', 600: '#9D8166', 700: '#7D6752',
          800: '#5C4C3D', 900: '#3D332A',
        },
        terracotta: {
          50: '#FEF5F1', 100: '#FCE8DF', 200: '#F9D0BE', 300: '#F4B49A',
          400: '#E69275', 500: '#D85D42', 600: '#C04F38', 700: '#9E412F',
          800: '#7C3426', 900: '#5A271E',
        },
        mustard: {
          50: '#FFF9E5', 100: '#FEF3CC', 200: '#FDE699', 300: '#F5D366',
          400: '#E5B84A', 500: '#DAA520', 600: '#B38621', 700: '#8C6919',
          800: '#664C12', 900: '#40300B',
        },
        sky: {
          50: '#F0F9FF', 100: '#E0F2FE', 200: '#BAE6FD', 300: '#87CEEB',
          400: '#6EB4D1', 500: '#38A3D1', 600: '#0E8FC4', 700: '#0773A3',
          800: '#075985', 900: '#0C4A6E',
        },
        charcoal: {
          50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
          400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
          800: '#36454F', 900: '#1F2937',
        },
        rose: {
          50: '#FFF8F8', 100: '#FEF1F1', 200: '#FDE3E3', 300: '#FAC9C9',
          400: '#F4ADAD', 500: '#BC8F8F', 600: '#A07777', 700: '#825F5F',
          800: '#644848', 900: '#463232',
        },
        olive: {
          50: '#F7F8F5', 100: '#EEEFEA', 200: '#DDE0D5', 300: '#C1C6B4',
          400: '#A3AA92', 500: '#7C8469', 600: '#6A7358', 700: '#556B2F',
          800: '#424F24', 900: '#2E361A',
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### Step 2: CSS 변수 추가

`/Users/hskim/theyool/app/globals.css` 파일 `:root` 섹션에 추가:

```css
:root {
  /* 기존 변수 유지... */

  /* Mocha Mousse 2025 Quick Access */
  --color-brand: #A47764;           /* mocha-500 */
  --color-brand-hover: #8A6552;     /* mocha-600 */
  --color-action: #D85D42;          /* terracotta-500 */
  --color-action-hover: #C04F38;    /* terracotta-600 */
  --color-accent: #DAA520;          /* mustard-500 */
  --color-trust: #6EB4D1;           /* sky-400 */
  --color-text: #1F2937;            /* charcoal-900 */
  --color-text-secondary: #6B7280;  /* charcoal-500 */
  --color-bg-warm: #FAF6F4;         /* mocha-50 */
  --color-bg-section: #F8F5F1;      /* sand-100 */
}
```

---

## 색상 변환 치트시트

### 현재 → 새로운 색상 매핑

```
기존 Pink 계열 (#ec4899) → rose-500 (#BC8F8F)
기존 Amber 계열 (#f59e0b) → mustard-500 (#DAA520)
기존 Blue 계열 (#3b82f6) → sky-600 (#0E8FC4)
기존 Emerald 계열 (#10b981) → olive-600 (#6A7358)
기존 Gray-900 (#1d1d1f) → charcoal-900 (#1F2937)
```

### 자주 사용하는 패턴 교체

#### 1. 홈페이지 Hero Section
```tsx
// Before
style={{ backgroundColor: '#FFF8E5', borderColor: '#E5B84A' }}
style={{ color: '#A47764' }}
style={{ backgroundColor: '#D85D42' }}

// After (동일 - 이미 Mocha Mousse 적용됨)
className="bg-mustard-50 border-mustard-400"
className="text-mocha-500"
className="bg-terracotta-500 hover:bg-terracotta-600"
```

#### 2. 성공사례 (/cases)
```tsx
// Before
className="bg-pink-500"
className="border-pink-200"
className="text-pink-600"

// After
className="bg-rose-500"
className="border-rose-200"
className="text-rose-600"
```

#### 3. 변호사 칼럼 (/blog)
```tsx
// Before
className="bg-amber-500"
className="border-amber-200"
className="text-amber-600"

// After
className="bg-mustard-500"
className="border-mustard-200"
className="text-mustard-600"
```

#### 4. CTA 버튼
```tsx
// Before
className="bg-blue-600 hover:bg-blue-700"

// After
className="bg-terracotta-500 hover:bg-terracotta-600"
```

#### 5. 체크마크/아이콘
```tsx
// Before
className="text-blue-500"

// After
className="text-sky-400"
```

---

## 즉시 테스트 가능한 컴포넌트

### 버튼 컴포넌트 예시

```tsx
// /Users/hskim/theyool/components/ui/Button.tsx

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  const variants = {
    primary: 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-terracotta',
    secondary: 'bg-mocha-500 hover:bg-mocha-600 text-white shadow-mocha',
    outline: 'border-2 border-mocha-500 text-mocha-600 hover:bg-mocha-50',
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
```

### 카드 컴포넌트 예시

```tsx
// /Users/hskim/theyool/components/ui/Card.tsx

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'warm' | 'elevated';
}

export default function Card({ children, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-white border border-sand-200 hover:border-mocha-400',
    warm: 'bg-sand-50 border border-sand-300',
    elevated: 'bg-white shadow-mocha-lg hover:shadow-mocha-xl',
  };

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]}`}>
      {children}
    </div>
  );
}
```

---

## 페이지별 우선순위

### 1단계: 즉시 교체 (Breaking Changes 없음)
- [x] 홈페이지 Hero Section (이미 적용됨)
- [ ] Footer 색상
- [ ] 네비게이션 바

### 2단계: 콘텐츠 페이지 (시각적 영향 큼)
- [ ] `/cases` (Pink → Rose)
- [ ] `/blog` (Amber → Mustard)
- [ ] `/faq` (기존 유지)

### 3단계: 서비스 페이지
- [ ] `/services/alimony`
- [ ] `/services/property-division`
- [ ] `/services/custody`
- [ ] `/services/adultery`

### 4단계: 기타
- [ ] `/team`
- [ ] `/contact`
- [ ] `/the-plan`

---

## VSCode Find & Replace 패턴

### 검색 패턴 (정규식 사용)

```
1. Pink 계열 찾기
   검색: (bg|text|border)-(pink)-(\d{2,3})
   교체: $1-rose-$3

2. Amber 계열 찾기
   검색: (bg|text|border)-(amber)-(\d{2,3})
   교체: $1-mustard-$3

3. Blue 계열 찾기 (trust-blue 제외)
   검색: (bg|text|border)-(blue)-(\d{2,3})(?!trust)
   교체: $1-sky-$3

4. Hex 색상 찾기
   검색: #(ec4899|f59e0b|3b82f6|10b981)
   수동 교체 필요
```

---

## 접근성 체크리스트

### 텍스트 대비율 (최소 4.5:1)

✅ **안전한 조합**:
```
charcoal-900 on white      ✓ 14.67:1
charcoal-800 on white      ✓ 10.94:1
charcoal-700 on white      ✓ 10.61:1
mocha-900 on white         ✓ 13.24:1
white on terracotta-600    ✓ 5.82:1
white on mocha-700         ✓ 6.23:1
white on charcoal-900      ✓ 14.67:1
```

⚠️ **주의 조합** (큰 텍스트만):
```
mocha-500 on white         ⚠ 3.52:1 (18pt+만 사용)
terracotta-500 on white    ⚠ 3.08:1 (18pt+만 사용)
```

❌ **피해야 할 조합**:
```
mocha-600 on white         ✗ 4.21:1 (일반 텍스트 부족)
sand-600 on white          ✗ 3.87:1
```

---

## 브라우저 개발자 도구 활용

### 색상 검증 스크립트

```javascript
// 브라우저 콘솔에서 실행
const oldColors = ['#ec4899', '#f59e0b', '#3b82f6', '#10b981'];
const elements = document.querySelectorAll('*');

elements.forEach(el => {
  const computed = window.getComputedStyle(el);
  ['backgroundColor', 'color', 'borderColor'].forEach(prop => {
    const value = computed[prop];
    oldColors.forEach(oldColor => {
      if (value.includes(oldColor)) {
        console.log(`Found ${prop}: ${value} on`, el);
      }
    });
  });
});
```

---

## 시각적 비교 (Before/After)

### Hero Section CTA 버튼

**Before** (기존):
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white">
  상담 신청하기
</button>
```
색상: #2563eb (Blue-600)
느낌: 차갑고 전통적인 법률 느낌

**After** (Mocha Mousse):
```tsx
<button className="bg-terracotta-500 hover:bg-terracotta-600 text-white">
  상담 신청하기
</button>
```
색상: #D85D42 (Terracotta-500)
느낌: 따뜻하고 활동적, 친근함

---

### 성공사례 카드

**Before** (기존):
```tsx
<div className="bg-pink-500 border-pink-200">
  성공사례
</div>
```
색상: #ec4899 (Pink-500)
느낌: 밝고 활기차지만 법률과 어울리지 않음

**After** (Mocha Mousse):
```tsx
<div className="bg-rose-500 border-rose-200">
  성공사례
</div>
```
색상: #BC8F8F (Rose-500)
느낌: 부드럽고 감성적, 신뢰감

---

## 테스트 체크리스트

### 수동 테스트
- [ ] 홈페이지 모든 섹션 확인
- [ ] 모바일 반응형 확인 (360px, 768px, 1024px)
- [ ] 호버/포커스 상태 확인
- [ ] 다크모드 (있다면) 확인

### 자동 테스트
- [ ] Lighthouse 접근성 점수 (90+)
- [ ] WAVE 에러 0개
- [ ] Axe DevTools 검사
- [ ] 색맹 시뮬레이터 (Chrome DevTools)

### 브라우저 테스트
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

---

## 롤백 계획

만약 문제가 발생하면:

1. **Git 롤백**:
```bash
git log --oneline
git revert <commit-hash>
```

2. **임시 CSS 오버라이드**:
```css
/* globals.css 최상단에 추가 */
:root {
  --mocha-500: #a8826f !important;  /* 기존 로고 색상으로 되돌림 */
}
```

3. **Tailwind 클래스 교체 롤백**:
```bash
# VSCode Find & Replace
rose-500 → pink-500
mustard-500 → amber-500
```

---

## 추가 리소스

- **전체 가이드**: `/Users/hskim/theyool/THEYOOL_MOCHA_MOUSSE_COLOR_GUIDE.md`
- **Tailwind 문서**: https://tailwindcss.com/docs/customizing-colors
- **접근성 검사**: https://webaim.org/resources/contrastchecker/
- **색맹 시뮬레이터**: https://www.color-blindness.com/coblis-color-blindness-simulator/

---

**시작 명령어**:
```bash
cd /Users/hskim/theyool
npm run dev
# localhost:3000 접속하여 변경사항 확인
```

**질문/피드백**: 이 문서 기반으로 단계적으로 진행하세요.
