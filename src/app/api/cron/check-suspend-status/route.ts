import { NextResponse } from 'next/server';

import { getSystemStatus, setSystemStatus } from '@/shared/lib/system-status';

const SUSPEND_CHECK_URL = 'https://aitassistance.app.n8n.cloud/webhook/suspend_check';
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds

/**
 * GET /api/cron/check-suspend-status
 * Checks account status and switches to reserve mode if needed
 * Should be called every 10 minutes via Vercel Cron
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const currentStatus = getSystemStatus();
  console.log(`[Suspend Check] Current status: ${currentStatus}`);

  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(SUSPEND_CHECK_URL, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[Suspend Check] HTTP error! status: ${response.status}`);
      // On HTTP error, switch to reserve mode
      if (currentStatus !== 'reserve') {
        setSystemStatus('reserve');
        console.log('[Suspend Check] Switched to RESERVE mode due to HTTP error');
      }
      return NextResponse.json(
        {
          status: 'error',
          message: `HTTP error: ${response.status}`,
          systemStatus: 'reserve',
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('[Suspend Check] Response:', data);

    // Check response result
    const result = data?.result;

    if (result === 'ok') {
      // Account is active - switch to primary mode
      if (currentStatus !== 'primary') {
        setSystemStatus('primary');
        console.log('[Suspend Check] Switched to PRIMARY mode');
      }
      return NextResponse.json({
        status: 'success',
        message: 'Account is active',
        systemStatus: 'primary',
      });
    } else if (result === 'error') {
      // Account is suspended - switch to reserve mode
      if (currentStatus !== 'reserve') {
        setSystemStatus('reserve');
        console.log('[Suspend Check] Switched to RESERVE mode due to error response');
      }
      return NextResponse.json({
        status: 'success',
        message: 'Account is suspended, using reserve mode',
        systemStatus: 'reserve',
      });
    } else {
      // Unknown response format - switch to reserve mode for safety
      console.warn('[Suspend Check] Unknown response format:', data);
      if (currentStatus !== 'reserve') {
        setSystemStatus('reserve');
        console.log('[Suspend Check] Switched to RESERVE mode due to unknown response');
      }
      return NextResponse.json({
        status: 'warning',
        message: 'Unknown response format, using reserve mode',
        systemStatus: 'reserve',
      });
    }
  } catch (error) {
    // Timeout or network error - switch to reserve mode
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[Suspend Check] Request timeout (>30s)');
    } else {
      console.error('[Suspend Check] Error:', error);
    }

    if (currentStatus !== 'reserve') {
      setSystemStatus('reserve');
      console.log('[Suspend Check] Switched to RESERVE mode due to error/timeout');
    }

    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        systemStatus: 'reserve',
      },
      { status: 500 }
    );
  }
}
