-- Create bookings table for visit and video consultation scheduling
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Booking type and status
  type TEXT NOT NULL CHECK (type IN ('visit', 'video')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),

  -- Customer information
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT,
  message TEXT,

  -- Scheduling information
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  office_location TEXT CHECK (office_location IN ('천안', '평택')),

  -- Video consultation specific
  video_link TEXT,

  -- Admin fields
  admin_notes TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for efficient querying
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_type ON public.bookings(type);
CREATE INDEX idx_bookings_preferred_date ON public.bookings(preferred_date);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX idx_bookings_status_date ON public.bookings(status, preferred_date);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public: Allow INSERT only (customers can create bookings)
CREATE POLICY "Allow public to create bookings"
  ON public.bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin: Allow SELECT for authenticated admin users
CREATE POLICY "Allow admin to read all bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin: Allow UPDATE for authenticated admin users
CREATE POLICY "Allow admin to update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin: Allow DELETE for authenticated admin users
CREATE POLICY "Allow admin to delete bookings"
  ON public.bookings
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.bookings IS 'Stores visit and video consultation booking requests';
COMMENT ON COLUMN public.bookings.type IS 'Type of consultation: visit or video';
COMMENT ON COLUMN public.bookings.status IS 'Booking status: pending, confirmed, cancelled, or completed';
COMMENT ON COLUMN public.bookings.office_location IS 'Office location for visit consultations (천안 or 평택)';
COMMENT ON COLUMN public.bookings.video_link IS 'Video conference link (added by admin after confirmation)';
COMMENT ON COLUMN public.bookings.preferred_time IS 'Preferred time slot in HH:MM format (e.g., 14:00, 15:30)';
