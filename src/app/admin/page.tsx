"use client";

import { useState } from "react";
import {
  Home,
  Film,
  Users,
  Mail,
  Menu,
  Image as ImageIcon,
  Link as LinkIcon,
  Settings,
  Save,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ChevronRight
} from "lucide-react";

type Section = "home" | "shows" | "join" | "contact" | "navigation" | "footer" | "settings";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isSaving, setIsSaving] = useState(false);

  const sidebarItems = [
    { id: "home" as Section, label: "Home Page", icon: Home },
    { id: "shows" as Section, label: "Shows", icon: Film },
    { id: "join" as Section, label: "Join Page", icon: Users },
    { id: "contact" as Section, label: "Contact Page", icon: Mail },
    { id: "navigation" as Section, label: "Navigation", icon: Menu },
    { id: "footer" as Section, label: "Footer & Socials", icon: LinkIcon },
    { id: "settings" as Section, label: "Settings", icon: Settings },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--cream)]">
      {/* Admin Header */}
      <header className="bg-[var(--ink)] border-b-2 border-[var(--cream)]/20 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-3xl uppercase">Admin Dashboard</h1>
          <span className="bg-[var(--tv-red)] text-white px-3 py-1 text-sm font-display uppercase">
            SON Networks
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Eye className="w-4 h-4" />
            View Site
          </a>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[var(--tv-red)] px-6 py-2 font-display uppercase text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save All"}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-73px)] bg-[var(--ink)] border-r-2 border-[var(--cream)]/20">
          <nav className="py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 font-display uppercase text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--tv-red)] text-white"
                      : "hover:bg-[var(--cream)]/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeSection === "home" && <HomeEditor />}
          {activeSection === "shows" && <ShowsEditor />}
          {activeSection === "join" && <JoinEditor />}
          {activeSection === "contact" && <ContactEditor />}
          {activeSection === "navigation" && <NavigationEditor />}
          {activeSection === "footer" && <FooterEditor />}
          {activeSection === "settings" && <SettingsEditor />}
        </main>
      </div>
    </div>
  );
}

