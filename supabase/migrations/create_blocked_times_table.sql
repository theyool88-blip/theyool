-- Create blocked_times table for admin to block specific dates/times
CREATE TABLE IF NOT EXISTS public.blocked_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Blocking type
  block_type TEXT NOT NULL CHECK (block_type IN ('date', 'time_slot')),

  -- Date blocking (for full day holidays/closures)
  blocked_date DATE,

  -- Time slot blocking (for specific time ranges)
  blocked_time_start TEXT,  -- e.g., '09:00'
  blocked_time_end TEXT,    -- e.g., '12:00'

  -- Office location (null = applies to all offices)
  office_location TEXT CHECK (office_location IN ('천안', '평택') OR office_location IS NULL),

  -- Reason/note
  reason TEXT,

  -- Admin who created this block
  created_by TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_date_block CHECK (
    (block_type = 'date' AND blocked_date IS NOT NULL) OR
    (block_type = 'time_slot' AND blocked_date IS NOT NULL AND blocked_time_start IS NOT NULL AND blocked_time_end IS NOT NULL)
  )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blocked_times_date ON public.blocked_times(blocked_date);
CREATE INDEX IF NOT EXISTS idx_blocked_times_type ON public.blocked_times(block_type);
CREATE INDEX IF NOT EXISTS idx_blocked_times_office ON public.blocked_times(office_location);

-- Enable Row Level Security
ALTER TABLE public.blocked_times ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Only authenticated users (admins) can manage blocked times
CREATE POLICY "Authenticated users can view blocked times"
  ON public.blocked_times FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create blocked times"
  ON public.blocked_times FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blocked times"
  ON public.blocked_times FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blocked times"
  ON public.blocked_times FOR DELETE
  TO authenticated
  USING (true);

-- Public can read blocked times (to check availability)
CREATE POLICY "Public can view blocked times"
  ON public.blocked_times FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_blocked_times_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blocked_times_updated_at
  BEFORE UPDATE ON public.blocked_times
  FOR EACH ROW
  EXECUTE FUNCTION update_blocked_times_updated_at();

-- Add helpful comment
COMMENT ON TABLE public.blocked_times IS 'Stores blocked dates and time slots for booking system';
