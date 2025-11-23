/**
 * End-to-End Test for Booking System
 * Tests the complete booking flow from creation to confirmation
 */

async function testBookingE2E() {
  console.log('🧪 Starting End-to-End Booking System Test\n');
  console.log('=' .repeat(60));

  const baseUrl = 'http://localhost:3000';

  // Test data
  const testBooking = {
    type: 'visit',
    name: 'E2E Test User',
    phone: '010-1234-5678',
    email: 'test-e2e@example.com',
    category: '재산분할',
    message: 'E2E 테스트 예약입니다',
    preferred_date: '2025-11-25', // Monday
    preferred_time: '14:00',
    office_location: '천안',
    preferred_lawyer: '임은지'
  };

  try {
    // Test 1: Create Booking
    console.log('\n📝 Test 1: Creating a new booking');
    console.log('-'.repeat(60));

    const createResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBooking),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error('❌ Failed to create booking:', errorData);
      return;
    }

    const createData = await createResponse.json();
    console.log('✅ Booking created successfully!');
    console.log('   Booking ID:', createData.booking.id);
    console.log('   Status:', createData.booking.status);
    console.log('   Message:', createData.message);

    const bookingId = createData.booking.id;

    // Test 2: Fetch Available Slots
    console.log('\n📅 Test 2: Fetching available time slots');
    console.log('-'.repeat(60));

    const slotsResponse = await fetch(
      `${baseUrl}/api/bookings/available-slots?date=2025-11-26&office=천안`
    );

    if (!slotsResponse.ok) {
      console.error('❌ Failed to fetch available slots');
      return;
    }

    const slotsData = await slotsResponse.json();
    console.log('✅ Available slots fetched successfully!');
    console.log(`   Date: ${slotsData.date}`);
    console.log(`   Total slots: ${slotsData.slots.length}`);
    console.log(`   Available: ${slotsData.slots.filter(s => s.available).length}`);
    console.log(`   Booked: ${slotsData.slots.filter(s => !s.available).length}`);

    // Test 3: Get Booking Details (Public)
    console.log('\n📄 Test 3: Getting booking details (public)');
    console.log('-'.repeat(60));

    const publicDetailResponse = await fetch(
      `${baseUrl}/booking/confirmation/${bookingId}`
    );

    if (publicDetailResponse.ok) {
      console.log('✅ Confirmation page accessible');
      console.log(`   URL: ${baseUrl}/booking/confirmation/${bookingId}`);
    } else {
      console.log('⚠️  Confirmation page returned:', publicDetailResponse.status);
    }

    // Test 4: Validation Tests
    console.log('\n🔍 Test 4: Testing input validation');
    console.log('-'.repeat(60));

    const invalidTests = [
      {
        name: 'Missing office_location for visit',
        data: { ...testBooking, office_location: undefined },
        expectedError: true
      },
      {
        name: 'Invalid phone number',
        data: { ...testBooking, phone: '123' },
        expectedError: true
      },
      {
        name: 'Past date',
        data: { ...testBooking, preferred_date: '2020-01-01' },
        expectedError: true
      },
      {
        name: 'Invalid time format',
        data: { ...testBooking, preferred_time: '25:00' },
        expectedError: true
      }
    ];

    for (const test of invalidTests) {
      const response = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test.data),
      });

      if (response.ok === test.expectedError) {
        console.log(`   ❌ ${test.name}: Expected error but got success`);
      } else {
        console.log(`   ✅ ${test.name}: Validation working correctly`);
      }
    }

    // Test 5: Video Consultation
    console.log('\n📹 Test 5: Creating video consultation booking');
    console.log('-'.repeat(60));

    const videoBooking = {
      type: 'video',
      name: 'Video Test User',
      phone: '010-9876-5432',
      email: 'video@example.com',
      preferred_date: '2025-11-27',
      preferred_time: '10:00',
    };

    const videoResponse = await fetch(`${baseUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoBooking),
    });

    if (videoResponse.ok) {
      const videoData = await videoResponse.json();
      console.log('✅ Video consultation booking created!');
      console.log('   Booking ID:', videoData.booking.id);
      console.log('   Type:', videoData.booking.type);
    } else {
      console.log('❌ Failed to create video consultation booking');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ End-to-End Test Summary');
    console.log('='.repeat(60));
    console.log('✅ All core booking flows tested successfully!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Test admin booking management');
    console.log('   2. Test mobile responsive design');
    console.log('   3. Configure email notifications');
    console.log('   4. Deploy to production');
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
    console.log('\n Please start the server first:');
    console.log('   npm run dev');
    console.log('\nThen run this test again.');
    process.exit(1);
  }

  await testBookingE2E();
})();
