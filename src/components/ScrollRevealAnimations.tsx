"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { usePreloader } from "@/context/PreloaderContext";

/**
 * Modern scroll reveal animations using IntersectionObserver
 * Replaces GSAP ScrollTrigger to eliminate scroll direction resistance
 *
 * Benefits over GSAP:
 * - No scroll event interference
 * - Better performance (browser-optimized, async)
 * - Simpler code
 * - Native scroll behavior preserved
 */
export function ScrollRevealAnimations() {
  const { isLoading } = usePreloader();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for preloader to finish
    if (isLoading) return;

    // On mobile, elements are visible by default (CSS handles this)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    // Create IntersectionObserver for scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'revealed' class when element enters viewport
            entry.target.classList.add('revealed');
            // Stop observing after animation (since animations play once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -15% 0px" // Start animation slightly before element is fully visible
      }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
      '.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, ' +
      '.animate-scale-up, .animate-pop, .animate-stagger > *, .animate-reveal'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [isLoading, pathname]);

  return null;
}
