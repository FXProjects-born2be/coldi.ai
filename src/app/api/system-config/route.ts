import { NextResponse } from 'next/server';

import {
  checkSuspendStatus,
  getFooterPhoneNumber,
  getSystemStatus,
} from '@/shared/lib/system-status';

/**
 * GET /api/system-config
 * Returns current system configuration (phone numbers, etc.)
 * Used by client components to get dynamic values
 *
 * Checks suspend status on every request to ensure fresh status
 */
export async function GET() {
  // Check suspend status on every request to avoid caching issues
  // This ensures we always have the latest status
  await checkSuspendStatus();

  return NextResponse.json({
    status: getSystemStatus(),
    footerPhoneNumber: getFooterPhoneNumber(),
  });
}
