"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("WATCH");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorLabel = cursorLabelRef.current;

    if (!cursorDot || !cursorLabel) return;

    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Skip if animation frame already requested
      rafId = requestAnimationFrame(() => {
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(cursorLabel, { x: e.clientX, y: e.clientY, duration: 0.15 });
        rafId = null;
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const label = target.getAttribute("data-cursor");

      if (label === "play") setCursorText("WATCH");
      else if (label === "apply") setCursorText("APPLY");
      else setCursorText("VIEW");

      setIsVisible(true);
      gsap.to(cursorDot, { scale: 0 });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to(cursorDot, { scale: 1 });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Observe DOM for interactive elements
    const setupInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll("[data-cursor]");
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Initial setup
    setupInteractiveElements();

    // Setup MutationObserver to handle dynamically added elements
    // Throttle to prevent excessive re-scans
    let observerTimeout: NodeJS.Timeout | null = null;
    const observer = new MutationObserver(() => {
      if (observerTimeout) clearTimeout(observerTimeout);
      observerTimeout = setTimeout(() => {
        setupInteractiveElements();
      }, 100);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (observerTimeout) clearTimeout(observerTimeout);
      if (rafId) cancelAnimationFrame(rafId);

      const interactiveElements = document.querySelectorAll("[data-cursor]");
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor-dot hidden md:block"
        style={{ background: '#FF3333' }}
      />
      <div
        ref={cursorLabelRef}
        className={`cursor-label hidden md:block ${isVisible ? "active" : ""}`}
      >
        {cursorText}
      </div>
    </>
  );
}
