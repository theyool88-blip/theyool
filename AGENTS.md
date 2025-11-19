# Repository Guidelines

**Last Updated**: 2025-11-16

## Project Structure & Module Organization
- `app/` contains Next.js App Router routes; primary calculators live under `app/child-support-calculator/`, while blog pages are in `app/blog/`.
- Shared UI and motion primitives sit in `components/` (e.g., `components/features/ConsultationButton.tsx`).
- Business logic and constants live in `data/` and `lib/`; for example, `data/childSupportGuidelines.ts` holds the official 2025 양육비 표 used across calculators.
- Automation and migration helpers reside in `scripts/` and the Supabase setup under `supabase/`.

### Database & Backend Structure
- **Supabase Schema**: All database schema documentation is in `DATABASE.md` (comprehensive reference)
- **Migrations**: Located in `supabase/migrations/` - all schema changes must be documented here
- **Data Models**: TypeScript interfaces in `lib/supabase/*.ts` match database tables exactly
- **API Routes**: RESTful endpoints in `app/api/admin/` for CRUD operations
- **Storage**: Supabase Storage buckets (`blog-images/`, `case-images/`, `instagram-media/`)

## Build, Test, and Development Commands
- `npm run dev` launches the Next.js dev server (App Router, React 19). Use when iterating on UI or API routes.
- `npm run build` produces the optimized production bundle; run before submitting PRs to surface type or parsing issues.
- `npm run lint` executes the repo-wide ESLint config (`eslint.config.mjs`). Fix warnings locally to avoid CI noise.

## Coding Style & Naming Conventions
- Use TypeScript everywhere (files default to `.tsx` in `app/`). Prefer functional React components with hooks; keep server components free of browser-only APIs.
- Follow the Tailwind-first styling already in place. Group utility classes logically and avoid inline styles unless dynamic.
- Copy uses Korean labels for user-facing text; keep wording consistent (`본인/배우자`, `도시/농어촌`). Convert input units to 원 internally.
- Naming mirrors intent: `ChildSupportCalculatorClient` for client components, snake_case is avoided, and constants live in SCREAMING_CASE when shared.

## Design Consistency & Visual Guidelines

**CRITICAL DIRECTIVE (2025-11-18)**: All pages must maintain visual consistency with the homepage (`app/page.tsx`). No "중구난방" (hodgepodge) design.

### Design Agent Responsibilities
1. **ALWAYS** reference homepage design patterns before creating/modifying any page
2. **NEVER** introduce new design patterns without consulting content-ad-strategist agent
3. **MAINTAIN** consistency in: colors, typography, spacing, backgrounds, card styles, shadows
4. If deviation from homepage is needed, **MUST** have special reason approved by content agent

### Homepage Design System (Reference: `/app/page.tsx`)

#### Color Palette (ONLY use these)
- **Primary**: Gray-900 (dark), Blue-600 (accent)
- **Section Colors**: Pink (성공사례), Amber/Orange (칼럼), Blue (일반)
- **Backgrounds**: White, Blue-50/20, Amber-50/20 gradients only
- **NO**: Purple, solid colored backgrounds, solid gradient cards

#### Typography Hierarchy
```tsx
// Section Labels
text-xs md:text-sm text-[color]-600/70 tracking-[0.2em] uppercase

// H1 (Hero)
text-4xl md:text-6xl font-bold tracking-tight

// H2 (Section Headings)
text-3xl md:text-5xl font-bold tracking-tight

// Body Text
text-base md:text-lg font-light leading-relaxed

// Emphasis
font-medium or font-semibold (not font-bold for body)
```

#### Backgrounds (Consistent Pattern)
```tsx
// Section Backgrounds - Alternate between:
bg-gradient-to-b from-white via-blue-50/20 to-white
bg-gradient-to-b from-white via-amber-50/20 to-white

// Final CTA Section
bg-gradient-to-b from-white via-blue-50/30 to-amber-50/20

// Hero Section
relative min-h-[90vh] with geometric SVG pattern background
```

