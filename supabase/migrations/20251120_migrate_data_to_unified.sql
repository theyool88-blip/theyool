-- ============================================================================
-- DATA MIGRATION: Merge bookings and consultations into unified table
-- Date: 2025-11-20
-- Description: Zero-downtime migration with rollback capability
-- ============================================================================

-- IMPORTANT: Run this AFTER 20251120_unified_consultations_schema.sql

BEGIN;

-- ============================================================================
-- STEP 1: Rename existing tables as backups
-- ============================================================================

-- Check if old tables exist and rename them
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'consultations') THEN
    ALTER TABLE public.consultations RENAME TO consultations_old_backup;
    RAISE NOTICE 'Renamed consultations to consultations_old_backup';
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings') THEN
    ALTER TABLE public.bookings RENAME TO bookings_old_backup;
    RAISE NOTICE 'Renamed bookings to bookings_old_backup';
  END IF;
END $$;

-- ============================================================================
-- STEP 2: Rename unified table to consultations
-- ============================================================================

ALTER TABLE public.consultations_unified RENAME TO consultations;

RAISE NOTICE 'Renamed consultations_unified to consultations';

-- ============================================================================
-- STEP 3: Migrate data from old consultations table
-- ============================================================================

-- Migrate old consultation requests (callback type)
INSERT INTO public.consultations (
  id,
  created_at,
  updated_at,
  request_type,
  status,
  name,
  phone,
  email,
  category,
  message,
  admin_notes,
  source,
  lead_score
)
SELECT
  id,
  created_at,
  updated_at,
  'callback' as request_type,
  -- Map old status to new status
  CASE
    WHEN status = 'new' THEN 'pending'
    WHEN status = 'contacted' THEN 'contacted'
    WHEN status = 'closed' THEN 'completed'
    WHEN status = 'pending' THEN 'pending'
    WHEN status = 'in_progress' THEN 'in_progress'
    WHEN status = 'completed' THEN 'completed'
    ELSE 'pending'
  END as status,
  name,
  phone,
  email,
  category,
  message,
  admin_notes,
  'website' as source,
  COALESCE(lead_score, 0) as lead_score
FROM public.consultations_old_backup
WHERE EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'consultations_old_backup');

RAISE NOTICE 'Migrated data from consultations_old_backup';

-- ============================================================================
-- STEP 4: Migrate data from old bookings table
-- ============================================================================

-- Migrate old booking requests (visit/video types)
INSERT INTO public.consultations (
  id,
  created_at,
  updated_at,
  request_type,
  status,
  name,
  phone,
  email,
  category,
  message,
  preferred_date,
  preferred_time,
  office_location,
  video_link,
  preferred_lawyer,
  admin_notes,
  confirmed_at,
  cancelled_at,
  source
)
SELECT
  id,
  created_at,
  updated_at,
  type as request_type,  -- Already 'visit' or 'video'
  -- Status values are compatible, but map if needed
  CASE
    WHEN status IN ('pending', 'confirmed', 'cancelled', 'completed') THEN status
    ELSE 'pending'
  END as status,
  name,
  phone,
  email,
  category,
  message,
  preferred_date,
  preferred_time,
  office_location,
  video_link,
  preferred_lawyer,
  admin_notes,
  confirmed_at,
  cancelled_at,
  'website' as source
FROM public.bookings_old_backup
WHERE EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings_old_backup');

RAISE NOTICE 'Migrated data from bookings_old_backup';

-- ============================================================================
-- STEP 5: Verify data integrity
-- ============================================================================

DO $$
DECLARE
  old_consultations_count INTEGER;
  old_bookings_count INTEGER;
  new_total_count INTEGER;
  callback_count INTEGER;
  visit_count INTEGER;
  video_count INTEGER;
