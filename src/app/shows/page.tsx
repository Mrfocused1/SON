"use client";

import { VideoCard } from "@/components/VideoCard";

const videos = [
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Studio Session",
    category: "Behind The Scenes",
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Content Creation",
    category: "Viral Short",
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Creative Process",
    category: "Documentary",
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/2918590/pexels-photo-2918590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "Film Making",
    category: "Production",
  },
  {
    videoId: "hSiSKAgO3mM",
    thumbnail: "https://images.pexels.com/photos/2608519/pexels-photo-2608519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    title: "On Location",
    category: "Adventure",
  },
];

export default function ShowsPage() {
  return (
    <div className="bg-[var(--ink)] min-h-screen text-[var(--cream)]">
      <div className="p-6 md:p-12 border-b-2 border-[var(--cream)]/20">
        <h1 className="font-display text-[10vw] uppercase leading-none text-[var(--tv-red)] animate-fade-up">
          Our Shows
        </h1>
        <p className="font-sans text-xl md:text-2xl mt-4 max-w-2xl animate-fade-up">
          Streaming now on YouTube. Click to watch.
        </p>
      </div>

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-stagger">
        {videos.map((video, index) => (
          <VideoCard key={`${video.videoId}-${index}`} {...video} />
        ))}

        {/* More Coming Soon */}
        <div
          className="aspect-square border-b-2 border-[var(--cream)]/20 bg-[var(--tv-red)] flex flex-col justify-center items-center text-center p-6 group cursor-pointer"
          onClick={() => window.open("https://www.youtube.com/sonnetworks", "_blank")}
        >
          <h3 className="font-display text-6xl text-[var(--cream)] uppercase leading-none mb-4 group-hover:scale-110 transition-transform">
            More On<br />YouTube
          </h3>
          <div className="bg-[var(--ink)] text-[var(--cream)] px-6 py-2 font-display text-xl uppercase rounded-full">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  );
}
