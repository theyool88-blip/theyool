const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(80));
console.log('📋 BOOKINGS TABLE MIGRATION SQL');
console.log('='.repeat(80) + '\n');

console.log('📍 Location: supabase/migrations/create_bookings_table.sql\n');
console.log('🌐 Supabase SQL Editor:');
console.log('   https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new\n');

console.log('📝 Instructions:');
console.log('   1. Copy the SQL below (between the --- lines)');
console.log('   2. Go to the Supabase SQL Editor URL above');
console.log('   3. Paste the SQL into the editor');
console.log('   4. Click "Run" to create the bookings table\n');

console.log('='.repeat(80));
console.log('START OF SQL - COPY FROM HERE');
console.log('='.repeat(80) + '\n');

// Read and display the SQL file
const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', 'create_bookings_table.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

console.log(sql);

console.log('\n' + '='.repeat(80));
console.log('END OF SQL - COPY TO HERE');
console.log('='.repeat(80) + '\n');

console.log('✅ After running the SQL, verify with:');
console.log('   node scripts/verify-bookings-table.js\n');
