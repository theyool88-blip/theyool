-- Add sort_order column to blog_posts table
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS sort_order INTEGER;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_sort_order ON blog_posts(sort_order);

-- Add comment
COMMENT ON COLUMN blog_posts.sort_order IS 'Display order for blog posts (lower numbers appear first)';
