"use client";

import { useState } from "react";
import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";

interface ImagePreviewToggleProps {
  desktopImage: string;
  mobileImage?: string;
  focalX: number;
  focalY: number;
  desktopAspect?: string; // e.g., "16/9"
  mobileAspect?: string; // e.g., "9/16"
}

export function ImagePreviewToggle({
  desktopImage,
  mobileImage,
  focalX,
  focalY,
  desktopAspect = "16/9",
  mobileAspect = "9/16",
}: ImagePreviewToggleProps) {
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop");

  const objectPosition = `${focalX * 100}% ${focalY * 100}%`;
  const currentImage =
    activeView === "mobile" && mobileImage ? mobileImage : desktopImage;

  if (!desktopImage) {
    return (
      <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        No image to preview
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Preview</span>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveView("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              activeView === "desktop"
                ? "bg-white text-[var(--ink)] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </button>
          <button
            onClick={() => setActiveView("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
              activeView === "mobile"
                ? "bg-white text-[var(--ink)] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
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
          <div className="text-xs text-gray-500 text-center mb-1">Desktop (16:9)</div>
          <div
            className="relative bg-gray-100 rounded overflow-hidden border-2 border-gray-200"
            style={{ width: "200px", aspectRatio: desktopAspect }}
          >
            <Image
              src={desktopImage}
              alt="Desktop preview"
              fill
              className="object-cover"
              style={{ objectPosition }}
            />
          </div>
        </div>

        {/* Mobile preview */}
        <div
          className={`transition-all duration-300 ${
            activeView === "mobile" ? "opacity-100 scale-100" : "opacity-50 scale-95"
          }`}
        >
          <div className="text-xs text-gray-500 text-center mb-1">
            Mobile {mobileImage ? "(Custom)" : "(Cropped)"}
          </div>
          <div
            className="relative bg-gray-100 rounded overflow-hidden border-2 border-gray-200"
            style={{ width: "80px", aspectRatio: mobileAspect }}
          >
            <Image
              src={currentImage}
              alt="Mobile preview"
              fill
              className="object-cover"
              style={{ objectPosition: mobileImage ? "center" : objectPosition }}
            />
          </div>
        </div>
      </div>

      {activeView === "mobile" && !mobileImage && (
        <p className="text-xs text-center text-gray-500">
          Using focal point crop. Upload a mobile image for best results.
        </p>
      )}
    </div>
  );
}
