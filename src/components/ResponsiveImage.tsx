"use client";

import Image from "next/image";

interface ResponsiveImageProps {
  desktop: string;
  mobile?: string | null;
  desktopFocalX?: number;
  desktopFocalY?: number;
  mobileFocalX?: number;
  mobileFocalY?: number;
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
  desktopFocalX = 0.5,
  desktopFocalY = 0.5,
  mobileFocalX = 0.5,
  mobileFocalY = 0.5,
  alt,
  fill,
  width,
  height,
  priority,
  className = "",
  sizes,
}: ResponsiveImageProps) {
  const desktopObjectPosition = `${desktopFocalX * 100}% ${desktopFocalY * 100}%`;
  const mobileObjectPosition = `${mobileFocalX * 100}% ${mobileFocalY * 100}%`;

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
          style={{ objectPosition: desktopObjectPosition }}
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
          style={{ objectPosition: mobileObjectPosition }}
          sizes={sizes}
        />
      </>
    );
  }

  // Single image with different focal points for desktop and mobile
  return (
    <>
      {/* Desktop view with desktop focal point */}
      <Image
        src={desktop}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        className={`${className} hidden md:block`}
        style={{ objectPosition: desktopObjectPosition }}
        sizes={sizes}
      />
      {/* Mobile view with mobile focal point */}
      <Image
        src={desktop}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        className={`${className} block md:hidden`}
        style={{ objectPosition: mobileObjectPosition }}
        sizes={sizes}
      />
    </>
  );
}
