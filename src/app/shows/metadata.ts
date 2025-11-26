import type { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: pageSEO.shows.title.en,
  description: pageSEO.shows.description.en,
  keywords: pageSEO.shows.keywords,

  alternates: {
    canonical: "/shows",
    languages: {
      "en-GB": "/shows",
      "fr-FR": "/shows?lang=fr",
    },
  },

  openGraph: {
    title: pageSEO.shows.title.en,
    description: pageSEO.shows.description.en,
    url: `${siteConfig.url}/shows`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-shows.jpg`,
        width: 1200,
        height: 630,
        alt: "SON Networks Shows - African Entertainment",
      },
    ],
  },

  twitter: {
    title: pageSEO.shows.title.en,
    description: pageSEO.shows.description.en,
    images: [`${siteConfig.url}/og-shows.jpg`],
  },
};
