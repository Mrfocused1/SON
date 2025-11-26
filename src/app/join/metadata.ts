import type { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: pageSEO.join.title.en,
  description: pageSEO.join.description.en,
  keywords: pageSEO.join.keywords,

  alternates: {
    canonical: "/join",
    languages: {
      "en-GB": "/join",
      "fr-FR": "/join?lang=fr",
    },
  },

  openGraph: {
    title: pageSEO.join.title.en,
    description: pageSEO.join.description.en,
    url: `${siteConfig.url}/join`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-join.jpg`,
        width: 1200,
        height: 630,
        alt: "Join SON Networks - Work with African Creators London",
      },
    ],
  },

  twitter: {
    title: pageSEO.join.title.en,
    description: pageSEO.join.description.en,
    images: [`${siteConfig.url}/og-join.jpg`],
  },
};
