"use client";

import Image from "next/image";

interface ResponsiveImageProps {
  desktop: string;
  mobile?: string | null;
  focalX?: number;
  focalY?: number;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ResponsiveImage({
  desktop,
  mobile,
  focalX = 0.5,
  focalY = 0.5,
  alt,
  fill,
  width,
  height,
  priority,
  className = "",
  sizes,
}: ResponsiveImageProps) {
  const objectPosition = `${focalX * 100}% ${focalY * 100}%`;

  // If mobile image is provided, render both with CSS media query handling
  if (mobile) {
    return (
      <>
        {/* Desktop image - hidden on mobile */}
        <Image
          src={desktop}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          className={`${className} hidden md:block`}
          style={{ objectPosition }}
          sizes={sizes}
        />
        {/* Mobile image - shown only on mobile */}
        <Image
          src={mobile}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          className={`${className} block md:hidden`}
          style={{ objectPosition: "center" }}
          sizes={sizes}
        />
      </>
    );
  }

  // Single image with focal point positioning
  return (
    <Image
      src={desktop}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      className={className}
      style={{ objectPosition }}
      sizes={sizes}
    />
  );
}
