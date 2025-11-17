// Direct SQL execution for Instagram author migration

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

async function runMigration() {
  // Extract database connection info from Supabase URL
  // Format: https://PROJECT_REF.supabase.co
  const projectRef = supabaseUrl.replace('https://', '').replace('.supabase.co', '');

  console.log('🚀 Running Instagram author migration directly...');
  console.log('📋 Please run the following SQL in your Supabase SQL Editor:');
  console.log('========================================');
  console.log(`
-- Add author and author_profile_url columns to instagram_posts table
-- Migration: 20251116_add_instagram_author.sql

-- Add author column with default value
ALTER TABLE instagram_posts
ADD COLUMN IF NOT EXISTS author TEXT NOT NULL DEFAULT 'theyool_official';

-- Add author_profile_url column (nullable for optional profile images)
ALTER TABLE instagram_posts
ADD COLUMN IF NOT EXISTS author_profile_url TEXT;

-- Update existing records to have the default author
UPDATE instagram_posts
SET author = 'theyool_official'
WHERE author IS NULL OR author = '';

-- Add comment for documentation
COMMENT ON COLUMN instagram_posts.author IS 'Display name of the post author (e.g., "임은지 변호사", "더율법무법인")';
COMMENT ON COLUMN instagram_posts.author_profile_url IS 'Optional URL to author profile image in Supabase Storage';
  `);
  console.log('========================================');
  console.log('\n🔗 Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
  console.log('\nOr use the Supabase CLI if installed:');
  console.log('  supabase db push');
}

runMigration();
