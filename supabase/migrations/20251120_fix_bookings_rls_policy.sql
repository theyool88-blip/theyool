-- Fix RLS Policy for bookings table to allow anonymous INSERT
-- This allows public users to create bookings using the anon key

-- Drop existing policy
DROP POLICY IF EXISTS "Allow public to create bookings" ON public.bookings;

-- Create new policy with correct role
CREATE POLICY "Allow public to create bookings"
  ON public.bookings
  FOR INSERT
  TO anon  -- Changed from 'public' to 'anon' for anonymous users
  WITH CHECK (true);

-- Verify the policy is created
COMMENT ON POLICY "Allow public to create bookings" ON public.bookings IS 'Allows anonymous users to create new booking requests';
