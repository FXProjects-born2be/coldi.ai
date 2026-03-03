/**
 * Demo status management using database
 * Separate from main system status for live-demo functionality
 * Always reads from database (no caching)
 */

import { createClient } from '@supabase/supabase-js';

export type DemoStatus = 'primary' | 'reserve';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DEMO_STATUS_KEY = 'demo_status';

/**
 * Get demo status from database
 * Returns 'primary' as default if not set
 */
export async function getDemoStatus(): Promise<DemoStatus> {
  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', DEMO_STATUS_KEY)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.warn('[Demo Status] Error getting status from DB:', error);
      return 'primary'; // Default to primary
    }

    if (data?.value && (data.value === 'primary' || data.value === 'reserve')) {
      console.log(`[Demo Status] Using status from database: ${data.value}`);
      return data.value as DemoStatus;
    }

    // No status in database, default to primary
    return 'primary';
  } catch (error) {
    console.error('[Demo Status] Error reading from database:', error);
    return 'primary';
  }
}

/**
 * Get demo status for API routes
 * Always reads fresh from database
 */
/*export async function getDemoStatusWithCache(
  request: NextRequest
): Promise<{ status: DemoStatus; response: NextResponse }> {
  const status = await getDemoStatus();
  const response = NextResponse.next();

  return { status, response };
}*/
