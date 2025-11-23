const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function fixRLS() {
  console.log('🔧 Fixing RLS Policy for bookings table...\n');

  try {
    // Drop existing policy
    console.log('1. Dropping existing policy...');
    const { error: dropError } = await supabase.rpc('exec', {
      sql: 'DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;'
    });

    if (dropError && !dropError.message.includes('does not exist')) {
      console.error('   ⚠️  Error dropping policy:', dropError.message);
    } else {
      console.log('   ✅ Policy dropped (or did not exist)');
    }

    // Create new policy
    console.log('\n2. Creating new policy with anon role...');
    const { error: createError } = await supabase.rpc('exec', {
      sql: 'CREATE POLICY "Allow public to create bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);'
    });

    if (createError) {
      console.error('   ❌ Error creating policy:', createError.message);
      console.log('\n⚠️  Manual fix required. Execute this SQL in Supabase Dashboard:');
      console.log('   URL: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql\n');
      console.log('DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;');
      console.log('CREATE POLICY "Allow public to create bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);');
      return;
    }

    console.log('   ✅ New policy created successfully!\n');

    // Test the fix
    console.log('3. Testing the fix with anon key...');
    const anonClient = createClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcXlpcG5sa21tcHJmZ3lnYXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjQ0MjksImV4cCI6MjA3NzkwMDQyOX0.GPWY88f5XCv0eG7utuuyMoJTDiVqdJTC6aoRCvAtn-Q'
    );

    const testBooking = {
      type: 'visit',
      name: 'RLS Test User',
      phone: '010-9999-9999',
      email: 'test@rls.com',
      preferred_date: '2025-11-25',
      preferred_time: '15:00',
      office_location: '천안',
      status: 'pending'
    };

    const { data, error: testError } = await anonClient
      .from('bookings')
      .insert([testBooking])
      .select()
      .single();

    if (testError) {
      console.error('   ❌ Test failed:', testError.message);
      return;
    }

    console.log('   ✅ Test booking created successfully!');
    console.log(`   Booking ID: ${data.id}`);

    // Clean up test booking
    console.log('\n4. Cleaning up test data...');
    await supabase.from('bookings').delete().eq('id', data.id);
    console.log('   ✅ Test booking deleted\n');

    console.log('✨ RLS Policy fix completed successfully!\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    console.log('\n⚠️  Manual fix required. Execute this SQL in Supabase Dashboard:');
    console.log('   URL: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql\n');
    console.log('DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;');
    console.log('CREATE POLICY "Allow public to create bookings" ON public.bookings FOR INSERT TO anon WITH CHECK (true);');
  }
}

fixRLS();
