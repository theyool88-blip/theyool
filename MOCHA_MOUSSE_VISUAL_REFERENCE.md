# Mocha Mousse 색상 비주얼 레퍼런스

**빠른 참조용**: 색상 코드와 시각적 예시를 한눈에 확인

---

## 1. 주요 색상 스와치

### Primary - Mocha (Pantone 17-1230)

```
█ Mocha 50  #FAF7F5  rgb(250,247,245)  가장 밝은 배경
█ Mocha 100 #F4EDE8  rgb(244,237,232)  섹션 배경
█ Mocha 200 #E9DBCE  rgb(233,219,206)  카드 보더
█ Mocha 300 #D4C3B5  rgb(212,195,181)  비활성 요소
█ Mocha 400 #BDA28D  rgb(189,162,141)  보조 텍스트
█ Mocha 500 #A47764  rgb(164,119,100)  로고 메인 ⭐
█ Mocha 600 #8D6652  rgb(141,102,82)   버튼 호버
█ Mocha 700 #7D5E4D  rgb(125,94,77)    링크/강조
█ Mocha 800 #5F4939  rgb(95,73,57)     헤더 텍스트
█ Mocha 900 #453426  rgb(69,52,38)     다크 배경
```

### Complementary - Trust Blue

```
█ Trust 50  #F0F6F9  rgb(240,246,249)  배경
█ Trust 100 #E0EEF4  rgb(224,238,244)  섹션
█ Trust 200 #C1DCE9  rgb(193,220,233)  카드
█ Trust 300 #92C3D9  rgb(146,195,217)  장식
█ Trust 400 #6CA8C4  rgb(108,168,196)  정보
█ Trust 500 #6490A4  rgb(100,144,164)  신뢰 액센트 ⭐
█ Trust 600 #527A8A  rgb(82,122,138)   호버
█ Trust 700 #3F5F6F  rgb(63,95,111)    링크
█ Trust 800 #2D4550  rgb(45,69,80)     강조
█ Trust 900 #1C2E37  rgb(28,46,55)     다크
```

### Accent - Copper (CTA)

```
█ Copper 50  #FFF8F3  rgb(255,248,243)  배경
█ Copper 100 #FFEEE0  rgb(255,238,224)  카드
█ Copper 200 #FFDDC1  rgb(255,221,193)  보더
█ Copper 300 #FFC896  rgb(255,200,150)  호버
█ Copper 400 #FFB06B  rgb(255,176,107)  액센트
█ Copper 500 #FF9A4D  rgb(255,154,77)   CTA 메인 ⭐
█ Copper 600 #E08038  rgb(224,128,56)   CTA 호버
█ Copper 700 #C26B28  rgb(194,107,40)   강조
```

### Accent - Sage (Success)

```
█ Sage 50  #F4F7F5  rgb(244,247,245)  배경
█ Sage 100 #E8F0EC  rgb(232,240,236)  섹션
█ Sage 200 #D1E1D9  rgb(209,225,217)  카드
█ Sage 300 #A8C9B8  rgb(168,201,184)  보조
█ Sage 400 #7FB197  rgb(127,177,151)  액센트
█ Sage 500 #5A9976  rgb(90,153,118)   성공 ⭐
█ Sage 600 #4A8062  rgb(74,128,98)    호버
█ Sage 700 #3A6850  rgb(58,104,80)    강조
```

### Accent - Dusty Rose (Empathy)

```
█ Rose 50  #FDF6F5  rgb(253,246,245)  배경
█ Rose 100 #FAEBE9  rgb(250,235,233)  섹션
█ Rose 200 #F5D7D3  rgb(245,215,211)  카드
█ Rose 300 #E8B5AD  rgb(232,181,173)  보조
█ Rose 400 #DB9487  rgb(219,148,135)  액센트
█ Rose 500 #CE7361  rgb(206,115,97)   후기 ⭐
█ Rose 600 #B55E4D  rgb(181,94,77)    호버
█ Rose 700 #9D4A3A  rgb(157,74,58)    강조
```

### Neutrals - Text & Background

