/**
 * Run preferred_lawyer migration on Supabase (Direct SQL execution guide)
 *
 * This script provides the SQL to be executed manually in Supabase SQL Editor
 */

const fs = require('fs');
const path = require('path');

console.log('📋 Supabase Migration: Add preferred_lawyer column\n');
console.log('═'.repeat(80));
console.log('\n');

// Read migration SQL
const migrationPath = path.join(__dirname, '../supabase/migrations/20251120_add_preferred_lawyer.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

console.log('📄 Execute the following SQL in Supabase SQL Editor:\n');
console.log('─'.repeat(80));
console.log(migrationSQL);
console.log('─'.repeat(80));
console.log('\n');

console.log('📍 How to execute:');
console.log('1. Go to: https://supabase.com/dashboard/project/kqqyipnlkmmprfgygauk/sql/new');
console.log('2. Copy the SQL above');
console.log('3. Paste into SQL Editor');
console.log('4. Click "Run" button');
console.log('5. Verify: "Success. No rows returned" message\n');

console.log('✅ After execution, the bookings table will have:');
console.log('   - preferred_lawyer column (TEXT, nullable)');
console.log('   - Constraint: values must be "육심원" or "임은지"');
console.log('   - Index for efficient filtering by lawyer\n');
