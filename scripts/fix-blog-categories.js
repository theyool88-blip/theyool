require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixBlogCategories() {
  console.log('🔍 Fetching all blog posts...');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, tags, categories');

  if (error) {
    console.error('❌ Error fetching posts:', error);
    return;
  }

  console.log(`📊 Found ${posts.length} blog posts`);
  console.log('');

  let updated = 0;
  let skipped = 0;

  for (const post of posts) {
    const tags = post.tags || [];
    let categories = [];

    // Tags 기반으로 categories 자동 할당
    if (tags.some(t => t.includes('위자료') || t.includes('위자료청구'))) {
      categories.push('위자료');
    }
    if (tags.some(t => t.includes('재산분할'))) {
      categories.push('재산분할');
    }
    if (tags.some(t => t.includes('양육권') || t.includes('양육비'))) {
      categories.push('양육권');
    }
    if (tags.some(t => t.includes('이혼') && !t.includes('협의이혼') && !t.includes('재판이혼'))) {
      categories.push('이혼절차');
    }
    if (tags.some(t => t.includes('상속') || t.includes('유언'))) {
      categories.push('상속/유언');
    }
    if (tags.some(t => t.includes('상간') || t.includes('간통'))) {
      categories.push('상간사건');
    }

    // 카테고리가 없으면 기본값
    if (categories.length === 0) {
      categories.push('법률상식');
    }

    // 이미 올바른 categories가 있으면 스킵
    if (post.categories && post.categories.length > 0 &&
        JSON.stringify(post.categories.sort()) === JSON.stringify(categories.sort())) {
      console.log(`⏭️  Skipped: "${post.title}" (already correct)`);
      skipped++;
      continue;
    }

    // 업데이트
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ categories })
      .eq('id', post.id);

    if (updateError) {
      console.error(`❌ Error updating "${post.title}":`, updateError);
    } else {
      console.log(`✅ Updated: "${post.title}"`);
      console.log(`   Tags: ${tags.join(', ')}`);
      console.log(`   Categories: ${categories.join(', ')}`);
      console.log('');
      updated++;
    }
  }

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Updated: ${updated} posts`);
  console.log(`⏭️  Skipped: ${skipped} posts`);
  console.log(`📊 Total: ${posts.length} posts`);
  console.log('═══════════════════════════════════════');
}

fixBlogCategories()
  .then(() => {
    console.log('✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