```
█ White    #FFFFFF  rgb(255,255,255)  기본 배경
█ Cream 50 #FFFCF9  rgb(255,252,249)  따뜻한 배경
█ Cream 100 #FEF9F3 rgb(254,249,243)  섹션
█ Cream 200 #FDF2E6 rgb(253,242,230)  카드

█ Gray 50  #FAFAFA  rgb(250,250,250)  배경
█ Gray 100 #F5F5F7  rgb(245,245,247)  배경
█ Gray 200 #E8E8ED  rgb(232,232,237)  보더
█ Gray 300 #D2D2D7  rgb(210,210,215)  비활성
█ Gray 400 #9CA3AF  rgb(156,163,175)  보조 텍스트
█ Gray 500 #6B7280  rgb(107,114,128)  본문
█ Gray 600 #4B5563  rgb(75,85,99)     헤더
█ Gray 700 #374151  rgb(55,65,81)     강조
█ Gray 800 #1F2937  rgb(31,41,55)     제목
█ Gray 900 #111827  rgb(17,24,39)     최고 대비
```

---

## 2. 색상 조합 예시

### 2.1 Hero Section (홈페이지 상단)

```
배경: Cream 50 (#FFFCF9) 또는 gradient-hero
제목: Gray 900 (#111827)
부제: Gray 600 (#4B5563)
CTA 버튼: Copper 500 (#FF9A4D) + White 텍스트
로고 강조: Mocha 500 (#A47764)
```

**코드 예시:**
```tsx
<section className="bg-cream-50 min-h-screen flex items-center">
  <div className="text-center">
    <h1 className="text-gray-900 text-6xl font-bold mb-4">
      이겨놓고 설계하다
    </h1>
    <p className="text-gray-600 text-xl mb-8">
      법무법인 더율
    </p>
    <button className="bg-copper-500 hover:bg-copper-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-copper">
      무료 상담 신청
    </button>
  </div>
</section>
```

### 2.2 서비스 카드

```
배경: White (#FFFFFF)
보더: Mocha 200 (#E9DBCE)
호버 보더: Mocha 500 (#A47764)
제목: Gray 900 (#111827)
본문: Gray 600 (#4B5563)
링크: Mocha 600 (#8D6652)
```

**코드 예시:**
```tsx
<div className="bg-white border-2 border-mocha-200 hover:border-mocha-500 p-6 rounded-2xl transition-all hover:shadow-mocha-lg">
  <h3 className="text-gray-900 text-2xl font-bold mb-3">
    위자료 청구
  </h3>
  <p className="text-gray-600 mb-4">
    부정행위로 인한 이혼 시 위자료를 청구할 수 있습니다.
  </p>
  <a href="/services/alimony" className="text-mocha-600 hover:text-mocha-700 font-semibold">
    자세히 보기 →
  </a>
</div>
```

### 2.3 The Plan Section (신뢰 강조)

```
배경: Trust 50 (#F0F6F9)
강조 박스: White + Trust 500 보더
제목: Trust 800 (#2D4550)
본문: Gray 700 (#374151)
아이콘: Trust 500 (#6490A4)
```

**코드 예시:**
```tsx
<section className="bg-trust-50 py-20">
  <div className="max-w-screen-xl mx-auto px-4">
    <h2 className="text-trust-800 text-4xl font-bold mb-6 text-center">
      이겨놓고 설계하다
    </h2>
    <p className="text-gray-700 text-xl text-center mb-12">
      법무법인 더율의 승소 전략
    </p>

    <div className="bg-white border-4 border-trust-500 p-8 rounded-3xl shadow-trust">
      <h3 className="text-trust-700 text-2xl font-bold mb-4">
        6단계 프로세스
      </h3>
      <ol className="space-y-4 text-gray-700">
        <li>1. 사건 분석</li>
        <li>2. 증거 수집</li>
        {/* ... */}
      </ol>
    </div>
  </div>
</section>
```

### 2.4 CTA Banner (액션 유도)

```
배경: Copper 100 (#FFEEE0) 또는 gradient-mocha
제목: Copper 800 (#C26B28) 또는 Gray 900
본문: Gray 700 (#374151)
버튼: Copper 500 (#FF9A4D) + White 텍스트
```

