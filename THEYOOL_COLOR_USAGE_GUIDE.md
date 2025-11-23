# 법무법인 더율 색상 사용 가이드

**버전**: 1.0
**최종 업데이트**: 2025-01-20

---

## 빠른 참조 (Quick Reference)

### 자주 사용하는 색상
```css
/* Primary CTA 버튼 */
background: #a8826f;  /* theyool-rose-500 */
hover: #967360;       /* theyool-rose-600 */

/* 텍스트 */
text: #1d1d1f;        /* theyool-gray-900 */
secondary: #6e6e73;   /* theyool-gray-600 */

/* 배경 */
page-bg: #fffcf9;     /* theyool-cream-50 */
card-bg: white;
```

---

## 1. 컴포넌트별 색상 적용

### 1.1 버튼 (Buttons)

#### Primary Button (주요 액션)
```jsx
// Tailwind 클래스 사용
<button className="bg-theyool-rose-500 hover:bg-theyool-rose-600 active:bg-theyool-rose-700 text-white">
  상담 예약하기
</button>

// 인라인 스타일 사용
<button
  className="text-white"
  style={{ backgroundColor: '#a8826f' }}
  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#967360'}
  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#a8826f'}
>
  상담 예약하기
</button>

// CSS Variables 사용
<button style={{
  backgroundColor: 'var(--theyool-rose-500)',
  color: 'white'
}}>
  상담 예약하기
</button>
```

#### Secondary Button (보조 액션)
```jsx
<button className="bg-theyool-gray-900 hover:bg-theyool-gray-800 text-white">
  자세히 보기
</button>
```

#### Tertiary Button (아웃라인)
```jsx
<button className="border-2 border-theyool-rose-500 text-theyool-rose-500 hover:bg-theyool-rose-50 bg-transparent">
  더 알아보기
</button>
```

#### 비활성 버튼
```jsx
<button className="bg-theyool-rose-100 text-theyool-gray-400 cursor-not-allowed">
  선택됨
</button>
```

---

### 1.2 폼 요소 (Forms)

#### 텍스트 입력
```jsx
<input
  type="text"
  className="
    border border-theyool-gray-300
    focus:border-theyool-rose-500
    focus:ring-2 focus:ring-theyool-rose-100
    rounded-lg
    px-4 py-2
    text-theyool-gray-900
    placeholder:text-theyool-gray-400
  "
  placeholder="연락처를 입력하세요"
/>
```

#### 에러 상태
```jsx
<input
  className="
    border border-red-500
    bg-red-50
    focus:border-red-500
    focus:ring-2 focus:ring-red-100
  "
/>
<p className="text-red-500 text-sm mt-1">
  필수 입력 항목입니다
</p>
```

#### 선택 상자 (Select)
```jsx
<select className="
  border border-theyool-gray-300
  focus:border-theyool-rose-500
  rounded-lg px-4 py-2
  text-theyool-gray-900
">
  <option>선택하세요</option>
</select>
```

---

### 1.3 카드 (Cards)

#### 기본 카드
```jsx
<div className="
  bg-white
  border border-theyool-gray-200
  rounded-2xl
  p-6
  hover:shadow-xl
  hover:border-theyool-rose-500
  transition-all
">
  카드 내용
</div>
```

#### 선택된 카드
```jsx
<div className="
  bg-theyool-rose-500
  text-white
  rounded-2xl
  p-6
  shadow-lg
">
  선택된 상태
</div>
```

#### 비활성 카드
```jsx
<div className="
  bg-theyool-rose-100
  border border-theyool-rose-200
  rounded-2xl
  p-6
  opacity-60
">
  비활성 상태
</div>
```

---

### 1.4 배지 (Badges)

#### 정보 배지
```jsx
<span className="
  inline-flex items-center gap-2
  px-4 py-2
  bg-theyool-rose-50
  text-theyool-rose-700
  rounded-full
  font-semibold
">
  <span className="w-2 h-2 bg-theyool-rose-600 rounded-full animate-pulse"></span>
  12년간 1,200건의 답
</span>
```

