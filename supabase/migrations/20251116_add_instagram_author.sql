-- Add author and author_profile_url columns to instagram_posts table
-- Migration: 20251116_add_instagram_author.sql

-- Add author column with default value
ALTER TABLE instagram_posts
ADD COLUMN author TEXT NOT NULL DEFAULT 'theyool_official';

-- Add author_profile_url column (nullable for optional profile images)
ALTER TABLE instagram_posts
ADD COLUMN author_profile_url TEXT;

-- Update existing records to have the default author
UPDATE instagram_posts
SET author = 'theyool_official'
WHERE author IS NULL OR author = '';

-- Add comment for documentation
COMMENT ON COLUMN instagram_posts.author IS 'Display name of the post author (e.g., "임은지 변호사", "더율법무법인")';
COMMENT ON COLUMN instagram_posts.author_profile_url IS 'Optional URL to author profile image in Supabase Storage';
