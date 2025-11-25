"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Default fallback roles
const defaultRoles = [
  {
    title: "Content Creator",
    type: "Remote",
    typeColor: "bg-[var(--tv-red)]",
    description: "Bring your unique voice and ideas to our network.",
  },
  {
    title: "Script Writer",
    type: "LA / Hybrid",
    typeColor: "bg-[var(--ink)]",
    description: "Comedy focused. Must be chronically online.",
  },
  {
    title: "On-Screen Talent",
    type: "Flexible",
    typeColor: "bg-[var(--tv-red)]",
    description: "Camera-ready personalities who can captivate audiences.",
  },
];

export default function JoinPage() {
  const [roles, setRoles] = useState(defaultRoles);
  const [pageContent, setPageContent] = useState({
    title: "Join The",
    titleAccent: "Team.",
    subtitle: "We are always looking for editors, writers, and talent. If you have the sauce, we have the platform.",
    pitchTitle: "Got An",
    pitchTitleAccent: "Idea?",
    pitchSubtitle: "We want to hear your craziest concepts. Pitch us your show, series, or one-off video idea.",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pitch: "",
  });
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    portfolio: "",
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [applicationSubmitting, setApplicationSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle");

  // Load join page content and roles from Supabase
  useEffect(() => {
    async function loadJoinData() {
      if (!supabase) return;

      try {
        // Load join_content for page titles
        const { data: contentData } = await supabase
          .from("join_content")
          .select("*")
          .single();

        if (contentData) {
          setPageContent({
            title: contentData.title || "Join The",
            titleAccent: contentData.title_accent || "Team.",
            subtitle: contentData.subtitle || "We are always looking for editors, writers, and talent. If you have the sauce, we have the platform.",
            pitchTitle: contentData.pitch_title || "Got An",
            pitchTitleAccent: contentData.pitch_title_accent || "Idea?",
            pitchSubtitle: contentData.pitch_subtitle || "We want to hear your craziest concepts. Pitch us your show, series, or one-off video idea.",
          });
        }

        // Load roles ordered by order field
        const { data: rolesData } = await supabase
          .from("roles")
          .select("*")
          .order("order", { ascending: true });

        if (rolesData && rolesData.length > 0) {
          setRoles(
            rolesData.map((role, index) => ({
              title: role.title,
              type: role.type,
              typeColor: index % 2 === 0 ? "bg-[var(--tv-red)]" : "bg-[var(--ink)]",
              description: role.description,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading join data:", error);
      }
    }

    loadJoinData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", pitch: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitting(true);
    setApplicationStatus("idle");

    try {
      const response = await fetch("/api/pitch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: applicationData.name,
          email: applicationData.email,
          pitch: `Role: ${selectedRole}\n\nPortfolio: ${applicationData.portfolio}\n\nExperience: ${applicationData.experience}`,
        }),
      });

      if (response.ok) {
        setApplicationStatus("success");
        setApplicationData({ name: "", email: "", portfolio: "", experience: "" });
        setTimeout(() => {
          setSelectedRole(null);
          setApplicationStatus("idle");
        }, 2000);
      } else {
        setApplicationStatus("error");
      }
    } catch {
      setApplicationStatus("error");
    } finally {
      setApplicationSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen overflow-x-hidden">
      {/* Left: Join The Team */}
      <div className="bg-[var(--cream)] p-8 md:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--ink)] flex flex-col">
        <h2 className="font-display text-6xl md:text-8xl uppercase text-[var(--ink)] mb-8 animate-fade-up">
          {pageContent.title}<br />{pageContent.titleAccent}
        </h2>
        <p className="text-xl mb-12 font-medium animate-fade-up">
          {pageContent.subtitle}
        </p>

        <div className="space-y-8 flex-1 animate-stagger">
          {roles.map((role) => (
            <div
              key={role.title}
              className="group border-b-2 border-[var(--ink)] pb-6 cursor-pointer hover:pl-4 transition-all"
              data-cursor="apply"
              onClick={() => setSelectedRole(role.title)}
            >
              <div className="flex justify-between items-end mb-2">
                <h3 className="font-display text-3xl uppercase group-hover:text-[var(--tv-red)] transition-colors">{role.title}</h3>
                <span
                  className={`${role.typeColor} text-white text-xs font-bold px-2 py-1 uppercase`}
                >
                  {role.type}
                </span>
              </div>
              <p className="text-sm text-gray-500">{role.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Suggest Ideas (Pitch) */}
      <div className="bg-[var(--ink)] p-8 md:p-16 text-[var(--cream)] flex flex-col">
        <h2 className="font-display text-6xl md:text-8xl uppercase text-[var(--tv-red)] mb-8 animate-fade-up">
          {pageContent.pitchTitle}<br />{pageContent.pitchTitleAccent}
        </h2>
        <p className="text-xl mb-12 text-gray-400 animate-fade-up">
          {pageContent.pitchSubtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-right">
          <div className="relative group form-group">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-2xl font-display uppercase focus:outline-none focus:border-[var(--tv-red)] transition-colors placeholder-transparent"
              id="name"
              placeholder="Name"
              required
            />
            <label
              htmlFor="name"
              className="absolute left-0 top-3 text-gray-500 uppercase font-bold text-sm transition-all pointer-events-none"
            >
              Your Name
            </label>
          </div>
          <div className="relative group form-group">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-2xl font-display uppercase focus:outline-none focus:border-[var(--tv-red)] transition-colors placeholder-transparent"
              id="email"
              placeholder="Email"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-3 text-gray-500 uppercase font-bold text-sm transition-all pointer-events-none"
            >
              Your Email
            </label>
          </div>
          <div className="relative group form-group">
            <textarea
              rows={4}
              value={formData.pitch}
              onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
              className="w-full bg-transparent border-b-2 border-gray-700 py-3 text-xl font-bold focus:outline-none focus:border-[var(--tv-red)] transition-colors placeholder-transparent resize-none"
              id="pitch"
              placeholder="Pitch"
              required
            />
            <label
              htmlFor="pitch"
              className="absolute left-0 top-3 text-gray-500 uppercase font-bold text-sm transition-all pointer-events-none"
            >
              The Pitch (Keep it brief)
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--tv-red)] text-white font-display text-3xl uppercase py-6 hover:bg-[var(--cream)] hover:text-[var(--ink)] transition-colors border-2 border-transparent hover:border-[var(--ink)] mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Idea"}
          </button>

          {submitStatus === "success" && (
            <p className="text-green-500 text-center font-bold">
              Pitch sent successfully! We&apos;ll be in touch.
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-[var(--tv-red)] text-center font-bold">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* Application Modal */}
      {selectedRole && (
        <div
          className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRole(null);
          }}
        >
          <div className="bg-[var(--cream)] w-full max-w-lg relative border-2 border-[var(--ink)]">
            {/* Header */}
            <div className="bg-[var(--ink)] text-[var(--cream)] p-6 flex justify-between items-center">
              <h3 className="font-display text-3xl uppercase">Apply: {selectedRole}</h3>
              <button
                onClick={() => setSelectedRole(null)}
                className="hover:text-[var(--tv-red)] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleApplicationSubmit} className="p-6 space-y-6">
              <div>
                <label className="block font-display text-lg uppercase mb-2 text-[var(--ink)]">
                  Your Name
                </label>
                <input
                  type="text"
                  value={applicationData.name}
                  onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                  className="w-full bg-transparent border-2 border-[var(--ink)] px-4 py-3 text-lg font-bold focus:outline-none focus:border-[var(--tv-red)] transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block font-display text-lg uppercase mb-2 text-[var(--ink)]">
                  Email
                </label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                  className="w-full bg-transparent border-2 border-[var(--ink)] px-4 py-3 text-lg font-bold focus:outline-none focus:border-[var(--tv-red)] transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block font-display text-lg uppercase mb-2 text-[var(--ink)]">
                  Portfolio / Social Links
                </label>
                <input
                  type="text"
                  value={applicationData.portfolio}
                  onChange={(e) => setApplicationData({ ...applicationData, portfolio: e.target.value })}
                  className="w-full bg-transparent border-2 border-[var(--ink)] px-4 py-3 text-lg font-bold focus:outline-none focus:border-[var(--tv-red)] transition-colors"
                  placeholder="YouTube, Instagram, Website..."
                  required
                />
              </div>

              <div>
                <label className="block font-display text-lg uppercase mb-2 text-[var(--ink)]">
                  Tell Us About Yourself
                </label>
                <textarea
                  rows={4}
                  value={applicationData.experience}
                  onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                  className="w-full bg-transparent border-2 border-[var(--ink)] px-4 py-3 text-lg font-bold focus:outline-none focus:border-[var(--tv-red)] transition-colors resize-none"
                  placeholder="Your experience, why you want to join..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={applicationSubmitting}
                className="w-full bg-[var(--tv-red)] text-[var(--cream)] py-4 font-display text-2xl uppercase hover:bg-[var(--ink)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applicationSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              {applicationStatus === "success" && (
                <p className="text-green-600 text-center font-bold">
                  Application sent! We&apos;ll be in touch.
                </p>
              )}
              {applicationStatus === "error" && (
                <p className="text-[var(--tv-red)] text-center font-bold">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
