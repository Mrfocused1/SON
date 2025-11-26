import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo-config";

// Dynamic robots.txt generation for SEO
// This will be served at /robots.txt

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/_next/*",
          "/private/*",
        ],
      },
      // Specific rules for major search engines
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api/*"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Video",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api/*"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/admin", "/api/*"],
      },
      // Social media crawlers
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
