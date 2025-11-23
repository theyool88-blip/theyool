#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkStatus() {
  console.log('🔍 Checking if consultations table is unified...\n');

  // Check consultations table structure
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .limit(1);

  if (error) {
    console.log('❌ Error querying consultations:', error.message);
    return;
  }

  if (data && data.length > 0) {
    const fields = Object.keys(data[0]);
    console.log('📋 Current consultations table fields:');
    console.log(fields.join(', '));

    if (fields.includes('request_type')) {
      console.log('\n✅ This is the UNIFIED table! (has request_type field)');
      console.log('\n🎉 Migration already complete!');
    } else {
      console.log('\n❌ This is the OLD table (no request_type field)');
      console.log('\n⚠️  Need to run migration');
    }
  } else {
    console.log('ℹ️  consultations table is empty');
  }
}

checkStatus();
