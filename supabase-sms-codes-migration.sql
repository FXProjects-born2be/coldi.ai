-- Create table for SMS verification codes
CREATE TABLE IF NOT EXISTS sms_verification_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified BOOLEAN DEFAULT FALSE
);

-- Create index on phone for fast lookups
CREATE INDEX IF NOT EXISTS idx_sms_codes_phone ON sms_verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_sms_codes_expires_at ON sms_verification_codes(expires_at);

-- Create table for SMS rate limiting
CREATE TABLE IF NOT EXISTS sms_rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT NOT NULL UNIQUE,
  last_sms_sent TIMESTAMPTZ NOT NULL,
  attempts_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on phone for fast lookups
CREATE INDEX IF NOT EXISTS idx_sms_rate_limits_phone ON sms_rate_limits(phone);

-- Function to automatically clean up expired codes (optional, can also be done via cron)
CREATE OR REPLACE FUNCTION cleanup_expired_sms_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM sms_verification_codes
  WHERE expires_at < NOW() OR verified = TRUE;
END;
$$ LANGUAGE plpgsql;

