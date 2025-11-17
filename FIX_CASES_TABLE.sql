-- ============================================
-- VERIFIED: Cases table schema is correct
-- ============================================
-- The database already has the correct schema:
-- - categories (TEXT[]) exists
-- - slug is nullable
-- - NO 'category' column (that was the issue!)

-- This file is kept for reference only.
-- NO ACTION NEEDED - the schema is already correct!

-- Verify the current schema:
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'cases'
ORDER BY ordinal_position;

-- Expected output includes:
-- slug       | text      | YES  | null
-- categories | ARRAY     | YES  | (default varies)

-- The issue was in the CODE, not the database.
-- The createCase function was trying to insert a 'category' field
-- which doesn't exist in the database.

-- FIXED in lib/supabase/cases.ts by removing the category field.
