import { NextResponse } from 'next/server';

import { generateCsrfToken } from '@/shared/lib/csrf-tokens';

/**
 * GET /api/csrf-token
 * Returns a new CSRF token for the current session
 */
export async function GET(): Promise<NextResponse> {
  try {
    const token = await generateCsrfToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error('[CSRF-TOKEN] Error generating token:', error);
    return NextResponse.json({ error: 'Failed to generate security token' }, { status: 500 });
  }
}
