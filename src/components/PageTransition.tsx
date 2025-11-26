"use client";

import { useEffect, useRef } from "react";
import { usePageTransition } from "@/context/TransitionContext";

export function PageTransition() {
  const { isTransitioning, completeTransition, finishTransition } = usePageTransition();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Get main element reference
    mainRef.current = document.querySelector("main");
  }, []);

  useEffect(() => {
    if (isTransitioning && mainRef.current) {
      const main = mainRef.current;

      // Fade out
      main.style.transition = "opacity 150ms ease-out";
      main.style.opacity = "0";

      // After fade out, navigate
      const navigateTimer = setTimeout(() => {
        completeTransition();

        // Small delay for new content to render, then fade in
        setTimeout(() => {
          main.style.transition = "opacity 150ms ease-in";
          main.style.opacity = "1";
          finishTransition();
        }, 50);
      }, 150);

      return () => clearTimeout(navigateTimer);
    }
  }, [isTransitioning, completeTransition, finishTransition]);

  return null;
}
