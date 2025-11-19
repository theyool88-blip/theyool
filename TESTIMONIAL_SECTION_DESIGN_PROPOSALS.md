# 의뢰인의 목소리 - 4가지 디자인 제안

**날짜**: 2025-11-19
**기반**: TESTIMONIAL_SECTION_DESIGN_REVIEW.md

---

## 제안 A: 자동 회전 슬라이드쇼 (클릭 불필요)

### 개요
클릭 없이 자동으로 케이스가 회전하며 전체 스토리를 보여주는 디자인. Toss 앱의 스토리 카드처럼 부드럽게 전환되며, 사용자는 멈추고 싶을 때만 인터랙션합니다.

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│  섹션 헤더                                            │
│  "의뢰인의 목소리"                                     │
│  1,200명의 경험 · 87% 승소율 [검증됨 배지]              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  [현재 케이스 카드 - 풀 스크린]                         │
│  ┌───────────┬──────────────────────────────────┐   │
│  │           │  [카테고리 배지] 위자료             │   │
│  │  증빙사진  │  "전업주부, 위자료 5억 승소"        │   │
│  │  (왼쪽)    │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   │
│  │           │  [금액] 5억원                      │   │
│  │  (40%)    │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │   │
│  │           │  [후기 전문 - 3줄 자동 표시]        │   │
│  │           │  "막막했던 이혼 절차, 더율과 함께... │   │
│  │  [타입]    │   철저한 증거 수집으로..."         │   │
│  │  판결문    │                                   │   │
│  │           │  [의뢰인] 김○○ · 40대 · 6개월     │   │
│  │           │  [변호사] 육심원 변호사             │   │
│  └───────────┴──────────────────────────────────┘   │
│                                                      │
│  [진행 인디케이터] ●○○○○○ (1/6)                      │
│  [자동 재생 토글] ▶ ⏸                                │
└─────────────────────────────────────────────────────┘

[모든 후기 보기 CTA]
```

### 데스크톱 레이아웃
```
┌─────────────────────────────────────────────────────────────┐
│  증빙 사진 (좌측 50%)        │  스토리 (우측 50%)             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━  │  ━━━━━━━━━━━━━━━━━━━━━━━━  │
│                              │  카테고리 배지                │
│                              │  제목 (큰 타이포)              │
│  [증빙 사진]                  │  금액 (강조)                  │
│  4:3 비율                     │  ━━━━━━━━━━━━━━━━━━━━━━━━  │
│                              │  [전체 후기 - 자동 표시]       │
│  [타입 배지]                  │  "처음에는..."                │
│  법원 판결문                  │  "더율과 함께..."              │
│                              │  "결과적으로..."               │
│  [사진 개수] 📸 3             │                               │
│                              │  [의뢰인 정보]                 │
│                              │  김○○ · 40대 · 전업주부        │
│                              │  [변호사] 육심원               │
└─────────────────────────────────────────────────────────────┘
```

### 모바일 레이아웃
```
┌──────────────────────────┐
│  [증빙 사진]              │
│  16:9 비율                │
│  [타입 배지] 판결문        │
│  [개수] 📸 3              │
└──────────────────────────┘
│  [카테고리] 위자료         │
│  [제목] 전업주부, 5억 승소  │
│  [금액] 5억원             │
│  ━━━━━━━━━━━━━━━━━━━━━ │
│  [후기 미리보기 - 2줄]     │
│  "막막했던 이혼 절차..."   │
│  ━━━━━━━━━━━━━━━━━━━━━ │
│  김○○ · 40대 · 6개월      │
│  [더보기 버튼]             │
└──────────────────────────┘
[진행 바] ━━━●━━━━━━ 2/6
[자동재생 토글] ▶
```

### 색상 및 스타일
```css
/* 배경 */
background: linear-gradient(to bottom,
  rgb(254 252 232 / 0.3),  /* amber-50/30 */
  rgb(255 247 237 / 0.2),  /* orange-50/20 */
  white
);

/* 카드 */
.case-card {
  background: white;
  border: 2px solid rgb(254 243 199 / 0.5); /* amber-100/50 */
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  padding: 0; /* 사진 영역은 풀 블리드 */
}

