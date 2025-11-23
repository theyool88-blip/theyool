const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcXlpcG5sa21tcHJmZ3lnYXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjQ0MjksImV4cCI6MjA3NzkwMDQyOX0.GPWY88f5XCv0eG7utuuyMoJTDiVqdJTC6aoRCvAtn-Q';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables!');
  console.log('URL:', supabaseUrl);
  console.log('Key:', supabaseAnonKey ? 'Present' : 'Missing');
  process.exit(1);
}

// Create client with ANON key (public access)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBookingCreate() {
  console.log('🧪 Testing Booking Creation with Anon Key\n');

  const testBooking = {
    type: 'visit',
    name: 'Test User',
    phone: '010-1234-5678',
    email: 'test@example.com',
    category: 'divorce',
    message: 'Test booking message',
    preferred_date: '2025-11-25', // Monday
    preferred_time: '14:00',
    office_location: '천안',
    status: 'pending'
  };

  console.log('Attempting to create booking:');
  console.log(JSON.stringify(testBooking, null, 2));
  console.log('');

  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([testBooking])
      .select()
      .single();

    if (error) {
      console.error('❌ Error:', error.message);
      console.error('Code:', error.code);
      console.error('Details:', error.details);
      console.error('Hint:', error.hint);

      if (error.code === '42501') {
        console.log('\n⚠️  This is a permissions error. RLS Policy needs to be fixed.');
        console.log('Please run the following SQL in Supabase Dashboard:');
        console.log('URL: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql\n');
        console.log('DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;');
        console.log('CREATE POLICY "Allow public to create bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);');
      }

      return;
    }

    console.log('✅ Success! Booking created:');
    console.log(JSON.stringify(data, null, 2));

    // Clean up - delete the test booking
    console.log('\n🧹 Cleaning up test data...');
    const supabaseService = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY);
    await supabaseService.from('bookings').delete().eq('id', data.id);
    console.log('✅ Test booking deleted');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testBookingCreate();
