import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo-config";

// Dynamic sitemap generation for SEO
// This will be served at /sitemap.xml

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shows`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // French language variants
  const frenchPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}?lang=fr`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shows?lang=fr`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact?lang=fr`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/join?lang=fr`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // You can add dynamic pages from database here
  // Example: fetch shows from Supabase and add them as individual pages
  // const { data: shows } = await supabase.from('shows').select('video_id, title, updated_at');
  // const showPages = shows?.map(show => ({
  //   url: `${baseUrl}/shows/${show.video_id}`,
  //   lastModified: new Date(show.updated_at),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // })) || [];

  return [...staticPages, ...frenchPages];
}
