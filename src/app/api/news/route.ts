import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getNewsByCategory } from '@/features/news/news';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const news = await getNewsByCategory(category || undefined);

    return NextResponse.json({ success: true, data: news });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
