"use client";

import { useEffect, useRef, useState } from "react";
import { useTransition } from "@/context/TransitionContext";
import gsap from "gsap";

export function PageTransition() {
  const { isTransitioning, completeTransition, finishTransition } = useTransition();
  const transitionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isTransitioning && !isAnimating.current) {
      isAnimating.current = true;
      setIsVisible(true);

      const transition = transitionRef.current;
      if (!transition) return;

      // Reset position
      gsap.set(transition, { yPercent: 100 });

      // Animation timeline
      const tl = gsap.timeline();

      // Slide in from bottom - cover the screen FIRST
      tl.to(transition, {
        yPercent: 0,
        duration: 0.35,
        ease: "power3.out",
        onComplete: () => {
          // NOW navigate after screen is covered
          completeTransition();
        },
      })
        // Wait for navigation and content to settle
        .to({}, { duration: 0.4 })
        // Slide out to top
        .to(transition, {
          yPercent: -100,
          duration: 0.4,
          ease: "power3.inOut",
          onComplete: () => {
            setIsVisible(false);
            isAnimating.current = false;
            finishTransition();
          },
        });
    }
  }, [isTransitioning, completeTransition, finishTransition]);

  if (!isVisible) return null;

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
