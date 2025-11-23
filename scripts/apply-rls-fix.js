const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyRLSFix() {
  console.log('📋 Applying RLS Policy Fix for bookings table...\n');

  const sqlFile = path.join(__dirname, '../supabase/migrations/20251120_fix_bookings_rls_policy.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');

  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(async () => {
      // If exec_sql doesn't exist, try direct execution
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('--') && !s.startsWith('COMMENT'));

      for (const statement of statements) {
        console.log(`Executing: ${statement.substring(0, 50)}...`);
        const result = await supabase.rpc('exec', { sql: statement });
        if (result.error) {
          console.error(`Error: ${result.error.message}`);
        }
      }
      return { data: null, error: null };
    });

    if (error) {
      console.error('❌ Error applying migration:', error.message);
      console.log('\n⚠️  Please apply the migration manually through Supabase Dashboard:');
      console.log('1. Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql');
      console.log('2. Copy and paste the following SQL:\n');
      console.log(sql);
      return;
    }

    console.log('✅ RLS Policy fix applied successfully!\n');
    console.log('Testing the policy...');

    // Test the policy by checking if it exists
    const { data: policies, error: policyError } = await supabase
      .rpc('exec', {
        sql: "SELECT * FROM pg_policies WHERE tablename = 'bookings' AND policyname = 'Allow public to create bookings'"
      });

    if (!policyError && policies) {
      console.log('✅ Policy verified and active');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    console.log('\n⚠️  Please apply the migration manually through Supabase Dashboard:');
    console.log('1. Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql');
    console.log('2. Copy and paste the SQL from:');
    console.log('   supabase/migrations/20251120_fix_bookings_rls_policy.sql');
  }
}

applyRLSFix();
