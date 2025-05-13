
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          title: string
          tagline?: string
          description: string
          thumbnail: string
          banner?: string
          genre: string[]
          platforms: string[]
          price: string | number
          releaseStatus: string
          views: number
          likes: number
          comments: number
          releaseDate: string
          mediaGallery?: string[]
          videoUrl?: string
          customTags?: string[]
          submitter_user_id: string
          createdAt: string
          updatedAt: string
          status: 'published' | 'pending' | 'rejected' | 'deleted'
          storeLink?: string
          developerLink?: string
        }
        Insert: {
          id?: string
          title: string
          tagline?: string
          description: string
          thumbnail: string
          banner?: string
          genre: string[]
          platforms: string[]
          price: string | number
          releaseStatus: string
          views?: number
          likes?: number
          comments?: number
          releaseDate?: string
          mediaGallery?: string[]
          videoUrl?: string
          customTags?: string[]
          submitter_user_id: string
          createdAt?: string
          updatedAt?: string
          status?: 'published' | 'pending' | 'rejected' | 'deleted'
          storeLink?: string
          developerLink?: string
        }
        Update: {
          id?: string
          title?: string
          tagline?: string
          description?: string
          thumbnail?: string
          banner?: string
          genre?: string[]
          platforms?: string[]
          price?: string | number
          releaseStatus?: string
          views?: number
          likes?: number
          comments?: number
          releaseDate?: string
          mediaGallery?: string[]
          videoUrl?: string
          customTags?: string[]
          submitter_user_id?: string
          createdAt?: string
          updatedAt?: string
          status?: 'published' | 'pending' | 'rejected' | 'deleted'
          storeLink?: string
          developerLink?: string
        }
      }
      users: {
        Row: {
          id: string
          username: string
          email: string
          avatarUrl?: string
          bio?: string
          createdAt: string
          updatedAt: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          avatarUrl?: string
          bio?: string
          createdAt?: string
          updatedAt?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          avatarUrl?: string
          bio?: string
          createdAt?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