**코드 예시:**
```tsx
<section className="bg-copper-100 py-16">
  <div className="max-w-screen-xl mx-auto px-4 text-center">
    <h2 className="text-gray-900 text-4xl font-bold mb-4">
      지금 바로 상담 신청하세요
    </h2>
    <p className="text-gray-700 text-lg mb-8">
      전문 변호사가 24시간 내에 연락드립니다
    </p>
    <button className="bg-copper-500 hover:bg-copper-600 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-copper-lg">
      무료 상담 신청
    </button>
  </div>
</section>
```

### 2.5 Success Message (성공 표시)

```
배경: Sage 100 (#E8F0EC)
보더: Sage 500 (#5A9976)
아이콘: Sage 600 (#4A8062)
텍스트: Gray 800 (#1F2937)
```

**코드 예시:**
```tsx
<div className="bg-sage-100 border-l-4 border-sage-500 p-4 rounded-lg">
  <div className="flex items-center">
    <svg className="w-6 h-6 text-sage-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <p className="text-gray-800 font-semibold">
      상담 신청이 완료되었습니다!
    </p>
  </div>
</div>
```

### 2.6 Testimonial Card (후기)

```
배경: Rose 50 (#FDF6F5)
카드: White + Rose 200 보더
배지: Rose 500 (#CE7361)
제목: Gray 900 (#111827)
본문: Gray 600 (#4B5563)
```

**코드 예시:**
```tsx
<div className="bg-rose-50 p-8 rounded-2xl">
  <div className="bg-white border border-rose-200 p-6 rounded-xl">
    <div className="flex items-center mb-4">
      <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        이혼 소송
      </span>
    </div>
    <h3 className="text-gray-900 text-xl font-bold mb-3">
      "덕분에 원하는 결과를 얻었습니다"
    </h3>
    <p className="text-gray-600">
      처음엔 막막했는데, 법무법인 더율 덕분에...
    </p>
  </div>
</div>
```

---

## 3. 버튼 스타일 가이드

