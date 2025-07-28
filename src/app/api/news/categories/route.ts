import { NextResponse } from 'next/server';

import { getNewsCategories } from '@/features/news/news';

export async function GET() {
  try {
    const categories = await getNewsCategories();

    return NextResponse.json({ success: true, data: categories });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
