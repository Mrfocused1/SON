// Server Component - data fetched before rendering
import Image from "next/image";
import { ArrowUpRight, Sparkles, Users, Lightbulb, Rocket } from "lucide-react";
import { Marquee } from "@/components/Marquee";
import { TransitionLink } from "@/components/TransitionLink";
import { ResponsiveImage } from "@/components/ResponsiveImage";
import { FeaturedVideo } from "@/components/FeaturedVideo";
import { HeroVideoSection } from "@/components/HeroVideoSection";
import { getHomePageData } from "./page.server";

// Icon mapping for capabilities
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Users,
  Lightbulb,
  Rocket,
};

// Default fallback data
const defaultCapabilities = [
  { title: "Create", description: "Bring your wildest ideas to life with us", icon: "Sparkles" },
  { title: "Collaborate", description: "Join forces with our creative network", icon: "Users" },
  { title: "Innovate", description: "Push boundaries and break the internet", icon: "Lightbulb" },
  { title: "Launch", description: "Go viral and reach millions together", icon: "Rocket" },
];

// Translation keys (temporary - will be replaced with proper i18n later)
const t = {
  marquee: {
    production: "PRODUCTION",
    series: "SERIES",
    brand: "BRAND DEALS",
    viral: "VIRAL CONTENT",
  },
  hero: {
    title: "CONGOLESE",
    titleAccent: "DIASPORA",
    subtitle: "SON Networks delivers vibrant online content for the Congolese diaspora and beyond. From Music, Game Shows, Interviews, Concerts, and Weddings.",
    cta: "BROWSE",
  },
  featured: {
    label: "FEATURED",
    watchNow: "WATCH NOW",
  },
  shows: {
    trending: "TRENDING",
    title: "SHOWS",
  },
  nav: {
    shows: "Shows",
    joinUs: "Join Us",
    contactUs: "Contact Us",
  },
  join: {
    pitchTitle: "Got An",
    pitchTitleAccent: "Idea?",
  },
  quote: {
    text: "WE CREATE CONTENT THAT",
    accent: "BREAKS THE INTERNET",
  },
  common: {
    browse: "BROWSE",
  },
};

