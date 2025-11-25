"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { useVideoModal } from "@/context/VideoModalContext";

export function VideoModal() {
  const { isOpen, videoId, closeVideo } = useVideoModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      closeVideo();
    }
  };

  return (
    <div
      ref={modalRef}
      className={`video-modal ${isOpen ? "open" : ""}`}
      onClick={handleBackdropClick}
    >
      <button
        className="absolute top-8 right-8 text-white hover:text-[var(--tv-red)] transition-colors z-10"
        onClick={closeVideo}
      >
        <X className="w-12 h-12" />
      </button>
      <div
        ref={contentRef}
        className="w-full max-w-5xl aspect-video bg-black shadow-2xl border-2 border-white/20"
      >
        {isOpen && videoId && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}
