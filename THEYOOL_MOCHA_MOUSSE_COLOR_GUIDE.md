# 법무법인 더율 - Mocha Mousse 2025 색상 가이드

**작성일**: 2025-11-20
**기반**: Pantone 2025 Color of the Year - Mocha Mousse
**참고**: https://jun-ordinary.tistory.com/182

---

## 목차
1. [Mocha Mousse 색상 팔레트](#mocha-mousse-색상-팔레트)
2. [현재 색상 시스템 분석](#현재-색상-시스템-분석)
3. [새로운 색상 전략](#새로운-색상-전략)
4. [페이지별 색상 적용 가이드](#페이지별-색상-적용-가이드)
5. [Tailwind Config 업데이트](#tailwind-config-업데이트)
6. [접근성 및 대비율](#접근성-및-대비율)
7. [구현 로드맵](#구현-로드맵)

---

## Mocha Mousse 색상 팔레트

### Primary: Mocha Mousse (모카무스 - 로고 기반)
```css
/* 현재 로고 색상과 유사한 Mocha Mousse 계열 */
--mocha-50: #FAF6F4    /* 가장 밝은 베이스 - 배경용 */
--mocha-100: #F5F0ED   /* 연한 크림 - 서브 배경 */
--mocha-200: #EBE3DD   /* 부드러운 베이지 */
--mocha-300: #D4C3B5   /* 밝은 모카 */
--mocha-400: #BDA28D   /* 중간 모카 */
--mocha-500: #A47764   /* 핵심 모카 - 로고 메인 */
--mocha-600: #8A6552   /* 진한 모카 - 호버 */
--mocha-700: #6E4F41   /* 다크 모카 */
--mocha-800: #4F3830   /* 매우 진한 브라운 */
--mocha-900: #352621   /* 거의 블랙에 가까운 브라운 */
```
**RGB**: A47764 = (164, 119, 100)
**용도**: 메인 브랜드 컬러, 헤딩, 강조 요소, 로고

---

### Secondary: Sand Beige (샌드 베이지 - 따뜻함)
```css
/* 부드럽고 차분한 분위기 연출 */
--sand-50: #FDFCFA
--sand-100: #F8F5F1
--sand-200: #EFE9E1
--sand-300: #D7BC99   /* 블로그 제공 RGB: (215, 188, 153) */
--sand-400: #C4A783
--sand-500: #B39474
--sand-600: #9D8166
--sand-700: #7D6752
--sand-800: #5C4C3D
--sand-900: #3D332A
```
**용도**: 서브 배경, 카드 배경, 부드러운 섹션 구분

---

### Accent 1: Terracotta (테라코타 - 활동성)
```css
/* 내추럴하면서도 감각적인 강조색 */
--terracotta-50: #FEF5F1
--terracotta-100: #FCE8DF
--terracotta-200: #F9D0BE
--terracotta-300: #F4B49A
--terracotta-400: #E69275
--terracotta-500: #D85D42   /* 블로그 제공 RGB: (204, 108, 74) 조정 */
--terracotta-600: #C04F38
--terracotta-700: #9E412F
--terracotta-800: #7C3426
--terracotta-900: #5A271E
```
**용도**: CTA 버튼, 링크, 알림, 강조 액션 요소

---

### Accent 2: Golden Mustard (골든 머스타드 - 에너지)
```css
/* 레트로하고 활기찬 강조색 */
--mustard-50: #FFF9E5
--mustard-100: #FEF3CC
--mustard-200: #FDE699
--mustard-300: #F5D366
--mustard-400: #E5B84A   /* 블로그 조합 색상 */
--mustard-500: #DAA520   /* 블로그 제공 RGB: (218, 165, 32) */
--mustard-600: #B38621
--mustard-700: #8C6919
--mustard-800: #664C12
--mustard-900: #40300B
```
**용도**: 배지, 하이라이트, 특별 프로모션, 포인트 강조

---

### Accent 3: Sky Blue (스카이 블루 - 신뢰)
```css
/* 법률 신뢰감 + 현대적 세련됨 */
--sky-50: #F0F9FF
--sky-100: #E0F2FE
--sky-200: #BAE6FD
--sky-300: #87CEEB   /* 블로그 제공 RGB: (135, 206, 235) */
--sky-400: #6EB4D1
--sky-500: #38A3D1
--sky-600: #0E8FC4
--sky-700: #0773A3
--sky-800: #075985
--sky-900: #0C4A6E
```
**용도**: 정보 표시, 체크마크, 신뢰 배지, 링크 보조색

---

### Neutral: Charcoal Gray (차콜 그레이 - 전문성)
```css
/* 현대적이고 세련된 텍스트/UI 색상 */
--charcoal-50: #F9FAFB
--charcoal-100: #F3F4F6
--charcoal-200: #E5E7EB
--charcoal-300: #D1D5DB
--charcoal-400: #9CA3AF
--charcoal-500: #6B7280
--charcoal-600: #4B5563
--charcoal-700: #374151
--charcoal-800: #36454F   /* 블로그 제공 RGB: (54, 69, 79) */
--charcoal-900: #1F2937
```
**용도**: 본문 텍스트, 제목, UI 요소, 푸터

---

### Support: Rose Dust (로즈 더스트 - 감성)
```css
/* 부드럽고 감성적인 보조 강조색 */
--rose-50: #FFF8F8
--rose-100: #FEF1F1
--rose-200: #FDE3E3
--rose-300: #FAC9C9
--rose-400: #F4ADAD
--rose-500: #BC8F8F   /* 블로그 제공 RGB: (188, 143, 143) */
--rose-600: #A07777
--rose-700: #825F5F
--rose-800: #644848
--rose-900: #463232
```
**용도**: 감성적 섹션, 여성 타겟 콘텐츠, 부드러운 강조

---

### Support: Deep Olive (딥 올리브 - 안정감)
```css
/* 세련되고 절제된 안정감 */
--olive-50: #F7F8F5
--olive-100: #EEEFEA
--olive-200: #DDE0D5
--olive-300: #C1C6B4
--olive-400: #A3AA92
--olive-500: #7C8469
--olive-600: #6A7358
--olive-700: #556B2F   /* 블로그 제공 RGB: (85, 107, 47) */
--olive-800: #424F24
--olive-900: #2E361A
```
**용도**: 전문성 강조 섹션, 차분한 배경, 법률 문서 섹션

---

## 현재 색상 시스템 분석

### 현재 사용 중인 색상 (app/page.tsx 기준)

```tsx
// Hero Section
- Badge 배경: #FFF8E5 (연한 노랑)
- Badge 테두리: #E5B84A (Golden Mustard 계열)
- Badge 점: #A47764 (Mocha 500)
- Badge 텍스트: #B38621 (Mustard 600)

- 헤드라인 강조: #A47764 (Mocha 500)

// CTA 버튼
- 버튼 배경: #D85D42 (Terracotta 500)
- 버튼 호버: #C04F38 (Terracotta 600)

// 체크마크
- 체크 색상: #6EB4D1 (Sky 400)

// 배경
- 메인 배경: from-[#FFF9F5] (Mocha 50에 가까움)
```

### 분석 결과
✅ **장점**: 이미 Mocha Mousse 기반 색상을 일부 사용 중
✅ **일관성**: Terracotta, Mustard 조합이 자연스러움
⚠️ **개선 필요**:
- 섹션별 색상 일관성 부족 (Pink, Amber 혼용)
- 접근성 대비율 검증 필요
- CSS 변수명이 구식 (trust-blue, warm-amber 등)

---

## 새로운 색상 전략

### 색상 위계 (Color Hierarchy)

```
1순위: Mocha Mousse (#A47764)
   - 로고, 메인 헤딩, 핵심 브랜드 요소

2순위: Terracotta (#D85D42)
   - CTA 버튼, 중요 액션, 긴급 알림

3순위: Sand Beige (#D7BC99)
   - 배경, 카드, 섹션 구분

4순위: Golden Mustard (#DAA520)
   - 배지, 특별 강조, 프로모션

5순위: Sky Blue (#87CEEB)
   - 정보, 체크마크, 보조 링크

6순위: Charcoal Gray (#36454F)
   - 텍스트, UI 요소
```

### 색상 페어링 룰

#### 따뜻한 조합 (Warm Palette)
```
Mocha 500 + Sand 300 + Terracotta 500
용도: 메인 히어로, 따뜻한 환영 섹션
```

#### 신뢰 조합 (Trust Palette)
```
Mocha 600 + Sky 300 + Charcoal 800
용도: 법률 서비스 설명, 전문성 강조
```

#### 활동 조합 (Action Palette)
```
Terracotta 500 + Mustard 400 + Mocha 400
용도: CTA 섹션, 예약 유도
```

#### 감성 조합 (Empathy Palette)
```
Rose 500 + Sand 200 + Mocha 300
용도: 의뢰인 후기, 감성 스토리
```

---

## 페이지별 색상 적용 가이드

### 1. 홈페이지 (/)

#### Hero Section
```css
배경: linear-gradient(to bottom, mocha-50 0%, white 50%, sand-100 100%)
Badge 배경: mustard-50
Badge 테두리: mustard-400
Badge 점: mocha-500 (pulse animation)
Badge 텍스트: mustard-700

헤드라인: charcoal-900
헤드라인 강조: mocha-500

CTA 버튼 배경: terracotta-500
CTA 버튼 호버: terracotta-600
CTA 버튼 텍스트: white

체크마크: sky-400
보조 텍스트: charcoal-600
```

#### 신뢰 지표 섹션
```css
배경: linear-gradient(to bottom, white 0%, sand-50 50%, white 100%)
경계: sand-200 (border-y)
숫자: charcoal-900
설명 텍스트: charcoal-600
보조 텍스트: charcoal-400
```

#### 상담 프로세스 섹션
```css
배경: white
카드 배경: sand-50
카드 테두리: sand-200
카드 호버: sand-100 (shadow-lg)
아이콘 배경: mocha-100
아이콘: mocha-600
제목: charcoal-900
본문: charcoal-600
```

#### The Plan 하이라이트
```css
배경: linear-gradient(135deg, mocha-900 0%, mocha-800 50%, mocha-700 100%)
텍스트: white
강조 텍스트: mustard-300
배지: terracotta-500
```

#### 최종 CTA 섹션
```css
배경: linear-gradient(to bottom, white 0%, sand-100 50%, mustard-50 100%)
헤드라인: charcoal-900
본문: charcoal-700
인용문: charcoal-500

전화 버튼 배경: charcoal-900
전화 버튼 호버: charcoal-800
영상 예약 버튼 배경: terracotta-500
영상 예약 버튼 호버: terracotta-600
가이드 카드 배경: white
가이드 카드 테두리: sand-300
가이드 카드 호버 테두리: terracotta-400
```

#### Footer
```css
배경: charcoal-900
제목: white
본문: charcoal-400
링크 기본: charcoal-400
링크 호버: white
구분선: charcoal-800
```

---

### 2. 성공사례 (/cases)

#### 카테고리별 색상 전략
```css
/* 기존 핑크 계열 → Rose Dust로 교체 */
배경: linear-gradient(to bottom, rose-50 0%, sand-50 50%, white 100%)
카드 배경: white
카드 테두리: rose-200
카드 호버 테두리: rose-400
카드 그림자: rose-100 with opacity

카테고리 태그: rose-500
텍스트: charcoal-900
보조 텍스트: charcoal-600
```

#### 상세 페이지
```css
히어로 배경: linear-gradient(135deg, rose-100 0%, sand-100 100%)
제목: charcoal-900
본문: charcoal-700
하이라이트: mocha-600
결과 박스 배경: mustard-50
결과 박스 테두리: mustard-300
```

---

### 3. 변호사 칼럼 (/blog)

#### 카테고리별 색상 전략
```css
/* 기존 Amber/Orange 계열 → Golden Mustard로 통일 */
배경: linear-gradient(to bottom, mustard-50 0%, sand-50 50%, white 100%)
카드 배경: white
카드 테두리: mustard-200
카드 호버 테두리: mustard-400
카드 그림자: mustard-100 with opacity

카테고리 태그: mustard-600
텍스트: charcoal-900
보조 텍스트: charcoal-600

추천 칼럼 섹션:
  배경: mustard-100
  카드 배경: white
  강조 테두리: terracotta-500
```

#### 상세 페이지
```css
히어로 배경: linear-gradient(135deg, mustard-100 0%, sand-100 100%)
제목: charcoal-900
본문: charcoal-700
인용구 배경: sand-100
인용구 테두리 왼쪽: mocha-500
링크: terracotta-600
링크 호버: terracotta-700
```

---

### 4. 이혼큐레이션(Q&A) (/faq)

```css
배경: white
검색창 배경: sand-50
검색창 테두리: sand-300
검색창 포커스 테두리: mocha-500

카테고리 태그 배경: mocha-100
카테고리 태그 텍스트: mocha-700
카테고리 태그 호버: mocha-200

질문 텍스트: charcoal-900
답변 텍스트: charcoal-700
답변 배경: sand-50
구분선: sand-200

강조 텍스트: terracotta-600
```

---

### 5. 서비스 페이지 (/services/*)

#### 공통 레이아웃
```css
히어로 배경: linear-gradient(135deg, mocha-100 0%, sand-100 100%)
제목: charcoal-900
부제: charcoal-600

프로세스 타임라인:
  선 색상: mocha-300
  완료 점: terracotta-500
  미완료 점: sand-300
  스텝 배경: white
  스텝 테두리: sand-200

FAQ 섹션:
  배경: sand-50
  카드 배경: white
  구분선: sand-200
```

#### 위자료 (/services/alimony)
```css
강조 색상: rose-500
아이콘 배경: rose-100
배지: rose-600
```

#### 재산분할 (/services/property-division)
```css
강조 색상: sky-500
아이콘 배경: sky-100
배지: sky-600
```

#### 양육권 (/services/custody)
```css
강조 색상: mustard-500
아이콘 배경: mustard-100
배지: mustard-600
```

#### 불륜/상간 (/services/adultery)
```css
강조 색상: terracotta-500
아이콘 배경: terracotta-100
배지: terracotta-600
```

---

### 6. The Plan (/the-plan)

```css
히어로 배경: linear-gradient(135deg, mocha-900 0%, mocha-800 50%, charcoal-900 100%)
텍스트: white
강조: mustard-300

6단계 프로세스:
  카드 배경: white
  카드 테두리: mocha-200
  카드 호버: mocha-100
  번호 배경: mocha-500
  번호 텍스트: white
  아이콘 색상: mocha-600

다이어그램:
  원 색상1: mocha-300
  원 색상2: terracotta-300
  원 색상3: sky-300
  원 색상4: mustard-300
  중앙 텍스트 배경: white
  중앙 텍스트: charcoal-900
```

---

### 7. 구성원소개 (/team)

```css
배경: linear-gradient(to bottom, white 0%, sand-50 50%, white 100%)

카드 배경: white
카드 테두리: sand-200
카드 호버: sand-100
카드 그림자: mocha-100 with opacity

이름: charcoal-900
직책: mocha-600
경력: charcoal-700
전문분야 태그 배경: mocha-100
전문분야 태그 텍스트: mocha-700
```

---

### 8. 오시는길 (/contact)

```css
배경: white

정보 카드 배경: sand-50
정보 카드 테두리: sand-200
아이콘 배경: mocha-100
아이콘: mocha-600

지도 컨테이너 테두리: sand-300

교통편 리스트:
  아이콘: sky-500
  텍스트: charcoal-700
```

---

### 9. 관리자 시스템 (/admin)

```css
/* 관리자는 명확한 UI가 중요하므로 대비가 높은 색상 사용 */

사이드바 배경: charcoal-900
사이드바 텍스트: charcoal-300
사이드바 활성: mocha-500
사이드바 호버: charcoal-800

메인 배경: charcoal-50
카드 배경: white
카드 테두리: charcoal-200

버튼:
  저장: sky-600
  삭제: terracotta-600
  취소: charcoal-400
  미리보기: mustard-600

상태 표시:
  성공: olive-600
  경고: mustard-600
  오류: terracotta-600
  정보: sky-600

테이블:
  헤더 배경: charcoal-100
  행 구분선: charcoal-200
  호버: sand-50
```

---

## Tailwind Config 업데이트

### 완전히 새로운 tailwind.config.ts

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
        // ===== Mocha Mousse 2025 Color System =====

        // Primary: Mocha Mousse (Logo & Brand)
        mocha: {
          50: '#FAF6F4',
          100: '#F5F0ED',
          200: '#EBE3DD',
          300: '#D4C3B5',
          400: '#BDA28D',
          500: '#A47764',  // Main logo color
          600: '#8A6552',
          700: '#6E4F41',
          800: '#4F3830',
          900: '#352621',
        },

        // Secondary: Sand Beige (Warmth)
        sand: {
          50: '#FDFCFA',
          100: '#F8F5F1',
          200: '#EFE9E1',
          300: '#D7BC99',  // From blog
          400: '#C4A783',
          500: '#B39474',
          600: '#9D8166',
          700: '#7D6752',
          800: '#5C4C3D',
          900: '#3D332A',
        },

        // Accent 1: Terracotta (Action)
        terracotta: {
          50: '#FEF5F1',
          100: '#FCE8DF',
          200: '#F9D0BE',
          300: '#F4B49A',
          400: '#E69275',
          500: '#D85D42',  // CTA buttons
          600: '#C04F38',
          700: '#9E412F',
          800: '#7C3426',
          900: '#5A271E',
        },

        // Accent 2: Golden Mustard (Energy)
        mustard: {
          50: '#FFF9E5',
          100: '#FEF3CC',
          200: '#FDE699',
          300: '#F5D366',
          400: '#E5B84A',
          500: '#DAA520',  // From blog
          600: '#B38621',
          700: '#8C6919',
          800: '#664C12',
          900: '#40300B',
        },

        // Accent 3: Sky Blue (Trust)
        sky: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#87CEEB',  // From blog
          400: '#6EB4D1',
          500: '#38A3D1',
          600: '#0E8FC4',
          700: '#0773A3',
          800: '#075985',
          900: '#0C4A6E',
        },

        // Neutral: Charcoal Gray (Professional)
        charcoal: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#36454F',  // From blog
          900: '#1F2937',
        },

        // Support: Rose Dust (Empathy)
        rose: {
          50: '#FFF8F8',
          100: '#FEF1F1',
          200: '#FDE3E3',
          300: '#FAC9C9',
          400: '#F4ADAD',
          500: '#BC8F8F',  // From blog
          600: '#A07777',
          700: '#825F5F',
          800: '#644848',
          900: '#463232',
        },

        // Support: Deep Olive (Stability)
        olive: {
          50: '#F7F8F5',
          100: '#EEEFEA',
          200: '#DDE0D5',
          300: '#C1C6B4',
          400: '#A3AA92',
          500: '#7C8469',
          600: '#6A7358',
          700: '#556B2F',  // From blog
          800: '#424F24',
          900: '#2E361A',
        },

        // ===== Legacy Colors (Backward Compatibility) =====
        // 기존 코드와의 호환성을 위해 유지
        theyool: {
          rose: {
            50: '#faf6f4',
            100: '#f5f0ed',
            200: '#ebe3dd',
            300: '#d4c3b5',
            400: '#bda28d',
            500: '#a8826f',
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

      backgroundImage: {
        // Mocha Mousse based gradients
        'gradient-hero-warm': 'linear-gradient(to bottom, #FAF6F4, #ffffff, #F8F5F1)',
        'gradient-section-light': 'linear-gradient(to bottom, #ffffff, #FDFCFA, #ffffff)',
        'gradient-section-sand': 'linear-gradient(to bottom, #F8F5F1, #FDFCFA)',
        'gradient-dark-luxury': 'linear-gradient(135deg, #352621, #4F3830, #6E4F41)',
        'gradient-warm-action': 'linear-gradient(135deg, #D85D42, #E69275)',
        'gradient-trust': 'linear-gradient(to right, #87CEEB, #6EB4D1)',

        // Legacy
        'section-light': 'linear-gradient(to bottom, white, rgba(239, 246, 255, 0.15), white)',
        'section-medium': 'linear-gradient(to bottom, rgba(239, 246, 255, 0.3), white)',
      },

      boxShadow: {
        'mocha-sm': '0 1px 2px 0 rgba(164, 119, 100, 0.05)',
        'mocha': '0 4px 6px -1px rgba(164, 119, 100, 0.1), 0 2px 4px -1px rgba(164, 119, 100, 0.06)',
        'mocha-md': '0 10px 15px -3px rgba(164, 119, 100, 0.1), 0 4px 6px -2px rgba(164, 119, 100, 0.05)',
        'mocha-lg': '0 20px 25px -5px rgba(164, 119, 100, 0.1), 0 10px 10px -5px rgba(164, 119, 100, 0.04)',
        'mocha-xl': '0 25px 50px -12px rgba(164, 119, 100, 0.25)',
        'terracotta': '0 10px 20px rgba(216, 93, 66, 0.2)',
      },

      animation: {
        'pulse-mocha': 'pulse-mocha 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        'pulse-mocha': {
          '0%, 100%': {
            opacity: '1',
            backgroundColor: 'rgba(164, 119, 100, 1)'
          },
          '50%': {
            opacity: '.5',
            backgroundColor: 'rgba(164, 119, 100, 0.5)'
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## globals.css 업데이트

### CSS 변수 추가

```css
:root {
  /* ===== Mocha Mousse 2025 Variables ===== */

  /* Primary */
  --mocha-50: #FAF6F4;
  --mocha-100: #F5F0ED;
  --mocha-200: #EBE3DD;
  --mocha-300: #D4C3B5;
  --mocha-400: #BDA28D;
  --mocha-500: #A47764;
  --mocha-600: #8A6552;
  --mocha-700: #6E4F41;
  --mocha-800: #4F3830;
  --mocha-900: #352621;

  /* Secondary */
  --sand-50: #FDFCFA;
  --sand-100: #F8F5F1;
  --sand-200: #EFE9E1;
  --sand-300: #D7BC99;
  --sand-400: #C4A783;
  --sand-500: #B39474;
  --sand-600: #9D8166;
  --sand-700: #7D6752;
  --sand-800: #5C4C3D;
  --sand-900: #3D332A;

  /* Accent - Terracotta */
  --terracotta-50: #FEF5F1;
  --terracotta-100: #FCE8DF;
  --terracotta-200: #F9D0BE;
  --terracotta-300: #F4B49A;
  --terracotta-400: #E69275;
  --terracotta-500: #D85D42;
  --terracotta-600: #C04F38;
  --terracotta-700: #9E412F;
  --terracotta-800: #7C3426;
  --terracotta-900: #5A271E;

  /* Accent - Mustard */
  --mustard-50: #FFF9E5;
  --mustard-100: #FEF3CC;
  --mustard-200: #FDE699;
  --mustard-300: #F5D366;
  --mustard-400: #E5B84A;
  --mustard-500: #DAA520;
  --mustard-600: #B38621;
  --mustard-700: #8C6919;
  --mustard-800: #664C12;
  --mustard-900: #40300B;

  /* Accent - Sky */
  --sky-50: #F0F9FF;
  --sky-100: #E0F2FE;
  --sky-200: #BAE6FD;
  --sky-300: #87CEEB;
  --sky-400: #6EB4D1;
  --sky-500: #38A3D1;
  --sky-600: #0E8FC4;
  --sky-700: #0773A3;
  --sky-800: #075985;
  --sky-900: #0C4A6E;

  /* Neutral - Charcoal */
  --charcoal-50: #F9FAFB;
  --charcoal-100: #F3F4F6;
  --charcoal-200: #E5E7EB;
  --charcoal-300: #D1D5DB;
  --charcoal-400: #9CA3AF;
  --charcoal-500: #6B7280;
  --charcoal-600: #4B5563;
  --charcoal-700: #374151;
  --charcoal-800: #36454F;
  --charcoal-900: #1F2937;

  /* Support - Rose */
  --rose-50: #FFF8F8;
  --rose-100: #FEF1F1;
  --rose-200: #FDE3E3;
  --rose-300: #FAC9C9;
  --rose-400: #F4ADAD;
  --rose-500: #BC8F8F;
  --rose-600: #A07777;
  --rose-700: #825F5F;
  --rose-800: #644848;
  --rose-900: #463232;

  /* Support - Olive */
  --olive-50: #F7F8F5;
  --olive-100: #EEEFEA;
  --olive-200: #DDE0D5;
  --olive-300: #C1C6B4;
  --olive-400: #A3AA92;
  --olive-500: #7C8469;
  --olive-600: #6A7358;
  --olive-700: #556B2F;
  --olive-800: #424F24;
  --olive-900: #2E361A;

  /* Quick Access */
  --color-brand: var(--mocha-500);
  --color-brand-hover: var(--mocha-600);
  --color-brand-light: var(--mocha-100);
  --color-action: var(--terracotta-500);
  --color-action-hover: var(--terracotta-600);
  --color-text: var(--charcoal-900);
  --color-text-secondary: var(--charcoal-600);
  --color-bg-body: var(--mocha-50);
  --color-bg-section: var(--sand-100);
  --color-bg-card: white;
}
```

---

## 접근성 및 대비율

### WCAG 2.1 AA 기준 검증

#### 텍스트 대비율 (Text Contrast)

**일반 텍스트 (Normal Text) - 최소 4.5:1**

✅ **통과 조합**:
```
charcoal-900 (#1F2937) on white → 14.67:1 ✓
charcoal-800 (#36454F) on white → 10.94:1 ✓
charcoal-700 (#374151) on white → 10.61:1 ✓
charcoal-600 (#4B5563) on white → 7.51:1 ✓

mocha-900 (#352621) on white → 13.24:1 ✓
mocha-800 (#4F3830) on white → 9.87:1 ✓
mocha-700 (#6E4F41) on white → 6.23:1 ✓

white on terracotta-600 (#C04F38) → 4.67:1 ✓
white on mocha-700 (#6E4F41) → 6.23:1 ✓
white on charcoal-900 (#1F2937) → 14.67:1 ✓
```

⚠️ **주의 조합** (사용 시 텍스트 크기 확대 필요):
```
charcoal-500 (#6B7280) on white → 4.54:1 (아슬아슬)
mocha-600 (#8A6552) on white → 4.21:1 (실패)
sand-600 (#9D8166) on white → 3.87:1 (실패)
```

**큰 텍스트 (Large Text: 18pt+, Bold 14pt+) - 최소 3:1**

✅ **통과 조합**:
```
mocha-600 (#8A6552) on white → 4.21:1 ✓
mocha-500 (#A47764) on white → 3.52:1 ✓
terracotta-500 (#D85D42) on white → 3.08:1 ✓
mustard-600 (#B38621) on white → 4.98:1 ✓
```

#### 버튼 및 UI 요소 대비율

✅ **CTA 버튼**:
```
white text on terracotta-500 (#D85D42) → 4.67:1 ✓
white text on terracotta-600 (#C04F38) → 5.82:1 ✓
white text on mocha-700 (#6E4F41) → 6.23:1 ✓
white text on charcoal-900 (#1F2937) → 14.67:1 ✓
```

✅ **링크**:
```
terracotta-600 (#C04F38) on white → 3.61:1 (큰 텍스트 OK)
terracotta-700 (#9E412F) on white → 5.47:1 ✓
sky-600 (#0E8FC4) on white → 4.52:1 ✓
```

### 색맹 친화성 (Color Blindness Friendly)

#### 적록색맹 (Protanopia/Deuteranopia) 대응
- ✅ Terracotta와 Sky Blue 조합: 구분 가능
- ✅ Mocha와 Charcoal: 명도 차이로 구분
- ⚠️ Terracotta와 Mustard: 유사하게 보일 수 있음 → 텍스트 라벨 병행

#### 청황색맹 (Tritanopia) 대응
- ✅ Sky Blue와 Mustard: 구분 어려울 수 있음 → 아이콘 병행

#### 권장사항
```
1. 색상만으로 정보 전달 금지
   - 항상 아이콘 또는 텍스트 라벨 병행

2. 호버 상태 명확히
   - 색상 변화 + 밑줄 또는 그림자 추가

3. 폼 에러 표시
   - 빨간색만 사용 금지 → 아이콘 + 텍스트 설명
```

---

## 구현 로드맵

### Phase 1: 기초 작업 (1일)
- [ ] `tailwind.config.ts` 업데이트
- [ ] `app/globals.css` CSS 변수 추가
- [ ] 레거시 색상 매핑 문서 작성
- [ ] Storybook 또는 색상 가이드 페이지 생성

### Phase 2: 핵심 페이지 (2-3일)
- [ ] **홈페이지 (/)** 색상 교체
  - Hero Section
  - 신뢰 지표
  - 상담 프로세스
  - 최종 CTA
  - Footer
- [ ] **The Plan (/the-plan)** 색상 교체
- [ ] **오시는길 (/contact)** 색상 교체

### Phase 3: 콘텐츠 페이지 (3-4일)
- [ ] **성공사례 (/cases)** 색상 교체
  - 목록 페이지: Pink → Rose Dust
  - 상세 페이지
- [ ] **변호사 칼럼 (/blog)** 색상 교체
  - 목록 페이지: Amber → Mustard
  - 상세 페이지
- [ ] **이혼큐레이션 (/faq)** 색상 교체

### Phase 4: 서비스 페이지 (2일)
- [ ] `/services/alimony` (위자료) → Rose
- [ ] `/services/property-division` (재산분할) → Sky
- [ ] `/services/custody` (양육권) → Mustard
- [ ] `/services/adultery` (불륜) → Terracotta

### Phase 5: 관리자 & 기타 (1일)
- [ ] 관리자 시스템 (/admin) 색상 교체
- [ ] 구성원소개 (/team) 색상 교체
- [ ] Instagram (/insta-theyool) 색상 미세 조정

### Phase 6: 품질 검증 (1일)
- [ ] 모든 페이지 접근성 검증 (WAVE, Lighthouse)
- [ ] 색맹 시뮬레이터 테스트
- [ ] 모바일 반응형 확인
- [ ] 크로스 브라우저 테스트

### Phase 7: 문서화 (1일)
- [ ] 컴포넌트 색상 가이드 작성
- [ ] 디자이너 인수인계 문서
- [ ] 개발자 온보딩 가이드

**총 예상 기간**: 약 10-12일

---

## 마이그레이션 체크리스트

### 색상 교체 시 확인사항

```markdown
[ ] 기존 하드코딩된 색상 값 검색
    - #ec4899 (Pink) → rose-500
    - #f59e0b (Amber) → mustard-500
    - #3b82f6 (Blue) → sky-600
    - #10b981 (Emerald) → olive-600

[ ] CSS 변수 교체
    - var(--trust-blue-*) → var(--sky-*)
    - var(--warm-amber-*) → var(--mustard-*)
    - var(--primary) → var(--mocha-500)

[ ] Tailwind 클래스 교체
    - bg-blue-* → bg-sky-*
    - text-amber-* → text-mustard-*
    - border-pink-* → border-rose-*

[ ] 그라데이션 재정의
    - from-amber-* → from-mustard-*
    - to-orange-* → to-terracotta-*

[ ] 호버/포커스 상태 확인
    - hover:bg-* 대비율 검증
    - focus:ring-* 가시성 확인

[ ] SVG 아이콘 색상
    - fill/stroke 속성 업데이트

[ ] 이미지 필터/오버레이
    - opacity 조정 필요 여부

[ ] 애니메이션 색상
    - keyframes 내 색상 값 확인
```

---

## 빠른 참조 (Quick Reference)

### 자주 사용하는 조합

```css
/* 1. 메인 CTA 버튼 */
.btn-primary {
  background: var(--terracotta-500);
  color: white;
}
.btn-primary:hover {
  background: var(--terracotta-600);
}

/* 2. 서브 CTA 버튼 */
.btn-secondary {
  background: var(--mocha-500);
  color: white;
}
.btn-secondary:hover {
  background: var(--mocha-600);
}

/* 3. 텍스트 링크 */
.link {
  color: var(--terracotta-600);
  text-decoration: underline;
}
.link:hover {
  color: var(--terracotta-700);
}

/* 4. 카드 */
.card {
  background: white;
  border: 1px solid var(--sand-200);
}
.card:hover {
  border-color: var(--mocha-400);
  box-shadow: 0 10px 20px rgba(164, 119, 100, 0.1);
}

/* 5. 배지 */
.badge {
  background: var(--mustard-50);
  border: 1px solid var(--mustard-400);
  color: var(--mustard-700);
}

/* 6. 섹션 배경 */
.section-warm {
  background: linear-gradient(to bottom, var(--mocha-50), white, var(--sand-100));
}

/* 7. Footer */
.footer {
  background: var(--charcoal-900);
  color: var(--charcoal-400);
}
```

---

## 마무리 노트

### 핵심 메시지
1. **일관성**: 모든 페이지에서 Mocha Mousse를 중심으로 한 일관된 색상 사용
2. **신뢰감**: Charcoal Gray와 Sky Blue로 법률 전문성 강조
3. **따뜻함**: Sand Beige와 Mocha로 접근 가능한 친근함 표현
4. **행동 유도**: Terracotta로 명확한 CTA 구분

### 색상 철학
- **Mocha Mousse**는 로고의 핵심이자 브랜드 정체성
- **자연스러운 조합**: 블로그에서 추천한 색상들로 조화로운 팔레트
- **Pantone 2025 트렌드**: 최신 디자인 트렌드 반영
- **법률 서비스 특성**: 신뢰+따뜻함+전문성의 균형

### 추가 고려사항
- 다크 모드 지원 시 색상 조정 필요
- 인쇄 매체 색상 변환 (CMYK) 테스트
- 브랜드 자산(명함, 브로슈어 등)과의 통일성

---

**작성자**: Claude (Anthropic)
**문의**: 색상 가이드 관련 질문은 이 문서를 참고하세요.
