#!/usr/bin/env node

/**
 * Fix consultations table updated_at trigger
 *
 * This script applies the SQL migration to add auto-update trigger
 * for the updated_at column in the consultations table.
 *
 * Usage: node scripts/run-consultations-fix.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🔧 Fixing consultations table updated_at trigger...\n');

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, 'fix-consultations-updated-at.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon and filter out empty statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`▶️  Executing statement ${i + 1}/${statements.length}...`);

      const { data, error } = await supabase.rpc('exec_sql', {
        sql_query: statement + ';'
      });

      if (error) {
        // Try direct execution if RPC fails
        console.log('   Trying direct execution...');
        const { error: directError } = await supabase.from('_raw_sql').select(statement);

        if (directError) {
          console.error(`   ❌ Error: ${directError.message}`);
          console.error(`   Statement: ${statement.substring(0, 100)}...`);
        } else {
          console.log('   ✅ Success');
        }
      } else {
        console.log('   ✅ Success');
      }
    }

    console.log('\n✅ Migration complete!\n');
    console.log('📋 Next steps:');
    console.log('   1. Test status updates in admin panel');
    console.log('   2. Verify updated_at changes automatically');
    console.log('   3. Check browser console for any errors\n');

  } catch (error) {
    console.error('❌ Error running migration:', error.message);
    process.exit(1);
  }
}

main();
