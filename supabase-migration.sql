-- Supabase Schema Migration for SON Networks CMS
-- Run this in your Supabase SQL Editor if you already have the old schema
-- This adds the missing responsive image and focal point fields

-- Add missing fields to home_content table
ALTER TABLE home_content
ADD COLUMN IF NOT EXISTS hero_background_image_mobile TEXT,
ADD COLUMN IF NOT EXISTS hero_focal_x NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS hero_focal_y NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS hero_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS hero_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS featured_video_thumbnail TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS featured_thumbnail_mobile TEXT,
ADD COLUMN IF NOT EXISTS featured_focal_x NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS featured_focal_y NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS featured_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS featured_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5;

-- Add missing fields to studio_images table
ALTER TABLE studio_images
ADD COLUMN IF NOT EXISTS image_url_mobile TEXT,
ADD COLUMN IF NOT EXISTS focal_x NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_y NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_y_mobile NUMERIC(3,2) DEFAULT 0.5;

-- Add missing fields to shows table
ALTER TABLE shows
ADD COLUMN IF NOT EXISTS thumbnail_mobile TEXT,
ADD COLUMN IF NOT EXISTS focal_x NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_y NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS focal_y_mobile NUMERIC(3,2) DEFAULT 0.5;

-- Set default values for existing rows
UPDATE home_content SET
  hero_focal_x = 0.5 WHERE hero_focal_x IS NULL,
  hero_focal_y = 0.5 WHERE hero_focal_y IS NULL,
  hero_focal_x_mobile = 0.5 WHERE hero_focal_x_mobile IS NULL,
  hero_focal_y_mobile = 0.5 WHERE hero_focal_y_mobile IS NULL,
  featured_focal_x = 0.5 WHERE featured_focal_x IS NULL,
  featured_focal_y = 0.5 WHERE featured_focal_y IS NULL,
  featured_focal_x_mobile = 0.5 WHERE featured_focal_x_mobile IS NULL,
  featured_focal_y_mobile = 0.5 WHERE featured_focal_y_mobile IS NULL;

UPDATE studio_images SET
  focal_x = 0.5 WHERE focal_x IS NULL,
  focal_y = 0.5 WHERE focal_y IS NULL,
  focal_x_mobile = 0.5 WHERE focal_x_mobile IS NULL,
  focal_y_mobile = 0.5 WHERE focal_y_mobile IS NULL;

UPDATE shows SET
  focal_x = 0.5 WHERE focal_x IS NULL,
  focal_y = 0.5 WHERE focal_y IS NULL,
  focal_x_mobile = 0.5 WHERE focal_x_mobile IS NULL,
  focal_y_mobile = 0.5 WHERE focal_y_mobile IS NULL;
