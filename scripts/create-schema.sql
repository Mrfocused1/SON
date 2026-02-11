-- Schema for SON Database Migration
-- Migrated from Supabase to Vercel Postgres

-- Home content table
CREATE TABLE IF NOT EXISTS home_content (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  subtitle TEXT,
  cta_text VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Capabilities table
CREATE TABLE IF NOT EXISTS capabilities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Studio images table
CREATE TABLE IF NOT EXISTS studio_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption VARCHAR(255),
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption VARCHAR(255),
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shows table
CREATE TABLE IF NOT EXISTS shows (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shows content table
CREATE TABLE IF NOT EXISTS shows_content (
  id SERIAL PRIMARY KEY,
  page_title VARCHAR(255),
  page_subtitle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Join content table
CREATE TABLE IF NOT EXISTS join_content (
  id SERIAL PRIMARY KEY,
  page_title VARCHAR(255),
  page_subtitle TEXT,
  intro_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact content table
CREATE TABLE IF NOT EXISTS contact_content (
  id SERIAL PRIMARY KEY,
  page_title VARCHAR(255),
  page_subtitle TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Navigation table
CREATE TABLE IF NOT EXISTS navigation (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon_name VARCHAR(50),
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255),
  logo_url TEXT,
  favicon_url TEXT,
  primary_color VARCHAR(7),
  secondary_color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_capabilities_order ON capabilities(display_order);
CREATE INDEX IF NOT EXISTS idx_studio_images_order ON studio_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_shows_order ON shows(display_order);
CREATE INDEX IF NOT EXISTS idx_roles_order ON roles(display_order);
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation(display_order);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(display_order);
