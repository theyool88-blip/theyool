#!/usr/bin/env node

/**
 * Check which consultation-related tables exist in Supabase
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

async function checkTables() {
  console.log('🔍 Checking consultation-related tables...\n');

  const tables = [
    'consultations',
    'consultations_unified',
    'bookings',
    'consultations_old_backup',
    'bookings_old_backup',
    'sms_templates',
    'sms_logs'
  ];

  const results = [];

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      results.push({ table, exists: false, count: 0, error: error.message });
    } else {
      results.push({ table, exists: true, count: count || 0 });
    }
  }

  // Print results
  console.log('📊 Table Status:\n');
  console.log('Table Name                    | Status | Records');
  console.log('------------------------------|--------|--------');

  results.forEach(({ table, exists, count, error }) => {
    const status = exists ? '✅ Exists' : '❌ Missing';
    const countStr = exists ? count.toString() : '-';
    const paddedTable = table.padEnd(29);
    const paddedStatus = status.padEnd(7);
    console.log(`${paddedTable} | ${paddedStatus} | ${countStr}`);
    if (error && !error.includes('does not exist')) {
      console.log(`  └─ Error: ${error}`);
    }
  });

  // Summary
  console.log('\n📋 Summary:');
  const existing = results.filter(r => r.exists);
  const missing = results.filter(r => !r.exists);

  console.log(`  - Existing tables: ${existing.length}/${tables.length}`);
  console.log(`  - Missing tables: ${missing.length}`);

  if (missing.length > 0) {
    console.log('\n⚠️  Missing tables:');
    missing.forEach(({ table }) => console.log(`     - ${table}`));
  }

  // Check migration status
  console.log('\n🔄 Migration Status:');

  const hasUnified = results.find(r => r.table === 'consultations_unified')?.exists;
  const hasConsultations = results.find(r => r.table === 'consultations')?.exists;
  const hasBookings = results.find(r => r.table === 'bookings')?.exists;
  const hasOldBackup = results.find(r => r.table === 'consultations_old_backup')?.exists;

  if (hasUnified && !hasConsultations) {
    console.log('  📌 Status: READY FOR MIGRATION');
    console.log('     - consultations_unified table exists');
    console.log('     - Need to run migration SQL to rename and merge data');
    console.log('\n  Next step: Run migration SQL in Supabase SQL Editor');
    console.log('     File: supabase/migrations/20251120_migrate_data_to_unified.sql');
  } else if (hasConsultations && !hasUnified && !hasOldBackup) {
    console.log('  📌 Status: MIGRATION COMPLETE');
    console.log('     - Unified consultations table is active');
    console.log('     - Old tables have been backed up or removed');
  } else if (hasConsultations && hasBookings && !hasUnified) {
    console.log('  📌 Status: NOT STARTED');
    console.log('     - Old separate tables exist');
    console.log('     - Need to run unified schema creation first');
    console.log('\n  Next step: Run schema SQL in Supabase SQL Editor');
    console.log('     File: supabase/migrations/20251120_unified_consultations_schema.sql');
  } else {
    console.log('  📌 Status: UNKNOWN STATE');
    console.log('     - Manual inspection required');
  }

  // Check for data
  if (hasConsultations) {
    const consultationsData = results.find(r => r.table === 'consultations');
    const { data, error } = await supabase
      .from('consultations')
      .select('request_type')
      .limit(1);

    if (!error && data && data.length > 0 && data[0].request_type) {
      console.log('\n  ✅ Unified consultations table has request_type field (migration complete)');
    } else if (!error && data && data.length > 0 && !data[0].request_type) {
      console.log('\n  ⚠️  Old consultations table (no request_type field)');
    }
  }
}

checkTables().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
