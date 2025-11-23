const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPolicies() {
  console.log('🔍 Checking storage policies...\n');

  try {
    // Test upload without auth (should fail)
    console.log('1️⃣ Testing anonymous upload (should fail)...');
    const testFile = Buffer.from('test');
    const { error: anonError } = await supabase.storage
      .from('testimonial-photos')
      .upload('test-anon.txt', testFile);

    if (anonError) {
      console.log('   ✅ Anonymous upload blocked (correct):', anonError.message);
    } else {
      console.log('   ⚠️  Anonymous upload succeeded (should be blocked!)');
    }

    // Test public read
    console.log('\n2️⃣ Testing public read access...');
    const { data: files, error: listError } = await supabase.storage
      .from('testimonial-photos')
      .list();

    if (listError) {
      console.log('   ❌ Public read failed:', listError.message);
    } else {
      console.log('   ✅ Public read works (found', files.length, 'files)');
    }

    // Check bucket configuration
    console.log('\n3️⃣ Checking bucket configuration...');
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucket = buckets.find(b => b.name === 'testimonial-photos');

    if (bucket) {
      console.log('   Bucket:', bucket.name);
      console.log('   Public:', bucket.public);
      console.log('   ID:', bucket.id);
    }

    console.log('\n📋 Next Steps:');
    console.log('   If policies are not set up, go to:');
    console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/storage/policies');
    console.log('   \n   And run the SQL from: scripts/setup-testimonial-storage-policies.sql');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkPolicies();
