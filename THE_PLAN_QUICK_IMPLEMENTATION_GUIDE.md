# The Plan Page - Quick Implementation Guide

**Ready-to-Use Code Snippets for Immediate Implementation**

---

## 🎨 Color Palette - Copy & Paste

```tsx
// Add to your Tailwind config or use directly in className

// PRIMARY COLORS
const colors = {
  // Hero & Main Sections
  heroBg: 'bg-gradient-to-b from-slate-50 via-white to-amber-50/10',

  // Text
  headlineMain: 'text-slate-900',
  headlineAccent: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600',
  bodyText: 'text-slate-600',
  mutedText: 'text-slate-500',

  // Buttons
  primaryBtn: 'bg-slate-900 hover:bg-slate-800 text-white',
  secondaryBtn: 'bg-white border-2 border-slate-300 text-slate-800 hover:border-amber-600',

  // Cards
  cardBg: 'bg-gradient-to-br from-white via-amber-50/30 to-white',
  cardBorder: 'border-2 border-slate-200 hover:border-amber-500',

  // Trust Elements
  trustBadge: 'bg-white border-2 border-slate-200',
  successIcon: 'text-green-500',
  warningIcon: 'text-red-500',
};

// STRATEGY COLORS (for 4 pillars)
const strategyColors = {
  strategy1: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
  strategy2: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
  strategy3: { bg: 'bg-amber-50', text: 'text-amber-700', icon: 'text-amber-600' },
  strategy4: { bg: 'bg-amber-50', text: 'text-red-700', icon: 'text-red-600' },
};
```

---

## 🏆 Hero Section - Complete Code

```tsx
<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/10">
  {/* Strategic Grid Background */}
  <div className="absolute inset-0 opacity-[0.03]">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-12 text-center">
    {/* Trust Badge */}
    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-slate-200 rounded-full mb-8 shadow-sm">
      <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
      <span className="text-sm font-bold text-slate-700 tracking-wide">12년 1,200건 검증</span>
      <span className="text-xs text-slate-400">|</span>
      <span className="text-sm font-bold text-amber-700">87% 승소율</span>
    </div>

    {/* Headline */}
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
      이겨놓고 설계하는
      <br />
      <span className="relative inline-block mt-2">
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
          THE PLAN
        </span>
        <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-200/40 -z-10 rounded" />
      </span>
    </h1>

    {/* Subheadline */}
    <p className="text-xl md:text-2xl text-slate-600 font-light mb-4 leading-relaxed max-w-[700px] mx-auto">
      1,200번의 이혼을 거치며 만든<br className="md:hidden" />
      <span className="font-semibold text-slate-800">체계적인 승소 전략</span>
    </p>

    <p className="text-base md:text-lg text-slate-500 mb-10 max-w-[600px] mx-auto">
      결혼할 때는 몰랐지만, 이혼할 때는 모든 걸 알고 결정하세요
    </p>

    {/* Dual CTA */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
      <button className="group px-10 py-5 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-3">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        무료 전략 상담
      </button>

      <a href="#strategy-section" className="px-10 py-5 bg-white border-2 border-slate-300 text-slate-800 rounded-full font-bold text-lg hover:border-amber-600 hover:shadow-lg transition-all duration-300 flex items-center gap-3">
        전략 둘러보기
        <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </div>

    {/* Trust Pills */}
    <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
      <span className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-slate-200">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        100% 비밀보장
      </span>
      <span className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-slate-200">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        계약 강요 없음
      </span>
      <span className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-slate-200">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        평일 저녁·주말 가능
      </span>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>
```

---

## 🎴 Premium Case Card - Complete Code

```tsx
<Link href={`/cases/${caseItem.slug}`} className="group block">
  <div className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
    {/* Gradient Backgrounds - Swap on Hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/30 to-white opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/40 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Animated Border */}
    <div className="absolute inset-0 rounded-3xl border-2 border-slate-200 group-hover:border-amber-500 transition-colors duration-500" />

    {/* Content */}
    <div className="relative p-8 md:p-10">
      {/* Icon + Badge Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 group-hover:scale-110 transition-transform duration-500">
          <span className="text-4xl">{caseItem.icon}</span>
        </div>
        <div className="px-4 py-1.5 bg-white/90 backdrop-blur-sm border border-amber-200 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
          {caseItem.badge}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-amber-700 transition-colors duration-300">
        {caseItem.title}
      </h3>

      {/* Description */}
      <p className="text-base text-slate-600 leading-relaxed mb-6 line-clamp-3">
        {caseItem.background}
      </p>

      {/* Animated Divider */}
      <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mb-6 group-hover:w-24 transition-all duration-500" />

      {/* Result Badge */}
      {caseItem.result && (
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-full border border-slate-200 mb-6">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-semibold text-slate-700">{caseItem.result}</span>
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all duration-300">
        <span className="text-sm">자세히 보기</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    {/* Decorative Corner */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
</Link>
```

---

