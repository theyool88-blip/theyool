# Testimonials System - Quick Reference

## Table of Contents
1. [Schema](#schema)
2. [API Endpoints](#api-endpoints)
3. [Code Examples](#code-examples)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)

---

## Schema

### Table: `testimonials`

**Essential Fields:**
```sql
id                UUID PRIMARY KEY
client_name       TEXT NOT NULL            -- '김○○'
client_initial    TEXT NOT NULL            -- '김'
client_role       TEXT NOT NULL            -- '재산분할 의뢰인'
case_category     TEXT NOT NULL            -- '재산분할'
case_result       TEXT NOT NULL            -- '은닉 재산 발견'
case_date         TEXT NOT NULL            -- '2024년 8월'
content           TEXT NOT NULL            -- 후기 본문
rating            INTEGER DEFAULT 5        -- 1-5
photo_url         TEXT                     -- Storage URL
use_photo         BOOLEAN DEFAULT false
consent_given     BOOLEAN DEFAULT false    -- [CRITICAL]
published         BOOLEAN DEFAULT false
featured          BOOLEAN DEFAULT false
display_order     INTEGER DEFAULT 0
```

**Categories:**
- 재산분할
- 양육권
- 위자료
- 협의이혼
- 상간손해배상
- 재판이혼
- 양육비청구

---

## API Endpoints

### Public API (No Auth)

```typescript
// Get published testimonials
GET /api/testimonials?category=재산분할&limit=9&offset=0

// Mark helpful
POST /api/testimonials?id={uuid}
```

### Admin API (Auth Required)

```typescript
// List all
GET /api/admin/testimonials?category=재산분할&published=true&limit=50

// Get one
GET /api/admin/testimonials/{id}

// Create
POST /api/admin/testimonials
Body: { client_name, content, consent_given, ... }

// Update
PATCH /api/admin/testimonials/{id}
Body: { published: true, ... }

// Delete
DELETE /api/admin/testimonials/{id}

// Upload photo
POST /api/admin/testimonials/upload-photo
FormData: { file, testimonialId }

// Delete photo
DELETE /api/admin/testimonials/upload-photo
Body: { testimonialId }
```

---

## Code Examples

### 1. Fetch Public Testimonials (Client)

```typescript
import { fetchPublicTestimonials } from '@/lib/supabase/testimonials-client';

const { data, count } = await fetchPublicTestimonials({
  category: '재산분할',
  featured: true,
  limit: 9,
  offset: 0
});
```

### 2. Fetch Public Testimonials (Server)

```typescript
import { getPublishedTestimonials } from '@/lib/supabase/testimonials';

const { data, count, error } = await getPublishedTestimonials({
  category: '양육권',
  limit: 6
});
```

### 3. Create Testimonial (Admin)

```typescript
const response = await fetch('/api/admin/testimonials', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_name: '김○○',
    client_initial: '김',
    client_role: '재산분할 의뢰인',
    case_category: '재산분할',
    case_result: '은닉 재산 발견',
    case_date: '2024년 8월',
    content: '후기 내용...',
    rating: 5,
    verified: true,
    consent_given: true,  // REQUIRED for publishing
    published: true,
    featured: false,
    display_order: 0
  })
});

const data = await response.json();
```

### 4. Upload Photo

```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('testimonialId', testimonialId);

const response = await fetch('/api/admin/testimonials/upload-photo', {
  method: 'POST',
  body: formData
});

const { url } = await response.json();
```

### 5. Update Display Order

```typescript
await fetch(`/api/admin/testimonials/${id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ display_order: newOrder })
});
```

### 6. Render Testimonial Card

```tsx
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {testimonial.verified && (
          <span className="px-2 py-1 bg-green-50 rounded-full">
            ✓ 검증됨
          </span>
        )}
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-amber-400">★</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-6">"{testimonial.content}"</p>

      {/* Result */}
      <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 rounded-full">
        ✓ {testimonial.case_result}
      </span>

      {/* Client Info */}
      <div className="flex items-center gap-3 pt-4 border-t mt-6">
        {testimonial.use_photo && testimonial.photo_url ? (
          <img
            src={testimonial.photo_url}
            alt={testimonial.client_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.avatar_bg_color} rounded-full flex items-center justify-center`}>
            <span className={`${testimonial.avatar_text_color} font-bold text-lg`}>
              {testimonial.client_initial}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold">{testimonial.client_name}</p>
          <p className="text-sm text-gray-500">{testimonial.client_role}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## Common Tasks

### Task 1: Add New Testimonial

1. Login to admin: `/admin/login`
2. Go to `/admin/testimonials`
3. Click "새 후기 추가"
4. Fill form:
   - 기본 정보 (이름, 역할, 카테고리, 결과, 날짜)
   - 후기 내용 (본문, 평점)
   - 사진 업로드 (선택)
   - ✅ **게시 동의 받음** (필수 체크)
5. Click "저장 및 게시"

### Task 2: Change Testimonial Order

```typescript
// Option 1: Drag & Drop (UI)
// Implement with react-beautiful-dnd

// Option 2: Manual
await fetch(`/api/admin/testimonials/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ display_order: 5 })
});
```

### Task 3: Feature a Testimonial

```typescript
await fetch(`/api/admin/testimonials/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ featured: true })
});
```

### Task 4: Unpublish Testimonial

```typescript
// If consent withdrawn
await fetch(`/api/admin/testimonials/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    published: false,
    consent_given: false
  })
});
```

### Task 5: Search Testimonials

```typescript
// Admin search
GET /api/admin/testimonials?search=재산분할

// Uses full-text search on:
// - client_name
// - content
// - case_result
// - story_before/journey/after
```

### Task 6: Get Category Statistics

```typescript
import { getTestimonialStatsByCategory } from '@/lib/supabase/testimonials';

const { data } = await getTestimonialStatsByCategory();

// Returns:
// [
//   { category: '재산분할', total_count: 15, avg_rating: 4.8, verified_count: 12 },
//   ...
// ]
```

### Task 7: Backup Testimonials

```sql
-- Supabase Dashboard > SQL Editor
COPY testimonials TO '/tmp/testimonials_backup.csv' CSV HEADER;
```

### Task 8: Delete Testimonial with Photo

```typescript
// DELETE endpoint automatically removes photo from Storage
await fetch(`/api/admin/testimonials/${id}`, {
  method: 'DELETE'
});
```

---

## Troubleshooting

### Issue 1: Testimonial Not Showing on Homepage

**Check:**
1. `published = true`?
2. `consent_given = true`? (CRITICAL)
3. Is RLS policy blocking? (Check auth status)

**Solution:**
```sql
SELECT id, client_name, published, consent_given
FROM testimonials
WHERE id = '{your-id}';

-- Should show both as true
```

### Issue 2: Photo Upload Fails

**Check:**
1. File size < 5MB?
2. File type is jpg/png/webp?
3. Admin authenticated?
4. Storage bucket exists?

**Solution:**
```typescript
// Check file before upload
if (file.size > 5 * 1024 * 1024) {
  alert('File too large');
  return;
}

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
if (!allowedTypes.includes(file.type)) {
  alert('Invalid file type');
  return;
}
```

### Issue 3: RLS Policy Denying Access

**Check:**
```sql
-- Test as authenticated user
SELECT * FROM testimonials; -- Should see all

-- Test as anonymous
SELECT * FROM testimonials; -- Should see only published + consented
```

**Solution:**
```sql
-- Verify policies exist
SELECT * FROM pg_policies WHERE tablename = 'testimonials';
```

### Issue 4: Search Not Working

**Check:**
```sql
-- Verify search_vector is populated
SELECT id, search_vector FROM testimonials LIMIT 1;

-- Should not be NULL
```

**Solution:**
```sql
-- Manually trigger search vector update
UPDATE testimonials SET content = content;
```

### Issue 5: Photo URL Broken

**Check:**
1. Is Storage bucket public?
2. Does file exist in Storage?
3. Is URL format correct?

**Solution:**
```typescript
// Correct format:
// https://{project}.supabase.co/storage/v1/object/public/testimonial-photos/{id}/{timestamp}_{filename}

// Check in Supabase Dashboard > Storage > testimonial-photos
```

### Issue 6: Performance Slow

**Check:**
```sql
-- Explain query
EXPLAIN ANALYZE
SELECT * FROM testimonials
WHERE published = true
ORDER BY display_order
LIMIT 9;

-- Should use indexes
```

**Solution:**
```sql
-- Verify indexes exist
SELECT indexname FROM pg_indexes WHERE tablename = 'testimonials';

-- Should see 11 indexes
```

### Issue 7: Can't Delete Testimonial

**Check:**
1. Admin authenticated?
2. Foreign key constraints?

**Solution:**
```sql
-- Check constraints
SELECT constraint_name FROM information_schema.table_constraints
WHERE table_name = 'testimonials' AND constraint_type = 'FOREIGN KEY';

-- Currently none, so deletion should work
```

---

## Quick SQL Queries

### Get All Published Testimonials
```sql
SELECT * FROM testimonials
WHERE published = true AND consent_given = true
ORDER BY display_order ASC, created_at DESC;
```

### Get Featured Testimonials
```sql
SELECT * FROM testimonials
WHERE published = true AND consent_given = true AND featured = true
LIMIT 9;
```

### Get Testimonials by Category
```sql
SELECT * FROM testimonials
WHERE published = true
  AND consent_given = true
  AND case_category = '재산분할'
LIMIT 6;
```

### Update Display Order
```sql
UPDATE testimonials
SET display_order = 5
WHERE id = '{uuid}';
```

### Mark as Featured
```sql
UPDATE testimonials
SET featured = true
WHERE id = '{uuid}';
```

### Unpublish Testimonial
```sql
UPDATE testimonials
SET published = false, consent_given = false
WHERE id = '{uuid}';
```

### Delete Testimonial
```sql
DELETE FROM testimonials WHERE id = '{uuid}';
```

### Search Testimonials
```sql
SELECT * FROM testimonials
WHERE search_vector @@ to_tsquery('simple', '재산분할')
  AND published = true
  AND consent_given = true;
```

### Get Statistics
```sql
SELECT
  case_category,
  COUNT(*) as total,
  AVG(rating) as avg_rating,
  SUM(views) as total_views
FROM testimonials
WHERE published = true AND consent_given = true
GROUP BY case_category;
```

---

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://kqqyipnlkmmprfgygauk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=***
SUPABASE_SERVICE_ROLE_KEY=***

# Optional (for admin auth)
ADMIN_EMAIL=admin@theyool.com
ADMIN_PASSWORD=***
```

---

## File Locations

```
Schema:
  supabase/migrations/20251118_create_testimonials_table.sql

Storage:
  supabase/storage/testimonial-photos-bucket.sql

API Routes:
  app/api/testimonials/route.ts
  app/api/admin/testimonials/route.ts
  app/api/admin/testimonials/[id]/route.ts
  app/api/admin/testimonials/upload-photo/route.ts

Helpers:
  lib/supabase/testimonials.ts (server)
  lib/supabase/testimonials-client.ts (client)

Components:
  components/features/TestimonialsCarousel.tsx

Docs:
  TESTIMONIALS_IMPLEMENTATION_GUIDE.md
  TESTIMONIALS_ADMIN_UI_SPEC.md
  TESTIMONIALS_SCHEMA_SUMMARY.md
  TESTIMONIALS_ARCHITECTURE.md
  TESTIMONIALS_QUICK_REFERENCE.md (this file)
```

---

## Key Reminders

⚠️ **CRITICAL**: Never publish testimonials without `consent_given = true`

✅ **SECURITY**: All admin APIs require authentication

📸 **PHOTOS**: Max 5MB, formats: jpg/png/webp

🔍 **SEARCH**: Uses PostgreSQL full-text search (GIN index)

📊 **STATS**: Use `get_testimonial_stats_by_category()` function

🎨 **COLORS**: Use `CATEGORY_COLORS` mapping for consistency

---

## Support

**Issues?** Check:
1. This quick reference
2. `TESTIMONIALS_IMPLEMENTATION_GUIDE.md`
3. Supabase Dashboard logs
4. Browser console errors

**Still stuck?** Create GitHub issue with:
- Error message
- Steps to reproduce
- Expected vs actual behavior
