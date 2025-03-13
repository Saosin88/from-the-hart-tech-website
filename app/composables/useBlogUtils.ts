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
    const { data } = await useAsyncData<BlogPostSummary[]>('blog-posts-summary-list-limit-' + limit, () => {
      const query = queryCollection('blog').where('path', '<>', '/blog').select('path', 'title', 'description', 'date', 'keywords', 'image').order('date', 'DESC')

      if (limit > 0) {
        query.limit(limit)
      }

      return query.all()
    })

    let posts: BlogPostSummary[] = []

    if (data.value) {
      posts = mapBlogPostSummary(data.value)
    }

    return posts
  }

  async function fetchBlogPost(path: string) {
    const { data } = await useAsyncData<BlogPost>(path, () => queryCollection('blog').path(path).first())

    let post = null
    if (data.value) {
      post = data.value
      post.formattedDate = useFormatters().formatDate(post.date)
    }

    return post
  }

  return {
    fetchBlogPostsSummaries,
    fetchBlogPost,
  }
}