## ⚠️ Warning/Problem Card

```tsx
<div className="bg-white p-6 md:p-8 rounded-2xl border-2 border-red-100 hover:border-red-300 hover:shadow-lg transition-all duration-300 group">
  <div className="flex items-start gap-4">
    {/* Animated Icon */}
    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <span className="text-3xl">⚠️</span>
    </div>

    <div>
      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
        이혼사유 없음
      </h3>

      {/* Consequence */}
      <p className="text-red-600 mb-2 font-semibold flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        → 이혼소송 기각
      </p>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed">
        명확한 이혼 사유 없이는 재판부가 이혼을 인정하지 않을 수 있습니다
      </p>
    </div>
  </div>
</div>
```

---

## 💡 Trust Badge Components

### Trust Pill (Inline)
```tsx
<span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
  <span className="text-sm font-semibold text-green-800">
    실시간: 오늘 <span className="text-green-600">37명</span> 상담 진행 중
  </span>
</span>
```

### Cost Transparency Card
```tsx
<div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 shadow-sm">
  <div className="flex items-center gap-3 mb-6">
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h4 className="font-bold text-slate-900 text-lg">수임료 투명 공개</h4>
  </div>

  <div className="space-y-4 mb-6">
    <div className="flex justify-between items-center">
      <span className="text-slate-600">협의이혼</span>
      <span className="font-bold text-slate-900 text-lg">150만원~</span>
    </div>
    <div className="w-full h-px bg-slate-200" />
    <div className="flex justify-between items-center">
      <span className="text-slate-600">재판이혼</span>
      <span className="font-bold text-slate-900 text-lg">300만원~</span>
    </div>
    <div className="w-full h-px bg-slate-200" />
    <div className="flex justify-between items-center">
      <span className="text-slate-600">상간소송</span>
      <span className="font-bold text-slate-900 text-lg">별도 상담</span>
    </div>
  </div>

  <div className="p-4 bg-white rounded-xl border border-blue-100">
    <p className="text-xs text-slate-600 leading-relaxed">
      💡 <span className="font-semibold">사건별 맞춤 견적 제공</span><br/>
      상담 시 정확한 비용 안내 | 숨은 비용 없음
    </p>
  </div>
</div>
```

### Attorney Credential Card
```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-xl border-2 border-slate-200 hover:border-amber-500 transition-colors shadow-sm hover:shadow-md">
  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
    <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
  <div>
    <p className="font-bold text-slate-900 text-lg mb-1">임은지 변호사</p>
    <p className="text-sm text-slate-600 mb-1">이혼 전문 12년 경력</p>
    <div className="flex items-center gap-2 text-xs text-amber-700">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      대한변호사협회 인증
    </div>
  </div>
</div>
```

---

## 📱 Mobile Optimization Snippets

### Responsive Grid
```tsx
{/* Cards: 1 column mobile, 3 columns desktop */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>

{/* Stats: 2 columns mobile, 4 columns desktop */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {stats.map(stat => (
    <StatItem key={stat.label} {...stat} />
  ))}
</div>
```

### Mobile-First Typography
```tsx
{/* Headline: Smaller on mobile, huge on desktop */}
<h1 className="text-3xl md:text-5xl lg:text-7xl font-black">
  이겨놓고 설계하는
</h1>

{/* Body: Comfortable reading size */}
<p className="text-base md:text-lg text-slate-600 leading-relaxed">
  내용...
</p>

{/* Small print: Even smaller on mobile */}
<p className="text-xs md:text-sm text-slate-500">
  참고사항...
</p>
```

### Mobile Touch Targets
```tsx
{/* Ensure minimum 44x44px */}
<button className="min-h-[44px] min-w-[44px] px-6 py-3">
  클릭
</button>

{/* Mobile-specific padding */}
<section className="px-6 py-12 md:px-12 md:py-20">
  {/* Content */}
</section>
```

---

## ✨ Toss-Style Micro-Interactions

### Button Hover Effects
```tsx
{/* Primary Button */}
<button className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold
  hover:bg-slate-800 hover:shadow-2xl hover:scale-105
  transition-all duration-300
  active:scale-95">
  상담 신청
</button>

{/* Secondary Button */}
<button className="px-8 py-4 bg-white border-2 border-slate-300 rounded-full font-bold
  hover:border-amber-600 hover:shadow-lg
  transition-all duration-300
  active:scale-98">
  더 알아보기
</button>
```

### Card Hover
```tsx
<div className="p-8 rounded-3xl border-2 border-slate-200
  hover:border-amber-500 hover:shadow-2xl hover:scale-[1.02]
  transition-all duration-500
  group">

  {/* Icon scales up on card hover */}
  <div className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
    {icon}
  </div>

  {/* Divider expands on hover */}
  <div className="w-12 h-1 bg-amber-400 rounded-full
    group-hover:w-24
    transition-all duration-500" />
</div>
```

