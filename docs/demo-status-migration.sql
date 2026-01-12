-- Demo status migration
-- Adds support for demo_status in system_config table
-- Demo status is separate from main system_status and controls live-demo phone numbers

-- Ensure system_config table exists (if not already created)
CREATE TABLE IF NOT EXISTS system_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_system_config_key ON system_config(key);

-- Insert default demo_status if it doesn't exist
-- Default is 'primary' which uses +18076971313
-- 'reserve' uses +13658329885
INSERT INTO system_config (key, value, updated_at)
VALUES ('demo_status', 'primary', NOW())
ON CONFLICT (key) DO NOTHING;

-- Optional: Add comment to document the key
COMMENT ON COLUMN system_config.key IS 'Configuration key (e.g., forms_status, demo_status, system_status)';
COMMENT ON COLUMN system_config.value IS 'Configuration value (e.g., enabled/disabled, primary/reserve)';
