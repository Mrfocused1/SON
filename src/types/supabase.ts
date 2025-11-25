// Supabase Database Types
// These types should match your Supabase tables

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
      site_settings: {
        Row: {
          id: string;
          site_name: string;
          site_description: string;
          logo_url: string;
          ink_color: string;
          cream_color: string;
          red_color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          site_name: string;
          site_description: string;
          logo_url: string;
          ink_color?: string;
          cream_color?: string;
          red_color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          site_name?: string;
          site_description?: string;
          logo_url?: string;
          ink_color?: string;
          cream_color?: string;
          red_color?: string;
          updated_at?: string;
        };
      };
      home_content: {
        Row: {
          id: string;
          hero_title: string;
          hero_title_accent: string;
          hero_subtitle: string;
          hero_cta_text: string;
          hero_cta_link: string;
          hero_background_image: string;
          featured_video_id: string;
          marquee_items: string[];
          studio_title: string;
          studio_title_accent: string;
          studio_subtitle: string;
          quote_text: string;
          quote_accent: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_title: string;
          hero_title_accent: string;
          hero_subtitle: string;
          hero_cta_text: string;
          hero_cta_link: string;
          hero_background_image: string;
          featured_video_id: string;
          marquee_items: string[];
          studio_title: string;
          studio_title_accent: string;
          studio_subtitle: string;
          quote_text: string;
          quote_accent: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          hero_title?: string;
          hero_title_accent?: string;
          hero_subtitle?: string;
          hero_cta_text?: string;
          hero_cta_link?: string;
          hero_background_image?: string;
          featured_video_id?: string;
          marquee_items?: string[];
          studio_title?: string;
          studio_title_accent?: string;
          studio_subtitle?: string;
          quote_text?: string;
          quote_accent?: string;
          updated_at?: string;
        };
      };
      capabilities: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon: string;
          order: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          description?: string;
          icon?: string;
          order?: number;
        };
      };
      shows: {
        Row: {
          id: string;
          video_id: string;
          thumbnail: string;
          title: string;
          category: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          video_id: string;
          thumbnail: string;
          title: string;
          category: string;
          order: number;
          created_at?: string;
        };
        Update: {
          video_id?: string;
          thumbnail?: string;
          title?: string;
          category?: string;
          order?: number;
        };
      };
      roles: {
        Row: {
          id: string;
          title: string;
          type: string;
          description: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          type: string;
          description: string;
          order: number;
          created_at?: string;
        };
        Update: {
          title?: string;
          type?: string;
          description?: string;
          order?: number;
        };
      };
      navigation: {
        Row: {
          id: string;
          label: string;
          href: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          href: string;
          order: number;
          created_at?: string;
        };
        Update: {
          label?: string;
          href?: string;
          order?: number;
        };
      };
      social_links: {
        Row: {
          id: string;
          label: string;
          href: string;
          icon: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          href: string;
          icon: string;
          order: number;
          created_at?: string;
        };
        Update: {
          label?: string;
          href?: string;
          icon?: string;
          order?: number;
        };
      };
      studio_images: {
        Row: {
          id: string;
          image_url: string;
          alt: string;
          order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          alt: string;
          order: number;
          created_at?: string;
        };
        Update: {
          image_url?: string;
          alt?: string;
          order?: number;
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

// Convenience types
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type HomeContent = Database["public"]["Tables"]["home_content"]["Row"];
export type Capability = Database["public"]["Tables"]["capabilities"]["Row"];
export type Show = Database["public"]["Tables"]["shows"]["Row"];
export type Role = Database["public"]["Tables"]["roles"]["Row"];
export type Navigation = Database["public"]["Tables"]["navigation"]["Row"];
export type SocialLink = Database["public"]["Tables"]["social_links"]["Row"];
export type StudioImage = Database["public"]["Tables"]["studio_images"]["Row"];
