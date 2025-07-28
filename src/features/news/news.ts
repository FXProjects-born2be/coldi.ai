import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export const getNewsByCategory = async (category?: string): Promise<NewsArticle[]> => {
  try {
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });

    // If category is provided, filter by it
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching news:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getNewsByCategory:', error);
    throw error;
  }
};

export const getAllNews = async (): Promise<NewsArticle[]> => {
  return getNewsByCategory();
};

export const getNewsCategories = async (): Promise<string[]> => {
  try {
    console.log('Fetching categories...');

    const { data, error } = await supabase
      .from('posts')
      .select('category')
      .not('category', 'is', null);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    console.log('Raw data from Supabase:', data);
    console.log('Data length:', data?.length);

    // Extract unique categories
    const categories = [...new Set(data?.map((item) => item.category) || [])];
    console.log('Extracted categories:', categories);

    return categories;
  } catch (error) {
    console.error('Error in getNewsCategories:', error);
    throw error;
  }
};

export const getNewsById = async (id: string | number): Promise<NewsArticle | null> => {
  try {
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) {
      console.error('Error fetching news by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getNewsById:', error);
    throw error;
  }
};

export const getNewsBySlug = async (slug: string): Promise<NewsArticle | null> => {
  try {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();

    if (error) {
      console.error('Error fetching news by slug:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getNewsBySlug:', error);
    throw error;
  }
};
