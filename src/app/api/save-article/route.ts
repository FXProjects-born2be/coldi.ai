import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const articles = await req.json();

    for (const article of articles) {
      const { originalArticle, title, image, tags } = article;

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // 1. Upload image to Supabase Storage if not already in storage
      let imageUrl = image;
      if (image && !image.startsWith(process.env.NEXT_PUBLIC_SUPABASE_URL!)) {
        const imgRes = await fetch(image);
        if (!imgRes.ok) throw new Error('Failed to fetch image');
        const imgBuffer = await imgRes.arrayBuffer();
        const fileName = `${Date.now()}-${slug}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, imgBuffer, { contentType: 'image/jpeg' });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Insert into posts table
      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          slug,
          content: originalArticle,
          image: imageUrl,
          tags: tags ?? '',
        },
      ]);
      if (insertError) throw insertError;
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
