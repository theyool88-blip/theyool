#!/usr/bin/env node

/**
 * Check consultation tables status before migration
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function checkTables() {
  console.log('🔍 Checking consultation tables...\n');

  // Check consultations_unified
  const { data: unified, error: e1, count: unifiedCount } = await supabase
    .from('consultations_unified')
    .select('*', { count: 'exact', head: true });

  console.log('📊 consultations_unified:');
  console.log('   Status:', e1 ? '❌ ' + e1.message : '✅ EXISTS');
  console.log('   Rows:', e1 ? 'N/A' : (unifiedCount || 0));
  console.log('');

  // Check old consultations
  const { data: oldC, error: e2, count: oldCCount } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true });

  console.log('📊 consultations (old):');
  console.log('   Status:', e2 ? '❌ ' + e2.message : '✅ EXISTS');
  console.log('   Rows:', e2 ? 'N/A' : (oldCCount || 0));
  console.log('');

  // Check bookings
  const { data: bookings, error: e3, count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  console.log('📊 bookings:');
  console.log('   Status:', e3 ? '❌ ' + e3.message : '✅ EXISTS');
  console.log('   Rows:', e3 ? 'N/A' : (bookingsCount || 0));
  console.log('');

  // Check SMS tables
  const { data: templates, error: e4, count: templatesCount } = await supabase
    .from('sms_templates')
    .select('*', { count: 'exact', head: true });

  console.log('📊 sms_templates:');
  console.log('   Status:', e4 ? '❌ ' + e4.message : '✅ EXISTS');
  console.log('   Rows:', e4 ? 'N/A' : (templatesCount || 0));
  console.log('');

  const { data: logs, error: e5, count: logsCount } = await supabase
    .from('sms_logs')
    .select('*', { count: 'exact', head: true });

  console.log('📊 sms_logs:');
  console.log('   Status:', e5 ? '❌ ' + e5.message : '✅ EXISTS');
  console.log('   Rows:', e5 ? 'N/A' : (logsCount || 0));
  console.log('');

  console.log('✅ Check complete');
}

checkTables().catch(console.error);
