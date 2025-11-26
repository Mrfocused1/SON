"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from "react";
import { useRouter } from "next/navigation";

interface TransitionContextType {
  isTransitioning: boolean;
  navigateTo: (href: string) => void;
  completeTransition: () => void;
  finishTransition: () => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pendingHrefRef = useRef<string | null>(null);

  const navigateTo = useCallback((href: string) => {
    // Don't transition if already transitioning or same page
    if (isTransitioning) return;

    pendingHrefRef.current = href;
    setIsTransitioning(true);
  }, [isTransitioning]);

  const completeTransition = useCallback(() => {
    if (pendingHrefRef.current) {
      router.push(pendingHrefRef.current);
      pendingHrefRef.current = null;
    }
  }, [router]);

  const finishTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return (
    <TransitionContext.Provider value={{
      isTransitioning,
      navigateTo,
      completeTransition,
      finishTransition,
    }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a TransitionProvider");
  }
  return context;
}
