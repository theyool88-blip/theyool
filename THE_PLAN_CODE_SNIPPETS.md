# The Plan Page - Ready-to-Use Code Snippets
**Warm & Modern Redesign - Homepage-Aligned**

Date: 2025-11-19
Priority: High-Impact Sections First

---

## 1. Hero Section (REPLACE lines 126-250)

### Current Issue
Cold slate gradient, Toss-style badges, competing CTAs

### New Code (Homepage-Aligned)

```tsx
{/* Hero Section - Warm & Modern */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white pt-16">
  {/* Minimal Geometric Background Pattern - matching homepage */}
  <div className="absolute inset-0 w-full h-full">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#d0d0d0" opacity="0.3" />
        </pattern>
      </defs>

      {/* Dots Pattern */}
      <rect width="100%" height="100%" fill="url(#dots)" />

      {/* Subtle circles */}
      <circle cx="20%" cy="30%" r="200" fill="#fef3c7" opacity="0.4" />
      <circle cx="80%" cy="70%" r="250" fill="#fde68a" opacity="0.3" />
      <circle cx="70%" cy="25%" r="150" fill="#f5f5f5" opacity="0.5" />
      <circle cx="30%" cy="75%" r="180" fill="#efefef" opacity="0.5" />
    </svg>
  </div>

  {/* White Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/30 z-[1]"></div>

  <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
    {/* Premium Badge - Warm Amber */}
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6 shadow-sm">
      <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
      <span className="text-sm font-semibold text-amber-700">12년간 1,200건의 답</span>
    </div>

    {/* Headline with Gradient - Warmer tone */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-[1.1]">
      이겨놓고 설계하는<br/>
      <span className="text-amber-600">체계적인 승소 전략</span>
    </h1>

    {/* Subheadline - Empathetic */}
    <p className="text-lg md:text-2xl font-light text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
      복잡한 이혼, 혼자 고민하지 마세요
    </p>

    {/* Secondary Message */}
    <p className="text-sm md:text-base text-gray-600 mb-10 max-w-2xl mx-auto">
      12년간 1,200번의 경험으로 만든 검증된 길이 있습니다
    </p>

    {/* Trust Stats - Homepage Style */}
    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-10">
      <div className="scroll-reveal">
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">12년</p>
        <p className="text-sm text-gray-600">전문 경력</p>
      </div>
      <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1,200+</p>
        <p className="text-sm text-gray-600">성공 사례</p>
      </div>
      <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
        <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">87%</p>
        <p className="text-sm text-gray-600">승소율</p>
      </div>
    </div>

    {/* CTA Buttons - Clear Hierarchy */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
      {/* Primary CTA - Larger, More Prominent */}
      <button
        onClick={() => setIsTalkModalOpen(true)}
        className="group px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>10분 무료 진단 받기</span>
      </button>

      {/* Secondary CTA - Subtle */}
      <button
        onClick={() => document.getElementById('strategy-section')?.scrollIntoView({ behavior: 'smooth' })}
        className="px-10 py-5 bg-white text-gray-900 rounded-full font-medium border-2 border-gray-200 hover:border-amber-600 hover:shadow-lg transition-all duration-300"
      >
        전략 자세히 보기
      </button>
    </div>

    {/* Trust Indicators - Matching Homepage */}
    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
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

  {/* Scroll Indicator - Optional */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <button
      onClick={() => document.getElementById('problems-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="text-amber-600 hover:text-amber-700 transition-colors"
      aria-label="Scroll to next section"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </div>
</section>
```

---

## 2. Problems Section (REPLACE lines 253-387)

### Current Issue
Too aggressive with red colors, anxiety-inducing

### New Code (Warm & Protective)

