/**
 * Test case creation to verify the fix
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCaseCreation() {
  console.log('Testing case creation...\n');

  try {
    // Step 1: Check schema
    console.log('1. Checking table schema...');
    const { data: schemaCheck, error: schemaError } = await supabase
      .from('cases')
      .select('*')
      .limit(1);

    if (schemaError) {
      console.error('Schema check failed:', schemaError);
      return;
    }
    console.log('✓ Schema accessible\n');

    // Step 2: Test case creation with all fields
    console.log('2. Testing case creation with full data...');
    const testCase1 = {
      notion_id: `test-${Date.now()}`,
      title: 'Test Case 1',
      slug: `test-case-${Date.now()}`,
      badge: 'Test',
      categories: ['이혼', '재산분할'],
      // NO category field - database only has categories (plural)
      background: '# Test Background\n\nThis is a test case.',
      strategy: 'Test strategy',
      result: 'Test result',
      icon: '🧪',
      published: false,
      views: 0,
      sort_order: 999,
    };

    const { data: created1, error: error1 } = await supabase
      .from('cases')
      .insert(testCase1)
      .select()
      .single();

    if (error1) {
      console.error('❌ Full data test failed:', error1);
      console.error('Details:', JSON.stringify(error1, null, 2));
    } else {
      console.log('✓ Full data test passed');
      console.log('  Created case ID:', created1.id);
      console.log('  Categories:', created1.categories);

      // Clean up
      await supabase.from('cases').delete().eq('id', created1.id);
    }

    // Step 3: Test case creation with minimal fields
    console.log('\n3. Testing case creation with minimal data...');
    const testCase2 = {
      notion_id: `test-min-${Date.now()}`,
      title: 'Minimal Test Case',
      slug: `minimal-test-${Date.now()}`,
      categories: ['이혼'],
      // NO category field
      published: false,
    };

    const { data: created2, error: error2 } = await supabase
      .from('cases')
      .insert(testCase2)
      .select()
      .single();

    if (error2) {
      console.error('❌ Minimal data test failed:', error2);
      console.error('Details:', JSON.stringify(error2, null, 2));
    } else {
      console.log('✓ Minimal data test passed');
      console.log('  Created case ID:', created2.id);

      // Clean up
      await supabase.from('cases').delete().eq('id', created2.id);
    }

    // Step 4: Test case creation without slug (should work - slug is nullable)
    console.log('\n4. Testing case creation without slug...');
    const testCase3 = {
      notion_id: `test-noslug-${Date.now()}`,
      title: 'No Slug Test Case',
      categories: ['위자료'],
      // NO category field
      // NO slug field
      published: false,
    };

    const { data: created3, error: error3 } = await supabase
      .from('cases')
      .insert(testCase3)
      .select()
      .single();

    if (error3) {
      console.error('❌ No slug test failed:', error3);
      console.error('Details:', JSON.stringify(error3, null, 2));
    } else {
      console.log('✓ No slug test passed');
      console.log('  Created case ID:', created3.id);
      console.log('  Slug:', created3.slug || '(null)');

      // Clean up
      await supabase.from('cases').delete().eq('id', created3.id);
    }

    console.log('\n=== Test Summary ===');
    console.log('If all tests passed, case creation is working correctly!');
    console.log('You can now create cases in the admin UI.');

  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
}

testCaseCreation();
