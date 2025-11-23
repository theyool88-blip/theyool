-- ============================================================================
-- CLEANUP: Finalize unified consultations migration
-- Date: 2025-11-20
-- Description: Rename consultations_unified → consultations, backup old tables
-- ============================================================================

BEGIN;

-- Step 1: Backup old tables by renaming them
ALTER TABLE IF EXISTS public.consultations RENAME TO consultations_old_backup;
ALTER TABLE IF EXISTS public.bookings RENAME TO bookings_old_backup;

-- Step 2: Rename consultations_unified to consultations
ALTER TABLE public.consultations_unified RENAME TO consultations;

-- Step 3: Rename indexes to remove _uni suffix
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

-- Step 4: Rename triggers
ALTER TRIGGER IF EXISTS set_consultations_unified_updated_at ON public.consultations
  RENAME TO set_consultations_updated_at;

ALTER TRIGGER IF EXISTS set_consultations_unified_status_timestamps ON public.consultations
  RENAME TO set_consultations_status_timestamps;

-- Step 5: Rename RLS policies
DROP POLICY IF EXISTS "Allow public to create consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to read all consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to update consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to delete consultations_unified" ON public.consultations;

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

-- Step 6: Update table comments
COMMENT ON TABLE public.consultations IS 'Unified table for all consultation requests: callback, visit, video, and info';

-- Step 7: Grant permissions
GRANT SELECT, INSERT ON public.consultations TO anon;
GRANT ALL ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;

COMMIT;

-- ============================================================================
-- NOTES
-- ============================================================================
-- Old tables are now:
--   - consultations_old_backup (4 records)
--   - bookings_old_backup (67 records)
--
-- To drop old tables after verification (run in 1-2 weeks):
--   DROP TABLE IF EXISTS public.consultations_old_backup CASCADE;
--   DROP TABLE IF EXISTS public.bookings_old_backup CASCADE;
-- ============================================================================
