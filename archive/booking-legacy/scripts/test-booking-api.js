#!/usr/bin/env node

/**
 * Booking System API Test Script
 *
 * This script tests all the booking API endpoints to ensure they work correctly.
 *
 * Usage:
 *   node scripts/test-booking-api.js
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60) + '\n');
}

async function testEndpoint(name, method, url, options = {}) {
  try {
    log(`Testing: ${name}`, 'blue');
    log(`${method} ${url}`, 'yellow');

    const startTime = Date.now();
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const duration = Date.now() - startTime;
    const data = await response.json();

    if (response.ok) {
      log(`✓ SUCCESS (${response.status}) - ${duration}ms`, 'green');
      console.log('Response:', JSON.stringify(data, null, 2));
      return { success: true, data, response };
    } else {
      log(`✗ FAILED (${response.status}) - ${duration}ms`, 'red');
      console.log('Error:', JSON.stringify(data, null, 2));
      return { success: false, data, response };
    }
  } catch (error) {
    log(`✗ ERROR: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('Booking System API Test Suite', 'cyan');
  log(`Base URL: ${BASE_URL}`, 'yellow');
  console.log('\n');

  let createdBookingId = null;

  // Test 1: Get available slots
  logSection('Test 1: Get Available Slots');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Make sure it's a weekday
  while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }
  const testDate = tomorrow.toISOString().split('T')[0];

  const slotsResult = await testEndpoint(
    'Get available slots',
    'GET',
    `${BASE_URL}/api/bookings/available-slots?date=${testDate}&office=천안`
  );

  if (slotsResult.success) {
    const availableSlot = slotsResult.data.slots.find(s => s.available);
    if (!availableSlot) {
      log('⚠ No available slots found, using default time 14:00', 'yellow');
    }

    // Test 2: Create a visit booking
    logSection('Test 2: Create Visit Booking');
    const visitBookingResult = await testEndpoint(
      'Create visit booking',
      'POST',
      `${BASE_URL}/api/bookings`,
      {
        body: {
          type: 'visit',
          name: '테스트 고객',
          phone: '010-1234-5678',
          email: 'test@example.com',
          category: '재산분할',
          message: 'API 테스트 예약입니다.',
          preferred_date: testDate,
          preferred_time: availableSlot?.time || '14:00',
          office_location: '천안',
        },
      }
    );

    if (visitBookingResult.success) {
      createdBookingId = visitBookingResult.data.booking.id;
      log(`Created booking ID: ${createdBookingId}`, 'green');
    }

    // Test 3: Create a video booking
    logSection('Test 3: Create Video Booking');
    await testEndpoint(
      'Create video booking',
      'POST',
      `${BASE_URL}/api/bookings`,
      {
        body: {
          type: 'video',
          name: '테스트 고객2',
          phone: '010-9876-5432',
          email: 'test2@example.com',
          category: '위자료',
          message: '화상 상담 테스트입니다.',
          preferred_date: testDate,
          preferred_time: '15:00',
        },
      }
    );

    // Test 4: Get available slots again (should show some slots as unavailable)
    logSection('Test 4: Verify Slots Are Now Taken');
    await testEndpoint(
      'Get available slots (after bookings)',
      'GET',
      `${BASE_URL}/api/bookings/available-slots?date=${testDate}&office=천안`
    );

    // Test 5: Validation - Missing required fields
    logSection('Test 5: Validation Tests');

    await testEndpoint(
      'Create booking without name (should fail)',
      'POST',
      `${BASE_URL}/api/bookings`,
      {
        body: {
          type: 'visit',
          phone: '010-1234-5678',
          preferred_date: testDate,
          preferred_time: '16:00',
          office_location: '천안',
        },
      }
    );

    await testEndpoint(
      'Create visit booking without office_location (should fail)',
      'POST',
      `${BASE_URL}/api/bookings`,
      {
        body: {
          type: 'visit',
          name: '테스트',
          phone: '010-1234-5678',
          preferred_date: testDate,
          preferred_time: '16:00',
        },
      }
    );

    await testEndpoint(
      'Create booking with invalid phone (should fail)',
      'POST',
      `${BASE_URL}/api/bookings`,
      {
        body: {
          type: 'visit',
          name: '테스트',
          phone: '123', // Invalid format
          preferred_date: testDate,
          preferred_time: '16:00',
          office_location: '천안',
        },
      }
    );

    // Test 6: Weekend booking (should fail)
    logSection('Test 6: Weekend Booking (should fail)');
    const weekend = new Date();
    weekend.setDate(weekend.getDate() + (6 - weekend.getDay() + 1)); // Next Sunday
    const weekendDate = weekend.toISOString().split('T')[0];

    await testEndpoint(
      'Get slots for weekend (should have no available slots)',
      'GET',
      `${BASE_URL}/api/bookings/available-slots?date=${weekendDate}&office=천안`
    );

    // Admin API tests (these will fail without authentication, which is expected)
    logSection('Test 7: Admin API (requires authentication)');

    log('⚠ The following tests require admin authentication and are expected to fail with 401', 'yellow');

    await testEndpoint(
      'Get all bookings (admin)',
      'GET',
      `${BASE_URL}/api/admin/bookings`
    );

    if (createdBookingId) {
      await testEndpoint(
        'Get booking by ID (admin)',
        'GET',
        `${BASE_URL}/api/admin/bookings/${createdBookingId}`
      );

      await testEndpoint(
        'Update booking status (admin)',
        'PATCH',
        `${BASE_URL}/api/admin/bookings/${createdBookingId}`,
        {
          body: {
            status: 'confirmed',
            admin_notes: 'API 테스트로 확정됨',
          },
        }
      );
    }

    // Summary
    logSection('Test Summary');
    log('✓ All public API tests completed', 'green');
    log('⚠ Admin API tests require authentication (expected 401 errors)', 'yellow');
    log('\nTo test admin APIs:', 'cyan');
    log('1. Login to admin panel: http://localhost:3000/admin/login', 'blue');
    log('2. Get the admin-session cookie', 'blue');
    log('3. Add it to the test script headers', 'blue');

    if (createdBookingId) {
      log(`\nCreated booking ID: ${createdBookingId}`, 'yellow');
      log('You can view it in the admin panel or database', 'yellow');
    }
  }
}

// Run tests
runTests().catch(error => {
  log(`Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
