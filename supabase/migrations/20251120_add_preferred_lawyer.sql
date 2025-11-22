-- Add preferred_lawyer column to bookings table
-- Allows customers to optionally select their preferred lawyer when booking

-- Add column
ALTER TABLE public.bookings
ADD COLUMN preferred_lawyer TEXT CHECK (preferred_lawyer IN ('육심원', '임은지'));

-- Add index for efficient filtering by lawyer
CREATE INDEX idx_bookings_preferred_lawyer ON public.bookings(preferred_lawyer)
WHERE preferred_lawyer IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.preferred_lawyer IS 'Optional preferred lawyer selection: 육심원 (대표변호사) or 임은지 (이혼전문변호사)';
