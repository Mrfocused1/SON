"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Youtube, Instagram, Twitter, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLanguage } from "@/context/LanguageContext";

// Icon mapping for social links
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Youtube,
  Instagram,
  Twitter,
  Link: LinkIcon,
};

// Default fallback social links
const defaultSocialLinks = [
  {
    href: "https://www.youtube.com/sonnetworks",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: Twitter,
  },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [socialLinks, setSocialLinks] = useState<Array<{ href: string; label: string; icon: React.ComponentType<{ className?: string }> }>>
(defaultSocialLinks);
  const [pageContent, setPageContent] = useState({
    formTitle: "",
    infoTitle: "",
    infoTitleAccent: "",
    infoSubtitle: "",
    contactEmail: "hello@sonnetworks.com",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Load contact page content and social links from Supabase - OPTIMIZED: Parallel fetching
  useEffect(() => {
    async function loadContactData() {
      if (!supabase) return;

      try {
        // Parallel fetch for better performance
        const [contentResult, socialResult] = await Promise.all([
          supabase.from("contact_content").select("*").single(),
          supabase.from("social_links").select("*").order("order", { ascending: true }),
        ]);

        // Process contact_content
        const contentData = contentResult.data;
        if (contentData) {
          setPageContent({
            formTitle: contentData.form_title || "Hit Us Up",
            infoTitle: contentData.info_title || "Let's",
            infoTitleAccent: contentData.info_title_accent || "Talk.",
            infoSubtitle: contentData.info_subtitle || "Whether you're a brand looking to collaborate, a creator wanting to join, or just want to say hi.",
            contactEmail: contentData.contact_email || "hello@sonnetworks.com",
          });
        }

        // Process social links
        const socialData = socialResult.data;
        if (socialData && socialData.length > 0) {
          setSocialLinks(
            socialData.map((social: any) => ({
              href: social.href,
              label: social.label,
              icon: iconMap[social.icon] || LinkIcon,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading contact data:", error);
      }
    }

    loadContactData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="bg-[var(--tv-red)] min-h-screen text-[var(--ink)] grid grid-cols-1 md:grid-cols-2">
        {/* Contact Form */}
        <div className="p-8 md:p-16 md:border-r-2 border-[var(--ink)] bg-[var(--cream)] flex flex-col justify-center">
          <h2 className="font-display text-6xl uppercase mb-8 animate-fade-up">{pageContent.formTitle || t.contact.formTitle}</h2>
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-left">
            <div>
              <label className="block font-display text-xl uppercase mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-[var(--ink)] py-2 text-xl font-bold focus:outline-none focus:border-[var(--tv-red)] placeholder-gray-400"
                placeholder="NAME"
                required
              />
            </div>
            <div>
              <label className="block font-display text-xl uppercase mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-[var(--ink)] py-2 text-xl font-bold focus:outline-none focus:border-[var(--tv-red)] placeholder-gray-400"
                placeholder="EMAIL"
                required
              />
            </div>
            <div>
              <label className="block font-display text-xl uppercase mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b-2 border-[var(--ink)] py-2 text-xl font-bold focus:outline-none focus:border-[var(--tv-red)] placeholder-gray-400 resize-none"
                placeholder="TELL US"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--ink)] text-[var(--cream)] py-4 font-display text-2xl uppercase hover:bg-[var(--tv-red)] hover:text-[var(--ink)] hover:border-2 hover:border-[var(--ink)] transition-all border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-600 text-center font-bold">
                {t.contact.success}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-[var(--tv-red)] text-center font-bold">
                {t.contact.error}
              </p>
            )}
          </form>
        </div>

        {/* Links & Info */}
        <div className="p-8 md:p-16 flex flex-col justify-between bg-[var(--tv-red)] text-[var(--cream)]">
          <div>
            <h2 className="font-display text-6xl uppercase mb-8 mix-blend-difference animate-fade-up">
              {pageContent.infoTitle || t.contact.infoTitle}<br />{pageContent.infoTitleAccent || t.contact.infoTitleAccent}
            </h2>
            <ul className="space-y-4 font-display text-3xl uppercase animate-stagger">
              {socialLinks.map((link: any) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--ink)] transition-colors flex items-center gap-4"
                    >
                      <Icon className="w-8 h-8" /> {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            {pageContent.infoSubtitle && (
              <p className="mt-6 text-lg opacity-80">{pageContent.infoSubtitle}</p>
            )}
          </div>
          <div className="mt-12 md:mt-0 animate-scale-up">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj"
                alt="SON Networks Logo"
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-4 border-[var(--ink)]"
              />
              <div>
                <span className="block font-display text-2xl uppercase leading-none">
                  SON Networks
                </span>
              </div>
            </div>
            <p className="font-sans text-xs font-bold opacity-60">
              © 2025 SON Networks LLC. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>

      {/* Giant Footer Text */}
      <div className="border-t-2 border-[var(--ink)] bg-[var(--ink)] overflow-hidden py-4">
        <h1 className="font-display text-[20vw] text-[var(--ink)] leading-none whitespace-nowrap stroke-text-light">
          SON NETWORKS SON NETWORKS
        </h1>
      </div>
    </div>
  );
}
