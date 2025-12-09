import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const now = new Date().toISOString();

    // Delete expired or verified codes
    const { data: deletedCodes, error: errorCodes } = await supabase
      .from('sms_verification_codes')
      .delete()
      .or(`expires_at.lt.${now},verified.eq.true`)
      .select();

    if (errorCodes) {
      console.error('Error cleaning up SMS codes:', errorCodes);
      return NextResponse.json({ status: 'error', message: errorCodes.message }, { status: 500 });
    }

    // Delete old rate limit records (older than 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const { data: deletedRateLimits, error: errorRateLimits } = await supabase
      .from('sms_rate_limits')
      .delete()
      .lt('updated_at', sevenDaysAgoISO)
      .select();

    if (errorRateLimits) {
      console.error('Error cleaning up SMS rate limits:', errorRateLimits);
      return NextResponse.json(
        { status: 'error', message: errorRateLimits.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'success',
      message: 'SMS codes cleanup completed',
      deletedCodes: deletedCodes?.length || 0,
      deletedRateLimits: deletedRateLimits?.length || 0,
    });
  } catch (error) {
    console.error('SMS codes cleanup cron job error:', error);
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
