"use client";

import { useEffect } from "react";
import { usePageTransition } from "@/context/TransitionContext";

export function PageTransition() {
  const { isTransitioning, completeTransition, finishTransition } = usePageTransition();

  useEffect(() => {
    if (isTransitioning) {
      // Navigate immediately without animation
      completeTransition();
      finishTransition();
    }
  }, [isTransitioning, completeTransition, finishTransition]);

  // No visual component - just handles navigation
  return null;
}
