"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition() {
  const pathname = usePathname();
  const [showTransition, setShowTransition] = useState(false);
  const transitionRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef<string>(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on initial load (handled by Preloader)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Skip if same path
    if (previousPathRef.current === pathname) return;

    // Route has changed
    previousPathRef.current = pathname;
    setShowTransition(true);

    const transition = transitionRef.current;
    if (!transition) return;

    // Quick transition animation
    const tl = gsap.timeline();

    // Slide in from bottom
    tl.fromTo(
      transition,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.3, ease: "power3.out" }
    )
      // Brief pause to ensure content is loaded
      .to({}, { duration: 0.2 })
      // Slide out to top
      .to(transition, {
        yPercent: -100,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => setShowTransition(false),
      });
  }, [pathname]);

  if (!showTransition) return null;

  return (
    <div
      ref={transitionRef}
      className="fixed inset-0 bg-[var(--ink)] z-[9999] flex items-center justify-center"
      style={{ transform: "translateY(100%)" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-[var(--tv-red)] rounded-full animate-pulse" />
        <span
          className="font-display text-4xl md:text-6xl uppercase tracking-tight"
          style={{
            WebkitTextStroke: "1px #555",
            color: "transparent",
          }}
        >
          SON
        </span>
      </div>
    </div>
  );
}
