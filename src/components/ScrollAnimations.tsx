"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/context/PreloaderContext";

gsap.registerPlugin(ScrollTrigger);

export function ScrollAnimations() {
  const { isLoading } = usePreloader();
  const pathname = usePathname();
  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    // Wait for preloader to finish
    if (isLoading) return;

    // Kill all existing ScrollTriggers on route change
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Configure ScrollTrigger to prevent scroll interference
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
      limitCallbacks: true
    });

    // On mobile, skip all GSAP animations to prevent scroll issues
    if (isMobile) {
      // Just make all animated elements visible without any GSAP
      const elements = document.querySelectorAll('.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-up, .animate-pop, .animate-stagger, .animate-stagger > *');
      elements.forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Defer animation setup significantly to avoid blocking initial scroll
    // Use requestIdleCallback for best performance, setTimeout as fallback
    let ctx: gsap.Context;
    const setupCallback = () => {
    ctx = gsap.context(() => {
      // Animate once per page visit - plays when scrolled into view, stays visible after

      // Fade up animations for headings
      gsap.utils.toArray<HTMLElement>(".animate-fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Fade in animations
      gsap.utils.toArray<HTMLElement>(".animate-fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Slide in from left
      gsap.utils.toArray<HTMLElement>(".animate-slide-left").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -80 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Slide in from right
      gsap.utils.toArray<HTMLElement>(".animate-slide-right").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: 80 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Scale up animations for images
      gsap.utils.toArray<HTMLElement>(".animate-scale-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Stagger children animations
      gsap.utils.toArray<HTMLElement>(".animate-stagger").forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Button pop animations
      gsap.utils.toArray<HTMLElement>(".animate-pop").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Reveal animations (clip-path)
      gsap.utils.toArray<HTMLElement>(".animate-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    const setupTimer = 'requestIdleCallback' in window
      ? requestIdleCallback(setupCallback, { timeout: 500 })
      : setTimeout(setupCallback, 100);

    return () => {
      if ('requestIdleCallback' in window) {
        cancelIdleCallback(setupTimer as number);
      } else {
        clearTimeout(setupTimer as number);
      }
      if (ctx) ctx.revert();
    };
  }, [isLoading, pathname, isMobile]);

  return null;
}
