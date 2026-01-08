import { NextResponse } from 'next/server';

import { getFooterPhoneNumber, getSystemStatus } from '@/shared/lib/system-status';

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
