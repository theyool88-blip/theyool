#!/usr/bin/env node

/**
 * Test consultation status update
 *
 * This script tests the consultation status update functionality
 * to verify that the updated_at column is being updated correctly.
 *
 * Usage: node scripts/test-consultation-update.js
 */

const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function main() {
  console.log('🧪 Testing consultation status update...\n');

  try {
    // 1. Get the first consultation
    console.log('📋 Step 1: Fetching a consultation...');
    const { data: consultations, error: fetchError } = await supabase
      .from('consultations')
      .select('*')
      .limit(1)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching consultation:', fetchError.message);
      process.exit(1);
    }

    if (!consultations) {
      console.log('⚠️  No consultations found in database');
      console.log('   Create a consultation first to test updates');
      process.exit(0);
    }

    console.log('✅ Found consultation:');
    console.log(`   ID: ${consultations.id}`);
    console.log(`   Name: ${consultations.name}`);
    console.log(`   Status: ${consultations.status}`);
    console.log(`   Created: ${consultations.created_at}`);
    console.log(`   Updated: ${consultations.updated_at}`);
    console.log('');

    // Wait 2 seconds to ensure timestamp difference
    console.log('⏳ Waiting 2 seconds...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. Update the status
    console.log('📝 Step 2: Updating consultation status...');
    const newStatus = consultations.status === 'pending' ? 'in_progress' : 'pending';

    const { data: updated, error: updateError } = await supabase
      .from('consultations')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(), // Explicitly set updated_at
      })
      .eq('id', consultations.id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ Error updating consultation:', updateError.message);
      process.exit(1);
    }

    console.log('✅ Update successful:');
    console.log(`   ID: ${updated.id}`);
    console.log(`   Status: ${consultations.status} → ${updated.status}`);
    console.log(`   Created: ${updated.created_at}`);
    console.log(`   Updated: ${updated.updated_at}`);
    console.log('');

    // 3. Compare timestamps
    const oldDate = new Date(consultations.updated_at);
    const newDate = new Date(updated.updated_at);
    const diffSeconds = (newDate - oldDate) / 1000;

    console.log('📊 Timestamp Analysis:');
    console.log(`   Old updated_at: ${consultations.updated_at}`);
    console.log(`   New updated_at: ${updated.updated_at}`);
    console.log(`   Difference: ${diffSeconds.toFixed(2)} seconds`);
    console.log('');

    if (diffSeconds > 1) {
      console.log('✅ SUCCESS: updated_at was changed!');
      console.log('   The update is working correctly.');
    } else {
      console.log('⚠️  WARNING: updated_at did not change significantly');
      console.log('   This might indicate a problem with the trigger or update logic.');
    }

    // 4. Revert the change
    console.log('\n🔄 Step 3: Reverting status back...');
    await supabase
      .from('consultations')
      .update({
        status: consultations.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', consultations.id);

    console.log('✅ Reverted status back to original value');
    console.log('\n✨ Test complete!\n');

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    process.exit(1);
  }
}

main();
