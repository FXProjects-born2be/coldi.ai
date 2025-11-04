import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    // Calculate the time when this notification should be processed (30 seconds from now)
    const processAt = new Date(Date.now() + 30000).toISOString();

    // Save the task to database
    const { error } = await supabase.from('hubspot_notifications').insert([
      {
        email,
        name,
        process_at: processAt,
        processed: false,
      },
    ]);

    if (error) {
      console.error('Error saving notification task:', error);
      return NextResponse.json({ error: 'Failed to save notification task' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: 'Notification task scheduled' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error in check-hubspot-and-notify:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
