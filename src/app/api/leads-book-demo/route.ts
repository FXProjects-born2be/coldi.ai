import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { checkBotId } from 'botid/server';

import { areFormsEnabled } from '@/shared/lib/forms-status';

const HUBSPOT_FORMS_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit/146476440/fc8302ca-aa67-4e59-a6e6-e69bc1d0cd46';

const BOTID_ENABLED = true;

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';

  if (BOTID_ENABLED) {
    const verification = await checkBotId({
      developmentOptions: { bypass: 'HUMAN' },
    });
    if (verification.isBot) {
      console.warn('[LEADS-BOOK-DEMO] Blocked bot', { ip, userAgent });
      return NextResponse.json({ error: 'Bot detected. Access denied.' }, { status: 403 });
    }
  }

  const formsEnabled = await areFormsEnabled();
  if (!formsEnabled) {
    return NextResponse.json(
      { error: 'Form submissions are currently disabled. Please try again later.' },
      { status: 503 }
    );
  }

  let body: { name?: string; surname?: string; phone?: string; email?: string; sector?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const surname = typeof body.surname === 'string' ? body.surname.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const sector = typeof body.sector === 'string' ? body.sector.trim() : '';

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
  }

  const hubspotutk = req.cookies.get('hubspotutk')?.value || '';
  let city = 'unknown';
  try {
    const response = await fetch(
      'https://api.ipdata.co?api-key=d44bfbc4443b29d45d5d1fe1694e3f4c6f17d6e4d00f2bb6f0838569'
    );
    const data = await response.json();
    city = data.city ?? city;
  } catch {
    // ignore
  }

  const refererHeader = req.headers.get('referer') || 'https://coldi.ai';
  const lastSegment = refererHeader.split('/').pop() || 'coldi';
  const pageName =
    lastSegment.split('-').join(' ').charAt(0).toUpperCase() +
    lastSegment.split('-').join(' ').slice(1);

  const fields: { name: string; value: string }[] = [
    { name: 'firstname', value: name },
    { name: 'lastname', value: surname },
    { name: 'email', value: email },
    { name: 'phone', value: phone },
    { name: 'ip_city2', value: city },
  ];
  if (sector) {
    fields.push({ name: 'sector', value: sector });
  }

  const context: { pageUri: string; pageName: string; hutk?: string } = {
    pageUri: refererHeader,
    pageName,
  };
  if (hubspotutk) context.hutk = hubspotutk;

  const formData = {
    fields,
    context,
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to terms',
      },
    },
  };

  try {
    const hubspotRes = await fetch(HUBSPOT_FORMS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await hubspotRes.json();
    if (!hubspotRes.ok) {
      console.error('[LEADS-BOOK-DEMO] HubSpot error:', hubspotRes.status, data);
      return NextResponse.json({ error: data }, { status: hubspotRes.status });
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[LEADS-BOOK-DEMO] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
