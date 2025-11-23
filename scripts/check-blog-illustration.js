const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkBlogIllustrations() {
  console.log('🔍 Checking blog_posts for illustration_image field...\n');

  // Get all blog posts
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, illustration_image')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${posts.length} posts:\n`);
  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   illustration_image: ${post.illustration_image || '(not set)'}`);
    console.log('');
  });

  // Check if illustration_image column exists
  const hasIllustrationImage = posts.length > 0 && 'illustration_image' in posts[0];
  console.log(`✅ illustration_image field ${hasIllustrationImage ? 'EXISTS' : 'DOES NOT EXIST'} in database`);
}

checkBlogIllustrations();
