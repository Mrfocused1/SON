"use client";

import { ArrowUpRight } from "lucide-react";
import { useVideoModal } from "@/context/VideoModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { ResponsiveImage } from "@/components/ResponsiveImage";

type FeaturedVideoProps = {
  videoId: string;
  thumbnail: string;
  thumbnailMobile: string | null;
  focalX: number;
  focalY: number;
  focalXMobile: number;
  focalYMobile: number;
};

export function FeaturedVideo({
  videoId,
  thumbnail,
  thumbnailMobile,
  focalX,
  focalY,
  focalXMobile,
  focalYMobile,
}: FeaturedVideoProps) {
  const { openVideo } = useVideoModal();
  const { t } = useLanguage();

  return (
    <div
      className="col-span-12 md:col-span-4 min-h-[400px] md:min-h-0 relative group cursor-pointer overflow-hidden animate-slide-right"
      onClick={() => openVideo(videoId)}
      data-cursor="play"
    >
      <ResponsiveImage
        desktop={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        mobile={thumbnailMobile}
        desktopFocalX={focalX}
        desktopFocalY={focalY}
        mobileFocalX={focalXMobile}
        mobileFocalY={focalYMobile}
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
  );
}
