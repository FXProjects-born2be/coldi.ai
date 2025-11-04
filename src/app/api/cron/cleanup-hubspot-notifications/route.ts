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
    // Delete all processed notifications older than 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    const { data: deletedProcessed, error: errorProcessed } = await supabase
      .from('hubspot_notifications')
      .delete()
      .eq('processed', true)
      .lt('updated_at', sevenDaysAgoISO)
      .select();

    if (errorProcessed) {
      console.error('Error cleaning up processed notifications:', errorProcessed);
      return NextResponse.json(
        { status: 'error', message: errorProcessed.message },
        { status: 500 }
      );
    }

    // Also delete old unprocessed notifications (older than 30 days) in case something went wrong
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoISO = thirtyDaysAgo.toISOString();

    const { data: deletedOld, error: errorOld } = await supabase
      .from('hubspot_notifications')
      .delete()
      .eq('processed', false)
      .lt('created_at', thirtyDaysAgoISO)
      .select();

    if (errorOld) {
      console.error('Error cleaning up old unprocessed notifications:', errorOld);
      return NextResponse.json({ status: 'error', message: errorOld.message }, { status: 500 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Cleanup completed',
      deletedProcessed: deletedProcessed?.length || 0,
      deletedOld: deletedOld?.length || 0,
    });
  } catch (error) {
    console.error('Cleanup cron job error:', error);
    return NextResponse.json(
      { status: 'error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
