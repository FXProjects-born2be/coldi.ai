import { type NextRequest, NextResponse } from 'next/server';

import {
  createAdminSupabaseClient,
  parseNewsFormData,
  uploadArticleImage,
} from '../news-admin-shared';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createAdminSupabaseClient();
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createAdminSupabaseClient();
    const { id } = await params;
    const formData = await req.formData();
    const article = await parseNewsFormData(formData);

    const imageUrl = article.imageFile
      ? await uploadArticleImage(article.imageFile, article.slug)
      : article.image || '';

    const { data, error } = await supabase
      .from('posts')
      .update({
        title: article.title,
        slug: article.slug,
        content: article.content,
        image: imageUrl,
        category: article.category,
        seo_title: article.seo_title || article.title,
        seo_description: article.seo_description || '',
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, article: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
