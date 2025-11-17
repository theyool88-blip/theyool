-- Add reference columns to FAQs for manually curated related content
-- This allows admins to link specific blog posts and success cases to FAQ answers

-- Add new columns
ALTER TABLE faqs
  ADD COLUMN related_blog_posts TEXT[],
  ADD COLUMN related_cases TEXT[];

-- Add GIN indexes for better query performance on array columns
CREATE INDEX idx_faqs_related_blog_posts ON faqs USING GIN(related_blog_posts);
CREATE INDEX idx_faqs_related_cases ON faqs USING GIN(related_cases);

-- Add comments for documentation
COMMENT ON COLUMN faqs.related_blog_posts IS 'Array of blog_posts.slug values for manually curated references';
COMMENT ON COLUMN faqs.related_cases IS 'Array of cases.slug values for manually curated references';
