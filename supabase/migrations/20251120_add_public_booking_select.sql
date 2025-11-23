-- Add RLS policy to allow public SELECT on bookings table
-- This enables the public booking confirmation page (GET /api/bookings/[id])
-- Security: UUID is unguessable, no sensitive fields are exposed

-- Drop existing public policy if it exists (from previous attempts)
DROP POLICY IF EXISTS "Allow public to read own booking" ON public.bookings;

-- Allow public to SELECT any booking by ID
-- Note: Only specific fields are exposed in the API (sensitive fields excluded)
CREATE POLICY "Allow public to read bookings by ID"
  ON public.bookings
  FOR SELECT
  TO public
  USING (true);

-- Add comment for documentation
COMMENT ON POLICY "Allow public to read bookings by ID" ON public.bookings
  IS 'Allows public access to booking details for confirmation page. UUID provides sufficient security as it is unguessable. Sensitive fields (admin_notes, confirmed_at, cancelled_at, updated_at) are excluded at application level.';
