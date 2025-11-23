const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyTable() {
  console.log('🔍 Checking if bookings table exists...\n');

  try {
    // Try to query the table
    const { data, error } = await supabase
      .from('bookings')
      .select('count')
      .limit(1);

    if (error) {
      if (error.message.includes('relation "public.bookings" does not exist')) {
        console.log('❌ Table "bookings" does NOT exist\n');
        console.log('📋 To create the table:');
        console.log('1. Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
        console.log('2. Open file: supabase/migrations/create_bookings_table.sql');
        console.log('3. Copy the entire SQL content');
        console.log('4. Paste into the SQL Editor and click "Run"\n');
        console.log('Then run this script again to verify.\n');
        process.exit(1);
      } else {
        console.log('⚠️  Unexpected error:', error.message);
        console.log('   This might be normal if RLS is blocking the query\n');
      }
    } else {
      console.log('✅ Table "bookings" EXISTS!');
      console.log('✅ Migration is complete and ready to use\n');
      console.log('🎉 You can now test the API:');
      console.log('   node scripts/test-booking-api.js\n');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

verifyTable();
