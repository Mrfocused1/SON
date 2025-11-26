"use client";

import { useVideoModal } from "@/context/VideoModalContext";
import { ResponsiveImage } from "@/components/ResponsiveImage";

interface VideoCardProps {
  videoId: string;
  thumbnail: string;
  thumbnailMobile?: string | null;
  focalX?: number;
  focalY?: number;
  focalXMobile?: number;
  focalYMobile?: number;
  title: string;
  category: string;
  className?: string;
}

export function VideoCard({ videoId, thumbnail, thumbnailMobile, focalX = 0.5, focalY = 0.5, focalXMobile = 0.5, focalYMobile = 0.5, title, category, className = "" }: VideoCardProps) {
  const { openVideo } = useVideoModal();

  return (
    <div
      className={`aspect-square border-b-2 border-r-2 border-[var(--cream)]/20 relative group grid-item cursor-pointer ${className}`}
      onClick={() => openVideo(videoId)}
      data-cursor="play"
    >
      <div className="image-wrapper w-full h-full">
        <ResponsiveImage
          desktop={thumbnail}
          mobile={thumbnailMobile}
          desktopFocalX={focalX}
          desktopFocalY={focalY}
          mobileFocalX={focalXMobile}
          mobileFocalY={focalYMobile}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[var(--ink)]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-6">
        <span className="text-[var(--tv-red)] font-bold uppercase tracking-widest mb-2">
          {category}
        </span>
        <h3 className="font-display text-5xl uppercase leading-none text-[var(--cream)]">
          {title.split(" ").map((word, i) => (
            <span key={i}>
              {word}
              {i < title.split(" ").length - 1 && <br />}
            </span>
          ))}
        </h3>
      </div>
    </div>
  );
}
