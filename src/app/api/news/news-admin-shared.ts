import { createClient } from '@supabase/supabase-js';

export const createAdminSupabaseClient = () =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const parseNewsFormData = async (formData: FormData) => {
  const rawData = formData.get('data');

  if (typeof rawData !== 'string') {
    throw new Error('Missing article data');
  }

  const payload = JSON.parse(rawData) as {
    title: string;
    slug?: string;
    category: string;
    content: string;
    image?: string;
    seo_title?: string;
    seo_description?: string;
  };

  const file = formData.get('imageFile');
  const imageFile = file instanceof File && file.size > 0 ? file : null;

  return {
    ...payload,
    slug: normalizeSlug(payload.slug || payload.title),
    imageFile,
  };
};

export const uploadArticleImage = async (file: File, slug: string) => {
  const supabase = createAdminSupabaseClient();
  const extension = file.name.split('.').pop() || 'png';
  const fileName = `${Date.now()}-${slug}.${extension}`;
  const fileBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, fileBuffer, { contentType: file.type });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName);

  return data.publicUrl;
};

export const hasMissingSeoColumnError = (message: string) =>
  /seo_title|seo_description/i.test(message) && /(could not find|column)/i.test(message);

export const hasMissingColumnError = (message: string, column: string) =>
  new RegExp(column, 'i').test(message) && /(could not find|column)/i.test(message);
