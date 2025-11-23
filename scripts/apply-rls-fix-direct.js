const { createClient } = require('@supabase/supabase-js');

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
  },
  db: {
    schema: 'public'
  }
});

async function applyRLSFix() {
  console.log('📋 Applying RLS Policy Fix for bookings table...\n');

  // Step 1: Drop existing policy
  console.log('1. Dropping existing policy...');
  try {
    // We can't directly execute DDL through the JS client,
    // So we'll use the REST API approach
    console.log('⚠️  Cannot execute DDL directly through Supabase JS client\n');
    console.log('Please execute the following SQL in Supabase Dashboard:');
    console.log('URL: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql\n');
    console.log('--- Copy the SQL below ---\n');

    const sql = `
-- Fix RLS Policy for bookings table to allow anonymous INSERT
DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;

CREATE POLICY "Allow public to create bookings"
  ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);
`;

    console.log(sql);
    console.log('\n--- End of SQL ---\n');

    // Alternative: Test if we can insert with anon key
    console.log('Alternatively, testing with a simple node script...\n');

  } catch (err) {
    console.error('Error:', err.message);
  }
}

applyRLSFix();
