# Mocha Mousse 색상 카드 (빠른 참조)

**인쇄용 / 모니터 옆 부착용**

---

## 8가지 핵심 색상

```
┌─────────────────────────────────────────────────┐
│ MOCHA MOUSSE (Primary)                          │
│ #A47764 | RGB(164,119,100) | mocha-500          │
│ 용도: 로고, 브랜드, 메인 헤딩                    │
│ ▓▓▓▓▓▓▓▓▓▓                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SAND BEIGE (Secondary)                          │
│ #D7BC99 | RGB(215,188,153) | sand-300           │
│ 용도: 배경, 섹션 구분                            │
│ ░░░░░░░░░░                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ TERRACOTTA (Accent 1)                           │
│ #D85D42 | RGB(216,93,66) | terracotta-500       │
│ 용도: CTA 버튼, 중요 액션                        │
│ ████████████                                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ GOLDEN MUSTARD (Accent 2)                       │
│ #DAA520 | RGB(218,165,32) | mustard-500         │
│ 용도: 배지, 프로모션                             │
│ ████████████                                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ SKY BLUE (Accent 3)                             │
│ #6EB4D1 | RGB(110,180,209) | sky-400            │
│ 용도: 정보, 체크마크                             │
│ ▒▒▒▒▒▒▒▒▒▒                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ CHARCOAL GRAY (Neutral)                         │
│ #36454F | RGB(54,69,79) | charcoal-800          │
│ 용도: 텍스트, UI, Footer                         │
│ ■■■■■■■■■■                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ ROSE DUST (Support 1)                           │
│ #BC8F8F | RGB(188,143,143) | rose-500           │
│ 용도: 성공사례, 감성 스토리                      │
│ ▓▓▓▓▓▓▓▓▓▓                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ DEEP OLIVE (Support 2)                          │
│ #556B2F | RGB(85,107,47) | olive-700            │
│ 용도: 법률 문서, 안정감                          │
│ ▓▓▓▓▓▓▓▓▓▓                                      │
└─────────────────────────────────────────────────┘
```

---

## 색상 조합 (5가지)

### 1. Warm Welcome (따뜻한 환영)
```
Mocha-500 + Sand-300 + Terracotta-500
용도: Hero Section, 메인 CTA
```

### 2. Trust & Expertise (신뢰와 전문성)
```
Mocha-600 + Sky-300 + Charcoal-800
용도: 법률 서비스 설명
```

### 3. Action & Energy (행동과 에너지)
```
Terracotta-500 + Mustard-400 + Mocha-400
용도: CTA 섹션, 예약 유도
```

### 4. Empathy & Story (공감과 이야기)
```
Rose-500 + Sand-200 + Mocha-300
용도: 의뢰인 후기
```

### 5. Professional & Modern (전문적이고 현대적)
```
Charcoal-900 + Mocha-500 + Sky-400
용도: 정보 페이지
```

---

## 접근성 (대비율)

### 안전한 텍스트 조합 ✓
```
Charcoal-900 (#1F2937) on White → 14.67:1 ✓✓
Mocha-900 (#352621) on White → 13.24:1 ✓✓
White on Terracotta-600 (#C04F38) → 5.82:1 ✓
White on Mocha-700 (#6E4F41) → 6.23:1 ✓
```

### 주의 조합 ⚠
```
Mocha-500 on White → 3.52:1 (18pt+ 큰 텍스트만)
Terracotta-500 on White → 3.08:1 (18pt+ 큰 텍스트만)
```

---

## 색상 변환 (Find & Replace)

```
Pink-500 (#ec4899)    → Rose-500 (#BC8F8F)
Amber-500 (#f59e0b)   → Mustard-500 (#DAA520)
Blue-500 (#3b82f6)    → Sky-400 (#6EB4D1)
Emerald-500 (#10b981) → Olive-600 (#6A7358)
Gray-900 (#1d1d1f)    → Charcoal-900 (#1F2937)
```

---

## Tailwind 클래스 (자주 사용)

```css
/* 버튼 */
bg-terracotta-500 hover:bg-terracotta-600
bg-mocha-500 hover:bg-mocha-600

/* 텍스트 */
text-charcoal-900
text-mocha-600
text-terracotta-600

/* 배경 */
bg-mocha-50
bg-sand-100
bg-white

/* 테두리 */
border-sand-200
border-mocha-400

/* 그림자 */
shadow-mocha-lg
shadow-terracotta
```

---

## CSS 변수 (Quick Access)

```css
var(--color-brand)         /* #A47764 - mocha-500 */
var(--color-brand-hover)   /* #8A6552 - mocha-600 */
var(--color-action)        /* #D85D42 - terracotta-500 */
var(--color-action-hover)  /* #C04F38 - terracotta-600 */
var(--color-accent)        /* #DAA520 - mustard-500 */
var(--color-trust)         /* #6EB4D1 - sky-400 */
var(--color-text)          /* #1F2937 - charcoal-900 */
var(--color-text-secondary)/* #6B7280 - charcoal-500 */
var(--color-bg-warm)       /* #FAF6F4 - mocha-50 */
var(--color-bg-section)    /* #F8F5F1 - sand-100 */
```

---

## 페이지별 메인 색상

```
홈페이지 (/)              → Mocha + Terracotta
성공사례 (/cases)         → Rose
변호사 칼럼 (/blog)       → Mustard
이혼큐레이션 (/faq)      → Mocha + Sky
위자료 (alimony)          → Rose
재산분할 (property)       → Sky
양육권 (custody)          → Mustard
불륜 (adultery)           → Terracotta
The Plan                  → Mocha Dark
구성원소개 (/team)        → Mocha + Sand
오시는길 (/contact)       → Mocha + Sky
```

---

## 긴급 참조

### 지금 당장 필요한 것만

**Primary CTA 버튼**:
```tsx
className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
```

**Secondary 버튼**:
```tsx
className="bg-mocha-600 hover:bg-mocha-700 text-white"
```

**링크**:
```tsx
className="text-terracotta-600 hover:text-terracotta-700 underline"
```

**카드**:
```tsx
className="bg-white border border-sand-200 hover:border-mocha-400"
```

**배지**:
```tsx
className="bg-mustard-50 border border-mustard-400 text-mustard-700"
```

**섹션 배경**:
```tsx
className="bg-gradient-to-b from-mocha-50 via-white to-sand-100"
```

---

## 문서 위치

```
전체 가이드: THEYOOL_MOCHA_MOUSSE_COLOR_GUIDE.md
빠른 시작: MOCHA_MOUSSE_QUICK_START.md
시각 비교: MOCHA_MOUSSE_VISUAL_COMPARISON.md
요약 보고서: MOCHA_MOUSSE_IMPLEMENTATION_SUMMARY.md
이 카드: MOCHA_MOUSSE_COLOR_CARD.md
```

---

**TIP**: 이 카드를 인쇄하거나 모니터 옆에 두고 참고하세요!

**참고 블로그**: https://jun-ordinary.tistory.com/182
