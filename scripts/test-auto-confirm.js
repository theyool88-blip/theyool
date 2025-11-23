/**
 * Test auto-confirm cron job
 * Tests the automatic booking confirmation system
 */

async function testAutoConfirm() {
  console.log('🤖 Testing Auto-Confirm System\n');
  console.log('='.repeat(60) + '\n');

  const baseUrl = 'http://localhost:3000';
  const cronSecret = process.env.CRON_SECRET || 'test-secret-key';

  try {
    console.log('📞 Calling auto-confirm endpoint...');
    console.log(`   URL: ${baseUrl}/api/cron/auto-confirm-bookings`);
    console.log(`   Authorization: Bearer ${cronSecret.slice(0, 10)}...`);
    console.log('');

    const response = await fetch(`${baseUrl}/api/cron/auto-confirm-bookings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cronSecret}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Request failed:', response.status);
      console.error('   Error:', JSON.stringify(errorData, null, 2));
      return;
    }

    const data = await response.json();

    console.log('✅ Auto-confirm completed!\n');
    console.log('📊 Results:');
    console.log('-'.repeat(60));
    console.log(`   Total Processed: ${data.total_processed}`);
    console.log(`   ✅ Confirmed: ${data.confirmed}`);
    console.log(`   ⏭️  Skipped: ${data.skipped} (conflicts)`);
    console.log(`   ❌ Failed: ${data.failed}`);
    console.log(`   🕐 Timestamp: ${data.timestamp}`);

    if (data.details && data.details.length > 0) {
      console.log('\n📋 Details:');
      console.log('-'.repeat(60));

      data.details.forEach((detail, i) => {
        const icon = detail.status === 'confirmed' ? '✅' :
                     detail.status === 'skipped' ? '⏭️ ' : '❌';

        console.log(`\n${i + 1}. ${icon} ${detail.name || detail.id}`);
        if (detail.date && detail.time) {
          console.log(`   Time: ${detail.date} ${detail.time}`);
        }
        console.log(`   Status: ${detail.status}`);
        if (detail.reason) {
          console.log(`   Reason: ${detail.reason}`);
        }
        if (detail.error) {
          console.log(`   Error: ${detail.error}`);
        }
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('✨ Test Complete!');
    console.log('='.repeat(60) + '\n');

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

  await testAutoConfirm();
})();
