# The Plan Page Redesign - Warm & Modern (Homepage-Aligned)

**Date**: 2025-11-19
**Direction**: Reference homepage design patterns for warm, empathetic, and modern feel
**Target Audience**: Clients in difficult divorce situations seeking professional yet approachable legal services

---

## Design Philosophy Analysis

### Homepage Design Language

After analyzing `/app/page.tsx`, I've identified these core design patterns:

1. **Color Psychology**
   - Primary: Amber/Orange tones (`amber-50` to `amber-600`) for warmth
   - Accents: Gray-900 (black) for authority and CTAs
   - Backgrounds: Gradient layering (`from-amber-50/40 via-white to-white`)
   - Trust indicators: Blue accents for credibility

2. **Typography Hierarchy**
   - Headlines: Bold, confident (`text-4xl md:text-5xl font-bold`)
   - Body: Generous line-height (1.6-1.8), light font weights (`font-light`)
   - Micro-copy: Small, gray, supportive (`text-sm text-gray-600`)

3. **Component Patterns**
   - Rounded corners: `rounded-2xl` to `rounded-3xl` (soft, approachable)
   - Borders: Subtle `border-2 border-gray-200` with hover states
   - Shadows: Soft elevations (`shadow-lg`, `shadow-xl`)
   - Padding: Generous breathing room (`p-6 md:p-8`)

4. **Interactive Elements**
   - Hover states: `hover:scale-105`, `hover:shadow-2xl`
   - Transitions: Smooth `transition-all duration-300`
   - Button styles: Full rounded (`rounded-full`) with clear hierarchy

5. **Layout Rhythm**
   - Max-width: `max-w-[1200px]` or `max-w-[1040px]`
   - Section spacing: `py-16 md:py-24`
   - Grid gaps: `gap-6 md:gap-8`

---

## Section-by-Section Redesign

### 1. Hero Section

**Current Issues:**
- Toss-style "Strategic Command Center" feels too corporate/cold
- Slate color scheme (`from-slate-50`) lacks warmth
- Badge design doesn't match homepage amber aesthetic
- Trust badges are too "fintech" style