### Primary CTA (상담 신청 등)
```tsx
<button className="bg-copper-500 hover:bg-copper-600 text-white px-6 py-3 rounded-xl font-semibold shadow-copper transition-all">
  무료 상담 신청
</button>
```
**색상**: Copper 500 (#FF9A4D) → Copper 600 (hover)
**용도**: 핵심 액션, 전환 유도

### Secondary Button (더 알아보기 등)
```tsx
<button className="bg-mocha-500 hover:bg-mocha-600 text-white px-6 py-3 rounded-xl font-semibold shadow-mocha transition-all">
  더 알아보기
</button>
```
**색상**: Mocha 500 (#A47764) → Mocha 600 (hover)
**용도**: 보조 액션, 정보 탐색

### Outline Button (비주요 액션)
```tsx
<button className="border-2 border-mocha-500 text-mocha-600 hover:bg-mocha-50 px-6 py-3 rounded-xl font-semibold transition-all">
  취소
</button>
```
**색상**: Mocha 500 보더, Mocha 600 텍스트
**용도**: 취소, 되돌아가기

### Trust Button (신뢰 강조)
```tsx
<button className="bg-trust-500 hover:bg-trust-600 text-white px-6 py-3 rounded-xl font-semibold shadow-trust transition-all">
  The Plan 보기
</button>
```
**색상**: Trust 500 (#6490A4) → Trust 600 (hover)
**용도**: The Plan, 전문성 강조

---

## 4. 접근성 통과 조합

### 4.1 본문 텍스트 (16px 이하)

✅ **강력 추천 (WCAG AAA)**
- `text-gray-900` on `bg-white` (17.5:1)
- `text-gray-800` on `bg-cream-50` (14.2:1)
- `text-mocha-800` on `bg-white` (8.2:1)
- `text-trust-800` on `bg-trust-50` (7.8:1)

✅ **추천 (WCAG AA)**
- `text-gray-700` on `bg-white` (11.2:1)
- `text-gray-600` on `bg-white` (8.6:1)
- `text-mocha-700` on `bg-cream-50` (5.2:1)

⚠️ **큰 텍스트만 (18px+ 또는 14px+ Bold)**
- `text-mocha-600` on `bg-white` (4.2:1)
- `text-trust-600` on `bg-white` (4.8:1)

❌ **사용 금지 (본문)**
- `text-mocha-500` on `bg-white` (3.1:1) → 장식용만
- `text-copper-500` on `bg-white` (2.8:1) → 장식용만

### 4.2 버튼 텍스트

✅ **강력 추천**
- `text-white` on `bg-mocha-600` (4.5:1)
- `text-white` on `bg-trust-500` (3.4:1) - 큰 텍스트
- `text-gray-900` on `bg-copper-500` (6.2:1)

✅ **조건부 추천 (18pt+ Bold)**
- `text-white` on `bg-copper-500` (2.8:1) - 큰 버튼만
- `text-white` on `bg-mocha-500` (3.1:1) - 큰 버튼만

### 4.3 링크

✅ **강력 추천 (underline 필수)**
```tsx
<a className="text-mocha-600 hover:text-mocha-700 underline">
  링크 텍스트
</a>
```
**이유**: 색상 + underline으로 색맹 사용자도 인식 가능

---

## 5. 그라데이션

### Mocha Gradient (따뜻한 배경)
```css
background: linear-gradient(135deg, #FAF7F5 0%, #F4EDE8 50%, #E9DBCE 100%);
```
```tsx
<div className="bg-gradient-mocha">
```
**용도**: Hero section, 따뜻한 분위기

### Trust Gradient (신뢰감 배경)
```css
background: linear-gradient(135deg, #F0F6F9 0%, #E0EEF4 50%, #C1DCE9 100%);
```
```tsx
<div className="bg-gradient-trust">
```
**용도**: The Plan, 전문성 섹션

### Hero Gradient (세로 방향)
```css
background: linear-gradient(180deg, #FFFCF9 0%, #F4EDE8 100%);
```
```tsx
<div className="bg-gradient-hero">
```
**용도**: 홈페이지 히어로, 랜딩 페이지

---

## 6. 그림자

### Mocha Shadow (따뜻한 그림자)
```css
box-shadow: 0 4px 16px rgba(164, 119, 100, 0.12);
```
```tsx
<div className="shadow-mocha">
```

### Mocha Shadow Large
```css
box-shadow: 0 12px 32px rgba(164, 119, 100, 0.16);
```
```tsx
<div className="shadow-mocha-lg">
```

### Trust Shadow (차가운 그림자)
```css
box-shadow: 0 4px 16px rgba(100, 144, 164, 0.12);
```
```tsx
<div className="shadow-trust">
```

### Copper Shadow (CTA 강조)
```css
box-shadow: 0 4px 16px rgba(255, 154, 77, 0.16);
```
```tsx
<div className="shadow-copper">
```

---

## 7. 색상 사용 금기

### ❌ 절대 금지 조합

**1. 대비 부족**
```tsx
// ❌ 나쁜 예
<div className="bg-mocha-500">
  <p className="text-mocha-700">텍스트</p> {/* 대비 1.8:1 */}
</div>

// ✅ 좋은 예
<div className="bg-mocha-500">
  <p className="text-white">텍스트</p> {/* 대비 3.1:1 */}
</div>
```

**2. 너무 많은 색상**
```tsx
// ❌ 나쁜 예 (5가지 색상)
<section className="bg-mocha-100">
  <h2 className="text-trust-600">제목</h2>
  <p className="text-copper-500">본문</p>
  <button className="bg-sage-500">버튼</button>
  <span className="text-rose-500">배지</span>
</section>

// ✅ 좋은 예 (2-3가지 색상)
<section className="bg-mocha-100">
  <h2 className="text-gray-900">제목</h2>
  <p className="text-gray-700">본문</p>
  <button className="bg-copper-500">버튼</button>
</section>
```

**3. 색상만으로 정보 전달**
```tsx
// ❌ 나쁜 예 (색맹 사용자 불가)
<div className="text-sage-500">성공</div>
<div className="text-rose-500">실패</div>

// ✅ 좋은 예 (아이콘 + 색상)
<div className="text-sage-500 flex items-center">
  <CheckIcon /> 성공
</div>
<div className="text-rose-500 flex items-center">
  <XIcon /> 실패
</div>
```

---

## 8. 빠른 복사 코드

### 섹션 템플릿

```tsx
// Warm Section (따뜻한 느낌)
<section className="bg-mocha-100 py-20">
  <div className="max-w-screen-xl mx-auto px-4">
    <h2 className="text-gray-900 text-4xl font-bold mb-6">제목</h2>
    <p className="text-gray-600 text-lg">본문</p>
  </div>
</section>

// Trust Section (신뢰 강조)
<section className="bg-trust-50 py-20">
  <div className="max-w-screen-xl mx-auto px-4">
    <h2 className="text-trust-800 text-4xl font-bold mb-6">제목</h2>
    <p className="text-gray-700 text-lg">본문</p>
  </div>
</section>

// CTA Section (액션 유도)
<section className="bg-gradient-mocha py-20">
  <div className="max-w-screen-xl mx-auto px-4 text-center">
    <h2 className="text-gray-900 text-4xl font-bold mb-6">제목</h2>
    <button className="bg-copper-500 hover:bg-copper-600 text-white px-8 py-4 rounded-xl font-semibold shadow-copper">
      CTA 버튼
    </button>
  </div>
</section>
```

### 카드 템플릿

```tsx
// Basic Card
<div className="bg-white border border-mocha-200 hover:border-mocha-500 p-6 rounded-2xl transition-all">
  <h3 className="text-gray-900 text-xl font-bold mb-3">제목</h3>
  <p className="text-gray-600">내용</p>
</div>

// Trust Card (강조)
<div className="bg-white border-2 border-trust-500 p-6 rounded-2xl shadow-trust">
  <h3 className="text-trust-700 text-xl font-bold mb-3">제목</h3>
  <p className="text-gray-700">내용</p>
</div>

// CTA Card
<div className="bg-copper-100 border-2 border-copper-500 p-6 rounded-2xl">
  <h3 className="text-copper-800 text-xl font-bold mb-3">제목</h3>
  <button className="bg-copper-500 hover:bg-copper-600 text-white px-6 py-3 rounded-xl">
    버튼
  </button>
</div>
```

---

## 9. 디자인 결정 플로우차트

```
색상 선택 필요?
│
├─ 로고/브랜드 강조? → mocha-500
│
├─ 본문 텍스트? → gray-900 (제목), gray-600 (본문)
│
├─ 버튼 색상?
│  ├─ 핵심 CTA? → copper-500
│  ├─ 보조 액션? → mocha-500
│  └─ 신뢰 강조? → trust-500
│
├─ 섹션 배경?
│  ├─ 따뜻한 느낌? → cream-50, mocha-100
│  ├─ 신뢰 강조? → trust-50, trust-100
│  └─ 기본? → white
│
├─ 카드 보더?
│  ├─ 기본? → mocha-200
│  ├─ 호버? → mocha-500
│  └─ 강조? → trust-500, copper-500
│
└─ 링크 색상? → mocha-600 + underline
```

---

## 10. 체크리스트

디자인 작업 전 확인:

- [ ] 색상 대비율 확인했나요? (WCAG AA 4.5:1 이상)
- [ ] 링크에 underline 있나요?
- [ ] 3가지 이하 색상만 사용했나요?
- [ ] 버튼 크기가 충분한가요? (44x44px 이상)
- [ ] 색상만으로 정보를 전달하지 않나요?
- [ ] 모바일에서 텍스트가 읽기 쉬운가요? (16px 이상)

---

**참조**:
- 전체 팔레트: `THEYOOL_MOCHA_MOUSSE_PALETTE.md`
- 구현 가이드: `MOCHA_MOUSSE_IMPLEMENTATION_GUIDE.md`

**작성일**: 2025-11-20

이 문서를 북마크하여 색상 코드를 빠르게 참조하세요!
