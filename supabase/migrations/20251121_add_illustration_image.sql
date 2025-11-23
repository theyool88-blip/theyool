-- Migration: Add illustration_image field to blog_posts table
-- Date: 2025-11-21
-- Purpose: Support illustration images in ExpertInsights section

-- Add illustration_image column to blog_posts table
ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS illustration_image TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN blog_posts.illustration_image IS 'URL or path to illustration image for blog post cards (400x400px recommended)';

-- Optional: Create index if you plan to query by image presence
CREATE INDEX IF NOT EXISTS idx_blog_posts_illustration_image
ON blog_posts(illustration_image)
WHERE illustration_image IS NOT NULL;

-- Migration complete
