"use client";

import { usePageTransition } from "@/context/TransitionContext";
import { usePathname } from "next/navigation";
import { ReactNode, MouseEvent } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ href, children, className, onClick }: TransitionLinkProps) {
  const { navigateTo } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call any additional onClick handler (like closing mobile menu)
    if (onClick) onClick();
    
    // Don't transition if same page
    if (pathname === href) return;
    
    // Trigger transition then navigate
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
