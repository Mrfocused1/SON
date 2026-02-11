// Server-side data fetching for homepage
import { sql } from '@vercel/postgres';

export async function getHomePageData() {
  try {
    // Fetch all data in parallel
    const [homeResult, capsResult, galleryResult] = await Promise.all([
      sql.query('SELECT * FROM home_content ORDER BY created_at DESC LIMIT 1'),
      sql.query('SELECT * FROM capabilities ORDER BY "order" ASC'),
      sql.query('SELECT * FROM gallery_images ORDER BY "order" ASC'),
    ]);

    const homeData = homeResult.rows[0];
    const capabilities = capsResult.rows;
    const galleryImages = galleryResult.rows;

    return {
      homeContent: homeData ? {
        heroTitle: homeData.hero_title || "",
        heroTitleAccent: homeData.hero_title_accent || "",
        heroSubtitle: homeData.hero_subtitle || "",
        heroCtaText: homeData.hero_cta_text || "",
        heroCtaLink: homeData.hero_cta_link || "/shows",
        heroBackgroundImage: homeData.hero_background_image || "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        heroBackgroundImageMobile: homeData.hero_background_image_mobile || null,
        heroFocalX: homeData.hero_focal_x ?? 0.5,
        heroFocalY: homeData.hero_focal_y ?? 0.5,
        heroFocalXMobile: homeData.hero_focal_x_mobile ?? 0.5,
        heroFocalYMobile: homeData.hero_focal_y_mobile ?? 0.5,
        featuredVideoId: homeData.featured_video_id || "hSiSKAgO3mM",
        featuredVideoThumbnail: homeData.featured_video_thumbnail || "",
        featuredThumbnailMobile: homeData.featured_thumbnail_mobile || null,
        featuredFocalX: homeData.featured_focal_x ?? 0.5,
        featuredFocalY: homeData.featured_focal_y ?? 0.5,
        featuredFocalXMobile: homeData.featured_focal_x_mobile ?? 0.5,
        featuredFocalYMobile: homeData.featured_focal_y_mobile ?? 0.5,
        marqueeItems: homeData.marquee_items || [],
        quoteText: homeData.quote_text || "",
        quoteAccent: homeData.quote_accent || "",
      } : null,
      capabilities: capabilities.map((cap: any) => ({
        title: cap.title,
        description: cap.description,
        icon: cap.icon || "Sparkles",
      })),
      galleryImages: galleryImages.map((img: any) => ({
        id: img.id,
        imageUrl: img.image_url,
        linkUrl: img.link_url || null,
      })),
    };
  } catch (error) {
    console.error("Error loading home page data:", error);
    return {
      homeContent: null,
      capabilities: [],
      galleryImages: [],
    };
  }
}
