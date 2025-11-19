# Consultation Page Color Reference Guide

Quick reference for all color codes and gradients used in the redesign.

---

## Primary Color System

### Amber (Warmth, Action, Urgency)
Use for: Primary CTAs, urgent actions, process highlights

```css
/* Light backgrounds */
bg-amber-50: #fffbeb
bg-amber-50/20: rgba(255, 251, 235, 0.2)
bg-amber-50/30: rgba(255, 251, 235, 0.3)
bg-amber-50/40: rgba(255, 251, 235, 0.4)

bg-amber-100: #fef3c7
bg-amber-200: #fde68a

/* Borders */
border-amber-100: #fef3c7
border-amber-200: #fde68a
border-amber-300: #fcd34d

/* Text & Icons */
text-amber-600: #d97706
text-amber-700: #b45309
text-amber-800: #92400e

/* Button Gradients */
from-amber-600 to-amber-700
  Normal: #d97706 → #b45309

from-amber-700 to-amber-800
  Hover: #b45309 → #92400e

/* Soft Box Gradients */
from-amber-100 to-amber-200
  Light gradient: #fef3c7 → #fde68a
```

---

### Blue (Trust, Calm, Information)
Use for: Secondary CTAs, informational sections, calm channels

```css
/* Light backgrounds */
bg-blue-50: #eff6ff
bg-blue-50/20: rgba(239, 246, 255, 0.2)
bg-blue-50/30: rgba(239, 246, 255, 0.3)

bg-blue-100: #dbeafe
bg-blue-200: #bfdbfe

/* Borders */
border-blue-100: #dbeafe
border-blue-200: #bfdbfe
border-blue-300: #93c5fd

/* Text & Icons */
text-blue-600: #2563eb
text-blue-700: #1d4ed8
text-blue-800: #1e40af

/* Button Gradients */
from-blue-600 to-blue-700
  Normal: #2563eb → #1d4ed8

from-blue-700 to-blue-800
  Hover: #1d4ed8 → #1e40af

/* Soft Box Gradients */
from-blue-100 to-blue-200
  Light gradient: #dbeafe → #bfdbfe
```

---

### Gray (Neutral, Text, Borders)
Use for: Text, subtle borders, neutral backgrounds

```css
/* Backgrounds */
bg-gray-50: #f9fafb
bg-gray-100: #f3f4f6
bg-white: #ffffff

/* Borders */
border-gray-100: #f3f4f6
border-gray-200: #e5e7eb
border-gray-300: #d1d5db

/* Text */
text-gray-500: #6b7280  /* Subtle text */
text-gray-600: #4b5563  /* Secondary text */
text-gray-700: #374151  /* Body text */
text-gray-900: #111827  /* Headings */
```

---

### Red (Urgency, Alerts)
Use for: "긴급" badges, high-priority indicators

```css
/* Badges */
bg-red-600: #dc2626
bg-red-700: #b91c1c

/* Text */
text-red-600: #dc2626
text-red-700: #b91c1c
```

---

### Pink (Success Cases)
Use for: Case study cards, success highlights

```css
/* Backgrounds */
bg-pink-100: #fce7f3
bg-pink-500: #ec4899

/* Text */
text-pink-600: #db2777
text-pink-700: #be185d
```

---

## Component-Specific Colors

### Process Numbers

**Step 1 (Quick Action - Amber)**:
```tsx
bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800
```
**Hex**: `#fef3c7` → `#fde68a`, Text: `#92400e`

**Step 2 (Support - Blue)**:
```tsx
bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800
```
**Hex**: `#dbeafe` → `#bfdbfe`, Text: `#1e40af`

**Step 3 (Strategy - Amber)**:
```tsx
bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800
```
**Hex**: `#fef3c7` → `#fde68a`, Text: `#92400e`

---

### Meeting Method Buttons

**Phone (Urgent - Amber)**:
```tsx
bg-gradient-to-r from-amber-600 to-amber-700
hover:from-amber-700 hover:to-amber-800
```
**Hex**:
- Normal: `#d97706` → `#b45309`
- Hover: `#b45309` → `#92400e`

**Video (Convenient - Blue)**:
```tsx
bg-gradient-to-r from-blue-600 to-blue-700
hover:from-blue-700 hover:to-blue-800
```
**Hex**:
- Normal: `#2563eb` → `#1d4ed8`
- Hover: `#1d4ed8` → `#1e40af`

**Visit (Recommended - Amber)**:
```tsx
bg-gradient-to-r from-amber-600 to-amber-700
hover:from-amber-700 hover:to-amber-800
```
**Hex**:
- Normal: `#d97706` → `#b45309`
- Hover: `#b45309` → `#92400e`

---

### Icon Backgrounds

**Phone Icon (Urgent - Amber)**:
```tsx
bg-gradient-to-br from-amber-50 to-amber-100
border-2 border-amber-200
text-amber-600
```
**Hex**:
- Background: `#fffbeb` → `#fef3c7`
- Border: `#fde68a`
- Icon: `#d97706`

**Video Icon (Convenient - Blue)**:
```tsx
bg-gradient-to-br from-blue-50 to-blue-100
border-2 border-blue-200
text-blue-600
```
**Hex**:
- Background: `#eff6ff` → `#dbeafe`
- Border: `#bfdbfe`
- Icon: `#2563eb`

**Visit Icon (Recommended - Amber)**:
```tsx
bg-gradient-to-br from-amber-50 to-amber-100
border-2 border-amber-300
text-amber-600
```
**Hex**:
- Background: `#fffbeb` → `#fef3c7`
- Border: `#fcd34d`
- Icon: `#d97706`

---

### Section Backgrounds

**Hero Section**:
```tsx
bg-gradient-to-b from-blue-50/40 via-white to-white
```

