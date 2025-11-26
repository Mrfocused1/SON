"use client";

import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const inactiveColor = variant === "dark"
    ? "text-[var(--cream)] hover:text-[var(--tv-red)]"
    : "text-[var(--ink)] hover:text-[var(--tv-red)]";

  const separatorColor = variant === "dark"
    ? "text-[var(--cream)]/30"
    : "text-[var(--ink)]/30";

  return (
    <div className="flex items-center gap-1 font-display text-sm uppercase">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-2 py-1 transition-colors ${
          language === "fr"
            ? "text-[var(--tv-red)]"
            : inactiveColor
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className={separatorColor}>|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 transition-colors ${
          language === "en"
            ? "text-[var(--tv-red)]"
            : inactiveColor
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
