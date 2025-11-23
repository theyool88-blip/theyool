/**
 * Add sort_order column to blog_posts table
 * This script provides the SQL to be executed in Supabase SQL Editor
 */

const fs = require('fs');
const path = require('path');

console.log('📋 Supabase Migration: Add sort_order column to blog_posts\n');
console.log('═'.repeat(80));
console.log('\n');

// Read migration SQL
const migrationPath = path.join(__dirname, '../supabase/migrations/20251122_add_blog_sort_order.sql');
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

console.log('✅ After execution, the blog_posts table will have:');
console.log('   - sort_order column (INTEGER, nullable)');
console.log('   - Index for efficient sorting');
console.log('   - Lower numbers appear first (ascending order)\n');

console.log('💡 Next steps:');
console.log('   - Update blog.ts to include sort_order in queries');
console.log('   - Add sort_order field to admin UI for manual ordering\n');