**Process Section**:
```tsx
bg-gradient-to-b from-white via-amber-50/30 to-white
```

**Preparation Section**:
```tsx
bg-white
```

**Channel Section**:
```tsx
bg-gradient-to-b from-amber-50/20 via-white to-white
```

**FAQ Section**:
```tsx
bg-gradient-to-b from-white via-blue-50/20 to-white
```

**Cost Section**:
```tsx
bg-white
```

**Lawyer Section**:
```tsx
bg-gradient-to-b from-white via-blue-50/20 to-white
```

**Testimonials Section**:
```tsx
bg-white
```

**Final CTA**:
```tsx
bg-gradient-to-b from-white via-amber-50/30 to-amber-50/20
```

---

## Badges

### "긴급" Badge (Phone)
```tsx
bg-red-600 text-white text-xs font-bold rounded px-2 py-1
```
**Hex**: Background `#dc2626`, Text `#ffffff`

### "추천" Badge (Visit)
```tsx
bg-amber-600 text-white text-xs font-bold rounded-full px-3 py-1
```
**Hex**: Background `#d97706`, Text `#ffffff`

### "인기" Badge (KakaoTalk in modal)
```tsx
bg-amber-600 text-white text-xs font-semibold rounded px-2 py-0.5
```
**Hex**: Background `#d97706`, Text `#ffffff`

---

## Shadows

### Subtle Shadow (Cards)
```tsx
shadow-sm
```
**CSS**: `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`

### Medium Shadow (Cards on hover)
```tsx
shadow-md
```
**CSS**: `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)`

### Large Shadow (Buttons)
```tsx
shadow-lg
```
**CSS**: `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)`

### Extra Large Shadow (Emphasized cards)
```tsx
shadow-xl
```
**CSS**: `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)`

### 2XL Shadow (Final CTA)
```tsx
shadow-2xl
```
**CSS**: `box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`

---

## Transitions & Animations

### Standard Transition
```tsx
transition-all duration-300
```

### Hover Scale (Buttons)
```tsx
hover:scale-[1.02]
```

### Hover Shadow Lift
```tsx
hover:shadow-lg
hover:shadow-xl
```

### Pulse (Badges)
```tsx
animate-pulse
```
**CSS**: Fades opacity 0-100-0 over 2 seconds

---

## Copy-Paste Ready ClassNames

### Process Number Box
```
flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-800 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm
```

### Phone Button (Primary CTA)
```
block w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-full transition-all shadow-md text-center hover:shadow-lg hover:scale-[1.02]
```

### Video Button (Secondary CTA)
```
w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02]
```

### Visit Button (Primary CTA)
```
w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-[1.02]
```

### Phone Icon Background
```
relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl h-48 flex items-center justify-center mb-4 border-2 border-amber-200 overflow-hidden
```

### Video Icon Background
```
relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl h-48 flex items-center justify-center mb-4 border-2 border-blue-200
```

### Visit Icon Background
```
relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl h-48 flex items-center justify-center mb-4 border-2 border-amber-300
```

### "긴급" Badge
```
absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded
```

### "추천" Badge
```
absolute -top-3 left-6 px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded-full shadow-md
```

---

## Why These Colors?

### Amber (#d97706 family)
- **Psychology**: Warmth, optimism, action, energy
- **Legal context**: "We care about you", "We're here to help"
- **Use cases**: Primary CTAs, urgent actions, recommended options
- **Avoid**: Overuse (can feel too energetic)

### Blue (#2563eb family)
- **Psychology**: Trust, calm, professionalism, stability
- **Legal context**: "We're reliable", "You're safe here"
- **Use cases**: Secondary CTAs, informational content, calm channels
- **Avoid**: Too much (can feel cold)

### Gray (#374151 family)
- **Psychology**: Neutral, professional, clean
- **Legal context**: "We're serious", "We're professional"
- **Use cases**: Text, borders, subtle backgrounds
- **Avoid**: Large solid areas (too corporate)

### Red (#dc2626)
- **Psychology**: Urgency, importance, attention
- **Legal context**: "Act now", "This is important"
- **Use cases**: Urgency badges only
- **Avoid**: Large areas (creates anxiety)

### Black (#111827)
- **Psychology**: Authority, seriousness, formality
- **Legal context**: "We're a big corporation"
- **Use cases**: Text, floating Talk button ONLY
- **Avoid**: Backgrounds, buttons, boxes (too harsh)

---

## Common Mistakes to Avoid

❌ **Don't**: Use `bg-gray-900` for process boxes
✅ **Do**: Use `bg-gradient-to-br from-amber-100 to-amber-200`

❌ **Don't**: Use black for all buttons
✅ **Do**: Color-code by urgency (amber = urgent, blue = calm)

❌ **Don't**: Use flat colors
✅ **Do**: Use gradients for depth

❌ **Don't**: Skip shadows
✅ **Do**: Add subtle shadows for professionalism

❌ **Don't**: Use red everywhere
✅ **Do**: Use red sparingly for urgency only

---

## Testing Your Colors

### Browser DevTools
1. Right-click element → Inspect
2. Check computed styles
3. Verify hex codes match this guide

### Visual Test
- Does it feel warm? (Amber) ✅
- Does it feel trustworthy? (Blue/Amber) ✅
- Does it feel professional? (Subtle shadows) ✅
- Does it feel cold? (Too much black) ❌

### Mobile Test
- Colors should be slightly lighter on mobile
- Gradients should render smoothly
- Shadows should be visible but not heavy

---

**Last updated**: 2025-11-19
**Related docs**:
- Full review: `CONSULTATION_PAGE_DESIGN_REVIEW.md`
- Quick fix: `CONSULTATION_PAGE_QUICK_FIX_GUIDE.md`
