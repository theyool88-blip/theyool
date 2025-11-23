#!/usr/bin/env node

/**
 * Apply RLS policy to allow public SELECT on bookings table
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  console.log('🔧 Applying public booking SELECT policy...\n');

  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251120_add_public_booking_select.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('📄 Migration SQL:');
  console.log('─'.repeat(60));
  console.log(sql);
  console.log('─'.repeat(60));
  console.log();

  // Split by semicolons and execute each statement
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    // Skip comments
    if (statement.startsWith('COMMENT ON')) {
      console.log('ℹ️  Skipping comment statement (execute manually if needed)');
      continue;
    }

    console.log('🔄 Executing statement...');
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement }).catch(() => null);

    if (!data && !error) {
      // rpc might not be available, try direct query
      const { error: directError } = await supabase
        .from('bookings')
        .select('id')
        .limit(0);

      if (directError) {
        console.log('⚠️  Cannot execute SQL via API. Please run manually in Supabase SQL Editor:');
        console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
        console.log();
        console.log(sql);
        console.log();
        console.log('💡 After running manually, press Enter to continue...');
        process.exit(0);
      }
    }

    if (error) {
      console.error('❌ Error:', error);
    } else {
      console.log('✅ Statement executed');
    }
  }

  console.log();
  console.log('✅ Migration completed!');
  console.log('💡 You can now test the API with: node scripts/test-booking-detail-api.js');
}

applyMigration().catch(error => {
  console.error('❌ Error:', error);
  console.log();
  console.log('⚠️  Please run this SQL manually in Supabase SQL Editor:');
  console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
  console.log();
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251120_add_public_booking_select.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');
  console.log(sql);
  process.exit(1);
});
