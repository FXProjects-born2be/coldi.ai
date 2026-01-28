import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const metadata = formData.get('metadata') as string;

    if (!file || !metadata) {
      return NextResponse.json({ error: 'Missing file or metadata' }, { status: 400 });
    }

    const article = JSON.parse(metadata);
    const { originalArticle, title, category } = article;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // 1. Upload file to Supabase Storage
    const fileName = `${Date.now()}-${slug}.${file.name.split('.').pop()}`;
    const fileBuffer = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, fileBuffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
    const imageUrl = publicUrlData.publicUrl;

    // 2. Insert into posts table
    const { error: insertError } = await supabase.from('posts').insert([
      {
        title,
        slug,
        content: originalArticle,
        image: imageUrl,
        category: category ?? '',
      },
    ]);
    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
