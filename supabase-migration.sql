-- Create table for storing HubSpot notification tasks
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS hubspot_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  process_at TIMESTAMPTZ NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for efficient querying of unprocessed notifications
CREATE INDEX IF NOT EXISTS idx_hubspot_notifications_unprocessed 
ON hubspot_notifications(processed, process_at) 
WHERE processed = FALSE;

-- Create index for email lookups (optional, but useful for debugging)
CREATE INDEX IF NOT EXISTS idx_hubspot_notifications_email 
ON hubspot_notifications(email);

-- Add updated_at trigger to automatically update the timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_hubspot_notifications_updated_at 
BEFORE UPDATE ON hubspot_notifications 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- If table already exists, add phone column
-- Run this if you already created the table without phone column
ALTER TABLE hubspot_notifications 
ADD COLUMN IF NOT EXISTS phone TEXT;
