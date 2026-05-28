export interface BlogPost {
  path: string
  title: string
  description: string
  date: string
  formattedDate?: string
  keywords: string
  image: string
  author: string
  robots: string
  toc: boolean
  body: any
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterCard: string
  twitterSite: string
  twitterCreator: string
}

export interface BlogPostSummary {
  path: string
  title: string
  description: string
  date: string
  keywords: string
  image: string
  formattedDescription?: string
  formattedDate?: string
  uniqueKeywords?: string[]
}
