// Text and Date Formatting Utilities
// This file contains helper functions for consistent text and date formatting across the application

/**
 * Composable function that provides text and date formatting utilities
 * Used to standardize content display throughout the site
 */
export function useFormatters() {
  /**
   * Formats a date into a human-readable string (e.g., "Mar 8, 2025")
   *
   * @param dateInput - Date object or date string to format
   * @returns Formatted date string or empty string if input is invalid
   */
  function formatDate(dateInput: Date): string {
    // Return empty string for null/undefined dates
    if (!dateInput) return ''

    // Convert string dates to Date objects if needed
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    // Use Intl formatter for localized date display
    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC', // Use UTC to avoid timezone issues
    })

    return formatter.format(date)
  }

  /**
   * Formats a date in relative "ago" terms (e.g., "2 days ago")
   *
   * @param dateString - ISO date string to format
   * @returns Human-readable relative time string
   */
  const formatDateInAgoTerms = (dateString: string): string => {
    // Parse the input date and current time
    const date = new Date(dateString)
    const now = new Date()

    // Calculate difference in days
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    // Return appropriate relative time format based on time difference
    if (diffInDays === 0) return 'today'
    if (diffInDays === 1) return 'yesterday'
    if (diffInDays < 30) return `${diffInDays} days ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  /**
   * Truncates text to a specified number of words and adds ellipsis
   *
   * @param text - Text to truncate
   * @param wordLimit - Maximum number of words to include (default: 25)
   * @returns Truncated text with ellipsis or original text if under limit
   */
  function truncateDescription(text: string, wordLimit = 25): string {
    // Handle empty text
    if (!text) return ''

    // Split text into words and check if truncation is needed
    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  /**
   * Extracts unique keywords from a comma-separated string
   *
   * @param keywordStr - Comma-separated keywords string
   * @param limit - Maximum number of keywords to return (default: 5)
   * @returns Array of unique keywords, limited to specified count
   */
  function getUniqueKeywords(keywordStr: string, limit = 5): string[] {
    // Handle empty input
    if (!keywordStr || keywordStr.length === 0) {
      return []
    }

    // Split by comma, trim each keyword, and remove duplicates
    const uniqueKeywords = [...new Set(keywordStr.split(',').map(k => k.trim()))]

    // Return limited set of keywords
    return uniqueKeywords.slice(0, limit)
  }

  // Return the utility functions
  return {
    formatDate, // Standard date formatter
    formatDateInAgoTerms, // Relative time formatter
    truncateDescription, // Text truncation utility
    getUniqueKeywords, // Keyword extraction utility
  }
}
