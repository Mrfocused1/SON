"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Default fallback social links
const defaultSocialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://www.youtube.com/sonnetworks", label: "YouTube" },
];

export function Footer() {
  const [socialLinks, setSocialLinks] = useState(defaultSocialLinks);

  // Load social links from Supabase
  useEffect(() => {
    async function loadSocialLinks() {
      if (!supabase) return;

      try {
        const { data: socialData } = await supabase
          .from("social_links")
          .select("*")
          .order("order", { ascending: true });

        if (socialData && socialData.length > 0) {
          setSocialLinks(
            socialData.map((social) => ({
              href: social.href,
              label: social.label,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading social links:", error);
      }
    }

    loadSocialLinks();
  }, []);
  return (
    <footer className="bg-[var(--ink)] text-[var(--cream)] py-12 px-6 border-t-2 border-[var(--cream)]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <Image
            src="https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj"
            alt="SON Networks Logo"
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-[var(--cream)]"
          />
          <span className="font-display text-3xl uppercase">SON NETWORKS</span>
        </div>
        <div className="flex gap-8 font-display text-xl uppercase tracking-widest text-gray-400">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--tv-red)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
