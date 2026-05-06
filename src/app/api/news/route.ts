import { NextResponse } from 'next/server';

import {
  createAdminSupabaseClient,
  hasMissingSeoColumnError,
  parseNewsFormData,
  uploadArticleImage,
} from './news-admin-shared';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const article = await parseNewsFormData(formData);
    const supabase = createAdminSupabaseClient();

    const imageUrl = article.imageFile
      ? await uploadArticleImage(article.imageFile, article.slug)
      : article.image || '';

    const primaryPayload = {
      title: article.title,
      slug: article.slug,
      content: article.content,
      image: imageUrl,
      category: article.category,
      seo_title: article.seo_title || article.title,
      seo_description: article.seo_description || '',
    };

    let { data, error } = await supabase.from('posts').insert([primaryPayload]).select().single();

    if (error && hasMissingSeoColumnError(error.message)) {
      ({ data, error } = await supabase
        .from('posts')
        .insert([
          {
            title: article.title,
            slug: article.slug,
            content: article.content,
            image: imageUrl,
            category: article.category,
          },
        ])
        .select()
        .single());
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
