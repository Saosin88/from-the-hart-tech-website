// Content Configuration
// This file defines schemas and settings for content collections managed by Nuxt Content

import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  // Collections Definition
  // Organizes content into named groups with specific validation rules
  collections: {
    // Blog Collection
    // Handles all blog post content with strict type validation
    blog: defineCollection({
      source: 'blog/*.md', // Source glob pattern for markdown files
      type: 'page', // Content type for rendering
      schema: z.object({
        // Basic Post Metadata
        title: z.string(), // Post title (required)
        description: z.string(), // Post summary/description (required)
        date: z.date(), // Publication date with automatic parsing
        toc: z.boolean(), // Whether to display table of contents
        keywords: z.string(), // SEO keywords as comma-separated string

        // SEO Configuration
        robots: z.string(), // Search engine crawling directives
        author: z.string(), // Content author name

        // Open Graph Metadata
        // Used for social media sharing previews
        ogTitle: z.string(), // OG-specific title
        ogDescription: z.string(), // OG-specific description
        ogImage: z.string(), // Preview image URL
        ogUrl: z.string(), // Canonical URL

        // Twitter Card Metadata
        // Controls how content appears when shared on Twitter
        twitterTitle: z.string(), // Twitter-specific title
        twitterDescription: z.string(), // Twitter-specific description
        twitterImage: z.string(), // Twitter preview image URL
        twitterCard: z.string(), // Card type (summary, summary_large_image)
        twitterSite: z.string(), // Site's Twitter handle
        twitterCreator: z.string(), // Author's Twitter handle
      }),
    }),
  },
})
