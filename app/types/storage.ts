export type { Result } from './common'

export interface MediaMetadata {
  width?: number
  height?: number
  duration?: number
  [key: string]: any
}

export interface FileMetadata {
  file_url: string
  file_name: string
  size_bytes: number
  content_type: string
  media_type: string
  media_metadata?: MediaMetadata
  created_date: string
}

export interface StorageItem {
  resource_id: string
  name: string
  is_folder: boolean
  size_bytes: number
  content_type?: string
  media_type?: string
  created_date: string
}

export interface StorageListResponse {
  items: StorageItem[]
  next_cursor?: string
}

export interface StorageAccessResponse {
  expires_at: number
}