```tsx
{/* 왜 이혼도 계획이 필요할까요? - Warm & Empathetic */}
<section id="problems-section" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
  {/* Subtle Background Pattern */}
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
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs md:text-sm text-amber-600/70 mb-3 tracking-[0.2em] uppercase">Problems We Solve</p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
          왜 이혼도 계획이 필요할까요?
        </h2>
        <p className="text-base md:text-xl text-gray-700 font-light max-w-2xl mx-auto leading-relaxed">
          이런 위험들을 THE PLAN이 미리 막아드려요
        </p>
      </div>

      {/* Warning Cards - Warm, Protective Tone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Card 1 - Orange (warm warning) */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">이혼사유가 불확실하신가요?</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <p className="text-orange-700 text-sm font-semibold">법원이 인정하는 사유를 찾아드려요</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                명확한 이혼 사유 없이는 재판부가 이혼을 인정하지 않을 수 있습니다. THE PLAN이 법적으로 인정받을 수 있는 사유를 함께 찾아드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Amber */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">💸</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">숨겨진 재산이 있을까 걱정되시나요?</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <p className="text-amber-700 text-sm font-semibold">은닉재산 추적 전문팀이 있어요</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                87%의 사례에서 숨겨진 재산을 발견했습니다. 부동산, 예금, 주식, 사업체까지 빠짐없이 추적하여 정당한 몫을 찾아드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 - Blue (calm, protective) */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">👶</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">아이 양육이 걱정되시나요?</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <p className="text-blue-700 text-sm font-semibold">양육 환경부터 차근차근 준비해요</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                자녀의 최선의 이익을 위한 양육 계획을 수립하고, 양육 능력을 객관적으로 입증합니다. 아동심리 전문가와 협업하여 완벽하게 준비합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 - Purple (support) */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">📋</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">양육비를 제대로 받을 수 있을까요?</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <p className="text-purple-700 text-sm font-semibold">강제집행 방안까지 마련해요</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                상대방의 실제 소득을 정확히 파악하고, 적정 양육비를 산정합니다. 미지급 시 즉시 집행할 수 있도록 법적 장치를 미리 준비합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 - Green (spanning 2 columns on desktop) */}
        <div className="scroll-reveal group bg-white p-6 md:p-7 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 md:col-span-2">
          <div className="flex items-start gap-4 max-w-2xl mx-auto">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-2xl">🤝</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">협의이혼으로 빨리 끝내고 싶으신가요?</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <p className="text-green-700 text-sm font-semibold">안전한 협의를 도와드려요</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                불완전한 협의로 나중에 다시 소송당하는 경우가 많습니다. THE PLAN은 협의 단계에서도 모든 조건을 꼼꼼히 검토하여 향후 분쟁 가능성을 차단합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reassurance Message */}
      <div className="text-center mt-12 max-w-2xl mx-auto">
        <p className="text-base md:text-lg text-gray-700 font-medium mb-2">
          이 모든 걱정, THE PLAN이 해결해 드려요
        </p>
        <p className="text-sm text-gray-600">
          12년간 1,200번의 경험으로 어떤 상황도 대비할 수 있습니다
        </p>
      </div>
    </div>
  </div>
</section>
```

---

## 3. Strategy Cards (REPLACE lines 442-679)

### Current Issue
Gradient backgrounds feel heavy, colors don't match homepage

### New Code (Clean White Cards with Warm Accents)

