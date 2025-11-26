import type { Metadata } from "next";
import { pageSEO, siteConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: pageSEO.contact.title.en,
  description: pageSEO.contact.description.en,
  keywords: pageSEO.contact.keywords,

  alternates: {
    canonical: "/contact",
    languages: {
      "en-GB": "/contact",
      "fr-FR": "/contact?lang=fr",
    },
  },

  openGraph: {
    title: pageSEO.contact.title.en,
    description: pageSEO.contact.description.en,
    url: `${siteConfig.url}/contact`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact SON Networks - African Content Production London",
      },
    ],
  },

  twitter: {
    title: pageSEO.contact.title.en,
    description: pageSEO.contact.description.en,
    images: [`${siteConfig.url}/og-contact.jpg`],
  },
};
