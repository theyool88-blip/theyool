#!/usr/bin/env node

/**
 * Test RLS directly by attempting to SELECT with anon key
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !anonKey || !serviceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

async function testRLS() {
  console.log('🧪 Testing RLS policies on bookings table\n');
  console.log('='.repeat(60));

  // Test 1: Query with service role (should work)
  console.log('\n📊 Test 1: Query with SERVICE ROLE KEY (should work)...');
  const supabaseAdmin = createClient(supabaseUrl, serviceKey);
  const { data: adminData, error: adminError } = await supabaseAdmin
    .from('bookings')
    .select('*')
    .limit(1);

  if (adminError) {
    console.log('❌ Service role query failed:', adminError);
  } else {
    console.log('✅ Service role query succeeded');
    console.log(`   Found ${adminData?.length || 0} bookings`);
    if (adminData && adminData.length > 0) {
      console.log(`   First booking ID: ${adminData[0].id}`);
    }
  }

  // Test 2: Query with anon key (should work after RLS policy applied)
  console.log('\n📊 Test 2: Query with ANON KEY (public access)...');
  const supabaseAnon = createClient(supabaseUrl, anonKey);
  const { data: anonData, error: anonError } = await supabaseAnon
    .from('bookings')
    .select('*')
    .limit(1);

  if (anonError) {
    console.log('❌ Anon query failed:', anonError);
    console.log('\n⚠️  PUBLIC SELECT POLICY NOT WORKING!');
    console.log('\n💡 Please run this SQL in Supabase SQL Editor:');
    console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
    console.log(`
-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public to read bookings by ID" ON public.bookings;

-- Create new policy for public SELECT
CREATE POLICY "Allow public to read bookings by ID"
  ON public.bookings
  FOR SELECT
  TO public
  USING (true);
    `);
  } else {
    console.log('✅ Anon query succeeded');
    console.log(`   Found ${anonData?.length || 0} bookings`);
    if (anonData && anonData.length > 0) {
      console.log(`   First booking ID: ${anonData[0].id}`);
      console.log('\n✅ PUBLIC SELECT POLICY IS WORKING!');
      console.log(`\n💡 Test the API with:`);
      console.log(`   curl http://localhost:3000/api/bookings/${anonData[0].id}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

testRLS().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
