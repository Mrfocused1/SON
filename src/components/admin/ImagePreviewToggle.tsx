"use client";

import { useState } from "react";
import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";

interface ImagePreviewToggleProps {
  desktopImage: string;
  mobileImage?: string | null;
  desktopFocalX: number;
  desktopFocalY: number;
  mobileFocalX: number;
  mobileFocalY: number;
  desktopAspect?: string; // e.g., "16/9"
  mobileAspect?: string; // e.g., "9/16"
}

// Helper to ensure valid number
const safeNumber = (val: number | undefined | null, defaultVal: number = 0.5): number => {
  if (typeof val !== 'number' || isNaN(val)) return defaultVal;
  return Math.max(0, Math.min(1, val));
};

export function ImagePreviewToggle({
  desktopImage,
  mobileImage,
  desktopFocalX,
  desktopFocalY,
  mobileFocalX,
  mobileFocalY,
  desktopAspect = "16/9",
  mobileAspect = "9/16",
}: ImagePreviewToggleProps) {
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");

  // Ensure focal points are valid
  const safeDesktopFocalX = safeNumber(desktopFocalX);
  const safeDesktopFocalY = safeNumber(desktopFocalY);
  const safeMobileFocalX = safeNumber(mobileFocalX);
  const safeMobileFocalY = safeNumber(mobileFocalY);

  const desktopObjectPosition = `${safeDesktopFocalX * 100}% ${safeDesktopFocalY * 100}%`;
  const mobileObjectPosition = `${safeMobileFocalX * 100}% ${safeMobileFocalY * 100}%`;

  const currentMobileImage = mobileImage || desktopImage;

  if (!desktopImage) {
    return (
      <div className="w-full h-32 bg-[var(--cream)] border-2 border-[var(--ink)]/10 flex items-center justify-center text-[var(--ink)]/40">
        No image to preview
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm uppercase text-[var(--ink)]">Preview</span>
        <div className="flex bg-[var(--cream)] border-2 border-[var(--ink)]/10 p-1">
          <button
            onClick={() => setActiveView("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
              activeView === "desktop"
                ? "bg-white text-[var(--ink)] shadow-sm border border-[var(--ink)]/10"
                : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
            }`}
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </button>
          <button
            onClick={() => setActiveView("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
              activeView === "mobile"
                ? "bg-white text-[var(--ink)] shadow-sm border border-[var(--ink)]/10"
                : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
            }`}
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {/* Desktop preview */}
        <div
          className={`transition-all duration-300 ${
            activeView === "desktop" ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          <div className="text-xs text-[var(--ink)]/50 text-center mb-1 font-display uppercase">Desktop (16:9)</div>
          <div
            className="relative bg-[var(--cream)] overflow-hidden border-2 border-[var(--ink)]/20"
            style={{ width: "200px", aspectRatio: desktopAspect }}
          >
            <Image
              src={desktopImage}
              alt="Desktop preview"
              fill
              className="object-cover"
              style={{ objectPosition: desktopObjectPosition }}
            />
          </div>
        </div>

        {/* Mobile preview */}
        <div
          className={`transition-all duration-300 ${
            activeView === "mobile" ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          <div className="text-xs text-[var(--ink)]/50 text-center mb-1 font-display uppercase">
            Mobile {mobileImage ? "(Custom)" : "(Cropped)"}
          </div>
          <div
            className="relative bg-[var(--cream)] overflow-hidden border-2 border-[var(--ink)]/20"
            style={{ width: "80px", aspectRatio: mobileAspect }}
          >
            <Image
              src={currentMobileImage}
              alt="Mobile preview"
              fill
              className="object-cover"
              style={{ objectPosition: mobileObjectPosition }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-[var(--ink)]/50">
        {activeView === "mobile" && !mobileImage
          ? "Using desktop image with mobile focal point. Upload a mobile image for best results."
          : "Preview shows how the image will appear on each device."}
      </p>
    </div>
  );
}
