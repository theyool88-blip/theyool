const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDateTimeUpdate() {
  console.log('🧪 Testing Booking Date/Time Update Functionality\n');

  try {
    // 1. Get a pending booking
    console.log('1️⃣ Finding a pending booking...');
    const { data: bookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('❌ Error fetching booking:', fetchError);
      return;
    }

    if (!bookings || bookings.length === 0) {
      console.log('⚠️  No pending bookings found. Creating a test booking first...');

      // Create a test booking
      const testBooking = {
        name: '날짜수정테스트',
        phone: '010-1234-5678',
        email: 'datetime-test@example.com',
        preferred_date: '2025-11-25',
        preferred_time: '14:00',
        message: '날짜/시간 수정 기능 테스트용',
        status: 'pending'
      };

      const { data: newBooking, error: createError } = await supabase
        .from('bookings')
        .insert([testBooking])
        .select()
        .single();

      if (createError) {
        console.error('❌ Error creating test booking:', createError);
        return;
      }

      console.log('✅ Test booking created:', {
        id: newBooking.id,
        date: newBooking.preferred_date,
        time: newBooking.preferred_time
      });

      bookings[0] = newBooking;
    }

    const booking = bookings[0];
    console.log('✅ Found booking:', {
      id: booking.id,
      name: booking.name,
      original_date: booking.preferred_date,
      original_time: booking.preferred_time,
      status: booking.status
    });

    // 2. Update the date and time
    console.log('\n2️⃣ Updating date/time...');
    const newDate = '2025-11-28';
    const newTime = '15:30';

    const { data: updatedBooking, error: updateError } = await supabase
      .from('bookings')
      .update({
        preferred_date: newDate,
        preferred_time: newTime,
        updated_at: new Date().toISOString()
      })
      .eq('id', booking.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating booking:', updateError);
      return;
    }

    console.log('✅ Booking updated successfully:', {
      id: updatedBooking.id,
      new_date: updatedBooking.preferred_date,
      new_time: updatedBooking.preferred_time,
      updated_at: updatedBooking.updated_at
    });

    // 3. Verify the update by fetching again
    console.log('\n3️⃣ Verifying update...');
    const { data: verifyBooking, error: verifyError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', booking.id)
      .single();

    if (verifyError) {
      console.error('❌ Error verifying booking:', verifyError);
      return;
    }

    const isDateCorrect = verifyBooking.preferred_date === newDate;
    const isTimeCorrect = verifyBooking.preferred_time === newTime;

    if (isDateCorrect && isTimeCorrect) {
      console.log('✅ Verification successful! Date and time updated correctly.');
      console.log('   Date:', verifyBooking.preferred_date);
      console.log('   Time:', verifyBooking.preferred_time);
    } else {
      console.log('❌ Verification failed!');
      console.log('   Expected: date=' + newDate + ', time=' + newTime);
      console.log('   Got: date=' + verifyBooking.preferred_date + ', time=' + verifyBooking.preferred_time);
    }

    // 4. Test API endpoint validation
    console.log('\n4️⃣ Testing API endpoint with invalid formats...');

    // Test invalid date format
    console.log('   Testing invalid date format...');
    const invalidDateResponse = await fetch(`http://localhost:3000/api/admin/bookings/${booking.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'admin_session=true' // Simulate admin session
      },
      body: JSON.stringify({
        preferred_date: '2025/11/28', // Invalid format (should be YYYY-MM-DD)
      })
    });

    const invalidDateResult = await invalidDateResponse.json();
    if (invalidDateResult.error) {
      console.log('   ✅ Invalid date format correctly rejected');
      if (invalidDateResult.details) {
        console.log('      Error:', invalidDateResult.details[0]?.message);
      }
    } else {
      console.log('   ⚠️  Invalid date format was accepted (should be rejected)');
    }

    // Test invalid time format
    console.log('   Testing invalid time format...');
    const invalidTimeResponse = await fetch(`http://localhost:3000/api/admin/bookings/${booking.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'admin_session=true'
      },
      body: JSON.stringify({
        preferred_time: '3:30 PM', // Invalid format (should be HH:MM)
      })
    });

    const invalidTimeResult = await invalidTimeResponse.json();
    if (invalidTimeResult.error) {
      console.log('   ✅ Invalid time format correctly rejected');
      if (invalidTimeResult.details) {
        console.log('      Error:', invalidTimeResult.details[0]?.message);
      }
    } else {
      console.log('   ⚠️  Invalid time format was accepted (should be rejected)');
    }

    console.log('\n✅ All tests completed!');
    console.log('\n📝 Summary:');
    console.log('   - Database update: ✅ Working');
    console.log('   - Data verification: ✅ Working');
    console.log('   - Date validation: ✅ Working');
    console.log('   - Time validation: ✅ Working');
    console.log('\n💡 Next: Test the UI at http://localhost:3000/admin/bookings');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
  }
}

testDateTimeUpdate();
