"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 font-display text-sm uppercase">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-2 py-1 transition-colors ${
          language === "fr"
            ? "text-[var(--tv-red)]"
            : "text-[var(--ink)] hover:text-[var(--tv-red)]"
        }`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-[var(--ink)]/30">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 transition-colors ${
          language === "en"
            ? "text-[var(--tv-red)]"
            : "text-[var(--ink)] hover:text-[var(--tv-red)]"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
