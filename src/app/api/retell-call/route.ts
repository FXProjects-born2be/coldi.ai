import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const RETELL_API_URL = 'https://api.retellai.com/v2/create-phone-call';

const AGENT_IDS: Record<string, string> = {
  Sophie: 'agent_c7bdb8b06aea7f3d389f49eddc',
  George: 'agent_6fc05cc128bcee73ca7d0007c5',
  Kate: 'agent_783e3b56e581419bb847db9cff',
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'RETELL_API_KEY not configured' }, { status: 500 });
  }

  const body = await req.json();
  console.log('Received body:', body);
  const { name, email, phone, industry, company, agent } = body;
  console.log('Extracted fields:', { name, email, phone, industry, company, agent });

  if (!name || !email || !phone || !industry || !company || !agent) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const override_agent_id = AGENT_IDS[agent];
  if (!override_agent_id) {
    console.log('Unknown agent:', agent);
    console.log('Available agents:', Object.keys(AGENT_IDS));
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

  console.log('Sending to Retell:', payload);
  console.log('Retell API Key exists:', !!apiKey);

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
    console.log('Retell response:', data);
    if (!retellRes.ok) {
      console.log('Retell error status:', retellRes.status);
      console.log('Retell error data:', data);
      return NextResponse.json({ error: data }, { status: retellRes.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
