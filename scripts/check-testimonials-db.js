#!/usr/bin/env node

/**
 * Testimonial System Database Check Script
 * 의뢰인 후기 시스템 데이터베이스 상태 확인
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTestimonialsDatabase() {
  console.log('🔍 의뢰인 후기 시스템 데이터베이스 검사 시작...\n');

  // 1. Check testimonial_cases table
  console.log('=== 1️⃣ TESTIMONIAL_CASES TABLE ===');
  const { data: cases, error: casesError, count: casesCount } = await supabase
    .from('testimonial_cases')
    .select('id, category, highlight_text, published, consent_given, featured, case_result_amount', { count: 'exact' });

  if (casesError) {
    console.log('❌ Error:', casesError.message);
  } else {
    console.log('✅ Total count:', casesCount);
    console.log('   Published:', cases?.filter(c => c.published).length || 0);
    console.log('   Consent given:', cases?.filter(c => c.consent_given).length || 0);
    console.log('   Featured:', cases?.filter(c => c.featured).length || 0);

    if (cases && cases.length > 0) {
      console.log('\n   Sample data:');
      cases.slice(0, 3).forEach((c, i) => {
        console.log(`   ${i + 1}. "${c.highlight_text}"`);
        console.log(`      Category: ${c.category} | Published: ${c.published} | Featured: ${c.featured}`);
        if (c.case_result_amount) {
          console.log(`      Amount: ${(c.case_result_amount / 100000000).toFixed(1)}억원`);
        }
      });
    }
  }

  // 2. Check testimonial_evidence_photos table
  console.log('\n=== 2️⃣ TESTIMONIAL_EVIDENCE_PHOTOS TABLE ===');
  const { data: photos, error: photosError, count: photosCount } = await supabase
    .from('testimonial_evidence_photos')
    .select('id, case_id, evidence_type, blur_applied, photo_url', { count: 'exact' });

  if (photosError) {
    console.log('❌ Error:', photosError.message);
  } else {
    console.log('✅ Total count:', photosCount);

    if (photos && photos.length > 0) {
      // Count by evidence type
      const typeCount = photos.reduce((acc, p) => {
        acc[p.evidence_type] = (acc[p.evidence_type] || 0) + 1;
        return acc;
      }, {});

      console.log('\n   By evidence type:');
      Object.entries(typeCount).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count}`);
      });

      console.log('\n   Sample data:');
      photos.slice(0, 3).forEach((p, i) => {
        console.log(`   ${i + 1}. Type: ${p.evidence_type} | Blur: ${p.blur_applied}`);
        console.log(`      URL: ${p.photo_url.substring(0, 60)}...`);
      });
    }
  }

  // 3. Check old testimonials table (if exists)
  console.log('\n=== 3️⃣ TESTIMONIALS TABLE (Old System) ===');
  const { data: oldTestimonials, error: oldError, count: oldCount } = await supabase
    .from('testimonials')
    .select('*', { count: 'exact', head: true });

  if (oldError) {
    console.log('⚠️  Table may not exist or inaccessible:', oldError.message);
  } else {
    console.log('✅ Total count:', oldCount);
    if (oldCount && oldCount > 0) {
      console.log('⚠️  Warning: Old testimonials table still has data. Consider migration.');
    }
  }

  // 4. Check Storage Buckets
  console.log('\n=== 4️⃣ STORAGE BUCKETS ===');
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

  if (bucketsError) {
    console.log('❌ Error:', bucketsError.message);
  } else {
    const testimonialBucket = buckets.find(b => b.name === 'testimonial-photos');
    if (testimonialBucket) {
      console.log('✅ testimonial-photos bucket exists');
      console.log(`   Public: ${testimonialBucket.public}`);

      // Try to list files
      const { data: files, error: filesError } = await supabase.storage
        .from('testimonial-photos')
        .list('', { limit: 10 });

      if (filesError) {
        console.log('   ⚠️  Cannot list files:', filesError.message);
      } else {
        console.log(`   Files count (sample): ${files?.length || 0}`);
      }
    } else {
      console.log('❌ testimonial-photos bucket NOT FOUND');
      console.log('   Available buckets:', buckets.map(b => b.name).join(', '));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Testimonial Cases: ${casesCount || 0}`);
  console.log(`Evidence Photos: ${photosCount || 0}`);
  console.log(`Old Testimonials: ${oldCount || 0}`);
  console.log('='.repeat(50));
}

checkTestimonialsDatabase()
  .then(() => {
    console.log('\n✅ 검사 완료');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ 검사 중 오류 발생:', error);
    process.exit(1);
  });
