import type { BlogPost, BlogPostDataObject, BlogPostSummary, BlogPostSummaryDataObject } from '~/app/types/blog'

export function useBlogUtils() {
  function mapBlogPostDataArray(data: BlogPostSummaryDataObject[]): BlogPostSummary[] {
    if (!data) {
      return []
    }

    return data.map(item => ({
      ...item,
      formattedDescription: useFormatters().truncateDescription(item.description, 25),
      formattedDate: useFormatters().formatDate(item.date),
      uniqueKeywords: useFormatters().getUniqueKeywords(item.keywords, 5),
    }))
  }

  function mapBlogPostData(data?: BlogPostDataObject): BlogPost | null {
    if (!data) {
      return null
    }

    return {
      ...data,
      formattedDescription: useFormatters().truncateDescription(data.description, 25),
      formattedDate: useFormatters().formatDate(data.date),
      uniqueKeywords: useFormatters().getUniqueKeywords(data.keywords, 5),
    }
  }

  async function fetchBlogPostsSummaries(limit = 0) {
    const { data } = await useAsyncData<BlogPostSummaryDataObject[]>('blog-posts-summary-list-limit-' + limit, () => {
      const query = queryCollection('blog').where('path', '<>', '/blog').select('path', 'title', 'description', 'date', 'keywords').order('date', 'DESC')

      if (limit > 0) {
        query.limit(limit)
      }

      return query.all()
    })

    let posts: BlogPostSummary[] = []

    if (data.value) {
      posts = mapBlogPostDataArray(data.value)
    }

    return posts
  }

  async function fetchBlogPost(path: string) {
    const { data } = await useAsyncData<BlogPostDataObject>(path, () => queryCollection('blog').path(path).first())

    let post = null
    if (data.value) {
      post = mapBlogPostData(data.value)
    }

    return post
  }

  return {
    mapBlogPostDataArray,
    mapBlogPostData,
    fetchBlogPostsSummaries,
    fetchBlogPost,
  }
}
