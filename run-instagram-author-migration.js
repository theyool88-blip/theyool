// Run Instagram author migration
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  try {
    console.log('🚀 Running Instagram author migration...');

    const migrationFile = path.join(__dirname, 'supabase/migrations/20251116_add_instagram_author.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');

    // Split by semicolons and filter out comments and empty statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s !== 'COMMENT ON COLUMN instagram_posts.author IS \'Display name of the post author (e.g., "임은지 변호사", "더율법무법인")\'' && s !== 'COMMENT ON COLUMN instagram_posts.author_profile_url IS \'Optional URL to author profile image in Supabase Storage\'');

    for (const statement of statements) {
      if (statement.includes('COMMENT ON COLUMN')) {
        console.log('⚠️  Skipping COMMENT statement (not supported via client)');
        continue;
      }

      console.log(`Executing: ${statement.substring(0, 60)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });

      if (error) {
        // Try direct execution for ALTER TABLE commands
        if (statement.includes('ALTER TABLE')) {
          console.log('Trying alternative method...');
          // Use raw query if RPC doesn't work
          const { error: altError } = await supabase.from('instagram_posts').select('author').limit(1);
          if (!altError || altError.message.includes('column "author" does not exist')) {
            console.log('⚠️  Column may not exist yet, migration needed via Supabase Dashboard');
            console.log('Please run this migration manually in Supabase SQL Editor:');
            console.log('----------------------------------------');
            console.log(sql);
            console.log('----------------------------------------');
            return;
          }
        } else {
          throw error;
        }
      }
    }

    console.log('✅ Migration completed successfully!');

    // Verify the changes
    const { data, error: verifyError } = await supabase
      .from('instagram_posts')
      .select('id, author, author_profile_url')
      .limit(1);

    if (verifyError) {
      console.error('❌ Verification failed:', verifyError);
    } else {
      console.log('✅ Verification successful! Sample data:', data);
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('\n📋 Please run this migration manually in Supabase SQL Editor:');
    console.log('----------------------------------------');
    const migrationFile = path.join(__dirname, 'supabase/migrations/20251116_add_instagram_author.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    console.log(sql);
    console.log('----------------------------------------');
  }
}

runMigration();
