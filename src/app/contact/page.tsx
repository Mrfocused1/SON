"use client";

import { useState } from "react";
import Image from "next/image";
import { Youtube, Instagram, Twitter } from "lucide-react";

const socialLinks = [
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
    <div>
      <div className="bg-[var(--tv-red)] min-h-screen text-[var(--ink)] grid grid-cols-1 md:grid-cols-2">
        {/* Contact Form */}
        <div className="p-8 md:p-16 md:border-r-2 border-[var(--ink)] bg-[var(--cream)] flex flex-col justify-center">
          <h2 className="font-display text-6xl uppercase mb-8 animate-fade-up">Hit Us Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-left">
            <div>
              <label className="block font-display text-xl uppercase mb-2">
                Who Are You?
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
                Your Email
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
                The Idea
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
              {isSubmitting ? "Sending..." : "Send Transmission"}
            </button>

            {submitStatus === "success" && (
              <p className="text-green-600 text-center font-bold">
                Message sent successfully! We&apos;ll get back to you soon.
              </p>
            )}
            {submitStatus === "error" && (
              <p className="text-[var(--tv-red)] text-center font-bold">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        {/* Links & Info */}
        <div className="p-8 md:p-16 flex flex-col justify-between bg-[var(--tv-red)] text-[var(--cream)]">
          <div>
            <h2 className="font-display text-6xl uppercase mb-8 mix-blend-difference animate-fade-up">
              Socials
            </h2>
            <ul className="space-y-4 font-display text-3xl uppercase animate-stagger">
              {socialLinks.map((link) => {
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
                <span className="font-sans font-bold text-sm opacity-80">
                  Los Angeles, CA
                </span>
              </div>
            </div>
            <p className="font-sans text-xs font-bold opacity-60">
              © 2025 SON Networks LLC. All Rights Reserved.
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
