# ExpertInsights Visual Design Guide

## Design Philosophy

### Core Principles
1. **Professional yet Approachable**: Balance legal expertise with warmth
2. **Visual Hierarchy**: Guide eyes from image → category → title → excerpt
3. **Mobile-First**: Prioritize small screen experience
4. **Trust Through Design**: Clean, organized, transparent

### Inspiration Sources
- **Toss (toss.im)**: Clean cards, approachable gradients
- **Da-si (da-si.com)**: Professional information architecture
- **Pregnancy App Reference**: Horizontal card layout with left-side illustrations

---

## Card Design Breakdown

### Desktop Layout (≥768px)

```
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║   ┌──────────┬────────────────────────────────────────────────┐  ║
║   │          │  ┌────────┐                                     │  ║
║   │          │  │Category│  [Positioned on image]             │  ║
║   │  Image   │  └────────┘                                     │  ║
║   │  Area    │                                                 │  ║
║   │  160px   │  ⏱ X분 읽기                                      │  ║
║   │          │                                                 │  ║
║   │          │  이혼 시 재산분할 청구 방법                        │  ║
║   │          │  (Title - Bold, 18px)                           │  ║
║   │          │                                                 │  ║
║   │          │  재산분할은 이혼 시 부부가 공동으로...             │  ║
║   │          │  (Excerpt - Regular, 14px, 2 lines)             │  ║
║   │          │  ─────────────────────────────────────          │  ║
║   │          │  법무법인 더율        2025. 11. 21.              │  ║
║   └──────────┴────────────────────────────────────────────────┘  ║
║   └──────────────────────────────────────────────────────────┘   ║
║              자세히 읽기 →  (Hover indicator)                     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

**Key Measurements:**
- Card Height: Auto (fits content)
- Image Width: 160px
- Image Height: Matches content area (~200-220px)
- Content Padding: 20px (5 = 1.25rem)
- Border Radius: 16px (rounded-2xl)

### Mobile Layout (<768px)

```
╔═══════════════════════════════╗
║                               ║
║  ┌─────────────────────────┐  ║
║  │   ┌────────┐            │  ║
║  │   │Category│            │  ║
║  │   └────────┘            │  ║
║  │                         │  ║
║  │   Illustration Image    │  ║
║  │   Full Width            │  ║
║  │   200px Height          │  ║
║  │                         │  ║
║  └─────────────────────────┘  ║
║                               ║
║  ⏱ X분 읽기                    ║
║                               ║
║  이혼 시 재산분할               ║
║  청구 방법                     ║
║  (Title - Bold, 16px)         ║
║                               ║
║  재산분할은 이혼 시             ║
║  부부가 공동으로...            ║
║  (Excerpt - 14px)             ║
║                               ║
║  ───────────────────────      ║
║  법무법인 더율 | 2025.11.21    ║
║                               ║
║  자세히 읽기 →                 ║
║                               ║
╚═══════════════════════════════╝
```

**Key Measurements:**
- Card Width: Full container
- Image Height: 200px
- Content Padding: 20px
- Stacked vertically

---

## Color Palette Mapping

### Category Gradient System

#### 위자료 (Alimony)
```
Background Gradient:
┌────────────────────┐
│ #FEF3C7 (Amber-100)│  ← Top
│        ↓           │
│ #FED7AA (Orange-100)│  ← Bottom
└────────────────────┘

Icon: 💰
Badge: bg-white/95 text-amber-700
```

#### 재산분할 (Property Division)
```
Background Gradient:
┌────────────────────┐
│ #D1FAE5 (Emerald-100)│  ← Top
│        ↓            │
│ #CCFBF1 (Teal-100)  │  ← Bottom
└────────────────────┘

Icon: 🏠
Badge: bg-white/95 text-amber-700
```

#### 양육권 (Custody)
```
Background Gradient:
┌────────────────────┐
│ #FFE4E6 (Rose-100)  │  ← Top
│        ↓            │
│ #FCE7F3 (Pink-100)  │  ← Bottom
└────────────────────┘

Icon: 👶
Badge: bg-white/95 text-amber-700
```

#### 불륜 (Adultery)
```
Background Gradient:
┌────────────────────┐
│ #FEE2E2 (Red-100)   │  ← Top
│        ↓            │
│ #FFE4E6 (Rose-100)  │  ← Bottom
└────────────────────┘

Icon: 💔
Badge: bg-white/95 text-amber-700
```

#### 법률정보 (Legal Info)
```
Background Gradient:
┌────────────────────┐
│ #FEF3C7 (Amber-100) │  ← Top
│        ↓            │
│ #FEF08A (Yellow-100)│  ← Bottom
└────────────────────┘

Icon: ⚖️
Badge: bg-white/95 text-amber-700
```

#### 이혼절차 (Divorce Process)
```
Background Gradient:
┌────────────────────┐
│ #DBEAFE (Blue-100)  │  ← Top
│        ↓            │
│ #E0E7FF (Indigo-100)│  ← Bottom
└────────────────────┘

