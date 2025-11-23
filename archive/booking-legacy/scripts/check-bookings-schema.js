#!/usr/bin/env node

/**
 * Check bookings table schema
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

async function checkSchema() {
  console.log('📊 Checking bookings table schema...\n');

  // Query to get table columns
  const { data, error } = await supabase.rpc('get_table_columns', {
    table_name: 'bookings'
  }).catch(() => null);

  // Alternative: Try selecting all columns from a single row
  const { data: sampleRow, error: sampleError } = await supabase
    .from('bookings')
    .select('*')
    .limit(1)
    .maybeSingle();

  if (sampleRow) {
    console.log('✅ Available columns in bookings table:');
    Object.keys(sampleRow).forEach(column => {
      console.log(`  - ${column}`);
    });
  } else if (!sampleError || sampleError.code === 'PGRST116') {
    console.log('⚠️  Table is empty. Checking table structure...');

    // Try inserting and immediately deleting to see what columns are available
    const testData = {
      type: 'visit',
      name: 'test',
      phone: '010-0000-0000',
      preferred_date: '2025-01-01',
      preferred_time: '10:00',
    };

    const { error: insertError } = await supabase
      .from('bookings')
      .insert([testData])
      .select();

    if (insertError) {
      console.log('Available columns can be inferred from error:');
      console.log(insertError);
    }
  } else {
    console.error('❌ Error:', sampleError);
  }
}

checkSchema().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
