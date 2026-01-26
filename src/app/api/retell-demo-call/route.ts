import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getDemoStatus } from '@/shared/lib/demo-status-cache';
import { areFormsEnabled } from '@/shared/lib/forms-status';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';
const RETELL_DEMO_API_KEY = 'key_798c7db6a871dbd4661d3f8201ba';
const RETELL_DEMO_AGENT_ID = 'agent_6fc05cc128bcee73ca7d0007c5';

// Phone numbers for live-demo
const PRIMARY_PHONE = '+12494681104';
const RESERVE_PHONE = '+12494681104';

/**
 * Get Retell phone number for demo based on system status
 */
function getDemoRetellPhoneNumber(status: 'primary' | 'reserve'): string {
  return status === 'reserve' ? RESERVE_PHONE : PRIMARY_PHONE;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Check if forms are enabled
  const formsEnabled = await areFormsEnabled();
  if (!formsEnabled) {
    return NextResponse.json(
      { error: 'Form submissions are currently disabled. Please try again later.' },
      { status: 503 }
    );
  }

  // Get demo status from cache or fetch fresh from database (with cookie caching)
  const status = await getDemoStatus();
  // Status is now cached in cookie for 5 minutes

  const body = await req.json();
  const { phone } = body;

  if (!phone || typeof phone !== 'string') {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  // Get phone number based on system status
  const fromNumber = getDemoRetellPhoneNumber(status);
  console.log('[Retell Demo Call] Using phone number:', fromNumber, 'Status:', status);

  // Normalize phone number (ensure it starts with +)
  const toNumber = phone.startsWith('+') ? phone : `+${phone}`;

  const payload = {
    from_number: fromNumber,
    to_number: toNumber,
    override_agent_id: RETELL_DEMO_AGENT_ID,
    metadata: {},
    retell_llm_dynamic_variables: {},
    custom_sip_headers: {
      'X-Custom-Header': '1',
    },
  };

  console.log('[Retell Demo Call] Sending to Retell:', payload);

  try {
    const retellRes = await fetch(RETELL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RETELL_DEMO_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await retellRes.json();
    console.log('[Retell Demo Call] Retell response:', data);

    if (!retellRes.ok) {
      console.error('[Retell Demo Call] Retell error:', {
        status: retellRes.status,
        data,
      });
      const errorResponse = NextResponse.json({ error: data }, { status: retellRes.status });

      return errorResponse;
    }

    const successResponse = NextResponse.json(data, { status: 200 });

    return successResponse;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Retell Demo Call] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
