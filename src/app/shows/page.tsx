"use client";

import { useState, useEffect } from "react";
import { VideoCard } from "@/components/VideoCard";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

type VideoData = {
  videoId: string;
  thumbnail: string;
  thumbnailMobile?: string | null;
  focalX?: number;
  focalY?: number;
  focalXMobile?: number;
  focalYMobile?: number;
  title: string;
  titleFr?: string;
  category: string;
  categoryFr?: string;
};

// Default fallback data
const defaultVideos: VideoData[] = [
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Studio Session",
    titleFr: "Session Studio",
    category: "Behind The Scenes",
    categoryFr: "Dans les Coulisses",
    focalX: 0.5,
    focalY: 0.5,
    focalXMobile: 0.5,
    focalYMobile: 0.5,
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Content Creation",
    titleFr: "Création de Contenu",
    category: "Viral Short",
    categoryFr: "Vidéo Virale",
    focalX: 0.5,
    focalY: 0.5,
    focalXMobile: 0.5,
    focalYMobile: 0.5,
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Creative Process",
    titleFr: "Processus Créatif",
    category: "Documentary",
    categoryFr: "Documentaire",
    focalX: 0.5,
    focalY: 0.5,
    focalXMobile: 0.5,
    focalYMobile: 0.5,
  },
];

export default function ShowsPage() {
  const { t, language } = useLanguage();
  const [videos, setVideos] = useState(defaultVideos);
  const [pageContent, setPageContent] = useState({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    async function loadShowsData() {
      if (!supabase) return;

      try {
        // Parallel fetch for better performance
        const [contentResult, showsResult] = await Promise.all([
          supabase.from("shows_content").select("*").single(),
          supabase.from("shows").select("*").order("order", { ascending: true }),
        ]);

        // Process shows_content
        const contentData = contentResult.data;
        if (contentData) {
          setPageContent({
            title: contentData.title || "Our Shows",
            subtitle: contentData.subtitle || "Streaming now on YouTube. Click to watch.",
          });
        }

        // Process shows (videos)
        const showsData = showsResult.data;
        if (showsData && showsData.length > 0) {
          setVideos(
            showsData.map((show: any) => ({
              videoId: show.video_id,
              thumbnail: show.thumbnail,
              thumbnailMobile: show.thumbnail_mobile || null,
              focalX: show.focal_x ?? 0.5,
              focalY: show.focal_y ?? 0.5,
              focalXMobile: show.focal_x_mobile ?? 0.5,
              focalYMobile: show.focal_y_mobile ?? 0.5,
              title: show.title,
              titleFr: show.title_fr,
              category: show.category,
              categoryFr: show.category_fr,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading shows data:", error);
      }
    }

    loadShowsData();
  }, []);

  return (
    <div className="bg-[var(--ink)] min-h-screen text-[var(--cream)] overflow-x-hidden">
      <div className="p-6 md:p-12 border-b-2 border-[var(--cream)]/20">
        <h1 className="font-display text-[10vw] uppercase leading-none text-[var(--tv-red)] animate-fade-up">
          {t.shows.title}
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 max-w-2xl animate-fade-up">
          {t.shows.subtitle}
        </p>
      </div>

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-stagger">
        {videos.map((video, index) => (
          <VideoCard
            key={`${video.videoId}-${index}`}
            videoId={video.videoId}
            thumbnail={video.thumbnail}
            thumbnailMobile={video.thumbnailMobile}
            focalX={video.focalX}
            focalY={video.focalY}
            focalXMobile={video.focalXMobile}
            focalYMobile={video.focalYMobile}
            title={language === 'fr' && video.titleFr ? video.titleFr : video.title}
            category={language === 'fr' && video.categoryFr ? video.categoryFr : video.category}
          />
        ))}

        {/* More Coming Soon */}
        <div
          className="aspect-square border-b-2 border-[var(--cream)]/20 bg-[var(--tv-red)] flex flex-col justify-center items-center text-center p-6 group cursor-pointer"
          onClick={() => window.open("https://www.youtube.com/sonnetworks", "_blank")}
        >
          <h3 className="font-display text-6xl text-[var(--cream)] uppercase leading-none mb-4 group-hover:scale-110 transition-transform">
            {t.shows.watchNow}<br />YouTube
          </h3>
          <div className="bg-[var(--ink)] text-[var(--cream)] px-6 py-2 font-display text-xl uppercase rounded-full">
            {t.footer.followUs}
          </div>
        </div>
      </div>
    </div>
  );
}
