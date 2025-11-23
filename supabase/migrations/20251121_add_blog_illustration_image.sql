-- Add illustration_image column to blog_posts table
-- This allows blog posts to display illustration images in the ExpertInsights section

ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS illustration_image TEXT;

COMMENT ON COLUMN blog_posts.illustration_image IS 'URL to illustration image displayed in blog post cards';