**Redesign (Homepage-Aligned):**

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white pt-16">
  {/* Minimal Geometric Background Pattern - matching homepage */}
  <div className="absolute inset-0 w-full h-full">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
      <circle cx="20%" cy="30%" r="200" fill="#fef3c7" opacity="0.4" />
      <circle cx="80%" cy="70%" r="250" fill="#fde68a" opacity="0.3" />
    </svg>
  </div>

  {/* White Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

  <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
    {/* Warm Badge - matching homepage */}
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 shadow-sm">
      <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
      <span className="text-sm font-semibold text-amber-700">12년간 1,200건의 답</span>
    </div>

    {/* Headline with Gradient - warmer tone */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
      이겨놓고 설계하는<br/>
      <span className="text-amber-600">체계적인 승소 전략</span>
    </h1>

    {/* Subheadline - empathetic tone */}
    <p className="text-lg md:text-2xl font-light text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
      복잡한 이혼, 혼자 고민하지 마세요
    </p>

    {/* Secondary Message */}
    <p className="text-sm md:text-base text-gray-600 mb-10 max-w-2xl mx-auto">
      12년간 1,200번의 경험으로 만든 검증된 길이 있습니다
    </p>

    {/* Trust Stats - homepage style */}
    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-10">
      <div>
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">12년</p>
        <p className="text-sm text-gray-600">전문 경력</p>
      </div>
      <div>
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1,200+</p>
        <p className="text-sm text-gray-600">성공 사례</p>
      </div>
      <div>
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">87%</p>
        <p className="text-sm text-gray-600">승소율</p>
      </div>
    </div>

    {/* CTA Buttons - matching homepage */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button
        onClick={() => setIsTalkModalOpen(true)}
        className="group px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>10분 무료 진단 받기</span>
      </button>

      <button
        onClick={() => document.getElementById('strategy-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="px-10 py-5 bg-white text-gray-900 rounded-full font-medium border-2 border-gray-200 hover:border-amber-600 hover:shadow-lg transition-all duration-300"
      >
        전략 자세히 보기
      </button>
    </div>

    {/* Trust Indicators - matching homepage */}
    <div className="flex flex-wrap justify-center gap-4 mt-10 text-sm text-gray-600">
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        비밀보장
      </span>
      <span className="flex items-center gap-1.5">
        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        평일 저녁·주말 가능
      </span>
    </div>
  </div>
</section>
```

**Key Changes:**
- Amber gradient background (warm) instead of slate (cold)
- Amber badge with pulse animation (matches homepage exactly)
- Softer, more empathetic copy
- Homepage-style trust stats grid
- Simplified trust indicators (removed fintech-style icons)

---

### 2. Problems Section (왜 이혼도 계획이 필요할까요?)

**Current Issues:**
- Warning cards feel too "alert-heavy" with excessive red
- Card design doesn't match homepage card patterns
- Missing homepage's gentle gradient approach

**Redesign (Homepage-Aligned):**

```tsx
<section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
  {/* Subtle Background Pattern - matching homepage */}
  <div className="absolute inset-0 w-full h-full opacity-30">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="problemDots" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1" fill="#f59e0b" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#problemDots)" />
      <circle cx="15%" cy="30%" r="180" fill="#fef3c7" opacity="0.2" />
      <circle cx="85%" cy="70%" r="200" fill="#fde68a" opacity="0.15" />
    </svg>
  </div>

  <div className="relative z-10 w-full">
    <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
      {/* Section Header - matching homepage style */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Problems</p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
          왜 이혼도 계획이 필요할까요?
        </h2>
        <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
          무작정 시작한 이혼은 예상치 못한 결과를 가져올 수 있습니다
        </p>
      </div>

      {/* Warning Cards - warmer, softer approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Card 1 - Warmer red tone */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">이혼사유 없음</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <p className="text-orange-700 text-sm font-semibold">이혼소송 기각</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                명확한 이혼 사유 없이는 재판부가 이혼을 인정하지 않을 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Amber tone */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">💸</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">은닉재산 못 찾음</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <p className="text-amber-700 text-sm font-semibold">적은 재산분할</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                숨겨진 재산을 찾지 못하면 정당한 몫을 받을 수 없습니다
              </p>
            </div>
          </div>
        </div>

        {/* Continue similar pattern for remaining cards... */}
      </div>
    </div>
  </div>
</section>
```

**Key Changes:**
- Warmer color palette (orange/amber instead of red/pink)
- White card backgrounds instead of colored gradients (cleaner, more professional)
- Subtle dot indicators instead of X icons (less aggressive)
- Softer hover states
- Matches homepage card shadow and border patterns

---

### 3. Strategy Cards (4가지 전략)

**Current Issues:**
- Color gradients (`from-blue-50/50`, `from-indigo-50/50`) feel disconnected from homepage
- Card style too "premium-heavy" with excessive shadows
- Number badges don't match homepage aesthetic

**Redesign (Homepage-Aligned):**

```tsx
<section id="strategy-section" className="relative py-16 md:py-24 bg-white">
  <div className="max-w-[1040px] px-6 md:px-12 mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-20 scroll-reveal">
      <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Strategy</p>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
        The Plan의 4가지 전략
      </h2>
      <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
        이겨놓고 설계하는 체계적인 승소 전략
      </p>
    </div>

    {/* Strategy 1 - Warm, Clean Card */}
    <div className="mb-12 md:mb-16 scroll-reveal">
      <div className="group bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-200 hover:border-amber-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {/* Number Badge - Simplified */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
              <span className="text-2xl md:text-3xl font-bold text-amber-600">01</span>
            </div>
          </div>

          <div className="flex-1">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold rounded-full mb-4">
              이혼사유
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              이혼 사유 확실히 하기
            </h3>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              법원이 인정하는 명확한 이혼 사유를 입증하는 것이 첫걸음입니다.
              불륜, 악의적 유기, 심각한 부정행위 등 법적으로 인정되는 사유를 체계적으로 준비합니다.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-600 mt-1">✓</span>
                <span className="text-sm md:text-base text-gray-700">법적으로 인정되는 이혼 사유 분석</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 mt-1">✓</span>
                <span className="text-sm md:text-base text-gray-700">증거 수집 및 입증 전략 수립</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-600 mt-1">✓</span>
                <span className="text-sm md:text-base text-gray-700">상대방 반박 대비 방어 전략</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* Strategy 2-4: Same pattern with different accent colors */}
    {/* Use: 02 - Blue accent, 03 - Green accent, 04 - Purple accent */}
  </div>
</section>
```

**Key Changes:**
- White backgrounds instead of colored gradients (cleaner)
- Amber primary accent (matches homepage)
- Simplified number badges (no gradients, just border + background)
- Check marks instead of icon boxes (simpler, more approachable)
- Border hover states match homepage patterns

**Color Assignments:**
- 01: Amber (`amber-50`, `amber-600`) - warm, primary
- 02: Blue (`blue-50`, `blue-600`) - trust, property
- 03: Green (`green-50`, `green-600`) - growth, custody
- 04: Purple (`purple-50`, `purple-600`) - support, care

---

### 4. Timeline/Process Section

**Current Issue:**
- Current timeline is functional but lacks visual warmth
- Doesn't leverage homepage's consultation timing card style

**Redesign (Inspired by ConsultationTimingGuide):**

```tsx
<section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white">
  <div className="max-w-[1200px] px-6 md:px-12 mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16 scroll-reveal">
      <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Process</p>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
        처음부터 끝까지: The Plan의 6단계
      </h2>
      <p className="text-base md:text-xl text-gray-700 font-light max-w-3xl mx-auto leading-relaxed">
        체계적인 프로세스로 승소까지 함께 갑니다
      </p>
    </div>

    {/* Timeline Steps - Card-based (warmer than current line-based) */}
    <div className="max-w-[800px] mx-auto space-y-6">
      {/* Step 1 */}
      <div className="scroll-reveal group bg-white rounded-2xl border-2 border-gray-200 hover:border-amber-600 p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-start gap-4 md:gap-6">
          {/* Step Number */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-bold text-amber-600">1</span>
            </div>
          </div>

          <div className="flex-1">
            {/* Title and Duration */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">진단 및 분석</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Week 1</span>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              2시간 심층 상담을 통해 사건을 정밀 분석하고, 승소 가능성을 수치화합니다.
              15개 체크리스트로 현재 상황을 진단하고 맞춤 전략 로드맵을 제시합니다.
            </p>

            {/* Deliverables */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-amber-600">✓</span>
                무료 2시간 심층 상담
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-amber-600">✓</span>
                15개 체크리스트 진단
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-amber-600">✓</span>
                승소 가능성 AI 분석
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-amber-600">✓</span>
                맞춤 전략 로드맵 제시
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Repeat for steps 2-6 with similar pattern */}
    </div>
  </div>
</section>
```

**Key Changes:**
- Card-based instead of linear timeline (more scannable)
- Warm amber accents on step numbers
- White backgrounds with subtle borders
- Matches homepage's consultation timing card aesthetic

---

### 5. Comparison Table

**Current Issue:**
- Table rows lack visual warmth
- Could be more card-like to match homepage

**Redesign:**

```tsx
<section className="relative py-16 md:py-24 bg-white">
  <div className="max-w-[1200px] px-6 md:px-12 mx-auto">
    {/* Section Header */}
    <div className="text-center mb-12 md:mb-16 scroll-reveal">
      <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Difference</p>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
        일반 변호사 vs The Plan
      </h2>
      <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
        무엇이 다른지 명확하게 보여드립니다
      </p>
    </div>

    <div className="max-w-4xl mx-auto scroll-reveal space-y-3">
      {/* Comparison Row - Card style */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-5 md:p-6 hover:border-amber-200 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Feature */}
          <div className="font-semibold text-gray-900 text-sm md:text-base">
            초기 접근
          </div>
          {/* Typical - Muted */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-gray-400">—</span>
            사건 발생 후 대응
          </div>
          {/* The Plan - Highlighted */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="text-amber-600 font-bold">✓</span>
            <span className="font-semibold text-gray-900">3가지 시나리오 사전 준비</span>
          </div>
        </div>
      </div>

      {/* Repeat for other rows */}
    </div>
  </div>
</section>
```

**Key Changes:**
- Individual cards for each row (more breathing room)
- Amber check marks for The Plan column
- Gray dash for typical approach (de-emphasized)
- Rounded corners and borders match homepage

---

### 6. Testimonials Section

**Current**: Using ThePlanTestimonials component

**Enhancement:**
- Already aligned with homepage carousel
- Ensure amber accent colors in quotes/indicators

---

### 7. Final CTA Section

**Current Issue:**
- Dark gradient (`from-gray-900 to-black`) is too heavy/corporate
- Doesn't match homepage's hopeful, warm final CTA

**Redesign (Matching Homepage):**

```tsx
<section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20 overflow-hidden">
  {/* Warm Hope Pattern - matching homepage */}
  <div className="absolute inset-0 w-full h-full">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#fde68a', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      <circle cx="25%" cy="35%" r="200" fill="url(#hopeGrad)" />
      <circle cx="75%" cy="65%" r="220" fill="#fef3c7" opacity="0.35" />
      <circle cx="50%" cy="50%" r="150" fill="#fde68a" opacity="0.25" />
    </svg>
  </div>

  <div className="relative z-10 w-full">
    <div className="max-w-[1200px] px-6 md:px-12 mx-auto text-center">
      <p className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight text-gray-900">
        오늘이 그날이에요
      </p>
      <p className="text-base md:text-xl text-gray-600 mb-4 font-light max-w-2xl mx-auto">
        하루하루가 아까워요<br />
        3개월 후엔 달라져 있어요
      </p>
      <p className="text-sm md:text-base text-gray-500 mb-10 md:mb-12 italic max-w-xl mx-auto">
        "다들 '진작 올걸' 해요"
      </p>

      {/* Mobile-First: 3가지 균형잡힌 상담 선택 */}
      {/* Use exact same CTA cards from homepage */}
      <div className="max-w-4xl mx-auto mb-8">
        {/* Same 3-card layout as homepage final CTA */}
      </div>

      <p className="text-sm text-gray-500">
        100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
      </p>
    </div>
  </div>
</section>
```

**Key Changes:**
- Warm amber gradient instead of dark gray
- Matches homepage final CTA exactly
- Hopeful, encouraging tone
- Same 3-card consultation options

---

## Typography & Spacing Standards

### Headings
```css
h1: text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]
h2: text-3xl md:text-5xl font-bold tracking-tight
h3: text-2xl md:text-3xl font-bold tracking-tight
```

### Body Text
```css
Large body: text-base md:text-lg font-light text-gray-600 leading-relaxed
Standard body: text-sm md:text-base text-gray-600 leading-relaxed
Small text: text-xs md:text-sm text-gray-500
```

### Section Spacing
```css
Section padding: py-16 md:py-24
Container max-width: max-w-[1040px] or max-w-[1200px]
Grid gaps: gap-4 md:gap-6 lg:gap-8
Card padding: p-6 md:p-8 or p-8 md:p-10
```

---

## Color Palette Reference

### Primary (Warm & Trust)
```css
Amber: from-amber-50 to amber-600
Use for: Badges, primary CTAs, highlights, dots
```

### Secondary (Authority)
```css
Gray-900: Black for primary CTAs
Gray-200 to Gray-600: Borders, text hierarchy
```

### Accent Colors
```css
Blue: Trust indicators, legal elements
Green: Success, growth (custody)
Orange: Urgency (warnings, time-sensitive)
Purple: Support, care
```

### Backgrounds
```css
Gradient 1: bg-gradient-to-b from-amber-50/40 via-white to-white
Gradient 2: bg-gradient-to-b from-white via-amber-50/20 to-white
Clean: bg-white
```

---

## Animation & Interactions

### Scroll Reveal
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

### Hover States
```css
Cards: hover:shadow-xl hover:-translate-y-1 hover:border-amber-600
Buttons: hover:scale-105 hover:shadow-2xl
Transitions: transition-all duration-300
```

---

## Mobile Considerations

### Touch Targets
- Minimum: 44x44px
- Button padding: `px-6 py-4` minimum on mobile

### Typography Scaling
- Always provide mobile (`text-base`) and desktop (`md:text-lg`) sizes
- Line-height: 1.6-1.8 for readability

### Spacing
- Reduce section padding on mobile: `py-16` vs `md:py-24`
- Card padding: `p-6` vs `md:p-8`

---

## Implementation Priority

1. **Hero Section** - First impression, sets tone
2. **Strategy Cards** - Core content alignment
3. **Problems Section** - Empathy building
4. **Final CTA** - Conversion point
5. **Timeline/Process** - Detail refinement
6. **Comparison Table** - Polish

---

## Trust-Building Through Design

### Warm Elements
- Amber color palette (approachable)
- Generous white space (breathing room)
- Soft rounded corners (friendly)
- Light shadows (gentle elevation)

### Modern Elements
- Clean typography hierarchy
- Precise grid systems
- Smooth animations
- Contemporary component patterns

### Professional Elements
- Consistent spacing rhythm
- Clear information architecture
- Subtle gradients (not flashy)
- Gray-900 authority CTAs

---

## Final Notes

This redesign maintains 100% visual consistency with the homepage while giving The Plan page its own identity through:

1. **Color harmony**: Amber as primary theme (warmth + professionalism)
2. **Component reuse**: Same card styles, badges, buttons
3. **Emotional balance**: Empathetic copy + confident design
4. **Responsive patterns**: Mobile-first, matching homepage breakpoints

The result is a cohesive experience where users feel supported (warm) while trusting expertise (modern, clean).
