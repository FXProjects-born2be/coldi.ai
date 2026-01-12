/**
 * Demo status caching using cookies and database
 * Separate from main system status for live-demo functionality
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

export type DemoStatus = 'primary' | 'reserve';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DEMO_STATUS_KEY = 'demo_status';
const DEMO_STATUS_COOKIE_NAME = 'demo-status';
const DEMO_STATUS_COOKIE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Get demo status from database
 * Returns 'primary' as default if not set
 */
async function getDemoStatusFromDatabase(): Promise<DemoStatus> {
  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', DEMO_STATUS_KEY)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned
      console.warn('[Demo Status Cache] Error getting status from DB:', error);
      return 'primary'; // Default to primary
    }

    if (data?.value && (data.value === 'primary' || data.value === 'reserve')) {
      console.log(`[Demo Status Cache] Using status from database: ${data.value}`);
      return data.value as DemoStatus;
    }

    // No status in database, default to primary
    return 'primary';
  } catch (error) {
    console.error('[Demo Status Cache] Error reading from database:', error);
    return 'primary';
  }
}

/**
 * Get demo status from cookie or fetch fresh status from database
 * Returns cached status if valid, otherwise fetches and caches new status
 */
export async function getCachedDemoStatus(request: NextRequest): Promise<DemoStatus> {
  // Try to get status from cookie
  const cookieStatus = request.cookies.get(DEMO_STATUS_COOKIE_NAME);

  if (cookieStatus) {
    try {
      const { status, timestamp } = JSON.parse(cookieStatus.value);
      const age = Date.now() - timestamp;

      // If cookie is still valid (less than TTL), use it
      if (age < DEMO_STATUS_COOKIE_TTL_MS && (status === 'primary' || status === 'reserve')) {
        console.log(
          `[Demo Status Cache] Using cached status: ${status} (age: ${Math.round(age / 1000)}s)`
        );
        return status as DemoStatus;
      }
    } catch (error) {
      console.warn('[Demo Status Cache] Failed to parse cookie:', error);
    }
  }

  // Cookie is missing or expired, fetch fresh status from database
  console.log('[Demo Status Cache] Fetching fresh status from database');
  const freshStatus = await getDemoStatusFromDatabase();

  return freshStatus;
}

/**
 * Get demo status with caching for API routes
 * Returns both status and response with cookie set
 */
export async function getDemoStatusWithCache(
  request: NextRequest
): Promise<{ status: DemoStatus; response: NextResponse }> {
  const status = await getCachedDemoStatus(request);
  const response = NextResponse.next();

  // Set cookie for future requests
  const cookieValue = JSON.stringify({
    status,
    timestamp: Date.now(),
  });

  response.cookies.set(DEMO_STATUS_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Math.floor(DEMO_STATUS_COOKIE_TTL_MS / 1000),
    path: '/',
  });

  return { status, response };
}