export default async function Home() {
  // Fetch data server-side BEFORE rendering
  const { homeContent, capabilities, galleryImages } = await getHomePageData();

  // Use fetched data or defaults
  const content = homeContent || {
    heroTitle: t.hero.title,
    heroTitleAccent: t.hero.titleAccent,
    heroSubtitle: t.hero.subtitle,
    heroCtaText: t.hero.cta,
    heroCtaLink: "/shows",
    heroBackgroundImage: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    heroBackgroundImageMobile: null,
    heroFocalX: 0.5,
    heroFocalY: 0.5,
    heroFocalXMobile: 0.5,
    heroFocalYMobile: 0.5,
    featuredVideoId: "hSiSKAgO3mM",
    featuredVideoThumbnail: "",
    featuredThumbnailMobile: null,
    featuredFocalX: 0.5,
    featuredFocalY: 0.5,
    featuredFocalXMobile: 0.5,
    featuredFocalYMobile: 0.5,
    marqueeItems: [],
    quoteText: t.quote.text,
    quoteAccent: t.quote.accent,
  };

  const caps = capabilities.length > 0 ? capabilities : defaultCapabilities;

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col">
        {/* Top Marquee */}
        <div className="grid-b-border py-3 bg-[var(--tv-red)] overflow-hidden">
          <Marquee speed={10} className="whitespace-nowrap font-display text-lg md:text-xl uppercase tracking-widest text-white">
            {(content.marqueeItems.length > 0 ? content.marqueeItems : [t.marquee.production, t.marquee.series, t.marquee.brand, t.marquee.viral]).map((item: string, index: number) => (
              <span key={index}>
                <span className="mx-4">{item}</span> •{" "}
              </span>
            ))}
          </Marquee>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12">
          {/* Left Title Block */}
          <div className="col-span-12 md:col-span-8 p-6 md:p-12 flex flex-col justify-center grid-b-border md:border-b-0 md:grid-r-border relative overflow-hidden min-h-[60vh] md:min-h-0">
            {/* Background Image */}
            <ResponsiveImage
              desktop={content.heroBackgroundImage}
              mobile={content.heroBackgroundImageMobile}
              desktopFocalX={content.heroFocalX}
              desktopFocalY={content.heroFocalY}
              mobileFocalX={content.heroFocalXMobile}
              mobileFocalY={content.heroFocalYMobile}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />

            <h1 className="font-display mega-text uppercase text-[var(--cream)] z-10 animate-fade-up">
              {content.heroTitle}<br />
              <span className="text-[var(--tv-red)]">{content.heroTitleAccent}</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl mt-8 max-w-lg font-medium leading-relaxed z-10 text-[var(--cream)] animate-fade-up">
              {content.heroSubtitle}
            </p>

            {/* CTA */}
            <div className="mt-12 flex gap-6 z-10 animate-pop">
              <TransitionLink
                href={content.heroCtaLink}
                className="bg-[var(--tv-red)] text-[var(--cream)] px-8 py-4 font-display text-xl uppercase hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors border-2 border-[var(--tv-red)]"
              >
                {content.heroCtaText}
              </TransitionLink>
            </div>
          </div>

          {/* Right Reel Block - Client Component for interactivity */}
          <FeaturedVideo
            videoId={content.featuredVideoId}
            thumbnail={content.featuredVideoThumbnail || `https://img.youtube.com/vi/${content.featuredVideoId}/maxresdefault.jpg`}
            thumbnailMobile={content.featuredThumbnailMobile}
            focalX={content.featuredFocalX}
            focalY={content.featuredFocalY}
            focalXMobile={content.featuredFocalXMobile}
            focalYMobile={content.featuredFocalYMobile}
          />
        </div>
      </section>

      {/* GALLERY SECTION */}
      {galleryImages.length > 0 && (
        <section className="bg-[var(--cream)] border-b-2 border-[var(--ink)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {galleryImages.map((image: any) => {
              const content = (
                <>
                  <Image
                    src={image.imageUrl}
                    alt="Gallery"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/40 transition-colors duration-300" />
                </>
              );

              return image.linkUrl ? (
                <a
                  key={image.id}
                  href={image.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square relative group cursor-pointer overflow-hidden border-r-2 border-b-2 border-[var(--ink)] last:border-r-0 md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-2 lg:[&:nth-child(6n)]:border-r-0"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={image.id}
                  className="aspect-square relative group overflow-hidden border-r-2 border-b-2 border-[var(--ink)] last:border-r-0 md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-2 lg:[&:nth-child(6n)]:border-r-0"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* FEATURED GRID TEASER */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[var(--ink)] grid-b-border">
        {/* Client Component for video interactivity */}
        <HeroVideoSection videoId={content.featuredVideoId} />

        <TransitionLink
          href="/shows"
          className="col-span-1 bg-[var(--tv-red)] p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer min-h-[300px] animate-slide-right"
        >
          <h3 className="font-display text-6xl text-[var(--cream)] mb-2 scale-up animate-fade-up uppercase">
            {t.nav.shows}
          </h3>
          <div className="mt-8 border-2 border-[var(--ink)] bg-[var(--cream)] text-[var(--ink)] px-6 py-2 font-display text-lg uppercase transform group-hover:-rotate-3 transition-transform animate-pop">
            {t.common.browse}
          </div>
        </TransitionLink>
      </section>

      {/* PHILOSOPHY / QUOTE */}
      <section className="py-32 bg-[var(--ink)] text-[var(--cream)] text-center border-b-2 border-[var(--ink)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-display text-[8vw] leading-[0.85] uppercase animate-fade-up">
            &ldquo;{content.quoteText}<br />
            <span className="text-[var(--tv-red)]">{content.quoteAccent}</span>&rdquo;
          </h2>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-[var(--cream)]">
        <div className="grid grid-cols-2 md:grid-cols-4 animate-stagger">
          {[
            { title: t.nav.shows, href: "/shows" },
            { title: `${t.join.pitchTitle} ${t.join.pitchTitleAccent}`, href: "/join" },
            { title: t.nav.joinUs, href: "/join" },
            { title: t.nav.contactUs, href: "/contact" },
          ].map((item, index) => (
            <TransitionLink
              key={item.title}
              href={item.href}
              className={`aspect-video ${
                index % 2 === 0 ? "border-r-2" : ""
              } ${
                index < 3 ? "md:border-r-2" : "md:border-r-0"
              } border-b-2 border-[var(--ink)] flex items-center justify-center transition-all p-8 group hover:bg-[var(--ink)]`}
            >
              <span className="font-display text-xl md:text-2xl uppercase text-[var(--ink)] group-hover:text-[var(--cream)] text-center transition-colors">
                {item.title}
              </span>
            </TransitionLink>
          ))}
        </div>
      </section>
    </div>
  );
}
