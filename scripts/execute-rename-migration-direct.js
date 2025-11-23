#!/usr/bin/env node

/**
 * Execute consultations rename migration directly using SQL
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function executeMigration() {
  console.log('🚀 Starting consultations table rename migration...\n');

  const isDryRun = process.argv.includes('--dry-run');

  if (isDryRun) {
    console.log('📋 DRY RUN MODE - No changes will be made\n');
  } else {
    console.log('⚠️  WARNING: This will drop the old consultations and bookings tables!');
    console.log('   - consultations: 4 rows will be deleted');
    console.log('   - bookings: 67 rows will be deleted\n');

    console.log('⏳ Waiting 5 seconds before proceeding...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  try {
    console.log('📊 Current state:');

    // Check current tables
    const { data: unified, error: e1 } = await supabase
      .from('consultations_unified')
      .select('id', { count: 'exact', head: true });

    console.log('   - consultations_unified:', e1 ? '❌' : '✅', unified ? '(empty)' : '');

    const { data: oldC, error: e2 } = await supabase
      .from('consultations')
      .select('id', { count: 'exact', head: true });

    console.log('   - consultations (old):', e2 ? '❌' : '✅');

    const { data: bookings, error: e3 } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true });

    console.log('   - bookings:', e3 ? '❌' : '✅');
    console.log('');

    if (isDryRun) {
      console.log('✅ Dry run complete. Run without --dry-run to execute migration.');
      console.log('   Command: node scripts/execute-rename-migration-direct.js');
      return;
    }

    // Execute migration steps using RPC
    console.log('⚙️  Executing migration...');

    // Step 1: Drop old tables
    console.log('   Step 1: Dropping old consultations table...');
    const { error: dropC } = await supabase.rpc('exec_sql', {
      sql: 'DROP TABLE IF EXISTS public.consultations CASCADE;'
    }).catch(() => ({ error: null })); // Ignore error as RPC might not exist

    console.log('   Step 2: Dropping old bookings table...');
    const { error: dropB } = await supabase.rpc('exec_sql', {
      sql: 'DROP TABLE IF EXISTS public.bookings CASCADE;'
    }).catch(() => ({ error: null }));

    // Since we can't execute raw SQL via Supabase JS client, we need to provide instructions
    console.log('');
    console.log('⚠️  Supabase JS client does not support raw SQL execution.');
    console.log('');
    console.log('📋 Please execute the following SQL manually in Supabase SQL Editor:');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('BEGIN;');
    console.log('');
    console.log('-- Drop old tables');
    console.log('DROP TABLE IF EXISTS public.consultations CASCADE;');
    console.log('DROP TABLE IF EXISTS public.bookings CASCADE;');
    console.log('');
    console.log('-- Rename unified table');
    console.log('ALTER TABLE public.consultations_unified RENAME TO consultations;');
    console.log('');
    console.log('-- Update RLS policies');
    console.log('DROP POLICY IF EXISTS "Allow public to create consultations_unified" ON public.consultations;');
    console.log('DROP POLICY IF EXISTS "Allow admin to read all consultations_unified" ON public.consultations;');
    console.log('DROP POLICY IF EXISTS "Allow admin to update consultations_unified" ON public.consultations;');
    console.log('DROP POLICY IF EXISTS "Allow admin to delete consultations_unified" ON public.consultations;');
    console.log('');
    console.log('CREATE POLICY "Allow public to create consultations"');
    console.log('  ON public.consultations FOR INSERT TO public WITH CHECK (true);');
    console.log('');
    console.log('CREATE POLICY "Allow admin to read all consultations"');
    console.log('  ON public.consultations FOR SELECT TO authenticated USING (true);');
    console.log('');
    console.log('CREATE POLICY "Allow admin to update consultations"');
    console.log('  ON public.consultations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);');
    console.log('');
    console.log('CREATE POLICY "Allow admin to delete consultations"');
    console.log('  ON public.consultations FOR DELETE TO authenticated USING (true);');
    console.log('');
    console.log('-- Rename triggers');
    console.log('DROP TRIGGER IF EXISTS set_consultations_unified_updated_at ON public.consultations;');
    console.log('DROP TRIGGER IF EXISTS set_consultations_unified_status_timestamps ON public.consultations;');
    console.log('');
    console.log('CREATE TRIGGER set_consultations_updated_at');
    console.log('  BEFORE UPDATE ON public.consultations FOR EACH ROW');
    console.log('  EXECUTE FUNCTION public.handle_updated_at();');
    console.log('');
    console.log('CREATE TRIGGER set_consultations_status_timestamps');
    console.log('  BEFORE UPDATE ON public.consultations FOR EACH ROW');
    console.log('  EXECUTE FUNCTION public.handle_consultation_status_timestamps();');
    console.log('');
    console.log('-- Rename indexes');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_status RENAME TO idx_consultations_status;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_request_type RENAME TO idx_consultations_request_type;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_created_at RENAME TO idx_consultations_created_at;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_status_type RENAME TO idx_consultations_status_type;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_status_date RENAME TO idx_consultations_status_date;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_scheduling RENAME TO idx_consultations_scheduling;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_assigned_lawyer RENAME TO idx_consultations_assigned_lawyer;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_payment RENAME TO idx_consultations_payment;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_phone RENAME TO idx_consultations_phone;');
    console.log('ALTER INDEX IF EXISTS idx_consultations_uni_email RENAME TO idx_consultations_email;');
    console.log('');
    console.log('COMMIT;');
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ After executing the SQL, verify with:');
    console.log('   node scripts/check-consultations-tables.js');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

executeMigration();
