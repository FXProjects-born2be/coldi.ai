import { NextResponse } from 'next/server';

import type { InteractionProof } from '@/shared/lib/security/form-token';
import { finalizeToken } from '@/shared/lib/security/form-token';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as {
      preToken?: string;
      interactions?: InteractionProof;
    };

    if (!body.preToken || typeof body.preToken !== 'string') {
      return NextResponse.json({ error: 'preToken is required' }, { status: 400 });
    }

    if (!body.interactions || typeof body.interactions !== 'object') {
      return NextResponse.json({ error: 'interactions proof is required' }, { status: 400 });
    }

    const result = finalizeToken(body.preToken, body.interactions);

    if ('error' in result) {
      console.warn('[FORM-TOKEN] Finalize rejected:', {
        error: result.error,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      });
      return NextResponse.json({ error: result.error }, { status: 403 });
    }

    return NextResponse.json({ formToken: result.token });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
