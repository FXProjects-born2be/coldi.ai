-- Create table for form submission codes
-- Codes are generated on main route submission and validated on secondary routes
CREATE TABLE IF NOT EXISTS submission_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_routes TEXT[] DEFAULT ARRAY[]::TEXT[], -- Track which routes have used this code
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_submission_codes_code ON submission_codes(code);
CREATE INDEX IF NOT EXISTS idx_submission_codes_email_phone ON submission_codes(email, phone);
CREATE INDEX IF NOT EXISTS idx_submission_codes_expires_at ON submission_codes(expires_at);

-- Create function to automatically clean up expired codes (optional, can also use cron)
CREATE OR REPLACE FUNCTION cleanup_expired_submission_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM submission_codes WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;
