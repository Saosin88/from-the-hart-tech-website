export function useFormatters() {
  function formatDate(dateInput: Date): string {
    if (!dateInput) return ''

    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })

    return formatter.format(date)
  }

  const formatDateInAgoTerms = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()

    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'today'
    if (diffInDays === 1) return 'yesterday'
    if (diffInDays < 30) return `${diffInDays} days ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  function truncateDescription(text: string, wordLimit = 25): string {
    if (!text) return ''

    const words = text.split(' ')
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...'
    }
    return text
  }

  function getUniqueKeywords(keywordStr: string, limit = 5): string[] {
    if (!keywordStr || keywordStr.length === 0) {
      return []
    }

    const uniqueKeywords = [...new Set(keywordStr.split(',').map(k => k.trim()))]

    return uniqueKeywords.slice(0, limit)
  }

  function getLanguageColour(language: string | null, fallback: string = '#888'): string {
    const languageColours: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Vue: '#41b883',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Java: '#b07219',
      PHP: '#4F5D95',
      'C#': '#178600',
      Ruby: '#701516',
      HCL: '#844FBA',
    }

    if (!language) return fallback
    return languageColours[language] || fallback
  }

  function isValidEmail(email: string): boolean {
    if (!email) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return {
    formatDate,
    formatDateInAgoTerms,
    truncateDescription,
    getUniqueKeywords,
    getLanguageColour,
    isValidEmail,
  }
}
