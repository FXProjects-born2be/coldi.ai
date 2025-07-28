import { type NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Check if ID is a valid UUID or numeric ID
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    const isNumeric = !isNaN(parseInt(id));

    if (!isUUID && !isNumeric) {
      return NextResponse.json({ error: 'Invalid article ID format' }, { status: 400 });
    }

    // Delete from database using the ID as is (UUID or numeric)
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);

    if (deleteError) {
      console.error('Error deleting article:', deleteError);
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
