const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test data
const testBookings = [
  {
    type: 'visit',
    name: '김영희',
    phone: '010-1234-5678',
    email: 'test1@example.com',
    category: '재산분할',
    message: '재산분할 관련 상담을 받고 싶습니다.',
    preferred_date: '2025-11-25',
    preferred_time: '10:00',
    office_location: '천안',
    status: 'pending'
  },
  {
    type: 'video',
    name: '이철수',
    phone: '010-2345-6789',
    email: 'test2@example.com',
    category: '위자료',
    message: '위자료 청구 건으로 화상 상담 희망합니다.',
    preferred_date: '2025-11-26',
    preferred_time: '14:00',
    status: 'pending'
  },
  {
    type: 'visit',
    name: '박민수',
    phone: '010-3456-7890',
    email: 'test3@example.com',
    category: '양육권',
    message: '양육권 분쟁 중입니다. 긴급 상담 필요합니다.',
    preferred_date: '2025-11-27',
    preferred_time: '09:30',
    office_location: '평택',
    status: 'pending'
  },
  {
    type: 'video',
    name: '정수진',
    phone: '010-4567-8901',
    email: 'test4@example.com',
    category: '재산분할',
    message: '재산분할 비율에 대해 상담받고 싶어요.',
    preferred_date: '2025-11-28',
    preferred_time: '15:30',
    status: 'confirmed'
  },
  {
    type: 'visit',
    name: '최지훈',
    phone: '010-5678-9012',
    email: 'test5@example.com',
    category: '위자료',
    message: '위자료 금액 산정 관련 상담',
    preferred_date: '2025-11-29',
    preferred_time: '11:00',
    office_location: '천안',
    status: 'completed'
  }
];

async function createTestBookings() {
  console.log('🚀 Creating test bookings...\n');

  try {
    // Check current count
    const { count: beforeCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Current bookings count: ${beforeCount || 0}\n`);

    // Insert test bookings
    const { data, error } = await supabase
      .from('bookings')
      .insert(testBookings)
      .select();

    if (error) {
      console.error('❌ Error creating bookings:', error.message);
      process.exit(1);
    }

    console.log(`✅ Successfully created ${data.length} test bookings!\n`);

    // Display created bookings
    data.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.name} (${booking.type === 'visit' ? '방문' : '화상'})`);
      console.log(`   날짜: ${booking.preferred_date} ${booking.preferred_time}`);
      console.log(`   상태: ${booking.status}`);
      console.log(`   ID: ${booking.id}\n`);
    });

    // Verify final count
    const { count: afterCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Total bookings now: ${afterCount || 0}`);
    console.log(`📈 Added: ${(afterCount || 0) - (beforeCount || 0)} bookings\n`);

    // Test API endpoint
    console.log('🧪 Testing API endpoint...\n');

    const response = await fetch('http://localhost:3000/api/admin/bookings');
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ API working! Retrieved ${result.bookings?.length || 0} bookings`);
      console.log(`   - Pending: ${result.bookings?.filter(b => b.status === 'pending').length || 0}`);
      console.log(`   - Confirmed: ${result.bookings?.filter(b => b.status === 'confirmed').length || 0}`);
      console.log(`   - Completed: ${result.bookings?.filter(b => b.status === 'completed').length || 0}\n`);
    } else {
      console.log(`⚠️  API returned status: ${response.status}\n`);
    }

    console.log('🎉 Test complete! Visit http://localhost:3000/admin/bookings to see them.\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createTestBookings();