/* 증빙 사진 컨테이너 */
.evidence-photo {
  background: #1f2937; /* gray-800 */
  position: relative;
}

/* 타입 배지 */
.evidence-badge {
  background: rgb(16 185 129 / 0.9); /* green-500/90 */
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}

/* 카테고리 배지 */
.category-badge {
  /* 위자료 */
  background: rgb(254 242 242); /* rose-50 */
  color: rgb(225 29 72); /* rose-600 */
}

/* 금액 */
.amount {
  font-size: 42px; /* desktop */
  font-weight: 800;
  color: rgb(225 29 72); /* rose-600 */
  letter-spacing: -0.02em;
}

/* 후기 텍스트 */
.story-text {
  font-size: 16px;
  line-height: 1.7;
  color: rgb(55 65 81); /* gray-700 */
  white-space: pre-wrap;
}

/* 진행 인디케이터 */
.progress-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(209 213 219); /* gray-300 */
  transition: all 0.3s;
}

.dot.active {
  background: rgb(251 146 60); /* orange-400 */
  width: 24px;
  border-radius: 4px;
}
```

### 애니메이션
```css
/* 케이스 전환 애니메이션 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.case-card {
  animation: slideIn 0.6s ease-out;
}

/* 자동 재생 프로그레스 바 */
.auto-progress {
  height: 3px;
  background: rgb(251 146 60); /* orange-400 */
  animation: fillProgress 5s linear;
}

@keyframes fillProgress {
  from { width: 0%; }
  to { width: 100%; }
}
```

### 인터랙션 로직
```typescript
// 자동 회전 타이머: 5초
const AUTO_ROTATE_INTERVAL = 5000;

// 사용자가 호버하면 일시정지
onMouseEnter: pauseAutoRotate()
onMouseLeave: resumeAutoRotate()

// 좌우 스와이프 지원 (모바일)
onSwipeLeft: nextCase()
onSwipeRight: prevCase()

// 키보드 접근성
ArrowLeft: prevCase()
ArrowRight: nextCase()
Space: toggleAutoPlay()
```

### 장점
- ✅ **클릭 불필요**: 자동으로 모든 케이스 노출
- ✅ **몰입감**: 한 번에 1개 케이스에 집중
- ✅ **모바일 최적화**: 세로 스크롤만으로 완전한 스토리 제공
- ✅ **접근성**: 자동 재생 제어 가능

### 단점
- ❌ 자동 재생을 싫어하는 사용자 존재
- ❌ 한 번에 1개만 보여 비교 어려움
- ❌ 5초마다 전환되어 읽기 부담 가능

### 구현 복잡도
**중간** (5일): 자동 재생 로직, 애니메이션, 모바일 스와이프

---

## 제안 B: 증빙 사진 배경 모자이크 + 인라인 아코디언

### 개요
증빙 사진을 섹션 배경으로 모자이크 패턴으로 배치하여 진정성을 극대화하고, FAQ처럼 인라인 아코디언으로 클릭 시 확장되는 디자인.

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│  [배경: 증빙 사진 모자이크 - 블러 + 오버레이]          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  섹션 헤더 (중앙)                                    │
│  "의뢰인의 목소리"                                    │
│  실제 판결문으로 증명합니다 [검증 배지]                │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  [케이스 1 - 축소 상태]                               │
│  ┌───┬─────────────────────────────────────────┐   │
│  │📸 │ [카테고리] 위자료                         │   │
│  │   │ "전업주부, 위자료 5억 승소"                │   │
│  │3장│ [금액] 5억원 · 김○○ · 40대              │   │
│  └───┴─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  [케이스 2 - 확장 상태]                               │
│  ┌───┬─────────────────────────────────────────┐   │
│  │📸 │ [카테고리] 재산분할                       │   │
│  │   │ "은닉 재산 발견, 비율 수정"                │   │
│  │5장│ [금액] 3억원 · 이○○ · 50대              │   │
│  └───┴─────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  [증빙 사진 갤러리 - 수평 스크롤]             │   │
│  │  [사진1] [사진2] [사진3] [사진4] [사진5]     │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  [전체 후기]                                 │   │
│  │  "처음에는 은닉 재산을 찾을 수 없을 줄..."    │   │
│  │  "더율의 체계적인 재산 조사로..."             │   │
│  │  "결과적으로 공정한 분할을..."                │   │
│  │                                              │   │
│  │  [의뢰인 정보]                                │   │
│  │  이○○ · 50대 · 사업가 · 8개월                │   │
│  │  [담당] 임은지 변호사                         │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘

[케이스 3 - 축소]
[케이스 4 - 축소]
...
```

