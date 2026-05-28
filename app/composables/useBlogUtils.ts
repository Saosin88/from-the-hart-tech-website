import type { BlogPost, BlogPostSummary } from '~/app/types/blog'

export function useBlogUtils() {
  function mapBlogPostSummary(data: BlogPostSummary[]): BlogPostSummary[] {
    if (!data) {
      return []
    }

    return data.map(item => ({
      ...item,
      formattedDescription: useFormatters().truncateDescription(item.description, 40),
      formattedDate: useFormatters().formatDate(item.date),
      uniqueKeywords: useFormatters().getUniqueKeywords(item.keywords, 7),
    }))
  }

  async function fetchBlogPostsSummaries(limit = 0) {
    const query = queryCollection('blog').where('path', '<>', '/blog').select('path', 'title', 'description', 'date', 'keywords', 'image').order('date', 'DESC')

    if (limit > 0) {
      query.limit(limit)
    }

    const items = await query.all() as BlogPostSummary[]
    return mapBlogPostSummary(items)
  }

  async function fetchBlogPost(path: string): Promise<BlogPost | null> {
    const item = await queryCollection('blog').path(path).first() as BlogPost | null
    if (item) {
      item.formattedDate = useFormatters().formatDate(item.date)
    }
    return item
  }

  return {
    fetchBlogPostsSummaries,
    fetchBlogPost,
  }
}
