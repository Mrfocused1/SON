// JSON-LD Structured Data Component
// Injects schema.org markup for better search engine understanding

import { structuredData, generateVideoSchema, generateBreadcrumbSchema, siteConfig } from "@/lib/seo-config";

interface JsonLdProps {
  type: "organization" | "website" | "localBusiness" | "video" | "breadcrumb" | "all";
  video?: {
    title: string;
    description: string;
    videoId: string;
    thumbnail?: string;
    uploadDate?: string;
    duration?: string;
  };
  breadcrumbs?: { name: string; url: string }[];
}

export function JsonLd({ type, video, breadcrumbs }: JsonLdProps) {
  const getSchema = () => {
    switch (type) {
      case "organization":
        return structuredData.organization;
      case "website":
        return structuredData.website;
      case "localBusiness":
        return structuredData.localBusiness;
      case "video":
        if (!video) return null;
        return generateVideoSchema(video);
      case "breadcrumb":
        if (!breadcrumbs) return null;
        return generateBreadcrumbSchema(breadcrumbs);
      case "all":
        return [
          structuredData.organization,
          structuredData.website,
          structuredData.localBusiness,
        ];
      default:
        return null;
    }
  };

  const schema = getSchema();
  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

// Video List Schema for Shows page
export function VideoListJsonLd({ videos }: {
  videos: Array<{
    title: string;
    description: string;
    videoId: string;
    thumbnail?: string;
    category?: string;
  }>
}) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SON Networks Shows & Videos",
    description: "Original African entertainment shows and videos by SON Networks",
    numberOfItems: videos.length,
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: generateVideoSchema({
        title: video.title,
        description: video.description || `Watch ${video.title} on SON Networks`,
        videoId: video.videoId,
        thumbnail: video.thumbnail,
      }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(itemListSchema),
      }}
    />
  );
}

// FAQ Schema for potential FAQ sections
export function FAQJsonLd({ faqs }: {
  faqs: Array<{ question: string; answer: string }>
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}

// Creative Work Series Schema for shows
export function CreativeWorkSeriesJsonLd({ series }: {
  series: {
    name: string;
    description: string;
    episodes: Array<{
      name: string;
      videoId: string;
      episodeNumber: number;
    }>;
  };
}) {
  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: series.name,
    description: series.description,
    producer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    episode: series.episodes.map((ep) => ({
      "@type": "Episode",
      name: ep.name,
      episodeNumber: ep.episodeNumber,
      url: `https://www.youtube.com/watch?v=${ep.videoId}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(seriesSchema),
      }}
    />
  );
}
