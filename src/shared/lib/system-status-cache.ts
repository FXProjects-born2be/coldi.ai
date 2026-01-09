/**
 * System status caching using cookies
 * Reduces number of requests to suspend_check webhook
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import type { SystemStatus } from './system-status';
import { checkSuspendStatus } from './system-status';

const STATUS_COOKIE_NAME = 'system-status';
const STATUS_COOKIE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Get system status from cookie or fetch fresh status
 * Returns cached status if valid, otherwise fetches and caches new status
 */
export async function getCachedSystemStatus(request: NextRequest): Promise<SystemStatus> {
  // Try to get status from cookie
  const cookieStatus = request.cookies.get(STATUS_COOKIE_NAME);

  if (cookieStatus) {
    try {
      const { status, timestamp } = JSON.parse(cookieStatus.value);
      const age = Date.now() - timestamp;

      // If cookie is still valid (less than TTL), use it
      if (age < STATUS_COOKIE_TTL_MS && (status === 'primary' || status === 'reserve')) {
        console.log(
          `[System Status Cache] Using cached status: ${status} (age: ${Math.round(age / 1000)}s)`
        );
        return status as SystemStatus;
      }
    } catch (error) {
      console.warn('[System Status Cache] Failed to parse cookie:', error);
    }
  }

  // Cookie is missing or expired, fetch fresh status
  console.log('[System Status Cache] Fetching fresh status');
  const freshStatus = await checkSuspendStatus();

  return freshStatus;
}

/**
 * Set system status in cookie
 */
export function setStatusCookie(status: SystemStatus): NextResponse {
  const response = NextResponse.next();
  const cookieValue = JSON.stringify({
    status,
    timestamp: Date.now(),
  });

  response.cookies.set(STATUS_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Math.floor(STATUS_COOKIE_TTL_MS / 1000), // Convert to seconds
    path: '/',
  });

  return response;
}

/**
 * Get system status with caching for API routes
 * Returns both status and response with cookie set
 */
export async function getSystemStatusWithCache(
  request: NextRequest
): Promise<{ status: SystemStatus; response: NextResponse }> {
  const status = await getCachedSystemStatus(request);
  const response = NextResponse.next();

  // Set cookie for future requests
  const cookieValue = JSON.stringify({
    status,
    timestamp: Date.now(),
  });

  response.cookies.set(STATUS_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Math.floor(STATUS_COOKIE_TTL_MS / 1000),
    path: '/',
  });

  return { status, response };
}
