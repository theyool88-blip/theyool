const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🚀 Running bookings table migration...\n');

  try {
    // Read the SQL migration file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'create_bookings_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Migration file loaded');
    console.log('📊 Executing SQL...\n');

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

    if (error) {
      // If exec_sql RPC doesn't exist, we need to use the SQL editor manually
      console.error('❌ Error: RPC function not available');
      console.log('\n📋 Please execute the migration manually:');
      console.log('1. Go to https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
      console.log('2. Copy the SQL from: supabase/migrations/create_bookings_table.sql');
      console.log('3. Paste and run in the SQL Editor\n');

      console.log('Or use the Supabase CLI:');
      console.log('npx supabase db push --db-url "postgresql://postgres.kqqyipnlkmmprfgygauk:[PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres"\n');

      process.exit(1);
    }

    console.log('✅ Migration completed successfully!');
    console.log('\n📊 Verifying table creation...');

    // Verify the table was created
    const { data: tables, error: verifyError } = await supabase
      .from('bookings')
      .select('*')
      .limit(0);

    if (verifyError) {
      console.log('⚠️  Warning: Could not verify table (this is expected if RLS blocks it)');
      console.log('   Error:', verifyError.message);
    } else {
      console.log('✅ Table "bookings" verified!');
    }

    console.log('\n🎉 Migration complete! You can now use the bookings API.');

  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    console.log('\n📋 Manual migration required:');
    console.log('Please run the SQL from supabase/migrations/create_bookings_table.sql');
    console.log('in the Supabase Dashboard SQL Editor\n');
    process.exit(1);
  }
}

runMigration();
