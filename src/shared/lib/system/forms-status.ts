/**
 * Forms status management for enabling/disabling form submissions
 *
 * Status values:
 * - 'enabled': Forms are active and can be submitted
 * - 'disabled': Forms are blocked and cannot be submitted
 */

import { createClient } from '@supabase/supabase-js';

export type FormsStatus = 'enabled' | 'disabled';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const FORMS_STATUS_KEY = 'forms_status';
const DEFAULT_STATUS: FormsStatus = 'enabled';

// Cache for forms status (to avoid DB calls on every request)
let cachedStatus: FormsStatus | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60000; // 1 minute cache

/**
 * Get current forms status from Supabase
 * Returns 'enabled' as default if status hasn't been set yet
 */
export async function getFormsStatus(): Promise<FormsStatus> {
  // Check cache first
  const now = Date.now();
  if (cachedStatus && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedStatus;
  }

  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', FORMS_STATUS_KEY)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine for first run
      console.error('[Forms Status] Error fetching status:', error);
      return DEFAULT_STATUS;
    }

    const status = (data?.value as FormsStatus) || DEFAULT_STATUS;
    cachedStatus = status;
    cacheTimestamp = now;
    return status;
  } catch (error) {
    console.error('[Forms Status] Error:', error);
    return DEFAULT_STATUS;
  }
}

/**
 * Set forms status in Supabase
 */
export async function setFormsStatus(status: FormsStatus): Promise<boolean> {
  try {
    const { error } = await supabase.from('system_config').upsert(
      {
        key: FORMS_STATUS_KEY,
        value: status,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'key',
      }
    );

    if (error) {
      console.error('[Forms Status] Error setting status:', error);
      return false;
    }

    // Update cache
    cachedStatus = status;
    cacheTimestamp = Date.now();
    console.log(`[Forms Status] Changed to: ${status}`);
    return true;
  } catch (error) {
    console.error('[Forms Status] Error:', error);
    return false;
  }
}

/**
 * Check if forms are enabled
 */
export async function areFormsEnabled(): Promise<boolean> {
  const status = await getFormsStatus();
  return status === 'enabled';
}

/**
 * Clear cache (useful for testing or immediate updates)
 */
export function clearFormsStatusCache(): void {
  cachedStatus = null;
  cacheTimestamp = 0;
}
