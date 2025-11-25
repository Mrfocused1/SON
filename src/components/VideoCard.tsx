"use client";

import Image from "next/image";
import { useVideoModal } from "@/context/VideoModalContext";

interface VideoCardProps {
  videoId: string;
  thumbnail: string;
  title: string;
  category: string;
  className?: string;
}

export function VideoCard({ videoId, thumbnail, title, category, className = "" }: VideoCardProps) {
  const { openVideo } = useVideoModal();

  return (
    <div
      className={`aspect-square border-b-2 border-r-2 border-[var(--cream)]/20 relative group grid-item cursor-pointer ${className}`}
      onClick={() => openVideo(videoId)}
      data-cursor="play"
    >
      <div className="image-wrapper w-full h-full">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          unoptimized
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
