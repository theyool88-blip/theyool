/**
 * Test Booking Conflict Prevention
 * Verifies that duplicate bookings are properly blocked
 */

async function testConflictPrevention() {
  console.log('🧪 Testing Booking Conflict Prevention\n');
  console.log('='.repeat(60) + '\n');

  const baseUrl = 'http://localhost:3000';

  // Test booking data - using unique time slot
  const testBooking = {
    type: 'visit',
    name: 'Conflict Test User',
    phone: '010-1111-2222',
    email: 'conflict@test.com',
    category: '위자료 청구',
    message: '충돌 테스트',
    preferred_date: '2025-12-01', // Monday - future date
    preferred_time: '09:00', // Morning slot
    office_location: '천안'
  };

  try {
    // Test 1: Create first booking (should succeed)
    console.log('📝 Test 1: Creating first booking');
    console.log('-'.repeat(60));

    const firstResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testBooking),
    });

    if (firstResponse.ok) {
      const firstData = await firstResponse.json();
      console.log('✅ First booking created successfully');
      console.log(`   Booking ID: ${firstData.booking.id}`);
      console.log(`   Time: ${testBooking.preferred_date} ${testBooking.preferred_time}`);
      console.log(`   Location: ${testBooking.office_location}`);
    } else {
      const errorData = await firstResponse.json();
      console.log('❌ First booking failed:', errorData.error);
      return;
    }

    // Test 2: Try to create duplicate booking (should fail)
    console.log('\n🚫 Test 2: Attempting duplicate booking (same date/time/location)');
    console.log('-'.repeat(60));

    const duplicateBooking = {
      ...testBooking,
      name: 'Duplicate Test User',
      phone: '010-3333-4444',
      email: 'duplicate@test.com'
    };

    const duplicateResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duplicateBooking),
    });

    if (duplicateResponse.ok) {
      console.log('❌ FAIL: Duplicate booking was allowed! This should have been blocked.');
      const data = await duplicateResponse.json();
      console.log('   Booking ID:', data.booking.id);
    } else {
      const errorData = await duplicateResponse.json();
      console.log('✅ PASS: Duplicate booking was correctly blocked');
      console.log(`   Error message: "${errorData.error}"`);
    }

    // Test 3: Create booking at different time (should succeed)
    console.log('\n📝 Test 3: Creating booking at different time (same date/location)');
    console.log('-'.repeat(60));

    const differentTimeBooking = {
      ...testBooking,
      name: 'Different Time User',
      phone: '010-5555-6666',
      email: 'different-time@test.com',
      preferred_time: '16:00' // Different time
    };

    const differentTimeResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(differentTimeBooking),
    });

    if (differentTimeResponse.ok) {
      const data = await differentTimeResponse.json();
      console.log('✅ Booking at different time created successfully');
      console.log(`   Booking ID: ${data.booking.id}`);
      console.log(`   Time: ${differentTimeBooking.preferred_time}`);
    } else {
      const errorData = await differentTimeResponse.json();
      console.log('❌ Different time booking failed:', errorData.error);
    }

    // Test 4: Create booking at same time but different location (should succeed)
    console.log('\n📝 Test 4: Creating booking at same time but different location');
    console.log('-'.repeat(60));

    const differentLocationBooking = {
      ...testBooking,
      name: 'Different Location User',
      phone: '010-7777-8888',
      email: 'different-location@test.com',
      office_location: '평택' // Different location
    };

    const differentLocationResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(differentLocationBooking),
    });

    if (differentLocationResponse.ok) {
      const data = await differentLocationResponse.json();
      console.log('✅ Booking at different location created successfully');
      console.log(`   Booking ID: ${data.booking.id}`);
      console.log(`   Location: ${differentLocationBooking.office_location}`);
    } else {
      const errorData = await differentLocationResponse.json();
      console.log('❌ Different location booking failed:', errorData.error);
    }

    // Test 5: Video consultation conflict test
    console.log('\n📹 Test 5: Testing video consultation conflicts');
    console.log('-'.repeat(60));

    const videoBooking1 = {
      type: 'video',
      name: 'Video Test User 1',
      phone: '010-9999-0000',
      email: 'video1@test.com',
      preferred_date: '2025-12-02', // Tuesday
      preferred_time: '10:00'
    };

    const video1Response = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoBooking1),
    });

    if (video1Response.ok) {
      const data = await video1Response.json();
      console.log('✅ First video booking created');
      console.log(`   Booking ID: ${data.booking.id}`);

      // Try duplicate video booking
      const videoBooking2 = {
        ...videoBooking1,
        name: 'Video Test User 2',
        phone: '010-1111-0000',
        email: 'video2@test.com'
      };

      const video2Response = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoBooking2),
      });

      if (video2Response.ok) {
        console.log('❌ FAIL: Duplicate video booking was allowed!');
      } else {
        const errorData = await video2Response.json();
        console.log('✅ PASS: Duplicate video booking was blocked');
        console.log(`   Error: "${errorData.error}"`);
      }
    } else {
      console.log('❌ First video booking failed');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ Conflict Prevention Test Summary');
    console.log('='.repeat(60));
    console.log('✅ All tests completed');
    console.log('\n📋 Expected Results:');
    console.log('   ✅ Test 1: First booking succeeds');
    console.log('   ✅ Test 2: Duplicate booking blocked');
    console.log('   ✅ Test 3: Different time allowed');
    console.log('   ✅ Test 4: Different location allowed');
    console.log('   ✅ Test 5: Video duplicate blocked');
    console.log('');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch {
    return false;
  }
}

// Main execution
(async () => {
  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.error('❌ Error: Development server is not running');
    console.log('\nPlease start the server first:');
    console.log('   npm run dev');
    console.log('\nThen run this test again.');
    process.exit(1);
  }

  await testConflictPrevention();
})();
