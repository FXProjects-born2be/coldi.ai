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
 * Status is updated by cron job every 10 minutes
 */
export async function GET() {
  return NextResponse.json({
    status: getSystemStatus(),
    footerPhoneNumber: getFooterPhoneNumber(),
  });
}

/**
 * POST /api/system-config/check-status
 * Checks system status and returns current mode
 * Used before SMS verification to ensure correct endpoints
 */
export async function POST() {
  const status = await checkSuspendStatus();
  return NextResponse.json({
    status,
    footerPhoneNumber: getFooterPhoneNumber(),
  });
}
