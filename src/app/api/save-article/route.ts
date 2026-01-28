import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { checkBotId } from 'botid/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // Check for authorization first (if auth is provided and valid, bypass BotID)
    const authHeader = req.headers.get('authorization');
    const authToken = process.env.API_SECRET;
    const hasValidAuth = authToken && authHeader === `Bearer ${authToken}`;

    // Skip BotID check if:
    // 1. Valid auth token is provided (allows Postman/admin tools)
    // 2. Development environment
    // 3. Special header is set
    const skipBotId =
      hasValidAuth ||
      process.env.NODE_ENV === 'development' ||
      req.headers.get('x-skip-botid') === 'true';

    if (!skipBotId) {
      try {
        const verification = await checkBotId({
          developmentOptions: {
            bypass: 'HUMAN', // Allow in development
          },
        });

        // In production, if BotID detects bot, block the request
        if (verification.isBot) {
          console.warn('[Save Article] BotID detected bot', {
            ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
            userAgent: req.headers.get('user-agent') || 'unknown',
          });
          return NextResponse.json(
            {
              error: 'Bot detected. Access denied.',
              hint: 'Provide valid authorization token to bypass BotID check for admin endpoints.',
            },
            { status: 403 }
          );
        }
      } catch (botIdError) {
        console.error('[Save Article] BotID check error:', botIdError);
        // Continue with request if BotID check fails (don't block admin endpoints)
      }
    }

    // Check for authorization (required if SAVE_ARTICLE_SECRET or FORMS_CONTROL_SECRET is set)
    if (authToken && !hasValidAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
