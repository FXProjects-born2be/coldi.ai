import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DEMO_STATUS_KEY = 'demo_status';

export type DemoStatus = 'primary' | 'reserve';

/**
 * GET /api/demo-status
 * Returns current demo status (primary/reserve)
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('system_config')
      .select('value')
      .eq('key', DEMO_STATUS_KEY)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine for first time
      console.error('[Demo Status] Error getting status:', error);
      return NextResponse.json({ error: 'Failed to get demo status' }, { status: 500 });
    }

    const status = (data?.value as DemoStatus) || 'primary';

    return NextResponse.json({
      status,
    });
  } catch (error) {
    console.error('[Demo Status] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/demo-status
 * Sets demo status (primary/reserve)
 *
 * Body: { status: 'primary' | 'reserve' }
 * Or query param: ?status=primary or ?status=reserve
 */
export async function POST(req: NextRequest) {
  try {
    // Get status from query params first, then from body
    const { searchParams } = new URL(req.url);
    let status: 'primary' | 'reserve' | null =
      (searchParams.get('status') as 'primary' | 'reserve') || null;

    // If not in query params, try to get from body
    if (!status) {
      try {
        const body = await req.json().catch(() => ({}));
        status = body?.status || null;
      } catch {
        // Body parsing failed, status remains null
      }
    }

    if (!status || (status !== 'primary' && status !== 'reserve')) {
      return NextResponse.json(
        { error: "Invalid status. Use 'primary' or 'reserve'" },
        { status: 400 }
      );
    }

    // Upsert status in database
    const { error: upsertError } = await supabase.from('system_config').upsert(
      {
        key: DEMO_STATUS_KEY,
        value: status,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'key',
      }
    );

    if (upsertError) {
      console.error('[Demo Status] Error updating status:', upsertError);
      return NextResponse.json({ error: 'Failed to update demo status' }, { status: 500 });
    }

    console.log(`[Demo Status] Status updated to: ${status}`);

    return NextResponse.json({
      success: true,
      status,
      message: `Demo status set to ${status}`,
    });
  } catch (error) {
    console.error('[Demo Status] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
