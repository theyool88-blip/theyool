/**
 * Analyze booking system with 50 test bookings
 * Identifies bottlenecks, conflicts, and optimization opportunities
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function analyzeBookings() {
  console.log('📊 Booking System Analysis\n');
  console.log('='.repeat(60) + '\n');

  try {
    // 1. Get all bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .order('preferred_date', { ascending: true });

    if (error) throw error;

    console.log(`✅ Loaded ${bookings.length} bookings\n`);

    // 2. Analyze time slot conflicts
    console.log('🔍 Analyzing Time Slot Conflicts');
    console.log('-'.repeat(60));

    const slotMap = new Map();
    const conflicts = [];

    bookings.forEach(booking => {
      if (booking.status === 'cancelled') return;

      const key = `${booking.preferred_date}|${booking.preferred_time}|${booking.office_location || 'video'}`;

      if (!slotMap.has(key)) {
        slotMap.set(key, []);
      }
      slotMap.get(key).push(booking);

      if (slotMap.get(key).length > 1) {
        conflicts.push({ key, bookings: slotMap.get(key) });
      }
    });

    if (conflicts.length > 0) {
      console.log(`⚠️  Found ${conflicts.length} time slot conflicts:\n`);
      conflicts.slice(0, 5).forEach(({ key, bookings }) => {
        const [date, time, location] = key.split('|');
        console.log(`   ${date} ${time} (${location}): ${bookings.length} bookings`);
        bookings.forEach(b => console.log(`      - ${b.name} (${b.status})`));
      });
      if (conflicts.length > 5) {
        console.log(`   ... and ${conflicts.length - 5} more conflicts`);
      }
    } else {
      console.log('✅ No time slot conflicts detected');
    }

    // 3. Analyze peak booking times
    console.log('\n📈 Peak Booking Times');
    console.log('-'.repeat(60));

    const timeDistribution = {};
    bookings.forEach(b => {
      timeDistribution[b.preferred_time] = (timeDistribution[b.preferred_time] || 0) + 1;
    });

    const sortedTimes = Object.entries(timeDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    console.log('Top 5 popular time slots:');
    sortedTimes.forEach(([time, count], i) => {
      const bar = '█'.repeat(Math.ceil(count / 2));
      console.log(`   ${i + 1}. ${time}: ${count} bookings ${bar}`);
    });

    // 4. Analyze date distribution
    console.log('\n📅 Date Distribution');
    console.log('-'.repeat(60));

    const dateDistribution = {};
    bookings.forEach(b => {
      dateDistribution[b.preferred_date] = (dateDistribution[b.preferred_date] || 0) + 1;
    });

    const busyDays = Object.entries(dateDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    console.log('Busiest days:');
    busyDays.forEach(([date, count]) => {
      const dayOfWeek = new Date(date).toLocaleDateString('ko-KR', { weekday: 'long' });
      console.log(`   ${date} (${dayOfWeek}): ${count} bookings`);
    });

    // 5. Office capacity analysis
    console.log('\n🏢 Office Capacity Analysis');
    console.log('-'.repeat(60));

    const officeStats = { '천안': 0, '평택': 0, 'video': 0 };
    bookings.forEach(b => {
      if (b.status === 'cancelled') return;
      if (b.type === 'video') {
        officeStats['video']++;
      } else if (b.office_location) {
        officeStats[b.office_location]++;
      }
    });

    console.log('Active bookings by location:');
    console.log(`   천안: ${officeStats['천안']} bookings`);
    console.log(`   평택: ${officeStats['평택']} bookings`);
    console.log(`   화상: ${officeStats['video']} bookings`);

    const totalOffice = officeStats['천안'] + officeStats['평택'];
    const videoRatio = (officeStats['video'] / bookings.filter(b => b.status !== 'cancelled').length * 100).toFixed(1);
    console.log(`\n   방문 vs 화상 비율: ${100 - videoRatio}% / ${videoRatio}%`);

    // 6. Status analysis
    console.log('\n📊 Status Analysis');
    console.log('-'.repeat(60));

    const statusStats = { pending: 0, confirmed: 0, cancelled: 0, completed: 0 };
    bookings.forEach(b => statusStats[b.status]++);

    Object.entries(statusStats).forEach(([status, count]) => {
      const percentage = (count / bookings.length * 100).toFixed(1);
      const statusLabel = {
        pending: '대기',
        confirmed: '확정',
        cancelled: '취소',
        completed: '완료'
      }[status];
      console.log(`   ${statusLabel}: ${count} (${percentage}%)`);
    });

    // 7. Category analysis
    console.log('\n📑 Category Analysis');
    console.log('-'.repeat(60));

    const categoryStats = {};
    bookings.forEach(b => {
      if (b.category) {
        categoryStats[b.category] = (categoryStats[b.category] || 0) + 1;
      }
    });

    const sortedCategories = Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1]);

    sortedCategories.forEach(([category, count]) => {
      const percentage = (count / bookings.length * 100).toFixed(1);
      console.log(`   ${category}: ${count} (${percentage}%)`);
    });

    // 8. Response time simulation
    console.log('\n⏱️  System Performance Metrics');
    console.log('-'.repeat(60));

    // Test available slots query
    const testDate = '2025-11-26';
    const startTime = Date.now();

    const { data: slots } = await supabase
      .from('bookings')
      .select('preferred_time, office_location, status')
      .eq('preferred_date', testDate)
      .in('status', ['pending', 'confirmed']);

    const queryTime = Date.now() - startTime;
    console.log(`   Available slots query: ${queryTime}ms`);
    console.log(`   Bookings for ${testDate}: ${slots?.length || 0}`);

    // 9. Identify potential issues
    console.log('\n🚨 Potential Issues & Recommendations');
    console.log('-'.repeat(60));

    const issues = [];

    // Check for conflicts
    if (conflicts.length > 0) {
      issues.push({
        type: 'critical',
        title: 'Time Slot Conflicts',
        description: `${conflicts.length} conflicting bookings detected`,
        recommendation: 'Implement slot locking mechanism or overbooking prevention'
      });
    }

    // Check peak time congestion
    const maxBookingsPerSlot = Math.max(...Object.values(timeDistribution));
    if (maxBookingsPerSlot > 5) {
      issues.push({
        type: 'warning',
        title: 'Peak Time Congestion',
        description: `Up to ${maxBookingsPerSlot} bookings in a single time slot`,
        recommendation: 'Consider spreading bookings or adding capacity'
      });
    }

    // Check pending bookings
    const pendingRatio = (statusStats.pending / bookings.length * 100);
    if (pendingRatio > 60) {
      issues.push({
        type: 'warning',
        title: 'High Pending Ratio',
        description: `${pendingRatio.toFixed(1)}% bookings still pending`,
        recommendation: 'Improve confirmation process or add auto-confirmation'
      });
    }

    // Check cancellation rate
    const cancellationRate = (statusStats.cancelled / bookings.length * 100);
    if (cancellationRate > 10) {
      issues.push({
        type: 'info',
        title: 'Elevated Cancellation Rate',
        description: `${cancellationRate.toFixed(1)}% cancellation rate`,
        recommendation: 'Analyze cancellation reasons and improve booking experience'
      });
    }

    if (issues.length === 0) {
      console.log('✅ No major issues detected!');
    } else {
      issues.forEach((issue, i) => {
        const icon = { critical: '🔴', warning: '🟡', info: '🔵' }[issue.type];
        console.log(`\n${i + 1}. ${icon} ${issue.title}`);
        console.log(`   ${issue.description}`);
        console.log(`   💡 ${issue.recommendation}`);
      });
    }

    // 10. Summary
    console.log('\n' + '='.repeat(60));
    console.log('📋 ANALYSIS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Bookings: ${bookings.length}`);
    console.log(`Active Bookings: ${bookings.filter(b => b.status !== 'cancelled').length}`);
    console.log(`Time Slot Conflicts: ${conflicts.length}`);
    console.log(`Issues Found: ${issues.length}`);
    console.log(`Query Performance: ${queryTime}ms (${queryTime < 100 ? '✅ Excellent' : queryTime < 200 ? '⚠️  Good' : '🔴 Needs optimization'})`);
    console.log('');

  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
}

analyzeBookings();