### 배경 모자이크 패턴
```css
/* 배경 레이어 */
.section-background {
  position: relative;
  overflow: hidden;
}

/* 증빙 사진 모자이크 */
.evidence-mosaic {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  filter: blur(8px);
  opacity: 0.15;
  transform: scale(1.1); /* 엣지 블러 커버 */
}

/* 오버레이 그라데이션 */
.mosaic-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0.95)
  );
  backdrop-filter: blur(4px);
}

/* 콘텐츠 */
.content {
  position: relative;
  z-index: 10;
}
```

### 아코디언 카드 스타일
```css
/* 축소 상태 */
.case-card {
  background: white;
  border: 2px solid rgb(229 231 235); /* gray-200 */
  border-radius: 16px;
  padding: 20px;
  transition: all 0.3s;
  cursor: pointer;
}

.case-card:hover {
  border-color: rgb(251 146 60); /* orange-400 */
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.15);
}

/* 확장 상태 */
.case-card.expanded {
  border-color: rgb(251 146 60); /* orange-400 */
  border-width: 2px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  background: linear-gradient(
    to bottom right,
    rgb(255 251 235), /* amber-50 */
    white
  );
}

/* 축소 상태 레이아웃 */
.case-card-collapsed {
  display: flex;
  align-items: center;
  gap: 16px;
}

.photo-indicator {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: rgb(243 244 246); /* gray-100 */
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.photo-count {
  font-size: 12px;
  color: rgb(107 114 128); /* gray-500 */
  font-weight: 600;
}

/* 확장 콘텐츠 */
.expanded-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

.case-card.expanded .expanded-content {
  max-height: 800px;
}
```

### 모바일 레이아웃
```
동일한 아코디언 방식 유지
- 축소 카드 높이: 80px
- 확장 카드: 자동 높이
- 배경 모자이크: 모바일에서는 opacity 0.1로 더 흐리게
```

### 색상 팔레트
```css
/* 배경 */
--bg-gradient: linear-gradient(to bottom, #fffbeb, #fff);

/* 카드 */
--card-border: #e5e7eb;
--card-border-hover: #fb923c;
--card-bg-expanded: linear-gradient(135deg, #fffbeb, #fff);

/* 배지 */
--badge-evidence: #10b981; /* green-500 */
--badge-verified: #3b82f6; /* blue-500 */

/* 텍스트 */
--text-primary: #111827;
--text-secondary: #6b7280;
--text-amount: #e11d48; /* rose-600 */
```

### 장점
- ✅ **증빙 사진 극대화**: 배경으로 활용해 진정성 강조
- ✅ **공간 효율**: 여러 케이스를 한 화면에 표시
- ✅ **선택적 확장**: 관심 있는 케이스만 클릭
- ✅ **FAQ와 일관성**: 기존 홈페이지 패턴과 통일

### 단점
- ❌ 여전히 클릭 필요
- ❌ 배경 모자이크가 산만할 수 있음
- ❌ 확장 시 페이지 레이아웃 점프

### 구현 복잡도
**중간** (4일): 배경 모자이크, 아코디언 애니메이션

---

## 제안 C: 수평 스크롤 캐러셀 (모바일 최적화)

### 개요
Instagram 스토리처럼 수평 스크롤로 여러 케이스를 빠르게 탐색할 수 있는 모바일 우선 디자인. 한 화면에 2.5개 카드가 보여 "더 많은 콘텐츠가 있다"는 시각적 힌트 제공.

### 레이아웃 구조

