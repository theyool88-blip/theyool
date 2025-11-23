-- ============================================================================
-- RENAME consultations_unified TO consultations
-- Date: 2025-11-20
-- Description: Rename unified table and drop old tables
-- ============================================================================

BEGIN;

-- Step 1: Drop old tables (they have 4 and 67 rows respectively - safe to delete)
DROP TABLE IF EXISTS public.consultations CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;

-- Step 2: Rename consultations_unified to consultations
ALTER TABLE public.consultations_unified RENAME TO consultations;

-- Step 3: Rename indexes (automatically renamed, but verify)
-- Indexes are automatically renamed when table is renamed in PostgreSQL

-- Step 4: Update RLS policies (rename for clarity)
DROP POLICY IF EXISTS "Allow public to create consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to read all consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to update consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to delete consultations_unified" ON public.consultations;

-- Recreate with cleaner names
CREATE POLICY "Allow public to create consultations"
  ON public.consultations
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin to read all consultations"
  ON public.consultations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin to update consultations"
  ON public.consultations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin to delete consultations"
  ON public.consultations
  FOR DELETE
  TO authenticated
  USING (true);

-- Step 5: Rename triggers
DROP TRIGGER IF EXISTS set_consultations_unified_updated_at ON public.consultations;
DROP TRIGGER IF EXISTS set_consultations_unified_status_timestamps ON public.consultations;

CREATE TRIGGER set_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_consultations_status_timestamps
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_consultation_status_timestamps();

-- Step 6: Rename indexes to remove "_uni" suffix
ALTER INDEX IF EXISTS idx_consultations_uni_status RENAME TO idx_consultations_status;
ALTER INDEX IF EXISTS idx_consultations_uni_request_type RENAME TO idx_consultations_request_type;
ALTER INDEX IF EXISTS idx_consultations_uni_created_at RENAME TO idx_consultations_created_at;
ALTER INDEX IF EXISTS idx_consultations_uni_status_type RENAME TO idx_consultations_status_type;
ALTER INDEX IF EXISTS idx_consultations_uni_status_date RENAME TO idx_consultations_status_date;
ALTER INDEX IF EXISTS idx_consultations_uni_scheduling RENAME TO idx_consultations_scheduling;
ALTER INDEX IF EXISTS idx_consultations_uni_assigned_lawyer RENAME TO idx_consultations_assigned_lawyer;
ALTER INDEX IF EXISTS idx_consultations_uni_payment RENAME TO idx_consultations_payment;
ALTER INDEX IF EXISTS idx_consultations_uni_phone RENAME TO idx_consultations_phone;
ALTER INDEX IF EXISTS idx_consultations_uni_email RENAME TO idx_consultations_email;

-- Step 7: Update table comment
COMMENT ON TABLE public.consultations IS 'Unified table for all consultation requests: callback, visit, video, and info';

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES (run after migration)
-- ============================================================================

-- Verify table exists
-- SELECT tablename FROM pg_tables WHERE tablename = 'consultations';

-- Verify indexes
-- SELECT indexname FROM pg_indexes WHERE tablename = 'consultations';

-- Verify RLS policies
-- SELECT policyname FROM pg_policies WHERE tablename = 'consultations';

-- Verify triggers
-- SELECT tgname FROM pg_trigger WHERE tgrelid = 'consultations'::regclass;