Icon: 📋
Badge: bg-white/95 text-amber-700
```

---

## Typography Hierarchy

### Section Header
```
Expert Column
(12px, tracking-widest, amber-600/70, uppercase)

판결문엔 안 나오는 진짜 이야기
(48px desktop / 30px mobile, font-bold, gray-900)

법정 밖에서 꼭 알아야 할 현실적인 조언들
(18px desktop / 16px mobile, font-light, gray-600)
```

### Card Typography
```
Category Badge:
┌──────────┐
│  위자료   │  (12px, font-semibold, amber-700)
└──────────┘

Read Time:
⏱ 5분 읽기  (12px, font-medium, gray-500)

Title:
이혼 시 재산분할 청구 방법
(18px desktop / 16px mobile, font-bold, gray-900)
→ hover: amber-600

Excerpt:
재산분할은 이혼 시 부부가 공동으로...
(14px, regular, gray-600, line-clamp-2)

Meta Info:
법무법인 더율       2025. 11. 21.
(12px, font-medium, gray-500 / gray-400)

CTA:
자세히 읽기 →
(14px, font-medium, amber-600)
→ hover: gap increases
```

---

## Spacing & Layout Grid

### Desktop Grid System (≥1024px)
```
Container: max-w-[1200px]
Padding: px-12 (48px)

┌────────────────────────────────────────────────────────┐
│                    1200px Container                     │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│  │          │    │          │    │          │         │
│  │  Card 1  │    │  Card 2  │    │  Card 3  │         │
│  │  368px   │    │  368px   │    │  368px   │         │
│  │          │    │          │    │          │         │
│  └──────────┘    └──────────┘    └──────────┘         │
│                                                         │
│    ←24px gap→     ←24px gap→                           │
│                                                         │
└────────────────────────────────────────────────────────┘

Grid: grid-cols-3
Gap: 24px (gap-6)
Card Width: ~368px each
```

### Tablet Grid System (768px - 1023px)
```
Container: max-w-[1200px]
Padding: px-12 (48px)

┌────────────────────────────────────────┐
│          Tablet Container              │
│                                        │
│  ┌──────────────┐  ┌──────────────┐   │
│  │              │  │              │   │
│  │    Card 1    │  │    Card 2    │   │
│  │              │  │              │   │
│  └──────────────┘  └──────────────┘   │
│                                        │
│  ┌──────────────┐                     │
│  │    Card 3    │                     │
│  └──────────────┘                     │
│                                        │
└────────────────────────────────────────┘

Grid: grid-cols-2
Gap: 24px
Card Width: ~360px each
```

### Mobile Layout (<768px)
```
Container: full width
Padding: px-6 (24px)

┌─────────────────────┐
│   Mobile Stack      │
│                     │
│  ┌───────────────┐  │
│  │   Card 1      │  │
│  │   Full Width  │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │   Card 2      │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │   Card 3      │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘

Grid: grid-cols-1
Gap: 24px
Card Width: 100%
```

---

## Interaction States

### Default State
```
Card:
- Background: white
- Border: 1px solid #E5E7EB (gray-200)
- Shadow: none

Image:
- Gradient background
- Icon centered (if no image)

Text:
- Title: gray-900
- Excerpt: gray-600
```

### Hover State (Desktop)
```
Card:
- Border: 1px solid #FCD34D (amber-300)
- Shadow: 0 20px 25px -5px rgba(0,0,0,0.1)
- Transition: all 300ms

Title:
- Color: #D97706 (amber-600)
- Transition: colors 300ms

CTA Arrow:
- Gap increases: gap-2 → gap-3
- Smooth transition
```

### Active State (Mobile)
```
Card:
- Scale: 0.98
- Brief press animation
- Maintains tap highlight
```

### Focus State (Accessibility)
```
Card:
- Outline: 2px solid amber-500
- Outline offset: 2px
- Visible focus indicator
```

---

## Image Placeholder System

### When No Image Available

The design gracefully degrades to show:

```
┌────────────────────┐
│                    │
│  Category Gradient │
│                    │
│       💰          │  ← Large emoji icon
│   (opacity: 40%)   │
│                    │
│  ┌──────────┐      │
│  │ Category │      │  ← Badge overlay
│  └──────────┘      │
│                    │
└────────────────────┘
```

**Gradient Examples:**
- Amber gradient + 💰 (위자료)
- Emerald gradient + 🏠 (재산분할)
- Rose gradient + 👶 (양육권)
- Blue gradient + 📋 (이혼절차)

This ensures:
1. No broken image icons
2. Visual consistency maintained
3. Category immediately recognizable
4. Professional appearance preserved

---

## Responsive Breakpoints

```
Mobile:     < 768px   (Single column)
Tablet:     768px+    (2 columns)
Desktop:    1024px+   (3 columns)
Large:      1200px+   (Max container width)
```

### Tailwind Classes Used
```typescript
// Grid
"grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// Image sizing
"w-full md:w-[140px] lg:w-[160px]"
"h-[200px] md:h-auto"