BEGIN
  -- Count old records
  SELECT COUNT(*) INTO old_consultations_count
  FROM public.consultations_old_backup
  WHERE EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'consultations_old_backup');

  SELECT COUNT(*) INTO old_bookings_count
  FROM public.bookings_old_backup
  WHERE EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'bookings_old_backup');

  -- Count new records
  SELECT COUNT(*) INTO new_total_count FROM public.consultations;
  SELECT COUNT(*) INTO callback_count FROM public.consultations WHERE request_type = 'callback';
  SELECT COUNT(*) INTO visit_count FROM public.consultations WHERE request_type = 'visit';
  SELECT COUNT(*) INTO video_count FROM public.consultations WHERE request_type = 'video';

  -- Log results
  RAISE NOTICE '========================================';
  RAISE NOTICE 'MIGRATION VERIFICATION:';
  RAISE NOTICE 'Old consultations: %', COALESCE(old_consultations_count, 0);
  RAISE NOTICE 'Old bookings: %', COALESCE(old_bookings_count, 0);
  RAISE NOTICE 'Old total: %', COALESCE(old_consultations_count, 0) + COALESCE(old_bookings_count, 0);
  RAISE NOTICE '----------------------------------------';
  RAISE NOTICE 'New total: %', new_total_count;
  RAISE NOTICE '  - Callback: %', callback_count;
  RAISE NOTICE '  - Visit: %', visit_count;
  RAISE NOTICE '  - Video: %', video_count;
  RAISE NOTICE '========================================';

  -- Verify counts match
  IF new_total_count != (COALESCE(old_consultations_count, 0) + COALESCE(old_bookings_count, 0)) THEN
    RAISE EXCEPTION 'Migration count mismatch! Expected %, got %',
      COALESCE(old_consultations_count, 0) + COALESCE(old_bookings_count, 0),
      new_total_count;
  END IF;

  RAISE NOTICE 'Data integrity verified successfully!';
END $$;

-- ============================================================================
-- STEP 6: Update RLS policies index names
-- ============================================================================

-- Drop old policies with "_unified" suffix and recreate without suffix
DROP POLICY IF EXISTS "Allow public to create consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to read all consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to update consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to delete consultations_unified" ON public.consultations;

-- Recreate policies with clean names
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

-- ============================================================================
-- STEP 7: Update trigger names
-- ============================================================================

-- Drop old triggers with "_unified" suffix
DROP TRIGGER IF EXISTS set_consultations_unified_updated_at ON public.consultations;
DROP TRIGGER IF EXISTS set_consultations_unified_status_timestamps ON public.consultations;

-- Recreate triggers with clean names
CREATE TRIGGER set_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_consultations_status_timestamps
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_consultation_status_timestamps();

-- ============================================================================
-- STEP 8: Update index names
-- ============================================================================

-- Rename indexes to remove "_uni" suffix
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

-- ============================================================================
-- STEP 9: Grant permissions
-- ============================================================================

GRANT SELECT, INSERT ON public.consultations TO anon;
GRANT ALL ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;

COMMIT;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- To verify migration success, run:
-- SELECT request_type, status, COUNT(*) FROM consultations GROUP BY request_type, status ORDER BY request_type, status;

-- ============================================================================
-- ROLLBACK PROCEDURE (if needed)
-- ============================================================================

-- To rollback, run in a separate transaction:
/*
BEGIN;

-- Rename current consultations to failed attempt
ALTER TABLE public.consultations RENAME TO consultations_unified_failed;

-- Restore old tables
ALTER TABLE public.consultations_old_backup RENAME TO consultations;
ALTER TABLE public.bookings_old_backup RENAME TO bookings;

COMMIT;
*/

-- ============================================================================
-- CLEANUP (after 1-2 weeks of production verification)
-- ============================================================================

-- After verifying everything works correctly, drop backup tables:
/*
BEGIN;

DROP TABLE IF EXISTS public.consultations_old_backup;
DROP TABLE IF EXISTS public.bookings_old_backup;

COMMIT;
*/
