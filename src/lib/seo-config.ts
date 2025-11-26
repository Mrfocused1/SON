// SEO Configuration for SON Networks
// Targeting: French-speaking African entertainment in London/UK

export const siteConfig = {
  name: "SON Networks",
  tagline: "Maison de Production Digitale | Digital Production House",
  url: "https://sonnetworks.site",
  locale: "en_GB",
  alternateLocale: "fr_FR",

  // Core identity
  description: {
    en: "SON Networks creates captivating internet content for the French-speaking African diaspora in London and the UK. We transform chaotic ideas into refined, high-octane entertainment.",
    fr: "SON Networks crée du contenu internet captivant pour la diaspora africaine francophone à Londres et au Royaume-Uni. Nous transformons les idées chaotiques en divertissement raffiné et intense.",
  },

  // Social handles
  social: {
    youtube: "https://www.youtube.com/@sonnetworks",
    instagram: "https://www.instagram.com/sonnetworks",
    twitter: "https://twitter.com/sonnetworks",
    tiktok: "https://www.tiktok.com/@sonnetworks",
    facebook: "https://www.facebook.com/sonnetworks",
  },

  // Contact
  contact: {
    email: "contact@sonnetworks.site",
    location: "London, United Kingdom",
  },

  // Brand colors for theme-color meta
  themeColor: "#E53935", // tv-red
  backgroundColor: "#1a1a1a", // ink
};

// Comprehensive keyword strategy
export const keywords = {
  // Primary keywords (highest priority)
  primary: [
    "SON Networks",
    "African entertainment London",
    "French African content creators",
    "Francophone African media UK",
    "Divertissement africain Londres",
    "Production africaine francophone",
  ],

  // Secondary keywords (content-focused)
  secondary: [
    "African digital production",
    "African YouTube channels UK",
    "French African shows London",
    "Diaspora africaine francophone",
    "African content creation",
    "Contenu africain francophone",
    "African entertainment UK",
    "Production vidéo africaine",
  ],

  // Long-tail keywords (specific searches)
  longTail: [
    "French speaking African entertainment in London",
    "African francophone content creators UK",
    "Best African YouTube channels in UK",
    "Meilleur contenu africain francophone",
    "African diaspora entertainment London",
    "Production house for African creators",
    "African viral content London",
    "Divertissement diaspora africaine Londres",
    "African original series UK",
    "Séries originales africaines Londres",
  ],

  // Location keywords
  location: [
    "London",
    "UK",
    "United Kingdom",
    "Londres",
    "Royaume-Uni",
    "England",
    "Angleterre",
  ],

  // Industry keywords
  industry: [
    "digital production house",
    "video production",
    "content creation",
    "YouTube production",
    "social media content",
    "viral content",
    "entertainment production",
    "maison de production digitale",
    "production vidéo",
    "création de contenu",
  ],

  // Cultural keywords
  cultural: [
    "African culture",
    "Francophone Africa",
    "West African",
    "Central African",
    "African diaspora",
    "Afrique francophone",
    "Culture africaine",
    "Diaspora africaine",
    "Afropean",
    "Afro-European",
  ],
};

// Get all keywords as a flat array
export function getAllKeywords(): string[] {
  return [
    ...keywords.primary,
    ...keywords.secondary,
    ...keywords.longTail,
    ...keywords.location,
    ...keywords.industry,
    ...keywords.cultural,
  ];
}

// Get keywords for meta tags (limited to most important)
export function getMetaKeywords(): string[] {
  return [
    ...keywords.primary,
    ...keywords.secondary.slice(0, 6),
    ...keywords.longTail.slice(0, 4),
  ];
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: {
      en: "SON Networks | French African Entertainment & Digital Production London",
      fr: "SON Networks | Divertissement Africain Francophone & Production Digitale Londres",
    },
    description: {
      en: "SON Networks is London's premier digital production house for French-speaking African entertainment. Creating viral content, original series, and captivating shows for the African diaspora in the UK.",
      fr: "SON Networks est la première maison de production digitale à Londres pour le divertissement africain francophone. Création de contenu viral, séries originales et émissions captivantes pour la diaspora africaine au Royaume-Uni.",
    },
    keywords: [...keywords.primary, ...keywords.secondary],
  },

  shows: {
    title: {
      en: "Shows & Series | African Entertainment | SON Networks",
      fr: "Émissions & Séries | Divertissement Africain | SON Networks",
    },
    description: {
      en: "Watch our original African shows and series. From viral videos to original productions, discover French-speaking African entertainment created in London for the global diaspora.",
      fr: "Regardez nos émissions et séries africaines originales. Des vidéos virales aux productions originales, découvrez le divertissement africain francophone créé à Londres pour la diaspora mondiale.",
    },
    keywords: [
      "African shows London",
      "Émissions africaines",
      "African series UK",
      "Séries africaines",
      "French African YouTube",
      ...keywords.primary,
    ],
  },

  contact: {
    title: {
      en: "Contact SON Networks | African Content Production London",
      fr: "Contactez SON Networks | Production de Contenu Africain Londres",
    },
    description: {
      en: "Get in touch with SON Networks for collaborations, brand partnerships, and content production. Based in London, serving the French-speaking African diaspora worldwide.",
      fr: "Contactez SON Networks pour des collaborations, partenariats de marque et production de contenu. Basé à Londres, au service de la diaspora africaine francophone dans le monde.",
    },
    keywords: [
      "contact SON Networks",
      "African content collaboration",
      "brand partnership African",
      ...keywords.primary.slice(0, 4),
    ],
  },

  join: {
    title: {
      en: "Join Us | Work with SON Networks | African Creators London",
      fr: "Rejoignez-Nous | Travaillez avec SON Networks | Créateurs Africains Londres",
    },
    description: {
      en: "Join SON Networks and be part of London's leading French-African digital production house. We're looking for creators, producers, and talent to create amazing content.",
      fr: "Rejoignez SON Networks et faites partie de la principale maison de production digitale franco-africaine de Londres. Nous recherchons des créateurs, producteurs et talents.",
    },
    keywords: [
      "join SON Networks",
      "African creator jobs London",
      "content creator opportunities",
      "rejoignez SON Networks",
      ...keywords.primary.slice(0, 4),
    ],
  },
};

// JSON-LD Structured Data Templates
export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: ["SON Networks UK", "SON Networks London", "SON Networks Digital"],
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description.en,
    foundingLocation: {
      "@type": "Place",
      name: "London, United Kingdom",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "GeoCircle",
        name: "French-speaking African diaspora worldwide",
      },
    ],
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "GB",
      availableLanguage: ["English", "French"],
    },
    knowsLanguage: ["en", "fr"],
    slogan: "Prêt à tourner. Ready to roll.",
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description.en,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/shows?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-GB", "fr-FR"],
  },

  localBusiness: {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`,
    url: siteConfig.url,
    telephone: "",
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5074,
      longitude: -0.1278,
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(siteConfig.social),
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 51.5074,
        longitude: -0.1278,
      },
      geoRadius: "50000",
    },
    serviceType: [
      "Video Production",
      "Content Creation",
      "Digital Entertainment",
      "Social Media Production",
    ],
    knowsLanguage: ["en", "fr"],
  },
};

// Generate VideoObject schema for shows
export function generateVideoSchema(video: {
  title: string;
  description: string;
  videoId: string;
  thumbnail?: string;
  uploadDate?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    uploadDate: video.uploadDate || new Date().toISOString(),
    duration: video.duration || "PT10M",
    contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: `https://www.youtube.com/watch?v=${video.videoId}`,
    },
  };
}

// Generate BreadcrumbList schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
