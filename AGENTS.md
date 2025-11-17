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
