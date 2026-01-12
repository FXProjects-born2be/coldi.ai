-- Create table for CSRF tokens
-- Tokens are generated on page load and validated on API routes to prevent console calls
CREATE TABLE IF NOT EXISTS csrf_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_csrf_tokens_token ON csrf_tokens(token);
CREATE INDEX IF NOT EXISTS idx_csrf_tokens_expires_at ON csrf_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_csrf_tokens_used ON csrf_tokens(used);

-- Create function to automatically clean up expired codes (optional, can also use cron)
CREATE OR REPLACE FUNCTION cleanup_expired_csrf_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM csrf_tokens WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;
