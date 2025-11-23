const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🚀 Adding illustration_image column to blog_posts...\n');

  try {
    // First, check if column already exists
    const { data: checkData, error: checkError } = await supabase
      .from('blog_posts')
      .select('illustration_image')
      .limit(1);

    if (!checkError) {
      console.log('✅ Column already exists!');
      return;
    }

    // If column doesn't exist (error 42703), we need to add it
    if (checkError.code === '42703') {
      console.log('📝 Column does not exist, creating it...\n');
      console.log('⚠️  Cannot execute DDL statements via Supabase client.');
      console.log('');
      console.log('Please run this SQL in your Supabase SQL Editor:');
      console.log('─'.repeat(70));
      console.log('ALTER TABLE blog_posts');
      console.log('ADD COLUMN illustration_image TEXT;');
      console.log('');
      console.log("COMMENT ON COLUMN blog_posts.illustration_image IS 'URL to illustration image displayed in blog post cards';");
      console.log('─'.repeat(70));
      console.log('');
      console.log('📍 Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
    } else {
      console.error('❌ Unexpected error:', checkError);
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

runMigration();