#### 무료 배지
```jsx
<span className="
  absolute -top-1.5 -right-1.5
  px-1.5 py-0.5
  bg-red-500
  text-white
  text-[9px]
  font-bold
  rounded
">
  10분 무료
</span>
```

---

### 1.5 네비게이션 (Navigation)

#### 헤더
```jsx
<header className="
  fixed top-0 left-0 right-0
  bg-white/95
  backdrop-blur-sm
  border-b border-theyool-gray-200
  z-[100]
">
  <nav className="flex items-center justify-between">
    {/* 로고 */}
    <Link href="/" className="text-theyool-gray-900 font-bold">
      법무법인 더율
    </Link>

    {/* 메뉴 */}
    <button className="
      text-theyool-gray-900
      hover:text-theyool-rose-500
      transition-colors
    ">
      상담예약
    </button>
  </nav>
</header>
```

#### 활성 메뉴
```jsx
<button className="
  text-theyool-rose-500
  bg-theyool-rose-50
  px-4 py-2
  rounded-lg
  font-semibold
">
  The Plan
</button>
```

---

### 1.6 섹션 배경 (Section Backgrounds)

#### 메인 페이지 배경
```jsx
<section className="bg-theyool-cream-50 py-16">
  {/* 내용 */}
</section>
```

#### 그라디언트 배경
```jsx
<section className="
  bg-gradient-to-b
  from-theyool-cream-50
  via-white
  to-theyool-cream-50
  py-24
">
  {/* 내용 */}
</section>
```

#### 히어로 섹션
```jsx
<section className="
  min-h-screen
  bg-gradient-to-b
  from-theyool-cream-50
  via-white
  to-white
  relative
">
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />

  {/* Content */}
  <div className="relative z-10">
    <h1 className="text-theyool-gray-900">복잡한 이혼, 10분이면 정리돼요</h1>
  </div>
</section>
```

---

## 2. 페이지별 색상 전략

### 2.1 홈페이지 (/)

#### 히어로 섹션
```jsx
<section className="bg-gradient-to-b from-theyool-cream-50 via-white to-white">
  <h1 className="text-theyool-gray-900 text-6xl font-bold">
    복잡한 이혼,<br />
    <span className="text-amber-600">10분이면 정리돼요</span>
  </h1>

  <button className="bg-theyool-gray-900 hover:bg-theyool-gray-800 text-white">
    10분 무료 진단 받기
  </button>
</section>
```

#### CTA 섹션
```jsx
<section className="bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20">
  <button className="bg-theyool-rose-500 hover:bg-theyool-rose-600 text-white">
    영상/방문 예약
  </button>

  <button className="bg-theyool-gray-900 hover:bg-theyool-gray-800 text-white">
    지금 바로 전화
  </button>
</section>
```

---

### 2.2 상담 예약 모달

#### 현재 구현 (ConsultationBookingModal.tsx)
```jsx
// 연락처 입력
<input
  className={`
    border
    ${phoneError ? 'border-red-500 bg-red-50' : 'border-theyool-gray-300'}
    focus:border-theyool-gray-900
  `}
/>

// 상담 방법 선택 - 선택됨
<button
  style={{
    backgroundColor: requestType === 'callback' ? '#a8826f' : '',
    borderColor: requestType === 'callback' ? '#a8826f' : ''
  }}
  className={`
    ${requestType === 'callback' ? 'text-white' : 'border-theyool-gray-300 bg-white'}
  `}
>
  전화
</button>

// 날짜 선택 - 선택됨
<button
  style={isSelected
    ? { backgroundColor: '#a8826f' }
    : { backgroundColor: '#f5f0ed' }  // theyool-rose-100
  }
  onMouseEnter={(e) => {
    if (!isSelected) e.currentTarget.style.backgroundColor = '#ebe3dd';  // theyool-rose-200
  }}
>
  {date.getDate()}
</button>

// 제출 버튼
<button className="bg-theyool-gray-900 hover:bg-theyool-gray-800 text-white">
  예약 확정
</button>
```