// Home Page Editor
function HomeEditor() {
  const [heroData, setHeroData] = useState({
    title: "Ready",
    titleAccent: "To Roll.",
    subtitle: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
    ctaText: "Watch Shows",
    ctaLink: "/shows",
    backgroundImage: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg",
    featuredVideoId: "hSiSKAgO3mM",
  });

  const [marqueeItems, setMarqueeItems] = useState([
    "Digital Production House",
    "Original Series",
    "Brand Stories",
    "Viral Content",
  ]);

  const [capabilities, setCapabilities] = useState([
    { title: "Create", description: "Bring your wildest ideas to life with us" },
    { title: "Collaborate", description: "Join forces with our creative network" },
    { title: "Innovate", description: "Push boundaries and break the internet" },
    { title: "Launch", description: "Go viral and reach millions together" },
  ]);

  const [studioSection, setStudioSection] = useState({
    title: "We Don't",
    titleAccent: "Play Safe.",
    subtitle: "SON Networks is a new breed of production house. We combine cinematic quality with the pacing of internet culture.",
  });

  const [quoteSection, setQuoteSection] = useState({
    quote: "We don't chase trends.",
    quoteAccent: "We set them.",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Home Page Editor</h2>

      {/* Hero Section */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Home className="w-5 h-5 text-[var(--tv-red)]" />
          Hero Section
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title Accent</label>
            <input
              type="text"
              value={heroData.titleAccent}
              onChange={(e) => setHeroData({ ...heroData, titleAccent: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <textarea
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              rows={3}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">CTA Button Text</label>
            <input
              type="text"
              value={heroData.ctaText}
              onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">CTA Link</label>
            <input
              type="text"
              value={heroData.ctaLink}
              onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Background Image URL</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={heroData.backgroundImage}
                onChange={(e) => setHeroData({ ...heroData, backgroundImage: e.target.value })}
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <button className="px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Featured YouTube Video ID</label>
            <input
              type="text"
              value={heroData.featuredVideoId}
              onChange={(e) => setHeroData({ ...heroData, featuredVideoId: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Marquee Text
        </h3>

        <div className="space-y-4">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...marqueeItems];
                  newItems[index] = e.target.value;
                  setMarqueeItems(newItems);
                }}
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <button
                onClick={() => setMarqueeItems(marqueeItems.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setMarqueeItems([...marqueeItems, "New Item"])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[var(--tv-red)]" />
          Capabilities
        </h3>

        <div className="space-y-4">
          {capabilities.map((cap, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={cap.title}
                  onChange={(e) => {
                    const newCaps = [...capabilities];
                    newCaps[index] = { ...newCaps[index], title: e.target.value };
                    setCapabilities(newCaps);
                  }}
                  placeholder="Title"
                  className="bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                />
                <input
                  type="text"
                  value={cap.description}
                  onChange={(e) => {
                    const newCaps = [...capabilities];
                    newCaps[index] = { ...newCaps[index], description: e.target.value };
                    setCapabilities(newCaps);
                  }}
                  placeholder="Description"
                  className="bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                />
              </div>
              <button
                onClick={() => setCapabilities(capabilities.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setCapabilities([...capabilities, { title: "", description: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Capability
          </button>
        </div>
      </section>

      {/* Studio Section */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Studio Section
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={studioSection.title}
              onChange={(e) => setStudioSection({ ...studioSection, title: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title Accent (Stroke)</label>
            <input
              type="text"
              value={studioSection.titleAccent}
              onChange={(e) => setStudioSection({ ...studioSection, titleAccent: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <textarea
              value={studioSection.subtitle}
              onChange={(e) => setStudioSection({ ...studioSection, subtitle: e.target.value })}
              rows={3}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Quote Section
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Quote</label>
            <input
              type="text"
              value={quoteSection.quote}
              onChange={(e) => setQuoteSection({ ...quoteSection, quote: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Quote Accent (Red)</label>
            <input
              type="text"
              value={quoteSection.quoteAccent}
              onChange={(e) => setQuoteSection({ ...quoteSection, quoteAccent: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Shows Editor
function ShowsEditor() {
  const [shows, setShows] = useState([
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg", title: "Studio Session", category: "Behind The Scenes" },
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg", title: "Content Creation", category: "Viral Short" },
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg", title: "Creative Process", category: "Documentary" },
  ]);

  const [pageContent, setPageContent] = useState({
    title: "Our Shows",
    subtitle: "Streaming now on YouTube. Click to watch.",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Shows Editor</h2>

      {/* Page Header */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Page Header
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={pageContent.title}
              onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={pageContent.subtitle}
              onChange={(e) => setPageContent({ ...pageContent, subtitle: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>

      {/* Shows List */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Videos
        </h3>

        <div className="space-y-4">
          {shows.map((show, index) => (
            <div key={index} className="border border-[var(--cream)]/20 p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block font-display uppercase text-xs mb-2">YouTube Video ID</label>
                  <input
                    type="text"
                    value={show.videoId}
                    onChange={(e) => {
                      const newShows = [...shows];
                      newShows[index] = { ...newShows[index], videoId: e.target.value };
                      setShows(newShows);
                    }}
                    className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                  />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Title</label>
                  <input
                    type="text"
                    value={show.title}
                    onChange={(e) => {
                      const newShows = [...shows];
                      newShows[index] = { ...newShows[index], title: e.target.value };
                      setShows(newShows);
                    }}
                    className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                  />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Category</label>
                  <input
                    type="text"
                    value={show.category}
                    onChange={(e) => {
                      const newShows = [...shows];
                      newShows[index] = { ...newShows[index], category: e.target.value };
                      setShows(newShows);
                    }}
                    className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setShows(shows.filter((_, i) => i !== index))}
                    className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-display uppercase text-xs mb-2">Thumbnail URL</label>
                <input
                  type="text"
                  value={show.thumbnail}
                  onChange={(e) => {
                    const newShows = [...shows];
                    newShows[index] = { ...newShows[index], thumbnail: e.target.value };
                    setShows(newShows);
                  }}
                  className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setShows([...shows, { videoId: "", thumbnail: "", title: "", category: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        </div>
      </section>
    </div>
  );
}

// Join Page Editor
function JoinEditor() {
  const [pageContent, setPageContent] = useState({
    title: "Join The",
    titleAccent: "Team.",
    subtitle: "We are always looking for editors, writers, and talent. If you have the sauce, we have the platform.",
    pitchTitle: "Got An",
    pitchTitleAccent: "Idea?",
    pitchSubtitle: "We want to hear your craziest concepts. Pitch us your show, series, or one-off video idea.",
  });

  const [roles, setRoles] = useState([
    { title: "Content Creator", type: "Remote", description: "Bring your unique voice and ideas to our network." },
    { title: "Script Writer", type: "LA / Hybrid", description: "Comedy focused. Must be chronically online." },
    { title: "On-Screen Talent", type: "Flexible", description: "Camera-ready personalities who can captivate audiences." },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Join Page Editor</h2>

      {/* Page Content */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Page Content
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={pageContent.title}
              onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title Accent</label>
            <input
              type="text"
              value={pageContent.titleAccent}
              onChange={(e) => setPageContent({ ...pageContent, titleAccent: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <textarea
              value={pageContent.subtitle}
              onChange={(e) => setPageContent({ ...pageContent, subtitle: e.target.value })}
              rows={2}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--tv-red)]" />
          Open Roles
        </h3>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <div key={index} className="border border-[var(--cream)]/20 p-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Role Title</label>
                  <input
                    type="text"
                    value={role.title}
                    onChange={(e) => {
                      const newRoles = [...roles];
                      newRoles[index] = { ...newRoles[index], title: e.target.value };
                      setRoles(newRoles);
                    }}
                    className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                  />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Type</label>
                  <input
                    type="text"
                    value={role.type}
                    onChange={(e) => {
                      const newRoles = [...roles];
                      newRoles[index] = { ...newRoles[index], type: e.target.value };
                      setRoles(newRoles);
                    }}
                    className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setRoles(roles.filter((_, i) => i !== index))}
                    className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-display uppercase text-xs mb-2">Description</label>
                <input
                  type="text"
                  value={role.description}
                  onChange={(e) => {
                    const newRoles = [...roles];
                    newRoles[index] = { ...newRoles[index], description: e.target.value };
                    setRoles(newRoles);
                  }}
                  className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-3 py-2 text-sm text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setRoles([...roles, { title: "", type: "", description: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>
      </section>
    </div>
  );
}

// Contact Page Editor
function ContactEditor() {
  const [pageContent, setPageContent] = useState({
    formTitle: "Hit Us Up",
    infoTitle: "Let's",
    infoTitleAccent: "Talk.",
    infoSubtitle: "Whether you're a brand looking to collaborate, a creator wanting to join, or just want to say hi.",
    email: "hello@sonnetworks.com",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Contact Page Editor</h2>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--tv-red)]" />
          Page Content
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Form Title</label>
            <input
              type="text"
              value={pageContent.formTitle}
              onChange={(e) => setPageContent({ ...pageContent, formTitle: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Contact Email</label>
            <input
              type="email"
              value={pageContent.email}
              onChange={(e) => setPageContent({ ...pageContent, email: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Info Title</label>
            <input
              type="text"
              value={pageContent.infoTitle}
              onChange={(e) => setPageContent({ ...pageContent, infoTitle: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Info Title Accent</label>
            <input
              type="text"
              value={pageContent.infoTitleAccent}
              onChange={(e) => setPageContent({ ...pageContent, infoTitleAccent: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Info Subtitle</label>
            <textarea
              value={pageContent.infoSubtitle}
              onChange={(e) => setPageContent({ ...pageContent, infoSubtitle: e.target.value })}
              rows={2}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Navigation Editor
function NavigationEditor() {
  const [navItems, setNavItems] = useState([
    { label: "Home", href: "/" },
    { label: "Shows", href: "/shows" },
    { label: "Join Us", href: "/join" },
    { label: "Contact Us", href: "/contact" },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Navigation Editor</h2>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Menu className="w-5 h-5 text-[var(--tv-red)]" />
          Menu Items
        </h3>

        <div className="space-y-4">
          {navItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const newItems = [...navItems];
                  newItems[index] = { ...newItems[index], label: e.target.value };
                  setNavItems(newItems);
                }}
                placeholder="Label"
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => {
                  const newItems = [...navItems];
                  newItems[index] = { ...newItems[index], href: e.target.value };
                  setNavItems(newItems);
                }}
                placeholder="/path"
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <button
                onClick={() => setNavItems(navItems.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setNavItems([...navItems, { label: "", href: "/" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Menu Item
          </button>
        </div>
      </section>
    </div>
  );
}

// Footer Editor
function FooterEditor() {
  const [footerContent, setFooterContent] = useState({
    companyName: "SON NETWORKS",
  });

  const [socialLinks, setSocialLinks] = useState([
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "YouTube", href: "https://www.youtube.com/sonnetworks" },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Footer & Socials Editor</h2>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Footer Content
        </h3>

        <div>
          <label className="block font-display uppercase text-sm mb-2">Company Name</label>
          <input
            type="text"
            value={footerContent.companyName}
            onChange={(e) => setFooterContent({ ...footerContent, companyName: e.target.value })}
            className="w-full max-w-md bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
          />
        </div>
      </section>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-[var(--tv-red)]" />
          Social Links
        </h3>

        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index] = { ...newLinks[index], label: e.target.value };
                  setSocialLinks(newLinks);
                }}
                placeholder="Label (e.g. Instagram)"
                className="w-48 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index] = { ...newLinks[index], href: e.target.value };
                  setSocialLinks(newLinks);
                }}
                placeholder="https://..."
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
              <button
                onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setSocialLinks([...socialLinks, { label: "", href: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--cream)]/30 hover:bg-[var(--cream)]/10 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Social Link
          </button>
        </div>
      </section>
    </div>
  );
}

// Settings Editor
function SettingsEditor() {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "SON Networks",
    siteDescription: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
    logoUrl: "https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj",
  });

  const [colors, setColors] = useState({
    ink: "#111111",
    cream: "#F3F0E6",
    tvRed: "#FF3333",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-4xl uppercase mb-8">Site Settings</h2>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[var(--tv-red)]" />
          General Settings
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Site Name</label>
            <input
              type="text"
              value={siteSettings.siteName}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Logo URL</label>
            <input
              type="text"
              value={siteSettings.logoUrl}
              onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
          <div className="col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Site Description (SEO)</label>
            <textarea
              value={siteSettings.siteDescription}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
              rows={3}
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)]/5 border border-[var(--cream)]/20 p-6">
        <h3 className="font-display text-2xl uppercase mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[var(--tv-red)]" />
          Brand Colors
        </h3>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Ink (Dark)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.ink}
                onChange={(e) => setColors({ ...colors, ink: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.ink}
                onChange={(e) => setColors({ ...colors, ink: e.target.value })}
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
            </div>
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Cream (Light)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.cream}
                onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.cream}
                onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
            </div>
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">TV Red (Accent)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.tvRed}
                onChange={(e) => setColors({ ...colors, tvRed: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.tvRed}
                onChange={(e) => setColors({ ...colors, tvRed: e.target.value })}
                className="flex-1 bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-[var(--tv-red)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-500/10 border border-yellow-500/30 p-6">
        <h3 className="font-display text-xl uppercase mb-4 text-yellow-500">Supabase Connection</h3>
        <p className="text-[var(--cream)]/70 mb-4">
          To enable data persistence, connect your Supabase project. You&apos;ll need to add your Supabase URL and anon key to your environment variables.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Supabase URL</label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Anon Key</label>
            <input
              type="password"
              placeholder="your-anon-key"
              className="w-full bg-[var(--ink)] border border-[var(--cream)]/30 px-4 py-3 text-[var(--cream)] focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
