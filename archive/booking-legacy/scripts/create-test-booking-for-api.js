#!/usr/bin/env node

/**
 * Create a test booking for API testing
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

async function createTestBooking() {
  console.log('📝 Creating test booking...\n');

  // Get tomorrow's date for testing
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Ensure it's a weekday
  while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  // Don't set status - it has a default value of 'pending'
  const testBooking = {
    type: 'visit',
    name: '테스트 고객',
    phone: '010-1234-5678',
    email: 'test@example.com',
    category: '재산분할',
    message: '재산분할 관련 상담을 받고 싶습니다.',
    preferred_date: tomorrow.toISOString().split('T')[0],
    preferred_time: '10:00',
    office_location: '천안',
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert([testBooking])
    .select()
    .single();

  if (error) {
    console.error('❌ Failed to create test booking:', error);
    process.exit(1);
  }

  console.log('✅ Test booking created successfully!\n');
  console.log('Booking Details:');
  console.log('  ID:', data.id);
  console.log('  Name:', data.name);
  console.log('  Type:', data.type);
  console.log('  Status:', data.status);
  console.log('  Date:', data.preferred_date);
  console.log('  Time:', data.preferred_time);
  console.log('  Office:', data.office_location);
  console.log('\n💡 Test API URL:');
  console.log(`  http://localhost:3000/api/bookings/${data.id}`);
  console.log('\n💡 You can now run: node scripts/test-booking-detail-api.js');
}

createTestBooking().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
