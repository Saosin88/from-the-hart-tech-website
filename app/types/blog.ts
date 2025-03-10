export interface BlogPostDataObject {
  path: string
  title: string
  description: string
  date: Date
  keywords: string
  author: string
  toc: boolean
  body: any
}

export interface BlogPostSummaryDataObject {
  path: string
  title: string
  description: string
  date: Date
  keywords: string
}

export interface BlogPost {
  path: string
  title: string
  formattedDescription: string
  formattedDate: string
  uniqueKeywords: string[]
  author: string
  toc: boolean
  body: any
}

export interface BlogPostSummary {
  path: string
  title: string
  formattedDescription: string
  formattedDate: string
  uniqueKeywords: string[]
}
