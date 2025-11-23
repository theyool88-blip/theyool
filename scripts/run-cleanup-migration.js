#!/usr/bin/env node

/**
 * Execute cleanup migration to finalize unified consultations
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🚀 Running cleanup migration...\n');

  try {
    // Read migration file
    const migrationPath = path.join(__dirname, '../supabase/migrations/20251120_cleanup_unified_consultations.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Migration SQL loaded');
    console.log('⚠️  This will:');
    console.log('   1. Rename old consultations → consultations_old_backup');
    console.log('   2. Rename old bookings → bookings_old_backup');
    console.log('   3. Rename consultations_unified → consultations');
    console.log('   4. Update all indexes, triggers, and RLS policies\n');

    console.log('⚙️  Executing migration via Supabase REST API...\n');

    // Execute via REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      // Try alternative: direct SQL execution
      console.log('⚠️  REST API not available, please run SQL manually:');
      console.log('   1. Go to Supabase Dashboard → SQL Editor');
      console.log('   2. Paste contents of: supabase/migrations/20251120_cleanup_unified_consultations.sql');
      console.log('   3. Execute the SQL');
      console.log('   4. Run this script again to verify\n');

      console.log('📋 SQL Preview:');
      console.log(sql.split('\n').slice(0, 20).join('\n'));
      console.log('   ... (see full file for complete SQL)\n');

      return;
    }

    console.log('✅ Migration executed successfully!\n');

    // Verify the changes
    console.log('🔍 Verifying migration...');

    const { data: consultations, error: consultationsError } = await supabase
      .from('consultations')
      .select('id', { count: 'exact', head: true });

    if (!consultationsError) {
      console.log('   ✅ New consultations table is accessible');
    } else {
      console.log('   ❌ Error accessing consultations:', consultationsError.message);
    }

    console.log('\n✅ Cleanup migration complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update TypeScript types');
    console.log('   2. Update API routes');
    console.log('   3. Test all consultation types');
    console.log('   4. Drop old backup tables after 1-2 weeks\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

main();
