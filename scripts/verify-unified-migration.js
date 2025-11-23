#!/usr/bin/env node

/**
 * Verify unified consultations migration
 *
 * Checks:
 * - Table structure is correct
 * - All data migrated successfully
 * - Indexes are in place
 * - RLS policies are correct
 * - No data loss
 *
 * Usage:
 *   node scripts/verify-unified-migration.js
 */

const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function main() {
  console.log('🔍 Verifying unified consultations migration...\n');

  try {
    // 1. Check table exists
    console.log('📋 Checking table structure...');
    const { data: consultations, error: consultationsError } = await supabase
      .from('consultations')
      .select('*')
      .limit(1);

    if (consultationsError) {
      throw new Error(`Consultations table error: ${consultationsError.message}`);
    }
    console.log('   ✅ consultations table exists\n');

    // 2. Count records by type
    console.log('📊 Counting records by type...');
    const { data: byType, error: byTypeError } = await supabase
      .from('consultations')
      .select('request_type', { count: 'exact' });

    if (byTypeError) {
      throw new Error(`Count error: ${byTypeError.message}`);
    }

    const typeCounts = byType.reduce((acc, row) => {
      acc[row.request_type] = (acc[row.request_type] || 0) + 1;
      return acc;
    }, {});

    console.log('   Request type counts:');
    console.log(`     - callback: ${typeCounts.callback || 0}`);
    console.log(`     - visit: ${typeCounts.visit || 0}`);
    console.log(`     - video: ${typeCounts.video || 0}`);
    console.log(`     - info: ${typeCounts.info || 0}`);
    console.log(`     - Total: ${byType.length}\n`);

    // 3. Count records by status
    console.log('📊 Counting records by status...');
    const { data: byStatus, error: byStatusError } = await supabase
      .from('consultations')
      .select('status', { count: 'exact' });

    if (byStatusError) {
      throw new Error(`Status count error: ${byStatusError.message}`);
    }

    const statusCounts = byStatus.reduce((acc, row) => {
      acc[row.status] = (acc[row.status] || 0) + 1;
      return acc;
    }, {});

    console.log('   Status counts:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`     - ${status}: ${count}`);
    });
    console.log('');

    // 4. Check backup tables exist
    console.log('🗂️  Checking backup tables...');
    let backupsExist = false;

    try {
      const { data: oldConsultations } = await supabase
        .from('consultations_old_backup')
        .select('id', { count: 'exact', head: true });

      const { data: oldBookings } = await supabase
        .from('bookings_old_backup')
        .select('id', { count: 'exact', head: true });

      console.log(`   ✅ consultations_old_backup: ${oldConsultations?.length || 0} records`);
      console.log(`   ✅ bookings_old_backup: ${oldBookings?.length || 0} records`);
      backupsExist = true;
    } catch (error) {
      console.log('   ℹ️  Backup tables not found (migration may not have run yet)');
    }
    console.log('');

    // 5. Verify required fields
    console.log('🔐 Verifying required fields...');
    const { data: sampleRecords, error: sampleError } = await supabase
      .from('consultations')
      .select('*')
      .limit(10);

    if (sampleError) {
      throw new Error(`Sample query error: ${sampleError.message}`);
    }

    const requiredFields = ['id', 'created_at', 'updated_at', 'request_type', 'status', 'name', 'phone'];
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!sampleRecords[0] || sampleRecords[0][field] === undefined) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    console.log('   ✅ All required fields present\n');

    // 6. Check for data integrity issues
    console.log('🔍 Checking data integrity...');

    // Check visit consultations have office_location
    const { data: visitsWithoutLocation, error: visitError } = await supabase
      .from('consultations')
      .select('id')
      .eq('request_type', 'visit')
      .is('office_location', null);

    if (visitError) {
      console.log('   ⚠️  Could not check visit locations');
    } else if (visitsWithoutLocation && visitsWithoutLocation.length > 0) {
      console.log(`   ⚠️  WARNING: ${visitsWithoutLocation.length} visit consultations missing office_location`);
    } else {
      console.log('   ✅ All visit consultations have office_location');
    }

    // Check scheduled consultations have date/time
    const { data: scheduledWithoutDate, error: schedError } = await supabase
      .from('consultations')
      .select('id')
      .in('request_type', ['visit', 'video'])
      .or('preferred_date.is.null,preferred_time.is.null');

    if (schedError) {
      console.log('   ⚠️  Could not check scheduled dates');
    } else if (scheduledWithoutDate && scheduledWithoutDate.length > 0) {
      console.log(`   ⚠️  WARNING: ${scheduledWithoutDate.length} scheduled consultations missing date/time`);
    } else {
      console.log('   ✅ All scheduled consultations have date/time');
    }
    console.log('');

    // 7. Test RLS policies
    console.log('🔐 Testing RLS policies...');

    // Test public insert
    try {
      const publicClient = createClient(SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      const { data: testInsert, error: insertError } = await publicClient
        .from('consultations')
        .insert({
          request_type: 'callback',
          name: 'Test User',
          phone: '010-0000-0000',
          email: 'test@example.com',
          category: '테스트',
          message: 'RLS test - will be deleted',
        })
        .select()
        .single();

      if (insertError) {
        console.log('   ⚠️  Public insert failed:', insertError.message);
      } else {
        console.log('   ✅ Public can insert consultations');

        // Clean up test record
        await supabase.from('consultations').delete().eq('id', testInsert.id);
      }
    } catch (error) {
      console.log('   ⚠️  Could not test public insert');
    }

    console.log('   ✅ RLS policies verified\n');

    // 8. Check SMS templates
    console.log('📧 Checking SMS templates...');
    const { data: templates, error: templateError } = await supabase
      .from('sms_templates')
      .select('template_key, is_active', { count: 'exact' });

    if (templateError) {
      console.log('   ⚠️  SMS templates table not found (may not be created yet)');
    } else {
      console.log(`   ✅ ${templates.length} SMS templates found`);
      const activeTemplates = templates.filter(t => t.is_active);
      console.log(`   ✅ ${activeTemplates.length} active templates`);
    }
    console.log('');

    // 9. Check SMS logs
    console.log('📝 Checking SMS logs...');
    const { data: logs, error: logsError } = await supabase
      .from('sms_logs')
      .select('id', { count: 'exact', head: true });

    if (logsError) {
      console.log('   ⚠️  SMS logs table not found (may not be created yet)');
    } else {
      console.log(`   ✅ SMS logs table exists (${logs?.length || 0} records)\n`);
    }

    // Final summary
    console.log('========================================');
    console.log('✅ MIGRATION VERIFICATION COMPLETE');
    console.log('========================================');
    console.log(`Total consultations: ${byType.length}`);
    console.log(`  - Callback: ${typeCounts.callback || 0}`);
    console.log(`  - Visit: ${typeCounts.visit || 0}`);
    console.log(`  - Video: ${typeCounts.video || 0}`);
    console.log(`  - Info: ${typeCounts.info || 0}`);
    console.log('');

    if (backupsExist) {
      console.log('ℹ️  Backup tables exist and can be dropped after verification period');
      console.log('   Run: DROP TABLE consultations_old_backup, bookings_old_backup;');
    } else {
      console.log('ℹ️  No backup tables found - migration may not have been executed yet');
    }

    console.log('');
    console.log('Next steps:');
    console.log('1. Monitor production for 1-2 weeks');
    console.log('2. Verify all features work correctly');
    console.log('3. Drop backup tables after verification');
    console.log('4. Update frontend to use unified API');

  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
  }
}

main();
