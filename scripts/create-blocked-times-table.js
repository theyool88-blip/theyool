const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createTable() {
  console.log('📋 Creating blocked_times table...\n');

  const sqlPath = path.join(__dirname, '../supabase/migrations/create_blocked_times_table.sql');
  const sql = fs.readFileSync(sqlPath, 'utf-8');

  console.log('=' .repeat(80));
  console.log('📄 SQL Migration Content:');
  console.log('='.repeat(80));
  console.log(sql);
  console.log('='.repeat(80) + '\n');

  console.log('⚠️  Please execute this SQL in your Supabase Dashboard:\n');
  console.log('1. Go to https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/editor');
  console.log('2. Open SQL Editor');
  console.log('3. Copy and paste the SQL above');
  console.log('4. Click "Run"\n');

  console.log('Alternative: Use the Supabase CLI:');
  console.log('npx supabase db execute --file supabase/migrations/create_blocked_times_table.sql\n');
}

createTable().catch(console.error);
