const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function executeMigration() {
  console.log('🚀 Executing bookings table migration...\n');

  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'create_bookings_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('📊 SQL length:', sql.length, 'characters\n');

    // Split SQL into individual statements (separated by semicolons)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log('📝 Found', statements.length, 'SQL statements to execute\n');

    // Execute each statement
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';

      // Log statement preview
      const preview = statement.substring(0, 100).replace(/\n/g, ' ');
      console.log(`[${i + 1}/${statements.length}] Executing: ${preview}...`);

      try {
        const { data, error } = await supabase.rpc('exec_sql', {
          sql_query: statement
        });

        if (error) {
          console.log(`   ❌ Error:`, error.message);
          errorCount++;
        } else {
          console.log(`   ✅ Success`);
          successCount++;
        }
      } catch (err) {
        console.log(`   ❌ Error:`, err.message);
        errorCount++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log(`Migration Summary:`);
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${errorCount}`);
    console.log('='.repeat(60) + '\n');

    if (errorCount > 0) {
      console.log('⚠️  Some statements failed. This might be because:');
      console.log('   1. The RPC function exec_sql does not exist');
      console.log('   2. Some objects already exist');
      console.log('   3. Permission issues\n');
      console.log('📋 Manual migration steps:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
      console.log('   2. Copy SQL from: supabase/migrations/create_bookings_table.sql');
      console.log('   3. Paste and run in SQL Editor\n');
    } else {
      console.log('🎉 Migration completed successfully!');
      console.log('📊 Verifying table creation...\n');

      // Verify the table exists
      const { data: tables, error: verifyError } = await supabase
        .from('bookings')
        .select('count')
        .limit(0);

      if (verifyError) {
        console.log('⚠️  Could not verify table (this may be expected with RLS)');
        console.log('   Error:', verifyError.message);
      } else {
        console.log('✅ Table "bookings" verified and accessible!');
      }
    }

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📋 Manual migration required:');
    console.log('Please run the SQL from supabase/migrations/create_bookings_table.sql');
    console.log('in the Supabase Dashboard SQL Editor\n');
    process.exit(1);
  }
}

executeMigration();