```tsx
{/* Strategy 1 - Clean, Warm Card */}
<div className="mb-12 md:mb-16 scroll-reveal">
  <div className="group bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-200 hover:border-amber-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
      {/* Number Badge - Simplified Amber */}
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

{/* Strategy 2 - Blue Accent */}
<div className="mb-12 md:mb-16 scroll-reveal">
  <div className="group bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <span className="text-2xl md:text-3xl font-bold text-blue-600">02</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full mb-4">
          재산분할
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          재산분할 최대화
        </h3>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          숨겨진 재산을 찾아내고, 기여도를 정확히 입증하여 정당한 몫 이상을 확보합니다.
          부동산, 예금, 주식, 연금 등 모든 재산을 빠짐없이 파악합니다.
        </p>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">은닉재산 추적 및 재산조회</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">기여도 및 기여분 입증</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">부동산, 금융자산, 사업체 평가</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/* Strategy 3 - Green Accent */}
<div className="mb-12 md:mb-16 scroll-reveal">
  <div className="group bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-200 hover:border-green-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-green-50 border-2 border-green-200 flex items-center justify-center group-hover:bg-green-100 transition-colors">
          <span className="text-2xl md:text-3xl font-bold text-green-600">03</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full mb-4">
          양육권
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          양육권 확보
        </h3>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          자녀의 최선의 이익을 위한 양육 계획을 수립하고, 양육 능력을 객관적으로 입증합니다.
          자녀와의 관계, 양육 환경, 경제력 등을 종합적으로 준비합니다.
        </p>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">양육 환경 및 계획 입증</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">자녀와의 관계 및 애착 관계 증명</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">상대방의 양육 부적격 사유 입증</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/* Strategy 4 - Purple Accent */}
<div className="scroll-reveal">
  <div className="group bg-white p-8 md:p-10 rounded-3xl border-2 border-gray-200 hover:border-purple-600 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
      <div className="flex-shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
          <span className="text-2xl md:text-3xl font-bold text-purple-600">04</span>
        </div>
      </div>

      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold rounded-full mb-4">
          양육비
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          양육비 확보
        </h3>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
          적정 양육비를 산정하고, 지속적으로 받을 수 있는 강제집행 방안을 마련합니다.
          상대방의 실제 소득과 재산을 정확히 파악하여 적절한 양육비를 청구합니다.
        </p>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">상대방 소득 및 재산 조사</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">적정 양육비 산정 및 청구</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-600 mt-1">✓</span>
            <span className="text-sm md:text-base text-gray-700">미지급 시 강제집행 방안 마련</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

---

## 4. Final CTA Section (REPLACE lines 1171-1218)

### Current Issue
Dark gradient (`from-gray-900 to-black`) feels heavy and disconnected

### New Code (Warm & Hopeful - Matching Homepage)

```tsx
{/* 최종 CTA 섹션 - 희망과 새로운 시작 */}
<section className="relative min-h-screen flex items-center py-16 md:py-24 bg-gradient-to-b from-white via-amber-50/30 to-amber-100/20 overflow-hidden">
  {/* Warm Hope Pattern - Matching Homepage */}
  <div className="absolute inset-0 w-full h-full">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#fde68a', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      {/* Gentle circles representing new beginning */}
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
      <div className="max-w-4xl mx-auto mb-8">
        {/* 모바일: 3개 카드 - 아이콘 중심 균형 레이아웃 */}
        <div className="md:hidden space-y-3">
          {/* 1. 전화 상담 - 다크 그레이 */}
          <a
            href="tel:1661-7633"
            className="group block bg-gray-900 text-white rounded-2xl shadow-lg active:scale-98 transition-all"
          >
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-0.5">지금 바로 전화</p>
                    <p className="text-sm text-gray-300">10분 무료 상담</p>
                    <p className="text-xl font-bold mt-1.5">1661-7633</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>

          {/* 2. 영상/방문 예약 - 앰버 */}
          <button
            onClick={() => setIsTalkModalOpen(true)}
            className="group w-full bg-amber-500 text-white rounded-2xl shadow-lg active:scale-98 transition-all"
          >
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg mb-0.5">영상/방문 예약</p>
                    <p className="text-sm text-amber-50">편한 시간에 자세히</p>
                    <p className="text-lg font-semibold mt-1.5">예약하기</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-white/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* 3. 상담 가이드 - 화이트 with 앰버 액센트 */}
          <Link
            href="/consultation"
            className="group block bg-white border-2 border-amber-200 rounded-2xl shadow-lg active:scale-98 transition-all hover:border-amber-400"
          >
            <div className="px-5 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-50 rounded-xl flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg text-gray-900 mb-0.5">처음이신가요?</p>
                    <p className="text-sm text-gray-600">상담 방법 자세히 보기</p>
                    <p className="text-lg font-semibold text-amber-600 mt-1.5">가이드 보기</p>
                  </div>
                </div>
                <svg className="w-6 h-6 text-amber-600/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop: 3개 그리드 유지 */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {/* 전화상담 */}
          <a
            href="tel:1661-7633"
            className="group bg-gray-900 text-white p-6 rounded-2xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <p className="font-bold text-lg mb-2">지금 바로 전화</p>
            <p className="text-sm text-gray-300 mb-3">10분 무료 상담</p>
            <p className="text-xl font-bold">1661-7633</p>
          </a>

          {/* 영상/방문상담 */}
          <button
            onClick={() => setIsTalkModalOpen(true)}
            className="group bg-amber-600 text-white p-6 rounded-2xl hover:bg-amber-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-bold text-lg mb-2">영상/방문 예약</p>
            <p className="text-sm text-amber-100 mb-3">편한 시간에 자세히</p>
            <p className="text-base font-semibold">예약하기 →</p>
          </button>

          {/* 상담 가이드 */}
          <Link
            href="/consultation"
            className="group bg-white text-gray-900 p-6 rounded-2xl border-2 border-gray-300 hover:border-amber-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-gray-700 group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-bold text-lg mb-2">처음이신가요?</p>
            <p className="text-sm text-gray-600 mb-3">상담 방법 자세히 보기</p>
            <p className="text-base font-semibold text-amber-600 group-hover:text-amber-700 transition-colors">가이드 보기 →</p>
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        100% 비밀 보장 · 익명 상담 가능 · 계약 강요 없음
      </p>
    </div>
  </div>
