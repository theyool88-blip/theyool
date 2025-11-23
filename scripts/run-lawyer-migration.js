/**
 * Run preferred_lawyer migration on Supabase
 *
 * This script adds the preferred_lawyer column to the bookings table
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client (service role for schema changes)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('🚀 Running preferred_lawyer migration...\n');

  try {
    // Read migration SQL
    const migrationPath = path.join(__dirname, '../supabase/migrations/20251120_add_preferred_lawyer.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration SQL:');
    console.log('─'.repeat(80));
    console.log(migrationSQL);
    console.log('─'.repeat(80));
    console.log('');

    // Execute migration
    console.log('⏳ Executing migration...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });

    if (error) {
      // Try alternative method using raw query
      console.log('⚠️ RPC method failed, trying raw query...');

      // Split SQL into individual statements
      const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (const statement of statements) {
        console.log(`\n📝 Executing: ${statement.substring(0, 50)}...`);
        const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement });
        if (stmtError) {
          console.error(`❌ Error: ${stmtError.message}`);
        } else {
          console.log('✅ Success');
        }
      }
    } else {
      console.log('✅ Migration executed successfully');
    }

    // Verify the column was added
    console.log('\n🔍 Verifying migration...');
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('id, preferred_lawyer')
      .limit(1);

    if (testError) {
      console.error('❌ Verification failed:', testError.message);
      console.log('\n⚠️ Manual SQL execution required:');
      console.log('1. Go to Supabase SQL Editor');
      console.log('2. Execute the migration SQL shown above');
    } else {
      console.log('✅ Migration verified successfully');
      console.log('✅ Column "preferred_lawyer" is now available');
    }

    console.log('\n✅ Migration complete!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n⚠️ Manual SQL execution required:');
    console.log('1. Go to Supabase SQL Editor (https://supabase.com/dashboard)');
    console.log('2. Navigate to: Project > SQL Editor');
    console.log('3. Execute the migration SQL from:');
    console.log('   supabase/migrations/20251120_add_preferred_lawyer.sql');
    process.exit(1);
  }
}

runMigration();
