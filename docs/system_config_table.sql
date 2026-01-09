-- Create system_config table for storing system-wide configuration
-- This table is used to store forms status and other system settings

CREATE TABLE IF NOT EXISTS system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config(key);

-- Insert default forms status if it doesn't exist
INSERT INTO system_config (key, value, updated_at)
VALUES ('forms_status', 'enabled', NOW())
ON CONFLICT (key) DO NOTHING;
