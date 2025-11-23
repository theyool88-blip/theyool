BEGIN;

DROP TABLE IF EXISTS public.consultations CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;

ALTER TABLE public.consultations_unified RENAME TO consultations;

DROP POLICY IF EXISTS "Allow public to create consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to read all consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to update consultations_unified" ON public.consultations;
DROP POLICY IF EXISTS "Allow admin to delete consultations_unified" ON public.consultations;

CREATE POLICY "Allow public to create consultations"
  ON public.consultations FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow admin to read all consultations"
  ON public.consultations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow admin to update consultations"
  ON public.consultations FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow admin to delete consultations"
  ON public.consultations FOR DELETE TO authenticated USING (true);

DROP TRIGGER IF EXISTS set_consultations_unified_updated_at ON public.consultations;
DROP TRIGGER IF EXISTS set_consultations_unified_status_timestamps ON public.consultations;

CREATE TRIGGER set_consultations_updated_at
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_consultations_status_timestamps
  BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.handle_consultation_status_timestamps();

COMMIT;
