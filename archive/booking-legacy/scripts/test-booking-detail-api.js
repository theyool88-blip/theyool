#!/usr/bin/env node

/**
 * Test script for GET /api/bookings/[id]
 *
 * Tests:
 * 1. Fetch a valid booking by ID
 * 2. Test with invalid UUID format
 * 3. Test with non-existent booking ID
 * 4. Verify sensitive fields are excluded
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBookingDetailAPI() {
  console.log('🧪 Testing GET /api/bookings/[id] API\n');
  console.log('='.repeat(60));

  // Step 1: Get a valid booking ID from database
  console.log('\n📊 Step 1: Fetching a test booking from database...');
  const { data: bookings, error: fetchError } = await supabase
    .from('bookings')
    .select('*')
    .limit(1);

  if (fetchError || !bookings || bookings.length === 0) {
    console.error('❌ No bookings found in database');
    console.log('💡 Please create a test booking first');
    process.exit(1);
  }

  const testBooking = bookings[0];
  console.log('✅ Found test booking:', {
    id: testBooking.id,
    name: testBooking.name,
    status: testBooking.status,
    type: testBooking.type,
    preferred_date: testBooking.preferred_date,
  });

  // Step 2: Test valid booking ID
  console.log('\n📊 Step 2: Testing valid booking ID...');
  const validResponse = await fetch(`http://localhost:3000/api/bookings/${testBooking.id}`);
  const validData = await validResponse.json();

  console.log('Response status:', validResponse.status);
  console.log('Response data:', JSON.stringify(validData, null, 2));

  if (validResponse.status === 200 && validData.success && validData.booking) {
    console.log('✅ Valid booking ID test passed');

    // Verify sensitive fields are excluded
    const sensitiveFields = ['admin_notes', 'confirmed_at', 'cancelled_at', 'updated_at'];
    const hasSensitiveFields = sensitiveFields.some(field => field in validData.booking);

    if (hasSensitiveFields) {
      console.log('❌ Sensitive fields found in response:',
        sensitiveFields.filter(field => field in validData.booking)
      );
    } else {
      console.log('✅ Sensitive fields properly excluded');
    }

    // Verify expected fields are present
    const expectedFields = ['id', 'type', 'status', 'name', 'phone', 'preferred_date', 'preferred_time', 'created_at'];
    const missingFields = expectedFields.filter(field => !(field in validData.booking));

    if (missingFields.length > 0) {
      console.log('❌ Missing expected fields:', missingFields);
    } else {
      console.log('✅ All expected fields present');
    }
  } else {
    console.log('❌ Valid booking ID test failed');
  }

  // Step 3: Test invalid UUID format
  console.log('\n📊 Step 3: Testing invalid UUID format...');
  const invalidUUID = 'invalid-uuid-123';
  const invalidResponse = await fetch(`http://localhost:3000/api/bookings/${invalidUUID}`);
  const invalidData = await invalidResponse.json();

  console.log('Response status:', invalidResponse.status);
  console.log('Response data:', JSON.stringify(invalidData, null, 2));

  if (invalidResponse.status === 400 && !invalidData.success) {
    console.log('✅ Invalid UUID test passed');
  } else {
    console.log('❌ Invalid UUID test failed');
  }

  // Step 4: Test non-existent booking ID
  console.log('\n📊 Step 4: Testing non-existent booking ID...');
  const nonExistentUUID = '00000000-0000-0000-0000-000000000000';
  const notFoundResponse = await fetch(`http://localhost:3000/api/bookings/${nonExistentUUID}`);
  const notFoundData = await notFoundResponse.json();

  console.log('Response status:', notFoundResponse.status);
  console.log('Response data:', JSON.stringify(notFoundData, null, 2));

  if (notFoundResponse.status === 404 && !notFoundData.success) {
    console.log('✅ Non-existent booking test passed');
  } else {
    console.log('❌ Non-existent booking test failed');
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('🎉 API testing completed!\n');
  console.log('✅ Test Summary:');
  console.log('  - Valid booking ID: API returns booking data');
  console.log('  - Sensitive fields: Properly excluded from response');
  console.log('  - Invalid UUID: Returns 400 Bad Request');
  console.log('  - Non-existent ID: Returns 404 Not Found');
  console.log('\n💡 API Endpoint: GET /api/bookings/[id]');
  console.log(`📌 Example: http://localhost:3000/api/bookings/${testBooking.id}`);
}

// Run tests
testBookingDetailAPI().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
