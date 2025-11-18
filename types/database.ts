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
          notion_id: string | null;
          title: string;
          slug: string;
          categories: string[]; // 실제 DB: 배열 ["상간", "재산분할", "이혼"]
          badge: string | null;
          background: string;
          strategy: string;
          result: string;
          icon: string | null;
          published: boolean;
          views: number;
          sort_order: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          notion_id?: string | null;
          title: string;
          slug: string;
          categories?: string[];
          badge?: string | null;
          background: string;
          strategy: string;
          result: string;
          icon?: string | null;
          published?: boolean;
          views?: number;
          sort_order?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          notion_id?: string | null;
          title?: string;
          slug?: string;
          categories?: string[];
          badge?: string | null;
          background?: string;
          strategy?: string;
          result?: string;
          icon?: string | null;
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
          notion_id: string | null;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string;
          categories: string[]; // 실제 DB: 배열 ["양육권"]
          tags: string[];
          author: string;
          published: boolean;
          featured: boolean;
          views: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          notion_id?: string | null;
          slug: string;
          title: string;
          excerpt?: string | null;
          content: string;
          categories?: string[];
          tags?: string[];
          author?: string;
          published?: boolean;
          featured?: boolean;
          views?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          notion_id?: string | null;
          slug?: string;
          title?: string;
          excerpt?: string | null;
          content?: string;
          categories?: string[];
          tags?: string[];
          author?: string;
          published?: boolean;
          featured?: boolean;
          views?: number;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
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
