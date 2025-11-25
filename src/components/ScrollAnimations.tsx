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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Wait for preloader to finish
    if (isLoading) return;

    // Kill all existing ScrollTriggers on route change
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // On mobile, use simple fade-in animations without ScrollTrigger
    if (isMobile) {
      const timeout = setTimeout(() => {
        // Simple animations for mobile - all elements animate in on page load
        gsap.fromTo(
          ".animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-up, .animate-pop",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
        );

        gsap.utils.toArray<HTMLElement>(".animate-stagger").forEach((container) => {
          gsap.fromTo(
            container.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
          );
        });
      }, 100);

      return () => clearTimeout(timeout);
    }

    // Small delay to ensure DOM is ready after preloader or route change
    const timeout = setTimeout(() => {
    const ctx = gsap.context(() => {
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
            },
          }
        );
      });
    });

    return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeout);
  }, [isLoading, pathname, isMobile]);

  return null;
}