---

### 2.3 성공사례 페이지 (/cases)

핑크 계열 유지 (기존 디자인)
```jsx
<section className="bg-gradient-to-br from-pink-50 via-pink-100/50 to-pink-50">
  <div className="bg-pink-500 text-white rounded-2xl">
    성공사례 카드
  </div>
</section>
```

---

### 2.4 변호사 칼럼 (/blog)

앰버 계열 유지 (기존 디자인)
```jsx
<section className="bg-gradient-to-br from-amber-50 via-amber-100/50 to-amber-50">
  <div className="bg-amber-500 text-white rounded-2xl">
    칼럼 카드
  </div>
</section>
```

---

## 3. 접근성 체크리스트

### 3.1 텍스트 대비율
```jsx
// ✅ 적합 (4.5:1 이상)
<p className="text-theyool-gray-900">메인 텍스트</p>
<p className="text-theyool-gray-600">보조 텍스트</p>

// ❌ 부적합 (대비율 부족)
<p className="text-theyool-gray-300">너무 연한 텍스트</p>
<p className="text-theyool-rose-100">읽기 어려운 텍스트</p>
```

### 3.2 버튼 대비율
```jsx
// ✅ 적합
<button className="bg-theyool-rose-500 text-white">버튼</button>
<button className="bg-theyool-gray-900 text-white">버튼</button>

// ❌ 부적합
<button className="bg-theyool-rose-100 text-theyool-rose-200">버튼</button>
```

### 3.3 포커스 스타일
```jsx
<button className="
  focus:outline-none
  focus:ring-2
  focus:ring-theyool-rose-500
  focus:ring-offset-2
">
  접근 가능한 버튼
</button>
```

---

## 4. 모바일 최적화

### 4.1 터치 타겟 크기
```jsx
// ✅ 적합 (최소 44x44px)
<button className="px-6 py-3 min-h-[44px]">
  터치하기 쉬운 버튼
</button>

// ❌ 부적합 (너무 작음)
<button className="px-2 py-1">
  터치하기 어려운 버튼
</button>
```

### 4.2 모바일 전용 스타일
```jsx
<button className="
  text-sm md:text-base
  px-4 py-2.5 md:px-6 md:py-3
  bg-theyool-rose-500
  active:scale-98
  transition-transform
">
  반응형 버튼
</button>
```

---

## 5. 다크 모드 (향후 지원)

현재는 라이트 모드만 지원하지만, 향후 다크 모드 지원 시 아래 색상을 사용:

```css
/* 다크 모드 색상 (예정) */
--theyool-dark-bg: #1a1a1a;
--theyool-dark-card: #2a2a2a;
--theyool-dark-text: #f5f5f7;
--theyool-dark-text-secondary: #a1a1a1;
```

---

## 6. 실전 예시

### 6.1 상담 카드
```jsx
function ConsultationCard() {
  return (
    <div className="
      bg-white
      border-2 border-theyool-gray-200
      rounded-2xl
      p-6
      hover:border-theyool-rose-500
      hover:shadow-xl
      transition-all
      duration-300
    ">
      <h3 className="text-theyool-gray-900 text-2xl font-bold mb-4">
        전화 상담
      </h3>
      <p className="text-theyool-gray-600 mb-6">
        10분 무료 진단
      </p>
      <button className="
        w-full
        bg-theyool-rose-500
        hover:bg-theyool-rose-600
        text-white
        py-3
        rounded-lg
        font-semibold
        transition-colors
      ">
        1661-7633
      </button>
    </div>
  );
}
```

### 6.2 섹션 타이틀
```jsx
function SectionTitle({ children }) {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-theyool-rose-50 rounded-full mb-4">
        <span className="w-2 h-2 bg-theyool-rose-600 rounded-full animate-pulse" />
        <span className="text-theyool-rose-700 font-semibold">전문 서비스</span>
      </div>
      <h2 className="text-theyool-gray-900 text-4xl md:text-5xl font-bold">
        {children}
      </h2>
    </div>
  );
}
```

