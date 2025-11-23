-- Fix consultations table updated_at auto-update
-- This script creates a trigger to automatically update the updated_at column

-- 1. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Create trigger for consultations table
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;

CREATE TRIGGER update_consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 3. Verify the trigger was created
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'consultations';
