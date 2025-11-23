const fs = require('fs');
const path = require('path');

async function executeSQLDirectly() {
  console.log('🚀 Creating bookings table via REST API...\n');

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kqqyipnlkmmprfgygauk.supabase.co';
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set');
    process.exit(1);
  }

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'create_bookings_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📄 Migration SQL loaded');
    console.log('📊 Executing SQL via REST API...\n');

    // Use Supabase REST API with service role key to execute SQL
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ REST API Error:', response.status, response.statusText);
      console.log('   Response:', errorText);
      throw new Error('REST API execution failed');
    }

    const result = await response.json();
    console.log('✅ SQL executed successfully!');
    console.log('   Result:', result);

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.log('\n📋 The Supabase JavaScript client cannot execute DDL statements.');
    console.log('   You must run the migration manually:\n');
    console.log('   1. Open: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
    console.log('   2. Copy the entire contents of: supabase/migrations/create_bookings_table.sql');
    console.log('   3. Paste into the SQL Editor');
    console.log('   4. Click "Run" to execute\n');
    console.log('   This is a one-time setup. After the table is created, the booking system will work.\n');
  }
}

executeSQLDirectly();
