import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';

const AGENT_IDS: Record<string, string> = {
  Sana: 'agent_85d62851c87a6b82839131c000',
  James: 'agent_cce0f4602f5b8e0002a1ebdd27',
  Victoria: 'agent_14e9ea8c12206344652c81943c',
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RETELL_API_KEY not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { name, email, phone, industry, company, agent } = body;

  if (!name || !email || !phone || !industry || !company || !agent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const override_agent_id = AGENT_IDS[agent];
  if (!override_agent_id) {
    return NextResponse.json({ error: 'Unknown agent' }, { status: 400 });
  }

  const payload = {
    from_number: '+447401271428',
    to_number: phone.startsWith('+') ? phone : `+${phone}`,
    override_agent_id,
    metadata: {},
    retell_llm_dynamic_variables: {
      customer_name: name,
      email,
      industry,
      companySize: company,
    },
    custom_sip_headers: {
      'X-Custom-Header': '1',
    },
  };

  try {
    const retellRes = await fetch(RETELL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await retellRes.json();
    if (!retellRes.ok) {
      return NextResponse.json({ error: data }, { status: retellRes.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
