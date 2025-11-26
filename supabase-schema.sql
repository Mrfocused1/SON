-- Supabase SQL Schema for SON Networks CMS
-- Run this in your Supabase SQL Editor to create the required tables

-- Site Settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'SON Networks',
  site_description TEXT NOT NULL DEFAULT 'SON Networks creates binge-worthy internet culture.',
  logo_url TEXT NOT NULL DEFAULT '',
  ink_color TEXT NOT NULL DEFAULT '#111111',
  cream_color TEXT NOT NULL DEFAULT '#F3F0E6',
  red_color TEXT NOT NULL DEFAULT '#FF3333',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Home Page Content
CREATE TABLE home_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT NOT NULL DEFAULT 'Ready',
  hero_title_accent TEXT NOT NULL DEFAULT 'To Roll.',
  hero_subtitle TEXT NOT NULL DEFAULT 'SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.',
  hero_cta_text TEXT NOT NULL DEFAULT 'Watch Shows',
  hero_cta_link TEXT NOT NULL DEFAULT '/shows',
  hero_background_image TEXT NOT NULL DEFAULT '',
  hero_background_image_mobile TEXT,
  hero_focal_x NUMERIC(3,2) DEFAULT 0.5,
  hero_focal_y NUMERIC(3,2) DEFAULT 0.5,
  hero_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
  hero_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5,
  featured_video_id TEXT NOT NULL DEFAULT 'hSiSKAgO3mM',
  featured_video_thumbnail TEXT DEFAULT '',
  featured_thumbnail_mobile TEXT,
  featured_focal_x NUMERIC(3,2) DEFAULT 0.5,
  featured_focal_y NUMERIC(3,2) DEFAULT 0.5,
  featured_focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
  featured_focal_y_mobile NUMERIC(3,2) DEFAULT 0.5,
  marquee_items TEXT[] NOT NULL DEFAULT ARRAY['Digital Production House', 'Original Series', 'Brand Stories', 'Viral Content'],
  studio_title TEXT NOT NULL DEFAULT 'We Don''t',
  studio_title_accent TEXT NOT NULL DEFAULT 'Play Safe.',
  studio_subtitle TEXT NOT NULL DEFAULT 'SON Networks is a new breed of production house. We combine cinematic quality with the pacing of internet culture.',
  quote_text TEXT NOT NULL DEFAULT 'We don''t chase trends.',
  quote_accent TEXT NOT NULL DEFAULT 'We set them.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capabilities
CREATE TABLE capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shows/Videos
CREATE TABLE shows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  thumbnail_mobile TEXT,
  focal_x NUMERIC(3,2) DEFAULT 0.5,
  focal_y NUMERIC(3,2) DEFAULT 0.5,
  focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
  focal_y_mobile NUMERIC(3,2) DEFAULT 0.5,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job Roles
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation Items
CREATE TABLE navigation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Link',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Studio Images (for the scrolling marquee)
CREATE TABLE studio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  image_url_mobile TEXT,
  focal_x NUMERIC(3,2) DEFAULT 0.5,
  focal_y NUMERIC(3,2) DEFAULT 0.5,
  focal_x_mobile NUMERIC(3,2) DEFAULT 0.5,
  focal_y_mobile NUMERIC(3,2) DEFAULT 0.5,
  alt TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Join Page Content
CREATE TABLE join_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Join The',
  title_accent TEXT NOT NULL DEFAULT 'Team.',
  subtitle TEXT NOT NULL DEFAULT 'We are always looking for editors, writers, and talent. If you have the sauce, we have the platform.',
  pitch_title TEXT NOT NULL DEFAULT 'Got An',
  pitch_title_accent TEXT NOT NULL DEFAULT 'Idea?',
  pitch_subtitle TEXT NOT NULL DEFAULT 'We want to hear your craziest concepts. Pitch us your show, series, or one-off video idea.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Page Content
CREATE TABLE contact_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_title TEXT NOT NULL DEFAULT 'Hit Us Up',
  info_title TEXT NOT NULL DEFAULT 'Let''s',
  info_title_accent TEXT NOT NULL DEFAULT 'Talk.',
  info_subtitle TEXT NOT NULL DEFAULT 'Whether you''re a brand looking to collaborate, a creator wanting to join, or just want to say hi.',
  contact_email TEXT NOT NULL DEFAULT 'hello@sonnetworks.com',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shows Page Content
CREATE TABLE shows_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Our Shows',
  subtitle TEXT NOT NULL DEFAULT 'Streaming now on YouTube. Click to watch.',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data
INSERT INTO site_settings (site_name, site_description, logo_url)
VALUES ('SON Networks', 'SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.', 'https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj');

INSERT INTO home_content (hero_title, hero_title_accent, hero_subtitle)
VALUES ('Ready', 'To Roll.', 'SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.');

INSERT INTO capabilities (title, description, icon, "order") VALUES
('Create', 'Bring your wildest ideas to life with us', 'Sparkles', 1),
('Collaborate', 'Join forces with our creative network', 'Users', 2),
('Innovate', 'Push boundaries and break the internet', 'Lightbulb', 3),
('Launch', 'Go viral and reach millions together', 'Rocket', 4);

INSERT INTO navigation (label, href, "order") VALUES
('Home', '/', 1),
('Shows', '/shows', 2),
('Join Us', '/join', 3),
('Contact Us', '/contact', 4);

INSERT INTO social_links (label, href, icon, "order") VALUES
('Instagram', 'https://instagram.com', 'Instagram', 1),
('Twitter', 'https://twitter.com', 'Twitter', 2),
('YouTube', 'https://www.youtube.com/sonnetworks', 'Youtube', 3);

INSERT INTO shows (video_id, thumbnail, title, category, "order") VALUES
('hSiSKAgO3mM', 'https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Studio Session', 'Behind The Scenes', 1),
('hSiSKAgO3mM', 'https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Content Creation', 'Viral Short', 2),
('hSiSKAgO3mM', 'https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Creative Process', 'Documentary', 3);

INSERT INTO roles (title, type, description, "order") VALUES
('Content Creator', 'Remote', 'Bring your unique voice and ideas to our network.', 1),
('Script Writer', 'LA / Hybrid', 'Comedy focused. Must be chronically online.', 2),
('On-Screen Talent', 'Flexible', 'Camera-ready personalities who can captivate audiences.', 3);

INSERT INTO studio_images (image_url, alt, "order") VALUES
('https://images.pexels.com/photos/8374522/pexels-photo-8374522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Studio image 1', 1),
('https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Studio image 2', 2),
('https://images.pexels.com/photos/7676502/pexels-photo-7676502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Studio image 3', 3),
('https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 'Studio image 4', 4);

INSERT INTO join_content DEFAULT VALUES;
INSERT INTO contact_content DEFAULT VALUES;
INSERT INTO shows_content DEFAULT VALUES;

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON home_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON capabilities FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON shows FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON roles FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON navigation FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON studio_images FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON join_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON contact_content FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON shows_content FOR SELECT USING (true);

-- Create policies for authenticated write access (admin only)
-- You'll need to set up authentication and add your admin user ID
-- For now, allowing all authenticated users to write
CREATE POLICY "Allow authenticated write" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON home_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON capabilities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON shows FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON roles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON navigation FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON studio_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON join_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON contact_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated write" ON shows_content FOR ALL USING (auth.role() = 'authenticated');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Allow public access to images
CREATE POLICY "Allow public image access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Allow authenticated image upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated image delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
