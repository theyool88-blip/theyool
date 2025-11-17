/**
 * Apply cases table schema updates directly to Supabase
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

async function runMigration() {
  console.log('Starting cases table migration...\n');

  try {
    // Step 1: Add categories column
    console.log('1. Adding categories column...');
    const { error: addColumnError } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_name = 'cases' AND column_name = 'categories'
          ) THEN
            ALTER TABLE cases ADD COLUMN categories TEXT[] DEFAULT '{}';
            RAISE NOTICE 'Added categories column';
          ELSE
            RAISE NOTICE 'Categories column already exists';
          END IF;
        END $$;
      `
    });

    if (addColumnError) {
      console.error('Error adding categories column:', addColumnError);
      // Try direct SQL approach
      const { error: directError } = await supabase
        .from('cases')
        .select('categories')
        .limit(1);

      if (directError && directError.message.includes('column "categories" does not exist')) {
        console.log('Using alternative method to add column...');
        // This won't work through RPC, need to use SQL editor in Supabase dashboard
        console.log('\n⚠️  Please run this SQL in Supabase SQL Editor:');
        console.log(`
ALTER TABLE cases ADD COLUMN IF NOT EXISTS categories TEXT[] DEFAULT '{}';
ALTER TABLE cases ALTER COLUMN slug DROP NOT NULL;
ALTER TABLE cases ALTER COLUMN category DROP NOT NULL;

-- Update RLS policies
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;

CREATE POLICY "Service role can manage all cases"
  ON cases FOR ALL
  USING (true)
  WITH CHECK (true);
        `);
        return;
      }
    }

    console.log('✓ Categories column ready\n');

    // Step 2: Make slug nullable
    console.log('2. Making slug nullable...');
    // Can't alter constraints via RPC, must use SQL editor
    console.log('⚠️  Must be done via SQL editor\n');

    // Step 3: Update existing data
    console.log('3. Checking existing cases...');
    const { data: cases, error: fetchError } = await supabase
      .from('cases')
      .select('id, category, categories');

    if (fetchError) {
      console.error('Error fetching cases:', fetchError);
      return;
    }

    console.log(`Found ${cases.length} cases`);

    // Migrate category to categories if needed
    for (const caseItem of cases) {
      if (caseItem.category && (!caseItem.categories || caseItem.categories.length === 0)) {
        console.log(`Migrating category for case ${caseItem.id}: ${caseItem.category}`);
        const { error: updateError } = await supabase
          .from('cases')
          .update({ categories: [caseItem.category] })
          .eq('id', caseItem.id);

        if (updateError) {
          console.error(`Error updating case ${caseItem.id}:`, updateError);
        } else {
          console.log(`✓ Updated case ${caseItem.id}`);
        }
      }
    }

    console.log('\n✓ Migration completed!\n');
    console.log('⚠️  IMPORTANT: Run this SQL in Supabase SQL Editor to complete the migration:');
    console.log(`
-- Make slug nullable
ALTER TABLE cases ALTER COLUMN slug DROP NOT NULL;

-- Make category nullable
ALTER TABLE cases ALTER COLUMN category DROP NOT NULL;

-- Update RLS policies
DROP POLICY IF EXISTS "Authenticated users can manage cases" ON cases;

CREATE POLICY "Service role can manage all cases"
  ON cases FOR ALL
  USING (true)
  WITH CHECK (true);
    `);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
