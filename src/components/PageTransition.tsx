"use client";

import { useEffect, useState } from "react";
import { usePageTransition } from "@/context/TransitionContext";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const { isTransitioning, completeTransition, finishTransition } = usePageTransition();
  const pathname = usePathname();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  // Handle fade out when navigation starts
  useEffect(() => {
    if (isTransitioning && !isFadingOut) {
      setIsFadingOut(true);

      // After fade out completes, navigate
      const fadeOutTimer = setTimeout(() => {
        completeTransition();
      }, 200); // 200ms fade out

      return () => clearTimeout(fadeOutTimer);
    }
  }, [isTransitioning, isFadingOut, completeTransition]);

  // Handle fade in when route changes
  useEffect(() => {
    if (isFadingOut) {
      // Route changed, start fade in
      setIsFadingOut(false);
      setIsFadingIn(true);

      // After fade in completes, finish transition
      const fadeInTimer = setTimeout(() => {
        setIsFadingIn(false);
        finishTransition();
      }, 200); // 200ms fade in

      return () => clearTimeout(fadeInTimer);
    }
  }, [pathname]); // Triggers when route actually changes

  return (
    <>
      {/* Fade overlay */}
      <div
        className={`fixed inset-0 bg-[var(--ink)] z-[9998] pointer-events-none transition-opacity duration-200 ${
          isFadingOut ? "opacity-100" : "opacity-0"
        }`}
        style={{ display: isFadingOut || isFadingIn ? "block" : "none" }}
      />

      {/* Page content fade effect via CSS */}
      <style jsx global>{`
        main {
          transition: opacity 200ms ease-in-out;
          opacity: ${isFadingOut ? 0 : 1};
        }
      `}</style>
    </>
  );
}
