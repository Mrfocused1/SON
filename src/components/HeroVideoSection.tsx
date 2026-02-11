"use client";

import Image from "next/image";
import { useVideoModal } from "@/context/VideoModalContext";
import { useLanguage } from "@/context/LanguageContext";

type HeroVideoSectionProps = {
  videoId: string;
};

export function HeroVideoSection({ videoId }: HeroVideoSectionProps) {
  const { openVideo } = useVideoModal();
  const { t } = useLanguage();

  return (
    <div
      className="col-span-1 md:col-span-2 aspect-video md:aspect-auto min-h-[400px] border-r-2 border-[var(--ink)] bg-[var(--cream)] relative group grid-item overflow-hidden cursor-pointer animate-scale-up"
      onClick={() => openVideo(videoId)}
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
  );
}
