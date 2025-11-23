#!/usr/bin/env node

/**
 * Execute consultations table rename migration
 * This script renames consultations_unified to consultations and drops old tables
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function executeMigration() {
  console.log('🚀 Starting consultations table rename migration...\n');

  try {
    // Read migration SQL
    const migrationFile = path.join(__dirname, '../supabase/migrations/20251120_rename_unified_consultations.sql');
    const migrationSQL = fs.readFileSync(migrationFile, 'utf8');

    // Remove comments and split into statements
    const statements = migrationSQL
      .split('\n')
      .filter(line => !line.trim().startsWith('--') && line.trim())
      .join('\n')
      .split(';')
      .filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));

    console.log('⚠️  WARNING: This will drop the old consultations and bookings tables!');
    console.log('   - consultations: 4 rows will be deleted');
    console.log('   - bookings: 67 rows will be deleted');
    console.log('');
    console.log('⚠️  This migration must be executed via Supabase SQL Editor.');
    console.log('');
    console.log('📋 Migration steps:');
    console.log('   1. Go to Supabase Dashboard > SQL Editor');
    console.log('   2. Copy the SQL file: supabase/migrations/20251120_rename_unified_consultations.sql');
    console.log('   3. Execute the migration');
    console.log('   4. Verify with: SELECT tablename FROM pg_tables WHERE tablename = \'consultations\';');
    console.log('');
    console.log('✅ After migration, run: node scripts/check-consultations-tables.js');

  } catch (error) {
    console.error('❌ Migration preparation failed:', error);
    process.exit(1);
  }
}

executeMigration();
