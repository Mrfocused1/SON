"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Users, Lightbulb, Rocket } from "lucide-react";
import { useVideoModal } from "@/context/VideoModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { Marquee } from "@/components/Marquee";
import { supabase } from "@/lib/supabase";
import { TransitionLink } from "@/components/TransitionLink";
import { ResponsiveImage } from "@/components/ResponsiveImage";

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


export default function Home() {
  const { openVideo } = useVideoModal();
  const { t, language } = useLanguage();

  // State for dynamic content from Supabase
  const [homeContent, setHomeContent] = useState({
    heroTitle: "",
    heroTitleAccent: "",
    heroSubtitle: "",
    heroCtaText: "",
    heroCtaLink: "/shows",
    heroBackgroundImage: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    heroBackgroundImageMobile: null as string | null,
    heroFocalX: 0.5,
    heroFocalY: 0.5,
    heroFocalXMobile: 0.5,
    heroFocalYMobile: 0.5,
    featuredVideoId: "hSiSKAgO3mM",
    featuredVideoThumbnail: "",
    featuredThumbnailMobile: null as string | null,
    featuredFocalX: 0.5,
    featuredFocalY: 0.5,
    featuredFocalXMobile: 0.5,
    featuredFocalYMobile: 0.5,
    marqueeItems: [] as string[],
    quoteText: "",
    quoteAccent: "",
  });

  const [capabilities, setCapabilities] = useState(defaultCapabilities);
  const [galleryImages, setGalleryImages] = useState<{
    id: string;
    imageUrl: string;
    linkUrl?: string | null;
  }[]>([]);

  // Load content from Supabase
  useEffect(() => {
    async function loadContent() {
      if (!supabase) return;

      try {
        // Load home_content
        const { data: homeData } = await supabase
          .from("home_content")
          .select("*")
          .single();

        if (homeData) {
          setHomeContent({
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
          });
        }

        // Load capabilities
        const { data: capsData } = await supabase
          .from("capabilities")
          .select("*")
          .order("order", { ascending: true });

        if (capsData && capsData.length > 0) {
          setCapabilities(capsData.map((cap: any) => ({
            title: cap.title,
            description: cap.description,
            icon: cap.icon || "Sparkles",
          })));
        }

        // Load gallery images
        const { data: galleryData } = await supabase
          .from("gallery_images")
          .select("*")
          .order("order", { ascending: true });

        if (galleryData && galleryData.length > 0) {
          setGalleryImages(galleryData.map((img: any) => ({
            id: img.id,
            imageUrl: img.image_url,
            linkUrl: img.link_url || null,
          })));
        }
      } catch (error) {
        console.error("Error loading home content:", error);
      }
    }

    loadContent();
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="min-h-[85vh] flex flex-col">
        {/* Top Marquee */}
        <div className="grid-b-border py-3 bg-[var(--tv-red)] overflow-hidden">
          <Marquee speed={10} className="whitespace-nowrap font-display text-lg md:text-xl uppercase tracking-widest text-white">
            {(homeContent.marqueeItems.length > 0 ? homeContent.marqueeItems : [t.marquee.production, t.marquee.series, t.marquee.brand, t.marquee.viral]).map((item, index) => (
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
              desktop={homeContent.heroBackgroundImage || "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
              mobile={homeContent.heroBackgroundImageMobile}
              desktopFocalX={homeContent.heroFocalX}
              desktopFocalY={homeContent.heroFocalY}
              mobileFocalX={homeContent.heroFocalXMobile}
              mobileFocalY={homeContent.heroFocalYMobile}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />

            <h1 className="font-display mega-text uppercase text-[var(--cream)] z-10 animate-fade-up">
              {homeContent.heroTitle || t.hero.title}<br />
              <span className="text-[var(--tv-red)]">{homeContent.heroTitleAccent || t.hero.titleAccent}</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl mt-8 max-w-lg font-medium leading-relaxed z-10 text-[var(--cream)] animate-fade-up">
              {homeContent.heroSubtitle || t.hero.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-12 flex gap-6 z-10 animate-pop">
              <TransitionLink
                href={homeContent.heroCtaLink}
                className="bg-[var(--tv-red)] text-[var(--cream)] px-8 py-4 font-display text-xl uppercase hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors border-2 border-[var(--tv-red)]"
              >
                {homeContent.heroCtaText || t.hero.cta}
              </TransitionLink>
            </div>
          </div>

          {/* Right Reel Block */}
          <div
            className="col-span-12 md:col-span-4 min-h-[400px] md:min-h-0 relative group cursor-pointer overflow-hidden animate-slide-right"
            onClick={() => openVideo(homeContent.featuredVideoId)}
            data-cursor="play"
          >
            <ResponsiveImage
              desktop={homeContent.featuredVideoThumbnail || `https://img.youtube.com/vi/${homeContent.featuredVideoId}/maxresdefault.jpg`}
              mobile={homeContent.featuredThumbnailMobile}
              desktopFocalX={homeContent.featuredFocalX}
              desktopFocalY={homeContent.featuredFocalY}
              mobileFocalX={homeContent.featuredFocalXMobile}
              mobileFocalY={homeContent.featuredFocalYMobile}
              alt="Featured Video"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
              <div className="flex justify-between items-start text-[var(--cream)]">
                <span className="font-display text-2xl">{t.featured.label}</span>
                <ArrowUpRight className="w-8 h-8" />
              </div>
              <h2 className="font-display text-6xl text-[var(--cream)] leading-none group-hover:translate-x-2 transition-transform drop-shadow-lg whitespace-pre-line">
                {t.featured.watchNow.split(" ").join("\n")}
              </h2>
            </div>
          </div>
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

      {/* CAPABILITIES SECTION - HIDDEN
      <section className="grid grid-cols-1 md:grid-cols-2 grid-b-border">
        <div className="p-12 md:p-24 border-b-2 md:border-b-0 md:border-r-2 border-[var(--ink)] bg-[var(--cream)] flex flex-col justify-between animate-slide-left">
          <div>
            <span className="font-bold uppercase tracking-widest text-[var(--tv-red)] mb-4 block animate-fade-up">
              {capabilities[0]?.title || t.capabilities.create}
            </span>
            <h2 className="font-display text-6xl uppercase leading-none animate-fade-up">
              {capabilities[1]?.title || t.capabilities.collaborate}<br />
              <span className="text-[var(--tv-red)]">{capabilities[2]?.title || t.capabilities.innovate}</span>
            </h2>
            <p className="text-xl mt-8 font-medium max-w-md animate-fade-up">
              {capabilities[0]?.description || t.capabilities.createDesc}
            </p>
          </div>
          <div className="mt-12 animate-pop">
            <TransitionLink
              href="/contact"
              className="inline-block border-b-2 border-[var(--ink)] text-xl font-display uppercase hover:text-[var(--tv-red)] hover:border-[var(--tv-red)] transition-colors"
            >
              {t.nav.contactUs}
            </TransitionLink>
          </div>
        </div>
        <div className="bg-[var(--ink)] text-[var(--cream)] flex flex-col animate-stagger">
          {capabilities.map((cap, index, arr) => {
            const Icon = iconMap[cap.icon] || Sparkles;
            return (
              <div
                key={cap.title}
                className={`p-8 md:p-10 ${
                  index < arr.length - 1 ? "border-b border-gray-800" : ""
                } hover:bg-zinc-900 transition-colors group cursor-pointer flex justify-between items-center ${
                  index === arr.length - 1 ? "flex-1" : ""
                }`}
                data-cursor="view"
              >
                <div>
                  <h3 className="font-display text-3xl uppercase mb-1 group-hover:text-[var(--tv-red)] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{cap.description}</p>
                </div>
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-[var(--tv-red)] transition-colors" />
              </div>
            );
          })}
        </div>
      </section>
      */}

      {/* FEATURED GRID TEASER */}
      <section className="grid grid-cols-1 md:grid-cols-3 bg-[var(--ink)] grid-b-border">
        <div
          className="col-span-1 md:col-span-2 aspect-video md:aspect-auto min-h-[400px] border-r-2 border-[var(--ink)] bg-[var(--cream)] relative group grid-item overflow-hidden cursor-pointer animate-scale-up"
          onClick={() => openVideo(homeContent.featuredVideoId)}
          data-cursor="play"
        >
          <div className="image-wrapper w-full h-full">
            <Image
              src="https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="Video Production"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 pointer-events-none">
            <span className="bg-[var(--tv-red)] text-white px-3 py-1 font-display text-sm uppercase w-max mb-4 animate-pop">
              {t.shows.trending}
            </span>
            <h3 className="font-display text-5xl md:text-8xl text-[var(--cream)] mix-blend-difference uppercase leading-none animate-fade-up">
              Behind<br />The Scenes
            </h3>
          </div>
        </div>
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
            &ldquo;{homeContent.quoteText || t.quote.text}<br />
            <span className="text-[var(--tv-red)]">{homeContent.quoteAccent || t.quote.accent}</span>&rdquo;
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
