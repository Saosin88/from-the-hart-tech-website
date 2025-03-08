// Blog Post Data Type Definitions
// This file contains type interfaces for handling blog post content throughout the application

/**
 * Raw Blog Post Data Object Interface
 * Represents the unprocessed blog post data as retrieved directly from the content system
 */
export interface BlogPostDataObject {
  path: string // URL path to the blog post
  title: string // Post title
  description: string // Post description/summary
  date: Date // Publication date
  keywords: string // Comma-separated keywords/tags
  author: string // Post author name
  toc: boolean // Whether post has a table of contents
  body: any // The main content body (varies based on content source)
}

/**
 * Processed Blog Post Interface
 * Represents a blog post after processing and formatting for display
 * Contains additional formatted fields derived from the raw data
 */
export interface BlogPost {
  path: string // URL path to the blog post
  title: string // Post title
  formattedDescription: string // Truncated/processed description
  formattedDate: string // Human-readable formatted date
  uniqueKeywords: string[] // Processed array of unique keywords
  author: string // Post author name
  toc: boolean // Whether post has a table of contents
  body: any // The main content body (varies based on content source)
}
