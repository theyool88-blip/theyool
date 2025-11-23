const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createBucket() {
  console.log('🚀 Creating testimonial-photos bucket...\n');

  try {
    // 1. Create bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('testimonial-photos', {
      public: true,
      fileSizeLimit: 10485760, // 10MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
    });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ Bucket already exists!');
      } else {
        throw bucketError;
      }
    } else {
      console.log('✅ Bucket created successfully!');
    }

    // 2. Set up RLS policies (public read, authenticated write)
    console.log('\n📋 Note: RLS policies should be set up in Supabase Dashboard:');
    console.log('   1. Go to Storage > testimonial-photos > Policies');
    console.log('   2. Add policy: "Public read access"');
    console.log('      - SELECT operation');
    console.log('      - Policy: true');
    console.log('   3. Add policy: "Authenticated users can upload"');
    console.log('      - INSERT operation');
    console.log('      - Policy: (auth.role() = \'authenticated\')');
    console.log('   4. Add policy: "Authenticated users can delete"');
    console.log('      - DELETE operation');
    console.log('      - Policy: (auth.role() = \'authenticated\')');

    // 3. Verify bucket
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) throw listError;

    const testimonialBucket = buckets.find(b => b.name === 'testimonial-photos');

    if (testimonialBucket) {
      console.log('\n✅ Bucket verification successful!');
      console.log('📦 Bucket details:', {
        name: testimonialBucket.name,
        public: testimonialBucket.public,
        id: testimonialBucket.id
      });
    }

    console.log('\n🎉 Setup complete!');
    console.log('📸 You can now upload testimonial evidence photos.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createBucket();
