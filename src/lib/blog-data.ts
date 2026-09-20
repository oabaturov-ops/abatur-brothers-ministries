import { supabase } from '@/lib/supabase'

// Строка списка (без полного текста — он не нужен в перечне)
export interface BlogPostList {
  slug: string
  titleRu: string
  titleEn: string
  excerptRu: string
  excerptEn: string
  categoryRu: string
  categoryEn: string
  readTime: string
  date: string
}

// Полная статья (список + текст) — для страницы /blog/[slug]
export interface BlogPost extends BlogPostList {
  contentRu: string
  contentEn: string
}

// Все опубликованные статьи (для списка блога)
export async function fetchPosts(): Promise<BlogPostList[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title_ru, title_en, excerpt_ru, excerpt_en, category_ru, category_en, read_time, created_at')
    .eq('published', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('fetchPosts error:', error)
    return []
  }

  return (data || []).map((r: Record<string, string>) => ({
    slug: r.slug,
    titleRu: r.title_ru || '',
    titleEn: r.title_en || '',
    excerptRu: r.excerpt_ru || '',
    excerptEn: r.excerpt_en || '',
    categoryRu: r.category_ru || '',
    categoryEn: r.category_en || '',
    readTime: r.read_time || '',
    date: (r.created_at || '').slice(0, 10),
  }))
}

// Одна статья по адресу (для страницы /blog/[slug])
export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('slug, title_ru, title_en, excerpt_ru, excerpt_en, content_ru, content_en, category_ru, category_en, read_time, created_at')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('fetchPostBySlug error:', error)
    return null
  }
  if (!data) return null

  const r = data as Record<string, string>
  return {
    slug: r.slug,
    titleRu: r.title_ru || '',
    titleEn: r.title_en || '',
    excerptRu: r.excerpt_ru || '',
    excerptEn: r.excerpt_en || '',
    contentRu: r.content_ru || '',
    contentEn: r.content_en || '',
    categoryRu: r.category_ru || '',
    categoryEn: r.category_en || '',
    readTime: r.read_time || '',
    date: (r.created_at || '').slice(0, 10),
  }
}