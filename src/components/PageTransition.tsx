"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    // Animate page in
    gsap.fromTo(
      curtain,
      { scaleY: 1, transformOrigin: "top" },
      {
        scaleY: 0,
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(curtain, { transformOrigin: "bottom" });
        },
      }
    );

    // Scroll to top
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div ref={curtainRef} className="transition-curtain" />
      {children}
    </>
  );
}
