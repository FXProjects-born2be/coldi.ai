import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { areFormsEnabled, type FormsStatus, setFormsStatus } from '@/shared/lib/forms-status';

/**
 * GET /api/forms-control
 * Returns current forms status (enabled/disabled)
 */
export async function GET() {
  try {
    const enabled = await areFormsEnabled();
    return NextResponse.json({
      status: enabled ? 'enabled' : 'disabled',
      enabled,
    });
  } catch (error) {
    console.error('[Forms Control] Error getting status:', error);
    return NextResponse.json({ error: 'Failed to get forms status' }, { status: 500 });
  }
}

/**
 * POST /api/forms-control
 * Sets forms status (enable/disable)
 *
 * Body: { action: 'enable' | 'disable' }
 * Or query param: ?action=enable or ?action=disable
 */
export async function POST(req: NextRequest) {
  try {
    // Check for authorization first (if auth is provided and valid, bypass BotID)
    const authHeader = req.headers.get('authorization');
    const authToken = process.env.API_SECRET;
    const hasValidAuth = authToken && authHeader === `Bearer ${authToken}`;

    // Skip BotID check if:
    // 1. Valid auth token is provided (allows Postman/admin tools)
    // 2. Development environment
    // 3. Special header is set
    const skipBotId =
      hasValidAuth ||
      process.env.NODE_ENV === 'development' ||
      req.headers.get('x-skip-botid') === 'true';

    if (!skipBotId) {
      try {
        const verification = await checkBotId({
          developmentOptions: {
            bypass: 'HUMAN', // Allow in development
          },
        });

        // In production, if BotID detects bot, block the request
        if (verification.isBot) {
          console.warn('[Forms Control] BotID detected bot', {
            ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            userAgent: req.headers.get('user-agent') || 'unknown',
          });
          return NextResponse.json(
            {
              error: 'Bot detected. Access denied.',
              hint: 'Provide valid authorization token to bypass BotID check for admin endpoints.',
            },
            { status: 403 }
          );
        }
      } catch (botIdError) {
        console.error('[Forms Control] BotID check error:', botIdError);
        // Continue with request if BotID check fails (don't block admin endpoints)
      }
    }

    // Check for authorization (required if FORMS_CONTROL_SECRET is set)
    if (authToken && !hasValidAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get action from query params first, then from body
    const { searchParams } = new URL(req.url);
    let action: 'enable' | 'disable' | null =
      (searchParams.get('action') as 'enable' | 'disable') || null;

    // If not in query params, try to get from body
    if (!action) {
      try {
        const body = await req.json().catch(() => ({}));
        action = body?.action || null;
      } catch {
        // Body parsing failed, action remains null
      }
    }

    if (!action || (action !== 'enable' && action !== 'disable')) {
      return NextResponse.json(
        { error: "Invalid action. Use 'enable' or 'disable'" },
        { status: 400 }
      );
    }

    const status: FormsStatus = action === 'enable' ? 'enabled' : 'disabled';
    const success = await setFormsStatus(status);

    if (!success) {
      return NextResponse.json({ error: 'Failed to update forms status' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      status,
      message: `Forms are now ${status}`,
    });
  } catch (error) {
    console.error('[Forms Control] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
