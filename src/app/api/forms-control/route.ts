import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
    // Check for authorization (optional - add your auth logic here)
    const authHeader = req.headers.get('authorization');
    const authToken = process.env.FORMS_CONTROL_SECRET;

    if (authToken && authHeader !== `Bearer ${authToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get action from body or query params
    let action: 'enable' | 'disable' | null = null;

    try {
      const body = await req.json().catch(() => ({}));
      action = body?.action || null;
    } catch {
      // If body parsing fails, try query params
      const { searchParams } = new URL(req.url);
      action = (searchParams.get('action') as 'enable' | 'disable') || null;
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
