#!/usr/bin/env node

/**
 * Verify existing data structure before migration
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function verifyData() {
  console.log('🔍 Verifying existing data structure before migration...\n');

  // Check consultations table
  console.log('📋 CONSULTATIONS TABLE:');
  const { data: consultations, error: consultationsError } = await supabase
    .from('consultations')
    .select('*')
    .limit(2);

  if (consultationsError) {
    console.error('  ❌ Error:', consultationsError.message);
  } else if (consultations && consultations.length > 0) {
    console.log(`  ✅ Found ${consultations.length} records (showing first one)`);
    console.log('  Structure:');
    console.log('  ', Object.keys(consultations[0]).join(', '));
    console.log('\n  Sample data:');
    console.log('  ', JSON.stringify(consultations[0], null, 2).split('\n').join('\n   '));
  } else {
    console.log('  ℹ️  No data found');
  }

  // Check bookings table
  console.log('\n📋 BOOKINGS TABLE:');
  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*')
    .limit(2);

  if (bookingsError) {
    console.error('  ❌ Error:', bookingsError.message);
  } else if (bookings && bookings.length > 0) {
    console.log(`  ✅ Found ${bookings.length} records (showing first one)`);
    console.log('  Structure:');
    console.log('  ', Object.keys(bookings[0]).join(', '));
    console.log('\n  Sample data:');
    console.log('  ', JSON.stringify(bookings[0], null, 2).split('\n').join('\n   '));
  } else {
    console.log('  ℹ️  No data found');
  }

  // Count records by type/status
  console.log('\n📊 DATA SUMMARY:');

  const { count: consultationsCount } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true });

  const { count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  console.log(`  - Consultations: ${consultationsCount || 0} records`);
  console.log(`  - Bookings: ${bookingsCount || 0} records`);
  console.log(`  - Total to migrate: ${(consultationsCount || 0) + (bookingsCount || 0)} records`);

  // Check bookings by type
  if (bookingsCount && bookingsCount > 0) {
    const { data: byType } = await supabase
      .from('bookings')
      .select('type');

    if (byType) {
      const typeCounts = byType.reduce((acc, row) => {
        acc[row.type] = (acc[row.type] || 0) + 1;
        return acc;
      }, {});

      console.log('\n  Bookings by type:');
      Object.entries(typeCounts).forEach(([type, count]) => {
        console.log(`    - ${type}: ${count}`);
      });
    }
  }

  console.log('\n✅ Pre-migration verification complete!');
  console.log('\n📝 Next steps:');
  console.log('  1. Review the data structure above');
  console.log('  2. Run migration: node scripts/run-migration.js');
}

verifyData().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