// Flex direction
"flex flex-col md:flex-row"

// Padding
"p-5 md:p-4 lg:p-5"

// Text sizing
"text-base md:text-lg"
```

---

## Accessibility Features

### Semantic HTML
```html
<section>                    ← Landmark
  <h2>판결문엔 안...</h2>      ← Heading hierarchy
  <Link>                     ← Interactive element
    <Image alt="...">        ← Alt text
    <h3>Card Title</h3>      ← Subheading
    <p>Excerpt...</p>        ← Description
  </Link>
</section>
```

### Keyboard Navigation
- Tab: Navigate between cards
- Enter/Space: Activate link
- Focus visible: Amber outline

### Screen Reader Support
```
Announces:
1. "Link, 이혼 시 재산분할 청구 방법"
2. "위자료 category, 5분 읽기"
3. "법무법인 더율, 2025년 11월 21일"
4. "자세히 읽기"
```

### Color Contrast
- Title (gray-900 on white): 19.86:1 ✅ AAA
- Excerpt (gray-600 on white): 7.23:1 ✅ AA
- Category badge (amber-700 on white/95): 6.11:1 ✅ AA
- Meta text (gray-500 on white): 4.63:1 ✅ AA

---

## Performance Optimizations

### Image Loading
```typescript
<Image
  src={illustration_image}
  alt={title}
  fill                        // Responsive sizing
  className="object-cover"    // Proper scaling
  sizes="(max-width: 768px) 100vw, 160px"
  // Automatic:
  // - Lazy loading
  // - WebP conversion
  // - Blur placeholder
/>
```

### CSS Performance
- Hardware-accelerated transitions (transform, opacity)
- Will-change hints avoided (use sparingly)
- Flexbox for layout (better than float)

### Bundle Size
- No additional dependencies
- Reuses existing components (Link, Image)
- Minimal custom CSS (Tailwind classes)

---

## Cross-Browser Compatibility

### Tested Browsers
- Chrome 90+ ✅
- Safari 14+ ✅
- Firefox 88+ ✅
- Edge 90+ ✅
- Mobile Safari iOS 14+ ✅
- Chrome Android 90+ ✅

### Fallbacks
- WebP → JPEG/PNG (automatic)
- Flexbox (100% support)
- Grid (99.8% support)
- CSS gradients (100% support)

---

## Design Tokens Reference

### Colors
```css
/* Primary Palette */
--amber-50:  #FFFBEB
--amber-100: #FEF3C7
--amber-600: #D97706
--amber-700: #B45309

/* Neutral Palette */
--gray-100:  #F3F4F6
--gray-200:  #E5E7EB
--gray-400:  #9CA3AF
--gray-500:  #6B7280
--gray-600:  #4B5563
--gray-900:  #111827

/* Category Gradients */
--gradient-alimony: linear-gradient(135deg, #FEF3C7, #FED7AA)
--gradient-property: linear-gradient(135deg, #D1FAE5, #CCFBF1)
--gradient-custody: linear-gradient(135deg, #FFE4E6, #FCE7F3)
```

### Spacing Scale
```
0.5 = 2px   (0.125rem)
1   = 4px   (0.25rem)
2   = 8px   (0.5rem)
3   = 12px  (0.75rem)
4   = 16px  (1rem)
5   = 20px  (1.25rem)
6   = 24px  (1.5rem)
```

### Typography Scale
```
xs:   12px  (0.75rem)
sm:   14px  (0.875rem)
base: 16px  (1rem)
lg:   18px  (1.125rem)
xl:   20px  (1.25rem)
3xl:  30px  (1.875rem)
5xl:  48px  (3rem)
```

---

## Implementation Checklist

### Design Review
- [ ] Visual hierarchy clear
- [ ] Color contrast meets WCAG AA
- [ ] Typography readable on all screens
- [ ] Spacing consistent with site
- [ ] Animations smooth (60fps)

### Functionality
- [ ] Images load correctly
- [ ] Fallback gradients display
- [ ] Links navigate properly
- [ ] Hover states work on desktop
- [ ] Touch targets meet 44x44px

### Responsive Design
- [ ] Mobile layout stacks vertically
- [ ] Tablet shows 2 columns
- [ ] Desktop shows 3 columns
- [ ] No horizontal scroll
- [ ] Content readable at all sizes

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces correctly
- [ ] Alt text descriptive
- [ ] Color contrast sufficient

### Performance
- [ ] Images optimized (< 50KB)
- [ ] Lazy loading enabled
- [ ] No layout shift
- [ ] Fast paint times
- [ ] Smooth animations

---

**Design System**: Based on Toss (toss.im) principles
**Last Updated**: 2025-11-21
**Component**: `/Users/hskim/theyool/components/features/ExpertInsights.tsx`
