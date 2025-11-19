# Testimonials System Architecture

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────────┐   │
│  │   Public Pages   │              │   Admin Dashboard    │   │
│  ├──────────────────┤              ├──────────────────────┤   │
│  │ - Homepage       │              │ - Login              │   │
│  │ - Testimonials   │              │ - Testimonial CRUD   │   │
│  │ - Case Pages     │              │ - Photo Upload       │   │
│  └────────┬─────────┘              └──────────┬───────────┘   │
│           │                                   │                │
│           │ GET /api/testimonials             │ /api/admin/   │
│           │                                   │ testimonials  │
└───────────┼───────────────────────────────────┼───────────────┘
            │                                   │
            │                                   │ (Authenticated)
            ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API Routes (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────────┐   │
│  │   Public API     │              │    Admin API         │   │
│  ├──────────────────┤              ├──────────────────────┤   │
│  │ GET  /testimonials              │ GET    /admin/testimonials   │
│  │ POST /testimonials              │ POST   /admin/testimonials   │
│  │      ?helpful=id │              │ PATCH  /admin/testimonials/:id│
│  │                  │              │ DELETE /admin/testimonials/:id│
│  │                  │              │ POST   /admin/testimonials/   │
│  │                  │              │        upload-photo           │
│  └────────┬─────────┘              └──────────┬───────────┘   │
│           │                                   │                │
│           │ [Auth Check]                      │ [Session      │
│           │ RLS: published=true               │  Required]    │
│           │      consent_given=true           │                │
└───────────┼───────────────────────────────────┼───────────────┘
            │                                   │
            │                                   │
            ▼                                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Supabase (Backend)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           PostgreSQL Database                             │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │  │
│  │  ┃  Table: testimonials                              ┃  │  │
│  │  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫  │  │
│  │  ┃  - id (PK)                                        ┃  │  │
│  │  ┃  - client_name, client_initial                    ┃  │  │
│  │  ┃  - case_category, case_result                     ┃  │  │
│  │  ┃  - content, rating                                ┃  │  │
│  │  ┃  - photo_url, use_photo                           ┃  │  │
│  │  ┃  - verified, consent_given [CRITICAL]             ┃  │  │
│  │  ┃  - published, featured                            ┃  │  │
│  │  ┃  - display_order                                  ┃  │  │
│  │  ┃  - metadata (JSONB)                               ┃  │  │
│  │  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │  │
│  │                                                           │  │
│  │  Indexes:                                                 │  │
│  │  - idx_testimonials_category                              │  │
│  │  - idx_testimonials_published                             │  │
│  │  - idx_testimonials_search (GIN)                          │  │
│  │  - ... (11 total)                                         │  │
│  │                                                           │  │
│  │  Functions:                                               │  │
│  │  - increment_testimonial_views(id)                        │  │
│  │  - increment_testimonial_helpful(id)                      │  │
│  │  - get_testimonial_stats_by_category()                    │  │
│  │                                                           │  │
│  │  RLS Policies:                                            │  │
│  │  - Public SELECT: published=true AND consent_given=true   │  │
│  │  - Admin ALL: auth.role() = 'authenticated'               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Storage (testimonial-photos)                    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  testimonial-photos/                                      │  │
│  │  ├── {testimonial_id}/                                    │  │
│  │  │   ├── 1700000000_photo1.jpg                           │  │
│  │  │   └── 1700000001_photo2.png                           │  │
│  │  └── defaults/                                            │  │
│  │      └── avatar-amber.svg                                 │  │
│  │                                                           │  │
│  │  Policies:                                                │  │
│  │  - Public SELECT                                          │  │
│  │  - Authenticated INSERT/UPDATE/DELETE                     │  │
│  │                                                           │  │
│  │  Constraints:                                             │  │
│  │  - Max size: 5MB                                          │  │
│  │  - Types: image/jpeg, image/png, image/webp              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Authentication                                  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  - Cookie-based sessions                                  │  │
│  │  - admin@theyool.com                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### 1. Public Testimonial View (공개 후기 조회)

```
User visits Homepage
       │
       ▼
┌────────────────────┐
│ TestimonialsCarousel│
│ Component          │
└─────────┬──────────┘
          │
          │ useEffect() on mount
          ▼
┌────────────────────────────────┐
│ fetchPublicTestimonials()      │
│ - limit: 9                     │
│ - featured: optional           │
└─────────┬──────────────────────┘
          │
          │ GET /api/testimonials?limit=9
          ▼
┌────────────────────────────────┐
│ API Route Handler              │
│ - No auth required             │
│ - Applies RLS automatically    │
└─────────┬──────────────────────┘
          │
          │ Supabase Query
          ▼
┌────────────────────────────────┐
│ SELECT * FROM testimonials     │
│ WHERE published = true         │
│   AND consent_given = true     │
│ ORDER BY display_order ASC,    │
│          created_at DESC       │
│ LIMIT 9                        │
└─────────┬──────────────────────┘
          │
          │ Returns data[]
          ▼
┌────────────────────────────────┐
│ Component renders:             │
│ - Carousel with 3 visible      │
│ - Photos or initials           │
│ - Verified badges              │
│ - Rating stars                 │
└────────────────────────────────┘
```

### 2. Admin Testimonial Creation (관리자 후기 생성)

```
Admin logs in
       │
       ▼
/admin/testimonials
       │
       │ Click "새 후기 추가"
       ▼
┌────────────────────┐
│ TestimonialModal   │
│ - Tab 1: 기본 정보  │
│ - Tab 2: 후기 내용  │
│ - Tab 3: 사진 관리  │
│ - Tab 4: 게시 설정  │
└─────────┬──────────┘
          │
          │ Fill form & submit
          ▼
┌────────────────────────────────┐
│ POST /api/admin/testimonials   │
│ Body: {                        │
│   client_name: "김○○",        │
│   content: "...",              │
│   consent_given: true,         │
│   published: true,             │
│   ...                          │
│ }                              │
└─────────┬──────────────────────┘
          │
          │ 1. Check session
          │ 2. Validate fields
          ▼
┌────────────────────────────────┐
│ Supabase Insert                │
│ INSERT INTO testimonials (...)  │
│ VALUES (...)                   │
│ RETURNING *                    │
└─────────┬──────────────────────┘
          │
          │ Success: { id: "uuid", ... }
          ▼
┌────────────────────────────────┐
│ Optional: Upload Photo         │
│ - User selects file            │
│ - POST /api/admin/testimonials/│
│        upload-photo            │
└─────────┬──────────────────────┘
          │
          │ FormData: { file, testimonialId }
          ▼
┌────────────────────────────────┐
│ 1. Validate file type & size   │
│ 2. Upload to Storage           │
│    - Path: {id}/{timestamp}_...│
│ 3. Get publicUrl               │
│ 4. Update testimonials table   │
│    - SET photo_url = publicUrl │
│    - SET use_photo = true      │
└─────────┬──────────────────────┘
          │
          │ Response: { url: "..." }
          ▼
┌────────────────────────────────┐
│ Modal closes                   │
│ Table refreshes                │
│ New testimonial visible        │
└────────────────────────────────┘
```

### 3. Photo Upload Flow (사진 업로드)

```
Admin clicks "사진 업로드"
       │
       ▼
┌────────────────────┐
│ File Input Dialog  │
└─────────┬──────────┘
          │
          │ User selects image
          ▼
┌────────────────────────────────┐
│ Client-side Validation         │
│ - File type: jpg/png/webp      │
│ - File size: < 5MB             │
│ - Resize to 400x400 (optional) │
└─────────┬──────────────────────┘
          │
          │ FormData
          ▼
┌────────────────────────────────┐
│ POST /api/admin/testimonials/  │
│      upload-photo              │
│                                │
│ FormData: {                    │
│   file: File,                  │
│   testimonialId: "uuid"        │
│ }                              │
└─────────┬──────────────────────┘
          │
          │ 1. Check auth
          │ 2. Server-side validation
          ▼
┌────────────────────────────────┐
│ Supabase Storage Upload        │
│                                │
│ Bucket: testimonial-photos     │
│ Path: {testimonialId}/         │
│       {timestamp}_photo.jpg    │
│                                │
│ Options:                       │
│ - cacheControl: 3600           │
│ - upsert: false                │
└─────────┬──────────────────────┘
          │
          │ Success
          ▼
┌────────────────────────────────┐
│ Get Public URL                 │
│ storage.getPublicUrl(path)     │
└─────────┬──────────────────────┘
          │
          │ URL
          ▼
┌────────────────────────────────┐
│ Update Database                │
│ UPDATE testimonials            │
│ SET photo_url = publicUrl,     │
│     use_photo = true           │
│ WHERE id = testimonialId       │
└─────────┬──────────────────────┘
          │
          │ Response
          ▼
┌────────────────────────────────┐
│ UI Updates                     │
│ - Show preview                 │
│ - Enable "사진 사용" checkbox   │
│ - Display delete button        │
└────────────────────────────────┘
```

### 4. RLS Policy Enforcement (보안)

```
┌──────────────────────┐
│ User Request         │
│ GET /api/testimonials│
└─────────┬────────────┘
          │
          ▼
┌─────────────────────────────────┐
│ Supabase Client Query           │
│ .from('testimonials')           │
│ .select('*')                    │
└─────────┬───────────────────────┘
          │
          │ PostgreSQL intercepts
          ▼
┌─────────────────────────────────┐
│ Check RLS Policies              │
│                                 │
│ IF user is authenticated:       │
│   → Allow ALL operations        │
│                                 │
│ IF user is anonymous:           │
│   → Allow SELECT only if:       │
│      published = true AND       │
│      consent_given = true       │
└─────────┬───────────────────────┘
          │
          │ Modify query
          ▼
┌─────────────────────────────────┐
│ Execute Modified Query          │
│                                 │
│ SELECT * FROM testimonials      │
│ WHERE published = true          │
│   AND consent_given = true      │
│   AND [user's original filters] │
└─────────┬───────────────────────┘
          │
          │ Return filtered results
          ▼
┌─────────────────────────────────┐
│ Response                        │
│ - Only consented testimonials   │
│ - No drafts                     │
│ - No unapproved content         │
└─────────────────────────────────┘
```

---

## Component Hierarchy

```
HomePage
└── TestimonialsCarousel (Client Component)
    ├── useEffect()
    │   └── fetchPublicTestimonials()
    │       └── Supabase Query
    ├── State Management
    │   ├── testimonials: Testimonial[]
    │   ├── currentIndex: number
    │   └── loading: boolean
    ├── Carousel Navigation
    │   ├── Previous Button
    │   └── Next Button
    ├── Testimonial Cards (3 visible)
    │   ├── Header
    │   │   ├── Verified Badge
    │   │   ├── Date
    │   │   └── Rating Stars
    │   ├── Content
    │   │   └── Review Text
    │   ├── Result Badge
    │   └── Client Info
    │       ├── Photo or Avatar
    │       │   ├── IF use_photo: <img src={photo_url} />
    │       │   └── ELSE: <div className={avatar_bg_color}>{initial}</div>
    │       ├── Name
    │       └── Role
    ├── Indicators
    └── Statistics Section
```

---

## Database Relationships (Future)

```
┌─────────────────┐
│   attorneys     │ ← 향후 생성 예정
├─────────────────┤
│ id (PK)         │
│ name            │
│ title           │
│ photo           │
└────────┬────────┘
         │
         │ 1:N
         │
         ▼
┌─────────────────┐
│ testimonials    │
├─────────────────┤
│ id (PK)         │
│ attorney_id (FK)│◄─── 현재는 NULL 허용
│ ...             │
└────────┬────────┘
         │
         │ 1:N (Phase 3)
         │
         ▼
┌──────────────────────┐
│ testimonial_         │
│ submissions          │ ← Phase 3: 공개 제출 폼
├──────────────────────┤
│ id (PK)              │
│ testimonial_id (FK)  │
│ status               │
│ reviewer_id          │
└──────────────────────┘
```

---

## Security Layers

```
┌───────────────────────────────────────────────────────────┐
│ Layer 1: Frontend Validation                              │
│ - React form validation                                   │
│ - Client-side file type/size check                        │
│ - Input length limits                                     │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│ Layer 2: API Route Authentication                         │
│ - getSession() check                                      │
│ - Cookie-based auth                                       │
│ - 401 if unauthorized                                     │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│ Layer 3: Server-side Validation                           │
│ - Required fields check                                   │
│ - Data type validation (Zod or manual)                    │
│ - File upload constraints                                 │
│ - 400 if invalid                                          │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│ Layer 4: Database RLS Policies                            │
│ - Row-level security enforcement                          │
│ - consent_given check for public                          │
│ - auth.role() check for admin                             │
└─────────────────────────┬─────────────────────────────────┘
                          │
                          ▼
┌───────────────────────────────────────────────────────────┐
│ Layer 5: Database Constraints                             │
│ - NOT NULL constraints                                    │
│ - CHECK constraints (rating 1-5)                          │
│ - FOREIGN KEY constraints                                 │
└───────────────────────────────────────────────────────────┘
```

---

## Performance Optimization Strategy

```
┌─────────────────────────────────────────────────────────┐
│ Frontend                                                │
├─────────────────────────────────────────────────────────┤
│ - React.memo() for testimonial cards                    │
│ - useMemo() for filtered/sorted data                    │
│ - Lazy loading images (loading="lazy")                  │
│ - Debounced search input                                │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ API Layer                                               │
├─────────────────────────────────────────────────────────┤
│ - Pagination (offset/limit)                             │
│ - Selective column fetching (not SELECT *)              │
│ - Response compression (gzip)                           │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Database                                                │
├─────────────────────────────────────────────────────────┤
│ - 11 optimized indexes                                  │
│ - Composite index: (published, display_order)           │
│ - GIN index for full-text search                        │
│ - VACUUM ANALYZE (auto-maintenance)                     │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Storage/CDN                                             │
├─────────────────────────────────────────────────────────┤
│ - Supabase CDN (automatic)                              │
│ - Cache-Control: 3600 (1 hour)                          │
│ - Image optimization (WebP preferred)                   │
│ - Client-side resize before upload                      │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
User Action
    │
    ▼
┌──────────────────┐
│ Frontend         │
│ - try/catch      │
└────┬─────────────┘
     │
     │ API Request
     ▼
┌──────────────────────────────────┐
│ API Route                        │
│ - try/catch                      │
│ - Specific error handling:       │
│   • 401: Unauthorized            │
│   • 400: Bad Request             │
│   • 404: Not Found               │
│   • 500: Server Error            │
└────┬─────────────────────────────┘
     │
     │ Database Query
     ▼
┌──────────────────────────────────┐
│ Supabase                         │
│ - Returns error object:          │
│   { error: { code, message } }   │
└────┬─────────────────────────────┘
     │
     │ Error Bubbles Up
     ▼
┌──────────────────────────────────┐
│ Frontend Error Display           │
│ - Toast notification             │
│ - Inline error message           │
│ - Fallback UI                    │
│ - Console.error (dev only)       │
└──────────────────────────────────┘
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│ Vercel (Frontend + API Routes)                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ Next.js Application                     │           │
│  │ - Server Components (SSR)               │           │
│  │ - Client Components (CSR)               │           │
│  │ - API Routes (/api/*)                   │           │
│  └──────────────────┬──────────────────────┘           │
│                     │                                   │
│  ┌──────────────────▼──────────────────────┐           │
│  │ Edge Runtime (Vercel Edge Network)      │           │
│  │ - Global CDN                            │           │
│  │ - Auto-scaling                          │           │
│  └─────────────────────────────────────────┘           │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ HTTPS
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│ Supabase (Backend as a Service)                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ PostgreSQL Database                     │           │
│  │ - Multi-region replication              │           │
│  │ - Auto-backup (daily)                   │           │
│  │ - Point-in-time recovery                │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ Storage (Object Storage)                │           │
│  │ - S3-compatible                         │           │
│  │ - CDN-backed                            │           │
│  │ - Auto image optimization               │           │
│  └─────────────────────────────────────────┘           │
│                                                         │
│  ┌─────────────────────────────────────────┐           │
│  │ Auth (Cookie-based)                     │           │
│  │ - Session management                    │           │
│  │ - Admin authentication                  │           │
│  └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

---

## Monitoring & Observability

```
┌─────────────────────────────────────────┐
│ Frontend Monitoring                     │
├─────────────────────────────────────────┤
│ - Vercel Analytics                      │
│   • Page views                          │
│   • Core Web Vitals                     │
│   • Error tracking                      │
│                                         │
│ - Custom Events (optional)              │
│   • Testimonial views                   │
│   • Helpful clicks                      │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ API Monitoring                          │
├─────────────────────────────────────────┤
│ - Vercel Logs                           │
│   • Request logs                        │
│   • Error logs                          │
│   • Performance metrics                 │
│                                         │
│ - Custom Logging                        │
│   • console.error() in production       │
│   • Structured logs (JSON)              │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ Database Monitoring                     │
├─────────────────────────────────────────┤
│ - Supabase Dashboard                    │
│   • Query performance                   │
│   • Index usage                         │
│   • Table size                          │
│   • Connection pool                     │
│                                         │
│ - Alerts                                │
│   • Slow queries (> 1s)                 │
│   • High error rate                     │
│   • Storage quota                       │
└─────────────────────────────────────────┘
```

---

## State Management (Client)

```
TestimonialsCarousel
├── Local State (useState)
│   ├── testimonials: Testimonial[]
│   ├── loading: boolean
│   ├── currentIndex: number
│   └── error: string | null
│
├── Effects (useEffect)
│   └── [on mount] → fetchPublicTestimonials()
│
└── Handlers
    ├── handlePrev()
    ├── handleNext()
    └── handleIndicatorClick(index)

Admin Management Client
├── Local State
│   ├── testimonials: Testimonial[]
│   ├── selectedTestimonial: Testimonial | null
│   ├── isModalOpen: boolean
│   ├── filters: { category?, published?, verified? }
│   └── pagination: { offset, limit, total }
│
├── Effects
│   ├── [on mount] → fetchAdminTestimonials()
│   └── [on filters change] → refetch()
│
└── Handlers
    ├── handleCreate()
    ├── handleEdit(id)
    ├── handleDelete(id)
    ├── handlePhotoUpload(file)
    └── handlePhotoDelete()
```

---

## Migration Checklist

```
□ Phase 1: Database Setup
  □ Create testimonials table (SQL migration)
  □ Create Storage bucket
  □ Set up RLS policies
  □ Insert initial data (9 testimonials)
  □ Verify indexes created
  □ Test database functions

□ Phase 2: API Routes
  □ Create /api/testimonials (public)
  □ Create /api/admin/testimonials (CRUD)
  □ Create /api/admin/testimonials/upload-photo
  □ Test all endpoints with Postman/curl
  □ Verify authentication works

□ Phase 3: Frontend Components
  □ Update TestimonialsCarousel (use DB)
  □ Test carousel functionality
  □ Verify photos display correctly
  □ Test fallback to initials

□ Phase 4: Admin UI
  □ Create /admin/testimonials page
  □ Build TestimonialModal
  □ Build TestimonialPhotoUploader
  □ Test CRUD operations
  □ Test photo upload/delete

□ Phase 5: Testing
  □ Unit tests (API routes)
  □ Integration tests (E2E)
  □ RLS policy tests
  □ Performance tests (load 1000 testimonials)
  □ Security audit

□ Phase 6: Deployment
  □ Deploy to Vercel
  □ Run migrations on production Supabase
  □ Verify environment variables
  □ Test production endpoints
  □ Monitor for errors

□ Phase 7: Post-Launch
  □ Monitor performance
  □ Collect user feedback
  □ Plan Phase 2 features (video, public form)
```

---

## Conclusion

이 아키텍처는:

✅ **확장 가능**: Metadata, 카테고리, Phase 2/3 확장
✅ **안전**: 5단계 보안 레이어
✅ **빠름**: 11개 인덱스, CDN, 페이지네이션
✅ **유지보수 가능**: 명확한 레이어 분리, 문서화
✅ **프라이버시 우선**: consent_given 필드, RLS 정책

**법무법인 더율의 의뢰인 후기를 프로페셔널하게 관리할 수 있는 완전한 엔터프라이즈 시스템입니다.**