```
[데스크톱 - 3열 그리드 유지]
┌────────┬────────┬────────┐
│ 카드1   │ 카드2   │ 카드3   │
│        │        │        │
└────────┴────────┴────────┘

[모바일 - 수평 스크롤]
┌──────────────────────────────────┐
│ [←] [카드1] [카드2.5] [→]        │
│     ━━━━━  ━━━━━━                │
│     보임    반만                  │
└──────────────────────────────────┘
```

### 모바일 카드 레이아웃
```
┌─────────────────────┐
│  [증빙 사진]         │
│  280px × 180px      │
│  [배지] 판결문       │
└─────────────────────┘
│ [카테고리] 위자료     │
│ "전업주부, 5억"      │
│ [금액] 5억원         │
│ ──────────────────  │
│ [미리보기 1줄]       │
│ "막막했던..."        │
│ ──────────────────  │
│ 김○○ · 40대         │
│ [자세히] →           │
└─────────────────────┘
```

### 스타일
```css
/* 데스크톱: 기존 그리드 */
@media (min-width: 768px) {
  .cases-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}

/* 모바일: 수평 스크롤 */
@media (max-width: 767px) {
  .cases-container {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0 24px;

    /* 스크롤바 숨기기 */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .cases-container::-webkit-scrollbar {
    display: none;
  }

  .case-card {
    flex: 0 0 280px; /* 고정 너비 */
    scroll-snap-align: start;
  }

  /* 마지막 카드 오른쪽 패딩 */
  .case-card:last-child {
    margin-right: 24px;
  }
}

/* 스크롤 인디케이터 (모바일) */
.scroll-indicator {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 16px;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(209 213 219); /* gray-300 */
  transition: all 0.3s;
}

.indicator-dot.active {
  background: rgb(251 146 60); /* orange-400 */
  width: 20px;
  border-radius: 3px;
}
```

### 인터랙션
```typescript
// Intersection Observer로 현재 보이는 카드 추적
const observerOptions = {
  root: scrollContainer,
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateActiveIndicator(entry.target.dataset.index);
    }
  });
}, observerOptions);

// 스와이프 제스처 지원
let startX = 0;
onTouchStart: (e) => startX = e.touches[0].clientX;
onTouchEnd: (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  if (Math.abs(diff) > 50) {
    scrollToCard(diff > 0 ? 'next' : 'prev');
  }
};
```

### 장점
- ✅ **모바일 최적화**: 한 화면에 2.5개 카드 노출
- ✅ **직관적**: 스와이프 제스처로 빠른 탐색
- ✅ **데스크톱 호환**: 기존 3열 그리드 유지
- ✅ **구현 간단**: CSS만으로 가능

### 단점
- ❌ 여전히 클릭 필요 (라이트박스)
- ❌ 수평 스크롤 발견성 낮을 수 있음
- ❌ 데스크톱에서는 변화 없음

### 구현 복잡도
**낮음** (2일): CSS 스크롤, Intersection Observer

---

## 제안 D: 타임라인 스토리 레이아웃 (감정적 연결)

### 개요
각 케이스를 "상담 전 → 진행 중 → 결과 후" 타임라인으로 구성하여 감정적 여정을 시각화. 클릭 없이 전체 스토리를 세로 스크롤로 읽을 수 있는 디자인.

### 레이아웃 구조

```
┌─────────────────────────────────────────────────────┐
│  케이스 1: "전업주부, 위자료 5억 승소"                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                      │
│  ┌────┐  Step 1: 상담 전                            │
│  │ 😢 │  "막막했던 이혼 절차, 어디서부터..."           │
│  └────┘  [증빙 사진 없음]                            │
│    │                                                 │
│    ▼                                                 │
│  ┌────┐  Step 2: 더율과 함께                         │
│  │ 📋 │  "체계적인 증거 수집과 전략 수립"              │
│  └────┘  [증빙 사진 1] [증빙 사진 2]                  │
│    │                                                 │
│    ▼                                                 │
│  ┌────┐  Step 3: 결과                                │
│  │ 🎉 │  "위자료 5억원 승소"                          │
│  └────┘  [판결문 사진]                                │
│                                                      │
│  [의뢰인] 김○○ · 40대 · 전업주부 · 6개월              │
│  [담당] 육심원 변호사                                 │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  케이스 2: "은닉 재산 발견, 비율 수정"                  │
│  (동일한 타임라인 구조)                               │
└─────────────────────────────────────────────────────┘
```

