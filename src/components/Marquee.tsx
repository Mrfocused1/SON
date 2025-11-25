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

    gsap.to(marquee, {
      xPercent: -25,
      repeat: -1,
      duration: speed,
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