#### Card Styles (White + Hover)
```tsx
// Standard Card
bg-white rounded-2xl p-6 shadow-md hover:shadow-xl
border-2 border-transparent hover:border-[color]-500

// Featured Card
bg-white rounded-2xl border-2 border-blue-500 shadow-lg

// NO solid gradient backgrounds on cards
// YES: white background + gradient overlay on hover
```

#### Spacing & Layout
```tsx
// Section Padding
py-16 md:py-24

// Container Width
max-w-[1200px] mx-auto px-6 md:px-12

// Grid Gaps
gap-6 to gap-8 (cards)
gap-12 (major sections)

// Rounded Corners
rounded-2xl (cards), rounded-3xl (major containers)
```

#### Image Placeholders
```tsx
// Minimalist Gradient Style
bg-gradient-to-br from-gray-50 to-gray-100
+ absolute overlay: bg-gradient-to-br from-white/40 to-transparent
+ emoji opacity-20 (not full opacity)
```

#### Buttons
```tsx
// Primary CTA
bg-gray-900 text-white rounded-full px-6 py-2.5 md:px-8 md:py-3
font-medium text-xs md:text-sm shadow-lg hover:shadow-xl

// Secondary CTA
bg-white border-2 border-gray-900 text-gray-900 rounded-full
```

### Design Consistency Checklist
Before submitting any page design, verify:
- [ ] Uses only homepage color palette
- [ ] Backgrounds are white or subtle gradients (via-blue-50/20)
- [ ] Cards are white with hover treatments (not solid colored)
- [ ] Typography matches hierarchy exactly
- [ ] Section labels included (uppercase tracking-[0.2em])
- [ ] Spacing follows py-16 md:py-24 pattern
- [ ] No purple, no solid backgrounds, no中구난방
- [ ] Feels like natural extension of homepage

## Testing Guidelines
- No formal Jest/Cypress suite yet; rely on targeted scripts (e.g., TypeScript transpile checks) and manual validation per feature.
- When adding calculator logic, transcribe reference tables into `data/` and verify sample scenarios via node scripts (see how `childSupportGuidelines` was spot-tested).
- Document the scenarios and expected numbers in PR descriptions so reviewers can reproduce the math quickly.

## Commit & Pull Request Guidelines
- Follow the existing conventional-prefix style (`feat:`, `fix:`, `chore:`) as seen in recent history.
- Keep commits scoped to one concern (e.g., "feat: update child-support tables") so rollbacks are easy.
- PRs should describe motivation, list affected routes (`/child-support-calculator`, `/blog/[slug]`), attach screenshots for UI work, and link to any specs or reference tables.
- Mention any environment steps (Supabase migrations, .env keys) when relevant to help reviewers reproduce locally.

## Database Changes & Migration Protocol
When modifying database schema:
1. **Create Migration File**: Add to `supabase/migrations/YYYYMMDD_description.sql`
2. **Update TypeScript Types**: Modify interfaces in `lib/supabase/*.ts`
3. **Update API Routes**: Modify `/app/api/admin/` endpoints if needed
4. **Update DATABASE.md**: Document new columns, indexes, or features
5. **Update AGENTS.md**: Add notes about schema changes (this file)
6. **Test Migration**: Verify with a validation script before committing
7. **Update Frontend**: Modify UI components to use new fields

### Recent Schema Changes (2025-11-16)
- **FAQs Table Enhancement**: Added `related_blog_posts` and `related_cases` TEXT[] columns
  - Purpose: Manual curation of related content (hybrid with automatic category matching)
  - Implementation: Admin UI allows multi-select, frontend uses manual refs with fallback
  - Migration: `supabase/migrations/20251116_add_faq_references.sql`
  - Indexes: GIN indexes on both array columns for performance