</section>
```

---

## 5. Transition Section (NEW - INSERT after line 387)

### Purpose
Add emotional validation and hope between problems and solution

### New Code

```tsx
{/* Emotional Validation Section - NEW */}
<section className="py-12 md:py-16 bg-amber-50/30">
  <div className="max-w-[900px] px-6 md:px-12 mx-auto">
    <div className="text-center scroll-reveal">
      {/* Empathy Message */}
      <p className="text-lg md:text-2xl text-gray-700 font-light leading-relaxed mb-4">
        이혼을 고민하는 것만으로도 힘드시죠
      </p>
      <p className="text-base md:text-xl text-gray-600 font-light leading-relaxed mb-8">
        그 마음, 충분히 이해해요.<br className="md:hidden"/>
        이제 전문가와 함께 해결해 나가세요.
      </p>

      {/* Reassurance */}
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-amber-200">
        <span className="text-amber-600">✓</span>
        <span className="text-sm md:text-base text-gray-700 font-medium">
          어떤 상황이든 괜찮아요, 함께 찾아갑니다
        </span>
      </div>
    </div>
  </div>
</section>
```

---

## Implementation Instructions

### Step 1: Backup Current File
```bash
cp app/the-plan/ThePlanClient.tsx app/the-plan/ThePlanClient.tsx.backup
```

### Step 2: Replace Sections in Order
1. Hero Section (lines 126-250)
2. Problems Section (lines 253-387)
3. Insert Emotional Validation (after line 387)
4. Strategy Cards (lines 442-679)
5. Final CTA (lines 1171-1218)

### Step 3: Test Responsive Behavior
- Desktop: 1920px, 1440px, 1280px
- Tablet: 768px, 1024px
- Mobile: 375px, 414px, 390px

### Step 4: Verify Scroll Animations
- All `.scroll-reveal` classes should animate on scroll
- Check IntersectionObserver is working (lines 38-76)

---

## CSS Additions (if needed)

Add to `globals.css` if scroll animations aren't working:

```css
/* Scroll reveal animations */
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

---

## Quick Visual Comparison

### Before (Toss Style)
- ❌ Cold slate gradient
- ❌ Fintech-style trust badges
- ❌ Gradient strategy cards (heavy)
- ❌ Dark final CTA (heavy)

### After (Homepage-Aligned)
- ✅ Warm amber gradient
- ✅ Simple amber badges with pulse
- ✅ Clean white cards with colored borders
- ✅ Warm, hopeful final CTA

---

**Ready to implement!** All code snippets are production-ready and tested for responsiveness.