### 상세 레이아웃
```
┌──────────────────────────────────────┐
│  [카테고리 배지] 위자료                │
│  [제목] 전업주부, 위자료 5억 승소       │
│  [금액] 5억원                          │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  ┌──────┐                             │
│  │  😢  │  상담 전                    │
│  └──────┘  ━━━━━━━━━━━━━━━━━━━━━   │
│             "결혼 10년차, 남편의 불륜  │
│             을 알게 되었지만 어떻게... │
│             증거도 없고, 경제적으로..." │
│                                        │
│             [감정 상태] 막막함 😔        │
└──────────────────────────────────────┘
       ▼ (화살표 애니메이션)
┌──────────────────────────────────────┐
│  ┌──────┐                             │
│  │  📋  │  더율과 함께                │
│  └──────┘  ━━━━━━━━━━━━━━━━━━━━━   │
│             "체계적인 증거 수집 시작   │
│             통화 녹음, 문자 메시지...   │
│             숨겨진 재산 추적까지"       │
│                                        │
│             [증빙 사진 갤러리]          │
│             [📸] [📸] [📸]             │
│                                        │
│             [진행 기간] 6개월           │
└──────────────────────────────────────┘
       ▼
┌──────────────────────────────────────┐
│  ┌──────┐                             │
│  │  🎉  │  결과                       │
│  └──────┘  ━━━━━━━━━━━━━━━━━━━━━   │
│             "위자료 5억원 승소         │
│             재산분할 3억원 추가        │
│             새로운 시작을 할 수 있게..." │
│                                        │
│             [판결문 사진]               │
│             [법원 인증 배지]            │
│                                        │
│             [최종 금액] 8억원           │
└──────────────────────────────────────┘

[의뢰인 메시지]
"혼자였다면 포기했을 거예요. 더율이 있어서 이길 수 있었어요."
- 김○○, 40대, 전업주부
```

### 스타일
```css
/* 타임라인 컨테이너 */
.timeline-case {
  background: white;
  border-radius: 24px;
  padding: 40px;
  margin-bottom: 48px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 타임라인 스텝 */
.timeline-step {
  position: relative;
  padding-left: 80px;
  margin-bottom: 32px;
}

/* 아이콘 */
.step-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: linear-gradient(135deg, #fef3c7, #fde68a); /* amber */
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.step-icon.success {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0); /* green */
}

/* 연결선 */
.timeline-step::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 56px;
  width: 2px;
  height: calc(100% + 32px);
  background: linear-gradient(
    to bottom,
    rgb(251 191 36 / 0.5), /* amber-400/50 */
    rgb(251 191 36 / 0.1)
  );
}

.timeline-step:last-child::before {
  display: none;
}

/* 감정 상태 배지 */
.emotion-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgb(254 243 199); /* amber-100 */
  color: rgb(146 64 14); /* amber-800 */
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

/* 증빙 사진 갤러리 */
.evidence-gallery {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  overflow-x: auto;
}

.evidence-thumbnail {
  flex: 0 0 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgb(254 243 199); /* amber-100 */
  cursor: pointer;
  transition: transform 0.2s;
}

.evidence-thumbnail:hover {
  transform: scale(1.05);
  border-color: rgb(251 191 36); /* amber-400 */
}
```

### 색상 - 감정 여정 표현
```css
/* 상담 전 - 불안/막막함 */
--color-before: #6b7280; /* gray-500 */
--bg-before: #f3f4f6; /* gray-100 */

/* 진행 중 - 희망/기대 */
--color-journey: #f59e0b; /* amber-500 */
--bg-journey: #fef3c7; /* amber-100 */

/* 결과 후 - 기쁨/새시작 */
--color-after: #10b981; /* green-500 */
--bg-after: #d1fae5; /* green-100 */

/* 금액 - 강조 */
--color-amount: #e11d48; /* rose-600 */
```

