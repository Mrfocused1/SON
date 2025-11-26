"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePreloader } from "@/context/PreloaderContext";

export function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { setIsLoading } = usePreloader();

  useEffect(() => {
    const preloader = preloaderRef.current;
    const text = textRef.current;
    if (!preloader || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        setIsLoading(false);
      },
    });

    // Animate the stroke text with color pulse
    tl.fromTo(
      text,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "power4.out" }
    )
      .to(text, {
        webkitTextStroke: "2px #FF3333",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(text, {
        webkitTextStroke: "2px #333",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(text, {
        webkitTextStroke: "2px #FF3333",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(text, {
        webkitTextStroke: "2px #333",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });
  }, [setIsLoading]);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-[#111111] z-[10001] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <h1
        ref={textRef}
        className="font-display text-[15vw] md:text-[12vw] leading-none whitespace-nowrap uppercase tracking-tight"
        style={{
          WebkitTextStroke: "2px #333",
          color: "transparent",
        }}
      >
        SON NETWORKS
      </h1>
    </div>
  );
}
