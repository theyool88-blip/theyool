#!/usr/bin/env node

/**
 * Display SQL for consultations rename migration
 */

const fs = require('fs');
const path = require('path');

console.log('');
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  CONSULTATIONS TABLE RENAME MIGRATION                         ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('');
console.log('⚠️  WARNING: This will drop the old consultations and bookings tables!');
console.log('   - consultations: 4 rows will be deleted');
console.log('   - bookings: 67 rows will be deleted');
console.log('');
console.log('📋 INSTRUCTIONS:');
console.log('   1. Copy the SQL below');
console.log('   2. Go to Supabase Dashboard > SQL Editor');
console.log('   3. Paste and execute the SQL');
console.log('   4. Verify: node scripts/check-consultations-tables.js');
console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

// Read and display migration SQL
const migrationFile = path.join(__dirname, '../supabase/migrations/20251120_rename_unified_consultations.sql');
const migrationSQL = fs.readFileSync(migrationFile, 'utf8');

console.log(migrationSQL);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');
console.log('✅ After executing the SQL, verify with:');
console.log('   node scripts/check-consultations-tables.js');
console.log('');
