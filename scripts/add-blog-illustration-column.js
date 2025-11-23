const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addIllustrationColumn() {
  console.log('🚀 Adding illustration_image column to blog_posts table...\n');

  // Read the migration SQL
  const migrationPath = path.join(__dirname, '../supabase/migrations/20251121_add_blog_illustration_image.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('📝 Executing migration...');
  console.log(sql);
  console.log('');

  // Execute the migration using rpc
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

  if (error) {
    console.error('❌ Migration failed:', error);

    // If exec_sql function doesn't exist, try direct SQL execution
    console.log('\n⚠️  Trying alternative method using psql command...');
    console.log('\nPlease run this SQL command in your Supabase SQL Editor:');
    console.log('─'.repeat(60));
    console.log(sql);
    console.log('─'.repeat(60));
    return;
  }

  console.log('✅ Migration successful!');

  // Verify the column was added
  const { data: posts, error: checkError } = await supabase
    .from('blog_posts')
    .select('id, title, illustration_image')
    .limit(1);

  if (checkError) {
    console.error('❌ Verification failed:', checkError);
  } else {
    console.log('✅ Column verified successfully!');
    console.log('\nYou can now upload illustration images for blog posts in the admin panel.');
  }
}

addIllustrationColumn();
