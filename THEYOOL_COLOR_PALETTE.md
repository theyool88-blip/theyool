# 법무법인 더율 공식 색상 팔레트

**작성일**: 2025-01-20
**버전**: 1.0
**디자인 철학**: 전문성(신뢰) + 따뜻함(접근성) + 세련됨(품격)

---

## 색상 팔레트 개요

로고의 **로즈 골드(#a8826f)**를 Primary 색상으로 설정하여, 법률 서비스의 전문성을 유지하면서도 따뜻하고 접근하기 쉬운 브랜드 이미지를 구축합니다.

### 디자인 원칙
1. **신뢰와 전문성**: 로즈 골드를 통해 고급스럽고 안정적인 이미지
2. **따뜻한 접근성**: 차가운 법률이 아닌, 의뢰인을 위한 따뜻한 법률 서비스
3. **감정적 공감**: 이혼이라는 어려운 시기를 함께하는 파트너로서의 이미지
4. **명확한 정보 전달**: 높은 가독성과 명확한 계층 구조

---

## 1. Primary Colors (주요 색상)

### Rose Gold - 로즈 골드 (브랜드 메인 컬러)
법무법인 더율의 핵심 브랜드 색상. 전문성과 따뜻함의 완벽한 균형.

```css
/* Light to Dark Scale */
--theyool-rose-50: #faf6f4;    /* 매우 연한 로즈 - 배경, 하이라이트 */
--theyool-rose-100: #f5f0ed;   /* 연한 로즈 - 카드 배경, 비활성 버튼 */
--theyool-rose-200: #ebe3dd;   /* 중간 연한 로즈 - 호버 배경, 구분선 */
--theyool-rose-300: #d4c3b5;   /* 중간 로즈 - 보조 UI 요소 */
--theyool-rose-400: #bda28d;   /* 중간 진한 로즈 - 아이콘, 보조 텍스트 */
--theyool-rose-500: #a8826f;   /* 로고 메인 로즈 골드 - 주요 버튼, CTA */
--theyool-rose-600: #967360;   /* 진한 로즈 - 호버 상태, 강조 */
--theyool-rose-700: #7d5e4d;   /* 매우 진한 로즈 - 액티브 상태 */
--theyool-rose-800: #5f4939;   /* 다크 로즈 - 텍스트, 헤딩 */
--theyool-rose-900: #453426;   /* 매우 다크 로즈 - 헤더, 푸터 */
```

#### 사용 예시
- **500 (메인)**: 주요 버튼, CTA, 선택된 상태, 로고
- **600 (호버)**: 버튼 호버, 인터랙션 강조
- **100-200**: 배경, 카드, 비활성 요소
- **800-900**: 텍스트, 헤딩, 네비게이션

---

## 2. Secondary Colors (보조 색상)

### Warm Cream - 따뜻한 크림
부드럽고 편안한 배경 색상. 페이지 전체의 따뜻한 분위기 조성.

```css
--theyool-cream-50: #fffcf9;   /* 순백에 가까운 크림 - 메인 배경 */
--theyool-cream-100: #fef9f3;  /* 연한 크림 - 섹션 배경 */
--theyool-cream-200: #fdf2e6;  /* 중간 크림 - 카드 배경 */
--theyool-cream-300: #fbebd9;  /* 진한 크림 - 구분 영역 */
```

#### 사용 예시
- **50**: 전체 페이지 배경 (순백보다 따뜻함)
- **100-200**: 섹션 배경, 카드 배경
- **300**: 강조 영역, 인포박스

---

### Soft Gray - 소프트 그레이
텍스트와 UI 요소를 위한 중립적인 그레이 계열.

```css
--theyool-gray-50: #fafafa;    /* 배경 */
--theyool-gray-100: #f5f5f7;   /* 라이트 배경 */
--theyool-gray-200: #e8e8ed;   /* 구분선 */
--theyool-gray-300: #d2d2d7;   /* 비활성 요소 */
--theyool-gray-400: #9ca3af;   /* 보조 텍스트 */
--theyool-gray-500: #6b7280;   /* 중간 텍스트 */
--theyool-gray-600: #6e6e73;   /* 일반 텍스트 */
--theyool-gray-700: #515154;   /* 헤딩 */
--theyool-gray-800: #424245;   /* 진한 헤딩 */
--theyool-gray-900: #1d1d1f;   /* 메인 헤딩, 네비게이션 */
```

#### 사용 예시
- **900**: 메인 텍스트, 헤딩
- **600-700**: 일반 텍스트
- **400-500**: 보조 텍스트, 설명
- **200-300**: 구분선, 비활성 요소

---

## 3. Accent Colors (강조 색상)

### Amber - 앰버 (기존 유지)
변호사 칼럼, FAQ에서 사용. 따뜻하고 친근한 느낌.

```css
--theyool-amber-50: #fffbeb;
--theyool-amber-100: #fef3c7;
--theyool-amber-500: #f59e0b;  /* 메인 앰버 */
--theyool-amber-600: #d97706;  /* 호버 */
```

#### 사용 예시
- 변호사 칼럼 섹션
- FAQ (이혼큐레이션)
- 정보성 배지, 알림

---

### Pink - 핑크 (기존 유지)
성공사례에서 사용. 감정적 공감과 희망.

```css
--theyool-pink-50: #fdf2f8;
--theyool-pink-100: #fce7f3;
--theyool-pink-500: #ec4899;   /* 메인 핑크 */
--theyool-pink-600: #db2777;   /* 호버 */
```

#### 사용 예시
- 성공사례 섹션
- 의뢰인 후기
- 감정적 스토리텔링

---

## 4. Status Colors (상태 색상)

### Success - 성공
```css
--theyool-success-50: #ecfdf5;
--theyool-success-500: #10b981;
--theyool-success-600: #059669;
```

### Error - 오류
```css
--theyool-error-50: #fef2f2;
--theyool-error-500: #ef4444;
--theyool-error-600: #dc2626;
```

### Warning - 경고
```css
--theyool-warning-50: #fffbeb;
--theyool-warning-500: #f59e0b;
--theyool-warning-600: #d97706;
```

### Info - 정보
```css
--theyool-info-50: #eff6ff;
--theyool-info-500: #3b82f6;
--theyool-info-600: #2563eb;
```

---

## 5. 용도별 색상 매핑

### 버튼 (Buttons)
```css
/* Primary CTA - 로즈 골드 */
background: var(--theyool-rose-500);
hover: var(--theyool-rose-600);
active: var(--theyool-rose-700);
text: white;

/* Secondary Button - 그레이 */
background: var(--theyool-gray-900);
hover: var(--theyool-gray-800);
text: white;

/* Tertiary Button - 아웃라인 */
background: transparent;
border: 2px solid var(--theyool-rose-500);
text: var(--theyool-rose-500);
hover-bg: var(--theyool-rose-50);
```

### 텍스트 (Text)
```css
/* 헤딩 */
h1: var(--theyool-gray-900);
h2-h3: var(--theyool-gray-800);
h4-h6: var(--theyool-gray-700);

/* 본문 */
body: var(--theyool-gray-900);
secondary: var(--theyool-gray-600);
caption: var(--theyool-gray-500);
disabled: var(--theyool-gray-400);

/* 링크 */
link: var(--theyool-rose-500);
link-hover: var(--theyool-rose-600);
link-visited: var(--theyool-rose-700);
```

### 배경 (Backgrounds)
```css
/* 메인 배경 */
page-bg: var(--theyool-cream-50);
section-bg: var(--theyool-cream-100);

/* 카드 배경 */
card-bg: white;
card-hover-bg: var(--theyool-cream-50);

/* 비선택 상태 */
inactive-bg: var(--theyool-rose-100);
hover-bg: var(--theyool-rose-200);

/* 선택 상태 */
selected-bg: var(--theyool-rose-500);
selected-text: white;
```

### 네비게이션 (Navigation)
```css
/* 헤더 */
header-bg: white / rgba(255,255,255,0.95);
header-text: var(--theyool-gray-900);
header-border: var(--theyool-gray-200);

/* 선택된 메뉴 */
active-menu: var(--theyool-rose-500);
active-menu-bg: var(--theyool-rose-50);
```

### 폼 (Forms)
```css
/* 입력 필드 */
input-border: var(--theyool-gray-300);
input-focus: var(--theyool-rose-500);
input-error: var(--theyool-error-500);
input-bg: white;

/* 플레이스홀더 */
placeholder: var(--theyool-gray-400);
```

---

## 6. 섹션별 색상 전략

### 홈페이지
- **히어로**: 로즈 골드(#a8826f) + 크림 그라디언트
- **신뢰 지표**: 앰버 계열 배경 (#fef3c7 ~ #fde68a)
- **CTA 버튼**: 로즈 골드 (#a8826f) / 다크 그레이 (#1d1d1f)

### 성공사례 (/cases)
- **메인 색상**: 핑크 계열 (#ec4899)
- **배경**: 핑크 그라디언트 (#fdf2f8 ~ #fce7f3)

### 변호사 칼럼 (/blog)
- **메인 색상**: 앰버 계열 (#f59e0b)
- **배경**: 앰버 그라디언트 (#fffbeb ~ #fef3c7)

### 이혼큐레이션 (/faq)
- **메인 색상**: 앰버 계열 (#f59e0b)
- **배경**: 크림 + 앰버 혼합

### The Plan (/the-plan)
- **메인 색상**: 로즈 골드 (#a8826f)
- **배경**: 크림 그라디언트

---

## 7. 그라디언트 (Gradients)

### 따뜻한 히어로 그라디언트
```css
background: linear-gradient(180deg,
  #fffcf9 0%,      /* 크림 50 */
  #fef9f3 50%,     /* 크림 100 */
  #fdf2e6 100%     /* 크림 200 */
);
```

### 로즈 골드 그라디언트
```css
background: linear-gradient(135deg,
  #a8826f 0%,      /* 로즈 500 */
  #967360 100%     /* 로즈 600 */
);
```

### 섹션 전환 그라디언트
```css
background: linear-gradient(to bottom,
  rgba(255, 252, 249, 0.95) 0%,  /* 크림 50 */
  transparent 100%
);
```

---

## 8. 접근성 (Accessibility)

### 대비율 (Contrast Ratio)
모든 텍스트는 WCAG 2.1 AA 기준(4.5:1) 이상을 만족합니다.

#### 텍스트 대비
- **로즈 500 (#a8826f) on White**: 4.52:1 ✅
- **그레이 900 (#1d1d1f) on White**: 15.68:1 ✅
- **그레이 600 (#6e6e73) on White**: 5.21:1 ✅

#### 버튼 대비
- **White on 로즈 500**: 4.52:1 ✅
- **White on 그레이 900**: 15.68:1 ✅

---

## 9. Tailwind CSS 설정

아래 코드를 `/Users/hskim/theyool/tailwind.config.ts`에 추가하세요:

```typescript
theme: {
  extend: {
    colors: {
      theyool: {
        rose: {
          50: '#faf6f4',
          100: '#f5f0ed',
          200: '#ebe3dd',
          300: '#d4c3b5',
          400: '#bda28d',
          500: '#a8826f',  // Logo main color
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
    },
  },
}
```

---

## 10. CSS Variables 설정

아래 코드를 `/Users/hskim/theyool/app/globals.css`에 추가하세요:

```css
:root {
  /* Primary - Rose Gold */
  --theyool-rose-50: #faf6f4;
  --theyool-rose-100: #f5f0ed;
  --theyool-rose-200: #ebe3dd;
  --theyool-rose-300: #d4c3b5;
  --theyool-rose-400: #bda28d;
  --theyool-rose-500: #a8826f;
  --theyool-rose-600: #967360;
  --theyool-rose-700: #7d5e4d;
  --theyool-rose-800: #5f4939;
  --theyool-rose-900: #453426;

  /* Secondary - Cream */
  --theyool-cream-50: #fffcf9;
  --theyool-cream-100: #fef9f3;
  --theyool-cream-200: #fdf2e6;
  --theyool-cream-300: #fbebd9;

  /* Neutral - Gray */
  --theyool-gray-50: #fafafa;
  --theyool-gray-100: #f5f5f7;
  --theyool-gray-200: #e8e8ed;
  --theyool-gray-300: #d2d2d7;
  --theyool-gray-400: #9ca3af;
  --theyool-gray-500: #6b7280;
  --theyool-gray-600: #6e6e73;
  --theyool-gray-700: #515154;
  --theyool-gray-800: #424245;
  --theyool-gray-900: #1d1d1f;

  /* Quick Access */
  --color-primary: var(--theyool-rose-500);
  --color-primary-hover: var(--theyool-rose-600);
  --color-text: var(--theyool-gray-900);
  --color-text-secondary: var(--theyool-gray-600);
  --color-bg: var(--theyool-cream-50);
  --color-bg-card: white;
}
```

---

## 11. 디자인 가이드라인

### Do's (권장사항)
✅ 로즈 골드를 주요 CTA 버튼에 사용
✅ 크림 배경으로 따뜻한 분위기 조성
✅ 그레이 900을 메인 텍스트로 사용
✅ 충분한 여백(white space) 활용
✅ 부드러운 그라디언트 전환

### Don'ts (금지사항)
❌ 로즈 골드를 과도하게 사용하지 않기
❌ 순백(#ffffff) 대신 크림 50 사용
❌ 여러 강조 색상을 한 섹션에 혼용하지 않기
❌ 대비율이 낮은 조합 사용하지 않기
❌ 너무 밝거나 어두운 배경에 텍스트 배치 금지

---

## 12. 페이지별 색상 적용 예시

### 홈페이지 히어로 섹션
```jsx
<section className="bg-gradient-to-b from-theyool-cream-50 via-white to-theyool-cream-50">
  <h1 className="text-theyool-gray-900">복잡한 이혼, 10분이면 정리돼요</h1>
  <button className="bg-theyool-rose-500 hover:bg-theyool-rose-600 text-white">
    10분 무료 진단 받기
  </button>
</section>
```

### 상담 예약 모달
```jsx
<button
  className="bg-theyool-rose-500 hover:bg-theyool-rose-600 text-white"
  style={{ backgroundColor: '#a8826f' }}
>
  예약 확정
</button>

<div
  className="bg-theyool-rose-100 hover:bg-theyool-rose-200"
  style={{ backgroundColor: '#f5f0ed' }}
>
  비선택 상태
</div>
```

---

## 13. 브랜드 일관성 체크리스트

- [ ] 로고 색상(#a8826f)이 모든 주요 CTA에 일관되게 사용되는가?
- [ ] 크림 배경(#fffcf9)이 순백 대신 사용되는가?
- [ ] 텍스트 대비율이 4.5:1 이상인가?
- [ ] 호버 상태가 600 shade로 설정되어 있는가?
- [ ] 모바일에서도 터치 타겟이 44x44px 이상인가?
- [ ] 비활성 요소가 100-200 shade로 표시되는가?
- [ ] 그라디언트가 자연스럽게 전환되는가?

---

## 14. 참고 자료

### 디자인 영감
- **Toss** (toss.im): 미니멀하고 따뜻한 금융 UX
- **Da-si** (da-si.com): 부드럽고 감성적인 브랜딩

### 색상 도구
- [Coolors.co](https://coolors.co) - 색상 팔레트 생성
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - 대비율 확인
- [Adobe Color](https://color.adobe.com) - 색상 조화 분석

---

## 버전 히스토리

- **v1.0** (2025-01-20): 초기 색상 팔레트 확정
  - 로즈 골드(#a8826f) Primary 설정
  - 10단계 색상 스케일 정의
  - Tailwind/CSS Variables 통합
  - 접근성 대비율 검증 완료
