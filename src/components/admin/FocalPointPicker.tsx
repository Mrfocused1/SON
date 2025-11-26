"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";

interface FocalPointPickerProps {
  desktopImageUrl: string;
  mobileImageUrl?: string | null;
  desktopFocalX: number;
  desktopFocalY: number;
  mobileFocalX: number;
  mobileFocalY: number;
  onDesktopFocalChange: (x: number, y: number) => void;
  onMobileFocalChange: (x: number, y: number) => void;
}

// Helper to ensure valid number
const safeNumber = (val: number | undefined | null, defaultVal: number = 0.5): number => {
  if (typeof val !== 'number' || isNaN(val)) return defaultVal;
  return Math.max(0, Math.min(1, val));
};

export function FocalPointPicker({
  desktopImageUrl,
  mobileImageUrl,
  desktopFocalX,
  desktopFocalY,
  mobileFocalX,
  mobileFocalY,
  onDesktopFocalChange,
  onMobileFocalChange,
}: FocalPointPickerProps) {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingDesktop, setIsDraggingDesktop] = useState(false);
  const [isDraggingMobile, setIsDraggingMobile] = useState(false);

  // Ensure focal points are valid numbers
  const safeDesktopFocalX = safeNumber(desktopFocalX);
  const safeDesktopFocalY = safeNumber(desktopFocalY);
  const safeMobileFocalX = safeNumber(mobileFocalX);
  const safeMobileFocalY = safeNumber(mobileFocalY);

  const handleDesktopClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!desktopContainerRef.current) return;

      const rect = desktopContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onDesktopFocalChange(x, y);
    },
    [onDesktopFocalChange]
  );

  const handleDesktopMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingDesktop || !desktopContainerRef.current) return;

      const rect = desktopContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onDesktopFocalChange(x, y);
    },
    [isDraggingDesktop, onDesktopFocalChange]
  );

  const handleMobileClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!mobileContainerRef.current) return;

      const rect = mobileContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onMobileFocalChange(x, y);
    },
    [onMobileFocalChange]
  );

  const handleMobileMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDraggingMobile || !mobileContainerRef.current) return;

      const rect = mobileContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onMobileFocalChange(x, y);
    },
    [isDraggingMobile, onMobileFocalChange]
  );

  if (!desktopImageUrl) {
    return (
      <div className="w-full h-48 bg-[var(--cream)] border-2 border-[var(--ink)]/10 flex items-center justify-center text-[var(--ink)]/40">
        No image selected
      </div>
    );
  }

  const FocalMarker = ({ focalX, focalY }: { focalX: number; focalY: number }) => (
    <div
      className="absolute w-8 h-8 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-10"
      style={{
        left: `${focalX * 100}%`,
        top: `${focalY * 100}%`,
      }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 border-2 border-white rounded-full shadow-lg" />
      {/* Inner dot */}
      <div className="absolute inset-2 bg-[var(--tv-red)] rounded-full border-2 border-white" />
      {/* Crosshairs */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/80 transform -translate-y-1/2" />
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/80 transform -translate-x-1/2" />
    </div>
  );

  const GridOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
      <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
    </div>
  );

  const currentMobileImage = mobileImageUrl || desktopImageUrl;

  return (
    <div className="space-y-4">
      <div className="text-sm text-[var(--ink)]/60">
        Click on each image to set its focal point (where the image will be centered when cropped)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desktop Focal Point */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-display text-sm uppercase text-[var(--ink)]">
            <Monitor className="w-4 h-4" />
            Desktop Focal Point
          </div>
          <div
            ref={desktopContainerRef}
            className="relative w-full h-48 bg-[var(--cream)] border-2 border-[var(--ink)]/20 overflow-hidden cursor-crosshair select-none"
            onClick={handleDesktopClick}
            onMouseMove={handleDesktopMouseMove}
            onMouseDown={() => setIsDraggingDesktop(true)}
            onMouseUp={() => setIsDraggingDesktop(false)}
            onMouseLeave={() => setIsDraggingDesktop(false)}
          >
            <Image
              src={desktopImageUrl}
              alt="Desktop focal point preview"
              fill
              className="object-cover"
            />
            <FocalMarker focalX={safeDesktopFocalX} focalY={safeDesktopFocalY} />
            <GridOverlay />
          </div>
          <div className="text-xs text-[var(--ink)]/50 text-center">
            Position: {Math.round(safeDesktopFocalX * 100)}%, {Math.round(safeDesktopFocalY * 100)}%
          </div>
        </div>

        {/* Mobile Focal Point */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-display text-sm uppercase text-[var(--ink)]">
            <Smartphone className="w-4 h-4" />
            Mobile Focal Point
            {!mobileImageUrl && <span className="text-xs text-[var(--ink)]/40 normal-case">(using desktop image)</span>}
          </div>
          <div
            ref={mobileContainerRef}
            className="relative w-full h-48 bg-[var(--cream)] border-2 border-[var(--ink)]/20 overflow-hidden cursor-crosshair select-none"
            onClick={handleMobileClick}
            onMouseMove={handleMobileMouseMove}
            onMouseDown={() => setIsDraggingMobile(true)}
            onMouseUp={() => setIsDraggingMobile(false)}
            onMouseLeave={() => setIsDraggingMobile(false)}
          >
            <Image
              src={currentMobileImage}
              alt="Mobile focal point preview"
              fill
              className="object-cover"
            />
            <FocalMarker focalX={safeMobileFocalX} focalY={safeMobileFocalY} />
            <GridOverlay />
          </div>
          <div className="text-xs text-[var(--ink)]/50 text-center">
            Position: {Math.round(safeMobileFocalX * 100)}%, {Math.round(safeMobileFocalY * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
