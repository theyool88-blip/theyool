# Internal Link Preview - System Architecture

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Request                             │
│                    GET /blog/some-post                           │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Server Component (page.tsx)                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 1. getBlogPostBySlug(slug)                                │  │
│  │    └─> Fetch full blog post from Supabase                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                    │
│                             ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 2. extractAllInternalLinks(post.content)                  │  │
│  │    └─> Parse markdown for [text](/blog/slug) patterns    │  │
│  │    └─> Result: ['slug1', 'slug2', 'slug3']               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                    │
│                             ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 3. groupLinksByType(links)                                │  │
│  │    └─> Group: { blogSlugs: [...], caseSlugs: [...] }     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                    │
│                             ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 4. getAllLinkPreviews(blogSlugs, caseSlugs)              │  │
│  │    ┌──────────────────────────────────────────────────┐  │  │
│  │    │ Promise.all([                                    │  │  │
│  │    │   getBlogPreviewsBatch(blogSlugs),              │  │  │
│  │    │   getCasePreviewsBatch(caseSlugs)               │  │  │
│  │    │ ])                                               │  │  │
│  │    └──────────────────────────────────────────────────┘  │  │
│  │    └─> Parallel queries to Supabase                      │  │
│  │    └─> Result: Maps of slug → preview data               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                    │
│                             ▼                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 5. Return <BlogDetailClient                               │  │
│  │      post={post}                                          │  │
│  │      blogPreviews={Map<slug, BlogPreviewData>}           │  │
│  │      casePreviews={Map<slug, CasePreviewData>}           │  │
│  │    />                                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Client Component (BlogDetailClient.tsx)             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ReactMarkdown renders content                             │  │
│  │   └─> Custom <a> component renderer                      │  │
│  │       ┌─────────────────────────────────────────────────┐ │  │
│  │       │ For each link in markdown:                      │ │  │
│  │       │   1. parseInternalLink(href)                    │ │  │
│  │       │      └─> Is it /blog/* or /cases/*?            │ │  │
│  │       │                                                  │ │  │
│  │       │   2. If internal:                               │ │  │
│  │       │      - Lookup in blogPreviews or casePreviews   │ │  │
│  │       │      - If found: Render preview placeholder     │ │  │
│  │       │      - If not: Render enhanced link             │ │  │
│  │       │                                                  │ │  │
│  │       │   3. If external:                               │ │  │
│  │       │      - Render normal link                       │ │  │
│  │       └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      HTML Response to User                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ <article>                                                  │  │
│  │   <p>This is related to                                   │  │
│  │     <div class="internal-link-preview"                    │  │
│  │          data-type="blog"                                 │  │
│  │          data-slug="other-post"                           │  │
│  │          data-preview="{...}">                            │  │
│  │       <a href="/blog/other-post">another post</a>        │  │
│  │     </div>                                                │  │
│  │   </p>                                                    │  │
│  │ </article>                                                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
/app/blog/[slug]/
│
├── page.tsx (Server Component)
│   ├── getBlogPostBySlug()
│   ├── extractAllInternalLinks()
│   ├── getAllLinkPreviews()
│   └── <BlogDetailClient /> ──────┐
│                                   │
└── BlogDetailClient.tsx            │
    (Client Component) <────────────┘
    ├── ReactMarkdown
    │   └── components.a (custom)
    │       ├── parseInternalLink()
    │       ├── blogPreviews.get()
    │       ├── casePreviews.get()
    │       └── Render preview/link
    └── Returns HTML
```

---

## File Organization

```
theyool/
├── types/
│   └── linkPreview.ts              [Type definitions]
│       ├── BlogPreviewData
│       ├── CasePreviewData
│       ├── InternalLink
│       └── InternalLinkPreviewProps
│
├── lib/
│   ├── utils/
│   │   └── contentLinks.ts         [Link detection]
│   │       ├── extractBlogLinks()
│   │       ├── extractCaseLinks()
│   │       ├── extractAllInternalLinks()
│   │       ├── groupLinksByType()
│   │       └── parseInternalLink()
│   │
│   └── supabase/
│       └── linkPreviews.ts         [Data fetching]
│           ├── getBlogPreviewBySlug()
│           ├── getCasePreviewBySlug()
│           ├── getBlogPreviewsBatch()
│           ├── getCasePreviewsBatch()
│           └── getAllLinkPreviews()
│
└── app/
    ├── blog/[slug]/
    │   ├── page.tsx                [Server: Fetch & pass data]
    │   └── BlogDetailClient.tsx    [Client: Render with previews]
    │
    └── cases/[slug]/
        └── page.tsx                [Server: Fetch & render inline]
```

---

## Database Schema (Relevant Parts)

```sql
-- blog_posts table (existing)
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- Indexed for fast lookup
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,                      -- NOT fetched for previews
  published BOOLEAN DEFAULT false,   -- Filter condition
  published_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  categories TEXT[],
  -- ... other fields
);

-- cases table (existing)
CREATE TABLE cases (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- Indexed for fast lookup
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,                      -- NOT fetched for previews
  result TEXT,
  categories TEXT[],
  -- ... other fields
);
```

---

## Performance Optimization Strategy

### 1. Parallel Fetching
```javascript
// ❌ Bad: Sequential fetching (N+1 problem)
for (const slug of blogSlugs) {
  await getBlogPreviewBySlug(slug);
}

// ✅ Good: Parallel fetching
await Promise.all(
  blogSlugs.map(slug => getBlogPreviewBySlug(slug))
);
```

### 2. Minimal Data Transfer
```javascript
// ❌ Bad: Fetch entire post (50KB+)
.select('*')

// ✅ Good: Fetch only preview fields (~200 bytes)
.select('id, slug, title, excerpt, published_at, views, categories')
```

### 3. Server-Side Rendering
```javascript
// ✅ All data fetching in Server Component
export default async function BlogDetailPage() {
  const previews = await getAllLinkPreviews(...);
  return <Client previews={previews} />;
}

// ❌ Not doing client-side fetching
useEffect(() => {
  fetch('/api/previews').then(...)  // Avoided!
});
```

---

## Link Detection Regex Breakdown

### Blog Link Pattern
```regex
\[([^\]]+)\]\(\/blog\/([^)]+)\)
 │    │     │ │      │
 │    │     │ │      └─ Capture group 2: slug (any char except ')')
 │    │     │ └─ Literal: /blog/
 │    │     └─ Literal: ](
 │    └─ Capture group 1: link text (any char except ']')
 └─ Literal: [
```

**Matches**:
- `[Click here](/blog/post-slug)` → text: "Click here", slug: "post-slug"
- `[상담하기](/blog/divorce-guide)` → text: "상담하기", slug: "divorce-guide"

**Doesn't match**:
- `[External](https://example.com/blog/post)` (not relative path)
- `[Case](/cases/case-slug)` (different pattern)

---

## Error Handling Flow

```
getAllLinkPreviews(blogSlugs, caseSlugs)
  │
  ├─> getBlogPreviewsBatch(blogSlugs)
  │     │
  │     └─> Promise.all([
  │           getBlogPreviewBySlug('slug1')
  │             │
  │             ├─> Supabase query
  │             │     │
  │             │     ├─> Success: return BlogPreviewData
  │             │     │
  │             │     └─> Error: catch → console.error → return null
  │             │
  │             └─> Filter out nulls from map
  │         ])
  │
  └─> getCasePreviewsBatch(caseSlugs)
        └─> [Same error handling]

Result: Only successful previews in maps, no errors thrown
```

---

## Type Safety Guarantees

```typescript
// Server Component
const { blogPreviews, casePreviews } = await getAllLinkPreviews(...)
// Type: { blogPreviews: Map<string, BlogPreviewData>, casePreviews: Map<string, CasePreviewData> }

// Client Component receives typed props
interface BlogDetailClientProps {
  blogPreviews: Map<string, BlogPreviewData>;  // Type-safe
  casePreviews: Map<string, CasePreviewData>;  // Type-safe
}

// Lookup is type-safe
const preview = blogPreviews.get(slug);  // Type: BlogPreviewData | undefined

// UI component will receive typed props
<InternalLinkPreview
  type="blog"
  title={preview.title}  // TypeScript validates these exist
  excerpt={preview.excerpt}
  // ... other typed props
/>
```

---

## Testing Strategy

### Unit Tests (Recommended)
```javascript
// lib/utils/contentLinks.test.ts
test('extractBlogLinks detects blog links', () => {
  const content = '[Post 1](/blog/slug1) and [Post 2](/blog/slug2)';
  const links = extractBlogLinks(content);
  expect(links).toHaveLength(2);
  expect(links[0].slug).toBe('slug1');
});

// lib/supabase/linkPreviews.test.ts
test('getBlogPreviewBySlug returns preview data', async () => {
  const preview = await getBlogPreviewBySlug('test-slug');
  expect(preview).toHaveProperty('title');
  expect(preview).not.toHaveProperty('content'); // Not fetched
});
```

### Integration Tests
```javascript
// Test full flow
test('blog detail page fetches and passes preview data', async () => {
  const response = await fetch('/blog/test-post');
  const html = await response.text();
  expect(html).toContain('internal-link-preview');
  expect(html).toContain('data-type="blog"');
});
```

---

## Future Enhancements

1. **Caching**: Add Redis/Vercel KV cache for preview data
2. **Analytics**: Track which internal links get clicked
3. **Preview Images**: Include thumbnail images in preview data
4. **Related Content**: Suggest related posts based on internal links
5. **Broken Link Detection**: Alert if internal link points to non-existent content
6. **A/B Testing**: Test preview box vs normal links for engagement
7. **Lazy Loading**: Load preview data on-demand for better initial page load

---

## Migration Guide (If Needed)

If you need to add preview metadata to existing content:

```sql
-- Add indexes for faster lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_cases_slug ON cases(slug);

-- Add published column if not exists
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT true;

-- Update existing posts to be published
UPDATE blog_posts SET published = true WHERE published IS NULL;
```

---

## Monitoring & Debugging

### Server-Side Logs
Check console for error messages from preview fetching:
```
Error fetching blog preview for slug "non-existent": { ... }
Exception fetching case preview for slug "invalid": { ... }
```

### Client-Side Debugging
Inspect HTML for preview data:
```html
<div class="internal-link-preview"
     data-type="blog"
     data-slug="test-post"
     data-preview='{"id":"123","title":"Test","excerpt":"..."}'
>
```

### Performance Monitoring
Add timing logs:
```javascript
const start = Date.now();
const previews = await getAllLinkPreviews(...);
console.log(`Fetched ${previews.size} previews in ${Date.now() - start}ms`);
```
