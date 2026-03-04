import { NextResponse } from 'next/server';

import { issuePreToken } from '@/shared/lib/security/form-token';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { formId } = (await request.json()) as { formId?: string };

    if (!formId || typeof formId !== 'string') {
      return NextResponse.json({ error: 'formId is required' }, { status: 400 });
    }

    const preToken = issuePreToken(formId);

    return NextResponse.json({ preToken });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
