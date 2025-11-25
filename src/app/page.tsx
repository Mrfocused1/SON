"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Users, Lightbulb, Rocket } from "lucide-react";
import { useVideoModal } from "@/context/VideoModalContext";
import { Marquee } from "@/components/Marquee";
import { supabase } from "@/lib/supabase";

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

const defaultScrollImages = [
  "https://images.pexels.com/photos/8374522/pexels-photo-8374522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/7676502/pexels-photo-7676502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
];

export default function Home() {
  const { openVideo } = useVideoModal();

  // State for dynamic content from Supabase
  const [homeContent, setHomeContent] = useState({
    heroTitle: "Ready",
    heroTitleAccent: "To Roll.",
    heroSubtitle: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
    heroCtaText: "Watch Shows",
    heroCtaLink: "/shows",
    heroBackgroundImage: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    featuredVideoId: "hSiSKAgO3mM",
    featuredVideoThumbnail: "",
    marqueeItems: ["Digital Production House", "Original Series", "Brand Stories", "Viral Content"],
    studioTitle: "We Don't",
    studioTitleAccent: "Play Safe.",
    studioSubtitle: "SON Networks is a new breed of production house. We combine cinematic quality with the pacing of internet culture.",
    quoteText: "We don't chase trends.",
    quoteAccent: "We set them.",
  });

  const [capabilities, setCapabilities] = useState(defaultCapabilities);
  const [scrollImages, setScrollImages] = useState(defaultScrollImages);

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
            heroTitle: homeData.hero_title || "Ready",
            heroTitleAccent: homeData.hero_title_accent || "To Roll.",
            heroSubtitle: homeData.hero_subtitle || "",
            heroCtaText: homeData.hero_cta_text || "Watch Shows",
            heroCtaLink: homeData.hero_cta_link || "/shows",
            heroBackgroundImage: homeData.hero_background_image || "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            featuredVideoId: homeData.featured_video_id || "hSiSKAgO3mM",
            featuredVideoThumbnail: homeData.featured_video_thumbnail || "",
            marqueeItems: homeData.marquee_items || ["Digital Production House", "Original Series", "Brand Stories", "Viral Content"],
            studioTitle: homeData.studio_title || "We Don't",
            studioTitleAccent: homeData.studio_title_accent || "Play Safe.",
            studioSubtitle: homeData.studio_subtitle || "",
            quoteText: homeData.quote_text || "We don't chase trends.",
            quoteAccent: homeData.quote_accent || "We set them.",
          });
        }

        // Load capabilities
        const { data: capsData } = await supabase
          .from("capabilities")
          .select("*")
          .order("order", { ascending: true });

        if (capsData && capsData.length > 0) {
          setCapabilities(capsData.map(cap => ({
            title: cap.title,
            description: cap.description,
            icon: cap.icon || "Sparkles",
          })));
        }

        // Load studio images
        const { data: imagesData } = await supabase
          .from("studio_images")
          .select("*")
          .order("order", { ascending: true });

        if (imagesData && imagesData.length > 0) {
          setScrollImages(imagesData.map(img => img.image_url));
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
            {homeContent.marqueeItems.map((item, index) => (
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
            <Image
              src={homeContent.heroBackgroundImage || "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />

            <h1 className="font-display mega-text uppercase text-[var(--cream)] z-10 animate-fade-up">
              {homeContent.heroTitle}<br />
              <span className="text-[var(--tv-red)]">{homeContent.heroTitleAccent}</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl mt-8 max-w-lg font-medium leading-relaxed z-10 text-[var(--cream)] animate-fade-up">
              {homeContent.heroSubtitle}
            </p>

            {/* CTA */}
            <div className="mt-12 flex gap-6 z-10 animate-pop">
              <Link
                href={homeContent.heroCtaLink}
                className="bg-[var(--tv-red)] text-[var(--cream)] px-8 py-4 font-display text-xl uppercase hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors border-2 border-[var(--tv-red)]"
              >
                {homeContent.heroCtaText}
              </Link>
            </div>
          </div>

          {/* Right Reel Block */}
          <div
            className="col-span-12 md:col-span-4 min-h-[400px] md:min-h-0 relative group cursor-pointer overflow-hidden animate-slide-right"
            onClick={() => openVideo(homeContent.featuredVideoId)}
            data-cursor="play"
          >
            <Image
              src={homeContent.featuredVideoThumbnail || `https://img.youtube.com/vi/${homeContent.featuredVideoId}/maxresdefault.jpg`}
              alt="Featured Video"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
              <div className="flex justify-between items-start text-[var(--cream)]">
                <span className="font-display text-2xl">FEATURED</span>
                <ArrowUpRight className="w-8 h-8" />
              </div>
              <h2 className="font-display text-6xl text-[var(--cream)] leading-none group-hover:translate-x-2 transition-transform drop-shadow-lg">
                WATCH<br />NOW
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 grid-b-border">
        <div className="p-12 md:p-24 border-b-2 md:border-b-0 md:border-r-2 border-[var(--ink)] bg-[var(--cream)] flex flex-col justify-between animate-slide-left">
          <div>
            <span className="font-bold uppercase tracking-widest text-[var(--tv-red)] mb-4 block animate-fade-up">
              Capabilities
            </span>
            <h2 className="font-display text-6xl uppercase leading-none animate-fade-up">
              We Build<br />
              <span className="text-[var(--tv-red)]">Universes.</span>
            </h2>
            <p className="text-xl mt-8 font-medium max-w-md animate-fade-up">
              From 15-second spots to full-length features, we handle every frame
              with obsessive attention to detail.
            </p>
          </div>
          <div className="mt-12 animate-pop">
            <Link
              href="/contact"
              className="inline-block border-b-2 border-[var(--ink)] text-xl font-display uppercase hover:text-[var(--tv-red)] hover:border-[var(--tv-red)] transition-colors"
            >
              Start A Project
            </Link>
          </div>
        </div>
        <div className="bg-[var(--ink)] text-[var(--cream)] flex flex-col animate-stagger">
          {capabilities.map((cap, index) => {
            const Icon = iconMap[cap.icon] || Sparkles;
            return (
              <div
                key={cap.title}
                className={`p-8 md:p-10 ${
                  index < capabilities.length - 1 ? "border-b border-gray-800" : ""
                } hover:bg-zinc-900 transition-colors group cursor-pointer flex justify-between items-center ${
                  index === capabilities.length - 1 ? "flex-1" : ""
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

      {/* STUDIO / MARQUEE SECTION */}
      <section className="grid-b-border bg-[var(--cream)] py-24 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <span className="font-bold uppercase tracking-widest text-[var(--tv-red)] mb-4 block animate-fade-up">
            The Studio
          </span>
          <h2 className="font-display text-[10vw] leading-none uppercase text-[var(--ink)] mb-12 animate-fade-up">
            {homeContent.studioTitle}<br />{homeContent.studioTitleAccent.split(" ")[0]} <span className="stroke-text">{homeContent.studioTitleAccent.split(" ").slice(1).join(" ") || homeContent.studioTitleAccent}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="animate-slide-left">
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                {homeContent.studioSubtitle}
              </p>
            </div>
            {/* Scrolling Images */}
            <div className="relative h-64 overflow-hidden border-2 border-[var(--ink)] bg-white marquee-container flex items-center animate-scale-up">
              <Marquee speed={12} className="gap-4 px-4">
                {scrollImages.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt={`Studio image ${index + 1}`}
                    width={192}
                    height={192}
                    className="h-48 w-48 object-cover border border-[var(--ink)]"
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

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
              Trending
            </span>
            <h3 className="font-display text-5xl md:text-8xl text-[var(--cream)] mix-blend-difference uppercase leading-none animate-fade-up">
              Behind<br />The Scenes
            </h3>
          </div>
        </div>
        <Link
          href="/shows"
          className="col-span-1 bg-[var(--tv-red)] p-8 md:p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer min-h-[300px] animate-slide-right"
        >
          <h3 className="font-display text-6xl text-[var(--cream)] mb-2 scale-up animate-fade-up">
            More<br />Shows
          </h3>
          <div className="mt-8 border-2 border-[var(--ink)] bg-[var(--cream)] text-[var(--ink)] px-6 py-2 font-display text-lg uppercase transform group-hover:-rotate-3 transition-transform animate-pop">
            View All
          </div>
        </Link>
      </section>

      {/* PHILOSOPHY / QUOTE */}
      <section className="py-32 bg-[var(--ink)] text-[var(--cream)] text-center border-b-2 border-[var(--ink)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-display text-[8vw] leading-[0.85] uppercase animate-fade-up">
            &ldquo;{homeContent.quoteText}<br />We{" "}
            <span className="text-[var(--tv-red)]">{homeContent.quoteAccent}</span>&rdquo;
          </h2>
        </div>
      </section>

      {/* EXPLORE MORE */}
      <section className="bg-[var(--cream)]">
        <div className="grid grid-cols-2 md:grid-cols-4 animate-stagger">
          {[
            { title: "Latest Videos", href: "/shows" },
            { title: "Behind The Scenes", href: "/shows" },
            { title: "Join The Network", href: "/join" },
            { title: "Get In Touch", href: "/contact" },
          ].map((item, index) => (
            <Link
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
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
