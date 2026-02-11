-- Auto-generated schema from exported data

-- home_content
CREATE TABLE IF NOT EXISTS home_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title VARCHAR(500),
  hero_title_accent VARCHAR(500),
  hero_subtitle VARCHAR(500),
  hero_cta_text VARCHAR(500),
  hero_cta_link VARCHAR(500),
  hero_background_image VARCHAR(500),
  featured_video_id VARCHAR(500),
  marquee_items JSONB,
  studio_title VARCHAR(500),
  studio_title_accent VARCHAR(500),
  studio_subtitle VARCHAR(500),
  quote_text VARCHAR(500),
  quote_accent VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  featured_video_thumbnail VARCHAR(500),
  hero_background_image_mobile VARCHAR(500),
  hero_focal_x DECIMAL,
  hero_focal_y DECIMAL,
  featured_thumbnail_mobile VARCHAR(500),
  featured_focal_x DECIMAL,
  featured_focal_y DECIMAL,
  hero_focal_x_mobile DECIMAL,
  hero_focal_y_mobile DECIMAL,
  featured_focal_x_mobile DECIMAL,
  featured_focal_y_mobile DECIMAL
);

-- gallery_images
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url VARCHAR(500),
  image_url_mobile TEXT,
  alt VARCHAR(500),
  alt_fr TEXT,
  focal_x DECIMAL,
  focal_y DECIMAL,
  focal_x_mobile DECIMAL,
  focal_y_mobile DECIMAL,
  "order" INTEGER,
  created_at TIMESTAMP,
  link_url VARCHAR(500)
);

-- shows
CREATE TABLE IF NOT EXISTS shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id VARCHAR(500),
  thumbnail VARCHAR(500),
  title VARCHAR(500),
  category VARCHAR(500),
  "order" INTEGER,
  created_at TIMESTAMP,
  thumbnail_mobile VARCHAR(500),
  focal_x DECIMAL,
  focal_y DECIMAL,
  focal_x_mobile DECIMAL,
  focal_y_mobile DECIMAL,
  title_fr TEXT,
  category_fr TEXT
);

-- shows_content
CREATE TABLE IF NOT EXISTS shows_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500),
  subtitle VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- roles
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500),
  type VARCHAR(500),
  description VARCHAR(500),
  "order" INTEGER,
  created_at TIMESTAMP,
  title_fr TEXT,
  type_fr TEXT,
  description_fr TEXT
);

-- join_content
CREATE TABLE IF NOT EXISTS join_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500),
  title_accent VARCHAR(500),
  subtitle VARCHAR(500),
  pitch_title VARCHAR(500),
  pitch_title_accent VARCHAR(500),
  pitch_subtitle VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- contact_content
CREATE TABLE IF NOT EXISTS contact_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_title VARCHAR(500),
  info_title VARCHAR(500),
  info_title_accent VARCHAR(500),
  info_subtitle VARCHAR(500),
  contact_email VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- navigation
CREATE TABLE IF NOT EXISTS navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(500),
  href VARCHAR(500),
  "order" INTEGER,
  created_at TIMESTAMP
);

-- social_links
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label VARCHAR(500),
  href VARCHAR(500),
  icon VARCHAR(500),
  "order" INTEGER,
  created_at TIMESTAMP
);

-- site_settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name VARCHAR(500),
  site_description VARCHAR(500),
  logo_url VARCHAR(500),
  ink_color VARCHAR(500),
  cream_color VARCHAR(500),
  red_color VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  logo_url_mobile TEXT,
  logo_focal_x DECIMAL,
  logo_focal_y DECIMAL
);


-- Indexes
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images("order");
CREATE INDEX IF NOT EXISTS idx_shows_order ON shows("order");
CREATE INDEX IF NOT EXISTS idx_roles_order ON roles("order");
CREATE INDEX IF NOT EXISTS idx_navigation_order ON navigation("order");
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links("order");
