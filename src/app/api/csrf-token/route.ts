import { NextResponse } from 'next/server';

import { generateCsrfToken } from '@/shared/lib/csrf-tokens';

/**
 * GET /api/csrf-token
 * Returns a new CSRF token for the current session
 */
export async function GET(): Promise<NextResponse> {
  const token = generateCsrfToken();

  return NextResponse.json({ token });
}
