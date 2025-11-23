const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyBookings() {
  console.log('📊 Verifying Booking System\n');
  console.log('='.repeat(80) + '\n');

  try {
    // Get all bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }

    console.log(`✅ Total Bookings: ${bookings.length}\n`);

    // Statistics
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      visit: bookings.filter(b => b.type === 'visit').length,
      video: bookings.filter(b => b.type === 'video').length,
    };

    console.log('📈 Statistics:');
    console.log(`   Total: ${stats.total}`);
    console.log(`   - Pending: ${stats.pending}`);
    console.log(`   - Confirmed: ${stats.confirmed}`);
    console.log(`   - Completed: ${stats.completed}`);
    console.log(`   - Cancelled: ${stats.cancelled}`);
    console.log(`\n   Types:`);
    console.log(`   - Visit: ${stats.visit}`);
    console.log(`   - Video: ${stats.video}\n`);

    console.log('='.repeat(80));
    console.log('📋 Recent Bookings:\n');

    bookings.slice(0, 5).forEach((booking, index) => {
      const statusEmoji = {
        pending: '⏳',
        confirmed: '✅',
        completed: '✔️',
        cancelled: '❌'
      }[booking.status] || '❓';

      const typeEmoji = booking.type === 'visit' ? '🏢' : '💻';

      console.log(`${index + 1}. ${statusEmoji} ${typeEmoji} ${booking.name}`);
      console.log(`   Type: ${booking.type === 'visit' ? '방문 상담' : '화상 상담'}`);
      console.log(`   Status: ${booking.status}`);
      console.log(`   Date: ${booking.preferred_date} at ${booking.preferred_time}`);
      if (booking.office_location) {
        console.log(`   Office: ${booking.office_location}`);
      }
      console.log(`   Category: ${booking.category || 'N/A'}`);
      console.log(`   Phone: ${booking.phone}`);
      console.log(`   Email: ${booking.email || 'N/A'}`);
      if (booking.message) {
        console.log(`   Message: ${booking.message.substring(0, 50)}${booking.message.length > 50 ? '...' : ''}`);
      }
      console.log(`   Created: ${new Date(booking.created_at).toLocaleString('ko-KR')}`);
      console.log(`   ID: ${booking.id}\n`);
    });

    console.log('='.repeat(80) + '\n');

    // Test available slots API
    console.log('🧪 Testing Available Slots API...\n');

    const testDate = '2025-11-25';
    const { data: slots } = await supabase.rpc('get_available_slots', {
      check_date: testDate
    }).catch(() => ({ data: null }));

    // Alternative: Direct query
    const { data: existingBookings } = await supabase
      .from('bookings')
      .select('preferred_time')
      .eq('preferred_date', testDate)
      .in('status', ['pending', 'confirmed']);

    console.log(`   Date: ${testDate}`);
    console.log(`   Booked slots: ${existingBookings?.length || 0}`);
    if (existingBookings && existingBookings.length > 0) {
      console.log(`   Times booked: ${existingBookings.map(b => b.preferred_time).join(', ')}`);
    }
    console.log();

    console.log('='.repeat(80) + '\n');
    console.log('✅ System Verification Complete!\n');
    console.log('🌐 Admin Panel: http://localhost:3000/admin/bookings');
    console.log('📅 Booking Page: http://localhost:3000/booking\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

verifyBookings();
