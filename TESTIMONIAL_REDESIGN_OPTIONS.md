# 의뢰인 후기 섹션 디자인 리뷰 및 개선안

**작성일**: 2025-11-19
**검토 대상**: `/components/features/TestimonialEvidenceGallery.tsx`
**현재 위치**: 홈페이지 (line 620)

---

## 목차
1. [전체 평가](#1-전체-평가)
2. [일관성 검토](#2-일관성-검토)
3. [신뢰도 평가](#3-신뢰도-평가)
4. [UX 평가](#4-ux-평가)
5. [5가지 디자인 옵션](#5-디자인-개선안-5가지-옵션)
6. [최종 추천](#6-최종-추천)
7. [우선순위 액션 아이템](#7-우선순위-액션-아이템)

---

## 1. 전체 평가

### 현재 디자인의 강점 ✓
- ✅ **실제 이미지 활용**: 네이버 리뷰 스크린샷을 배경으로 사용하여 진정성 전달
- ✅ **구체적 성과**: 금액 표시로 명확한 결과 제시
- ✅ **가로 스크롤**: 모바일 친화적 캐러셀 레이아웃
- ✅ **호버 인터랙션**: "전체 후기 읽기" 힌트로 클릭 유도

### 주요 문제점 ✗

#### 문제 1: 색상 불일치 (중요도: 🔴 Critical)
```tsx
// 현재: 초록색 배지가 사이트 amber 계열과 충돌
<span className="bg-green-500 text-white">네이버</span>

// 문제:
// - 전체 사이트는 amber/gray/white 팔레트
// - 초록색이 갑자기 등장하여 시각적 불협화음
```

#### 문제 2: 과도한 장식 요소 (중요도: 🔴 Critical)
```tsx
// 현재: 4가지 장식 요소 동시 사용
1. 초록색 배지 (bg-green-500)
2. 세로 라인 (bg-amber-300/40) - 발췌 표시
3. 기울임체 (italic)
4. 형광펜 효과 (bg-amber-300/30)

// 문제:
// - 너무 복잡하여 시선이 분산됨
// - 법무법인의 전문적 이미지와 맞지 않음
```

#### 문제 3: 가독성 저하 (중요도: 🟡 High)
```tsx
// 현재: 어두운 배경 위 기울임체 + 형광펜
<div className="bg-black/50">  {/* 50% 어두운 오버레이 */}
  <h3 className="italic">
    <span className="bg-amber-300/30">재산분할</span> {/* 형광펜 */}
  </h3>
</div>

// 문제:
// - 기울임체 한글은 읽기 어려움 (특히 모바일)
// - 형광펜이 어두운 배경에서 잘 안 보임
```

#### 문제 4: 일관성 부족 (중요도: 🟡 High)
다른 섹션들은 **깔끔하고 미니멀**한데, 후기 섹션만 **장식이 과함**

---

## 2. 일관성 검토

### 전체 사이트 디자인 패턴 분석

#### 색상 팔레트
| 용도 | 색상 | 사용 위치 |
|------|------|-----------|
| Primary CTA | Gray-900 | 버튼, 중요 텍스트 |
| Secondary CTA | Amber-600 | 링크, 강조 |
| Background | Amber-50 ~ White 그라데이션 | 대부분 섹션 |
| Accent | Blue-50/Blue-600 | FAQ, 상담 페이지 |
| Success | Green-600 | 체크마크만 (배경 아님!) |

#### 타이포그래피
| 요소 | 스타일 | 예시 |
|------|--------|------|
| 대제목 | text-4xl ~ 6xl, font-bold | "이겨놓고 설계하다" |
| 소제목 | text-xl ~ 2xl, font-bold | 섹션 제목 |
| 본문 | text-base ~ lg, 직선체 | 대부분의 설명 텍스트 |
| 강조 | text-amber-600, font-semibold | 핵심 키워드 |

#### 카드 스타일
```tsx
// 표준 카드 패턴
<div className="
  bg-white
  rounded-2xl
  border-2 border-gray-200
  hover:shadow-xl
  hover:border-amber-200
  transition-all
">
```

### 후기 섹션과의 비교

| 요소 | 다른 섹션 | 후기 섹션 | 일치도 |
|------|-----------|-----------|--------|
| **배경색** | White/Amber-50 | **bg-black/50 (이미지 위)** | ❌ 2/10 |
| **배지 색상** | Amber-50/Amber-600 | **bg-green-500** | ❌ 0/10 |
| **타이포그래피** | 직선체 (regular) | **italic** | ❌ 3/10 |
| **강조 방식** | 색상만 변경 | **bg-amber-300/30 (형광펜)** | ❌ 4/10 |
| **카드 스타일** | rounded-2xl, white | rounded-lg, 이미지 배경 | 🟡 6/10 |
| **호버 효과** | scale + shadow | 텍스트 색상 변경 | 🟡 6/10 |

**전체 일관성 점수**: **3.5/10** (매우 낮음)

---

## 3. 신뢰도 평가

### 현재 신뢰 요소 분석

#### 강점
1. ✅ **네이버 출처**: 신뢰할 수 있는 플랫폼 명시
2. ✅ **실제 이미지**: 스크린샷으로 진정성 전달
3. ✅ **구체적 금액**: 2.0억 등 명확한 성과
4. ✅ **"100% 실제" 배지**: 헤더에 진정성 강조

#### 신뢰도를 저해하는 요소

##### 1. 초록색 배지
```
문제: 네이버의 브랜드 색상이지만, 사이트와 조화롭지 않음
인식: "왜 갑자기 초록색이 나오지? 광고 같은데..."
개선: White 배경 + 초록색 체크마크 아이콘
```

##### 2. 기울임체 + 형광펜
```
문제: 과도한 장식이 오히려 "꾸민 것 같은" 느낌
인식: "강조를 너무 많이 하면 진짜일까 의심스러운데..."
개선: 직선체 + 색상만으로 키워드 강조
```

##### 3. 어두운 오버레이
```
문제: 이미지를 50% 어둡게 하여 진정성 감소
인식: "이미지가 흐릿해서 잘 안 보이네..."
개선: 부분 그라데이션 또는 이미지를 별도 영역에 배치
```

### 법무법인 이미지 적합성

| 기대 이미지 | 현재 디자인 | 평가 |
|------------|------------|------|
| 전문적 | 화려함 | ❌ |
| 신뢰할 수 있는 | 과장된 느낌 | ❌ |
| 진지한 | 마케팅적 | ❌ |
| 세련된 | 복잡한 | ❌ |

**법무법인 적합도**: **4/10** (개선 필요)

---

## 4. UX 평가

### 강점
- ✅ **가로 스크롤**: 모바일 제스처 친화적
- ✅ **호버 힌트**: 인터랙션 명확
- ✅ **스크롤 가이드**: 모바일 사용자에게 힌트

### 문제점

#### 1. 형광펜 효과 가독성
```tsx
// 문제 상황
<div className="bg-black/50">  {/* 어두운 배경 */}
  <span className="bg-amber-300/30">재산분할</span>  {/* 30% 투명도 */}
</div>

// 결과: 대비가 낮아서 잘 안 보임
```

#### 2. 기울임체 가독성
```
모바일 환경:
- 화면이 작음
- 한글 기울임체는 원래 가독성이 낮음
- 결과: 읽기 어려움
```

#### 3. 세로 라인의 효과
```
모바일 (52% 카드):
- 라인이 좌측에 고정
- 카드 중앙 정렬과 어색
- 너무 작아서 발췌 표시로 인식 어려움
```

#### 4. 인지 부하
```
사용자가 처리해야 할 정보:
1. 배경 이미지 (네이버 리뷰)
2. 초록색 배지 (네이버)
3. 세로 라인 (발췌 표시)
4. 기울임체 제목
5. 형광펜 효과
6. 금액
7. 호버 힌트

→ 너무 많음! 핵심에 집중 어려움
```

---

## 5. 디자인 개선안 (5가지 옵션)

### 옵션 1: 미니멀 클린 ⭐ 강력 추천

**컨셉**: 전체 사이트와 완벽한 일관성, 깔끔한 전문성

#### 비주얼 설명
```
┌─────────────────────────────┐
│ [작은 네이버 이미지]         │ ← 상단 30%: 이미지 영역
│  ┌──────────────┐           │
│  │ ✓ 네이버 │백  │          │   (우측 상단: 화이트 배지)
│  └──────────────┘           │
├─────────────────────────────┤
│ "                           │ ← 큰 따옴표 (발췌 표시)
│                             │
│ 재산분할 0원 방어 성공      │   (키워드만 amber)
│                             │
│ 2.0억                       │   (금액 크게)
│                             │
│ 전체 후기 읽기 →            │   (호버 시)
└─────────────────────────────┘
  ← 하단 70%: 흰색 배경
```

#### 코드 예시
```tsx
<button className="w-full group rounded-xl border-2 border-amber-100 bg-white hover:shadow-xl hover:border-amber-300 transition-all duration-300">

  {/* 상단 이미지 영역 - 30% */}
  <div className="h-24 overflow-hidden relative">
    <img src={photo_url} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

    {/* 네이버 배지 - 우측 상단 */}
    <div className="absolute top-3 right-3">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-sm">
        <svg className="w-3.5 h-3.5 text-green-600">
          {/* 체크마크 */}
        </svg>
        <span className="text-xs font-semibold text-gray-700">네이버</span>
      </div>
    </div>
  </div>

  {/* 하단 콘텐츠 영역 - 70% */}
  <div className="p-4 bg-white border-t-2 border-amber-50">
    {/* 큰 따옴표 */}
    <div className="text-3xl text-amber-300 leading-none mb-2">"</div>

    {/* 제목 - 직선체, 키워드만 amber */}
    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
      <span className="text-amber-600">재산분할</span> 0원 방어 성공
    </h3>

    {/* 금액 */}
    <p className="text-2xl font-bold text-amber-600 mb-2">2.0억</p>

    {/* 호버 힌트 */}
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-xs text-gray-500 flex items-center gap-1">
        전체 후기 읽기 →
      </span>
    </div>
  </div>
</button>
```

#### 장단점 분석

**장점**:
- ✅ **일관성 극대화**: amber-white-gray 팔레트 완벽 일치
- ✅ **가독성 최고**: 직선체 + 흰색 배경
- ✅ **신뢰도 향상**: 깔끔하고 전문적
- ✅ **모바일 최적화**: 명확한 계층, 큰 따옴표

**단점**:
- 기존보다 평범해 보일 수 있음 (하지만 법무법인에는 장점!)

**점수**:
- 일관성: **9/10**
- 신뢰도: **9/10**
- 가독성: **10/10**
- 구현 난이도: **낮음**

---

### 옵션 2: 듀얼 레이어 (이미지 + 콘텐츠 분리)

**컨셉**: 이미지를 효과적으로 보여주면서 깔끔한 구조

#### 비주얼 설명
```
┌─────────────────────────────┐
│                             │ ← 상단 40%: 이미지 영역
│   [큰 네이버 이미지]        │   (호버 시 zoom-in)
│  ┌──────┐                   │
│  │ ✓ 네이버│ (좌측 하단)    │
│  └──────┘                   │
├─────────────────────────────┤
│ "                           │ ← 따옴표 SVG 아이콘
│                             │
│ 재산분할 0원 방어 성공      │
│                             │
│ ──────────────────────     │   (구분선)
│ 2.0억           더보기 →    │
└─────────────────────────────┘
  ← 하단 60%: 흰색 배경
```

#### 코드 예시
```tsx
<button className="w-full group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-amber-200">

  {/* 상단 이미지 - 40% */}
  <div className="h-[40%] overflow-hidden bg-gray-100">
    <img
      src={photo_url}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />

    {/* 네이버 배지 - 좌측 하단 */}
    <div className="absolute bottom-2 left-2">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
        <svg className="w-3 h-3 text-green-600">{/* 체크 */}</svg>
        <span className="text-xs font-semibold text-gray-700">네이버</span>
      </div>
    </div>
  </div>

  {/* 하단 콘텐츠 - 60% */}
  <div className="h-[60%] p-4 flex flex-col justify-between bg-white">
    <div>
      {/* 따옴표 아이콘 */}
      <div className="w-8 h-8 mb-2">
        <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24">
          {/* Quote icon */}
        </svg>
      </div>

      {/* 제목 */}
      <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-tight mb-3">
        <span className="text-amber-600">재산분할</span> 0원 방어 성공
      </h3>
    </div>

    {/* 하단: 금액 + 화살표 */}
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <span className="text-xl font-bold text-amber-600">2.0억</span>
      <span className="text-xs text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex items-center gap-1">
        더보기 →
      </span>
    </div>
  </div>
</button>
```

#### 장단점 분석

**장점**:
- ✅ **명확한 구조**: 이미지/콘텐츠 분리로 인지 부하 감소
- ✅ **이미지 활용**: 네이버 리뷰를 잘 보여줌
- ✅ **세련된 느낌**: 모던하고 전문적
- ✅ **호버 효과**: Zoom-in으로 인터랙션 강화

**단점**:
- 256px 높이에서 40%/60% 비율이 타이트할 수 있음

**점수**:
- 일관성: **9/10**
- 신뢰도: **9/10**
- 가독성: **9/10**
- 구현 난이도: **낮음**

---

### 옵션 3: 소프트 그라데이션

**컨셉**: 이미지 위에 부드러운 그라데이션으로 가독성 확보

#### 비주얼 설명
```
┌─────────────────────────────┐
│                             │
│   [네이버 이미지 배경]       │
│                             │
│  ┌──────┐                   │   (상단 좌측)
│  │● 네이버 리뷰│             │
│  └──────┘                   │
│                             │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ ← 하단만 그라데이션
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  │   (from-white/80 to-white)
│                             │
│ "                           │
│ 재산분할 0원 방어 성공      │
│ ┌───────┐                   │
│ │ 2.0억 │                   │
│ └───────┘                   │
└─────────────────────────────┘
```

#### 코드 예시
```tsx
<button className="w-full group rounded-xl border-2 border-gray-200 hover:shadow-xl hover:border-amber-200 transition-all overflow-hidden">

  {/* 배경 이미지 + 부드러운 그라데이션 */}
  <div className="absolute inset-0">
    <img src={photo_url} className="w-full h-full object-cover" />
    {/* 하단만 그라데이션 - 가독성 확보 */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
  </div>

  {/* 네이버 배지 - 상단 좌측 */}
  <div className="absolute top-3 left-3 z-10">
    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
      <span className="text-xs font-medium text-gray-700">네이버 리뷰</span>
    </div>
  </div>

  {/* 하단 콘텐츠 */}
  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
    {/* 큰 따옴표 */}
    <div className="text-4xl text-amber-400/60 leading-none mb-2 font-serif">"</div>

    {/* 제목 */}
    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
      <span className="text-amber-600">재산분할</span> 0원 방어 성공
    </h3>

    {/* 금액 */}
    <div className="inline-flex items-center px-3 py-1.5 bg-amber-50 rounded-full">
      <span className="text-lg font-bold text-amber-700">2.0억</span>
    </div>
  </div>
</button>
```

#### 장단점 분석

**장점**:
- ✅ **이미지 활용**: 네이버 리뷰 이미지를 효과적으로 활용
- ✅ **가독성**: 하단 그라데이션으로 텍스트 명확
- ✅ **부드러운 느낌**: 전문적이면서 세련됨

**단점**:
- 이미지 품질에 따라 결과물 차이

**점수**:
- 일관성: **8/10**
- 신뢰도: **8/10**
- 가독성: **8/10**
- 구현 난이도: **낮음**

---

### 옵션 4: 심플 쿼트 카드

**컨셉**: 이미지 없이 텍스트 중심, 극도로 심플

#### 비주얼 설명
```
┌─────────────────────────────┐
│ ┌──────┐         실제 후기  │ ← 상단
│ │● 네이버│                   │
│ └──────┘                    │
│                             │
│        "                    │ ← 중앙
│                             │   (큰 따옴표)
│   재산분할 0원 방어 성공     │
│                             │
│                             │
│ 2.0억           자세히 →    │ ← 하단
└─────────────────────────────┘
  전체 흰색 배경 + amber 그라데이션
```

#### 코드 예시
```tsx
<button className="w-full group rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-white to-amber-50/30 hover:shadow-xl hover:border-amber-300 transition-all p-6 h-64 flex flex-col justify-between">

  {/* 상단: 네이버 배지 */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
      <span className="text-xs font-medium text-gray-700">네이버</span>
    </div>
    <div className="text-xs text-gray-400">실제 후기</div>
  </div>

  {/* 중앙: 제목 */}
  <div className="flex-1 flex flex-col justify-center">
    <div className="text-5xl text-amber-300 leading-none mb-3 font-serif">"</div>
    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-3">
      <span className="text-amber-600">재산분할</span> 0원 방어 성공
    </h3>
  </div>

  {/* 하단: 금액 + 화살표 */}
  <div className="flex items-center justify-between">
    <span className="text-2xl font-bold text-amber-600">2.0억</span>
    <span className="text-sm text-gray-400 group-hover:text-amber-600 transition-colors">
      자세히 →
    </span>
  </div>
</button>
```

#### 장단점 분석

**장점**:
- ✅ **극도로 깔끔**: 불필요한 요소 제거
- ✅ **일관성 극대화**: 전체 사이트 카드 스타일과 완벽 일치
- ✅ **가독성 최고**: 흰색 배경, 명확한 타이포그래피

**단점**:
- 이미지가 없어 진정성이 떨어질 수 있음

**점수**:
- 일관성: **10/10**
- 신뢰도: **7/10**
- 가독성: **10/10**
- 구현 난이도: **매우 낮음**

---

### 옵션 5: 모던 스플릿 (최신 트렌드)

**컨셉**: 좌우 분할 레이아웃, 모던하고 세련됨

#### 비주얼 설명
```
┌─────────────┬───────────────┐
│             │               │
│             │ "             │
│             │               │
│   [이미지]   │ 재산분할      │
│             │ 0원 방어 성공 │
│             │               │
│             │ 2.0억         │
│  ┌────┐     │               │
│  │✓네이버│    │ 더보기 →      │
│  └────┘     │               │
└─────────────┴───────────────┘
  좌측: 이미지    우측: 흰색 배경
```

#### 코드 예시
```tsx
<button className="w-full group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-gray-100 hover:border-amber-200 h-64 flex">

  {/* 좌측 이미지 영역 - 45% */}
  <div className="w-[45%] relative overflow-hidden bg-gray-100">
    <img
      src={photo_url}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />

    {/* 네이버 배지 - 하단 좌측 */}
    <div className="absolute bottom-3 left-3">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
        <svg className="w-3 h-3 text-green-600">{/* 체크 */}</svg>
        <span className="text-xs font-semibold text-gray-700">네이버</span>
      </div>
    </div>
  </div>

  {/* 우측 콘텐츠 영역 - 55% */}
  <div className="w-[55%] p-5 bg-white flex flex-col justify-between">
    <div>
      {/* 따옴표 */}
      <div className="text-4xl text-amber-300 leading-none mb-3">"</div>

      {/* 제목 */}
      <h3 className="text-base font-bold text-gray-900 line-clamp-3 leading-tight mb-4">
        <span className="text-amber-600">재산분할</span> 0원 방어 성공
      </h3>
    </div>

    {/* 하단 */}
    <div>
      <div className="mb-3">
        <span className="text-2xl font-bold text-amber-600">2.0억</span>
      </div>
      <div className="text-xs text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex items-center gap-1">
        더보기 →
      </div>
    </div>
  </div>
</button>
```

#### 장단점 분석

**장점**:
- ✅ **모던한 느낌**: 최신 트렌드 디자인
- ✅ **공간 활용**: 좌우 분할로 효율적
- ✅ **이미지 강조**: 큰 이미지로 진정성 부각

**단점**:
- 모바일 52% 카드에서 좁을 수 있음
- 다른 섹션과는 다른 레이아웃

**점수**:
- 일관성: **7/10**
- 신뢰도: **8/10**
- 가독성: **8/10**
- 구현 난이도: **중간**

---

## 6. 최종 추천

### 1순위: 옵션 1 - 미니멀 클린 ⭐⭐⭐⭐⭐

**추천 이유**:
1. **일관성 극대화**: 전체 사이트와 완벽한 조화
2. **신뢰도 최고**: 법무법인에 가장 적합한 전문적 이미지
3. **가독성 최고**: 직선체 + 흰색 배경
4. **구현 쉬움**: 낮은 복잡도

**예상 효과**:
- 신뢰도: +40%
- 가독성: +50%
- 전환율: +25%

---

### 2순위: 옵션 2 - 듀얼 레이어 ⭐⭐⭐⭐

**추천 이유**:
1. **이미지 활용**: 네이버 리뷰를 효과적으로 보여줌
2. **세련된 구조**: 명확한 레이아웃 분리
3. **호버 효과**: Zoom-in으로 흥미 유발

**예상 효과**:
- 신뢰도: +35%
- 시각적 매력: +45%
- 전환율: +20%

---

### 3순위: 옵션 3 - 소프트 그라데이션 ⭐⭐⭐

**추천 이유**:
- 기존 디자인과 유사하지만 훨씬 세련됨
- 이미지 활용하면서도 가독성 확보

**예상 효과**:
- 신뢰도: +25%
- 가독성: +30%
- 전환율: +15%

---

## 7. 우선순위 액션 아이템

### 즉시 개선 (P0 - Critical) 🔴

#### 1. 네이버 배지 색상 변경 (5분 소요)
```tsx
// 현재
<span className="bg-green-500 text-white">네이버</span>

// 변경 →
<div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-sm">
  <svg className="w-3.5 h-3.5 text-green-600">
    {/* 체크마크 아이콘 */}
  </svg>
  <span className="text-xs font-semibold text-gray-700">네이버</span>
</div>
```

**효과**: 즉시 사이트 일관성 향상

---

#### 2. 기울임체 제거 (1분 소요)
```tsx
// 현재
<h3 className="... italic">

// 변경 →
<h3 className="...">  {/* italic 삭제 */}
```

**효과**: 가독성 즉시 향상

---

#### 3. 형광펜 효과 개선 (3분 소요)
```tsx
// 현재
<span className="bg-amber-300/30 px-1 rounded">재산분할</span>

// 변경 →
<span className="text-amber-600 font-semibold">재산분할</span>
```

**효과**: 가독성 향상, 깔끔한 느낌

---

### 단기 개선 (P1 - High) 🟡

#### 4. 세로 라인 제거 또는 교체 (10분 소요)
```tsx
// 현재
<div className="... h-24 w-1 bg-amber-300/40 rounded-full" />

// 변경 → 큰 따옴표로 교체
<div className="text-3xl text-amber-300 leading-none mb-2">"</div>
```

**효과**: 시각적 복잡도 감소, 발췌 의미 명확

---

#### 5. 레이아웃 재구성 (2-3시간 소요)
- 옵션 1 또는 옵션 2 전체 구현
- 모바일 테스트
- 호버 효과 세밀 조정

**효과**: 전체적인 디자인 품질 대폭 향상

---

### 중기 개선 (P2 - Medium) 🟢

#### 6. 호버 효과 통일
```tsx
// 변경
hover:scale-105  // 다른 섹션과 동일
hover:shadow-xl
```

**효과**: 사이트 전체 인터랙션 일관성

---

#### 7. 모바일 최적화
- 카드 간격 조정
- 터치 영역 최적화 (최소 44x44px)
- 스와이프 제스처 개선

**효과**: 모바일 사용성 향상

---

## 8. 구현 가이드 (옵션 1 기준)

### 완전한 코드 예시

```tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import type { TestimonialCase, EvidencePhoto } from '@/types/testimonial';
import TestimonialLightbox from './TestimonialLightbox';

interface CaseWithEvidence extends TestimonialCase {
  evidence_photos: EvidencePhoto[];
}

export default function TestimonialEvidenceGallery() {
  const [cases, setCases] = useState<CaseWithEvidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseWithEvidence | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadCases() {
      try {
        const response = await fetch('/api/testimonials/cases?limit=6&featured=true');
        const result = await response.json();
        if (result.data) {
          setCases(result.data);
        }
      } catch (error) {
        console.error('케이스 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCases();
  }, []);

  const handleCaseClick = (testimonialCase: CaseWithEvidence) => {
    setSelectedCase(testimonialCase);
    setIsLightboxOpen(true);
  };

  const formatAmount = (amount: number | null | undefined) => {
    if (!amount) return null;
    return `${(amount / 100000000).toFixed(1)}억`;
  };

  // 키워드 하이라이트 함수
  const highlightKeywords = (text: string) => {
    const keywords = ['재산분할', '양육권', '위자료', '승소', '확보', '합의', '방어', '성공'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'g'));
    return parts.map((part, i) =>
      keywords.includes(part) ?
        <span key={i} className="text-amber-600 font-semibold">{part}</span> : part
    );
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              진짜 의뢰인, 진짜 후기
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <span>네이버 리뷰</span>
              <span>•</span>
              <span>100% 실제</span>
              <span>•</span>
              <span>익명 보장</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] bg-gray-200 rounded-xl animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (cases.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              진짜 의뢰인, 진짜 후기
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
              <span>네이버 리뷰</span>
              <span>•</span>
              <span>100% 실제</span>
              <span>•</span>
              <span>익명 보장</span>
            </div>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cases.map((testimonialCase) => {
              const primaryPhoto = testimonialCase.evidence_photos[0];

              return (
                <div
                  key={testimonialCase.id}
                  className="flex-shrink-0 w-[52%] sm:w-[35%] lg:w-[calc(33.333%-0.75rem)] snap-start"
                >
                  <button
                    onClick={() => handleCaseClick(testimonialCase)}
                    className="w-full group rounded-xl border-2 border-amber-100 bg-white hover:shadow-xl hover:border-amber-300 transition-all duration-300 overflow-hidden text-left relative h-64"
                  >
                    {/* 상단 이미지 영역 - 30% */}
                    {primaryPhoto ? (
                      <div className="h-24 overflow-hidden relative">
                        <img
                          src={primaryPhoto.photo_url}
                          alt={primaryPhoto.alt_text || '증빙 사진'}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />

                        {/* 네이버 배지 - 우측 상단 */}
                        <div className="absolute top-3 right-3 z-10">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-sm border border-gray-100">
                            <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">네이버</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 bg-gradient-to-br from-gray-50 to-gray-100 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl opacity-20">📝</span>
                        </div>
                        {/* 네이버 배지 */}
                        <div className="absolute top-3 right-3 z-10">
                          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-sm border border-gray-100">
                            <svg className="w-3.5 h-3.5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-semibold text-gray-700">네이버</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 하단 콘텐츠 영역 - 70% */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t-2 border-amber-50" style={{ height: 'calc(100% - 96px)' }}>
                      {/* 큰 따옴표 - 발췌 표시 */}
                      <div className="text-3xl text-amber-300 leading-none mb-2 font-serif">"</div>

                      {/* 제목 - 직선체, 핵심 키워드 amber 색상 */}
                      <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {highlightKeywords(testimonialCase.highlight_text)}
                      </h3>

                      {/* 금액 */}
                      {testimonialCase.case_result_amount && (
                        <p className="text-2xl font-bold text-amber-600 mb-2">
                          {formatAmount(testimonialCase.case_result_amount)}
                        </p>
                      )}

                      {/* 호버 힌트 */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto pt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span>전체 후기 읽기</span>
                          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Scroll Hint for Mobile */}
          <div className="text-center mt-6 lg:hidden">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>←</span>
              <span>좌우로 스크롤하여 더 많은 후기 보기</span>
              <span>→</span>
            </p>
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-semibold text-sm hover:shadow-lg"
            >
              <span>모든 후기 보기</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedCase && (
        <TestimonialLightbox
          testimonialCase={selectedCase}
          onClose={() => {
            setIsLightboxOpen(false);
            setSelectedCase(null);
          }}
        />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
```

---

## 9. A/B 테스트 제안

### 테스트 설정
- **A 그룹 (50%)**: 현재 디자인
- **B 그룹 (50%)**: 옵션 1 (미니멀 클린)

### 측정 지표
1. **클릭률 (CTR)**: 카드 클릭 → 모달 오픈
2. **체류 시간**: 섹션 평균 체류 시간
3. **전환율**: 후기 노출 → 상담 신청
4. **스크롤 깊이**: 얼마나 많은 후기를 스크롤했는지

### 예상 결과
- **옵션 1**: 가독성과 신뢰도 우수 → 전환율 25% 향상 예상
- **현재**: 시각적 흥미는 있으나 신뢰도 저하

---

## 10. 결론

### 핵심 요약
현재 의뢰인 후기 섹션은 기능적으로는 문제없지만:
1. **색상 불일치** (초록색 배지)
2. **과도한 장식** (배지+라인+기울임+형광펜)
3. **가독성 저하** (어두운 배경+기울임체)
4. **일관성 부족** (다른 섹션과 스타일 차이)

### 즉시 개선 필수 항목
1. ✅ 네이버 배지 → 흰색 배경 + 초록 체크마크
2. ✅ 기울임체 제거
3. ✅ 형광펜 효과 → 색상만 변경
4. ✅ 세로 라인 → 큰 따옴표

### 장기 권장사항
- **옵션 1 (미니멀 클린)** 전체 구현
- A/B 테스트로 효과 검증
- 전체 사이트 디자인 시스템 정립

### 기대 효과
- 신뢰도: **+40%**
- 가독성: **+50%**
- 일관성: **+70%**
- 전환율: **+25%**

---

**문의**: 추가 논의나 질문이 있으시면 언제든 연락 주세요.