### Icon Rotation
```tsx
<div className="group">
  <svg className="w-6 h-6
    group-hover:rotate-12 group-hover:scale-110
    transition-transform duration-300">
    {/* Icon */}
  </svg>
</div>
```

### Progressive Reveal
```tsx
{/* Accordion-style reveal */}
<div className="overflow-hidden transition-all duration-500"
  style={{ maxHeight: isOpen ? '500px' : '0' }}>
  <div className="p-4">
    {/* Content */}
  </div>
</div>
```

---

## 🎯 Accessibility Essentials

### Focus States
```tsx
{/* Always include visible focus indicators */}
<button className="px-6 py-3 bg-amber-600 text-white rounded-full
  focus:ring-4 focus:ring-amber-300 focus:ring-offset-2 focus:outline-none
  transition-all">
  버튼
</button>

<a href="/link" className="text-blue-600 hover:underline
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none
  rounded">
  링크
</a>
```

### ARIA Labels
```tsx
{/* For icon-only buttons */}
<button aria-label="메뉴 열기" className="p-2">
  <svg className="w-6 h-6">...</svg>
</button>

{/* For links */}
<a href="/cases" aria-label="성공사례 전체보기 - 새 창">
  자세히 →
</a>

{/* For decorative images */}
<img src="/decoration.svg" alt="" role="presentation" />

{/* For informative images */}
<img src="/chart.png" alt="2024년 승소율 87% 증가 추이 그래프" />
```

### Semantic HTML
```tsx
{/* Use proper heading hierarchy */}
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Subsection</h3>

{/* Use semantic tags */}
<article>
  <header>
    <h2>Article Title</h2>
  </header>
  <main>...</main>
  <footer>...</footer>
</article>

<nav aria-label="Main navigation">
  <ul>...</ul>
</nav>
```

---

## 🚀 Performance Optimization

### Image Loading
```tsx
import Image from 'next/image';

{/* Above-fold images */}
<Image
  src="/hero-image.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // Load immediately
  quality={90}
/>

{/* Below-fold images */}
<Image
  src="/case-image.jpg"
  alt="Description"
  width={800}
  height={400}
  loading="lazy" // Lazy load
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Low-quality placeholder
/>
```

### Component Lazy Loading
```tsx
import dynamic from 'next/dynamic';

// Heavy component loaded only when needed
const HeavyCarousel = dynamic(() => import('./HeavyCarousel'), {
  loading: () => <div className="animate-pulse bg-slate-200 h-64 rounded-xl" />,
  ssr: false, // Client-side only if not needed for SEO
});

// Conditionally load component
{showCarousel && <HeavyCarousel />}
```

### Intersection Observer (Scroll Animations)
```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function ScrollReveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-8 transition-all duration-700"
    >
      {children}
    </div>
  );
}

// Usage
<ScrollReveal>
  <Card />
</ScrollReveal>
```

---

## 📋 Implementation Checklist

### Phase 1: Hero Section (Day 1)
- [ ] Replace current hero with new "Command Center" design
- [ ] Update color palette (slate-50 base)
- [ ] Add trust badge with stats
- [ ] Implement dual CTA buttons
- [ ] Add trust pills below CTA
- [ ] Test mobile responsiveness
- [ ] Verify accessibility (ARIA, focus states)

### Phase 2: Case Cards (Day 1-2)
- [ ] Implement premium card design
- [ ] Add gradient backgrounds with hover swap
- [ ] Animate icon on hover (scale 110%)
- [ ] Add expanding divider line
- [ ] Include result badge
- [ ] Test hover states on all browsers
- [ ] Verify touch interactions on mobile

### Phase 3: Trust Elements (Day 2)
- [ ] Add cost transparency card
- [ ] Include attorney credential cards
- [ ] Add live activity indicator
- [ ] Sprinkle trust badges throughout
- [ ] Test all CTAs
- [ ] Analytics event tracking

### Phase 4: Polish (Day 3)
- [ ] Review all micro-interactions
- [ ] Test scroll animations
- [ ] Verify color contrast (WCAG AA)
- [ ] Mobile testing (iOS + Android)
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing

---

## 🎨 CSS Animation Utilities

Add to your global CSS or Tailwind config:

```css
/* globals.css */

/* Slow rotation for decorative elements */
@keyframes slow-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-slow-spin {
  animation: slow-spin 30s linear infinite;
}

/* Floating animation for sticky buttons */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Shimmer effect for loading states */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}

.animate-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

/* Fade-in on scroll */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease-out, transform 0.7s ease-out;
}

.scroll-reveal.animate-in {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 💬 Next Steps

1. **Copy the hero section code** into `/app/the-plan/ThePlanClient.tsx`
2. **Replace case card** rendering (around line 596)
3. **Add trust elements** at strategic points
4. **Test on mobile** immediately
5. **Iterate based on feel**

**Questions?** Review the main design document for rationale and context.

**Ready to implement?** Start with the hero section - it has the biggest visual impact!
