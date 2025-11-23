const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkDatabase() {
  console.log('🔍 Checking bookings table...\n');

  try {
    // Check if table exists and get count
    const { count, error } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error:', error.message);
      console.error('   This usually means the bookings table does not exist yet.');
      console.error('   You need to run the migration: supabase/migrations/create_bookings_table.sql');
      return;
    }

    console.log('✅ bookings table exists');
    console.log(`📊 Total bookings: ${count || 0}\n`);

    // Get sample bookings
    const { data: bookings, error: fetchError } = await supabase
      .from('bookings')
      .select('id, name, phone, type, status, preferred_date, preferred_time, preferred_lawyer, created_at')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error('❌ Error fetching bookings:', fetchError.message);
      return;
    }

    if (bookings && bookings.length > 0) {
      console.log('📋 Recent bookings:');
      bookings.forEach((booking, i) => {
        console.log(`\n${i + 1}. ${booking.name} (${booking.phone})`);
        console.log(`   Type: ${booking.type}, Status: ${booking.status}`);
        console.log(`   Date/Time: ${booking.preferred_date} ${booking.preferred_time}`);
        if (booking.preferred_lawyer) {
          console.log(`   Preferred Lawyer: ${booking.preferred_lawyer}`);
        }
        console.log(`   ID: ${booking.id.slice(0, 8)}...`);
      });
    } else {
      console.log('📋 No bookings found yet');
      console.log('\n💡 You can test the booking system at: http://localhost:3000/booking');
    }

    console.log('\n✅ Database check complete!');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

checkDatabase();
