"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface FocalPointPickerProps {
  imageUrl: string;
  focalX: number;
  focalY: number;
  onFocalChange: (x: number, y: number) => void;
}

export function FocalPointPicker({
  imageUrl,
  focalX,
  focalY,
  onFocalChange,
}: FocalPointPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onFocalChange(x, y);
    },
    [onFocalChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onFocalChange(x, y);
    },
    [isDragging, onFocalChange]
  );

  if (!imageUrl) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        No image selected
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600">
        Click on the image to set the focal point
      </div>
      <div
        ref={containerRef}
        className="relative w-full h-48 bg-gray-100 rounded overflow-hidden cursor-crosshair select-none"
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <Image
          src={imageUrl}
          alt="Focal point preview"
          fill
          className="object-cover"
        />

        {/* Crosshair overlay */}
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

        {/* Grid overlay for guidance */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Position: {Math.round(focalX * 100)}%, {Math.round(focalY * 100)}%
      </div>
    </div>
  );
}
