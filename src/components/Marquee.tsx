"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Marquee({ children, speed = 20, className = "" }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Move through 50% of content (2 full sets) before looping seamlessly
    // Double the duration to maintain the same visual speed
    gsap.to(marquee, {
      xPercent: -50,
      repeat: -1,
      duration: speed * 2,
      ease: "linear",
    });
  }, [speed]);

  return (
    <div className="marquee-container">
      <div ref={marqueeRef} className={`flex ${className}`}>
        {children}
        {children}
        {children}
        {children}
      </div>
    </div>
  );
}
