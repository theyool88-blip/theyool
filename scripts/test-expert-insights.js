#!/usr/bin/env node

/**
 * Test script for ExpertInsights redesign
 * Tests the new illustration image functionality
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testExpertInsights() {
  console.log('\n🧪 Testing ExpertInsights Section...\n');

  // 1. Check if illustration_image column exists
  console.log('1️⃣ Checking database schema...');
  const { data: posts, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, title, categories, illustration_image')
    .limit(3);

  if (fetchError) {
    console.error('❌ Error fetching posts:', fetchError.message);
    console.log('\n💡 Tip: Run the migration first:');
    console.log('   psql $DATABASE_URL -f supabase/migrations/20251121_add_illustration_image.sql\n');
    return;
  }

  console.log('✅ Database schema check passed\n');

  // 2. Display current posts
  console.log('2️⃣ Current blog posts (first 3):');
  posts.forEach((post, index) => {
    console.log(`\n   ${index + 1}. ${post.title}`);
    console.log(`      Category: ${post.categories?.[0] || 'None'}`);
    console.log(`      Image: ${post.illustration_image || '❌ Not set (will show gradient)'}`);
  });

  // 3. Test with sample image URL
  console.log('\n\n3️⃣ Would you like to add sample images? (Y/n)');
  console.log('   This will add placeholder images to the first 3 posts.');
  console.log('   (Run this script again with --add-samples flag)\n');

  // 4. Display gradient mappings
  console.log('4️⃣ Category → Gradient Mapping:');
  const gradients = {
    '위자료': 'Amber → Orange',
    '재산분할': 'Emerald → Teal',
    '양육권': 'Rose → Pink',
    '불륜': 'Red → Rose',
    '법률정보': 'Amber → Yellow',
    '이혼절차': 'Blue → Indigo',
  };

  Object.entries(gradients).forEach(([category, gradient]) => {
    console.log(`   ${category}: ${gradient}`);
  });

  // 5. Check API endpoint
  console.log('\n\n5️⃣ Testing API endpoint...');
  try {
    const response = await fetch('http://localhost:3000/api/blog?limit=3&sortBy=featured');
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ API returned ${data.posts?.length || 0} posts`);
    } else {
      console.log('⚠️  API not responding (is dev server running?)');
    }
  } catch (error) {
    console.log('⚠️  Could not reach API (dev server may not be running)');
  }

  console.log('\n\n✅ Test complete!\n');
  console.log('📋 Next steps:');
  console.log('   1. Add illustration images to blog posts (400x400px)');
  console.log('   2. Update posts via admin dashboard (/admin/blog)');
  console.log('   3. View changes on homepage ExpertInsights section\n');
}

async function addSampleImages() {
  console.log('\n🎨 Adding sample placeholder images...\n');

  // Sample placeholder images (you can replace with real Supabase URLs)
  const sampleImages = [
    'https://via.placeholder.com/400x400/FEF3C7/D97706?text=위자료',
    'https://via.placeholder.com/400x400/D1FAE5/10B981?text=재산분할',
    'https://via.placeholder.com/400x400/FFE4E6/F43F5E?text=양육권',
  ];

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title')
    .limit(3);

  for (let i = 0; i < posts.length; i++) {
    const { error } = await supabase
      .from('blog_posts')
      .update({ illustration_image: sampleImages[i] })
      .eq('id', posts[i].id);

    if (error) {
      console.error(`❌ Error updating ${posts[i].title}:`, error.message);
    } else {
      console.log(`✅ Updated: ${posts[i].title}`);
    }
  }

  console.log('\n✅ Sample images added! View them at http://localhost:3000\n');
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--add-samples')) {
  addSampleImages();
} else {
  testExpertInsights();
}
