import { NextResponse } from 'next/server';

import { normalizeSlug, uploadArticleImage } from '../news-admin-shared';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('imageFile');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'article-inline-image';
    const imageUrl = await uploadArticleImage(file, normalizeSlug(baseName));

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
