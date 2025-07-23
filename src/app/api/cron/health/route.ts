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
    const { data, error } = await supabase.from('posts').select('id').limit(1);

    if (error) throw error;

    return NextResponse.json({ status: 'success', data });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