### 6.3 상태 메시지
```jsx
// 성공
<div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
  예약이 완료되었습니다
</div>

// 에러
<div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
  필수 항목을 입력해주세요
</div>

// 정보
<div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
  24시간 내에 연락드립니다
</div>

// 로즈 골드 강조
<div className="bg-theyool-rose-50 border border-theyool-rose-200 text-theyool-rose-800 p-4 rounded-lg">
  상담 준비가 완료되었습니다
</div>
```

---

## 7. 자주 하는 실수 (Don'ts)

### ❌ 과도한 로즈 골드 사용
```jsx
// 나쁜 예
<div className="bg-theyool-rose-500">
  <h1 className="text-theyool-rose-500">타이틀</h1>
  <p className="text-theyool-rose-500">본문</p>
  <button className="bg-theyool-rose-500">버튼</button>
</div>
```

### ✅ 적절한 색상 균형
```jsx
// 좋은 예
<div className="bg-theyool-cream-50">
  <h1 className="text-theyool-gray-900">타이틀</h1>
  <p className="text-theyool-gray-600">본문</p>
  <button className="bg-theyool-rose-500 text-white">버튼</button>
</div>
```

---

### ❌ 낮은 대비율
```jsx
// 나쁜 예
<p className="text-theyool-rose-200 bg-theyool-rose-100">
  읽기 어려운 텍스트
</p>
```

### ✅ 충분한 대비율
```jsx
// 좋은 예
<p className="text-theyool-gray-900 bg-white">
  읽기 쉬운 텍스트
</p>
```

---

### ❌ 여러 강조 색상 혼용
```jsx
// 나쁜 예
<section>
  <button className="bg-theyool-rose-500">버튼 1</button>
  <button className="bg-amber-500">버튼 2</button>
  <button className="bg-pink-500">버튼 3</button>
</section>
```

### ✅ 일관된 강조 색상
```jsx
// 좋은 예
<section>
  <button className="bg-theyool-rose-500">주요 액션</button>
  <button className="bg-theyool-gray-900">보조 액션</button>
  <button className="border-2 border-theyool-rose-500 bg-transparent">
    세 번째 액션
  </button>
</section>
```

---

## 8. 색상 테스트 체크리스트

디자인을 완성한 후 아래 항목을 확인하세요:

- [ ] 로즈 골드(#a8826f)가 주요 CTA 버튼에 사용되었는가?
- [ ] 크림 배경(#fffcf9)이 순백 대신 사용되었는가?
- [ ] 텍스트 대비율이 4.5:1 이상인가?
- [ ] 호버 상태가 명확하게 구분되는가?
- [ ] 모바일에서 터치 타겟이 44x44px 이상인가?
- [ ] 포커스 스타일이 명확한가?
- [ ] 비활성 요소가 시각적으로 구분되는가?
- [ ] 색상 사용이 과도하지 않은가?
- [ ] 각 섹션의 색상 테마가 일관적인가?
- [ ] 접근성 기준을 만족하는가?

---

## 9. 도움이 필요할 때

### 색상 선택 가이드
```
Primary Actions → theyool-rose-500
Secondary Actions → theyool-gray-900
Backgrounds → theyool-cream-50
Cards → white
Text → theyool-gray-900
Secondary Text → theyool-gray-600
Borders → theyool-gray-200
Hover → 한 단계 진한 색상 (500 → 600)
```

### 빠른 CSS 변환
```javascript
// Tailwind → Inline Style
className="bg-theyool-rose-500" → style={{ backgroundColor: '#a8826f' }}
className="text-theyool-gray-900" → style={{ color: '#1d1d1f' }}
className="border-theyool-rose-500" → style={{ borderColor: '#a8826f' }}
```

---

## 마무리

이 가이드는 법무법인 더율의 브랜드 정체성을 유지하면서도 사용자 경험을 최적화하기 위한 색상 사용 지침입니다.

궁금한 점이 있다면 `THEYOOL_COLOR_PALETTE.md`를 참고하거나, 디자인 팀에 문의하세요.
