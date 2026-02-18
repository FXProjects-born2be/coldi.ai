import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { getDemoStatus } from '@/shared/lib/demo-status-cache';
//import { areFormsEnabled } from '@/shared/lib/forms-status';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';
const RETELL_DEMO_API_KEY = 'key_798c7db6a871dbd4661d3f8201ba';
// Default agent ID (fallback if not provided)
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
  // Get request metadata for logging
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const referer = req.headers.get('referer') || 'unknown';

  // Check BotID headers
  const botIdHeaders = {
    'x-vercel-botid': req.headers.get('x-vercel-botid'),
    'x-vercel-botid-signature': req.headers.get('x-vercel-botid-signature'),
    'x-vercel-botid-version': req.headers.get('x-vercel-botid-version'),
  };

  // Feature flag: Temporarily disable BotID for debugging
  // Set to false to disable BotID check temporarily
  const BOTID_ENABLED = true;

  let verification;
  if (BOTID_ENABLED) {
    // Check BotID with development options for local testing
    // In production, this will use real bot detection
    verification = await checkBotId({
      developmentOptions: {
        bypass: 'HUMAN', // In development, always allow (set to 'BAD-BOT' to test blocking)
      },
    });
  } else {
    // Temporarily bypass BotID for debugging
    verification = { isBot: false };
    console.warn('[BOTID] BotID check is DISABLED for debugging');
  }

  // Log BotID verification result with all headers
  console.log('[BOTID] Retell Call verification', {
    timestamp: new Date().toISOString(),
    ip,
    userAgent,
    referer,
    isBot: verification.isBot,
    verification: JSON.stringify(verification, null, 2),
    botIdHeaders,
    hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
    allHeaders: Object.fromEntries(req.headers.entries()),
    status: verification.isBot ? 'BLOCKED' : 'ALLOWED',
    environment: process.env.NODE_ENV,
  });

  if (verification.isBot) {
    console.warn('[BOTID] Blocked Retell Call request', {
      timestamp: new Date().toISOString(),
      ip,
      userAgent,
      referer,
      reason: 'BotID detected bot',
      verification: JSON.stringify(verification, null, 2),
      botIdHeaders,
      hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
      note: 'BotID requires requests from page via fetch with proper headers. Check if initBotId() is called and headers are sent.',
    });
    return NextResponse.json(
      {
        error: 'Bot detected. Access denied.',
        message:
          'BotID blocked this request. Please ensure the request is made from the website page.',
        debug: {
          hasBotIdHeaders: !!botIdHeaders['x-vercel-botid'],
          verification: verification,
        },
      },
      { status: 403 }
    );
  }

  // Get demo status from cache or fetch fresh from database (with cookie caching)
  const status = await getDemoStatus();
  // Status is now cached in cookie for 5 minutes

  const body = await req.json();
  const { phone, agentId, name } = body;

  if (!phone || typeof phone !== 'string') {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  if (!agentId || typeof agentId !== 'string') {
    return NextResponse.json({ error: 'Agent ID is required' }, { status: 400 });
  }

  // Use provided agentId or fallback to default
  const selectedAgentId = agentId || RETELL_DEMO_AGENT_ID;

  console.log('[Retell Demo Call] Selected agent:', selectedAgentId, 'Phone:', phone);

  // Get phone number based on system status
  const fromNumber = getDemoRetellPhoneNumber(status);
  console.log('[Retell Demo Call] Using phone number:', fromNumber, 'Status:', status);

  // Normalize phone number (ensure it starts with +)
  const toNumber = phone.startsWith('+') ? phone : `+${phone}`;

  const customerName = typeof name === 'string' ? name.trim() : '';

  const payload = {
    from_number: fromNumber,
    to_number: toNumber,
    override_agent_id: selectedAgentId,
    metadata: {
      agent_id: selectedAgentId,
      phone: toNumber,
      first_name: customerName,
    },
    retell_llm_dynamic_variables: {
      first_name: customerName,
    },
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
