"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { TransitionLink } from "@/components/TransitionLink";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Navigation links with translations
  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/shows", label: t.nav.shows },
    { href: "/join", label: t.nav.joinUs },
    { href: "/contact", label: t.nav.contactUs },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[var(--cream)] grid-b-border">
      <div className="flex justify-between items-stretch h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center px-6 md:px-10 grid-r-border"
        >
          <Image
            src="https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj"
            alt="SON Networks Logo"
            width={40}
            height={40}
            className="w-8 h-8 md:w-20 md:h-20 rounded-full border-2 border-[var(--ink)] group-hover:border-[var(--cream)] transition-colors"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-end items-stretch">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isContact = link.href === "/contact";

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`px-8 flex items-center font-display text-xl uppercase transition-colors grid-r-border ${
                  isContact
                    ? "hover:bg-[var(--tv-red)] hover:text-[var(--cream)]"
                    : "hover:bg-[var(--ink)] hover:text-[var(--cream)]"
                } ${
                  isActive && !isContact
                    ? "bg-[var(--ink)] text-[var(--cream)]"
                    : isActive && isContact
                    ? "bg-[var(--tv-red)] text-[var(--cream)]"
                    : ""
                }`}
              >
                {link.label}
              </TransitionLink>
            );
          })}
          {/* Language Switcher */}
          <div className="px-4 flex items-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden px-6 hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--ink)] text-[var(--cream)]">
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="block px-6 py-4 font-display text-xl uppercase border-b border-gray-800 hover:bg-[var(--tv-red)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </TransitionLink>
          ))}
          {/* Mobile Language Switcher */}
          <div className="px-6 py-4 border-b border-gray-800">
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      )}
    </nav>
  );
}
