import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { createCanvas, loadImage } from 'canvas';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function to add watermark to image
async function addWatermark(imageBuffer: ArrayBuffer): Promise<Buffer> {
  const canvas = createCanvas(0, 0);
  const ctx = canvas.getContext('2d');

  // Load the original image
  const img = await loadImage(Buffer.from(imageBuffer));

  // Load the watermark image
  const watermark = await loadImage('./watermark.png');

  // Set canvas size to match image
  canvas.width = img.width;
  canvas.height = img.height;

  // Draw the original image
  ctx.drawImage(img, 0, 0);

  // Add watermark in top-left corner
  ctx.drawImage(watermark, 8, 8, 50, 21);

  // Convert canvas to buffer
  return canvas.toBuffer();
}

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

    // Convert file to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    // Add watermark to the image
    const watermarkedBuffer = await addWatermark(fileBuffer);

    // 1. Upload watermarked file to Supabase Storage
    const fileName = `${Date.now()}-${slug}.${file.name.split('.').pop()}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, watermarkedBuffer, { contentType: file.type });

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