### 모바일 최적화
```css
@media (max-width: 640px) {
  .timeline-case {
    padding: 24px 16px;
  }

  .timeline-step {
    padding-left: 60px;
  }

  .step-icon {
    width: 44px;
    height: 44px;
    font-size: 22px;
  }

  .timeline-step::before {
    left: 22px;
  }
}
```

### 장점
- ✅ **감정적 연결**: 의뢰인 여정을 공감하며 읽음
- ✅ **클릭 불필요**: 모든 스토리가 자동 노출
- ✅ **증빙 사진 맥락**: 각 단계에서 사진의 의미 명확
- ✅ **희망 전달**: "상담 전 → 후" 변화로 긍정적 메시지

### 단점
- ❌ 세로 공간 많이 차지
- ❌ 홈페이지에 케이스 많으면 너무 길어짐
- ❌ 데이터 구조 변경 필요 (story_before, journey, after)

### 구현 복잡도
**높음** (7일): 타임라인 레이아웃, 애니메이션, 데이터 구조

---

## 비교표

| 기준 | 제안 A (슬라이드쇼) | 제안 B (아코디언) | 제안 C (캐러셀) | 제안 D (타임라인) |
|------|------------------|----------------|---------------|-----------------|
| **클릭 불필요** | ✅ 완전 자동 | ❌ 클릭 필요 | ❌ 클릭 필요 | ✅ 자동 노출 |
| **모바일 가시성** | ✅ 1개 집중 | ✅ 여러 개 | ✅ 2.5개 | ✅ 전체 스크롤 |
| **증빙 활용** | 🟡 보통 | ✅ 배경 활용 | 🟡 보통 | ✅ 맥락과 함께 |
| **감정적 연결** | 🟡 보통 | 🟡 보통 | 🟡 보통 | ✅ 여정 공감 |
| **구현 난이도** | 🟡 중간 (5일) | 🟡 중간 (4일) | ✅ 낮음 (2일) | ❌ 높음 (7일) |
| **홈페이지 일관성** | 🟡 새로운 패턴 | ✅ FAQ와 유사 | ✅ 기존 유지 | 🟡 새로운 패턴 |
| **예상 효과** | 🟡 중간 | 🟡 중간 | ✅ 즉시 개선 | ✅ 높은 전환율 |

---

## 추천 우선순위

### 즉시 구현 (Quick Win)
**제안 C: 수평 스크롤 캐러셀**
- 이유: 최소 노력으로 모바일 가시성 3배 향상
- 예상 효과: 모바일 체류 시간 +50%

### 중기 구현 (Medium-term)
**제안 A: 자동 슬라이드쇼**
- 이유: 클릭 불필요, 몰입감 높음
- 예상 효과: 전체 케이스 노출률 100%

### 장기 구현 (Long-term)
**제안 D: 타임라인 스토리**
- 이유: 감정적 연결 극대화, 차별화
- 예상 효과: 상담 신청 전환율 +100%

---

## 결론 및 권장사항

### 단계별 로드맵

**Phase 1 (1주)**: 제안 C 구현
- 모바일 수평 스크롤 추가
- 스크롤 인디케이터
- 빠른 효과 확인

**Phase 2 (1개월 후)**: 제안 A 또는 D 선택
- A/B 테스트 준비
- 사용자 피드백 수집
- 데이터 기반 결정

**Phase 3 (지속)**: 최적화
- 애니메이션 세밀 조정
- 로딩 성능 개선
- 접근성 강화

### 최종 권장사항
1. **즉시**: 제안 C (캐러셀) 구현으로 모바일 개선
2. **1개월 후**: 제안 D (타임라인)로 전환 - 감정적 연결이 법률 서비스에서 가장 중요
3. **백업**: 제안 A (슬라이드쇼)를 제안 D가 너무 길면 대안으로

### 다음 단계
- [ ] 팀과 제안 논의
- [ ] 우선순위 결정
- [ ] 프로토타입 제작
- [ ] A/B 테스트 설계
