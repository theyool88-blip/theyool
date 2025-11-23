#!/usr/bin/env node

/**
 * Check current RLS policies on bookings table
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkPolicies() {
  console.log('🔍 Checking RLS policies on bookings table...\n');

  // Query pg_policies to get all policies on bookings table
  const { data, error } = await supabase
    .from('pg_policies')
    .select('*')
    .eq('tablename', 'bookings');

  if (error) {
    console.error('❌ Error querying policies:', error);
    console.log('\n💡 Run this SQL manually in Supabase SQL Editor:');
    console.log('SELECT * FROM pg_policies WHERE tablename = \'bookings\';');
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No policies found on bookings table');
    process.exit(0);
  }

  console.log(`✅ Found ${data.length} policies:\n`);

  data.forEach((policy, index) => {
    console.log(`${index + 1}. ${policy.policyname}`);
    console.log(`   Command: ${policy.cmd}`);
    console.log(`   Roles: ${policy.roles}`);
    console.log(`   Using: ${policy.qual || '(none)'}`);
    console.log(`   With Check: ${policy.with_check || '(none)'}`);
    console.log();
  });

  console.log('💡 To fix public SELECT access, run this SQL:');
  console.log(`
-- Allow public to SELECT bookings
CREATE POLICY IF NOT EXISTS "Allow public to read bookings by ID"
  ON public.bookings
  FOR SELECT
  TO public
  USING (true);
  `);
}

checkPolicies().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
