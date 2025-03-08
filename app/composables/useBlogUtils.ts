// Blog Post Data Processing Utilities
// This file contains helper functions for working with blog post data

import type { BlogPost, BlogPostDataObject } from '~/app/types/blog' // Import required type definitions

/**
 * Composable function that provides blog data transformation utilities
 * Used to standardize blog post formatting across the application
 */
export function useBlogUtils() {
  /**
   * Maps an array of raw blog post data objects to formatted blog posts
   *
   * @param data - Raw blog post data objects from the content system
   * @param limit - Optional limit to restrict number of returned posts
   * @returns Formatted blog posts array or empty array if no data
   */
  function mapBlogPostDataArray(data?: BlogPostDataObject[], limit?: number): BlogPost[] | [] {
    // Return empty array if no data is provided
    if (!data) {
      return []
    }

    // Apply optional post limit if specified
    if (limit && limit > 0 && data.length > limit) {
      data = data.slice(0, limit)
    }

    // Process each blog post with formatting utilities
    return data.map(item => ({
      ...item, // Preserve all original properties
      formattedDescription: useFormatters().truncateDescription(item.description, 25), // Truncate description to avoid lengthy previews
      formattedDate: useFormatters().formatDate(item.date), // Format date in a standardized way
      uniqueKeywords: useFormatters().getUniqueKeywords(item.keywords, 5), // Get unique keywords, limited to 5
    }))
  }

  /**
   * Maps a single raw blog post data object to a formatted blog post
   *
   * @param data - Single raw blog post data object
   * @returns Formatted blog post object or null if no data
   */
  function mapBlogPostData(data?: BlogPostDataObject): BlogPost | null {
    // Return null if no data is provided
    if (!data) {
      return null
    }

    // Process the blog post with formatting utilities
    return {
      ...data, // Preserve all original properties
      formattedDescription: useFormatters().truncateDescription(data.description, 25), // Truncate description
      formattedDate: useFormatters().formatDate(data.date), // Format date
      uniqueKeywords: useFormatters().getUniqueKeywords(data.keywords, 5), // Process keywords
    }
  }

  // Return the utility functions
  return {
    mapBlogPostDataArray, // Function to process multiple blog posts
    mapBlogPostData, // Function to process a single blog post
  }
}
