import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { VideoModal } from "@/components/VideoModal";
import { Preloader } from "@/components/Preloader";
import { PageTransition } from "@/components/PageTransition";
import { ScrollAnimations } from "@/components/ScrollAnimations";
import { VideoModalProvider } from "@/context/VideoModalContext";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { TransitionProvider } from "@/context/TransitionContext";
import { JsonLd } from "@/components/SEO/JsonLd";
import { siteConfig, getMetaKeywords, pageSEO } from "@/lib/seo-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: siteConfig.themeColor },
    { media: "(prefers-color-scheme: dark)", color: siteConfig.backgroundColor },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: pageSEO.home.title.en,
    template: "%s | SON Networks",
  },
  description: pageSEO.home.description.en,
  keywords: getMetaKeywords(),
  authors: [{ name: "SON Networks", url: siteConfig.url }],
  creator: "SON Networks",
  publisher: "SON Networks",

  // Favicon and icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: siteConfig.themeColor },
    ],
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Application name
  applicationName: siteConfig.name,

  // Referrer policy
  referrer: "origin-when-cross-origin",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/",
      "fr-FR": "/?lang=fr",
    },
  },

  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: pageSEO.home.title.en,
    description: pageSEO.home.description.en,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "SON Networks - French African Entertainment & Digital Production London",
        type: "image/jpeg",
      },
      {
        url: `${siteConfig.url}/og-image-square.jpg`,
        width: 1200,
        height: 1200,
        alt: "SON Networks Logo",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@sonnetworks",
    creator: "@sonnetworks",
    title: pageSEO.home.title.en,
    description: pageSEO.home.description.en,
    images: {
      url: `${siteConfig.url}/og-image.jpg`,
      alt: "SON Networks - French African Entertainment & Digital Production London",
    },
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code", // Replace with actual
    yandex: "your-yandex-verification-code", // Replace with actual
    // bing: "your-bing-verification-code",
  },

  // App links
  appLinks: {
    web: {
      url: siteConfig.url,
      should_fallback: true,
    },
  },

  // Category
  category: "entertainment",

  // Classification
  classification: "Entertainment, Media Production, Digital Content",

  // Other meta tags
  other: {
    // Dublin Core metadata for better indexing
    "DC.title": pageSEO.home.title.en,
    "DC.description": pageSEO.home.description.en,
    "DC.creator": "SON Networks",
    "DC.publisher": "SON Networks",
    "DC.language": "en-GB",
    "DC.subject": "African Entertainment, French African Content, Digital Production",
    "DC.coverage": "London, United Kingdom, Worldwide",

    // Geographic targeting
    "geo.region": "GB-LND",
    "geo.placename": "London",
    "geo.position": "51.5074;-0.1278",
    "ICBM": "51.5074, -0.1278",

    // Content language
    "content-language": "en, fr",

    // Rating
    "rating": "General",

    // Distribution
    "distribution": "Global",

    // Revisit after (for crawlers)
    "revisit-after": "7 days",

    // Pinterest
    "p:domain_verify": "your-pinterest-verification", // Replace with actual

    // Facebook
    "fb:app_id": "your-facebook-app-id", // Replace with actual

    // MS Application
    "msapplication-TileColor": siteConfig.themeColor,
    "msapplication-config": "/browserconfig.xml",

    // Format detection
    "format-detection": "telephone=no",

    // Mobile web app capable
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" prefix="og: https://ogp.me/ns#">
      <head>
        {/* Preconnect to important third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://images.pexels.com" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="en-GB" href={siteConfig.url} />
        <link rel="alternate" hrefLang="fr-FR" href={`${siteConfig.url}?lang=fr`} />
        <link rel="alternate" hrefLang="x-default" href={siteConfig.url} />

        {/* RSS/Atom feeds (if you add them later) */}
        {/* <link rel="alternate" type="application/rss+xml" title="SON Networks RSS Feed" href="/feed.xml" /> */}

        {/* JSON-LD Structured Data */}
        <JsonLd type="all" />
      </head>
      <body className={`${inter.variable} ${anton.variable} font-sans antialiased`}>
        <LanguageProvider>
          <PreloaderProvider>
            <TransitionProvider>
              <VideoModalProvider>
                <Preloader />
                <PageTransition />
                {/* <ScrollAnimations /> */}
                <CustomCursor />
                <VideoModal />
                <Navbar />
                <main className="pt-16 md:pt-20 overflow-x-hidden">
                  {children}
                </main>
                <Footer />
              </VideoModalProvider>
            </TransitionProvider>
          </PreloaderProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
