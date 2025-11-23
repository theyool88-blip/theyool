const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupPolicies() {
  console.log('🚀 Setting up storage policies for testimonial-photos...\n');

  const sqlPath = path.join(__dirname, 'setup-testimonial-storage-policies.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql });

    if (error) {
      // Try executing policies one by one
      console.log('⚠️  Batch execution failed, trying individual policies...\n');

      const policies = [
        {
          name: 'Public read access',
          sql: `
            CREATE POLICY IF NOT EXISTS "Public read access for testimonial photos"
            ON storage.objects FOR SELECT
            USING (bucket_id = 'testimonial-photos');
          `
        },
        {
          name: 'Authenticated upload',
          sql: `
            CREATE POLICY IF NOT EXISTS "Authenticated users can upload testimonial photos"
            ON storage.objects FOR INSERT
            WITH CHECK (
              bucket_id = 'testimonial-photos'
              AND auth.role() = 'authenticated'
            );
          `
        },
        {
          name: 'Authenticated update',
          sql: `
            CREATE POLICY IF NOT EXISTS "Authenticated users can update testimonial photos"
            ON storage.objects FOR UPDATE
            USING (
              bucket_id = 'testimonial-photos'
              AND auth.role() = 'authenticated'
            );
          `
        },
        {
          name: 'Authenticated delete',
          sql: `
            CREATE POLICY IF NOT EXISTS "Authenticated users can delete testimonial photos"
            ON storage.objects FOR DELETE
            USING (
              bucket_id = 'testimonial-photos'
              AND auth.role() = 'authenticated'
            );
          `
        }
      ];

      for (const policy of policies) {
        try {
          const { error: policyError } = await supabase.rpc('exec_sql', { sql: policy.sql });
          if (policyError) {
            console.log(`⚠️  ${policy.name}: ${policyError.message}`);
          } else {
            console.log(`✅ ${policy.name} policy created`);
          }
        } catch (err) {
          console.log(`⚠️  ${policy.name}: ${err.message}`);
        }
      }
    } else {
      console.log('✅ All policies created successfully!');
    }

    console.log('\n📋 Manual Setup (if automated setup failed):');
    console.log('   Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/storage/policies');
    console.log('   Select: testimonial-photos bucket');
    console.log('   Add the policies from: scripts/setup-testimonial-storage-policies.sql');

    console.log('\n🎉 Setup complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 Please set up policies manually:');
    console.log('   Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/storage/policies');
    console.log('   Select: testimonial-photos bucket');
    console.log('   Copy SQL from: scripts/setup-testimonial-storage-policies.sql');
  }
}

setupPolicies();
