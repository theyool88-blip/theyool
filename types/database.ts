/**
 * Supabase Database Types
 * 데이터베이스 스키마와 일치하는 TypeScript 타입 정의
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      consultations: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          category: string | null;
          message: string | null;
          status: 'pending' | 'in_progress' | 'completed';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          category?: string | null;
          message?: string | null;
          status?: 'pending' | 'in_progress' | 'completed';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          category?: string | null;
          message?: string | null;
          status?: 'pending' | 'in_progress' | 'completed';
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cases: {
        Row: {
          id: string;
          title: string;
          category: 'alimony' | 'property' | 'custody' | 'adultery';
          badge: string | null;
          background: string;
          strategy: string;
          result: string;
          icon: string | null;
          image_url: string | null;
          published: boolean;
          views: number;
          sort_order: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: 'alimony' | 'property' | 'custody' | 'adultery';
          badge?: string | null;
          background: string;
          strategy: string;
          result: string;
          icon?: string | null;
          image_url?: string | null;
          published?: boolean;
          views?: number;
          sort_order?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: 'alimony' | 'property' | 'custody' | 'adultery';
          badge?: string | null;
          background?: string;
          strategy?: string;
          result?: string;
          icon?: string | null;
          image_url?: string | null;
          published?: boolean;
          views?: number;
          sort_order?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          category: string | null;
          tags: string[];
          thumbnail_url: string | null;
          author: string;
          published: boolean;
          featured: boolean;
          views: number;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          category?: string | null;
          tags?: string[];
          thumbnail_url?: string | null;
          author?: string;
          published?: boolean;
          featured?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          category?: string | null;
          tags?: string[];
          thumbnail_url?: string | null;
          author?: string;
          published?: boolean;
          featured?: boolean;
          views?: number;
          created_at?: string;
          updated_at?: string;
          published_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
