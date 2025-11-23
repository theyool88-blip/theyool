-- Simple version to run directly in Supabase SQL Editor
-- This creates a trigger to auto-update the updated_at column

-- Step 1: Create or replace the function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 2: Drop existing trigger if any
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;

-- Step 3: Create the trigger
CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
