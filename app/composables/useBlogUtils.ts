import type { BlogPost, BlogPostDataObject } from '~/app/types/blog'

export function useBlogUtils() {
  function mapBlogPostDataArray(data?: BlogPostDataObject[], limit?: number): BlogPost[] | [] {
    if (!data) {
      return []
    }

    if (limit && limit > 0 && data.length > limit) {
      data = data.slice(0, limit)
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

  return {
    mapBlogPostDataArray,
    mapBlogPostData,
  }
}
